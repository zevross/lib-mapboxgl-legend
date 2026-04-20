const j = (s) => Array.isArray(s) ? s : [s], E = (s, t, n, e = 0, i = 100) => (s - t) * (i - e) / (n - t) + e, I = (s, t) => Array.from(
  { length: Math.ceil(s.length / t) },
  (n, e) => s.slice(e * t, e * t + t)
), T = (...s) => s[0].map((t, n) => s.slice(1).reduce((e, i) => [...e, i[n]], [t])), R = (s) => s.length === 2 ? s : [null, ...s], U = (s) => s.reduce((t, [n, e], i) => (i === s.length - 1 ? t.push([[n, null], e]) : t.push([[n, s[i + 1][0]], e]), t), []), p = (s, t = {}) => {
  const { classes: n, styles: e, attributes: i, events: r, content: o, appendTo: c } = t, l = document.createElement(s);
  return n && j(n).forEach((a) => l.classList.add(a)), e && Object.entries(e).forEach((a) => l.style.setProperty(...a)), i && Object.entries(i).forEach(([a, h]) => {
    h || h === 0 ? l.setAttribute(a, `${h}`) : l.removeAttribute(a);
  }), r && Object.entries(r).forEach(([a, h]) => l.addEventListener(a, h)), o && l.append(...j(o).filter(Boolean)), c && c.appendChild(l), l;
}, N = (s, t, n) => {
  const e = Math.max(t, n), i = p("canvas", {
    attributes: { width: e, height: e }
  }), r = i.getContext("2d"), o = new ImageData(Uint8ClampedArray.from(s), t, n);
  return r == null || r.putImageData(o, (e - t) / 2, (e - n) / 2), i;
}, v = (s, t) => {
  const { labels: n = {}, unit: e = "" } = t || {};
  return Array.isArray(s) ? n[`${s}`] ?? (s[0] === null ? `< ${n[`${s[1]}`] || `${s[1]}${e}`}` : s[1] === null ? `> ${n[`${s[0]}`] || `${s[0]}${e}`}` : s.map((i) => n[`${i}`] || `${i}${e}`).join(" - ")) : s !== null ? n[`${s}`] ?? `${s}${e}` : n.other ?? "other";
}, k = {}, $ = (s, t, n) => {
  const { getter: e } = s;
  t.id in k || (k[t.id] = t.filter ?? null);
  const i = (o, c) => {
    const { delta: l = 0 } = c || {};
    if (e)
      if (o == null) n.setFilter(t.id, k[t.id]);
      else if (Array.isArray(o)) {
        const [a, h] = o, g = a ? [">=", e, a] : !0, d = h ? ["<", e, h] : !0;
        n.setFilter(t.id, ["all", g, d]);
      } else {
        const a = typeof o == "number" ? ["all", [">=", e, o - l], ["<=", e, o + l]] : ["==", e, o];
        n.setFilter(t.id, a);
      }
  };
  return { highlight: i, events: (o) => ({
    mouseenter: () => i(o),
    mouseleave: () => i(void 0)
  }) };
}, D = { x: 0 }, V = (s, t, n, e) => {
  const { inputs: i, stops: r, min: o, max: c } = s, { highlight: l } = $(s, t, n), a = (c - o) / 100, h = {
    mouseleave: () => l(void 0),
    mousemove: (d) => {
      const { offsetX: u, target: f } = d;
      D.x = u;
      const m = f, A = E(u, 0, m.offsetWidth, o, c);
      l(A, { delta: a }), m.style.setProperty("--x", `${u}px`);
    }
  }, g = r.map(([d, u]) => `${u} ${E(d, o, c)}%`);
  return p("div", {
    classes: ["gradient", `gradient--${e.highlight ? "highlight" : ""}`],
    content: [
      p("p", {
        classes: "labels",
        content: i.map((d) => {
          const u = v(d, t.metadata);
          return u && p("span", {
            styles: { left: `${E(d, o, c)}%` },
            content: u
          });
        })
      }),
      p("div", {
        classes: "bar",
        styles: {
          "background-image": `linear-gradient(90deg, ${g})`,
          "--x": `${D.x || 0}px`
        },
        events: e.highlight ? h : {}
      })
    ]
  });
}, W = (s, t, n, e) => {
  const { stops: i } = s, { events: r } = $(s, t, n);
  return p("ul", {
    classes: ["list", "list--color", `list--${e.highlight ? "highlight" : ""}`],
    content: i.map(([o, c]) => {
      const l = v(o, t.metadata);
      return l && p("li", {
        styles: { "--color": c },
        events: e.highlight ? r(o) : {},
        content: l
      });
    })
  });
}, X = (s, t, n, e) => {
  switch (s.name) {
    case "interpolate":
      return V(s, t, n, e);
    case "match":
    case "step":
    case "literal":
      return W(s, t, n, e);
    default:
      return;
  }
}, G = (s, t, n, e) => {
  const { stops: i } = s, { events: r } = $(s, t, n);
  return p("ul", {
    classes: ["bubbles", `bubbles--${e.highlight ? "highlight" : ""}`],
    content: i.sort((o, c) => c[1] - o[1]).map(([o, c]) => {
      const l = v(o, t.metadata);
      return l && p("li", {
        styles: { "--radius": `${c}px` },
        events: e.highlight ? r(o) : {},
        content: p("span", {
          content: l
        })
      });
    })
  });
}, M = (s, t, n, e) => {
  const { stops: i } = s, { events: r } = $(s, t, n);
  return p("ul", {
    classes: ["list", "list--icons", `list--${e.highlight ? "highlight" : ""}`],
    content: i.map(([o, c]) => {
      var u;
      const l = v(o, t.metadata);
      if (!l) return;
      const { height: a, width: h, data: g } = ((u = n.style.getImage(c)) == null ? void 0 : u.data) || {};
      if (!a || !h || !g) return;
      const d = N(g, h, a);
      return p("li", {
        events: e.highlight ? r(o) : {},
        content: [
          p("img", {
            classes: ["icon"],
            attributes: { src: d.toDataURL() }
          }),
          l
        ]
      });
    })
  });
}, H = { color: X, radius: G, image: M, pattern: M }, B = (s, t) => I(s.slice(t), 2), C = {
  interpolate: (s) => B(s, 2),
  match: (s) => B(s, 1).map(R),
  step: (s) => U([[null, s[1]], ...B(s, 2)]),
  literal: (s) => [[...s, ...s]]
}, q = (s) => Array.isArray(s) && !!s.length && typeof s[0] == "string", z = (s) => {
  var a;
  const [t, ...n] = q(s) ? s : ["literal", s];
  if (t === "case") return n.slice(1).flatMap(z);
  const e = (a = C[t]) == null ? void 0 : a.call(C, n);
  if (!e) return [];
  const i = t === "literal" ? void 0 : ["match", "step"].includes(t) ? n[0] : n[1], [r, o] = T(...e), c = Math.min(...r.flat(2)), l = Math.max(...r.flat(2));
  return [{ name: t, getter: i, stops: e, inputs: r, outputs: o, min: c, max: l }];
}, J = { isExpression: q, parse: z }, K = {
  collapsed: !1,
  toggler: !1,
  highlight: !1
};
class Y {
  constructor(t) {
    const { layers: n, ...e } = t || {};
    this._options = { ...K, layers: void 0, ...e }, n && this.addLayers(n), this._panes = p("div", {
      classes: "panes",
      styles: { display: (t == null ? void 0 : t.minimized) ?? !1 ? "none" : "block" }
    }), this._minimizer = (t == null ? void 0 : t.minimized) !== void 0 ? p("button", {
      classes: "minimizer",
      events: {
        click: () => {
          const { display: i } = this._panes.style;
          this._panes.style.display = i === "none" ? "block" : "none";
        }
      }
    }) : void 0, this._container = p("div", {
      classes: ["mapboxgl-ctrl", "maplibregl-ctrl", "mapboxgl-ctrl-legend"],
      content: [this._minimizer, this._panes]
    }), this.refresh = this.refresh.bind(this);
  }
  onAdd(t) {
    return this._map = t, this._map.on("styledata", this.refresh), this._container;
  }
  onRemove() {
    var t, n;
    (t = this._container.parentNode) == null || t.removeChild(this._container), (n = this._map) == null || n.off("styledata", this.refresh);
  }
  addLayers(t) {
    var e, i;
    const n = (r, o) => {
      var d;
      const {
        collapsed: c = this._options.collapsed,
        toggler: l = this._options.toggler,
        highlight: a = this._options.highlight,
        onToggle: h = this._options.onToggle,
        attributes: g
      } = o || {};
      (d = this._options.layers) == null || d.set(r, {
        collapsed: c,
        toggler: l,
        highlight: a,
        onToggle: h,
        attributes: g
      });
    };
    (e = this._options).layers ?? (e.layers = /* @__PURE__ */ new Map()), Array.isArray(t) ? t.forEach((r) => n(r)) : Object.entries(t).forEach(([r, o]) => {
      typeof o == "boolean" ? n(r) : Array.isArray(o) ? n(r, { attributes: o }) : n(r, o);
    }), (i = this._map) != null && i.isStyleLoaded() && this.refresh();
  }
  removeLayers(t) {
    t.forEach((n) => {
      var i;
      (i = this._options.layers) == null || i.delete(n);
      const e = this._panes.querySelector(
        `.mapboxgl-ctrl-legend-pane--${n}`
      );
      e && this._panes.removeChild(e);
    });
  }
  _getBlocks(t, n, e, i) {
    var a;
    const [r] = e.split("-").slice(-1), o = H[r];
    if (!o) return;
    const c = J.parse(i), l = ((a = this._options.layers) == null ? void 0 : a.get(t)) || this._options;
    return c.map((h) => o(h, n, this._map, l)).filter(Boolean);
  }
  _toggleButton(t, n) {
    var o, c;
    const { onToggle: e = this._options.onToggle } = ((o = this._options.layers) == null ? void 0 : o.get(n)) || {}, i = ((c = this._map) == null ? void 0 : c.getLayoutProperty(t[0], "visibility")) || "visible", r = p("div", {
      classes: ["toggler", `toggler--${i}`]
    });
    return r.addEventListener("click", (l) => {
      l.preventDefault();
      const a = i === "none" ? "visible" : "none";
      t.forEach((h) => {
        var g;
        (g = this._map) == null || g.setLayoutProperty(h, "visibility", a), e == null || e(h, a === "visible");
      });
    }), r;
  }
  _collapseButton(t) {
    const n = t.hasAttribute("open"), e = p("div", {
      classes: ["collapse", `collapse--${!n}`]
    });
    return e.addEventListener("click", (i) => {
      i.preventDefault(), i.stopPropagation(), t.toggleAttribute("open");
      const r = !t.hasAttribute("open");
      e.classList.remove(`collapse--${!r}`), e.classList.add(`collapse--${r}`);
    }), t.addEventListener("toggle", () => {
      const i = !t.hasAttribute("open");
      e.classList.remove(`collapse--${!i}`), e.classList.add(`collapse--${i}`);
    }), e;
  }
  refresh() {
    var n;
    const t = this._options.layers ? [...this._options.layers.keys()] : void 0;
    (n = this._map.getStyle()) == null || n.layers.filter((e) => {
      const i = "source" in e && e.source !== "composite", r = !t || [...t].some(
        (o) => typeof o == "string" ? e.id === o : e.id.match(o)
      );
      return i && r;
    }).reverse().forEach((e) => {
      var P;
      const { id: i, layout: r, paint: o, metadata: c } = e, l = (t == null ? void 0 : t.find((b) => i.match(b))) || i, { collapsed: a, toggler: h, attributes: g } = ((P = this._options.layers) == null ? void 0 : P.get(l)) || this._options, d = Object.entries({ ...r, ...o }).reduce(
        (b, [S, w]) => {
          if (!((g == null ? void 0 : g.includes(S)) ?? !0)) return b;
          const x = this._getBlocks(
            l,
            e,
            S,
            w
          );
          return x == null || x.forEach((F) => b.push(F)), b;
        },
        []
      );
      if (!d.length) return;
      const u = `mapboxgl-ctrl-legend-pane--${i}`, f = this._panes.querySelector(`.${u}`), m = h ? typeof h == "boolean" ? [i] : h : void 0, A = (c == null ? void 0 : c.extraLegendClasses) ?? [], _ = p("details", {
        classes: ["mapboxgl-ctrl-legend-pane", u, ...A],
        attributes: {
          open: f ? f.getAttribute("open") !== null : !a
        },
        content: [
          p("summary", {
            content: [
              (c == null ? void 0 : c.name) || i,
              p("div", {
                classes: ["controls-container"],
                styles: {
                  display: "flex",
                  gap: "4px",
                  alignItems: "center"
                },
                content: [
                  p("div", {
                    classes: ["collapse-placeholder"]
                  }),
                  // Placeholder for collapse button
                  m ? this._toggleButton(m, l) : void 0
                ].filter(Boolean)
              })
            ]
          }),
          ...d
        ]
      }), L = _.querySelector("summary"), y = L == null ? void 0 : L.querySelector(".controls-container"), O = y == null ? void 0 : y.querySelector(
        ".collapse-placeholder"
      );
      y && O && y.replaceChild(
        this._collapseButton(_),
        O
      ), f ? this._panes.replaceChild(_, f) : this._panes.appendChild(_);
    });
  }
}
export {
  Y as default
};
