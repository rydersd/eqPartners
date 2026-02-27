/* sd-render.js — SVG rendering engine for the Service Blueprint
 * Reads SD_DATA (from sd-data.js) and builds the SVG via DOM.
 * Call SD_RENDER.init() after DOMContentLoaded.
 */
(function (global) {
  'use strict';

  const NS   = 'http://www.w3.org/2000/svg';
  const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

  /* ── SVG element factory ─────────────────────────────────────── */
  function svgEl(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) e.setAttribute(k, String(v));
    return e;
  }
  function svgTxt(str, attrs) {
    const e = svgEl('text', attrs);
    e.textContent = str;
    return e;
  }
  function svgTitle(str) {
    const e = document.createElementNS(NS, 'title');
    e.textContent = str;
    return e;
  }

  /* ── Orthogonal path routing with rounded corners ────────────── */
  /* Converts diagonal lines into right-angle paths with r=6 arcs.  */
  /* abs(dx) < thr → straight line (nearly vertical connectors).    */
  function ortho(x1, y1, x2, y2) {
    const r = 6, thr = 20;
    const dx = x2 - x1;
    if (Math.abs(dx) < thr) return 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2;
    const f = function(n) { return +n.toFixed(1); };
    const m = (y1 + y2) / 2;           // mid-y for the horizontal run
    if (y2 >= y1) {
      if (dx > 0) // down-right
        return 'M '+x1+' '+y1+' L '+x1+' '+f(m-r)+' A '+r+' '+r+' 0 0 1 '+f(x1+r)+' '+f(m)+' L '+f(x2-r)+' '+f(m)+' A '+r+' '+r+' 0 0 1 '+x2+' '+f(m+r)+' L '+x2+' '+y2;
      else         // down-left
        return 'M '+x1+' '+y1+' L '+x1+' '+f(m-r)+' A '+r+' '+r+' 0 0 0 '+f(x1-r)+' '+f(m)+' L '+f(x2+r)+' '+f(m)+' A '+r+' '+r+' 0 0 0 '+x2+' '+f(m+r)+' L '+x2+' '+y2;
    } else {
      if (dx > 0) // up-right
        return 'M '+x1+' '+y1+' L '+x1+' '+f(m+r)+' A '+r+' '+r+' 0 0 0 '+f(x1+r)+' '+f(m)+' L '+f(x2-r)+' '+f(m)+' A '+r+' '+r+' 0 0 0 '+x2+' '+f(m-r)+' L '+x2+' '+y2;
      else         // up-left
        return 'M '+x1+' '+y1+' L '+x1+' '+f(m+r)+' A '+r+' '+r+' 0 0 1 '+f(x1-r)+' '+f(m)+' L '+f(x2+r)+' '+f(m)+' A '+r+' '+r+' 0 0 1 '+x2+' '+f(m-r)+' L '+x2+' '+y2;
    }
  }

  /* ── Arrow marker <defs> ─────────────────────────────────────── */
  function makeDefs() {
    const MARKERS = [
      { id: 'arr-gray',   fill: '#cbd5e1' },
      { id: 'arr-teal',   fill: '#0d9488' },
      { id: 'arr-blue',   fill: '#2563eb' },
      { id: 'arr-amber',  fill: '#d97706' },
      { id: 'arr-purple', fill: '#7c3aed' },
      { id: 'arr-green',  fill: '#166534' },
    ];
    const defs = svgEl('defs');
    for (const m of MARKERS) {
      const marker = svgEl('marker', {
        id: m.id, markerWidth: 6, markerHeight: 6,
        refX: 5, refY: 3, orient: 'auto',
      });
      marker.appendChild(svgEl('path', { d: 'M0,0 L0,6 L6,3 z', fill: m.fill }));
      defs.appendChild(marker);
    }
    return defs;
  }

  /* ── Draw a connector path ───────────────────────────────────── */
  function drawConn(parent, conn, color, marker, sw, dashPattern) {
    const d = ortho(conn.from[0], conn.from[1], conn.to[0], conn.to[1]);
    const attrs = {
      d: d,
      stroke: color || '#cbd5e1',
      'stroke-width': sw || 1,
      fill: 'none',
      'marker-end': 'url(#' + (marker || 'arr-gray') + ')',
    };
    const dp = conn.dashPattern || dashPattern;
    if (conn.dash || dp) attrs['stroke-dasharray'] = dp || '4,3';
    parent.appendChild(svgEl('path', attrs));
  }

  /* ── Draw swim lanes (backgrounds + dividers + labels) ──────── */
  function drawLanes(parent, lanes, vw) {
    for (const lane of lanes) {
      // Background rect
      parent.appendChild(svgEl('rect', {
        x: 0, y: lane.y, width: vw, height: lane.h, fill: lane.fill,
      }));
      // Top divider (skip lane 1 — top of SVG)
      if (lane.y > 0) {
        parent.appendChild(svgEl('line', {
          x1: 0, y1: lane.y, x2: vw, y2: lane.y,
          stroke: '#e2e8f0', 'stroke-width': 1,
        }));
      }
      // Lane label
      parent.appendChild(svgTxt(lane.label, {
        x: 8, y: lane.y + 18,
        'font-family': FONT, 'font-size': 8, 'font-weight': 700,
        fill: '#94a3b8', 'letter-spacing': '0.06em',
      }));
    }
  }

  /* ── Draw an actor node (circle) ────────────────────────────── */
  function drawActor(parent, a) {
    const outer = svgEl('g', { id: 'actor-' + a.id });
    const wrap = a.href
      ? svgEl('a', { href: a.href, class: 'sd-node-link', 'aria-label': a.label + ' — view JTBDs' })
      : svgEl('g');
    if (a.title) wrap.insertBefore(svgTitle(a.title), wrap.firstChild);

    const cAttrs = { cx: a.cx, cy: a.cy, r: a.r, fill: a.fill };
    if (a.fillOpacity)      cAttrs['fill-opacity']    = a.fillOpacity;
    if (a.stroke)           cAttrs['stroke']           = a.stroke;
    if (a.strokeWidth)      cAttrs['stroke-width']     = a.strokeWidth;
    if (a.strokeDasharray)  cAttrs['stroke-dasharray'] = a.strokeDasharray;
    wrap.appendChild(svgEl('circle', cAttrs));

    // Initials
    wrap.appendChild(svgTxt(a.initials, {
      x: a.cx, y: a.cy + 4,
      'text-anchor': 'middle', 'font-family': FONT,
      'font-size': 9, 'font-weight': 700, fill: '#fff',
    }));
    // Name label
    wrap.appendChild(svgTxt(a.label, {
      x: a.cx, y: a.cy + a.r + 9,
      'text-anchor': 'middle', 'font-family': FONT,
      'font-size': 9, fill: a.labelColor || '#1e3a5f',
    }));
    // Sub-label
    if (a.sublabel) {
      wrap.appendChild(svgTxt(a.sublabel, {
        x: a.cx, y: a.cy + a.r + 20,
        'text-anchor': 'middle', 'font-family': FONT,
        'font-size': 8, fill: '#94a3b8',
      }));
    }
    outer.appendChild(wrap);
    parent.appendChild(outer);
  }

  /* ── Draw a rect-based node (portal / workflow / SF / ext) ───── */
  function drawRect(parent, n) {
    const cx   = n.x + n.w / 2;
    const midY = n.y + n.h / 2;
    const outer = svgEl('g', { id: n.id });
    const wrap = n.href
      ? svgEl('a', { href: n.href, class: 'sd-node-link', 'aria-label': 'Open ' + n.label })
      : svgEl('g');
    if (n.title) wrap.insertBefore(svgTitle(n.title), wrap.firstChild);

    wrap.appendChild(svgEl('rect', {
      x: n.x, y: n.y, width: n.w, height: n.h,
      rx: n.rx !== undefined ? n.rx : 4,
      fill: n.fill, stroke: n.stroke,
      'stroke-width': n.strokeWidth !== undefined ? n.strokeWidth : 1,
    }));
    wrap.appendChild(svgTxt(n.label, {
      x: cx, y: midY - 3,
      'text-anchor': 'middle', 'font-family': FONT,
      'font-size': 9, 'font-weight': 700,
      fill: n.labelColor || '#1e3a5f',
    }));
    if (n.sublabel) {
      wrap.appendChild(svgTxt(n.sublabel, {
        x: cx, y: midY + 9,
        'text-anchor': 'middle', 'font-family': FONT,
        'font-size': 8,
        fill: n.sublabelColor || n.labelColor || '#94a3b8',
      }));
    }
    outer.appendChild(wrap);
    parent.appendChild(outer);
  }

  /* ── Draw "line of visibility" dashed rules ──────────────────── */
  function drawVisibility(parent, lines, vw) {
    for (const line of lines) {
      parent.appendChild(svgEl('line', {
        x1: 0, y1: line.y, x2: vw, y2: line.y,
        stroke: '#94a3b8', 'stroke-width': 0.5, 'stroke-dasharray': '8,4',
      }));
      parent.appendChild(svgTxt(line.label, {
        x: vw - 10, y: line.y - 2,
        'text-anchor': 'end', 'font-family': FONT,
        'font-size': 7, fill: '#94a3b8', 'font-style': 'italic',
      }));
    }
  }

  /* ── Main init: reads SD_DATA, builds SVG, attaches to DOM ───── */
  function init() {
    var data = global.SD_DATA;
    var container = document.getElementById('sd-svg-container');
    if (!container || !data) {
      console.error('SD_RENDER: SD_DATA or #sd-svg-container not found');
      return;
    }

    var vw = data.viewBox.w, vh = data.viewBox.h;
    var svg = svgEl('svg', {
      viewBox: '0 0 ' + vw + ' ' + vh,
      class: 'sd-svg',
      role: 'img',
      'aria-label': 'Service blueprint swim lane diagram showing how partner workflows cross user-facing portals, Salesforce, and external systems',
      xmlns: NS,
    });

    // 1. Defs (markers must come first)
    svg.appendChild(makeDefs());

    // 2. Lane backgrounds, dividers, labels
    var laneG = svgEl('g', { id: 'sd-lanes' });
    drawLanes(laneG, data.lanes, vw);
    svg.appendChild(laneG);

    // 3. Default connectors (below nodes)
    var connG = svgEl('g', { id: 'sd-conns' });
    for (var ci = 0; ci < data.defaultConns.length; ci++) {
      var c = data.defaultConns[ci];
      drawConn(connG, c, '#cbd5e1', 'arr-gray', c.sw || 1, null);
    }
    svg.appendChild(connG);

    // 4. Workflow highlight path groups (opacity:0 by default)
    var flowColors = {};
    for (var flowId in data.flows) {
      var flow = data.flows[flowId];
      flowColors[flowId] = flow.color;
      var flowG = svgEl('g', {
        id: 'path-' + flowId,
        opacity: '0',
        style: 'transition:opacity .3s',
      });
      // Highlight connector paths
      for (var fi = 0; fi < flow.conns.length; fi++) {
        drawConn(flowG, flow.conns[fi], flow.color, 'arr-' + flow.marker, 2.5, null);
      }
      // Highlight outlines on workflow node boxes
      for (var hi = 0; hi < (flow.highlights || []).length; hi++) {
        var wfId = flow.highlights[hi];
        var wf = null;
        for (var wi = 0; wi < data.workflows.length; wi++) {
          if (data.workflows[wi].id === wfId) { wf = data.workflows[wi]; break; }
        }
        if (wf) {
          flowG.appendChild(svgEl('rect', {
            x: wf.x - 2, y: wf.y - 2,
            width: wf.w + 4, height: wf.h + 4,
            rx: (wf.rx || 4),
            fill: 'none', stroke: flow.color, 'stroke-width': 2.5,
          }));
        }
      }
      svg.appendChild(flowG);
    }

    // 5. All nodes (drawn on top of connectors)
    for (var ai = 0; ai < data.actors.length;   ai++) drawActor(svg, data.actors[ai]);
    for (var pi = 0; pi < data.portals.length;  pi++) drawRect(svg, data.portals[pi]);
    for (var wfi = 0; wfi < data.workflows.length; wfi++) drawRect(svg, data.workflows[wfi]);
    for (var si = 0; si < data.sfNodes.length;  si++) drawRect(svg, data.sfNodes[si]);
    for (var ei = 0; ei < data.extNodes.length; ei++) drawRect(svg, data.extNodes[ei]);

    // 6. Lines of visibility (on top)
    var visG = svgEl('g', { id: 'sd-visibility' });
    drawVisibility(visG, data.visibilityLines, vw);
    svg.appendChild(visG);

    container.appendChild(svg);

    // 7. Expose highlightFlow() globally (called by filter buttons in HTML)
    global._sdFlowColors = flowColors;
    global.highlightFlow = function (flow) {
      document.querySelectorAll('[id^="path-"]').forEach(function (p) {
        p.style.opacity = (flow === 'all') ? '1' : '0';
      });
      if (flow !== 'all') {
        var el = document.getElementById('path-' + flow);
        if (el) el.style.opacity = '1';
      }
      document.querySelectorAll('.sd-btn').forEach(function (b) {
        var btnFlow = b.id.replace('sd-', '');
        var active = (btnFlow === flow);
        b.classList.toggle('active', active);
        if (active) {
          var c = (flow === 'all') ? 'var(--wf-ink)' : (global._sdFlowColors[flow] || '#2563eb');
          b.style.background = c;
          b.style.color = '#fff';
          b.style.borderColor = 'transparent';
        } else {
          b.style.background = '';
          b.style.color = '';
          b.style.borderColor = '';
        }
      });
    };

    // Show all flows on initial load
    global.highlightFlow('all');
  }

  global.SD_RENDER = { init: init };

})(window);
