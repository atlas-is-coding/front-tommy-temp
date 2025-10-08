(self.webpackChunk = self.webpackChunk || []).push([["477"], {
  5897: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n, i = {
      cleanupElement: function () {
        return T;
      },
      createInstance: function () {
        return I;
      },
      destroy: function () {
        return b;
      },
      init: function () {
        return y;
      },
      ready: function () {
        return m;
      }
    };
    for (var l in i) Object.defineProperty(t, l, {
      enumerable: !0,
      get: i[l]
    });
    (a(2897), a(233), a(9754), a(971), a(2374), a(5152), a(5273), a(172));
    let d = (n = a(3142)) && n.__esModule ? n : {
      default: n
    }, o = a(7933), c = e => e.Webflow.require("lottie").lottie, s = e => !!(e.Webflow.env("design") || e.Webflow.env("preview")), r = {
      Playing: "playing",
      Stopped: "stopped"
    }, f = new (class {
      _cache = [];
      set(e, t) {
        let a = (0, d.default)(this._cache, ({wrapper: t}) => t === e);
        (-1 !== a && this._cache.splice(a, 1), this._cache.push({
          wrapper: e,
          instance: t
        }));
      }
      delete(e) {
        let t = (0, d.default)(this._cache, ({wrapper: t}) => t === e);
        -1 !== t && this._cache.splice(t, 1);
      }
      get(e) {
        let t = (0, d.default)(this._cache, ({wrapper: t}) => t === e);
        return -1 !== t ? this._cache[t].instance : null;
      }
    })(), u = {};
    class p {
      config = null;
      currentState = r.Stopped;
      animationItem;
      handlers = {
        enterFrame: [],
        complete: [],
        loop: [],
        dataReady: [],
        destroy: [],
        error: []
      };
      load(e) {
        let t = (e.dataset || u).src || "";
        (t.endsWith(".lottie") ? (0, o.fetchLottie)(t).then(t => {
          this._loadAnimation(e, t);
        }) : this._loadAnimation(e, void 0), f.set(e, this), this.container = e);
      }
      _loadAnimation(e, t) {
        let a = e.dataset || u, n = a.src || "", i = a.preserveAspectRatio || "xMidYMid meet", l = a.renderer || "svg", d = 1 === parseFloat(a.loop), o = parseFloat(a.direction) || 1, f = 1 === parseFloat(a.autoplay), p = parseFloat(a.duration) || 0, E = 1 === parseFloat(a.isIx2Target), I = parseFloat(a.ix2InitialState);
        isNaN(I) && (I = null);
        let T = {
          src: n,
          loop: d,
          autoplay: f,
          renderer: l,
          direction: o,
          duration: p,
          hasIx2: E,
          ix2InitialValue: I,
          preserveAspectRatio: i
        };
        if (this.animationItem && this.config && this.config.src === n && l === this.config.renderer && i === this.config.preserveAspectRatio) {
          if ((d !== this.config.loop && this.setLooping(d), E || (o !== this.config.direction && this.setDirection(o), p !== this.config.duration && (p > 0 && p !== this.duration ? this.setSpeed(this.duration / p) : this.setSpeed(1))), f && this.play(), I && I !== this.config.ix2InitialValue)) {
            let e = I / 100;
            this.goToFrame(this.frames * e);
          }
          this.config = T;
          return;
        }
        let y = e.ownerDocument.defaultView;
        try {
          (this.animationItem && this.destroy(), this.animationItem = c(y).loadAnimation({
            container: e,
            loop: d,
            autoplay: f,
            renderer: l,
            rendererSettings: {
              preserveAspectRatio: i,
              progressiveLoad: !0,
              hideOnTransparent: !0
            },
            ...t ? {
              animationData: t
            } : {
              path: n
            }
          }));
        } catch (e) {
          this.handlers.error.forEach(t => t(e));
          return;
        }
        this.animationItem && (s(y) && (this.animationItem.addEventListener("enterFrame", () => {
          if (!this.isPlaying) return;
          let {currentFrame: e, totalFrames: t, playDirection: a} = this.animationItem, n = e / t * 100, i = Math.round(1 === a ? n : 100 - n);
          this.handlers.enterFrame.forEach(t => t(i, e));
        }), this.animationItem.addEventListener("complete", () => {
          if (this.currentState !== r.Playing || !this.animationItem.loop) return void this.handlers.complete.forEach(e => e());
          this.currentState = r.Stopped;
        }), this.animationItem.addEventListener("loopComplete", e => {
          this.handlers.loop.forEach(t => t(e));
        }), this.animationItem.addEventListener("data_failed", e => {
          this.handlers.error.forEach(t => t(e));
        }), this.animationItem.addEventListener("error", e => {
          this.handlers.error.forEach(t => t(e));
        })), this.isLoaded ? (this.handlers.dataReady.forEach(e => e()), f && this.play()) : this.animationItem.addEventListener("data_ready", () => {
          if ((this.handlers.dataReady.forEach(e => e()), !E && (this.setDirection(o), p > 0 && p !== this.duration && this.setSpeed(this.duration / p), f && this.play()), I)) {
            let e = I / 100;
            this.goToFrame(this.frames * e);
          }
        }), this.config = T);
      }
      onFrameChange(e) {
        -1 === this.handlers.enterFrame.indexOf(e) && this.handlers.enterFrame.push(e);
      }
      onPlaybackComplete(e) {
        -1 === this.handlers.complete.indexOf(e) && this.handlers.complete.push(e);
      }
      onLoopComplete(e) {
        -1 === this.handlers.loop.indexOf(e) && this.handlers.loop.push(e);
      }
      onDestroy(e) {
        -1 === this.handlers.destroy.indexOf(e) && this.handlers.destroy.push(e);
      }
      onDataReady(e) {
        -1 === this.handlers.dataReady.indexOf(e) && this.handlers.dataReady.push(e);
      }
      onError(e) {
        -1 === this.handlers.error.indexOf(e) && this.handlers.error.push(e);
      }
      play() {
        if (!this.animationItem) return;
        let e = 1 === this.animationItem.playDirection ? 0 : this.frames;
        (this.animationItem.goToAndPlay(e, !0), this.currentState = r.Playing);
      }
      stop() {
        if (this.animationItem) {
          if (this.isPlaying) {
            let {playDirection: e} = this.animationItem, t = 1 === e ? 0 : this.frames;
            this.animationItem.goToAndStop(t, !0);
          }
          this.currentState = r.Stopped;
        }
      }
      destroy() {
        this.animationItem && (this.isPlaying && this.stop(), this.handlers.destroy.forEach(e => e()), this.container && f.delete(this.container), this.animationItem.destroy(), Object.keys(this.handlers).forEach(e => this.handlers[e].length = 0), this.animationItem = null, this.container = null, this.config = null);
      }
      get isPlaying() {
        return !!this.animationItem && !this.animationItem.isPaused;
      }
      get isPaused() {
        return !!this.animationItem && this.animationItem.isPaused;
      }
      get duration() {
        return this.animationItem ? this.animationItem.getDuration() : 0;
      }
      get frames() {
        return this.animationItem ? this.animationItem.totalFrames : 0;
      }
      get direction() {
        return this.animationItem ? this.animationItem.playDirection : 1;
      }
      get isLoaded() {
        return (!this.animationItem, this.animationItem.isLoaded);
      }
      get ix2InitialValue() {
        return this.config ? this.config.ix2InitialValue : null;
      }
      goToFrame(e) {
        this.animationItem && this.animationItem.setCurrentRawFrameValue(e);
      }
      setSubframe(e) {
        this.animationItem && this.animationItem.setSubframe(e);
      }
      setSpeed(e = 1) {
        this.animationItem && (this.isPlaying && this.stop(), this.animationItem.setSpeed(e));
      }
      setLooping(e) {
        this.animationItem && (this.isPlaying && this.stop(), this.animationItem.loop = e);
      }
      setDirection(e) {
        this.animationItem && (this.isPlaying && this.stop(), this.animationItem.setDirection(e), this.goToFrame(1 === e ? 0 : this.frames));
      }
    }
    let E = () => Array.from(document.querySelectorAll("[data-animation-type=\"lottie\"]")), I = e => {
      let t = f.get(e);
      return (null == t && (t = new p()), t.load(e), t);
    }, T = e => {
      let t = f.get(e);
      t && t.destroy();
    }, y = () => {
      E().forEach(e => {
        (1 !== parseFloat(e.getAttribute("data-is-ix2-target")) && T(e), I(e));
      });
    }, b = () => {
      E().forEach(T);
    }, m = y;
  },
  2444: function (e, t, a) {
    "use strict";
    var n = a(3949), i = a(5897), l = a(8724);
    n.define("lottie", e.exports = function () {
      return {
        lottie: l,
        createInstance: i.createInstance,
        cleanupElement: i.cleanupElement,
        init: i.init,
        destroy: i.destroy,
        ready: i.ready
      };
    });
  },
  5487: function () {
    "use strict";
    window.tram = (function (e) {
      function t(e, t) {
        return new F.Bare().init(e, t);
      }
      function a(e) {
        var t = parseInt(e.slice(1), 16);
        return [t >> 16 & 255, t >> 8 & 255, 255 & t];
      }
      function n(e, t, a) {
        return "#" + (16777216 | e << 16 | t << 8 | a).toString(16).slice(1);
      }
      function i() {}
      function l(e, t, a) {
        if ((void 0 !== t && (a = t), void 0 === e)) return a;
        var n = a;
        return (K.test(e) || !$.test(e) ? n = parseInt(e, 10) : $.test(e) && (n = 1000 * parseFloat(e)), 0 > n && (n = 0), n == n ? n : a);
      }
      function d(e) {
        W.debug && window && window.console.warn(e);
      }
      var o, c, s, r = (function (e, t, a) {
        function n(e) {
          return "object" == typeof e;
        }
        function i(e) {
          return "function" == typeof e;
        }
        function l() {}
        return function d(o, c) {
          function s() {
            var e = new r();
            return (i(e.init) && e.init.apply(e, arguments), e);
          }
          function r() {}
          (c === a && (c = o, o = Object), s.Bare = r);
          var f, u = l[e] = o[e], p = r[e] = s[e] = new l();
          return (p.constructor = s, s.mixin = function (t) {
            return (r[e] = s[e] = d(s, t)[e], s);
          }, s.open = function (e) {
            if ((f = {}, i(e) ? f = e.call(s, p, u, s, o) : n(e) && (f = e), n(f))) for (var a in f) t.call(f, a) && (p[a] = f[a]);
            return (i(p.init) || (p.init = o), s);
          }, s.open(c));
        };
      })("prototype", ({}).hasOwnProperty), f = {
        ease: ["ease", function (e, t, a, n) {
          var i = (e /= n) * e, l = i * e;
          return t + a * (-2.75 * l * i + 11 * i * i + -15.5 * l + 8 * i + 0.25 * e);
        }],
        "ease-in": ["ease-in", function (e, t, a, n) {
          var i = (e /= n) * e, l = i * e;
          return t + a * (-1 * l * i + 3 * i * i + -3 * l + 2 * i);
        }],
        "ease-out": ["ease-out", function (e, t, a, n) {
          var i = (e /= n) * e, l = i * e;
          return t + a * (0.3 * l * i + -1.6 * i * i + 2.2 * l + -1.8 * i + 1.9 * e);
        }],
        "ease-in-out": ["ease-in-out", function (e, t, a, n) {
          var i = (e /= n) * e, l = i * e;
          return t + a * (2 * l * i + -5 * i * i + 2 * l + 2 * i);
        }],
        linear: ["linear", function (e, t, a, n) {
          return a * e / n + t;
        }],
        "ease-in-quad": ["cubic-bezier(0.550, 0.085, 0.680, 0.530)", function (e, t, a, n) {
          return a * (e /= n) * e + t;
        }],
        "ease-out-quad": ["cubic-bezier(0.250, 0.460, 0.450, 0.940)", function (e, t, a, n) {
          return -a * (e /= n) * (e - 2) + t;
        }],
        "ease-in-out-quad": ["cubic-bezier(0.455, 0.030, 0.515, 0.955)", function (e, t, a, n) {
          return (e /= n / 2) < 1 ? a / 2 * e * e + t : -a / 2 * (--e * (e - 2) - 1) + t;
        }],
        "ease-in-cubic": ["cubic-bezier(0.550, 0.055, 0.675, 0.190)", function (e, t, a, n) {
          return a * (e /= n) * e * e + t;
        }],
        "ease-out-cubic": ["cubic-bezier(0.215, 0.610, 0.355, 1)", function (e, t, a, n) {
          return a * ((e = e / n - 1) * e * e + 1) + t;
        }],
        "ease-in-out-cubic": ["cubic-bezier(0.645, 0.045, 0.355, 1)", function (e, t, a, n) {
          return (e /= n / 2) < 1 ? a / 2 * e * e * e + t : a / 2 * ((e -= 2) * e * e + 2) + t;
        }],
        "ease-in-quart": ["cubic-bezier(0.895, 0.030, 0.685, 0.220)", function (e, t, a, n) {
          return a * (e /= n) * e * e * e + t;
        }],
        "ease-out-quart": ["cubic-bezier(0.165, 0.840, 0.440, 1)", function (e, t, a, n) {
          return -a * ((e = e / n - 1) * e * e * e - 1) + t;
        }],
        "ease-in-out-quart": ["cubic-bezier(0.770, 0, 0.175, 1)", function (e, t, a, n) {
          return (e /= n / 2) < 1 ? a / 2 * e * e * e * e + t : -a / 2 * ((e -= 2) * e * e * e - 2) + t;
        }],
        "ease-in-quint": ["cubic-bezier(0.755, 0.050, 0.855, 0.060)", function (e, t, a, n) {
          return a * (e /= n) * e * e * e * e + t;
        }],
        "ease-out-quint": ["cubic-bezier(0.230, 1, 0.320, 1)", function (e, t, a, n) {
          return a * ((e = e / n - 1) * e * e * e * e + 1) + t;
        }],
        "ease-in-out-quint": ["cubic-bezier(0.860, 0, 0.070, 1)", function (e, t, a, n) {
          return (e /= n / 2) < 1 ? a / 2 * e * e * e * e * e + t : a / 2 * ((e -= 2) * e * e * e * e + 2) + t;
        }],
        "ease-in-sine": ["cubic-bezier(0.470, 0, 0.745, 0.715)", function (e, t, a, n) {
          return -a * Math.cos(e / n * (Math.PI / 2)) + a + t;
        }],
        "ease-out-sine": ["cubic-bezier(0.390, 0.575, 0.565, 1)", function (e, t, a, n) {
          return a * Math.sin(e / n * (Math.PI / 2)) + t;
        }],
        "ease-in-out-sine": ["cubic-bezier(0.445, 0.050, 0.550, 0.950)", function (e, t, a, n) {
          return -a / 2 * (Math.cos(Math.PI * e / n) - 1) + t;
        }],
        "ease-in-expo": ["cubic-bezier(0.950, 0.050, 0.795, 0.035)", function (e, t, a, n) {
          return 0 === e ? t : a * Math.pow(2, 10 * (e / n - 1)) + t;
        }],
        "ease-out-expo": ["cubic-bezier(0.190, 1, 0.220, 1)", function (e, t, a, n) {
          return e === n ? t + a : a * (-Math.pow(2, -10 * e / n) + 1) + t;
        }],
        "ease-in-out-expo": ["cubic-bezier(1, 0, 0, 1)", function (e, t, a, n) {
          return 0 === e ? t : e === n ? t + a : (e /= n / 2) < 1 ? a / 2 * Math.pow(2, 10 * (e - 1)) + t : a / 2 * (-Math.pow(2, -10 * --e) + 2) + t;
        }],
        "ease-in-circ": ["cubic-bezier(0.600, 0.040, 0.980, 0.335)", function (e, t, a, n) {
          return -a * (Math.sqrt(1 - (e /= n) * e) - 1) + t;
        }],
        "ease-out-circ": ["cubic-bezier(0.075, 0.820, 0.165, 1)", function (e, t, a, n) {
          return a * Math.sqrt(1 - (e = e / n - 1) * e) + t;
        }],
        "ease-in-out-circ": ["cubic-bezier(0.785, 0.135, 0.150, 0.860)", function (e, t, a, n) {
          return (e /= n / 2) < 1 ? -a / 2 * (Math.sqrt(1 - e * e) - 1) + t : a / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + t;
        }],
        "ease-in-back": ["cubic-bezier(0.600, -0.280, 0.735, 0.045)", function (e, t, a, n, i) {
          return (void 0 === i && (i = 1.70158), a * (e /= n) * e * ((i + 1) * e - i) + t);
        }],
        "ease-out-back": ["cubic-bezier(0.175, 0.885, 0.320, 1.275)", function (e, t, a, n, i) {
          return (void 0 === i && (i = 1.70158), a * ((e = e / n - 1) * e * ((i + 1) * e + i) + 1) + t);
        }],
        "ease-in-out-back": ["cubic-bezier(0.680, -0.550, 0.265, 1.550)", function (e, t, a, n, i) {
          return (void 0 === i && (i = 1.70158), (e /= n / 2) < 1 ? a / 2 * e * e * (((i *= 1.525) + 1) * e - i) + t : a / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + t);
        }]
      }, u = {
        "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
        "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
        "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)"
      }, p = window, E = "bkwld-tram", I = /[\-\.0-9]/g, T = /[A-Z]/, y = "number", b = /^(rgb|#)/, m = /(em|cm|mm|in|pt|pc|px)$/, g = /(em|cm|mm|in|pt|pc|px|%)$/, O = /(deg|rad|turn)$/, L = "unitless", v = /(all|none) 0s ease 0s/, _ = /^(width|height)$/, N = document.createElement("a"), R = ["Webkit", "Moz", "O", "ms"], S = ["-webkit-", "-moz-", "-o-", "-ms-"], A = function (e) {
        if ((e in N.style)) return {
          dom: e,
          css: e
        };
        var t, a, n = "", i = e.split("-");
        for (t = 0; t < i.length; t++) n += i[t].charAt(0).toUpperCase() + i[t].slice(1);
        for (t = 0; t < R.length; t++) if (((a = R[t] + n) in N.style)) return {
          dom: a,
          css: S[t] + e
        };
      }, C = t.support = {
        bind: Function.prototype.bind,
        transform: A("transform"),
        transition: A("transition"),
        backface: A("backface-visibility"),
        timing: A("transition-timing-function")
      };
      if (C.transition) {
        var M = C.timing.dom;
        if ((N.style[M] = f["ease-in-back"][0], !N.style[M])) for (var h in u) f[h][0] = u[h];
      }
      var k = t.frame = (o = p.requestAnimationFrame || p.webkitRequestAnimationFrame || p.mozRequestAnimationFrame || p.oRequestAnimationFrame || p.msRequestAnimationFrame) && C.bind ? o.bind(p) : function (e) {
        p.setTimeout(e, 16);
      }, U = t.now = (s = (c = p.performance) && (c.now || c.webkitNow || c.msNow || c.mozNow)) && C.bind ? s.bind(c) : Date.now || (function () {
        return +new Date();
      }), B = r(function (t) {
        function a(e, t) {
          var a = (function (e) {
            for (var t = -1, a = e ? e.length : 0, n = []; ++t < a; ) {
              var i = e[t];
              i && n.push(i);
            }
            return n;
          })(("" + e).split(" ")), n = a[0];
          t = t || ({});
          var i = z[n];
          if (!i) return d("Unsupported property: " + n);
          if (!t.weak || !this.props[n]) {
            var l = i[0], o = this.props[n];
            return (o || (o = this.props[n] = new l.Bare()), o.init(this.$el, a, i, t), o);
          }
        }
        function n(e, t, n) {
          if (e) {
            var d = typeof e;
            if ((t || (this.timer && this.timer.destroy(), this.queue = [], this.active = !1), "number" == d && t)) return (this.timer = new D({
              duration: e,
              context: this,
              complete: i
            }), void (this.active = !0));
            if ("string" == d && t) {
              switch (e) {
                case "hide":
                  c.call(this);
                  break;
                case "stop":
                  o.call(this);
                  break;
                case "redraw":
                  s.call(this);
                  break;
                default:
                  a.call(this, e, n && n[1]);
              }
              return i.call(this);
            }
            if ("function" == d) return void e.call(this, this);
            if ("object" == d) {
              var u = 0;
              (f.call(this, e, function (e, t) {
                (e.span > u && (u = e.span), e.stop(), e.animate(t));
              }, function (e) {
                ("wait" in e) && (u = l(e.wait, 0));
              }), r.call(this), u > 0 && (this.timer = new D({
                duration: u,
                context: this
              }), this.active = !0, t && (this.timer.complete = i)));
              var p = this, E = !1, I = {};
              k(function () {
                (f.call(p, e, function (e) {
                  e.active && (E = !0, I[e.name] = e.nextStyle);
                }), E && p.$el.css(I));
              });
            }
          }
        }
        function i() {
          if ((this.timer && this.timer.destroy(), this.active = !1, this.queue.length)) {
            var e = this.queue.shift();
            n.call(this, e.options, !0, e.args);
          }
        }
        function o(e) {
          var t;
          (this.timer && this.timer.destroy(), this.queue = [], this.active = !1, "string" == typeof e ? (t = {})[e] = 1 : t = "object" == typeof e && null != e ? e : this.props, f.call(this, t, u), r.call(this));
        }
        function c() {
          (o.call(this), this.el.style.display = "none");
        }
        function s() {
          this.el.offsetHeight;
        }
        function r() {
          var e, t, a = [];
          for (e in (this.upstream && a.push(this.upstream), this.props)) (t = this.props[e]).active && a.push(t.string);
          (a = a.join(","), this.style !== a && (this.style = a, this.el.style[C.transition.dom] = a));
        }
        function f(e, t, n) {
          var i, l, d, o, c = t !== u, s = {};
          for (i in e) (d = e[i], (i in j) ? (s.transform || (s.transform = {}), s.transform[i] = d) : (T.test(i) && (i = i.replace(/[A-Z]/g, function (e) {
            return "-" + e.toLowerCase();
          })), (i in z) ? s[i] = d : (o || (o = {}), o[i] = d)));
          for (i in s) {
            if ((d = s[i], !(l = this.props[i]))) {
              if (!c) continue;
              l = a.call(this, i);
            }
            t.call(this, l, d);
          }
          n && o && n.call(this, o);
        }
        function u(e) {
          e.stop();
        }
        function p(e, t) {
          e.set(t);
        }
        function I(e) {
          this.$el.css(e);
        }
        function y(e, a) {
          t[e] = function () {
            return this.children ? b.call(this, a, arguments) : (this.el && a.apply(this, arguments), this);
          };
        }
        function b(e, t) {
          var a, n = this.children.length;
          for (a = 0; n > a; a++) e.apply(this.children[a], t);
          return this;
        }
        (t.init = function (t) {
          if ((this.$el = e(t), this.el = this.$el[0], this.props = {}, this.queue = [], this.style = "", this.active = !1, W.keepInherited && !W.fallback)) {
            var a = H(this.el, "transition");
            a && !v.test(a) && (this.upstream = a);
          }
          C.backface && W.hideBackface && X(this.el, C.backface.css, "hidden");
        }, y("add", a), y("start", n), y("wait", function (e) {
          (e = l(e, 0), this.active ? this.queue.push({
            options: e
          }) : (this.timer = new D({
            duration: e,
            context: this,
            complete: i
          }), this.active = !0));
        }), y("then", function (e) {
          return this.active ? (this.queue.push({
            options: e,
            args: arguments
          }), void (this.timer.complete = i)) : d("No active transition timer. Use start() or wait() before then().");
        }), y("next", i), y("stop", o), y("set", function (e) {
          (o.call(this, e), f.call(this, e, p, I));
        }), y("show", function (e) {
          ("string" != typeof e && (e = "block"), this.el.style.display = e);
        }), y("hide", c), y("redraw", s), y("destroy", function () {
          (o.call(this), e.removeData(this.el, E), this.$el = this.el = null);
        }));
      }), F = r(B, function (t) {
        function a(t, a) {
          var n = e.data(t, E) || e.data(t, E, new B.Bare());
          return (n.el || n.init(t), a ? n.start(a) : n);
        }
        t.init = function (t, n) {
          var i = e(t);
          if (!i.length) return this;
          if (1 === i.length) return a(i[0], n);
          var l = [];
          return (i.each(function (e, t) {
            l.push(a(t, n));
          }), this.children = l, this);
        };
      }), G = r(function (e) {
        function t() {
          var e = this.get();
          this.update("auto");
          var t = this.get();
          return (this.update(e), t);
        }
        (e.init = function (e, t, a, n) {
          (this.$el = e, this.el = e[0]);
          var i, d, o, c = t[0];
          (a[2] && (c = a[2]), Y[c] && (c = Y[c]), this.name = c, this.type = a[1], this.duration = l(t[1], this.duration, 500), this.ease = (i = t[2], d = this.ease, o = "ease", void 0 !== d && (o = d), (i in f) ? i : o), this.delay = l(t[3], this.delay, 0), this.span = this.duration + this.delay, this.active = !1, this.nextStyle = null, this.auto = _.test(this.name), this.unit = n.unit || this.unit || W.defaultUnit, this.angle = n.angle || this.angle || W.defaultAngle, W.fallback || n.fallback ? this.animate = this.fallback : (this.animate = this.transition, this.string = this.name + " " + this.duration + "ms" + ("ease" != this.ease ? " " + f[this.ease][0] : "") + (this.delay ? " " + this.delay + "ms" : "")));
        }, e.set = function (e) {
          (e = this.convert(e, this.type), this.update(e), this.redraw());
        }, e.transition = function (e) {
          (this.active = !0, e = this.convert(e, this.type), this.auto && ("auto" == this.el.style[this.name] && (this.update(this.get()), this.redraw()), "auto" == e && (e = t.call(this))), this.nextStyle = e);
        }, e.fallback = function (e) {
          var a = this.el.style[this.name] || this.convert(this.get(), this.type);
          (e = this.convert(e, this.type), this.auto && ("auto" == a && (a = this.convert(this.get(), this.type)), "auto" == e && (e = t.call(this))), this.tween = new P({
            from: a,
            to: e,
            duration: this.duration,
            delay: this.delay,
            ease: this.ease,
            update: this.update,
            context: this
          }));
        }, e.get = function () {
          return H(this.el, this.name);
        }, e.update = function (e) {
          X(this.el, this.name, e);
        }, e.stop = function () {
          (this.active || this.nextStyle) && (this.active = !1, this.nextStyle = null, X(this.el, this.name, this.get()));
          var e = this.tween;
          e && e.context && e.destroy();
        }, e.convert = function (e, t) {
          if ("auto" == e && this.auto) return e;
          var a, i, l = "number" == typeof e, o = "string" == typeof e;
          switch (t) {
            case y:
              if (l) return e;
              if (o && "" === e.replace(I, "")) return +e;
              i = "number(unitless)";
              break;
            case b:
              if (o) {
                if ("" === e && this.original) return this.original;
                if (t.test(e)) return "#" == e.charAt(0) && 7 == e.length ? e : ((a = (/rgba?\((\d+),\s*(\d+),\s*(\d+)/).exec(e)) ? n(a[1], a[2], a[3]) : e).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3");
              }
              i = "hex or rgb string";
              break;
            case m:
              if (l) return e + this.unit;
              if (o && t.test(e)) return e;
              i = "number(px) or string(unit)";
              break;
            case g:
              if (l) return e + this.unit;
              if (o && t.test(e)) return e;
              i = "number(px) or string(unit or %)";
              break;
            case O:
              if (l) return e + this.angle;
              if (o && t.test(e)) return e;
              i = "number(deg) or string(angle)";
              break;
            case L:
              if (l || o && g.test(e)) return e;
              i = "number(unitless) or string(unit or %)";
          }
          return (d("Type warning: Expected: [" + i + "] Got: [" + typeof e + "] " + e), e);
        }, e.redraw = function () {
          this.el.offsetHeight;
        });
      }), V = r(G, function (e, t) {
        e.init = function () {
          (t.init.apply(this, arguments), this.original || (this.original = this.convert(this.get(), b)));
        };
      }), x = r(G, function (e, t) {
        (e.init = function () {
          (t.init.apply(this, arguments), this.animate = this.fallback);
        }, e.get = function () {
          return this.$el[this.name]();
        }, e.update = function (e) {
          this.$el[this.name](e);
        });
      }), w = r(G, function (e, t) {
        function a(e, t) {
          var a, n, i, l, d;
          for (a in e) (i = (l = j[a])[0], n = l[1] || a, d = this.convert(e[a], i), t.call(this, n, d, i));
        }
        (e.init = function () {
          (t.init.apply(this, arguments), this.current || (this.current = {}, j.perspective && W.perspective && (this.current.perspective = W.perspective, X(this.el, this.name, this.style(this.current)), this.redraw())));
        }, e.set = function (e) {
          (a.call(this, e, function (e, t) {
            this.current[e] = t;
          }), X(this.el, this.name, this.style(this.current)), this.redraw());
        }, e.transition = function (e) {
          var t = this.values(e);
          this.tween = new Q({
            current: this.current,
            values: t,
            duration: this.duration,
            delay: this.delay,
            ease: this.ease
          });
          var a, n = {};
          for (a in this.current) n[a] = (a in t) ? t[a] : this.current[a];
          (this.active = !0, this.nextStyle = this.style(n));
        }, e.fallback = function (e) {
          var t = this.values(e);
          this.tween = new Q({
            current: this.current,
            values: t,
            duration: this.duration,
            delay: this.delay,
            ease: this.ease,
            update: this.update,
            context: this
          });
        }, e.update = function () {
          X(this.el, this.name, this.style(this.current));
        }, e.style = function (e) {
          var t, a = "";
          for (t in e) a += t + "(" + e[t] + ") ";
          return a;
        }, e.values = function (e) {
          var t, n = {};
          return (a.call(this, e, function (e, a, i) {
            (n[e] = a, void 0 === this.current[e] && (t = 0, ~e.indexOf("scale") && (t = 1), this.current[e] = this.convert(t, i)));
          }), n);
        });
      }), P = r(function (t) {
        function l() {
          var e, t, a, n = c.length;
          if (n) for ((k(l), t = U(), e = n); e--; ) (a = c[e]) && a.render(t);
        }
        var o = {
          ease: f.ease[1],
          from: 0,
          to: 1
        };
        (t.init = function (e) {
          (this.duration = e.duration || 0, this.delay = e.delay || 0);
          var t = e.ease || o.ease;
          (f[t] && (t = f[t][1]), "function" != typeof t && (t = o.ease), this.ease = t, this.update = e.update || i, this.complete = e.complete || i, this.context = e.context || this, this.name = e.name);
          var a = e.from, n = e.to;
          (void 0 === a && (a = o.from), void 0 === n && (n = o.to), this.unit = e.unit || "", "number" == typeof a && "number" == typeof n ? (this.begin = a, this.change = n - a) : this.format(n, a), this.value = this.begin + this.unit, this.start = U(), !1 !== e.autoplay && this.play());
        }, t.play = function () {
          this.active || (this.start || (this.start = U()), this.active = !0, 1 === c.push(this) && k(l));
        }, t.stop = function () {
          var t, a;
          this.active && (this.active = !1, (a = e.inArray(this, c)) >= 0 && (t = c.slice(a + 1), c.length = a, t.length && (c = c.concat(t))));
        }, t.render = function (e) {
          var t, a = e - this.start;
          if (this.delay) {
            if (a <= this.delay) return;
            a -= this.delay;
          }
          if (a < this.duration) {
            var i, l, d = this.ease(a, 0, 1, this.duration);
            return (t = this.startRGB ? (i = this.startRGB, l = this.endRGB, n(i[0] + d * (l[0] - i[0]), i[1] + d * (l[1] - i[1]), i[2] + d * (l[2] - i[2]))) : Math.round((this.begin + d * this.change) * s) / s, this.value = t + this.unit, void this.update.call(this.context, this.value));
          }
          (t = this.endHex || this.begin + this.change, this.value = t + this.unit, this.update.call(this.context, this.value), this.complete.call(this.context), this.destroy());
        }, t.format = function (e, t) {
          if ((t += "", "#" == (e += "").charAt(0))) return (this.startRGB = a(t), this.endRGB = a(e), this.endHex = e, this.begin = 0, void (this.change = 1));
          if (!this.unit) {
            var n = t.replace(I, "");
            (n !== e.replace(I, "") && d("Units do not match [tween]: " + t + ", " + e), this.unit = n);
          }
          (t = parseFloat(t), e = parseFloat(e), this.begin = this.value = t, this.change = e - t);
        }, t.destroy = function () {
          (this.stop(), this.context = null, this.ease = this.update = this.complete = i);
        });
        var c = [], s = 1000;
      }), D = r(P, function (e) {
        (e.init = function (e) {
          (this.duration = e.duration || 0, this.complete = e.complete || i, this.context = e.context, this.play());
        }, e.render = function (e) {
          e - this.start < this.duration || (this.complete.call(this.context), this.destroy());
        });
      }), Q = r(P, function (e, t) {
        (e.init = function (e) {
          var t, a;
          for (t in (this.context = e.context, this.update = e.update, this.tweens = [], this.current = e.current, e.values)) (a = e.values[t], this.current[t] !== a && this.tweens.push(new P({
            name: t,
            from: this.current[t],
            to: a,
            duration: e.duration,
            delay: e.delay,
            ease: e.ease,
            autoplay: !1
          })));
          this.play();
        }, e.render = function (e) {
          var t, a, n = this.tweens.length, i = !1;
          for (t = n; t--; ) (a = this.tweens[t]).context && (a.render(e), this.current[a.name] = a.value, i = !0);
          return i ? void (this.update && this.update.call(this.context)) : this.destroy();
        }, e.destroy = function () {
          if ((t.destroy.call(this), this.tweens)) {
            var e;
            for (e = this.tweens.length; e--; ) this.tweens[e].destroy();
            (this.tweens = null, this.current = null);
          }
        });
      }), W = t.config = {
        debug: !1,
        defaultUnit: "px",
        defaultAngle: "deg",
        keepInherited: !1,
        hideBackface: !1,
        perspective: "",
        fallback: !C.transition,
        agentTests: []
      };
      (t.fallback = function (e) {
        if (!C.transition) return W.fallback = !0;
        W.agentTests.push("(" + e + ")");
        var t = RegExp(W.agentTests.join("|"), "i");
        W.fallback = t.test(navigator.userAgent);
      }, t.fallback("6.0.[2-5] Safari"), t.tween = function (e) {
        return new P(e);
      }, t.delay = function (e, t, a) {
        return new D({
          complete: t,
          duration: e,
          context: a
        });
      }, e.fn.tram = function (e) {
        return t.call(null, this, e);
      });
      var X = e.style, H = e.css, Y = {
        transform: C.transform && C.transform.css
      }, z = {
        color: [V, b],
        background: [V, b, "background-color"],
        "outline-color": [V, b],
        "border-color": [V, b],
        "border-top-color": [V, b],
        "border-right-color": [V, b],
        "border-bottom-color": [V, b],
        "border-left-color": [V, b],
        "border-width": [G, m],
        "border-top-width": [G, m],
        "border-right-width": [G, m],
        "border-bottom-width": [G, m],
        "border-left-width": [G, m],
        "border-spacing": [G, m],
        "letter-spacing": [G, m],
        margin: [G, m],
        "margin-top": [G, m],
        "margin-right": [G, m],
        "margin-bottom": [G, m],
        "margin-left": [G, m],
        padding: [G, m],
        "padding-top": [G, m],
        "padding-right": [G, m],
        "padding-bottom": [G, m],
        "padding-left": [G, m],
        "outline-width": [G, m],
        opacity: [G, y],
        top: [G, g],
        right: [G, g],
        bottom: [G, g],
        left: [G, g],
        "font-size": [G, g],
        "text-indent": [G, g],
        "word-spacing": [G, g],
        width: [G, g],
        "min-width": [G, g],
        "max-width": [G, g],
        height: [G, g],
        "min-height": [G, g],
        "max-height": [G, g],
        "line-height": [G, L],
        "scroll-top": [x, y, "scrollTop"],
        "scroll-left": [x, y, "scrollLeft"]
      }, j = {};
      (C.transform && (z.transform = [w], j = {
        x: [g, "translateX"],
        y: [g, "translateY"],
        rotate: [O],
        rotateX: [O],
        rotateY: [O],
        scale: [y],
        scaleX: [y],
        scaleY: [y],
        skew: [O],
        skewX: [O],
        skewY: [O]
      }), C.transform && C.backface && (j.z = [g, "translateZ"], j.rotateZ = [O], j.scaleZ = [y], j.perspective = [m]));
      var K = /ms/, $ = /s|\./;
      return e.tram = t;
    })(window.jQuery);
  },
  5756: function (e, t, a) {
    "use strict";
    var n, i, l, d, o, c, s, r, f, u, p, E, I, T, y, b, m, g, O, L, v = window.$, _ = a(5487) && v.tram;
    ((n = {}).VERSION = "1.6.0-Webflow", i = {}, l = Array.prototype, d = Object.prototype, o = Function.prototype, l.push, c = l.slice, l.concat, d.toString, s = d.hasOwnProperty, r = l.forEach, f = l.map, l.reduce, l.reduceRight, u = l.filter, l.every, p = l.some, E = l.indexOf, l.lastIndexOf, I = Object.keys, o.bind, T = n.each = n.forEach = function (e, t, a) {
      if (null == e) return e;
      if (r && e.forEach === r) e.forEach(t, a); else if (e.length === +e.length) {
        for (var l = 0, d = e.length; l < d; l++) if (t.call(a, e[l], l, e) === i) return;
      } else for (var o = n.keys(e), l = 0, d = o.length; l < d; l++) if (t.call(a, e[o[l]], o[l], e) === i) return;
      return e;
    }, n.map = n.collect = function (e, t, a) {
      var n = [];
      return null == e ? n : f && e.map === f ? e.map(t, a) : (T(e, function (e, i, l) {
        n.push(t.call(a, e, i, l));
      }), n);
    }, n.find = n.detect = function (e, t, a) {
      var n;
      return (y(e, function (e, i, l) {
        if (t.call(a, e, i, l)) return (n = e, !0);
      }), n);
    }, n.filter = n.select = function (e, t, a) {
      var n = [];
      return null == e ? n : u && e.filter === u ? e.filter(t, a) : (T(e, function (e, i, l) {
        t.call(a, e, i, l) && n.push(e);
      }), n);
    }, y = n.some = n.any = function (e, t, a) {
      t || (t = n.identity);
      var l = !1;
      return null == e ? l : p && e.some === p ? e.some(t, a) : (T(e, function (e, n, d) {
        if (l || (l = t.call(a, e, n, d))) return i;
      }), !!l);
    }, n.contains = n.include = function (e, t) {
      return null != e && (E && e.indexOf === E ? -1 != e.indexOf(t) : y(e, function (e) {
        return e === t;
      }));
    }, n.delay = function (e, t) {
      var a = c.call(arguments, 2);
      return setTimeout(function () {
        return e.apply(null, a);
      }, t);
    }, n.defer = function (e) {
      return n.delay.apply(n, [e, 1].concat(c.call(arguments, 1)));
    }, n.throttle = function (e) {
      var t, a, n;
      return function () {
        t || (t = !0, a = arguments, n = this, _.frame(function () {
          (t = !1, e.apply(n, a));
        }));
      };
    }, n.debounce = function (e, t, a) {
      var i, l, d, o, c, s = function () {
        var r = n.now() - o;
        r < t ? i = setTimeout(s, t - r) : (i = null, a || (c = e.apply(d, l), d = l = null));
      };
      return function () {
        (d = this, l = arguments, o = n.now());
        var r = a && !i;
        return (i || (i = setTimeout(s, t)), r && (c = e.apply(d, l), d = l = null), c);
      };
    }, n.defaults = function (e) {
      if (!n.isObject(e)) return e;
      for (var t = 1, a = arguments.length; t < a; t++) {
        var i = arguments[t];
        for (var l in i) void 0 === e[l] && (e[l] = i[l]);
      }
      return e;
    }, n.keys = function (e) {
      if (!n.isObject(e)) return [];
      if (I) return I(e);
      var t = [];
      for (var a in e) n.has(e, a) && t.push(a);
      return t;
    }, n.has = function (e, t) {
      return s.call(e, t);
    }, n.isObject = function (e) {
      return e === Object(e);
    }, n.now = Date.now || (function () {
      return new Date().getTime();
    }), n.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    }, b = /(.)^/, m = {
      "'": "'",
      "\\": "\\",
      "\r": "r",
      "\n": "n",
      " ": "u2028",
      " ": "u2029"
    }, g = /\\|'|\r|\n|\u2028|\u2029/g, O = function (e) {
      return "\\" + m[e];
    }, L = /^\s*(\w|\$)+\s*$/, n.template = function (e, t, a) {
      !t && a && (t = a);
      var i, l = RegExp([((t = n.defaults({}, t, n.templateSettings)).escape || b).source, (t.interpolate || b).source, (t.evaluate || b).source].join("|") + "|$", "g"), d = 0, o = "__p+='";
      (e.replace(l, function (t, a, n, i, l) {
        return (o += e.slice(d, l).replace(g, O), d = l + t.length, a ? o += "'+\n((__t=(" + a + "))==null?'':_.escape(__t))+\n'" : n ? o += "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : i && (o += "';\n" + i + "\n__p+='"), t);
      }), o += "';\n");
      var c = t.variable;
      if (c) {
        if (!L.test(c)) throw Error("variable is not a bare identifier: " + c);
      } else (o = "with(obj||{}){\n" + o + "}\n", c = "obj");
      o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
      try {
        i = Function(t.variable || "obj", "_", o);
      } catch (e) {
        throw (e.source = o, e);
      }
      var s = function (e) {
        return i.call(this, e, n);
      };
      return (s.source = "function(" + c + "){\n" + o + "}", s);
    }, e.exports = n);
  },
  9461: function (e, t, a) {
    "use strict";
    var n = a(3949);
    n.define("brand", e.exports = function (e) {
      var t, a = {}, i = document, l = e("html"), d = e("body"), o = window.location, c = (/PhantomJS/i).test(navigator.userAgent), s = "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange";
      function r() {
        var a = i.fullScreen || i.mozFullScreen || i.webkitIsFullScreen || i.msFullscreenElement || !!i.webkitFullscreenElement;
        e(t).attr("style", a ? "display: none !important;" : "");
      }
      function f() {
        var e = d.children(".w-webflow-badge"), a = e.length && e.get(0) === t, i = n.env("editor");
        if (a) {
          i && e.remove();
          return;
        }
        (e.length && e.remove(), i || d.append(t));
      }
      return (a.ready = function () {
        var a, n, d, u = l.attr("data-wf-status"), p = l.attr("data-wf-domain") || "";
        ((/\.webflow\.io$/i).test(p) && o.hostname !== p && (u = !0), u && !c && (t = t || (a = e("<a class=\"w-webflow-badge\"></a>").attr("href", "https://webflow.com?utm_campaign=brandjs"), n = e("<img>").attr("src", "img/webflow-badge-icon-d2.89e12c322e.svg").attr("alt", "").css({
          marginRight: "4px",
          width: "26px"
        }), d = e("<img>").attr("src", "img/webflow-badge-text-d2.c82cec3b78.svg").attr("alt", "Made in Webflow"), a.append(n, d), a[0]), f(), setTimeout(f, 500), e(i).off(s, r).on(s, r)));
      }, a);
    });
  },
  322: function (e, t, a) {
    "use strict";
    var n = a(3949);
    n.define("edit", e.exports = function (e, t, a) {
      if ((a = a || ({}), (n.env("test") || n.env("frame")) && !a.fixture && !(function () {
        try {
          return !!(window.top.__Cypress__ || window.PLAYWRIGHT_TEST);
        } catch (e) {
          return !1;
        }
      })())) return {
        exit: 1
      };
      var i, l = e(window), d = e(document.documentElement), o = document.location, c = "hashchange", s = a.load || (function () {
        var t, a, n;
        (i = !0, window.WebflowEditor = !0, l.off(c, f), t = function (t) {
          var a;
          e.ajax({
            url: p("https://editor-api.webflow.com/api/editor/view"),
            data: {
              siteId: d.attr("data-wf-site")
            },
            xhrFields: {
              withCredentials: !0
            },
            dataType: "json",
            crossDomain: !0,
            success: (a = t, function (t) {
              var n, i, l;
              if (!t) return void console.error("Could not load editor data");
              (t.thirdPartyCookiesSupported = a, i = (n = t.scriptPath).indexOf("//") >= 0 ? n : p("https://editor-api.webflow.com" + n), l = function () {
                window.WebflowEditor(t);
              }, e.ajax({
                type: "GET",
                url: i,
                dataType: "script",
                cache: !0
              }).then(l, u));
            })
          });
        }, (a = window.document.createElement("iframe")).src = "site/third-party-cookie-check.html", a.style.display = "none", a.sandbox = "allow-scripts allow-same-origin", n = function (e) {
          "WF_third_party_cookies_unsupported" === e.data ? (E(a, n), t(!1)) : "WF_third_party_cookies_supported" === e.data && (E(a, n), t(!0));
        }, a.onerror = function () {
          (E(a, n), t(!1));
        }, window.addEventListener("message", n, !1), window.document.body.appendChild(a));
      }), r = !1;
      try {
        r = localStorage && localStorage.getItem && localStorage.getItem("WebflowEditor");
      } catch (e) {}
      function f() {
        !i && (/\?edit/).test(o.hash) && s();
      }
      function u(e, t, a) {
        throw (console.error("Could not load editor script: " + t), a);
      }
      function p(e) {
        return e.replace(/([^:])\/\//g, "$1/");
      }
      function E(e, t) {
        (window.removeEventListener("message", t, !1), e.remove());
      }
      return (r ? s() : o.search ? ((/[?&](edit)(?:[=&?]|$)/).test(o.search) || (/\?edit$/).test(o.href)) && s() : l.on(c, f).triggerHandler(c), {});
    });
  },
  2338: function (e, t, a) {
    "use strict";
    a(3949).define("focus-visible", e.exports = function () {
      return {
        ready: function () {
          if ("undefined" != typeof document) try {
            document.querySelector(":focus-visible");
          } catch (e) {
            !(function (e) {
              var t = !0, a = !1, n = null, i = {
                text: !0,
                search: !0,
                url: !0,
                tel: !0,
                email: !0,
                password: !0,
                number: !0,
                date: !0,
                month: !0,
                week: !0,
                time: !0,
                datetime: !0,
                "datetime-local": !0
              };
              function l(e) {
                return !!e && e !== document && "HTML" !== e.nodeName && "BODY" !== e.nodeName && ("classList" in e) && ("contains" in e.classList);
              }
              function d(e) {
                e.getAttribute("data-wf-focus-visible") || e.setAttribute("data-wf-focus-visible", "true");
              }
              function o() {
                t = !1;
              }
              function c() {
                (document.addEventListener("mousemove", s), document.addEventListener("mousedown", s), document.addEventListener("mouseup", s), document.addEventListener("pointermove", s), document.addEventListener("pointerdown", s), document.addEventListener("pointerup", s), document.addEventListener("touchmove", s), document.addEventListener("touchstart", s), document.addEventListener("touchend", s));
              }
              function s(e) {
                e.target.nodeName && "html" === e.target.nodeName.toLowerCase() || (t = !1, document.removeEventListener("mousemove", s), document.removeEventListener("mousedown", s), document.removeEventListener("mouseup", s), document.removeEventListener("pointermove", s), document.removeEventListener("pointerdown", s), document.removeEventListener("pointerup", s), document.removeEventListener("touchmove", s), document.removeEventListener("touchstart", s), document.removeEventListener("touchend", s));
              }
              (document.addEventListener("keydown", function (a) {
                a.metaKey || a.altKey || a.ctrlKey || (l(e.activeElement) && d(e.activeElement), t = !0);
              }, !0), document.addEventListener("mousedown", o, !0), document.addEventListener("pointerdown", o, !0), document.addEventListener("touchstart", o, !0), document.addEventListener("visibilitychange", function () {
                "hidden" === document.visibilityState && (a && (t = !0), c());
              }, !0), c(), e.addEventListener("focus", function (e) {
                if (l(e.target)) {
                  var a, n, o;
                  (t || (n = (a = e.target).type, "INPUT" === (o = a.tagName) && i[n] && !a.readOnly || "TEXTAREA" === o && !a.readOnly || a.isContentEditable || 0)) && d(e.target);
                }
              }, !0), e.addEventListener("blur", function (e) {
                if (l(e.target) && e.target.hasAttribute("data-wf-focus-visible")) {
                  var t;
                  (a = !0, window.clearTimeout(n), n = window.setTimeout(function () {
                    a = !1;
                  }, 100), (t = e.target).getAttribute("data-wf-focus-visible") && t.removeAttribute("data-wf-focus-visible"));
                }
              }, !0));
            })(document);
          }
        }
      };
    });
  },
  8334: function (e, t, a) {
    "use strict";
    var n = a(3949);
    n.define("focus", e.exports = function () {
      var e = [], t = !1;
      function a(a) {
        t && (a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), e.unshift(a));
      }
      function i(a) {
        var n, i;
        (i = (n = a.target).tagName, ((/^a$/i).test(i) && null != n.href || (/^(button|textarea)$/i).test(i) && !0 !== n.disabled || (/^input$/i).test(i) && (/^(button|reset|submit|radio|checkbox)$/i).test(n.type) && !n.disabled || !(/^(button|input|textarea|select|a)$/i).test(i) && !Number.isNaN(Number.parseFloat(n.tabIndex)) || (/^audio$/i).test(i) || (/^video$/i).test(i) && !0 === n.controls) && (t = !0, setTimeout(() => {
          for ((t = !1, a.target.focus()); e.length > 0; ) {
            var n = e.pop();
            n.target.dispatchEvent(new MouseEvent(n.type, n));
          }
        }, 0)));
      }
      return {
        ready: function () {
          "undefined" != typeof document && document.body.hasAttribute("data-wf-focus-within") && n.env.safari && (document.addEventListener("mousedown", i, !0), document.addEventListener("mouseup", a, !0), document.addEventListener("click", a, !0));
        }
      };
    });
  },
  7199: function (e) {
    "use strict";
    var t = window.jQuery, a = {}, n = [], i = ".w-ix", l = {
      reset: function (e, t) {
        t.__wf_intro = null;
      },
      intro: function (e, n) {
        n.__wf_intro || (n.__wf_intro = !0, t(n).triggerHandler(a.types.INTRO));
      },
      outro: function (e, n) {
        n.__wf_intro && (n.__wf_intro = null, t(n).triggerHandler(a.types.OUTRO));
      }
    };
    (a.triggers = {}, a.types = {
      INTRO: "w-ix-intro" + i,
      OUTRO: "w-ix-outro" + i
    }, a.init = function () {
      for (var e = n.length, i = 0; i < e; i++) {
        var d = n[i];
        d[0](0, d[1]);
      }
      (n = [], t.extend(a.triggers, l));
    }, a.async = function () {
      for (var e in l) {
        var t = l[e];
        l.hasOwnProperty(e) && (a.triggers[e] = function (e, a) {
          n.push([t, a]);
        });
      }
    }, a.async(), e.exports = a);
  },
  5134: function (e, t, a) {
    "use strict";
    var n = a(7199);
    function i(e, t) {
      var a = document.createEvent("CustomEvent");
      (a.initCustomEvent(t, !0, !0, null), e.dispatchEvent(a));
    }
    var l = window.jQuery, d = {}, o = ".w-ix";
    (d.triggers = {}, d.types = {
      INTRO: "w-ix-intro" + o,
      OUTRO: "w-ix-outro" + o
    }, l.extend(d.triggers, {
      reset: function (e, t) {
        n.triggers.reset(e, t);
      },
      intro: function (e, t) {
        (n.triggers.intro(e, t), i(t, "COMPONENT_ACTIVE"));
      },
      outro: function (e, t) {
        (n.triggers.outro(e, t), i(t, "COMPONENT_INACTIVE"));
      }
    }), e.exports = d);
  },
  941: function (e, t, a) {
    "use strict";
    var n = a(3949), i = a(6011);
    (i.setEnv(n.env), n.define("ix2", e.exports = function () {
      return i;
    }));
  },
  3949: function (e, t, a) {
    "use strict";
    var n, i, l = {}, d = {}, o = [], c = window.Webflow || [], s = window.jQuery, r = s(window), f = s(document), u = s.isFunction, p = l._ = a(5756), E = l.tram = a(5487) && s.tram, I = !1, T = !1;
    function y(e) {
      (l.env() && (u(e.design) && r.on("__wf_design", e.design), u(e.preview) && r.on("__wf_preview", e.preview)), u(e.destroy) && r.on("__wf_destroy", e.destroy), e.ready && u(e.ready) && (function (e) {
        if (I) return e.ready();
        p.contains(o, e.ready) || o.push(e.ready);
      })(e));
    }
    function b(e) {
      var t;
      (u(e.design) && r.off("__wf_design", e.design), u(e.preview) && r.off("__wf_preview", e.preview), u(e.destroy) && r.off("__wf_destroy", e.destroy), e.ready && u(e.ready) && (t = e, o = p.filter(o, function (e) {
        return e !== t.ready;
      })));
    }
    (E.config.hideBackface = !1, E.config.keepInherited = !0, l.define = function (e, t, a) {
      d[e] && b(d[e]);
      var n = d[e] = t(s, p, a) || ({});
      return (y(n), n);
    }, l.require = function (e) {
      return d[e];
    }, l.push = function (e) {
      if (I) {
        u(e) && e();
        return;
      }
      c.push(e);
    }, l.env = function (e) {
      var t = window.__wf_design, a = void 0 !== t;
      return e ? "design" === e ? a && t : "preview" === e ? a && !t : "slug" === e ? a && window.__wf_slug : "editor" === e ? window.WebflowEditor : "test" === e ? window.__wf_test : "frame" === e ? window !== window.top : void 0 : a;
    });
    var m = navigator.userAgent.toLowerCase(), g = l.env.touch = ("ontouchstart" in window) || window.DocumentTouch && document instanceof window.DocumentTouch, O = l.env.chrome = (/chrome/).test(m) && (/Google/).test(navigator.vendor) && parseInt(m.match(/chrome\/(\d+)\./)[1], 10), L = l.env.ios = (/(ipod|iphone|ipad)/).test(m);
    (l.env.safari = (/safari/).test(m) && !O && !L, g && f.on("touchstart mousedown", function (e) {
      n = e.target;
    }), l.validClick = g ? function (e) {
      return e === n || s.contains(e, n);
    } : function () {
      return !0;
    });
    var v = "resize.webflow orientationchange.webflow load.webflow", _ = "scroll.webflow " + v;
    function N(e, t) {
      var a = [], n = {};
      return (n.up = p.throttle(function (e) {
        p.each(a, function (t) {
          t(e);
        });
      }), e && t && e.on(t, n.up), n.on = function (e) {
        "function" == typeof e && (p.contains(a, e) || a.push(e));
      }, n.off = function (e) {
        if (!arguments.length) {
          a = [];
          return;
        }
        a = p.filter(a, function (t) {
          return t !== e;
        });
      }, n);
    }
    function R(e) {
      u(e) && e();
    }
    function S() {
      (i && (i.reject(), r.off("load", i.resolve)), i = new s.Deferred(), r.on("load", i.resolve));
    }
    (l.resize = N(r, v), l.scroll = N(r, _), l.redraw = N(), l.location = function (e) {
      window.location = e;
    }, l.env() && (l.location = function () {}), l.ready = function () {
      (I = !0, T ? (T = !1, p.each(d, y)) : p.each(o, R), p.each(c, R), l.resize.up());
    }, l.load = function (e) {
      i.then(e);
    }, l.destroy = function (e) {
      (e = e || ({}), T = !0, r.triggerHandler("__wf_destroy"), null != e.domready && (I = e.domready), p.each(d, b), l.resize.off(), l.scroll.off(), l.redraw.off(), o = [], c = [], "pending" === i.state() && S());
    }, s(l.ready), S(), e.exports = window.Webflow = l);
  },
  7624: function (e, t, a) {
    "use strict";
    var n = a(3949);
    n.define("links", e.exports = function (e, t) {
      var a, i, l, d = {}, o = e(window), c = n.env(), s = window.location, r = document.createElement("a"), f = "w--current", u = /index\.(html|php)$/, p = /\/$/;
      function E() {
        var e = o.scrollTop(), a = o.height();
        t.each(i, function (t) {
          if (!t.link.attr("hreflang")) {
            var n = t.link, i = t.sec, l = i.offset().top, d = i.outerHeight(), o = 0.5 * a, c = i.is(":visible") && l + d - o >= e && l + o <= e + a;
            t.active !== c && (t.active = c, I(n, f, c));
          }
        });
      }
      function I(e, t, a) {
        var n = e.hasClass(t);
        (!a || !n) && (a || n) && (a ? e.addClass(t) : e.removeClass(t));
      }
      return (d.ready = d.design = d.preview = function () {
        (a = c && n.env("design"), l = n.env("slug") || s.pathname || "", n.scroll.off(E), i = []);
        for (var t = document.links, d = 0; d < t.length; ++d) !(function (t) {
          if (!t.getAttribute("hreflang")) {
            var n = a && t.getAttribute("href-disabled") || t.getAttribute("href");
            if ((r.href = n, !(n.indexOf(":") >= 0))) {
              var d = e(t);
              if (r.hash.length > 1 && r.host + r.pathname === s.host + s.pathname) {
                if (!(/^#[a-zA-Z0-9\-\_]+$/).test(r.hash)) return;
                var o = e(r.hash);
                o.length && i.push({
                  link: d,
                  sec: o,
                  active: !1
                });
                return;
              }
              "#" !== n && "" !== n && I(d, f, r.href === s.href || n === l || u.test(n) && p.test(l));
            }
          }
        })(t[d]);
        i.length && (n.scroll.on(E), E());
      }, d);
    });
  },
  286: function (e, t, a) {
    "use strict";
    var n = a(3949);
    n.define("scroll", e.exports = function (e) {
      var t = {
        WF_CLICK_EMPTY: "click.wf-empty-link",
        WF_CLICK_SCROLL: "click.wf-scroll"
      }, a = window.location, i = !(function () {
        try {
          return !!window.frameElement;
        } catch (e) {
          return !0;
        }
      })() ? window.history : null, l = e(window), d = e(document), o = e(document.body), c = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || (function (e) {
        window.setTimeout(e, 15);
      }), s = n.env("editor") ? ".w-editor-body" : "body", r = "header, " + s + " > .header, " + s + " > .w-nav:not([data-no-scroll])", f = "a[href=\"#\"]", u = "a[href*=\"#\"]:not(.w-tab-link):not(" + f + ")", p = document.createElement("style");
      p.appendChild(document.createTextNode(".wf-force-outline-none[tabindex=\"-1\"]:focus{outline:none;}"));
      var E = /^#[a-zA-Z0-9][\w:.-]*$/;
      let I = "function" == typeof window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
      function T(e, t) {
        var a;
        switch (t) {
          case "add":
            (a = e.attr("tabindex")) ? e.attr("data-wf-tabindex-swap", a) : e.attr("tabindex", "-1");
            break;
          case "remove":
            (a = e.attr("data-wf-tabindex-swap")) ? (e.attr("tabindex", a), e.removeAttr("data-wf-tabindex-swap")) : e.removeAttr("tabindex");
        }
        e.toggleClass("wf-force-outline-none", "add" === t);
      }
      function y(t) {
        var d = t.currentTarget;
        if (!(n.env("design") || window.$.mobile && (/(?:^|\s)ui-link(?:$|\s)/).test(d.className))) {
          var s = E.test(d.hash) && d.host + d.pathname === a.host + a.pathname ? d.hash : "";
          if ("" !== s) {
            var f, u = e(s);
            u.length && (t && (t.preventDefault(), t.stopPropagation()), f = s, a.hash !== f && i && i.pushState && !(n.env.chrome && "file:" === a.protocol) && (i.state && i.state.hash) !== f && i.pushState({
              hash: f
            }, "", f), window.setTimeout(function () {
              !(function (t, a) {
                var n = l.scrollTop(), i = (function (t) {
                  var a = e(r), n = "fixed" === a.css("position") ? a.outerHeight() : 0, i = t.offset().top - n;
                  if ("mid" === t.data("scroll")) {
                    var d = l.height() - n, o = t.outerHeight();
                    o < d && (i -= Math.round((d - o) / 2));
                  }
                  return i;
                })(t);
                if (n !== i) {
                  var d = (function (e, t, a) {
                    if ("none" === document.body.getAttribute("data-wf-scroll-motion") || I.matches) return 0;
                    var n = 1;
                    return (o.add(e).each(function (e, t) {
                      var a = parseFloat(t.getAttribute("data-scroll-time"));
                      !isNaN(a) && a >= 0 && (n = a);
                    }), (472.143 * Math.log(Math.abs(t - a) + 125) - 2000) * n);
                  })(t, n, i), s = Date.now(), f = function () {
                    var e, t, l, o, r, u = Date.now() - s;
                    (window.scroll(0, (e = n, t = i, (l = u) > (o = d) ? t : e + (t - e) * ((r = l / o) < 0.5 ? 4 * r * r * r : (r - 1) * (2 * r - 2) * (2 * r - 2) + 1))), u <= d ? c(f) : "function" == typeof a && a());
                  };
                  c(f);
                }
              })(u, function () {
                (T(u, "add"), u.get(0).focus({
                  preventScroll: !0
                }), T(u, "remove"));
              });
            }, 300 * !t));
          }
        }
      }
      return {
        ready: function () {
          var {WF_CLICK_EMPTY: e, WF_CLICK_SCROLL: a} = t;
          (d.on(a, u, y), d.on(e, f, function (e) {
            e.preventDefault();
          }), document.head.insertBefore(p, document.head.firstChild));
        }
      };
    });
  },
  3695: function (e, t, a) {
    "use strict";
    a(3949).define("touch", e.exports = function (e) {
      var t = {}, a = window.getSelection;
      function n(t) {
        var n, i, l = !1, d = !1, o = Math.min(Math.round(0.04 * window.innerWidth), 40);
        function c(e) {
          var t = e.touches;
          t && t.length > 1 || (l = !0, t ? (d = !0, n = t[0].clientX) : n = e.clientX, i = n);
        }
        function s(t) {
          if (l) {
            if (d && "mousemove" === t.type) {
              (t.preventDefault(), t.stopPropagation());
              return;
            }
            var n, c, s, r, u = t.touches, p = u ? u[0].clientX : t.clientX, E = p - i;
            (i = p, Math.abs(E) > o && a && "" === String(a()) && (n = "swipe", c = t, s = {
              direction: E > 0 ? "right" : "left"
            }, r = e.Event(n, {
              originalEvent: c
            }), e(c.target).trigger(r, s), f()));
          }
        }
        function r(e) {
          if (l && (l = !1, d && "mouseup" === e.type)) {
            (e.preventDefault(), e.stopPropagation(), d = !1);
            return;
          }
        }
        function f() {
          l = !1;
        }
        (t.addEventListener("touchstart", c, !1), t.addEventListener("touchmove", s, !1), t.addEventListener("touchend", r, !1), t.addEventListener("touchcancel", f, !1), t.addEventListener("mousedown", c, !1), t.addEventListener("mousemove", s, !1), t.addEventListener("mouseup", r, !1), t.addEventListener("mouseout", f, !1), this.destroy = function () {
          (t.removeEventListener("touchstart", c, !1), t.removeEventListener("touchmove", s, !1), t.removeEventListener("touchend", r, !1), t.removeEventListener("touchcancel", f, !1), t.removeEventListener("mousedown", c, !1), t.removeEventListener("mousemove", s, !1), t.removeEventListener("mouseup", r, !1), t.removeEventListener("mouseout", f, !1), t = null);
        });
      }
      return (e.event.special.tap = {
        bindType: "click",
        delegateType: "click"
      }, t.init = function (t) {
        return (t = "string" == typeof t ? e(t).get(0) : t) ? new n(t) : null;
      }, t.instance = t.init(document), t);
    });
  },
  9858: function (e, t, a) {
    "use strict";
    var n = a(3949), i = a(5134);
    let l = {
      ARROW_LEFT: 37,
      ARROW_UP: 38,
      ARROW_RIGHT: 39,
      ARROW_DOWN: 40,
      ESCAPE: 27,
      SPACE: 32,
      ENTER: 13,
      HOME: 36,
      END: 35
    }, d = /^#[a-zA-Z0-9\-_]+$/;
    n.define("dropdown", e.exports = function (e, t) {
      var a, o, c = t.debounce, s = {}, r = n.env(), f = !1, u = n.env.touch, p = ".w-dropdown", E = "w--open", I = i.triggers, T = "focusout" + p, y = "keydown" + p, b = "mouseenter" + p, m = "mousemove" + p, g = "mouseleave" + p, O = (u ? "click" : "mouseup") + p, L = "w-close" + p, v = "setting" + p, _ = e(document);
      function N() {
        (a = r && n.env("design"), (o = _.find(p)).each(R));
      }
      function R(t, i) {
        var o, s, f, u, I, m, g, N, R, k, U = e(i), B = e.data(i, p);
        (B || (B = e.data(i, p, {
          open: !1,
          el: U,
          config: {},
          selectedIdx: -1
        })), B.toggle = B.el.children(".w-dropdown-toggle"), B.list = B.el.children(".w-dropdown-list"), B.links = B.list.find("a:not(.w-dropdown .w-dropdown a)"), B.complete = (o = B, function () {
          (o.list.removeClass(E), o.toggle.removeClass(E), o.manageZ && o.el.css("z-index", ""));
        }), B.mouseLeave = (s = B, function () {
          (s.hovering = !1, s.links.is(":focus") || M(s));
        }), B.mouseUpOutside = ((f = B).mouseUpOutside && _.off(O, f.mouseUpOutside), c(function (t) {
          if (f.open) {
            var a = e(t.target);
            if (!a.closest(".w-dropdown-toggle").length) {
              var i = -1 === e.inArray(f.el[0], a.parents(p)), l = n.env("editor");
              if (i) {
                if (l) {
                  var d = 1 === a.parents().length && 1 === a.parents("svg").length, o = a.parents(".w-editor-bem-EditorHoverControls").length;
                  if (d || o) return;
                }
                M(f);
              }
            }
          }
        })), B.mouseMoveOutside = (u = B, c(function (t) {
          if (u.open) {
            var a = e(t.target);
            if (-1 === e.inArray(u.el[0], a.parents(p))) {
              var n = a.parents(".w-editor-bem-EditorHoverControls").length, i = a.parents(".w-editor-bem-RTToolbar").length, l = e(".w-editor-bem-EditorOverlay"), d = l.find(".w-editor-edit-outline").length || l.find(".w-editor-bem-RTToolbar").length;
              if (n || i || d) return;
              (u.hovering = !1, M(u));
            }
          }
        })), S(B));
        var F = B.toggle.attr("id"), G = B.list.attr("id");
        (F || (F = "w-dropdown-toggle-" + t), G || (G = "w-dropdown-list-" + t), B.toggle.attr("id", F), B.toggle.attr("aria-controls", G), B.toggle.attr("aria-haspopup", "menu"), B.toggle.attr("aria-expanded", "false"), B.toggle.find(".w-icon-dropdown-toggle").attr("aria-hidden", "true"), "BUTTON" !== B.toggle.prop("tagName") && (B.toggle.attr("role", "button"), B.toggle.attr("tabindex") || B.toggle.attr("tabindex", "0")), B.list.attr("id", G), B.list.attr("aria-labelledby", F), B.links.each(function (e, t) {
          (t.hasAttribute("tabindex") || t.setAttribute("tabindex", "0"), d.test(t.hash) && t.addEventListener("click", M.bind(null, B)));
        }), B.el.off(p), B.toggle.off(p), B.nav && B.nav.off(p));
        var V = A(B, !0);
        (a && B.el.on(v, (I = B, function (e, t) {
          (t = t || ({}), S(I), !0 === t.open && C(I), !1 === t.open && M(I, {
            immediate: !0
          }));
        })), a || (r && (B.hovering = !1, M(B)), B.config.hover && B.toggle.on(b, (m = B, function () {
          (m.hovering = !0, C(m));
        })), B.el.on(L, V), B.el.on(y, (g = B, function (e) {
          if (!a && g.open) switch ((g.selectedIdx = g.links.index(document.activeElement), e.keyCode)) {
            case l.HOME:
              if (!g.open) return;
              return (g.selectedIdx = 0, h(g), e.preventDefault());
            case l.END:
              if (!g.open) return;
              return (g.selectedIdx = g.links.length - 1, h(g), e.preventDefault());
            case l.ESCAPE:
              return (M(g), g.toggle.focus(), e.stopPropagation());
            case l.ARROW_RIGHT:
            case l.ARROW_DOWN:
              return (g.selectedIdx = Math.min(g.links.length - 1, g.selectedIdx + 1), h(g), e.preventDefault());
            case l.ARROW_LEFT:
            case l.ARROW_UP:
              return (g.selectedIdx = Math.max(-1, g.selectedIdx - 1), h(g), e.preventDefault());
          }
        })), B.el.on(T, (N = B, c(function (e) {
          var {relatedTarget: t, target: a} = e, n = N.el[0];
          return (n.contains(t) || n.contains(a) || M(N), e.stopPropagation());
        }))), B.toggle.on(O, V), B.toggle.on(y, (k = A(R = B, !0), function (e) {
          if (!a) {
            if (!R.open) switch (e.keyCode) {
              case l.ARROW_UP:
              case l.ARROW_DOWN:
                return e.stopPropagation();
            }
            switch (e.keyCode) {
              case l.SPACE:
              case l.ENTER:
                return (k(), e.stopPropagation(), e.preventDefault());
            }
          }
        })), B.nav = B.el.closest(".w-nav"), B.nav.on(L, V)));
      }
      function S(e) {
        var t = Number(e.el.css("z-index"));
        (e.manageZ = 900 === t || 901 === t, e.config = {
          hover: "true" === e.el.attr("data-hover") && !u,
          delay: e.el.attr("data-delay")
        });
      }
      function A(e, t) {
        return c(function (a) {
          if (e.open || a && "w-close" === a.type) return M(e, {
            forceClose: t
          });
          C(e);
        });
      }
      function C(t) {
        if (!t.open) {
          (i = t.el[0], o.each(function (t, a) {
            var n = e(a);
            n.is(i) || n.has(i).length || n.triggerHandler(L);
          }), t.open = !0, t.list.addClass(E), t.toggle.addClass(E), t.toggle.attr("aria-expanded", "true"), I.intro(0, t.el[0]), n.redraw.up(), t.manageZ && t.el.css("z-index", 901));
          var i, l = n.env("editor");
          (a || _.on(O, t.mouseUpOutside), t.hovering && !l && t.el.on(g, t.mouseLeave), t.hovering && l && _.on(m, t.mouseMoveOutside), window.clearTimeout(t.delayId));
        }
      }
      function M(e, {immediate: t, forceClose: a} = {}) {
        if (e.open && (!e.config.hover || !e.hovering || a)) {
          (e.toggle.attr("aria-expanded", "false"), e.open = !1);
          var n = e.config;
          if ((I.outro(0, e.el[0]), _.off(O, e.mouseUpOutside), _.off(m, e.mouseMoveOutside), e.el.off(g, e.mouseLeave), window.clearTimeout(e.delayId), !n.delay || t)) return e.complete();
          e.delayId = window.setTimeout(e.complete, n.delay);
        }
      }
      function h(e) {
        e.links[e.selectedIdx] && e.links[e.selectedIdx].focus();
      }
      return (s.ready = N, s.design = function () {
        (f && _.find(p).each(function (t, a) {
          e(a).triggerHandler(L);
        }), f = !1, N());
      }, s.preview = function () {
        (f = !0, N());
      }, s);
    });
  },
  6524: function (e, t) {
    "use strict";
    function a(e, t, a, n, i, l, d, o, c, s, r, f, u) {
      return function (p) {
        e(p);
        var E = p.form, I = {
          name: E.attr("data-name") || E.attr("name") || "Untitled Form",
          pageId: E.attr("data-wf-page-id") || "",
          elementId: E.attr("data-wf-element-id") || "",
          domain: f("html").attr("data-wf-domain") || null,
          source: t.href,
          test: a.env(),
          fields: {},
          fileUploads: {},
          dolphin: (/pass[\s-_]?(word|code)|secret|login|credentials/i).test(E.html()),
          trackingCookies: n()
        };
        let T = E.attr("data-wf-flow");
        (T && (I.wfFlow = T), i(p));
        var y = l(E, I.fields);
        return y ? d(y) : (I.fileUploads = o(E), c(p), s) ? void f.ajax({
          url: u,
          type: "POST",
          data: I,
          dataType: "json",
          crossDomain: !0
        }).done(function (e) {
          (e && 200 === e.code && (p.success = !0), r(p));
        }).fail(function () {
          r(p);
        }) : void r(p);
      };
    }
    Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function () {
        return a;
      }
    });
  },
  7527: function (e, t, a) {
    "use strict";
    var n = a(3949);
    let i = (e, t, a, n) => {
      let i = document.createElement("div");
      (t.appendChild(i), turnstile.render(i, {
        sitekey: e,
        callback: function (e) {
          a(e);
        },
        "error-callback": function () {
          n();
        }
      }));
    };
    n.define("forms", e.exports = function (e, t) {
      let l, d = "TURNSTILE_LOADED";
      var o, c, s, r, f, u = {}, p = e(document), E = window.location, I = window.XDomainRequest && !window.atob, T = ".w-form", y = /e(-)?mail/i, b = /^\S+@\S+$/, m = window.alert, g = n.env();
      let O = p.find("[data-turnstile-sitekey]").data("turnstile-sitekey");
      var L = /list-manage[1-9]?.com/i, v = t.debounce(function () {
        m("Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue.");
      }, 100);
      function _(t, l) {
        var o = e(l), s = e.data(l, T);
        (s || (s = e.data(l, T, {
          form: o
        })), N(s));
        var u = o.closest("div.w-form");
        (s.done = u.find("> .w-form-done"), s.fail = u.find("> .w-form-fail"), s.fileUploads = u.find(".w-file-upload"), s.fileUploads.each(function (t) {
          !(function (t, a) {
            if (a.fileUploads && a.fileUploads[t]) {
              var n, i = e(a.fileUploads[t]), l = i.find("> .w-file-upload-default"), d = i.find("> .w-file-upload-uploading"), o = i.find("> .w-file-upload-success"), c = i.find("> .w-file-upload-error"), s = l.find(".w-file-upload-input"), r = l.find(".w-file-upload-label"), u = r.children(), p = c.find(".w-file-upload-error-msg"), E = o.find(".w-file-upload-file"), I = o.find(".w-file-remove-link"), T = E.find(".w-file-upload-file-name"), y = p.attr("data-w-size-error"), b = p.attr("data-w-type-error"), m = p.attr("data-w-generic-error");
              if ((g || r.on("click keydown", function (e) {
                ("keydown" !== e.type || 13 === e.which || 32 === e.which) && (e.preventDefault(), s.click());
              }), r.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"), I.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"), g)) (s.on("click", function (e) {
                e.preventDefault();
              }), r.on("click", function (e) {
                e.preventDefault();
              }), u.on("click", function (e) {
                e.preventDefault();
              })); else {
                (I.on("click keydown", function (e) {
                  if ("keydown" === e.type) {
                    if (13 !== e.which && 32 !== e.which) return;
                    e.preventDefault();
                  }
                  (s.removeAttr("data-value"), s.val(""), T.html(""), l.toggle(!0), o.toggle(!1), r.focus());
                }), s.on("change", function (i) {
                  var o, s, r;
                  (n = i.target && i.target.files && i.target.files[0]) && (l.toggle(!1), c.toggle(!1), d.toggle(!0), d.focus(), T.text(n.name), S() || R(a), a.fileUploads[t].uploading = !0, o = n, s = v, r = new URLSearchParams({
                    name: o.name,
                    size: o.size
                  }), e.ajax({
                    type: "GET",
                    url: `${f}?${r}`,
                    crossDomain: !0
                  }).done(function (e) {
                    s(null, e);
                  }).fail(function (e) {
                    s(e);
                  }));
                }));
                var O = r.outerHeight();
                (s.height(O), s.width(1));
              }
            }
            function L(e) {
              var n = e.responseJSON && e.responseJSON.msg, i = m;
              ("string" == typeof n && 0 === n.indexOf("InvalidFileTypeError") ? i = b : "string" == typeof n && 0 === n.indexOf("MaxFileSizeError") && (i = y), p.text(i), s.removeAttr("data-value"), s.val(""), d.toggle(!1), l.toggle(!0), c.toggle(!0), c.focus(), a.fileUploads[t].uploading = !1, S() || N(a));
            }
            function v(t, a) {
              if (t) return L(t);
              var i = a.fileName, l = a.postData, d = a.fileId, o = a.s3Url;
              (s.attr("data-value", d), (function (t, a, n, i, l) {
                var d = new FormData();
                for (var o in a) d.append(o, a[o]);
                (d.append("file", n, i), e.ajax({
                  type: "POST",
                  url: t,
                  data: d,
                  processData: !1,
                  contentType: !1
                }).done(function () {
                  l(null);
                }).fail(function (e) {
                  l(e);
                }));
              })(o, l, n, i, _));
            }
            function _(e) {
              if (e) return L(e);
              (d.toggle(!1), o.css("display", "inline-block"), o.focus(), a.fileUploads[t].uploading = !1, S() || N(a));
            }
            function S() {
              return (a.fileUploads && a.fileUploads.toArray() || []).some(function (e) {
                return e.uploading;
              });
            }
          })(t, s);
        }), O && ((function (e) {
          let t = e.btn || e.form.find(":input[type=\"submit\"]");
          (e.btn || (e.btn = t), t.prop("disabled", !0), t.addClass("w-form-loading"));
        })(s), S(o, !0), p.on("undefined" != typeof turnstile ? "ready" : d, function () {
          i(O, l, e => {
            (s.turnstileToken = e, N(s), S(o, !1));
          }, () => {
            (N(s), s.btn && s.btn.prop("disabled", !0), S(o, !1));
          });
        })));
        var I = s.form.attr("aria-label") || s.form.attr("data-name") || "Form";
        (s.done.attr("aria-label") || s.form.attr("aria-label", I), s.done.attr("tabindex", "-1"), s.done.attr("role", "region"), s.done.attr("aria-label") || s.done.attr("aria-label", I + " success"), s.fail.attr("tabindex", "-1"), s.fail.attr("role", "region"), s.fail.attr("aria-label") || s.fail.attr("aria-label", I + " failure"));
        var y = s.action = o.attr("action");
        if ((s.handler = null, s.redirect = o.attr("data-redirect"), L.test(y))) {
          s.handler = k;
          return;
        }
        if (!y) {
          if (c) {
            s.handler = (0, a(6524).default)(N, E, n, h, B, A, m, C, R, c, U, e, r);
            return;
          }
          v();
        }
      }
      function N(e) {
        var t = e.btn = e.form.find(":input[type=\"submit\"]");
        (e.wait = e.btn.attr("data-wait") || null, e.success = !1);
        let a = !!(O && !e.turnstileToken);
        (t.prop("disabled", a), t.removeClass("w-form-loading"), e.label && t.val(e.label));
      }
      function R(e) {
        var t = e.btn, a = e.wait;
        (t.prop("disabled", !0), a && (e.label = t.val(), t.val(a)));
      }
      function S(e, t) {
        let a = e.closest(".w-form");
        t ? a.addClass("w-form-loading") : a.removeClass("w-form-loading");
      }
      function A(t, a) {
        var n = null;
        return (a = a || ({}), t.find(":input:not([type=\"submit\"]):not([type=\"file\"]):not([type=\"button\"])").each(function (i, l) {
          var d, o, c, s, r, f = e(l), u = f.attr("type"), p = f.attr("data-name") || f.attr("name") || "Field " + (i + 1);
          p = encodeURIComponent(p);
          var E = f.val();
          if ("checkbox" === u) E = f.is(":checked"); else if ("radio" === u) {
            if (null === a[p] || "string" == typeof a[p]) return;
            E = t.find("input[name=\"" + f.attr("name") + "\"]:checked").val() || null;
          }
          ("string" == typeof E && (E = e.trim(E)), a[p] = E, n = n || (d = f, o = u, c = p, s = E, r = null, "password" === o ? r = "Passwords cannot be submitted." : d.attr("required") ? s ? y.test(d.attr("type")) && !b.test(s) && (r = "Please enter a valid email address for: " + c) : r = "Please fill out the required field: " + c : "g-recaptcha-response" !== c || s || (r = "Please confirm you're not a robot."), r));
        }), n);
      }
      function C(t) {
        var a = {};
        return (t.find(":input[type=\"file\"]").each(function (t, n) {
          var i = e(n), l = i.attr("data-name") || i.attr("name") || "File " + (t + 1), d = i.attr("data-value");
          ("string" == typeof d && (d = e.trim(d)), a[l] = d);
        }), a);
      }
      u.ready = u.design = u.preview = function () {
        (O && ((l = document.createElement("script")).src = "turnstile/v0/api.js", document.head.appendChild(l), l.onload = () => {
          p.trigger(d);
        }), r = "https://webflow.com/api/v1/form/" + (c = e("html").attr("data-wf-site")), I && r.indexOf("https://webflow.com") >= 0 && (r = r.replace("https://webflow.com", "https://formdata.webflow.com")), f = `${r}/signFile`, (o = e(T + " form")).length && o.each(_), (!g || n.env("preview")) && !s && (function () {
          (s = !0, p.on("submit", T + " form", function (t) {
            var a = e.data(this, T);
            a.handler && (a.evt = t, a.handler(a));
          }));
          let t = ".w-checkbox-input", a = ".w-radio-input", n = "w--redirected-checked", i = "w--redirected-focus", l = "w--redirected-focus-visible", d = [["checkbox", t], ["radio", a]];
          (p.on("change", T + " form input[type=\"checkbox\"]:not(" + t + ")", a => {
            e(a.target).siblings(t).toggleClass(n);
          }), p.on("change", T + " form input[type=\"radio\"]", i => {
            e(`input[name="${i.target.name}"]:not(${t})`).map((t, i) => e(i).siblings(a).removeClass(n));
            let l = e(i.target);
            l.hasClass("w-radio-input") || l.siblings(a).addClass(n);
          }), d.forEach(([t, a]) => {
            (p.on("focus", T + ` form input[type="${t}"]:not(` + a + ")", t => {
              (e(t.target).siblings(a).addClass(i), e(t.target).filter(":focus-visible, [data-wf-focus-visible]").siblings(a).addClass(l));
            }), p.on("blur", T + ` form input[type="${t}"]:not(` + a + ")", t => {
              e(t.target).siblings(a).removeClass(`${i} ${l}`);
            }));
          }));
        })());
      };
      let M = {
        _mkto_trk: "marketo"
      };
      function h() {
        return document.cookie.split("; ").reduce(function (e, t) {
          let a = t.split("="), n = a[0];
          if ((n in M)) {
            let t = M[n], i = a.slice(1).join("=");
            e[t] = i;
          }
          return e;
        }, {});
      }
      function k(a) {
        N(a);
        var n, i = a.form, l = {};
        if ((/^https/).test(E.href) && !(/^https/).test(a.action)) return void i.attr("method", "post");
        B(a);
        var d = A(i, l);
        if (d) return m(d);
        (R(a), t.each(l, function (e, t) {
          (y.test(t) && (l.EMAIL = e), (/^((full[ _-]?)?name)$/i).test(t) && (n = e), (/^(first[ _-]?name)$/i).test(t) && (l.FNAME = e), (/^(last[ _-]?name)$/i).test(t) && (l.LNAME = e));
        }), n && !l.FNAME && (l.FNAME = (n = n.split(" "))[0], l.LNAME = l.LNAME || n[1]));
        var o = a.action.replace("/post?", "/post-json?") + "&c=?", c = o.indexOf("u=") + 2;
        c = o.substring(c, o.indexOf("&", c));
        var s = o.indexOf("id=") + 3;
        (l["b_" + c + "_" + (s = o.substring(s, o.indexOf("&", s)))] = "", e.ajax({
          url: o,
          data: l,
          dataType: "jsonp"
        }).done(function (e) {
          (a.success = "success" === e.result || (/already/).test(e.msg), a.success || console.info("MailChimp error: " + e.msg), U(a));
        }).fail(function () {
          U(a);
        }));
      }
      function U(e) {
        var t = e.form, a = e.redirect, i = e.success;
        if (i && a) return void n.location(a);
        (e.done.toggle(i), e.fail.toggle(!i), i ? e.done.focus() : e.fail.focus(), t.toggle(!i), N(e));
      }
      function B(e) {
        (e.evt && e.evt.preventDefault(), e.evt = null);
      }
      return u;
    });
  },
  1655: function (e, t, a) {
    "use strict";
    var n = a(3949), i = a(5134);
    let l = {
      ARROW_LEFT: 37,
      ARROW_UP: 38,
      ARROW_RIGHT: 39,
      ARROW_DOWN: 40,
      ESCAPE: 27,
      SPACE: 32,
      ENTER: 13,
      HOME: 36,
      END: 35
    };
    n.define("navbar", e.exports = function (e, t) {
      var a, d, o, c, s = {}, r = e.tram, f = e(window), u = e(document), p = t.debounce, E = n.env(), I = ".w-nav", T = "w--open", y = "w--nav-dropdown-open", b = "w--nav-dropdown-toggle-open", m = "w--nav-dropdown-list-open", g = "w--nav-link-open", O = i.triggers, L = e();
      function v() {
        n.resize.off(_);
      }
      function _() {
        d.each(B);
      }
      function N(a, n) {
        var i, d, s, r, p, E = e(n), T = e.data(n, I);
        (T || (T = e.data(n, I, {
          open: !1,
          el: E,
          config: {},
          selectedIdx: -1
        })), T.menu = E.find(".w-nav-menu"), T.links = T.menu.find(".w-nav-link"), T.dropdowns = T.menu.find(".w-dropdown"), T.dropdownToggle = T.menu.find(".w-dropdown-toggle"), T.dropdownList = T.menu.find(".w-dropdown-list"), T.button = E.find(".w-nav-button"), T.container = E.find(".w-container"), T.overlayContainerId = "w-nav-overlay-" + a, T.outside = ((i = T).outside && u.off("click" + I, i.outside), function (t) {
          var a = e(t.target);
          c && a.closest(".w-editor-bem-EditorOverlay").length || U(i, a);
        }));
        var y = E.find(".w-nav-brand");
        (y && "/" === y.attr("href") && null == y.attr("aria-label") && y.attr("aria-label", "home"), T.button.attr("style", "-webkit-user-select: text;"), null == T.button.attr("aria-label") && T.button.attr("aria-label", "menu"), T.button.attr("role", "button"), T.button.attr("tabindex", "0"), T.button.attr("aria-controls", T.overlayContainerId), T.button.attr("aria-haspopup", "menu"), T.button.attr("aria-expanded", "false"), T.el.off(I), T.button.off(I), T.menu.off(I), A(T), o ? (S(T), T.el.on("setting" + I, (d = T, function (e, a) {
          a = a || ({});
          var n = f.width();
          (A(d), !0 === a.open && x(d, !0), !1 === a.open && P(d, !0), d.open && t.defer(function () {
            n !== f.width() && M(d);
          }));
        }))) : ((s = T).overlay || (s.overlay = e("<div class=\"w-nav-overlay\" data-wf-ignore />").appendTo(s.el), s.overlay.attr("id", s.overlayContainerId), s.parent = s.menu.parent(), P(s, !0)), T.button.on("click" + I, h(T)), T.menu.on("click" + I, "a", k(T)), T.button.on("keydown" + I, (r = T, function (e) {
          switch (e.keyCode) {
            case l.SPACE:
            case l.ENTER:
              return (h(r)(), e.preventDefault(), e.stopPropagation());
            case l.ESCAPE:
              return (P(r), e.preventDefault(), e.stopPropagation());
            case l.ARROW_RIGHT:
            case l.ARROW_DOWN:
            case l.HOME:
            case l.END:
              if (!r.open) return (e.preventDefault(), e.stopPropagation());
              return (e.keyCode === l.END ? r.selectedIdx = r.links.length - 1 : r.selectedIdx = 0, C(r), e.preventDefault(), e.stopPropagation());
          }
        })), T.el.on("keydown" + I, (p = T, function (e) {
          if (p.open) switch ((p.selectedIdx = p.links.index(document.activeElement), e.keyCode)) {
            case l.HOME:
            case l.END:
              return (e.keyCode === l.END ? p.selectedIdx = p.links.length - 1 : p.selectedIdx = 0, C(p), e.preventDefault(), e.stopPropagation());
            case l.ESCAPE:
              return (P(p), p.button.focus(), e.preventDefault(), e.stopPropagation());
            case l.ARROW_LEFT:
            case l.ARROW_UP:
              return (p.selectedIdx = Math.max(-1, p.selectedIdx - 1), C(p), e.preventDefault(), e.stopPropagation());
            case l.ARROW_RIGHT:
            case l.ARROW_DOWN:
              return (p.selectedIdx = Math.min(p.links.length - 1, p.selectedIdx + 1), C(p), e.preventDefault(), e.stopPropagation());
          }
        }))), B(a, n));
      }
      function R(t, a) {
        var n = e.data(a, I);
        n && (S(n), e.removeData(a, I));
      }
      function S(e) {
        e.overlay && (P(e, !0), e.overlay.remove(), e.overlay = null);
      }
      function A(e) {
        var a = {}, n = e.config || ({}), i = a.animation = e.el.attr("data-animation") || "default";
        (a.animOver = (/^over/).test(i), a.animDirect = (/left$/).test(i) ? -1 : 1, n.animation !== i && e.open && t.defer(M, e), a.easing = e.el.attr("data-easing") || "ease", a.easing2 = e.el.attr("data-easing2") || "ease");
        var l = e.el.attr("data-duration");
        (a.duration = null != l ? Number(l) : 400, a.docHeight = e.el.attr("data-doc-height"), e.config = a);
      }
      function C(e) {
        if (e.links[e.selectedIdx]) {
          var t = e.links[e.selectedIdx];
          (t.focus(), k(t));
        }
      }
      function M(e) {
        e.open && (P(e, !0), x(e, !0));
      }
      function h(e) {
        return p(function () {
          e.open ? P(e) : x(e);
        });
      }
      function k(t) {
        return function (a) {
          var i = e(this).attr("href");
          if (!n.validClick(a.currentTarget)) return void a.preventDefault();
          i && 0 === i.indexOf("#") && t.open && P(t);
        };
      }
      (s.ready = s.design = s.preview = function () {
        (o = E && n.env("design"), c = n.env("editor"), a = e(document.body), (d = u.find(I)).length && (d.each(N), v(), n.resize.on(_)));
      }, s.destroy = function () {
        (L = e(), v(), d && d.length && d.each(R));
      });
      var U = p(function (e, t) {
        if (e.open) {
          var a = t.closest(".w-nav-menu");
          e.menu.is(a) || P(e);
        }
      });
      function B(t, a) {
        var n = e.data(a, I), i = n.collapsed = "none" !== n.button.css("display");
        if ((!n.open || i || o || P(n, !0), n.container.length)) {
          var l, d = ("none" === (l = n.container.css(F)) && (l = ""), function (t, a) {
            ((a = e(a)).css(F, ""), "none" === a.css(F) && a.css(F, l));
          });
          (n.links.each(d), n.dropdowns.each(d));
        }
        n.open && w(n);
      }
      var F = "max-width";
      function G(e, t) {
        t.setAttribute("data-nav-menu-open", "");
      }
      function V(e, t) {
        t.removeAttribute("data-nav-menu-open");
      }
      function x(e, t) {
        if (!e.open) {
          (e.open = !0, e.menu.each(G), e.links.addClass(g), e.dropdowns.addClass(y), e.dropdownToggle.addClass(b), e.dropdownList.addClass(m), e.button.addClass(T));
          var a = e.config;
          ("none" === a.animation || !r.support.transform || a.duration <= 0) && (t = !0);
          var i = w(e), l = e.menu.outerHeight(!0), d = e.menu.outerWidth(!0), c = e.el.height(), s = e.el[0];
          if ((B(0, s), O.intro(0, s), n.redraw.up(), o || u.on("click" + I, e.outside), t)) return void p();
          var f = "transform " + a.duration + "ms " + a.easing;
          if ((e.overlay && (L = e.menu.prev(), e.overlay.show().append(e.menu)), a.animOver)) {
            (r(e.menu).add(f).set({
              x: a.animDirect * d,
              height: i
            }).start({
              x: 0
            }).then(p), e.overlay && e.overlay.width(d));
            return;
          }
          r(e.menu).add(f).set({
            y: -(c + l)
          }).start({
            y: 0
          }).then(p);
        }
        function p() {
          e.button.attr("aria-expanded", "true");
        }
      }
      function w(e) {
        var t = e.config, n = t.docHeight ? u.height() : a.height();
        return (t.animOver ? e.menu.height(n) : "fixed" !== e.el.css("position") && (n -= e.el.outerHeight(!0)), e.overlay && e.overlay.height(n), n);
      }
      function P(e, t) {
        if (e.open) {
          (e.open = !1, e.button.removeClass(T));
          var a = e.config;
          if ((("none" === a.animation || !r.support.transform || a.duration <= 0) && (t = !0), O.outro(0, e.el[0]), u.off("click" + I, e.outside), t)) {
            (r(e.menu).stop(), o());
            return;
          }
          var n = "transform " + a.duration + "ms " + a.easing2, i = e.menu.outerHeight(!0), l = e.menu.outerWidth(!0), d = e.el.height();
          if (a.animOver) return void r(e.menu).add(n).start({
            x: l * a.animDirect
          }).then(o);
          r(e.menu).add(n).start({
            y: -(d + i)
          }).then(o);
        }
        function o() {
          (e.menu.height(""), r(e.menu).set({
            x: 0,
            y: 0
          }), e.menu.each(V), e.links.removeClass(g), e.dropdowns.removeClass(y), e.dropdownToggle.removeClass(b), e.dropdownList.removeClass(m), e.overlay && e.overlay.children().length && (L.length ? e.menu.insertAfter(L) : e.menu.prependTo(e.parent), e.overlay.attr("style", "").hide()), e.el.triggerHandler("w-close"), e.button.attr("aria-expanded", "false"));
        }
      }
      return s;
    });
  },
  9078: function (e, t, a) {
    "use strict";
    var n = a(3949), i = a(5134);
    n.define("tabs", e.exports = function (e) {
      var t, a, l = {}, d = e.tram, o = e(document), c = n.env, s = c.safari, r = c(), f = "data-w-tab", u = ".w-tabs", p = "w--current", E = "w--tab-active", I = i.triggers, T = !1;
      function y() {
        (a = r && n.env("design"), (t = o.find(u)).length && (t.each(g), n.env("preview") && !T && t.each(m), b(), n.redraw.on(l.redraw)));
      }
      function b() {
        n.redraw.off(l.redraw);
      }
      function m(t, a) {
        var n = e.data(a, u);
        n && (n.links && n.links.each(I.reset), n.panes && n.panes.each(I.reset));
      }
      function g(t, n) {
        var i = u.substr(1) + "-" + t, l = e(n), d = e.data(n, u);
        if ((d || (d = e.data(n, u, {
          el: l,
          config: {}
        })), d.current = null, d.tabIdentifier = i + "-" + f, d.paneIdentifier = i + "-data-w-pane", d.menu = l.children(".w-tab-menu"), d.links = d.menu.children(".w-tab-link"), d.content = l.children(".w-tab-content"), d.panes = d.content.children(".w-tab-pane"), d.el.off(u), d.links.off(u), d.menu.attr("role", "tablist"), d.links.attr("tabindex", "-1"), (c = {}).easing = (o = d).el.attr("data-easing") || "ease", s = c.intro = (s = parseInt(o.el.attr("data-duration-in"), 10)) == s ? s : 0, r = c.outro = (r = parseInt(o.el.attr("data-duration-out"), 10)) == r ? r : 0, c.immediate = !s && !r, o.config = c, !a)) {
          (d.links.on("click" + u, (E = d, function (e) {
            e.preventDefault();
            var t = e.currentTarget.getAttribute(f);
            t && O(E, {
              tab: t
            });
          })), d.links.on("keydown" + u, (I = d, function (e) {
            var t, a = (t = I.current, Array.prototype.findIndex.call(I.links, e => e.getAttribute(f) === t, null)), n = e.key, i = {
              ArrowLeft: a - 1,
              ArrowUp: a - 1,
              ArrowRight: a + 1,
              ArrowDown: a + 1,
              End: I.links.length - 1,
              Home: 0
            };
            if ((n in i)) {
              e.preventDefault();
              var l = i[n];
              (-1 === l && (l = I.links.length - 1), l === I.links.length && (l = 0));
              var d = I.links[l].getAttribute(f);
              d && O(I, {
                tab: d
              });
            }
          })));
          var o, c, s, r, E, I, T = d.links.filter("." + p).attr(f);
          T && O(d, {
            tab: T,
            immediate: !0
          });
        }
      }
      function O(t, a) {
        a = a || ({});
        var i, l = t.config, o = l.easing, c = a.tab;
        if (c !== t.current) {
          (t.current = c, t.links.each(function (n, d) {
            var o = e(d);
            if (a.immediate || l.immediate) {
              var s = t.panes[n];
              (d.id || (d.id = t.tabIdentifier + "-" + n), s.id || (s.id = t.paneIdentifier + "-" + n), d.href = "#" + s.id, d.setAttribute("role", "tab"), d.setAttribute("aria-controls", s.id), d.setAttribute("aria-selected", "false"), s.setAttribute("role", "tabpanel"), s.setAttribute("aria-labelledby", d.id));
            }
            d.getAttribute(f) === c ? (i = d, o.addClass(p).removeAttr("tabindex").attr({
              "aria-selected": "true"
            }).each(I.intro)) : o.hasClass(p) && o.removeClass(p).attr({
              tabindex: "-1",
              "aria-selected": "false"
            }).each(I.outro);
          }));
          var r = [], u = [];
          t.panes.each(function (t, a) {
            var n = e(a);
            a.getAttribute(f) === c ? r.push(a) : n.hasClass(E) && u.push(a);
          });
          var y = e(r), b = e(u);
          if (a.immediate || l.immediate) {
            (y.addClass(E).each(I.intro), b.removeClass(E), T || n.redraw.up());
            return;
          }
          var m = window.scrollX, g = window.scrollY;
          (i.focus(), window.scrollTo(m, g), b.length && l.outro ? (b.each(I.outro), d(b).add("opacity " + l.outro + "ms " + o, {
            fallback: s
          }).start({
            opacity: 0
          }).then(() => L(l, b, y))) : L(l, b, y));
        }
      }
      function L(e, t, a) {
        if ((t.removeClass(E).css({
          opacity: "",
          transition: "",
          transform: "",
          width: "",
          height: ""
        }), a.addClass(E).each(I.intro), n.redraw.up(), !e.intro)) return d(a).set({
          opacity: 1
        });
        d(a).set({
          opacity: 0
        }).redraw().add("opacity " + e.intro + "ms " + e.easing, {
          fallback: s
        }).start({
          opacity: 1
        });
      }
      return (l.ready = l.design = l.preview = y, l.redraw = function () {
        (T = !0, y(), T = !1);
      }, l.destroy = function () {
        (t = o.find(u)).length && (t.each(m), b());
      }, l);
    });
  },
  3487: function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = {
      strFromU8: function () {
        return Y;
      },
      unzip: function () {
        return K;
      }
    };
    for (var n in a) Object.defineProperty(t, n, {
      enumerable: !0,
      get: a[n]
    });
    let i = {}, l = function (e, t, a, n, l) {
      let d = new Worker(i[t] || (i[t] = URL.createObjectURL(new Blob([e + ";addEventListener(\"error\",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})"], {
        type: "text/javascript"
      }))));
      return (d.onmessage = function (e) {
        let t = e.data, a = t.$e$;
        if (a) {
          let e = Error(a[0]);
          (e.code = a[1], e.stack = a[2], l(e, null));
        } else l(null, t);
      }, d.postMessage(a, n), d);
    }, d = Uint8Array, o = Uint16Array, c = Uint32Array, s = new d([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), r = new d([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), f = new d([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), u = function (e, t) {
      let a = new o(31);
      for (var n = 0; n < 31; ++n) a[n] = t += 1 << e[n - 1];
      let i = new c(a[30]);
      for (n = 1; n < 30; ++n) for (let e = a[n]; e < a[n + 1]; ++e) i[e] = e - a[n] << 5 | n;
      return [a, i];
    }, p = u(s, 2), E = p[0], I = p[1];
    (E[28] = 258, I[258] = 28);
    let T = u(r, 0)[0], y = new o(32768);
    for (var b = 0; b < 32768; ++b) {
      let e = (43690 & b) >>> 1 | (21845 & b) << 1;
      (e = (61680 & (e = (52428 & e) >>> 2 | (13107 & e) << 2)) >>> 4 | (3855 & e) << 4, y[b] = ((65280 & e) >>> 8 | (255 & e) << 8) >>> 1);
    }
    let m = function (e, t, a) {
      let n, i = e.length, l = 0, d = new o(t);
      for (; l < i; ++l) e[l] && ++d[e[l] - 1];
      let c = new o(t);
      for (l = 0; l < t; ++l) c[l] = c[l - 1] + d[l - 1] << 1;
      if (a) {
        n = new o(1 << t);
        let a = 15 - t;
        for (l = 0; l < i; ++l) if (e[l]) {
          let i = l << 4 | e[l], d = t - e[l], o = c[e[l] - 1]++ << d;
          for (let e = o | (1 << d) - 1; o <= e; ++o) n[y[o] >>> a] = i;
        }
      } else for ((n = new o(i), l = 0); l < i; ++l) e[l] && (n[l] = y[c[e[l] - 1]++] >>> 15 - e[l]);
      return n;
    }, g = new d(288);
    for (b = 0; b < 144; ++b) g[b] = 8;
    for (b = 144; b < 256; ++b) g[b] = 9;
    for (b = 256; b < 280; ++b) g[b] = 7;
    for (b = 280; b < 288; ++b) g[b] = 8;
    let O = new d(32);
    for (b = 0; b < 32; ++b) O[b] = 5;
    let L = m(g, 9, 1), v = m(O, 5, 1), _ = function (e) {
      let t = e[0];
      for (let a = 1; a < e.length; ++a) e[a] > t && (t = e[a]);
      return t;
    }, N = function (e, t, a) {
      let n = t / 8 | 0;
      return (e[n] | e[n + 1] << 8) >> (7 & t) & a;
    }, R = function (e, t) {
      let a = t / 8 | 0;
      return (e[a] | e[a + 1] << 8 | e[a + 2] << 16) >> (7 & t);
    }, S = function (e) {
      return (e + 7) / 8 | 0;
    }, A = function (e, t, a) {
      ((null == t || t < 0) && (t = 0), (null == a || a > e.length) && (a = e.length));
      let n = new (2 === e.BYTES_PER_ELEMENT ? o : 4 === e.BYTES_PER_ELEMENT ? c : d)(a - t);
      return (n.set(e.subarray(t, a)), n);
    }, C = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"];
    var M = function (e, t, a) {
      let n = Error(t || C[e]);
      if ((n.code = e, Error.captureStackTrace && Error.captureStackTrace(n, M), !a)) throw n;
      return n;
    };
    let h = function (e, t, a) {
      let n = e.length;
      if (!n || a && a.f && !a.l) return t || new d(0);
      let i = !t || a, l = !a || a.i;
      (a || (a = {}), t || (t = new d(3 * n)));
      let o = function (e) {
        let a = t.length;
        if (e > a) {
          let n = new d(Math.max(2 * a, e));
          (n.set(t), t = n);
        }
      }, c = a.f || 0, u = a.p || 0, p = a.b || 0, I = a.l, y = a.d, b = a.m, g = a.n, O = 8 * n;
      do {
        if (!I) {
          c = N(e, u, 1);
          let s = N(e, u + 1, 3);
          if ((u += 3, !s)) {
            let d = e[(h = S(u) + 4) - 4] | e[h - 3] << 8, s = h + d;
            if (s > n) {
              l && M(0);
              break;
            }
            (i && o(p + d), t.set(e.subarray(h, s), p), a.b = p += d, a.p = u = 8 * s, a.f = c);
            continue;
          }
          if (1 === s) (I = L, y = v, b = 9, g = 5); else if (2 === s) {
            let t = N(e, u, 31) + 257, a = N(e, u + 10, 15) + 4, n = t + N(e, u + 5, 31) + 1;
            u += 14;
            let i = new d(n), l = new d(19);
            for (var C = 0; C < a; ++C) l[f[C]] = N(e, u + 3 * C, 7);
            u += 3 * a;
            let o = _(l), c = (1 << o) - 1, s = m(l, o, 1);
            for (C = 0; C < n; ) {
              let t = s[N(e, u, c)];
              if ((u += 15 & t, (h = t >>> 4) < 16)) i[C++] = h; else {
                var h, k = 0;
                let t = 0;
                for (16 === h ? (t = 3 + N(e, u, 3), u += 2, k = i[C - 1]) : 17 === h ? (t = 3 + N(e, u, 7), u += 3) : 18 === h && (t = 11 + N(e, u, 127), u += 7); t--; ) i[C++] = k;
              }
            }
            let r = i.subarray(0, t);
            var U = i.subarray(t);
            (b = _(r), g = _(U), I = m(r, b, 1), y = m(U, g, 1));
          } else M(1);
          if (u > O) {
            l && M(0);
            break;
          }
        }
        i && o(p + 131072);
        let A = (1 << b) - 1, F = (1 << g) - 1, G = u;
        for (; ; G = u) {
          let a = (k = I[R(e, u) & A]) >>> 4;
          if ((u += 15 & k) > O) {
            l && M(0);
            break;
          }
          if ((k || M(2), a < 256)) t[p++] = a; else {
            if (256 === a) {
              (G = u, I = null);
              break;
            }
            {
              let n = a - 254;
              if (a > 264) {
                var B = s[C = a - 257];
                (n = N(e, u, (1 << B) - 1) + E[C], u += B);
              }
              let d = y[R(e, u) & F], c = d >>> 4;
              if ((d || M(3), u += 15 & d, U = T[c], c > 3 && (B = r[c], U += R(e, u) & (1 << B) - 1, u += B), u > O)) {
                l && M(0);
                break;
              }
              i && o(p + 131072);
              let f = p + n;
              for (; p < f; p += 4) (t[p] = t[p - U], t[p + 1] = t[p + 1 - U], t[p + 2] = t[p + 2 - U], t[p + 3] = t[p + 3 - U]);
              p = f;
            }
          }
        }
        (a.l = I, a.p = G, a.b = p, a.f = c, I && (c = 1, a.m = b, a.d = y, a.n = g));
      } while (!c);
      return p === t.length ? t : A(t, 0, p);
    }, k = function (e, t) {
      let a = {};
      for (var n in e) a[n] = e[n];
      for (var n in t) a[n] = t[n];
      return a;
    }, U = function (e, t, a) {
      let n = e(), i = e.toString(), l = i.slice(i.indexOf("[") + 1, i.lastIndexOf("]")).replace(/\s+/g, "").split(",");
      for (let e = 0; e < n.length; ++e) {
        let i = n[e], d = l[e];
        if ("function" == typeof i) {
          t += ";" + d + "=";
          let e = i.toString();
          if (i.prototype) if (-1 !== e.indexOf("[native code]")) {
            let a = e.indexOf(" ", 8) + 1;
            t += e.slice(a, e.indexOf("(", a));
          } else for (let a in (t += e, i.prototype)) t += ";" + d + ".prototype." + a + "=" + i.prototype[a].toString(); else t += e;
        } else a[d] = i;
      }
      return [t, a];
    }, B = [], F = function (e) {
      let t = [];
      for (let a in e) e[a].buffer && t.push((e[a] = new e[a].constructor(e[a])).buffer);
      return t;
    }, G = function (e, t, a, n) {
      let i;
      if (!B[a]) {
        let t = "", n = {}, l = e.length - 1;
        for (let a = 0; a < l; ++a) (t = (i = U(e[a], t, n))[0], n = i[1]);
        B[a] = U(e[l], t, n);
      }
      let d = k({}, B[a][1]);
      return l(B[a][0] + ";onmessage=function(e){for(var kz in e.data)self[kz]=e.data[kz];onmessage=" + t.toString() + "}", a, d, F(d), n);
    }, V = function () {
      return [d, o, c, s, r, f, E, T, L, v, y, C, m, _, N, R, S, A, M, h, W, x, w];
    };
    var x = function (e) {
      return postMessage(e, [e.buffer]);
    }, w = function (e) {
      return e && e.size && new d(e.size);
    };
    let P = function (e, t, a, n, i, l) {
      var d = G(a, n, i, function (e, t) {
        (d.terminate(), l(e, t));
      });
      return (d.postMessage([e, t], t.consume ? [e.buffer] : []), function () {
        d.terminate();
      });
    }, D = function (e, t) {
      return e[t] | e[t + 1] << 8;
    }, Q = function (e, t) {
      return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
    };
    function W(e, t) {
      return h(e, t);
    }
    let X = "undefined" != typeof TextDecoder && new TextDecoder(), H = function (e) {
      for (let t = "", a = 0; ; ) {
        let n = e[a++], i = (n > 127) + (n > 223) + (n > 239);
        if (a + i > e.length) return [t, A(e, a - 1)];
        i ? 3 === i ? t += String.fromCharCode(55296 | (n = ((15 & n) << 18 | (63 & e[a++]) << 12 | (63 & e[a++]) << 6 | 63 & e[a++]) - 65536) >> 10, 56320 | 1023 & n) : t += 1 & i ? String.fromCharCode((31 & n) << 6 | 63 & e[a++]) : String.fromCharCode((15 & n) << 12 | (63 & e[a++]) << 6 | 63 & e[a++]) : t += String.fromCharCode(n);
      }
    };
    function Y(e, t) {
      if (t) {
        let t = "";
        for (let a = 0; a < e.length; a += 16384) t += String.fromCharCode.apply(null, e.subarray(a, a + 16384));
        return t;
      }
      if (X) return X.decode(e);
      {
        let t = H(e), a = t[0];
        return (t[1].length && M(8), a);
      }
    }
    let z = function (e, t, a) {
      let n = D(e, t + 28), i = Y(e.subarray(t + 46, t + 46 + n), !(2048 & D(e, t + 8))), l = t + 46 + n, d = Q(e, t + 20), o = a && 4294967295 === d ? z64e(e, l) : [d, Q(e, t + 24), Q(e, t + 42)], c = o[0], s = o[1], r = o[2];
      return [D(e, t + 10), c, s, i, l + D(e, t + 30) + D(e, t + 32), r];
    }, j = "function" == typeof queueMicrotask ? queueMicrotask : "function" == typeof setTimeout ? setTimeout : function (e) {
      e();
    };
    function K(e, t, a) {
      (a || (a = t, t = {}), "function" != typeof a && M(7));
      let n = [], i = function () {
        for (let e = 0; e < n.length; ++e) n[e]();
      }, l = {}, o = function (e, t) {
        j(function () {
          a(e, t);
        });
      };
      j(function () {
        o = a;
      });
      let c = e.length - 22;
      for (; 101010256 !== Q(e, c); --c) if (!c || e.length - c > 65558) return (o(M(13, 0, 1), null), i);
      let s = D(e, c + 8);
      if (s) {
        let a = s, r = Q(e, c + 16), f = 4294967295 === r || 65535 === a;
        if (f) {
          let t = Q(e, c - 12);
          (f = 101075792 === Q(e, t)) && (a = s = Q(e, t + 32), r = Q(e, t + 48));
        }
        let u = t && t.filter;
        for (let t = 0; t < a; ++t) !(function () {
          var t, a, c;
          let p = z(e, r, f), E = p[0], I = p[1], T = p[2], y = p[3], b = p[4], m = p[5], g = m + 30 + D(e, m + 26) + D(e, m + 28);
          r = b;
          let O = function (e, t) {
            e ? (i(), o(e, null)) : (t && (l[y] = t), --s || o(null, l));
          };
          if (!u || u({
            name: y,
            size: I,
            originalSize: T,
            compression: E
          })) if (E) if (8 === E) {
            let i = e.subarray(g, g + I);
            if (I < 320000) try {
              O(null, (t = new d(T), h(i, t)));
            } catch (e) {
              O(e, null);
            } else n.push((a = {
              size: T
            }, (c = O) || (c = a, a = {}), "function" != typeof c && M(7), P(i, a, [V], function (e) {
              var t;
              return x((t = e.data[0], h(t, w(e.data[1]))));
            }, 1, c)));
          } else O(M(14, "unknown compression type " + E, 1), null); else O(null, A(e, g, g + I)); else O(null, null);
        })(t);
      } else o(null, {});
      return i;
    }
  },
  7933: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
      fetchLottie: function () {
        return f;
      },
      unZipDotLottie: function () {
        return r;
      }
    };
    for (var i in n) Object.defineProperty(t, i, {
      enumerable: !0,
      get: n[i]
    });
    let l = a(3487);
    async function d(e) {
      return await fetch(new URL(e, window?.location?.href).href).then(e => e.arrayBuffer());
    }
    async function o(e) {
      return (await new Promise(t => {
        let a = new FileReader();
        (a.readAsDataURL(new Blob([e])), a.onload = () => t(a.result));
      })).split(",", 2)[1];
    }
    async function c(e) {
      let t = new Uint8Array(e), a = await new Promise((e, a) => {
        (0, l.unzip)(t, (t, n) => t ? a(t) : e(n));
      });
      return {
        read: e => (0, l.strFromU8)(a[e]),
        readB64: async e => await o(a[e])
      };
    }
    async function s(e, t) {
      if (!(("assets" in e))) return e;
      async function a(e) {
        let {p: a} = e;
        if (null == a || null == t.read(`images/${a}`)) return e;
        let n = a.split(".").pop(), i = await t.readB64(`images/${a}`);
        if (n?.startsWith("data:")) return (e.p = n, e.e = 1, e);
        switch (n) {
          case "svg":
          case "svg+xml":
            e.p = `data:image/svg+xml;base64,${i}`;
            break;
          case "png":
          case "jpg":
          case "jpeg":
          case "gif":
          case "webp":
            e.p = `data:image/${n};base64,${i}`;
            break;
          default:
            e.p = `data:;base64,${i}`;
        }
        return (e.e = 1, e);
      }
      return ((await Promise.all(e.assets.map(a))).map((t, a) => {
        e.assets[a] = t;
      }), e);
    }
    async function r(e) {
      let t = await c(e), a = (function (e) {
        let t = JSON.parse(e);
        if (!(("animations" in t))) throw Error("Manifest not found");
        if (0 === t.animations.length) throw Error("No animations listed in the manifest");
        return t;
      })(t.read("manifest.json"));
      return (await Promise.all(a.animations.map(e => s(JSON.parse(t.read(`animations/${e.id}.json`)), t))))[0];
    }
    async function f(e) {
      let t = await d(e);
      return !(function (e) {
        let t = new Uint8Array(e, 0, 32);
        return 80 === t[0] && 75 === t[1] && 3 === t[2] && 4 === t[3];
      })(t) ? JSON.parse(new TextDecoder().decode(t)) : await r(t);
    }
  },
  3946: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
      actionListPlaybackChanged: function () {
        return H;
      },
      animationFrameChanged: function () {
        return w;
      },
      clearRequested: function () {
        return F;
      },
      elementStateChanged: function () {
        return X;
      },
      eventListenerAdded: function () {
        return G;
      },
      eventStateChanged: function () {
        return x;
      },
      instanceAdded: function () {
        return D;
      },
      instanceRemoved: function () {
        return W;
      },
      instanceStarted: function () {
        return Q;
      },
      mediaQueriesDefined: function () {
        return z;
      },
      parameterChanged: function () {
        return P;
      },
      playbackRequested: function () {
        return U;
      },
      previewRequested: function () {
        return k;
      },
      rawDataImported: function () {
        return A;
      },
      sessionInitialized: function () {
        return C;
      },
      sessionStarted: function () {
        return M;
      },
      sessionStopped: function () {
        return h;
      },
      stopRequested: function () {
        return B;
      },
      testFrameRendered: function () {
        return V;
      },
      viewportWidthChanged: function () {
        return Y;
      }
    };
    for (var i in n) Object.defineProperty(t, i, {
      enumerable: !0,
      get: n[i]
    });
    let l = a(7087), d = a(9468), {IX2_RAW_DATA_IMPORTED: o, IX2_SESSION_INITIALIZED: c, IX2_SESSION_STARTED: s, IX2_SESSION_STOPPED: r, IX2_PREVIEW_REQUESTED: f, IX2_PLAYBACK_REQUESTED: u, IX2_STOP_REQUESTED: p, IX2_CLEAR_REQUESTED: E, IX2_EVENT_LISTENER_ADDED: I, IX2_TEST_FRAME_RENDERED: T, IX2_EVENT_STATE_CHANGED: y, IX2_ANIMATION_FRAME_CHANGED: b, IX2_PARAMETER_CHANGED: m, IX2_INSTANCE_ADDED: g, IX2_INSTANCE_STARTED: O, IX2_INSTANCE_REMOVED: L, IX2_ELEMENT_STATE_CHANGED: v, IX2_ACTION_LIST_PLAYBACK_CHANGED: _, IX2_VIEWPORT_WIDTH_CHANGED: N, IX2_MEDIA_QUERIES_DEFINED: R} = l.IX2EngineActionTypes, {reifyState: S} = d.IX2VanillaUtils, A = e => ({
      type: o,
      payload: {
        ...S(e)
      }
    }), C = ({hasBoundaryNodes: e, reducedMotion: t}) => ({
      type: c,
      payload: {
        hasBoundaryNodes: e,
        reducedMotion: t
      }
    }), M = () => ({
      type: s
    }), h = () => ({
      type: r
    }), k = ({rawData: e, defer: t}) => ({
      type: f,
      payload: {
        defer: t,
        rawData: e
      }
    }), U = ({actionTypeId: e = l.ActionTypeConsts.GENERAL_START_ACTION, actionListId: t, actionItemId: a, eventId: n, allowEvents: i, immediate: d, testManual: o, verbose: c, rawData: s}) => ({
      type: u,
      payload: {
        actionTypeId: e,
        actionListId: t,
        actionItemId: a,
        testManual: o,
        eventId: n,
        allowEvents: i,
        immediate: d,
        verbose: c,
        rawData: s
      }
    }), B = e => ({
      type: p,
      payload: {
        actionListId: e
      }
    }), F = () => ({
      type: E
    }), G = (e, t) => ({
      type: I,
      payload: {
        target: e,
        listenerParams: t
      }
    }), V = (e = 1) => ({
      type: T,
      payload: {
        step: e
      }
    }), x = (e, t) => ({
      type: y,
      payload: {
        stateKey: e,
        newState: t
      }
    }), w = (e, t) => ({
      type: b,
      payload: {
        now: e,
        parameters: t
      }
    }), P = (e, t) => ({
      type: m,
      payload: {
        key: e,
        value: t
      }
    }), D = e => ({
      type: g,
      payload: {
        ...e
      }
    }), Q = (e, t) => ({
      type: O,
      payload: {
        instanceId: e,
        time: t
      }
    }), W = e => ({
      type: L,
      payload: {
        instanceId: e
      }
    }), X = (e, t, a, n) => ({
      type: v,
      payload: {
        elementId: e,
        actionTypeId: t,
        current: a,
        actionItem: n
      }
    }), H = ({actionListId: e, isPlaying: t}) => ({
      type: _,
      payload: {
        actionListId: e,
        isPlaying: t
      }
    }), Y = ({width: e, mediaQueries: t}) => ({
      type: N,
      payload: {
        width: e,
        mediaQueries: t
      }
    }), z = () => ({
      type: R
    });
  },
  6011: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n, i = {
      actions: function () {
        return s;
      },
      destroy: function () {
        return E;
      },
      init: function () {
        return p;
      },
      setEnv: function () {
        return u;
      },
      store: function () {
        return f;
      }
    };
    for (var l in i) Object.defineProperty(t, l, {
      enumerable: !0,
      get: i[l]
    });
    let d = a(9516), o = (n = a(7243)) && n.__esModule ? n : {
      default: n
    }, c = a(1970), s = (function (e, t) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var a = r(t);
      if (a && a.has(e)) return a.get(e);
      var n = {
        __proto__: null
      }, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var l in e) if ("default" !== l && Object.prototype.hasOwnProperty.call(e, l)) {
        var d = i ? Object.getOwnPropertyDescriptor(e, l) : null;
        d && (d.get || d.set) ? Object.defineProperty(n, l, d) : n[l] = e[l];
      }
      return (n.default = e, a && a.set(e, n), n);
    })(a(3946));
    function r(e) {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap(), a = new WeakMap();
      return (r = function (e) {
        return e ? a : t;
      })(e);
    }
    let f = (0, d.createStore)(o.default);
    function u(e) {
      e() && (0, c.observeRequests)(f);
    }
    function p(e) {
      (E(), (0, c.startEngine)({
        store: f,
        rawData: e,
        allowEvents: !0
      }));
    }
    function E() {
      (0, c.stopEngine)(f);
    }
  },
  5012: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
      elementContains: function () {
        return m;
      },
      getChildElements: function () {
        return O;
      },
      getClosestElement: function () {
        return v;
      },
      getProperty: function () {
        return E;
      },
      getQuerySelector: function () {
        return T;
      },
      getRefType: function () {
        return _;
      },
      getSiblingElements: function () {
        return L;
      },
      getStyle: function () {
        return p;
      },
      getValidDocument: function () {
        return y;
      },
      isSiblingNode: function () {
        return g;
      },
      matchSelector: function () {
        return I;
      },
      queryDocument: function () {
        return b;
      },
      setStyle: function () {
        return u;
      }
    };
    for (var i in n) Object.defineProperty(t, i, {
      enumerable: !0,
      get: n[i]
    });
    let l = a(9468), d = a(7087), {ELEMENT_MATCHES: o} = l.IX2BrowserSupport, {IX2_ID_DELIMITER: c, HTML_ELEMENT: s, PLAIN_OBJECT: r, WF_PAGE: f} = d.IX2EngineConstants;
    function u(e, t, a) {
      e.style[t] = a;
    }
    function p(e, t) {
      return t.startsWith("--") ? window.getComputedStyle(document.documentElement).getPropertyValue(t) : e.style instanceof CSSStyleDeclaration ? e.style[t] : void 0;
    }
    function E(e, t) {
      return e[t];
    }
    function I(e) {
      return t => t[o](e);
    }
    function T({id: e, selector: t}) {
      if (e) {
        let t = e;
        if (-1 !== e.indexOf(c)) {
          let a = e.split(c), n = a[0];
          if ((t = a[1], n !== document.documentElement.getAttribute(f))) return null;
        }
        return `[data-w-id="${t}"], [data-w-id^="${t}_instance"]`;
      }
      return t;
    }
    function y(e) {
      return null == e || e === document.documentElement.getAttribute(f) ? document : null;
    }
    function b(e, t) {
      return Array.prototype.slice.call(document.querySelectorAll(t ? e + " " + t : e));
    }
    function m(e, t) {
      return e.contains(t);
    }
    function g(e, t) {
      return e !== t && e.parentNode === t.parentNode;
    }
    function O(e) {
      let t = [];
      for (let a = 0, {length: n} = e || []; a < n; a++) {
        let {children: n} = e[a], {length: i} = n;
        if (i) for (let e = 0; e < i; e++) t.push(n[e]);
      }
      return t;
    }
    function L(e = []) {
      let t = [], a = [];
      for (let n = 0, {length: i} = e; n < i; n++) {
        let {parentNode: i} = e[n];
        if (!i || !i.children || !i.children.length || -1 !== a.indexOf(i)) continue;
        a.push(i);
        let l = i.firstElementChild;
        for (; null != l; ) (-1 === e.indexOf(l) && t.push(l), l = l.nextElementSibling);
      }
      return t;
    }
    let v = Element.prototype.closest ? (e, t) => document.documentElement.contains(e) ? e.closest(t) : null : (e, t) => {
      if (!document.documentElement.contains(e)) return null;
      let a = e;
      do {
        if (a[o] && a[o](t)) return a;
        a = a.parentNode;
      } while (null != a);
      return null;
    };
    function _(e) {
      return null != e && "object" == typeof e ? e instanceof Element ? s : r : null;
    }
  },
  1970: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
      observeRequests: function () {
        return q;
      },
      startActionGroup: function () {
        return eE;
      },
      startEngine: function () {
        return en;
      },
      stopActionGroup: function () {
        return ep;
      },
      stopAllActionGroups: function () {
        return eu;
      },
      stopEngine: function () {
        return ei;
      }
    };
    for (var i in n) Object.defineProperty(t, i, {
      enumerable: !0,
      get: n[i]
    });
    let l = b(a(9777)), d = b(a(4738)), o = b(a(4659)), c = b(a(3452)), s = b(a(6633)), r = b(a(3729)), f = b(a(2397)), u = b(a(5082)), p = a(7087), E = a(9468), I = a(3946), T = (function (e, t) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var a = m(t);
      if (a && a.has(e)) return a.get(e);
      var n = {
        __proto__: null
      }, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var l in e) if ("default" !== l && Object.prototype.hasOwnProperty.call(e, l)) {
        var d = i ? Object.getOwnPropertyDescriptor(e, l) : null;
        d && (d.get || d.set) ? Object.defineProperty(n, l, d) : n[l] = e[l];
      }
      return (n.default = e, a && a.set(e, n), n);
    })(a(5012)), y = b(a(8955));
    function b(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }
    function m(e) {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap(), a = new WeakMap();
      return (m = function (e) {
        return e ? a : t;
      })(e);
    }
    let g = Object.keys(p.QuickEffectIds), O = e => g.includes(e), {COLON_DELIMITER: L, BOUNDARY_SELECTOR: v, HTML_ELEMENT: _, RENDER_GENERAL: N, W_MOD_IX: R} = p.IX2EngineConstants, {getAffectedElements: S, getElementId: A, getDestinationValues: C, observeStore: M, getInstanceId: h, renderHTMLElement: k, clearAllStyles: U, getMaxDurationItemIndex: B, getComputedStyle: F, getInstanceOrigin: G, reduceListToGroup: V, shouldNamespaceEventParameter: x, getNamespacedParameterId: w, shouldAllowMediaQuery: P, cleanupHTMLElement: D, clearObjectCache: Q, stringifyTarget: W, mediaQueriesEqual: X, shallowEqual: H} = E.IX2VanillaUtils, {isPluginType: Y, createPluginInstance: z, getPluginDuration: j} = E.IX2VanillaPlugins, K = navigator.userAgent, $ = K.match(/iPad/i) || K.match(/iPhone/);
    function q(e) {
      (M({
        store: e,
        select: ({ixRequest: e}) => e.preview,
        onChange: Z
      }), M({
        store: e,
        select: ({ixRequest: e}) => e.playback,
        onChange: ee
      }), M({
        store: e,
        select: ({ixRequest: e}) => e.stop,
        onChange: et
      }), M({
        store: e,
        select: ({ixRequest: e}) => e.clear,
        onChange: ea
      }));
    }
    function Z({rawData: e, defer: t}, a) {
      let n = () => {
        (en({
          store: a,
          rawData: e,
          allowEvents: !0
        }), J());
      };
      t ? setTimeout(n, 0) : n();
    }
    function J() {
      document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
    }
    function ee(e, t) {
      let {actionTypeId: a, actionListId: n, actionItemId: i, eventId: l, allowEvents: d, immediate: o, testManual: c, verbose: s = !0} = e, {rawData: r} = e;
      if (n && i && r && o) {
        let e = r.actionLists[n];
        e && (r = V({
          actionList: e,
          actionItemId: i,
          rawData: r
        }));
      }
      if ((en({
        store: t,
        rawData: r,
        allowEvents: d,
        testManual: c
      }), n && a === p.ActionTypeConsts.GENERAL_START_ACTION || O(a))) {
        (ep({
          store: t,
          actionListId: n
        }), ef({
          store: t,
          actionListId: n,
          eventId: l
        }));
        let e = eE({
          store: t,
          eventId: l,
          actionListId: n,
          immediate: o,
          verbose: s
        });
        s && e && t.dispatch((0, I.actionListPlaybackChanged)({
          actionListId: n,
          isPlaying: !o
        }));
      }
    }
    function et({actionListId: e}, t) {
      (e ? ep({
        store: t,
        actionListId: e
      }) : eu({
        store: t
      }), ei(t));
    }
    function ea(e, t) {
      (ei(t), U({
        store: t,
        elementApi: T
      }));
    }
    function en({store: e, rawData: t, allowEvents: a, testManual: n}) {
      let {ixSession: i} = e.getState();
      if ((t && e.dispatch((0, I.rawDataImported)(t)), !i.active)) {
        (e.dispatch((0, I.sessionInitialized)({
          hasBoundaryNodes: !!document.querySelector(v),
          reducedMotion: document.body.hasAttribute("data-wf-ix-vacation") && window.matchMedia("(prefers-reduced-motion)").matches
        })), a) && ((function (e) {
          let {ixData: t} = e.getState(), {eventTypeMap: a} = t;
          (eo(e), (0, f.default)(a, (t, a) => {
            let n = y.default[a];
            if (!n) return void console.warn(`IX2 event type not configured: ${a}`);
            !(function ({logic: e, store: t, events: a}) {
              !(function (e) {
                if (!$) return;
                let t = {}, a = "";
                for (let n in e) {
                  let {eventTypeId: i, target: l} = e[n], d = T.getQuerySelector(l);
                  t[d] || (i === p.EventTypeConsts.MOUSE_CLICK || i === p.EventTypeConsts.MOUSE_SECOND_CLICK) && (t[d] = !0, a += d + "{cursor: pointer;touch-action: manipulation;}");
                }
                if (a) {
                  let e = document.createElement("style");
                  (e.textContent = a, document.body.appendChild(e));
                }
              })(a);
              let {types: n, handler: i} = e, {ixData: c} = t.getState(), {actionLists: s} = c, r = ec(a, er);
              if (!(0, o.default)(r)) return;
              (0, f.default)(r, (e, n) => {
                let i = a[n], {action: o, id: r, mediaQueries: f = c.mediaQueryKeys} = i, {actionListId: u} = o.config;
                (X(f, c.mediaQueryKeys) || t.dispatch((0, I.mediaQueriesDefined)()), o.actionTypeId === p.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION && (Array.isArray(i.config) ? i.config : [i.config]).forEach(a => {
                  let {continuousParameterGroupId: n} = a, i = (0, d.default)(s, `${u}.continuousParameterGroups`, []), o = (0, l.default)(i, ({id: e}) => e === n), c = (a.smoothing || 0) / 100, f = (a.restingState || 0) / 100;
                  o && e.forEach((e, n) => {
                    !(function ({store: e, eventStateKey: t, eventTarget: a, eventId: n, eventConfig: i, actionListId: l, parameterGroup: o, smoothing: c, restingValue: s}) {
                      let {ixData: r, ixSession: f} = e.getState(), {events: u} = r, E = u[n], {eventTypeId: I} = E, y = {}, b = {}, m = [], {continuousActionGroups: g} = o, {id: O} = o;
                      x(I, i) && (O = w(t, O));
                      let _ = f.hasBoundaryNodes && a ? T.getClosestElement(a, v) : null;
                      (g.forEach(e => {
                        let {keyframe: t, actionItems: n} = e;
                        n.forEach(e => {
                          let {actionTypeId: n} = e, {target: i} = e.config;
                          if (!i) return;
                          let l = i.boundaryMode ? _ : null, d = W(i) + L + n;
                          if ((b[d] = (function (e = [], t, a) {
                            let n, i = [...e];
                            return (i.some((e, a) => e.keyframe === t && (n = a, !0)), null == n && (n = i.length, i.push({
                              keyframe: t,
                              actionItems: []
                            })), i[n].actionItems.push(a), i);
                          })(b[d], t, e), !y[d])) {
                            y[d] = !0;
                            let {config: t} = e;
                            S({
                              config: t,
                              event: E,
                              eventTarget: a,
                              elementRoot: l,
                              elementApi: T
                            }).forEach(e => {
                              m.push({
                                element: e,
                                key: d
                              });
                            });
                          }
                        });
                      }), m.forEach(({element: t, key: a}) => {
                        let i = b[a], o = (0, d.default)(i, "[0].actionItems[0]", {}), {actionTypeId: r} = o, f = (r === p.ActionTypeConsts.PLUGIN_RIVE ? 0 === (o.config?.target?.selectorGuids || []).length : Y(r)) ? z(r)?.(t, o) : null, u = C({
                          element: t,
                          actionItem: o,
                          elementApi: T
                        }, f);
                        eI({
                          store: e,
                          element: t,
                          eventId: n,
                          actionListId: l,
                          actionItem: o,
                          destination: u,
                          continuous: !0,
                          parameterId: O,
                          actionGroups: i,
                          smoothing: c,
                          restingValue: s,
                          pluginInstance: f
                        });
                      }));
                    })({
                      store: t,
                      eventStateKey: r + L + n,
                      eventTarget: e,
                      eventId: r,
                      eventConfig: a,
                      actionListId: u,
                      parameterGroup: o,
                      smoothing: c,
                      restingValue: f
                    });
                  });
                }), (o.actionTypeId === p.ActionTypeConsts.GENERAL_START_ACTION || O(o.actionTypeId)) && ef({
                  store: t,
                  actionListId: u,
                  eventId: r
                }));
              });
              let E = e => {
                let {ixSession: n} = t.getState();
                es(r, (l, d, o) => {
                  let s = a[d], r = n.eventState[o], {action: f, mediaQueries: u = c.mediaQueryKeys} = s;
                  if (!P(u, n.mediaQueryKey)) return;
                  let E = (a = {}) => {
                    let n = i({
                      store: t,
                      element: l,
                      event: s,
                      eventConfig: a,
                      nativeEvent: e,
                      eventStateKey: o
                    }, r);
                    H(n, r) || t.dispatch((0, I.eventStateChanged)(o, n));
                  };
                  f.actionTypeId === p.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION ? (Array.isArray(s.config) ? s.config : [s.config]).forEach(E) : E();
                });
              }, y = (0, u.default)(E, 12), b = ({target: e = document, types: a, throttle: n}) => {
                a.split(" ").filter(Boolean).forEach(a => {
                  let i = n ? y : E;
                  (e.addEventListener(a, i), t.dispatch((0, I.eventListenerAdded)(e, [a, i])));
                });
              };
              Array.isArray(n) ? n.forEach(b) : "string" == typeof n && b(e);
            })({
              logic: n,
              store: e,
              events: t
            });
          }));
          let {ixSession: n} = e.getState();
          n.eventListeners.length && (function (e) {
            let t = () => {
              eo(e);
            };
            (ed.forEach(a => {
              (window.addEventListener(a, t), e.dispatch((0, I.eventListenerAdded)(window, [a, t])));
            }), t());
          })(e);
        })(e), (function () {
          let {documentElement: e} = document;
          -1 === e.className.indexOf(R) && (e.className += ` ${R}`);
        })(), e.getState().ixSession.hasDefinedMediaQueries && M({
          store: e,
          select: ({ixSession: e}) => e.mediaQueryKey,
          onChange: () => {
            (ei(e), U({
              store: e,
              elementApi: T
            }), en({
              store: e,
              allowEvents: !0
            }), J());
          }
        }));
        (e.dispatch((0, I.sessionStarted)()), (function (e, t) {
          let a = n => {
            let {ixSession: i, ixParameters: l} = e.getState();
            if (i.active) if ((e.dispatch((0, I.animationFrameChanged)(n, l)), t)) {
              let t = M({
                store: e,
                select: ({ixSession: e}) => e.tick,
                onChange: e => {
                  (a(e), t());
                }
              });
            } else requestAnimationFrame(a);
          };
          a(window.performance.now());
        })(e, n));
      }
    }
    function ei(e) {
      let {ixSession: t} = e.getState();
      if (t.active) {
        let {eventListeners: a} = t;
        (a.forEach(el), Q(), e.dispatch((0, I.sessionStopped)()));
      }
    }
    function el({target: e, listenerParams: t}) {
      e.removeEventListener.apply(e, t);
    }
    let ed = ["resize", "orientationchange"];
    function eo(e) {
      let {ixSession: t, ixData: a} = e.getState(), n = window.innerWidth;
      if (n !== t.viewportWidth) {
        let {mediaQueries: t} = a;
        e.dispatch((0, I.viewportWidthChanged)({
          width: n,
          mediaQueries: t
        }));
      }
    }
    let ec = (e, t) => (0, c.default)((0, r.default)(e, t), s.default), es = (e, t) => {
      (0, f.default)(e, (e, a) => {
        e.forEach((e, n) => {
          t(e, a, a + L + n);
        });
      });
    }, er = e => S({
      config: {
        target: e.target,
        targets: e.targets
      },
      elementApi: T
    });
    function ef({store: e, actionListId: t, eventId: a}) {
      let {ixData: n, ixSession: i} = e.getState(), {actionLists: l, events: o} = n, c = o[a], s = l[t];
      if (s && s.useFirstGroupAsInitialState) {
        let l = (0, d.default)(s, "actionItemGroups[0].actionItems", []);
        if (!P((0, d.default)(c, "mediaQueries", n.mediaQueryKeys), i.mediaQueryKey)) return;
        l.forEach(n => {
          let {config: i, actionTypeId: l} = n, d = S({
            config: i?.target?.useEventTarget === !0 && i?.target?.objectId == null ? {
              target: c.target,
              targets: c.targets
            } : i,
            event: c,
            elementApi: T
          }), o = Y(l);
          d.forEach(i => {
            let d = o ? z(l)?.(i, n) : null;
            eI({
              destination: C({
                element: i,
                actionItem: n,
                elementApi: T
              }, d),
              immediate: !0,
              store: e,
              element: i,
              eventId: a,
              actionItem: n,
              actionListId: t,
              pluginInstance: d
            });
          });
        });
      }
    }
    function eu({store: e}) {
      let {ixInstances: t} = e.getState();
      (0, f.default)(t, t => {
        if (!t.continuous) {
          let {actionListId: a, verbose: n} = t;
          (eT(t, e), n && e.dispatch((0, I.actionListPlaybackChanged)({
            actionListId: a,
            isPlaying: !1
          })));
        }
      });
    }
    function ep({store: e, eventId: t, eventTarget: a, eventStateKey: n, actionListId: i}) {
      let {ixInstances: l, ixSession: o} = e.getState(), c = o.hasBoundaryNodes && a ? T.getClosestElement(a, v) : null;
      (0, f.default)(l, a => {
        let l = (0, d.default)(a, "actionItem.config.target.boundaryMode"), o = !n || a.eventStateKey === n;
        if (a.actionListId === i && a.eventId === t && o) {
          if (c && l && !T.elementContains(c, a.element)) return;
          (eT(a, e), a.verbose && e.dispatch((0, I.actionListPlaybackChanged)({
            actionListId: i,
            isPlaying: !1
          })));
        }
      });
    }
    function eE({store: e, eventId: t, eventTarget: a, eventStateKey: n, actionListId: i, groupIndex: l = 0, immediate: o, verbose: c}) {
      let {ixData: s, ixSession: r} = e.getState(), {events: f} = s, u = f[t] || ({}), {mediaQueries: p = s.mediaQueryKeys} = u, {actionItemGroups: E, useFirstGroupAsInitialState: I} = (0, d.default)(s, `actionLists.${i}`, {});
      if (!E || !E.length) return !1;
      (l >= E.length && (0, d.default)(u, "config.loop") && (l = 0), 0 === l && I && l++);
      let y = (0 === l || 1 === l && I) && O(u.action?.actionTypeId) ? u.config.delay : void 0, b = (0, d.default)(E, [l, "actionItems"], []);
      if (!b.length || !P(p, r.mediaQueryKey)) return !1;
      let m = r.hasBoundaryNodes && a ? T.getClosestElement(a, v) : null, g = B(b), L = !1;
      return (b.forEach((d, s) => {
        let {config: r, actionTypeId: f} = d, p = Y(f), {target: E} = r;
        E && S({
          config: r,
          event: u,
          eventTarget: a,
          elementRoot: E.boundaryMode ? m : null,
          elementApi: T
        }).forEach((r, u) => {
          let E = p ? z(f)?.(r, d) : null, I = p ? j(f)(r, d) : null;
          L = !0;
          let b = F({
            element: r,
            actionItem: d
          }), m = C({
            element: r,
            actionItem: d,
            elementApi: T
          }, E);
          eI({
            store: e,
            element: r,
            actionItem: d,
            eventId: t,
            eventTarget: a,
            eventStateKey: n,
            actionListId: i,
            groupIndex: l,
            isCarrier: g === s && 0 === u,
            computedStyle: b,
            destination: m,
            immediate: o,
            verbose: c,
            pluginInstance: E,
            pluginDuration: I,
            instanceDelay: y
          });
        });
      }), L);
    }
    function eI(e) {
      let t, {store: a, computedStyle: n, ...i} = e, {element: l, actionItem: d, immediate: o, pluginInstance: c, continuous: s, restingValue: r, eventId: f} = i, u = h(), {ixElements: E, ixSession: y, ixData: b} = a.getState(), m = A(E, l), {refState: g} = E[m] || ({}), O = T.getRefType(l), L = y.reducedMotion && p.ReducedMotionTypes[d.actionTypeId];
      if (L && s) switch (b.events[f]?.eventTypeId) {
        case p.EventTypeConsts.MOUSE_MOVE:
        case p.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
          t = r;
          break;
        default:
          t = 0.5;
      }
      let v = G(l, g, n, d, T, c);
      if ((a.dispatch((0, I.instanceAdded)({
        instanceId: u,
        elementId: m,
        origin: v,
        refType: O,
        skipMotion: L,
        skipToValue: t,
        ...i
      })), ey(document.body, "ix2-animation-started", u), o)) return void (function (e, t) {
        let {ixParameters: a} = e.getState();
        (e.dispatch((0, I.instanceStarted)(t, 0)), e.dispatch((0, I.animationFrameChanged)(performance.now(), a)));
        let {ixInstances: n} = e.getState();
        eb(n[t], e);
      })(a, u);
      (M({
        store: a,
        select: ({ixInstances: e}) => e[u],
        onChange: eb
      }), s || a.dispatch((0, I.instanceStarted)(u, y.tick)));
    }
    function eT(e, t) {
      ey(document.body, "ix2-animation-stopping", {
        instanceId: e.id,
        state: t.getState()
      });
      let {elementId: a, actionItem: n} = e, {ixElements: i} = t.getState(), {ref: l, refType: d} = i[a] || ({});
      (d === _ && D(l, n, T), t.dispatch((0, I.instanceRemoved)(e.id)));
    }
    function ey(e, t, a) {
      let n = document.createEvent("CustomEvent");
      (n.initCustomEvent(t, !0, !0, a), e.dispatchEvent(n));
    }
    function eb(e, t) {
      let {active: a, continuous: n, complete: i, elementId: l, actionItem: d, actionTypeId: o, renderType: c, current: s, groupIndex: r, eventId: f, eventTarget: u, eventStateKey: p, actionListId: E, isCarrier: y, styleProp: b, verbose: m, pluginInstance: g} = e, {ixData: O, ixSession: L} = t.getState(), {events: v} = O, {mediaQueries: R = O.mediaQueryKeys} = v && v[f] ? v[f] : {};
      if (P(R, L.mediaQueryKey) && (n || a || i)) {
        if (s || c === N && i) {
          t.dispatch((0, I.elementStateChanged)(l, o, s, d));
          let {ixElements: e} = t.getState(), {ref: a, refType: n, refState: i} = e[l] || ({}), r = i && i[o];
          (n === _ || Y(o)) && k(a, i, r, f, d, b, T, c, g);
        }
        if (i) {
          if (y) {
            let e = eE({
              store: t,
              eventId: f,
              eventTarget: u,
              eventStateKey: p,
              actionListId: E,
              groupIndex: r + 1,
              verbose: m
            });
            m && !e && t.dispatch((0, I.actionListPlaybackChanged)({
              actionListId: E,
              isPlaying: !1
            }));
          }
          eT(e, t);
        }
      }
    }
  },
  8955: function (e, t, a) {
    "use strict";
    let n;
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function () {
        return ep;
      }
    }));
    let i = f(a(5801)), l = f(a(4738)), d = f(a(3789)), o = a(7087), c = a(1970), s = a(3946), r = a(9468);
    function f(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }
    let {MOUSE_CLICK: u, MOUSE_SECOND_CLICK: p, MOUSE_DOWN: E, MOUSE_UP: I, MOUSE_OVER: T, MOUSE_OUT: y, DROPDOWN_CLOSE: b, DROPDOWN_OPEN: m, SLIDER_ACTIVE: g, SLIDER_INACTIVE: O, TAB_ACTIVE: L, TAB_INACTIVE: v, NAVBAR_CLOSE: _, NAVBAR_OPEN: N, MOUSE_MOVE: R, PAGE_SCROLL_DOWN: S, SCROLL_INTO_VIEW: A, SCROLL_OUT_OF_VIEW: C, PAGE_SCROLL_UP: M, SCROLLING_IN_VIEW: h, PAGE_FINISH: k, ECOMMERCE_CART_CLOSE: U, ECOMMERCE_CART_OPEN: B, PAGE_START: F, PAGE_SCROLL: G} = o.EventTypeConsts, V = "COMPONENT_ACTIVE", x = "COMPONENT_INACTIVE", {COLON_DELIMITER: w} = o.IX2EngineConstants, {getNamespacedParameterId: P} = r.IX2VanillaUtils, D = e => t => !!("object" == typeof t && e(t)) || t, Q = D(({element: e, nativeEvent: t}) => e === t.target), W = D(({element: e, nativeEvent: t}) => e.contains(t.target)), X = (0, i.default)([Q, W]), H = (e, t) => {
      if (t) {
        let {ixData: a} = e.getState(), {events: n} = a, i = n[t];
        if (i && !ee[i.eventTypeId]) return i;
      }
      return null;
    }, Y = ({store: e, event: t}) => {
      let {action: a} = t, {autoStopEventId: n} = a.config;
      return !!H(e, n);
    }, z = ({store: e, event: t, element: a, eventStateKey: n}, i) => {
      let {action: d, id: o} = t, {actionListId: s, autoStopEventId: r} = d.config, f = H(e, r);
      return (f && (0, c.stopActionGroup)({
        store: e,
        eventId: r,
        eventTarget: a,
        eventStateKey: r + w + n.split(w)[1],
        actionListId: (0, l.default)(f, "action.config.actionListId")
      }), (0, c.stopActionGroup)({
        store: e,
        eventId: o,
        eventTarget: a,
        eventStateKey: n,
        actionListId: s
      }), (0, c.startActionGroup)({
        store: e,
        eventId: o,
        eventTarget: a,
        eventStateKey: n,
        actionListId: s
      }), i);
    }, j = (e, t) => (a, n) => !0 === e(a, n) ? t(a, n) : n, K = {
      handler: j(X, z)
    }, $ = {
      ...K,
      types: [V, x].join(" ")
    }, q = [{
      target: window,
      types: "resize orientationchange",
      throttle: !0
    }, {
      target: document,
      types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
      throttle: !0
    }], Z = "mouseover mouseout", J = {
      types: q
    }, ee = {
      PAGE_START: F,
      PAGE_FINISH: k
    }, et = (() => {
      let e = void 0 !== window.pageXOffset, t = "CSS1Compat" === document.compatMode ? document.documentElement : document.body;
      return () => ({
        scrollLeft: e ? window.pageXOffset : t.scrollLeft,
        scrollTop: e ? window.pageYOffset : t.scrollTop,
        stiffScrollTop: (0, d.default)(e ? window.pageYOffset : t.scrollTop, 0, t.scrollHeight - window.innerHeight),
        scrollWidth: t.scrollWidth,
        scrollHeight: t.scrollHeight,
        clientWidth: t.clientWidth,
        clientHeight: t.clientHeight,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      });
    })(), ea = (e, t) => !(e.left > t.right || e.right < t.left || e.top > t.bottom || e.bottom < t.top), en = ({element: e, nativeEvent: t}) => {
      let {type: a, target: n, relatedTarget: i} = t, l = e.contains(n);
      if ("mouseover" === a && l) return !0;
      let d = e.contains(i);
      return "mouseout" === a && !!l && !!d;
    }, ei = e => {
      let {element: t, event: {config: a}} = e, {clientWidth: n, clientHeight: i} = et(), l = a.scrollOffsetValue, d = "PX" === a.scrollOffsetUnit ? l : i * (l || 0) / 100;
      return ea(t.getBoundingClientRect(), {
        left: 0,
        top: d,
        right: n,
        bottom: i - d
      });
    }, el = e => (t, a) => {
      let {type: n} = t.nativeEvent, i = -1 !== [V, x].indexOf(n) ? n === V : a.isActive, l = {
        ...a,
        isActive: i
      };
      return (!a || l.isActive !== a.isActive) && e(t, l) || l;
    }, ed = e => (t, a) => {
      let n = {
        elementHovered: en(t)
      };
      return (a ? n.elementHovered !== a.elementHovered : n.elementHovered) && e(t, n) || n;
    }, eo = e => (t, a = {}) => {
      let n, i, {stiffScrollTop: l, scrollHeight: d, innerHeight: o} = et(), {event: {config: c, eventTypeId: s}} = t, {scrollOffsetValue: r, scrollOffsetUnit: f} = c, u = d - o, p = Number((l / u).toFixed(2));
      if (a && a.percentTop === p) return a;
      let E = ("PX" === f ? r : o * (r || 0) / 100) / u, I = 0;
      a && (n = p > a.percentTop, I = (i = a.scrollingDown !== n) ? p : a.anchorTop);
      let T = s === S ? p >= I + E : p <= I - E, y = {
        ...a,
        percentTop: p,
        inBounds: T,
        anchorTop: I,
        scrollingDown: n
      };
      return a && T && (i || y.inBounds !== a.inBounds) && e(t, y) || y;
    }, ec = (e, t) => e.left > t.left && e.left < t.right && e.top > t.top && e.top < t.bottom, es = e => (t, a = {
      clickCount: 0
    }) => {
      let n = {
        clickCount: a.clickCount % 2 + 1
      };
      return n.clickCount !== a.clickCount && e(t, n) || n;
    }, er = (e = !0) => ({
      ...$,
      handler: j(e ? X : Q, el((e, t) => t.isActive ? K.handler(e, t) : t))
    }), ef = (e = !0) => ({
      ...$,
      handler: j(e ? X : Q, el((e, t) => t.isActive ? t : K.handler(e, t)))
    }), eu = {
      ...J,
      handler: (n = (e, t) => {
        let {elementVisible: a} = t, {event: n, store: i} = e, {ixData: l} = i.getState(), {events: d} = l;
        return !d[n.action.config.autoStopEventId] && t.triggered ? t : n.eventTypeId === A === a ? (z(e), {
          ...t,
          triggered: !0
        }) : t;
      }, (e, t) => {
        let a = {
          ...t,
          elementVisible: ei(e)
        };
        return (t ? a.elementVisible !== t.elementVisible : a.elementVisible) && n(e, a) || a;
      })
    }, ep = {
      [g]: er(),
      [O]: ef(),
      [m]: er(),
      [b]: ef(),
      [N]: er(!1),
      [_]: ef(!1),
      [L]: er(),
      [v]: ef(),
      [B]: {
        types: "ecommerce-cart-open",
        handler: j(X, z)
      },
      [U]: {
        types: "ecommerce-cart-close",
        handler: j(X, z)
      },
      [u]: {
        types: "click",
        handler: j(X, es((e, {clickCount: t}) => {
          Y(e) ? 1 === t && z(e) : z(e);
        }))
      },
      [p]: {
        types: "click",
        handler: j(X, es((e, {clickCount: t}) => {
          2 === t && z(e);
        }))
      },
      [E]: {
        ...K,
        types: "mousedown"
      },
      [I]: {
        ...K,
        types: "mouseup"
      },
      [T]: {
        types: Z,
        handler: j(X, ed((e, t) => {
          t.elementHovered && z(e);
        }))
      },
      [y]: {
        types: Z,
        handler: j(X, ed((e, t) => {
          t.elementHovered || z(e);
        }))
      },
      [R]: {
        types: "mousemove mouseout scroll",
        handler: ({store: e, element: t, eventConfig: a, nativeEvent: n, eventStateKey: i}, l = {
          clientX: 0,
          clientY: 0,
          pageX: 0,
          pageY: 0
        }) => {
          let {basedOn: d, selectedAxis: c, continuousParameterGroupId: r, reverse: f, restingState: u = 0} = a, {clientX: p = l.clientX, clientY: E = l.clientY, pageX: I = l.pageX, pageY: T = l.pageY} = n, y = "X_AXIS" === c, b = "mouseout" === n.type, m = u / 100, g = r, O = !1;
          switch (d) {
            case o.EventBasedOn.VIEWPORT:
              m = y ? Math.min(p, window.innerWidth) / window.innerWidth : Math.min(E, window.innerHeight) / window.innerHeight;
              break;
            case o.EventBasedOn.PAGE:
              {
                let {scrollLeft: e, scrollTop: t, scrollWidth: a, scrollHeight: n} = et();
                m = y ? Math.min(e + I, a) / a : Math.min(t + T, n) / n;
                break;
              }
            case o.EventBasedOn.ELEMENT:
            default:
              {
                g = P(i, r);
                let e = 0 === n.type.indexOf("mouse");
                if (e && !0 !== X({
                  element: t,
                  nativeEvent: n
                })) break;
                let a = t.getBoundingClientRect(), {left: l, top: d, width: o, height: c} = a;
                if (!e && !ec({
                  left: p,
                  top: E
                }, a)) break;
                (O = !0, m = y ? (p - l) / o : (E - d) / c);
              }
          }
          return (b && (m > 0.95 || m < 0.05) && (m = Math.round(m)), (d !== o.EventBasedOn.ELEMENT || O || O !== l.elementHovered) && (m = f ? 1 - m : m, e.dispatch((0, s.parameterChanged)(g, m))), {
            elementHovered: O,
            clientX: p,
            clientY: E,
            pageX: I,
            pageY: T
          });
        }
      },
      [G]: {
        types: q,
        handler: ({store: e, eventConfig: t}) => {
          let {continuousParameterGroupId: a, reverse: n} = t, {scrollTop: i, scrollHeight: l, clientHeight: d} = et(), o = i / (l - d);
          (o = n ? 1 - o : o, e.dispatch((0, s.parameterChanged)(a, o)));
        }
      },
      [h]: {
        types: q,
        handler: ({element: e, store: t, eventConfig: a, eventStateKey: n}, i = {
          scrollPercent: 0
        }) => {
          let {scrollLeft: l, scrollTop: d, scrollWidth: c, scrollHeight: r, clientHeight: f} = et(), {basedOn: u, selectedAxis: p, continuousParameterGroupId: E, startsEntering: I, startsExiting: T, addEndOffset: y, addStartOffset: b, addOffsetValue: m = 0, endOffsetValue: g = 0} = a;
          if (u === o.EventBasedOn.VIEWPORT) {
            let e = "X_AXIS" === p ? l / c : d / r;
            return (e !== i.scrollPercent && t.dispatch((0, s.parameterChanged)(E, e)), {
              scrollPercent: e
            });
          }
          {
            let a = P(n, E), l = e.getBoundingClientRect(), d = (b ? m : 0) / 100, o = (y ? g : 0) / 100;
            (d = I ? d : 1 - d, o = T ? o : 1 - o);
            let c = l.top + Math.min(l.height * d, f), u = Math.min(f + (l.top + l.height * o - c), r), p = Math.min(Math.max(0, f - c), u) / u;
            return (p !== i.scrollPercent && t.dispatch((0, s.parameterChanged)(a, p)), {
              scrollPercent: p
            });
          }
        }
      },
      [A]: eu,
      [C]: eu,
      [S]: {
        ...J,
        handler: eo((e, t) => {
          t.scrollingDown && z(e);
        })
      },
      [M]: {
        ...J,
        handler: eo((e, t) => {
          t.scrollingDown || z(e);
        })
      },
      [k]: {
        types: "readystatechange IX2_PAGE_UPDATE",
        handler: j(Q, (e, t) => {
          let a = {
            finished: "complete" === document.readyState
          };
          return (a.finished && !(t && t.finshed) && z(e), a);
        })
      },
      [F]: {
        types: "readystatechange IX2_PAGE_UPDATE",
        handler: j(Q, (e, t) => (t || z(e), {
          started: !0
        }))
      }
    };
  },
  4609: function (e, t, a) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "ixData", {
      enumerable: !0,
      get: function () {
        return i;
      }
    }));
    let {IX2_RAW_DATA_IMPORTED: n} = a(7087).IX2EngineActionTypes, i = (e = Object.freeze({}), t) => t.type === n ? t.payload.ixData || Object.freeze({}) : e;
  },
  7718: function (e, t, a) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "ixInstances", {
      enumerable: !0,
      get: function () {
        return O;
      }
    }));
    let n = a(7087), i = a(9468), l = a(1185), {IX2_RAW_DATA_IMPORTED: d, IX2_SESSION_STOPPED: o, IX2_INSTANCE_ADDED: c, IX2_INSTANCE_STARTED: s, IX2_INSTANCE_REMOVED: r, IX2_ANIMATION_FRAME_CHANGED: f} = n.IX2EngineActionTypes, {optimizeFloat: u, applyEasing: p, createBezierEasing: E} = i.IX2EasingUtils, {RENDER_GENERAL: I} = n.IX2EngineConstants, {getItemConfigByKey: T, getRenderType: y, getStyleProp: b} = i.IX2VanillaUtils, m = (e, t) => {
      let a, n, i, d, {position: o, parameterId: c, actionGroups: s, destinationKeys: r, smoothing: f, restingValue: E, actionTypeId: I, customEasingFn: y, skipMotion: b, skipToValue: m} = e, {parameters: g} = t.payload, O = Math.max(1 - f, 0.01), L = g[c];
      null == L && (O = 1, L = E);
      let v = u((Math.max(L, 0) || 0) - o), _ = b ? m : u(o + v * O), N = 100 * _;
      if (_ === o && e.current) return e;
      for (let e = 0, {length: t} = s; e < t; e++) {
        let {keyframe: t, actionItems: l} = s[e];
        if ((0 === e && (a = l[0]), N >= t)) {
          a = l[0];
          let o = s[e + 1], c = o && N !== t;
          (n = c ? o.actionItems[0] : null, c && (i = t / 100, d = (o.keyframe - t) / 100));
        }
      }
      let R = {};
      if (a && !n) for (let e = 0, {length: t} = r; e < t; e++) {
        let t = r[e];
        R[t] = T(I, t, a.config);
      } else if (a && n && void 0 !== i && void 0 !== d) {
        let e = (_ - i) / d, t = p(a.config.easing, e, y);
        for (let e = 0, {length: i} = r; e < i; e++) {
          let i = r[e], l = T(I, i, a.config), d = (T(I, i, n.config) - l) * t + l;
          R[i] = d;
        }
      }
      return (0, l.merge)(e, {
        position: _,
        current: R
      });
    }, g = (e, t) => {
      let {active: a, origin: n, start: i, immediate: d, renderType: o, verbose: c, actionItem: s, destination: r, destinationKeys: f, pluginDuration: E, instanceDelay: T, customEasingFn: y, skipMotion: b} = e, m = s.config.easing, {duration: g, delay: O} = s.config;
      (null != E && (g = E), O = null != T ? T : O, o === I ? g = 0 : (d || b) && (g = O = 0));
      let {now: L} = t.payload;
      if (a && n) {
        let t = L - (i + O);
        if (c) {
          let t = g + O, a = u(Math.min(Math.max(0, (L - i) / t), 1));
          e = (0, l.set)(e, "verboseTimeElapsed", t * a);
        }
        if (t < 0) return e;
        let a = u(Math.min(Math.max(0, t / g), 1)), d = p(m, a, y), o = {}, s = null;
        return (f.length && (s = f.reduce((e, t) => {
          let a = r[t], i = parseFloat(n[t]) || 0, l = parseFloat(a) - i;
          return (e[t] = l * d + i, e);
        }, {})), o.current = s, o.position = a, 1 === a && (o.active = !1, o.complete = !0), (0, l.merge)(e, o));
      }
      return e;
    }, O = (e = Object.freeze({}), t) => {
      switch (t.type) {
        case d:
          return t.payload.ixInstances || Object.freeze({});
        case o:
          return Object.freeze({});
        case c:
          {
            let {instanceId: a, elementId: n, actionItem: i, eventId: d, eventTarget: o, eventStateKey: c, actionListId: s, groupIndex: r, isCarrier: f, origin: u, destination: p, immediate: I, verbose: T, continuous: m, parameterId: g, actionGroups: O, smoothing: L, restingValue: v, pluginInstance: _, pluginDuration: N, instanceDelay: R, skipMotion: S, skipToValue: A} = t.payload, {actionTypeId: C} = i, M = y(C), h = b(M, C), k = Object.keys(p).filter(e => null != p[e] && "string" != typeof p[e]), {easing: U} = i.config;
            return (0, l.set)(e, a, {
              id: a,
              elementId: n,
              active: !1,
              position: 0,
              start: 0,
              origin: u,
              destination: p,
              destinationKeys: k,
              immediate: I,
              verbose: T,
              current: null,
              actionItem: i,
              actionTypeId: C,
              eventId: d,
              eventTarget: o,
              eventStateKey: c,
              actionListId: s,
              groupIndex: r,
              renderType: M,
              isCarrier: f,
              styleProp: h,
              continuous: m,
              parameterId: g,
              actionGroups: O,
              smoothing: L,
              restingValue: v,
              pluginInstance: _,
              pluginDuration: N,
              instanceDelay: R,
              skipMotion: S,
              skipToValue: A,
              customEasingFn: Array.isArray(U) && 4 === U.length ? E(U) : void 0
            });
          }
        case s:
          {
            let {instanceId: a, time: n} = t.payload;
            return (0, l.mergeIn)(e, [a], {
              active: !0,
              complete: !1,
              start: n
            });
          }
        case r:
          {
            let {instanceId: a} = t.payload;
            if (!e[a]) return e;
            let n = {}, i = Object.keys(e), {length: l} = i;
            for (let t = 0; t < l; t++) {
              let l = i[t];
              l !== a && (n[l] = e[l]);
            }
            return n;
          }
        case f:
          {
            let a = e, n = Object.keys(e), {length: i} = n;
            for (let d = 0; d < i; d++) {
              let i = n[d], o = e[i], c = o.continuous ? m : g;
              a = (0, l.set)(a, i, c(o, t));
            }
            return a;
          }
        default:
          return e;
      }
    };
  },
  1540: function (e, t, a) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "ixParameters", {
      enumerable: !0,
      get: function () {
        return d;
      }
    }));
    let {IX2_RAW_DATA_IMPORTED: n, IX2_SESSION_STOPPED: i, IX2_PARAMETER_CHANGED: l} = a(7087).IX2EngineActionTypes, d = (e = {}, t) => {
      switch (t.type) {
        case n:
          return t.payload.ixParameters || ({});
        case i:
          return {};
        case l:
          {
            let {key: a, value: n} = t.payload;
            return (e[a] = n, e);
          }
        default:
          return e;
      }
    };
  },
  7243: function (e, t, a) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function () {
        return f;
      }
    }));
    let n = a(9516), i = a(4609), l = a(628), d = a(5862), o = a(9468), c = a(7718), s = a(1540), {ixElements: r} = o.IX2ElementsReducer, f = (0, n.combineReducers)({
      ixData: i.ixData,
      ixRequest: l.ixRequest,
      ixSession: d.ixSession,
      ixElements: r,
      ixInstances: c.ixInstances,
      ixParameters: s.ixParameters
    });
  },
  628: function (e, t, a) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "ixRequest", {
      enumerable: !0,
      get: function () {
        return f;
      }
    }));
    let n = a(7087), i = a(1185), {IX2_PREVIEW_REQUESTED: l, IX2_PLAYBACK_REQUESTED: d, IX2_STOP_REQUESTED: o, IX2_CLEAR_REQUESTED: c} = n.IX2EngineActionTypes, s = {
      preview: {},
      playback: {},
      stop: {},
      clear: {}
    }, r = Object.create(null, {
      [l]: {
        value: "preview"
      },
      [d]: {
        value: "playback"
      },
      [o]: {
        value: "stop"
      },
      [c]: {
        value: "clear"
      }
    }), f = (e = s, t) => {
      if ((t.type in r)) {
        let a = [r[t.type]];
        return (0, i.setIn)(e, [a], {
          ...t.payload
        });
      }
      return e;
    };
  },
  5862: function (e, t, a) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "ixSession", {
      enumerable: !0,
      get: function () {
        return T;
      }
    }));
    let n = a(7087), i = a(1185), {IX2_SESSION_INITIALIZED: l, IX2_SESSION_STARTED: d, IX2_TEST_FRAME_RENDERED: o, IX2_SESSION_STOPPED: c, IX2_EVENT_LISTENER_ADDED: s, IX2_EVENT_STATE_CHANGED: r, IX2_ANIMATION_FRAME_CHANGED: f, IX2_ACTION_LIST_PLAYBACK_CHANGED: u, IX2_VIEWPORT_WIDTH_CHANGED: p, IX2_MEDIA_QUERIES_DEFINED: E} = n.IX2EngineActionTypes, I = {
      active: !1,
      tick: 0,
      eventListeners: [],
      eventState: {},
      playbackState: {},
      viewportWidth: 0,
      mediaQueryKey: null,
      hasBoundaryNodes: !1,
      hasDefinedMediaQueries: !1,
      reducedMotion: !1
    }, T = (e = I, t) => {
      switch (t.type) {
        case l:
          {
            let {hasBoundaryNodes: a, reducedMotion: n} = t.payload;
            return (0, i.merge)(e, {
              hasBoundaryNodes: a,
              reducedMotion: n
            });
          }
        case d:
          return (0, i.set)(e, "active", !0);
        case o:
          {
            let {payload: {step: a = 20}} = t;
            return (0, i.set)(e, "tick", e.tick + a);
          }
        case c:
          return I;
        case f:
          {
            let {payload: {now: a}} = t;
            return (0, i.set)(e, "tick", a);
          }
        case s:
          {
            let a = (0, i.addLast)(e.eventListeners, t.payload);
            return (0, i.set)(e, "eventListeners", a);
          }
        case r:
          {
            let {stateKey: a, newState: n} = t.payload;
            return (0, i.setIn)(e, ["eventState", a], n);
          }
        case u:
          {
            let {actionListId: a, isPlaying: n} = t.payload;
            return (0, i.setIn)(e, ["playbackState", a], n);
          }
        case p:
          {
            let {width: a, mediaQueries: n} = t.payload, l = n.length, d = null;
            for (let e = 0; e < l; e++) {
              let {key: t, min: i, max: l} = n[e];
              if (a >= i && a <= l) {
                d = t;
                break;
              }
            }
            return (0, i.merge)(e, {
              viewportWidth: a,
              mediaQueryKey: d
            });
          }
        case E:
          return (0, i.set)(e, "hasDefinedMediaQueries", !0);
        default:
          return e;
      }
    };
  },
  7377: function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = {
      clearPlugin: function () {
        return r;
      },
      createPluginInstance: function () {
        return c;
      },
      getPluginConfig: function () {
        return i;
      },
      getPluginDestination: function () {
        return o;
      },
      getPluginDuration: function () {
        return l;
      },
      getPluginOrigin: function () {
        return d;
      },
      renderPlugin: function () {
        return s;
      }
    };
    for (var n in a) Object.defineProperty(t, n, {
      enumerable: !0,
      get: a[n]
    });
    let i = e => e.value, l = (e, t) => {
      if ("auto" !== t.config.duration) return null;
      let a = parseFloat(e.getAttribute("data-duration"));
      return a > 0 ? 1000 * a : 1000 * parseFloat(e.getAttribute("data-default-duration"));
    }, d = e => e || ({
      value: 0
    }), o = e => ({
      value: e.value
    }), c = e => {
      let t = window.Webflow.require("lottie");
      if (!t) return null;
      let a = t.createInstance(e);
      return (a.stop(), a.setSubframe(!0), a);
    }, s = (e, t, a) => {
      if (!e) return;
      let n = t[a.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    }, r = e => {
      let t = window.Webflow.require("lottie");
      t && t.createInstance(e).stop();
    };
  },
  2570: function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = {
      clearPlugin: function () {
        return E;
      },
      createPluginInstance: function () {
        return u;
      },
      getPluginConfig: function () {
        return c;
      },
      getPluginDestination: function () {
        return f;
      },
      getPluginDuration: function () {
        return s;
      },
      getPluginOrigin: function () {
        return r;
      },
      renderPlugin: function () {
        return p;
      }
    };
    for (var n in a) Object.defineProperty(t, n, {
      enumerable: !0,
      get: a[n]
    });
    let i = "--wf-rive-fit", l = "--wf-rive-alignment", d = e => document.querySelector(`[data-w-id="${e}"]`), o = () => window.Webflow.require("rive"), c = (e, t) => e.value.inputs[t], s = () => null, r = (e, t) => {
      if (e) return e;
      let a = {}, {inputs: n = {}} = t.config.value;
      for (let e in n) null == n[e] && (a[e] = 0);
      return a;
    }, f = e => e.value.inputs ?? ({}), u = (e, t) => {
      if ((t.config?.target?.selectorGuids || []).length > 0) return e;
      let a = t?.config?.target?.pluginElement;
      return a ? d(a) : null;
    }, p = (e, {PLUGIN_RIVE: t}, a) => {
      let n = o();
      if (!n) return;
      let d = n.getInstance(e), c = n.rive.StateMachineInputType, {name: s, inputs: r = {}} = a.config.value || ({});
      function f(e) {
        if (e.loaded) a(); else {
          let t = () => {
            (a(), e?.off("load", t));
          };
          e?.on("load", t);
        }
        function a() {
          let a = e.stateMachineInputs(s);
          if (null != a) {
            if ((e.isPlaying || e.play(s, !1), (i in r) || (l in r))) {
              let t = e.layout, a = r[i] ?? t.fit, n = r[l] ?? t.alignment;
              (a !== t.fit || n !== t.alignment) && (e.layout = t.copyWith({
                fit: a,
                alignment: n
              }));
            }
            for (let e in r) {
              if (e === i || e === l) continue;
              let n = a.find(t => t.name === e);
              if (null != n) switch (n.type) {
                case c.Boolean:
                  null != r[e] && (n.value = !!r[e]);
                  break;
                case c.Number:
                  {
                    let a = t[e];
                    null != a && (n.value = a);
                    break;
                  }
                case c.Trigger:
                  r[e] && n.fire();
              }
            }
          }
        }
      }
      d?.rive ? f(d.rive) : n.setLoadHandler(e, f);
    }, E = (e, t) => null;
  },
  2866: function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = {
      clearPlugin: function () {
        return E;
      },
      createPluginInstance: function () {
        return u;
      },
      getPluginConfig: function () {
        return o;
      },
      getPluginDestination: function () {
        return f;
      },
      getPluginDuration: function () {
        return c;
      },
      getPluginOrigin: function () {
        return r;
      },
      renderPlugin: function () {
        return p;
      }
    };
    for (var n in a) Object.defineProperty(t, n, {
      enumerable: !0,
      get: a[n]
    });
    let i = e => document.querySelector(`[data-w-id="${e}"]`), l = () => window.Webflow.require("spline"), d = (e, t) => e.filter(e => !t.includes(e)), o = (e, t) => e.value[t], c = () => null, s = Object.freeze({
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1
    }), r = (e, t) => {
      let a = Object.keys(t.config.value);
      if (e) {
        let t = d(a, Object.keys(e));
        return t.length ? t.reduce((e, t) => (e[t] = s[t], e), e) : e;
      }
      return a.reduce((e, t) => (e[t] = s[t], e), {});
    }, f = e => e.value, u = (e, t) => {
      let a = t?.config?.target?.pluginElement;
      return a ? i(a) : null;
    }, p = (e, t, a) => {
      let n = l();
      if (!n) return;
      let i = n.getInstance(e), d = a.config.target.objectId, o = e => {
        if (!e) throw Error("Invalid spline app passed to renderSpline");
        let a = d && e.findObjectById(d);
        if (!a) return;
        let {PLUGIN_SPLINE: n} = t;
        (null != n.positionX && (a.position.x = n.positionX), null != n.positionY && (a.position.y = n.positionY), null != n.positionZ && (a.position.z = n.positionZ), null != n.rotationX && (a.rotation.x = n.rotationX), null != n.rotationY && (a.rotation.y = n.rotationY), null != n.rotationZ && (a.rotation.z = n.rotationZ), null != n.scaleX && (a.scale.x = n.scaleX), null != n.scaleY && (a.scale.y = n.scaleY), null != n.scaleZ && (a.scale.z = n.scaleZ));
      };
      i ? o(i.spline) : n.setLoadHandler(e, o);
    }, E = () => null;
  },
  1407: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
      clearPlugin: function () {
        return p;
      },
      createPluginInstance: function () {
        return r;
      },
      getPluginConfig: function () {
        return d;
      },
      getPluginDestination: function () {
        return s;
      },
      getPluginDuration: function () {
        return o;
      },
      getPluginOrigin: function () {
        return c;
      },
      renderPlugin: function () {
        return u;
      }
    };
    for (var i in n) Object.defineProperty(t, i, {
      enumerable: !0,
      get: n[i]
    });
    let l = a(380), d = (e, t) => e.value[t], o = () => null, c = (e, t) => {
      if (e) return e;
      let a = t.config.value, n = t.config.target.objectId, i = getComputedStyle(document.documentElement).getPropertyValue(n);
      return null != a.size ? {
        size: parseInt(i, 10)
      } : "%" === a.unit || "-" === a.unit ? {
        size: parseFloat(i)
      } : null != a.red && null != a.green && null != a.blue ? (0, l.normalizeColor)(i) : void 0;
    }, s = e => e.value, r = () => null, f = {
      color: {
        match: ({red: e, green: t, blue: a, alpha: n}) => [e, t, a, n].every(e => null != e),
        getValue: ({red: e, green: t, blue: a, alpha: n}) => `rgba(${e}, ${t}, ${a}, ${n})`
      },
      size: {
        match: ({size: e}) => null != e,
        getValue: ({size: e}, t) => "-" === t ? e : `${e}${t}`
      }
    }, u = (e, t, a) => {
      let {target: {objectId: n}, value: {unit: i}} = a.config, l = t.PLUGIN_VARIABLE, d = Object.values(f).find(e => e.match(l, i));
      d && document.documentElement.style.setProperty(n, d.getValue(l, i));
    }, p = (e, t) => {
      let a = t.config.target.objectId;
      document.documentElement.style.removeProperty(a);
    };
  },
  3690: function (e, t, a) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "pluginMethodMap", {
      enumerable: !0,
      get: function () {
        return r;
      }
    }));
    let n = a(7087), i = s(a(7377)), l = s(a(2866)), d = s(a(2570)), o = s(a(1407));
    function c(e) {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap(), a = new WeakMap();
      return (c = function (e) {
        return e ? a : t;
      })(e);
    }
    function s(e, t) {
      if (!t && e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var a = c(t);
      if (a && a.has(e)) return a.get(e);
      var n = {
        __proto__: null
      }, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var l in e) if ("default" !== l && Object.prototype.hasOwnProperty.call(e, l)) {
        var d = i ? Object.getOwnPropertyDescriptor(e, l) : null;
        d && (d.get || d.set) ? Object.defineProperty(n, l, d) : n[l] = e[l];
      }
      return (n.default = e, a && a.set(e, n), n);
    }
    let r = new Map([[n.ActionTypeConsts.PLUGIN_LOTTIE, {
      ...i
    }], [n.ActionTypeConsts.PLUGIN_SPLINE, {
      ...l
    }], [n.ActionTypeConsts.PLUGIN_RIVE, {
      ...d
    }], [n.ActionTypeConsts.PLUGIN_VARIABLE, {
      ...o
    }]]);
  },
  8023: function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = {
      IX2_ACTION_LIST_PLAYBACK_CHANGED: function () {
        return g;
      },
      IX2_ANIMATION_FRAME_CHANGED: function () {
        return E;
      },
      IX2_CLEAR_REQUESTED: function () {
        return f;
      },
      IX2_ELEMENT_STATE_CHANGED: function () {
        return m;
      },
      IX2_EVENT_LISTENER_ADDED: function () {
        return u;
      },
      IX2_EVENT_STATE_CHANGED: function () {
        return p;
      },
      IX2_INSTANCE_ADDED: function () {
        return T;
      },
      IX2_INSTANCE_REMOVED: function () {
        return b;
      },
      IX2_INSTANCE_STARTED: function () {
        return y;
      },
      IX2_MEDIA_QUERIES_DEFINED: function () {
        return L;
      },
      IX2_PARAMETER_CHANGED: function () {
        return I;
      },
      IX2_PLAYBACK_REQUESTED: function () {
        return s;
      },
      IX2_PREVIEW_REQUESTED: function () {
        return c;
      },
      IX2_RAW_DATA_IMPORTED: function () {
        return i;
      },
      IX2_SESSION_INITIALIZED: function () {
        return l;
      },
      IX2_SESSION_STARTED: function () {
        return d;
      },
      IX2_SESSION_STOPPED: function () {
        return o;
      },
      IX2_STOP_REQUESTED: function () {
        return r;
      },
      IX2_TEST_FRAME_RENDERED: function () {
        return v;
      },
      IX2_VIEWPORT_WIDTH_CHANGED: function () {
        return O;
      }
    };
    for (var n in a) Object.defineProperty(t, n, {
      enumerable: !0,
      get: a[n]
    });
    let i = "IX2_RAW_DATA_IMPORTED", l = "IX2_SESSION_INITIALIZED", d = "IX2_SESSION_STARTED", o = "IX2_SESSION_STOPPED", c = "IX2_PREVIEW_REQUESTED", s = "IX2_PLAYBACK_REQUESTED", r = "IX2_STOP_REQUESTED", f = "IX2_CLEAR_REQUESTED", u = "IX2_EVENT_LISTENER_ADDED", p = "IX2_EVENT_STATE_CHANGED", E = "IX2_ANIMATION_FRAME_CHANGED", I = "IX2_PARAMETER_CHANGED", T = "IX2_INSTANCE_ADDED", y = "IX2_INSTANCE_STARTED", b = "IX2_INSTANCE_REMOVED", m = "IX2_ELEMENT_STATE_CHANGED", g = "IX2_ACTION_LIST_PLAYBACK_CHANGED", O = "IX2_VIEWPORT_WIDTH_CHANGED", L = "IX2_MEDIA_QUERIES_DEFINED", v = "IX2_TEST_FRAME_RENDERED";
  },
  2686: function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = {
      ABSTRACT_NODE: function () {
        return et;
      },
      AUTO: function () {
        return X;
      },
      BACKGROUND: function () {
        return x;
      },
      BACKGROUND_COLOR: function () {
        return V;
      },
      BAR_DELIMITER: function () {
        return z;
      },
      BORDER_COLOR: function () {
        return w;
      },
      BOUNDARY_SELECTOR: function () {
        return c;
      },
      CHILDREN: function () {
        return j;
      },
      COLON_DELIMITER: function () {
        return Y;
      },
      COLOR: function () {
        return P;
      },
      COMMA_DELIMITER: function () {
        return H;
      },
      CONFIG_UNIT: function () {
        return T;
      },
      CONFIG_VALUE: function () {
        return u;
      },
      CONFIG_X_UNIT: function () {
        return p;
      },
      CONFIG_X_VALUE: function () {
        return s;
      },
      CONFIG_Y_UNIT: function () {
        return E;
      },
      CONFIG_Y_VALUE: function () {
        return r;
      },
      CONFIG_Z_UNIT: function () {
        return I;
      },
      CONFIG_Z_VALUE: function () {
        return f;
      },
      DISPLAY: function () {
        return D;
      },
      FILTER: function () {
        return U;
      },
      FLEX: function () {
        return Q;
      },
      FONT_VARIATION_SETTINGS: function () {
        return B;
      },
      HEIGHT: function () {
        return G;
      },
      HTML_ELEMENT: function () {
        return J;
      },
      IMMEDIATE_CHILDREN: function () {
        return K;
      },
      IX2_ID_DELIMITER: function () {
        return i;
      },
      OPACITY: function () {
        return k;
      },
      PARENT: function () {
        return q;
      },
      PLAIN_OBJECT: function () {
        return ee;
      },
      PRESERVE_3D: function () {
        return Z;
      },
      RENDER_GENERAL: function () {
        return en;
      },
      RENDER_PLUGIN: function () {
        return el;
      },
      RENDER_STYLE: function () {
        return ei;
      },
      RENDER_TRANSFORM: function () {
        return ea;
      },
      ROTATE_X: function () {
        return R;
      },
      ROTATE_Y: function () {
        return S;
      },
      ROTATE_Z: function () {
        return A;
      },
      SCALE_3D: function () {
        return N;
      },
      SCALE_X: function () {
        return L;
      },
      SCALE_Y: function () {
        return v;
      },
      SCALE_Z: function () {
        return _;
      },
      SIBLINGS: function () {
        return $;
      },
      SKEW: function () {
        return C;
      },
      SKEW_X: function () {
        return M;
      },
      SKEW_Y: function () {
        return h;
      },
      TRANSFORM: function () {
        return y;
      },
      TRANSLATE_3D: function () {
        return O;
      },
      TRANSLATE_X: function () {
        return b;
      },
      TRANSLATE_Y: function () {
        return m;
      },
      TRANSLATE_Z: function () {
        return g;
      },
      WF_PAGE: function () {
        return l;
      },
      WIDTH: function () {
        return F;
      },
      WILL_CHANGE: function () {
        return W;
      },
      W_MOD_IX: function () {
        return o;
      },
      W_MOD_JS: function () {
        return d;
      }
    };
    for (var n in a) Object.defineProperty(t, n, {
      enumerable: !0,
      get: a[n]
    });
    let i = "|", l = "data-wf-page", d = "w-mod-js", o = "w-mod-ix", c = ".w-dyn-item", s = "xValue", r = "yValue", f = "zValue", u = "value", p = "xUnit", E = "yUnit", I = "zUnit", T = "unit", y = "transform", b = "translateX", m = "translateY", g = "translateZ", O = "translate3d", L = "scaleX", v = "scaleY", _ = "scaleZ", N = "scale3d", R = "rotateX", S = "rotateY", A = "rotateZ", C = "skew", M = "skewX", h = "skewY", k = "opacity", U = "filter", B = "font-variation-settings", F = "width", G = "height", V = "backgroundColor", x = "background", w = "borderColor", P = "color", D = "display", Q = "flex", W = "willChange", X = "AUTO", H = ",", Y = ":", z = "|", j = "CHILDREN", K = "IMMEDIATE_CHILDREN", $ = "SIBLINGS", q = "PARENT", Z = "preserve-3d", J = "HTML_ELEMENT", ee = "PLAIN_OBJECT", et = "ABSTRACT_NODE", ea = "RENDER_TRANSFORM", en = "RENDER_GENERAL", ei = "RENDER_STYLE", el = "RENDER_PLUGIN";
  },
  262: function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = {
      ActionAppliesTo: function () {
        return l;
      },
      ActionTypeConsts: function () {
        return i;
      }
    };
    for (var n in a) Object.defineProperty(t, n, {
      enumerable: !0,
      get: a[n]
    });
    let i = {
      TRANSFORM_MOVE: "TRANSFORM_MOVE",
      TRANSFORM_SCALE: "TRANSFORM_SCALE",
      TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
      TRANSFORM_SKEW: "TRANSFORM_SKEW",
      STYLE_OPACITY: "STYLE_OPACITY",
      STYLE_SIZE: "STYLE_SIZE",
      STYLE_FILTER: "STYLE_FILTER",
      STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
      STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
      STYLE_BORDER: "STYLE_BORDER",
      STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
      OBJECT_VALUE: "OBJECT_VALUE",
      PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
      PLUGIN_SPLINE: "PLUGIN_SPLINE",
      PLUGIN_RIVE: "PLUGIN_RIVE",
      PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
      GENERAL_DISPLAY: "GENERAL_DISPLAY",
      GENERAL_START_ACTION: "GENERAL_START_ACTION",
      GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
      GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
      GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
      GENERAL_LOOP: "GENERAL_LOOP",
      STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW"
    }, l = {
      ELEMENT: "ELEMENT",
      ELEMENT_CLASS: "ELEMENT_CLASS",
      TRIGGER_ELEMENT: "TRIGGER_ELEMENT"
    };
  },
  7087: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
      ActionTypeConsts: function () {
        return d.ActionTypeConsts;
      },
      IX2EngineActionTypes: function () {
        return o;
      },
      IX2EngineConstants: function () {
        return c;
      },
      QuickEffectIds: function () {
        return l.QuickEffectIds;
      }
    };
    for (var i in n) Object.defineProperty(t, i, {
      enumerable: !0,
      get: n[i]
    });
    let l = s(a(1833), t), d = s(a(262), t);
    (s(a(8704), t), s(a(3213), t));
    let o = f(a(8023)), c = f(a(2686));
    function s(e, t) {
      return (Object.keys(e).forEach(function (a) {
        "default" === a || Object.prototype.hasOwnProperty.call(t, a) || Object.defineProperty(t, a, {
          enumerable: !0,
          get: function () {
            return e[a];
          }
        });
      }), e);
    }
    function r(e) {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap(), a = new WeakMap();
      return (r = function (e) {
        return e ? a : t;
      })(e);
    }
    function f(e, t) {
      if (!t && e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var a = r(t);
      if (a && a.has(e)) return a.get(e);
      var n = {
        __proto__: null
      }, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var l in e) if ("default" !== l && Object.prototype.hasOwnProperty.call(e, l)) {
        var d = i ? Object.getOwnPropertyDescriptor(e, l) : null;
        d && (d.get || d.set) ? Object.defineProperty(n, l, d) : n[l] = e[l];
      }
      return (n.default = e, a && a.set(e, n), n);
    }
  },
  3213: function (e, t, a) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "ReducedMotionTypes", {
      enumerable: !0,
      get: function () {
        return r;
      }
    }));
    let {TRANSFORM_MOVE: n, TRANSFORM_SCALE: i, TRANSFORM_ROTATE: l, TRANSFORM_SKEW: d, STYLE_SIZE: o, STYLE_FILTER: c, STYLE_FONT_VARIATION: s} = a(262).ActionTypeConsts, r = {
      [n]: !0,
      [i]: !0,
      [l]: !0,
      [d]: !0,
      [o]: !0,
      [c]: !0,
      [s]: !0
    };
  },
  1833: function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = {
      EventAppliesTo: function () {
        return l;
      },
      EventBasedOn: function () {
        return d;
      },
      EventContinuousMouseAxes: function () {
        return o;
      },
      EventLimitAffectedElements: function () {
        return c;
      },
      EventTypeConsts: function () {
        return i;
      },
      QuickEffectDirectionConsts: function () {
        return r;
      },
      QuickEffectIds: function () {
        return s;
      }
    };
    for (var n in a) Object.defineProperty(t, n, {
      enumerable: !0,
      get: a[n]
    });
    let i = {
      NAVBAR_OPEN: "NAVBAR_OPEN",
      NAVBAR_CLOSE: "NAVBAR_CLOSE",
      TAB_ACTIVE: "TAB_ACTIVE",
      TAB_INACTIVE: "TAB_INACTIVE",
      SLIDER_ACTIVE: "SLIDER_ACTIVE",
      SLIDER_INACTIVE: "SLIDER_INACTIVE",
      DROPDOWN_OPEN: "DROPDOWN_OPEN",
      DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
      MOUSE_CLICK: "MOUSE_CLICK",
      MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
      MOUSE_DOWN: "MOUSE_DOWN",
      MOUSE_UP: "MOUSE_UP",
      MOUSE_OVER: "MOUSE_OVER",
      MOUSE_OUT: "MOUSE_OUT",
      MOUSE_MOVE: "MOUSE_MOVE",
      MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
      SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
      SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
      SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
      ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
      ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
      PAGE_START: "PAGE_START",
      PAGE_FINISH: "PAGE_FINISH",
      PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
      PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
      PAGE_SCROLL: "PAGE_SCROLL"
    }, l = {
      ELEMENT: "ELEMENT",
      CLASS: "CLASS",
      PAGE: "PAGE"
    }, d = {
      ELEMENT: "ELEMENT",
      VIEWPORT: "VIEWPORT"
    }, o = {
      X_AXIS: "X_AXIS",
      Y_AXIS: "Y_AXIS"
    }, c = {
      CHILDREN: "CHILDREN",
      SIBLINGS: "SIBLINGS",
      IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN"
    }, s = {
      FADE_EFFECT: "FADE_EFFECT",
      SLIDE_EFFECT: "SLIDE_EFFECT",
      GROW_EFFECT: "GROW_EFFECT",
      SHRINK_EFFECT: "SHRINK_EFFECT",
      SPIN_EFFECT: "SPIN_EFFECT",
      FLY_EFFECT: "FLY_EFFECT",
      POP_EFFECT: "POP_EFFECT",
      FLIP_EFFECT: "FLIP_EFFECT",
      JIGGLE_EFFECT: "JIGGLE_EFFECT",
      PULSE_EFFECT: "PULSE_EFFECT",
      DROP_EFFECT: "DROP_EFFECT",
      BLINK_EFFECT: "BLINK_EFFECT",
      BOUNCE_EFFECT: "BOUNCE_EFFECT",
      FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
      FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
      RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
      JELLO_EFFECT: "JELLO_EFFECT",
      GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
      SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
      PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT"
    }, r = {
      LEFT: "LEFT",
      RIGHT: "RIGHT",
      BOTTOM: "BOTTOM",
      TOP: "TOP",
      BOTTOM_LEFT: "BOTTOM_LEFT",
      BOTTOM_RIGHT: "BOTTOM_RIGHT",
      TOP_RIGHT: "TOP_RIGHT",
      TOP_LEFT: "TOP_LEFT",
      CLOCKWISE: "CLOCKWISE",
      COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE"
    };
  },
  8704: function (e, t) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "InteractionTypeConsts", {
      enumerable: !0,
      get: function () {
        return a;
      }
    }));
    let a = {
      MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
      MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
      MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
      SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
      SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
      MOUSE_MOVE_IN_VIEWPORT_INTERACTION: "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
      PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
      PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
      PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
      NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
      DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
      ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
      TAB_INTERACTION: "TAB_INTERACTION",
      SLIDER_INTERACTION: "SLIDER_INTERACTION"
    };
  },
  380: function (e, t) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "normalizeColor", {
      enumerable: !0,
      get: function () {
        return n;
      }
    }));
    let a = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      grey: "#808080",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32"
    };
    function n(e) {
      let t, n, i, l = 1, d = e.replace(/\s/g, "").toLowerCase(), o = ("string" == typeof a[d] ? a[d].toLowerCase() : null) || d;
      if (o.startsWith("#")) {
        let e = o.substring(1);
        3 === e.length || 4 === e.length ? (t = parseInt(e[0] + e[0], 16), n = parseInt(e[1] + e[1], 16), i = parseInt(e[2] + e[2], 16), 4 === e.length && (l = parseInt(e[3] + e[3], 16) / 255)) : (6 === e.length || 8 === e.length) && (t = parseInt(e.substring(0, 2), 16), n = parseInt(e.substring(2, 4), 16), i = parseInt(e.substring(4, 6), 16), 8 === e.length && (l = parseInt(e.substring(6, 8), 16) / 255));
      } else if (o.startsWith("rgba")) {
        let e = o.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(e[0], 10), n = parseInt(e[1], 10), i = parseInt(e[2], 10), l = parseFloat(e[3]));
      } else if (o.startsWith("rgb")) {
        let e = o.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(e[0], 10), n = parseInt(e[1], 10), i = parseInt(e[2], 10));
      } else if (o.startsWith("hsla")) {
        let e, a, d, c = o.match(/hsla\(([^)]+)\)/)[1].split(","), s = parseFloat(c[0]), r = parseFloat(c[1].replace("%", "")) / 100, f = parseFloat(c[2].replace("%", "")) / 100;
        l = parseFloat(c[3]);
        let u = (1 - Math.abs(2 * f - 1)) * r, p = u * (1 - Math.abs(s / 60 % 2 - 1)), E = f - u / 2;
        (s >= 0 && s < 60 ? (e = u, a = p, d = 0) : s >= 60 && s < 120 ? (e = p, a = u, d = 0) : s >= 120 && s < 180 ? (e = 0, a = u, d = p) : s >= 180 && s < 240 ? (e = 0, a = p, d = u) : s >= 240 && s < 300 ? (e = p, a = 0, d = u) : (e = u, a = 0, d = p), t = Math.round((e + E) * 255), n = Math.round((a + E) * 255), i = Math.round((d + E) * 255));
      } else if (o.startsWith("hsl")) {
        let e, a, l, d = o.match(/hsl\(([^)]+)\)/)[1].split(","), c = parseFloat(d[0]), s = parseFloat(d[1].replace("%", "")) / 100, r = parseFloat(d[2].replace("%", "")) / 100, f = (1 - Math.abs(2 * r - 1)) * s, u = f * (1 - Math.abs(c / 60 % 2 - 1)), p = r - f / 2;
        (c >= 0 && c < 60 ? (e = f, a = u, l = 0) : c >= 60 && c < 120 ? (e = u, a = f, l = 0) : c >= 120 && c < 180 ? (e = 0, a = f, l = u) : c >= 180 && c < 240 ? (e = 0, a = u, l = f) : c >= 240 && c < 300 ? (e = u, a = 0, l = f) : (e = f, a = 0, l = u), t = Math.round((e + p) * 255), n = Math.round((a + p) * 255), i = Math.round((l + p) * 255));
      }
      if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(i)) throw Error(`Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`);
      return {
        red: t,
        green: n,
        blue: i,
        alpha: l
      };
    }
  },
  9468: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
      IX2BrowserSupport: function () {
        return l;
      },
      IX2EasingUtils: function () {
        return o;
      },
      IX2Easings: function () {
        return d;
      },
      IX2ElementsReducer: function () {
        return c;
      },
      IX2VanillaPlugins: function () {
        return s;
      },
      IX2VanillaUtils: function () {
        return r;
      }
    };
    for (var i in n) Object.defineProperty(t, i, {
      enumerable: !0,
      get: n[i]
    });
    let l = u(a(2662)), d = u(a(8686)), o = u(a(3767)), c = u(a(5861)), s = u(a(1799)), r = u(a(4124));
    function f(e) {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap(), a = new WeakMap();
      return (f = function (e) {
        return e ? a : t;
      })(e);
    }
    function u(e, t) {
      if (!t && e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var a = f(t);
      if (a && a.has(e)) return a.get(e);
      var n = {
        __proto__: null
      }, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var l in e) if ("default" !== l && Object.prototype.hasOwnProperty.call(e, l)) {
        var d = i ? Object.getOwnPropertyDescriptor(e, l) : null;
        d && (d.get || d.set) ? Object.defineProperty(n, l, d) : n[l] = e[l];
      }
      return (n.default = e, a && a.set(e, n), n);
    }
  },
  2662: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n, i = {
      ELEMENT_MATCHES: function () {
        return s;
      },
      FLEX_PREFIXED: function () {
        return r;
      },
      IS_BROWSER_ENV: function () {
        return o;
      },
      TRANSFORM_PREFIXED: function () {
        return f;
      },
      TRANSFORM_STYLE_PREFIXED: function () {
        return p;
      },
      withBrowser: function () {
        return c;
      }
    };
    for (var l in i) Object.defineProperty(t, l, {
      enumerable: !0,
      get: i[l]
    });
    let d = (n = a(9777)) && n.__esModule ? n : {
      default: n
    }, o = "undefined" != typeof window, c = (e, t) => o ? e() : t, s = c(() => (0, d.default)(["matches", "matchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector", "webkitMatchesSelector"], e => (e in Element.prototype))), r = c(() => {
      let e = document.createElement("i"), t = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"];
      try {
        let {length: a} = t;
        for (let n = 0; n < a; n++) {
          let a = t[n];
          if ((e.style.display = a, e.style.display === a)) return a;
        }
        return "";
      } catch (e) {
        return "";
      }
    }, "flex"), f = c(() => {
      let e = document.createElement("i");
      if (null == e.style.transform) {
        let t = ["Webkit", "Moz", "ms"], {length: a} = t;
        for (let n = 0; n < a; n++) {
          let a = t[n] + "Transform";
          if (void 0 !== e.style[a]) return a;
        }
      }
      return "transform";
    }, "transform"), u = f.split("transform")[0], p = u ? u + "TransformStyle" : "transformStyle";
  },
  3767: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n, i = {
      applyEasing: function () {
        return f;
      },
      createBezierEasing: function () {
        return r;
      },
      optimizeFloat: function () {
        return s;
      }
    };
    for (var l in i) Object.defineProperty(t, l, {
      enumerable: !0,
      get: i[l]
    });
    let d = (function (e, t) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var a = c(t);
      if (a && a.has(e)) return a.get(e);
      var n = {
        __proto__: null
      }, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var l in e) if ("default" !== l && Object.prototype.hasOwnProperty.call(e, l)) {
        var d = i ? Object.getOwnPropertyDescriptor(e, l) : null;
        d && (d.get || d.set) ? Object.defineProperty(n, l, d) : n[l] = e[l];
      }
      return (n.default = e, a && a.set(e, n), n);
    })(a(8686)), o = (n = a(1361)) && n.__esModule ? n : {
      default: n
    };
    function c(e) {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap(), a = new WeakMap();
      return (c = function (e) {
        return e ? a : t;
      })(e);
    }
    function s(e, t = 5, a = 10) {
      let n = Math.pow(a, t), i = Number(Math.round(e * n) / n);
      return Math.abs(i) > 0.0001 ? i : 0;
    }
    function r(e) {
      return (0, o.default)(...e);
    }
    function f(e, t, a) {
      return 0 === t ? 0 : 1 === t ? 1 : a ? s(t > 0 ? a(t) : t) : s(t > 0 && e && d[e] ? d[e](t) : t);
    }
  },
  8686: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n, i = {
      bounce: function () {
        return Q;
      },
      bouncePast: function () {
        return W;
      },
      ease: function () {
        return o;
      },
      easeIn: function () {
        return c;
      },
      easeInOut: function () {
        return r;
      },
      easeOut: function () {
        return s;
      },
      inBack: function () {
        return U;
      },
      inCirc: function () {
        return C;
      },
      inCubic: function () {
        return E;
      },
      inElastic: function () {
        return G;
      },
      inExpo: function () {
        return R;
      },
      inOutBack: function () {
        return F;
      },
      inOutCirc: function () {
        return h;
      },
      inOutCubic: function () {
        return T;
      },
      inOutElastic: function () {
        return x;
      },
      inOutExpo: function () {
        return A;
      },
      inOutQuad: function () {
        return p;
      },
      inOutQuart: function () {
        return m;
      },
      inOutQuint: function () {
        return L;
      },
      inOutSine: function () {
        return N;
      },
      inQuad: function () {
        return f;
      },
      inQuart: function () {
        return y;
      },
      inQuint: function () {
        return g;
      },
      inSine: function () {
        return v;
      },
      outBack: function () {
        return B;
      },
      outBounce: function () {
        return k;
      },
      outCirc: function () {
        return M;
      },
      outCubic: function () {
        return I;
      },
      outElastic: function () {
        return V;
      },
      outExpo: function () {
        return S;
      },
      outQuad: function () {
        return u;
      },
      outQuart: function () {
        return b;
      },
      outQuint: function () {
        return O;
      },
      outSine: function () {
        return _;
      },
      swingFrom: function () {
        return P;
      },
      swingFromTo: function () {
        return w;
      },
      swingTo: function () {
        return D;
      }
    };
    for (var l in i) Object.defineProperty(t, l, {
      enumerable: !0,
      get: i[l]
    });
    let d = (n = a(1361)) && n.__esModule ? n : {
      default: n
    }, o = (0, d.default)(0.25, 0.1, 0.25, 1), c = (0, d.default)(0.42, 0, 1, 1), s = (0, d.default)(0, 0, 0.58, 1), r = (0, d.default)(0.42, 0, 0.58, 1);
    function f(e) {
      return Math.pow(e, 2);
    }
    function u(e) {
      return -(Math.pow(e - 1, 2) - 1);
    }
    function p(e) {
      return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
    }
    function E(e) {
      return Math.pow(e, 3);
    }
    function I(e) {
      return Math.pow(e - 1, 3) + 1;
    }
    function T(e) {
      return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 3) : 0.5 * (Math.pow(e - 2, 3) + 2);
    }
    function y(e) {
      return Math.pow(e, 4);
    }
    function b(e) {
      return -(Math.pow(e - 1, 4) - 1);
    }
    function m(e) {
      return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 4) : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
    }
    function g(e) {
      return Math.pow(e, 5);
    }
    function O(e) {
      return Math.pow(e - 1, 5) + 1;
    }
    function L(e) {
      return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 5) : 0.5 * (Math.pow(e - 2, 5) + 2);
    }
    function v(e) {
      return -Math.cos(Math.PI / 2 * e) + 1;
    }
    function _(e) {
      return Math.sin(Math.PI / 2 * e);
    }
    function N(e) {
      return -0.5 * (Math.cos(Math.PI * e) - 1);
    }
    function R(e) {
      return 0 === e ? 0 : Math.pow(2, 10 * (e - 1));
    }
    function S(e) {
      return 1 === e ? 1 : -Math.pow(2, -10 * e) + 1;
    }
    function A(e) {
      return 0 === e ? 0 : 1 === e ? 1 : (e /= 0.5) < 1 ? 0.5 * Math.pow(2, 10 * (e - 1)) : 0.5 * (-Math.pow(2, -10 * --e) + 2);
    }
    function C(e) {
      return -(Math.sqrt(1 - e * e) - 1);
    }
    function M(e) {
      return Math.sqrt(1 - Math.pow(e - 1, 2));
    }
    function h(e) {
      return (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
    function k(e) {
      return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function U(e) {
      return e * e * (2.70158 * e - 1.70158);
    }
    function B(e) {
      return (e -= 1) * e * (2.70158 * e + 1.70158) + 1;
    }
    function F(e) {
      let t = 1.70158;
      return (e /= 0.5) < 1 ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t)) : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function G(e) {
      let t = 1.70158, a = 0, n = 1;
      return 0 === e ? 0 : 1 === e ? 1 : (a || (a = 0.3), n < 1 ? (n = 1, t = a / 4) : t = a / (2 * Math.PI) * Math.asin(1 / n), -(n * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * Math.PI * (e - t) / a)));
    }
    function V(e) {
      let t = 1.70158, a = 0, n = 1;
      return 0 === e ? 0 : 1 === e ? 1 : (a || (a = 0.3), n < 1 ? (n = 1, t = a / 4) : t = a / (2 * Math.PI) * Math.asin(1 / n), n * Math.pow(2, -10 * e) * Math.sin(2 * Math.PI * (e - t) / a) + 1);
    }
    function x(e) {
      let t = 1.70158, a = 0, n = 1;
      return 0 === e ? 0 : 2 == (e /= 0.5) ? 1 : (a || (a = 0.3 * 1.5), n < 1 ? (n = 1, t = a / 4) : t = a / (2 * Math.PI) * Math.asin(1 / n), e < 1) ? -0.5 * (n * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * Math.PI * (e - t) / a)) : n * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * Math.PI * (e - t) / a) * 0.5 + 1;
    }
    function w(e) {
      let t = 1.70158;
      return (e /= 0.5) < 1 ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t)) : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function P(e) {
      return e * e * (2.70158 * e - 1.70158);
    }
    function D(e) {
      return (e -= 1) * e * (2.70158 * e + 1.70158) + 1;
    }
    function Q(e) {
      return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function W(e) {
      return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) : e < 2.5 / 2.75 ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
    }
  },
  1799: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
      clearPlugin: function () {
        return I;
      },
      createPluginInstance: function () {
        return p;
      },
      getPluginConfig: function () {
        return s;
      },
      getPluginDestination: function () {
        return u;
      },
      getPluginDuration: function () {
        return f;
      },
      getPluginOrigin: function () {
        return r;
      },
      isPluginType: function () {
        return o;
      },
      renderPlugin: function () {
        return E;
      }
    };
    for (var i in n) Object.defineProperty(t, i, {
      enumerable: !0,
      get: n[i]
    });
    let l = a(2662), d = a(3690);
    function o(e) {
      return d.pluginMethodMap.has(e);
    }
    let c = e => t => {
      if (!l.IS_BROWSER_ENV) return () => null;
      let a = d.pluginMethodMap.get(t);
      if (!a) throw Error(`IX2 no plugin configured for: ${t}`);
      let n = a[e];
      if (!n) throw Error(`IX2 invalid plugin method: ${e}`);
      return n;
    }, s = c("getPluginConfig"), r = c("getPluginOrigin"), f = c("getPluginDuration"), u = c("getPluginDestination"), p = c("createPluginInstance"), E = c("renderPlugin"), I = c("clearPlugin");
  },
  4124: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
      cleanupHTMLElement: function () {
        return eH;
      },
      clearAllStyles: function () {
        return eQ;
      },
      clearObjectCache: function () {
        return ef;
      },
      getActionListProgress: function () {
        return eK;
      },
      getAffectedElements: function () {
        return eg;
      },
      getComputedStyle: function () {
        return eO;
      },
      getDestinationValues: function () {
        return eC;
      },
      getElementId: function () {
        return eI;
      },
      getInstanceId: function () {
        return ep;
      },
      getInstanceOrigin: function () {
        return eN;
      },
      getItemConfigByKey: function () {
        return eA;
      },
      getMaxDurationItemIndex: function () {
        return ej;
      },
      getNamespacedParameterId: function () {
        return eZ;
      },
      getRenderType: function () {
        return eM;
      },
      getStyleProp: function () {
        return eh;
      },
      mediaQueriesEqual: function () {
        return e1;
      },
      observeStore: function () {
        return eb;
      },
      reduceListToGroup: function () {
        return e$;
      },
      reifyState: function () {
        return eT;
      },
      renderHTMLElement: function () {
        return ek;
      },
      shallowEqual: function () {
        return r.default;
      },
      shouldAllowMediaQuery: function () {
        return eJ;
      },
      shouldNamespaceEventParameter: function () {
        return eq;
      },
      stringifyTarget: function () {
        return e0;
      }
    };
    for (var i in n) Object.defineProperty(t, i, {
      enumerable: !0,
      get: n[i]
    });
    let l = I(a(4075)), d = I(a(1455)), o = I(a(5720)), c = a(1185), s = a(7087), r = I(a(7164)), f = a(3767), u = a(380), p = a(1799), E = a(2662);
    function I(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }
    let {BACKGROUND: T, TRANSFORM: y, TRANSLATE_3D: b, SCALE_3D: m, ROTATE_X: g, ROTATE_Y: O, ROTATE_Z: L, SKEW: v, PRESERVE_3D: _, FLEX: N, OPACITY: R, FILTER: S, FONT_VARIATION_SETTINGS: A, WIDTH: C, HEIGHT: M, BACKGROUND_COLOR: h, BORDER_COLOR: k, COLOR: U, CHILDREN: B, IMMEDIATE_CHILDREN: F, SIBLINGS: G, PARENT: V, DISPLAY: x, WILL_CHANGE: w, AUTO: P, COMMA_DELIMITER: D, COLON_DELIMITER: Q, BAR_DELIMITER: W, RENDER_TRANSFORM: X, RENDER_GENERAL: H, RENDER_STYLE: Y, RENDER_PLUGIN: z} = s.IX2EngineConstants, {TRANSFORM_MOVE: j, TRANSFORM_SCALE: K, TRANSFORM_ROTATE: $, TRANSFORM_SKEW: q, STYLE_OPACITY: Z, STYLE_FILTER: J, STYLE_FONT_VARIATION: ee, STYLE_SIZE: et, STYLE_BACKGROUND_COLOR: ea, STYLE_BORDER: en, STYLE_TEXT_COLOR: ei, GENERAL_DISPLAY: el, OBJECT_VALUE: ed} = s.ActionTypeConsts, eo = e => e.trim(), ec = Object.freeze({
      [ea]: h,
      [en]: k,
      [ei]: U
    }), es = Object.freeze({
      [E.TRANSFORM_PREFIXED]: y,
      [h]: T,
      [R]: R,
      [S]: S,
      [C]: C,
      [M]: M,
      [A]: A
    }), er = new Map();
    function ef() {
      er.clear();
    }
    let eu = 1;
    function ep() {
      return "i" + eu++;
    }
    let eE = 1;
    function eI(e, t) {
      for (let a in e) {
        let n = e[a];
        if (n && n.ref === t) return n.id;
      }
      return "e" + eE++;
    }
    function eT({events: e, actionLists: t, site: a} = {}) {
      let n = (0, d.default)(e, (e, t) => {
        let {eventTypeId: a} = t;
        return (e[a] || (e[a] = {}), e[a][t.id] = t, e);
      }, {}), i = a && a.mediaQueries, l = [];
      return (i ? l = i.map(e => e.key) : (i = [], console.warn("IX2 missing mediaQueries in site data")), {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: n,
          mediaQueries: i,
          mediaQueryKeys: l
        }
      });
    }
    let ey = (e, t) => e === t;
    function eb({store: e, select: t, onChange: a, comparator: n = ey}) {
      let {getState: i, subscribe: l} = e, d = l(function () {
        let l = t(i());
        if (null == l) return void d();
        n(l, o) || a(o = l, e);
      }), o = t(i());
      return d;
    }
    function em(e) {
      let t = typeof e;
      if ("string" === t) return {
        id: e
      };
      if (null != e && "object" === t) {
        let {id: t, objectId: a, selector: n, selectorGuids: i, appliesTo: l, useEventTarget: d} = e;
        return {
          id: t,
          objectId: a,
          selector: n,
          selectorGuids: i,
          appliesTo: l,
          useEventTarget: d
        };
      }
      return {};
    }
    function eg({config: e, event: t, eventTarget: a, elementRoot: n, elementApi: i}) {
      let l, d, o;
      if (!i) throw Error("IX2 missing elementApi");
      let {targets: c} = e;
      if (Array.isArray(c) && c.length > 0) return c.reduce((e, l) => e.concat(eg({
        config: {
          target: l
        },
        event: t,
        eventTarget: a,
        elementRoot: n,
        elementApi: i
      })), []);
      let {getValidDocument: r, getQuerySelector: f, queryDocument: u, getChildElements: p, getSiblingElements: I, matchSelector: T, elementContains: y, isSiblingNode: b} = i, {target: m} = e;
      if (!m) return [];
      let {id: g, objectId: O, selector: L, selectorGuids: v, appliesTo: _, useEventTarget: N} = em(m);
      if (O) return [er.has(O) ? er.get(O) : er.set(O, {}).get(O)];
      if (_ === s.EventAppliesTo.PAGE) {
        let e = r(g);
        return e ? [e] : [];
      }
      let R = (t?.action?.config?.affectedElements ?? ({}))[g || L] || ({}), S = !!(R.id || R.selector), A = t && f(em(t.target));
      if ((S ? (l = R.limitAffectedElements, d = A, o = f(R)) : d = o = f({
        id: g,
        selector: L,
        selectorGuids: v
      }), t && N)) {
        let e = a && (o || !0 === N) ? [a] : u(A);
        if (o) {
          if (N === V) return u(o).filter(t => e.some(e => y(t, e)));
          if (N === B) return u(o).filter(t => e.some(e => y(e, t)));
          if (N === G) return u(o).filter(t => e.some(e => b(e, t)));
        }
        return e;
      }
      return null == d || null == o ? [] : E.IS_BROWSER_ENV && n ? u(o).filter(e => n.contains(e)) : l === B ? u(d, o) : l === F ? p(u(d)).filter(T(o)) : l === G ? I(u(d)).filter(T(o)) : u(o);
    }
    function eO({element: e, actionItem: t}) {
      if (!E.IS_BROWSER_ENV) return {};
      let {actionTypeId: a} = t;
      switch (a) {
        case et:
        case ea:
        case en:
        case ei:
        case el:
          return window.getComputedStyle(e);
        default:
          return {};
      }
    }
    let eL = /px/, ev = (e, t) => t.reduce((e, t) => (null == e[t.type] && (e[t.type] = eB[t.type]), e), e || ({})), e_ = (e, t) => t.reduce((e, t) => (null == e[t.type] && (e[t.type] = eF[t.type] || t.defaultValue || 0), e), e || ({}));
    function eN(e, t = {}, a = {}, n, i) {
      let {getStyle: d} = i, {actionTypeId: o} = n;
      if ((0, p.isPluginType)(o)) return (0, p.getPluginOrigin)(o)(t[o], n);
      switch (n.actionTypeId) {
        case j:
        case K:
        case $:
        case q:
          return t[n.actionTypeId] || eU[n.actionTypeId];
        case J:
          return ev(t[n.actionTypeId], n.config.filters);
        case ee:
          return e_(t[n.actionTypeId], n.config.fontVariations);
        case Z:
          return {
            value: (0, l.default)(parseFloat(d(e, R)), 1)
          };
        case et:
          {
            let t, i = d(e, C), o = d(e, M);
            return {
              widthValue: n.config.widthUnit === P ? eL.test(i) ? parseFloat(i) : parseFloat(a.width) : (0, l.default)(parseFloat(i), parseFloat(a.width)),
              heightValue: n.config.heightUnit === P ? eL.test(o) ? parseFloat(o) : parseFloat(a.height) : (0, l.default)(parseFloat(o), parseFloat(a.height))
            };
          }
        case ea:
        case en:
        case ei:
          return (function ({element: e, actionTypeId: t, computedStyle: a, getStyle: n}) {
            let i = ec[t], d = n(e, i), o = (function (e, t) {
              let a = e.exec(t);
              return a ? a[1] : "";
            })(ew, ex.test(d) ? d : a[i]).split(D);
            return {
              rValue: (0, l.default)(parseInt(o[0], 10), 255),
              gValue: (0, l.default)(parseInt(o[1], 10), 255),
              bValue: (0, l.default)(parseInt(o[2], 10), 255),
              aValue: (0, l.default)(parseFloat(o[3]), 1)
            };
          })({
            element: e,
            actionTypeId: n.actionTypeId,
            computedStyle: a,
            getStyle: d
          });
        case el:
          return {
            value: (0, l.default)(d(e, x), a.display)
          };
        case ed:
          return t[n.actionTypeId] || ({
            value: 0
          });
        default:
          return;
      }
    }
    let eR = (e, t) => (t && (e[t.type] = t.value || 0), e), eS = (e, t) => (t && (e[t.type] = t.value || 0), e), eA = (e, t, a) => {
      if ((0, p.isPluginType)(e)) return (0, p.getPluginConfig)(e)(a, t);
      switch (e) {
        case J:
          {
            let e = (0, o.default)(a.filters, ({type: e}) => e === t);
            return e ? e.value : 0;
          }
        case ee:
          {
            let e = (0, o.default)(a.fontVariations, ({type: e}) => e === t);
            return e ? e.value : 0;
          }
        default:
          return a[t];
      }
    };
    function eC({element: e, actionItem: t, elementApi: a}) {
      if ((0, p.isPluginType)(t.actionTypeId)) return (0, p.getPluginDestination)(t.actionTypeId)(t.config);
      switch (t.actionTypeId) {
        case j:
        case K:
        case $:
        case q:
          {
            let {xValue: e, yValue: a, zValue: n} = t.config;
            return {
              xValue: e,
              yValue: a,
              zValue: n
            };
          }
        case et:
          {
            let {getStyle: n, setStyle: i, getProperty: l} = a, {widthUnit: d, heightUnit: o} = t.config, {widthValue: c, heightValue: s} = t.config;
            if (!E.IS_BROWSER_ENV) return {
              widthValue: c,
              heightValue: s
            };
            if (d === P) {
              let t = n(e, C);
              (i(e, C, ""), c = l(e, "offsetWidth"), i(e, C, t));
            }
            if (o === P) {
              let t = n(e, M);
              (i(e, M, ""), s = l(e, "offsetHeight"), i(e, M, t));
            }
            return {
              widthValue: c,
              heightValue: s
            };
          }
        case ea:
        case en:
        case ei:
          {
            let {rValue: n, gValue: i, bValue: l, aValue: d, globalSwatchId: o} = t.config;
            if (o && o.startsWith("--")) {
              let {getStyle: t} = a, n = t(e, o), i = (0, u.normalizeColor)(n);
              return {
                rValue: i.red,
                gValue: i.green,
                bValue: i.blue,
                aValue: i.alpha
              };
            }
            return {
              rValue: n,
              gValue: i,
              bValue: l,
              aValue: d
            };
          }
        case J:
          return t.config.filters.reduce(eR, {});
        case ee:
          return t.config.fontVariations.reduce(eS, {});
        default:
          {
            let {value: e} = t.config;
            return {
              value: e
            };
          }
      }
    }
    function eM(e) {
      return (/^TRANSFORM_/).test(e) ? X : (/^STYLE_/).test(e) ? Y : (/^GENERAL_/).test(e) ? H : (/^PLUGIN_/).test(e) ? z : void 0;
    }
    function eh(e, t) {
      return e === Y ? t.replace("STYLE_", "").toLowerCase() : null;
    }
    function ek(e, t, a, n, i, l, o, c, s) {
      switch (c) {
        case X:
          var r = e, f = t, u = a, I = i, T = o;
          let y = eV.map(e => {
            let t = eU[e], {xValue: a = t.xValue, yValue: n = t.yValue, zValue: i = t.zValue, xUnit: l = "", yUnit: d = "", zUnit: o = ""} = f[e] || ({});
            switch (e) {
              case j:
                return `${b}(${a}${l}, ${n}${d}, ${i}${o})`;
              case K:
                return `${m}(${a}${l}, ${n}${d}, ${i}${o})`;
              case $:
                return `${g}(${a}${l}) ${O}(${n}${d}) ${L}(${i}${o})`;
              case q:
                return `${v}(${a}${l}, ${n}${d})`;
              default:
                return "";
            }
          }).join(" "), {setStyle: R} = T;
          (eP(r, E.TRANSFORM_PREFIXED, T), R(r, E.TRANSFORM_PREFIXED, y), (function ({actionTypeId: e}, {xValue: t, yValue: a, zValue: n}) {
            return e === j && void 0 !== n || e === K && void 0 !== n || e === $ && (void 0 !== t || void 0 !== a);
          })(I, u) && R(r, E.TRANSFORM_STYLE_PREFIXED, _));
          return;
        case Y:
          return (function (e, t, a, n, i, l) {
            let {setStyle: o} = l;
            switch (n.actionTypeId) {
              case et:
                {
                  let {widthUnit: t = "", heightUnit: i = ""} = n.config, {widthValue: d, heightValue: c} = a;
                  (void 0 !== d && (t === P && (t = "px"), eP(e, C, l), o(e, C, d + t)), void 0 !== c && (i === P && (i = "px"), eP(e, M, l), o(e, M, c + i)));
                  break;
                }
              case J:
                var c = n.config;
                let s = (0, d.default)(a, (e, t, a) => `${e} ${a}(${t}${eG(a, c)})`, ""), {setStyle: r} = l;
                (eP(e, S, l), r(e, S, s));
                break;
              case ee:
                n.config;
                let f = (0, d.default)(a, (e, t, a) => (e.push(`"${a}" ${t}`), e), []).join(", "), {setStyle: u} = l;
                (eP(e, A, l), u(e, A, f));
                break;
              case ea:
              case en:
              case ei:
                {
                  let t = ec[n.actionTypeId], i = Math.round(a.rValue), d = Math.round(a.gValue), c = Math.round(a.bValue), s = a.aValue;
                  (eP(e, t, l), o(e, t, s >= 1 ? `rgb(${i},${d},${c})` : `rgba(${i},${d},${c},${s})`));
                  break;
                }
              default:
                {
                  let {unit: t = ""} = n.config;
                  (eP(e, i, l), o(e, i, a.value + t));
                }
            }
          })(e, 0, a, i, l, o);
        case H:
          var h = e, k = i, U = o;
          let {setStyle: B} = U;
          if (k.actionTypeId === el) {
            let {value: e} = k.config;
            B(h, x, e === N && E.IS_BROWSER_ENV ? E.FLEX_PREFIXED : e);
          }
          return;
        case z:
          {
            let {actionTypeId: e} = i;
            if ((0, p.isPluginType)(e)) return (0, p.renderPlugin)(e)(s, t, i);
          }
      }
    }
    let eU = {
      [j]: Object.freeze({
        xValue: 0,
        yValue: 0,
        zValue: 0
      }),
      [K]: Object.freeze({
        xValue: 1,
        yValue: 1,
        zValue: 1
      }),
      [$]: Object.freeze({
        xValue: 0,
        yValue: 0,
        zValue: 0
      }),
      [q]: Object.freeze({
        xValue: 0,
        yValue: 0
      })
    }, eB = Object.freeze({
      blur: 0,
      "hue-rotate": 0,
      invert: 0,
      grayscale: 0,
      saturate: 100,
      sepia: 0,
      contrast: 100,
      brightness: 100
    }), eF = Object.freeze({
      wght: 0,
      opsz: 0,
      wdth: 0,
      slnt: 0
    }), eG = (e, t) => {
      let a = (0, o.default)(t.filters, ({type: t}) => t === e);
      if (a && a.unit) return a.unit;
      switch (e) {
        case "blur":
          return "px";
        case "hue-rotate":
          return "deg";
        default:
          return "%";
      }
    }, eV = Object.keys(eU), ex = /^rgb/, ew = RegExp("rgba?\\(([^)]+)\\)");
    function eP(e, t, a) {
      if (!E.IS_BROWSER_ENV) return;
      let n = es[t];
      if (!n) return;
      let {getStyle: i, setStyle: l} = a, d = i(e, w);
      if (!d) return void l(e, w, n);
      let o = d.split(D).map(eo);
      -1 === o.indexOf(n) && l(e, w, o.concat(n).join(D));
    }
    function eD(e, t, a) {
      if (!E.IS_BROWSER_ENV) return;
      let n = es[t];
      if (!n) return;
      let {getStyle: i, setStyle: l} = a, d = i(e, w);
      d && -1 !== d.indexOf(n) && l(e, w, d.split(D).map(eo).filter(e => e !== n).join(D));
    }
    function eQ({store: e, elementApi: t}) {
      let {ixData: a} = e.getState(), {events: n = {}, actionLists: i = {}} = a;
      (Object.keys(n).forEach(e => {
        let a = n[e], {config: l} = a.action, {actionListId: d} = l, o = i[d];
        o && eW({
          actionList: o,
          event: a,
          elementApi: t
        });
      }), Object.keys(i).forEach(e => {
        eW({
          actionList: i[e],
          elementApi: t
        });
      }));
    }
    function eW({actionList: e = {}, event: t, elementApi: a}) {
      let {actionItemGroups: n, continuousParameterGroups: i} = e;
      (n && n.forEach(e => {
        eX({
          actionGroup: e,
          event: t,
          elementApi: a
        });
      }), i && i.forEach(e => {
        let {continuousActionGroups: n} = e;
        n.forEach(e => {
          eX({
            actionGroup: e,
            event: t,
            elementApi: a
          });
        });
      }));
    }
    function eX({actionGroup: e, event: t, elementApi: a}) {
      let {actionItems: n} = e;
      n.forEach(e => {
        let n, {actionTypeId: i, config: l} = e;
        (n = (0, p.isPluginType)(i) ? t => (0, p.clearPlugin)(i)(t, e) : eY({
          effect: ez,
          actionTypeId: i,
          elementApi: a
        }), eg({
          config: l,
          event: t,
          elementApi: a
        }).forEach(n));
      });
    }
    function eH(e, t, a) {
      let {setStyle: n, getStyle: i} = a, {actionTypeId: l} = t;
      if (l === et) {
        let {config: a} = t;
        (a.widthUnit === P && n(e, C, ""), a.heightUnit === P && n(e, M, ""));
      }
      i(e, w) && eY({
        effect: eD,
        actionTypeId: l,
        elementApi: a
      })(e);
    }
    let eY = ({effect: e, actionTypeId: t, elementApi: a}) => n => {
      switch (t) {
        case j:
        case K:
        case $:
        case q:
          e(n, E.TRANSFORM_PREFIXED, a);
          break;
        case J:
          e(n, S, a);
          break;
        case ee:
          e(n, A, a);
          break;
        case Z:
          e(n, R, a);
          break;
        case et:
          (e(n, C, a), e(n, M, a));
          break;
        case ea:
        case en:
        case ei:
          e(n, ec[t], a);
          break;
        case el:
          e(n, x, a);
      }
    };
    function ez(e, t, a) {
      let {setStyle: n} = a;
      (eD(e, t, a), n(e, t, ""), t === E.TRANSFORM_PREFIXED && n(e, E.TRANSFORM_STYLE_PREFIXED, ""));
    }
    function ej(e) {
      let t = 0, a = 0;
      return (e.forEach((e, n) => {
        let {config: i} = e, l = i.delay + i.duration;
        l >= t && (t = l, a = n);
      }), a);
    }
    function eK(e, t) {
      let {actionItemGroups: a, useFirstGroupAsInitialState: n} = e, {actionItem: i, verboseTimeElapsed: l = 0} = t, d = 0, o = 0;
      return (a.forEach((e, t) => {
        if (n && 0 === t) return;
        let {actionItems: a} = e, c = a[ej(a)], {config: s, actionTypeId: r} = c;
        i.id === c.id && (o = d + l);
        let f = eM(r) === H ? 0 : s.duration;
        d += s.delay + f;
      }), d > 0 ? (0, f.optimizeFloat)(o / d) : 0);
    }
    function e$({actionList: e, actionItemId: t, rawData: a}) {
      let {actionItemGroups: n, continuousParameterGroups: i} = e, l = [], d = e => (l.push((0, c.mergeIn)(e, ["config"], {
        delay: 0,
        duration: 0
      })), e.id === t);
      return (n && n.some(({actionItems: e}) => e.some(d)), i && i.some(e => {
        let {continuousActionGroups: t} = e;
        return t.some(({actionItems: e}) => e.some(d));
      }), (0, c.setIn)(a, ["actionLists"], {
        [e.id]: {
          id: e.id,
          actionItemGroups: [{
            actionItems: l
          }]
        }
      }));
    }
    function eq(e, {basedOn: t}) {
      return e === s.EventTypeConsts.SCROLLING_IN_VIEW && (t === s.EventBasedOn.ELEMENT || null == t) || e === s.EventTypeConsts.MOUSE_MOVE && t === s.EventBasedOn.ELEMENT;
    }
    function eZ(e, t) {
      return e + Q + t;
    }
    function eJ(e, t) {
      return null == t || -1 !== e.indexOf(t);
    }
    function e1(e, t) {
      return (0, r.default)(e && e.sort(), t && t.sort());
    }
    function e0(e) {
      if ("string" == typeof e) return e;
      if (e.pluginElement && e.objectId) return e.pluginElement + W + e.objectId;
      if (e.objectId) return e.objectId;
      let {id: t = "", selector: a = "", useEventTarget: n = ""} = e;
      return t + W + a + W + n;
    }
  },
  7164: function (e, t) {
    "use strict";
    function a(e, t) {
      return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e != e && t != t;
    }
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function () {
        return n;
      }
    }));
    let n = function (e, t) {
      if (a(e, t)) return !0;
      if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
      let n = Object.keys(e), i = Object.keys(t);
      if (n.length !== i.length) return !1;
      for (let i = 0; i < n.length; i++) if (!Object.hasOwn(t, n[i]) || !a(e[n[i]], t[n[i]])) return !1;
      return !0;
    };
  },
  5861: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
      createElementState: function () {
        return v;
      },
      ixElements: function () {
        return L;
      },
      mergeActionState: function () {
        return _;
      }
    };
    for (var i in n) Object.defineProperty(t, i, {
      enumerable: !0,
      get: n[i]
    });
    let l = a(1185), d = a(7087), {HTML_ELEMENT: o, PLAIN_OBJECT: c, ABSTRACT_NODE: s, CONFIG_X_VALUE: r, CONFIG_Y_VALUE: f, CONFIG_Z_VALUE: u, CONFIG_VALUE: p, CONFIG_X_UNIT: E, CONFIG_Y_UNIT: I, CONFIG_Z_UNIT: T, CONFIG_UNIT: y} = d.IX2EngineConstants, {IX2_SESSION_STOPPED: b, IX2_INSTANCE_ADDED: m, IX2_ELEMENT_STATE_CHANGED: g} = d.IX2EngineActionTypes, O = {}, L = (e = O, t = {}) => {
      switch (t.type) {
        case b:
          return O;
        case m:
          {
            let {elementId: a, element: n, origin: i, actionItem: d, refType: o} = t.payload, {actionTypeId: c} = d, s = e;
            return ((0, l.getIn)(s, [a, n]) !== n && (s = v(s, n, o, a, d)), _(s, a, c, i, d));
          }
        case g:
          {
            let {elementId: a, actionTypeId: n, current: i, actionItem: l} = t.payload;
            return _(e, a, n, i, l);
          }
        default:
          return e;
      }
    };
    function v(e, t, a, n, i) {
      let d = a === c ? (0, l.getIn)(i, ["config", "target", "objectId"]) : null;
      return (0, l.mergeIn)(e, [n], {
        id: n,
        ref: t,
        refId: d,
        refType: a
      });
    }
    function _(e, t, a, n, i) {
      let d = (function (e) {
        let {config: t} = e;
        return N.reduce((e, a) => {
          let n = a[0], i = a[1], l = t[n], d = t[i];
          return (null != l && null != d && (e[i] = d), e);
        }, {});
      })(i);
      return (0, l.mergeIn)(e, [t, "refState", a], n, d);
    }
    let N = [[r, E], [f, I], [u, T], [p, y]];
  },
  1178: function () {
    Webflow.require("ix2").init({
      events: {
        e: {
          id: "e",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-2"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "fd39900d-0bdf-b03b-90c9-b54489e155ba",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "fd39900d-0bdf-b03b-90c9-b54489e155ba",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722515308888
        },
        "e-2": {
          id: "e-2",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "fd39900d-0bdf-b03b-90c9-b54489e155ba",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "fd39900d-0bdf-b03b-90c9-b54489e155ba",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722515308890
        },
        "e-4": {
          id: "e-4",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-4",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-5"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd|1c7b3513-b27b-a2d3-20df-4a150fb0759d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|1c7b3513-b27b-a2d3-20df-4a150fb0759d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722547291689
        },
        "e-5": {
          id: "e-5",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-5",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-4"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd|1c7b3513-b27b-a2d3-20df-4a150fb0759d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|1c7b3513-b27b-a2d3-20df-4a150fb0759d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722547291689
        },
        "e-6": {
          id: "e-6",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-6",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-7"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd|d57422aa-e43a-013b-8b11-9a8f1edeaa09",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|d57422aa-e43a-013b-8b11-9a8f1edeaa09",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722548384009
        },
        "e-7": {
          id: "e-7",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-7",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-6"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd|d57422aa-e43a-013b-8b11-9a8f1edeaa09",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|d57422aa-e43a-013b-8b11-9a8f1edeaa09",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722548384009
        },
        "e-10": {
          id: "e-10",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-11"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd|092952a9-3601-e068-ec05-28ce3da20a6f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|092952a9-3601-e068-ec05-28ce3da20a6f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722607644962
        },
        "e-11": {
          id: "e-11",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-10"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd|092952a9-3601-e068-ec05-28ce3da20a6f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|092952a9-3601-e068-ec05-28ce3da20a6f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722607644962
        },
        "e-12": {
          id: "e-12",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-9",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-13"
            }
          },
          mediaQueries: ["main"],
          target: {
            selector: ".text_link_blocks",
            originalId: "664e31bc72082255f0e532dd|ad5ba2a6-e533-dd4a-7602-b0785516174a",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".text_link_blocks",
            originalId: "664e31bc72082255f0e532dd|ad5ba2a6-e533-dd4a-7602-b0785516174a",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722612647411
        },
        "e-14": {
          id: "e-14",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-15"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "77023271-4b0d-2bb4-de4a-b970e9bc48d0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "77023271-4b0d-2bb4-de4a-b970e9bc48d0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722705936764
        },
        "e-15": {
          id: "e-15",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-14"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "77023271-4b0d-2bb4-de4a-b970e9bc48d0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "77023271-4b0d-2bb4-de4a-b970e9bc48d0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722705936764
        },
        "e-16": {
          id: "e-16",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-17"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd|d16f2498-7be6-91af-4768-8b40c67cad07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|d16f2498-7be6-91af-4768-8b40c67cad07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722718390129
        },
        "e-17": {
          id: "e-17",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-16"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd|d16f2498-7be6-91af-4768-8b40c67cad07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|d16f2498-7be6-91af-4768-8b40c67cad07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722718390130
        },
        "e-19": {
          id: "e-19",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-18"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1722825021711
        },
        "e-20": {
          id: "e-20",
          name: "",
          animationType: "custom",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-13",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-21"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd|3f9b5a4d-d933-7de2-7763-ff0c72443ca5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|3f9b5a4d-d933-7de2-7763-ff0c72443ca5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: 0,
            scrollOffsetUnit: "%",
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723001675339
        },
        "e-23": {
          id: "e-23",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-14",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-22"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723027189192
        },
        "e-25": {
          id: "e-25",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-15",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-24"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723027565873
        },
        "e-27": {
          id: "e-27",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-16",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-26"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723027737888
        },
        "e-29": {
          id: "e-29",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-17",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-28"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723027911532
        },
        "e-75": {
          id: "e-75",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-76"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "664e31bc72082255f0e532dd|5e894685-cd2d-fe00-3c55-88909b135987",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|5e894685-cd2d-fe00-3c55-88909b135987",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 500,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723128846232
        },
        "e-77": {
          id: "e-77",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-78"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "664e31bc72082255f0e532dd|d51929a1-ec93-6860-ce5b-14a74c4663fd",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|d51929a1-ec93-6860-ce5b-14a74c4663fd",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723128856358
        },
        "e-105": {
          id: "e-105",
          name: "",
          animationType: "custom",
          eventTypeId: "DROPDOWN_OPEN",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-20",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-106"
            }
          },
          mediaQueries: ["main"],
          target: {
            selector: ".nav_dropdown",
            originalId: "fd39900d-0bdf-b03b-90c9-b54489e1549b",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".nav_dropdown",
            originalId: "fd39900d-0bdf-b03b-90c9-b54489e1549b",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723136437999
        },
        "e-106": {
          id: "e-106",
          name: "",
          animationType: "custom",
          eventTypeId: "DROPDOWN_CLOSE",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-21",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-105"
            }
          },
          mediaQueries: ["main"],
          target: {
            selector: ".nav_dropdown",
            originalId: "fd39900d-0bdf-b03b-90c9-b54489e1549b",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".nav_dropdown",
            originalId: "fd39900d-0bdf-b03b-90c9-b54489e1549b",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723136437999
        },
        "e-107": {
          id: "e-107",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-22",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-108"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            selector: ".flex-horizontal-left-center.gap-18",
            originalId: "fd39900d-0bdf-b03b-90c9-b54489e154f5",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".flex-horizontal-left-center.gap-18",
            originalId: "fd39900d-0bdf-b03b-90c9-b54489e154f5",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723137270411
        },
        "e-109": {
          id: "e-109",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-23",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-110"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "fd39900d-0bdf-b03b-90c9-b54489e155c2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "fd39900d-0bdf-b03b-90c9-b54489e155c2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723159888663
        },
        "e-110": {
          id: "e-110",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-24",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-109"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "fd39900d-0bdf-b03b-90c9-b54489e155c2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "fd39900d-0bdf-b03b-90c9-b54489e155c2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723159888664
        },
        "e-111": {
          id: "e-111",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-112"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|3e23dff4-a935-15ad-4bc4-b50552b70807",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|3e23dff4-a935-15ad-4bc4-b50552b70807",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723166923099
        },
        "e-115": {
          id: "e-115",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-116"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|6b2c634c-d58c-54f6-188b-9309d3a02e2d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|6b2c634c-d58c-54f6-188b-9309d3a02e2d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723167183688
        },
        "e-117": {
          id: "e-117",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-118"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|6b2c634c-d58c-54f6-188b-9309d3a02e33",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|6b2c634c-d58c-54f6-188b-9309d3a02e33",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723167183688
        },
        "e-118": {
          id: "e-118",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-117"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|6b2c634c-d58c-54f6-188b-9309d3a02e33",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|6b2c634c-d58c-54f6-188b-9309d3a02e33",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723167183688
        },
        "e-123": {
          id: "e-123",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-124"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|606734c4-26f7-4d95-0b5b-1ada72c4db6c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|606734c4-26f7-4d95-0b5b-1ada72c4db6c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723167184586
        },
        "e-125": {
          id: "e-125",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-126"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|606734c4-26f7-4d95-0b5b-1ada72c4db72",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|606734c4-26f7-4d95-0b5b-1ada72c4db72",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723167184586
        },
        "e-126": {
          id: "e-126",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-125"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|606734c4-26f7-4d95-0b5b-1ada72c4db72",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|606734c4-26f7-4d95-0b5b-1ada72c4db72",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723167184586
        },
        "e-127": {
          id: "e-127",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-128"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|e408245a-2e1c-5b46-3c35-6f01c567dec2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|e408245a-2e1c-5b46-3c35-6f01c567dec2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723167187003
        },
        "e-129": {
          id: "e-129",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-130"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|e408245a-2e1c-5b46-3c35-6f01c567dec8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|e408245a-2e1c-5b46-3c35-6f01c567dec8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723167187003
        },
        "e-130": {
          id: "e-130",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-129"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|e408245a-2e1c-5b46-3c35-6f01c567dec8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|e408245a-2e1c-5b46-3c35-6f01c567dec8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723167187003
        },
        "e-131": {
          id: "e-131",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-132"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|00d52cca-01c2-8a15-0865-134527be016e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|00d52cca-01c2-8a15-0865-134527be016e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723167187225
        },
        "e-133": {
          id: "e-133",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-134"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|00d52cca-01c2-8a15-0865-134527be0174",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|00d52cca-01c2-8a15-0865-134527be0174",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723167187225
        },
        "e-134": {
          id: "e-134",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-133"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|00d52cca-01c2-8a15-0865-134527be0174",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|00d52cca-01c2-8a15-0865-134527be0174",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723167187225
        },
        "e-135": {
          id: "e-135",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-136"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|8d023361-d367-8f8d-7a4e-999a2f4d1f7a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|8d023361-d367-8f8d-7a4e-999a2f4d1f7a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 250,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723167329651
        },
        "e-137": {
          id: "e-137",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInLeft",
              autoStopEventId: "e-138"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|8d023361-d367-8f8d-7a4e-999a2f4d1f7a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|8d023361-d367-8f8d-7a4e-999a2f4d1f7a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 250,
            direction: "LEFT",
            effectIn: !0
          },
          createdOn: 1723167343412
        },
        "e-139": {
          id: "e-139",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-140"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|aa3e0a4b-3281-e02a-be64-ad57263308cb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|aa3e0a4b-3281-e02a-be64-ad57263308cb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723167367143
        },
        "e-141": {
          id: "e-141",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInLeft",
              autoStopEventId: "e-142"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|aa3e0a4b-3281-e02a-be64-ad57263308cb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|aa3e0a4b-3281-e02a-be64-ad57263308cb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "LEFT",
            effectIn: !0
          },
          createdOn: 1723167376968
        },
        "e-143": {
          id: "e-143",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-144"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|72b77333-5fcc-b461-d913-5e41487a6349",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|72b77333-5fcc-b461-d913-5e41487a6349",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723167390360
        },
        "e-145": {
          id: "e-145",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInLeft",
              autoStopEventId: "e-146"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|72b77333-5fcc-b461-d913-5e41487a6349",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|72b77333-5fcc-b461-d913-5e41487a6349",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: "LEFT",
            effectIn: !0
          },
          createdOn: 1723167400168
        },
        "e-147": {
          id: "e-147",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-148"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|c464905b-9bd7-273c-f6b5-91f2d8e596ef",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|c464905b-9bd7-273c-f6b5-91f2d8e596ef",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723167414587
        },
        "e-149": {
          id: "e-149",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInLeft",
              autoStopEventId: "e-150"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|c464905b-9bd7-273c-f6b5-91f2d8e596ef",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|c464905b-9bd7-273c-f6b5-91f2d8e596ef",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: "LEFT",
            effectIn: !0
          },
          createdOn: 1723167424053
        },
        "e-151": {
          id: "e-151",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "GROW_BIG_EFFECT",
            instant: !1,
            config: {
              actionListId: "growBigIn",
              autoStopEventId: "e-152"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|7a30dee1-ba1b-6963-7069-70b00768d795",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|7a30dee1-ba1b-6963-7069-70b00768d795",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 250,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723167447251
        },
        "e-153": {
          id: "e-153",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInLeft",
              autoStopEventId: "e-154"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|3e23dff4-a935-15ad-4bc4-b50552b70807",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|3e23dff4-a935-15ad-4bc4-b50552b70807",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "LEFT",
            effectIn: !0
          },
          createdOn: 1723167469848
        },
        "e-155": {
          id: "e-155",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInLeft",
              autoStopEventId: "e-156"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|6b2c634c-d58c-54f6-188b-9309d3a02e2d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|6b2c634c-d58c-54f6-188b-9309d3a02e2d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "LEFT",
            effectIn: !0
          },
          createdOn: 1723167485427
        },
        "e-159": {
          id: "e-159",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInLeft",
              autoStopEventId: "e-160"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|606734c4-26f7-4d95-0b5b-1ada72c4db6c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|606734c4-26f7-4d95-0b5b-1ada72c4db6c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "LEFT",
            effectIn: !0
          },
          createdOn: 1723167517886
        },
        "e-161": {
          id: "e-161",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInLeft",
              autoStopEventId: "e-162"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|e408245a-2e1c-5b46-3c35-6f01c567dec2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|e408245a-2e1c-5b46-3c35-6f01c567dec2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "LEFT",
            effectIn: !0
          },
          createdOn: 1723167530244
        },
        "e-163": {
          id: "e-163",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInLeft",
              autoStopEventId: "e-164"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|00d52cca-01c2-8a15-0865-134527be016e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|00d52cca-01c2-8a15-0865-134527be016e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "LEFT",
            effectIn: !0
          },
          createdOn: 1723167541945
        },
        "e-165": {
          id: "e-165",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-166"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|c03feec8-4e4b-3906-35aa-ffabf666ab8f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|c03feec8-4e4b-3906-35aa-ffabf666ab8f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723169339205
        },
        "e-167": {
          id: "e-167",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-168"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|c03feec8-4e4b-3906-35aa-ffabf666ab95",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|c03feec8-4e4b-3906-35aa-ffabf666ab95",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723169339205
        },
        "e-168": {
          id: "e-168",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-167"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|c03feec8-4e4b-3906-35aa-ffabf666ab95",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|c03feec8-4e4b-3906-35aa-ffabf666ab95",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723169339205
        },
        "e-169": {
          id: "e-169",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-170"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|c90d6ded-c4c4-e387-2a11-f8781fc39524",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|c90d6ded-c4c4-e387-2a11-f8781fc39524",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723210577523
        },
        "e-173": {
          id: "e-173",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-174"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|a5bad7a1-5373-37fc-459b-a4da6fd1834b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|a5bad7a1-5373-37fc-459b-a4da6fd1834b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723213180891
        },
        "e-174": {
          id: "e-174",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-173"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|a5bad7a1-5373-37fc-459b-a4da6fd1834b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|a5bad7a1-5373-37fc-459b-a4da6fd1834b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723213180891
        },
        "e-181": {
          id: "e-181",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-182"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|29134b4b-d3c2-e18c-c182-9769f7f9da26",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|29134b4b-d3c2-e18c-c182-9769f7f9da26",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723219767890
        },
        "e-183": {
          id: "e-183",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-184"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|4cf62596-19ac-3fc5-8bbf-77c167bbccf0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|4cf62596-19ac-3fc5-8bbf-77c167bbccf0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723219822219
        },
        "e-185": {
          id: "e-185",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-186"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|3e75245f-9215-c3d3-e75c-1989e4243356",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|3e75245f-9215-c3d3-e75c-1989e4243356",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723297753926
        },
        "e-188": {
          id: "e-188",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-25",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-187"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723297796361
        },
        "e-189": {
          id: "e-189",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-190"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|88db4d8d-b733-422d-03ab-587f4dfc9cba",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|88db4d8d-b733-422d-03ab-587f4dfc9cba",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723298102938
        },
        "e-191": {
          id: "e-191",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-192"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|88db4d8d-b733-422d-03ab-587f4dfc9cbd",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|88db4d8d-b733-422d-03ab-587f4dfc9cbd",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723298118938
        },
        "e-195": {
          id: "e-195",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-196"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|6a5d9436-418b-6659-f665-599d570dde14",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|6a5d9436-418b-6659-f665-599d570dde14",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 800,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723299288652
        },
        "e-201": {
          id: "e-201",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-4",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-202"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|6beea8ea-818e-41b3-83fe-2f5856b41573",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|6beea8ea-818e-41b3-83fe-2f5856b41573",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723460197606
        },
        "e-202": {
          id: "e-202",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-5",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-201"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|6beea8ea-818e-41b3-83fe-2f5856b41573",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|6beea8ea-818e-41b3-83fe-2f5856b41573",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723460197606
        },
        "e-207": {
          id: "e-207",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-6",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-208"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|28f027fa-6200-72df-0694-a71d83783457",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|28f027fa-6200-72df-0694-a71d83783457",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723579564712
        },
        "e-208": {
          id: "e-208",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-7",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-207"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|28f027fa-6200-72df-0694-a71d83783457",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|28f027fa-6200-72df-0694-a71d83783457",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723579564712
        },
        "e-209": {
          id: "e-209",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-210"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|a991d089-5b91-2db7-23b5-72e2a91ac014",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|a991d089-5b91-2db7-23b5-72e2a91ac014",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723626841650
        },
        "e-211": {
          id: "e-211",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-212"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|a991d089-5b91-2db7-23b5-72e2a91ac018",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|a991d089-5b91-2db7-23b5-72e2a91ac018",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723626841650
        },
        "e-227": {
          id: "e-227",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-228"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|5de9db48-c130-2286-c827-359c582ec893",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|5de9db48-c130-2286-c827-359c582ec893",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723635044153
        },
        "e-229": {
          id: "e-229",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-230"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|5de9db48-c130-2286-c827-359c582ec897",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|5de9db48-c130-2286-c827-359c582ec897",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723635044153
        },
        "e-231": {
          id: "e-231",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-232"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22|6ddc26fb-5ba8-a170-b1e7-8f954b64105a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|6ddc26fb-5ba8-a170-b1e7-8f954b64105a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723635078530
        },
        "e-235": {
          id: "e-235",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-26",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b575ea087e5c4ec787cd22|6a5d9436-418b-6659-f665-599d570dde14",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22|6a5d9436-418b-6659-f665-599d570dde14",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-26-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-26-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1723744584986
        },
        "e-236": {
          id: "e-236",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-27",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-237"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            selector: ".border-div.get_started_tab",
            originalId: "66b575ea087e5c4ec787cd22|62a486f9-d92c-369e-f038-635462589beb",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".border-div.get_started_tab",
            originalId: "66b575ea087e5c4ec787cd22|62a486f9-d92c-369e-f038-635462589beb",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723745355047
        },
        "e-237": {
          id: "e-237",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-28",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-236"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            selector: ".border-div.get_started_tab",
            originalId: "66b575ea087e5c4ec787cd22|62a486f9-d92c-369e-f038-635462589beb",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".border-div.get_started_tab",
            originalId: "66b575ea087e5c4ec787cd22|62a486f9-d92c-369e-f038-635462589beb",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723745355048
        },
        "e-242": {
          id: "e-242",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-30",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-241"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b575ea087e5c4ec787cd22",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66b575ea087e5c4ec787cd22",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1723800889161
        },
        "e-243": {
          id: "e-243",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-244"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|27bc98d5-6229-d038-9a4f-16c804d3d34d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|27bc98d5-6229-d038-9a4f-16c804d3d34d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 250,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723929101860
        },
        "e-245": {
          id: "e-245",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-246"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|236598dd-ca0c-875c-9125-7581e62742f9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|236598dd-ca0c-875c-9125-7581e62742f9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723929114295
        },
        "e-247": {
          id: "e-247",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-248"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|bee968d4-afb7-fd03-74d3-a1539de9b31d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|bee968d4-afb7-fd03-74d3-a1539de9b31d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723929125147
        },
        "e-249": {
          id: "e-249",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-250"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|b3207fc1-1a7e-979a-b587-9a4b8e34f6a6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|b3207fc1-1a7e-979a-b587-9a4b8e34f6a6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723929136875
        },
        "e-251": {
          id: "e-251",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-252"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66bf0f19b199fee1a1849d69|dfe6844f-2aa5-0942-aa6d-4f3673f56953",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|dfe6844f-2aa5-0942-aa6d-4f3673f56953",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1723929164367
        },
        "e-253": {
          id: "e-253",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-254"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf6fdcd5def4b75703f07c|8644ae28-98e9-b065-605e-a4ac90d010e5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf6fdcd5def4b75703f07c|8644ae28-98e9-b065-605e-a4ac90d010e5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724117643241
        },
        "e-255": {
          id: "e-255",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-256"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf6fdcd5def4b75703f07c|8644ae28-98e9-b065-605e-a4ac90d010eb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf6fdcd5def4b75703f07c|8644ae28-98e9-b065-605e-a4ac90d010eb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724117643241
        },
        "e-256": {
          id: "e-256",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-255"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf6fdcd5def4b75703f07c|8644ae28-98e9-b065-605e-a4ac90d010eb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf6fdcd5def4b75703f07c|8644ae28-98e9-b065-605e-a4ac90d010eb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724117643241
        },
        "e-257": {
          id: "e-257",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-31",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-258"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf6fdcd5def4b75703f07c|4cd60648-5497-a1c0-e2a2-03423c87a7f6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf6fdcd5def4b75703f07c|4cd60648-5497-a1c0-e2a2-03423c87a7f6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724117940122
        },
        "e-259": {
          id: "e-259",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-32",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-260"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf6fdcd5def4b75703f07c|de346add-200a-0934-cd17-4813842c1829",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf6fdcd5def4b75703f07c|de346add-200a-0934-cd17-4813842c1829",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724118646242
        },
        "e-260": {
          id: "e-260",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-33",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-259"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf6fdcd5def4b75703f07c|de346add-200a-0934-cd17-4813842c1829",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf6fdcd5def4b75703f07c|de346add-200a-0934-cd17-4813842c1829",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724118646243
        },
        "e-261": {
          id: "e-261",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-262"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c6b07e7cbda3e816e41719|7c18777a-b9c5-3a89-9959-713b2bc85e33",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c6b07e7cbda3e816e41719|7c18777a-b9c5-3a89-9959-713b2bc85e33",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724324854807
        },
        "e-263": {
          id: "e-263",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-264"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c6b07e7cbda3e816e41719|7c18777a-b9c5-3a89-9959-713b2bc85e39",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c6b07e7cbda3e816e41719|7c18777a-b9c5-3a89-9959-713b2bc85e39",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724324854807
        },
        "e-264": {
          id: "e-264",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-263"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c6b07e7cbda3e816e41719|7c18777a-b9c5-3a89-9959-713b2bc85e39",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c6b07e7cbda3e816e41719|7c18777a-b9c5-3a89-9959-713b2bc85e39",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724324854807
        },
        "e-266": {
          id: "e-266",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-267"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|68e3270a-b379-392f-0cea-b40bd5c384d9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|68e3270a-b379-392f-0cea-b40bd5c384d9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724408572282
        },
        "e-268": {
          id: "e-268",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-269"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|68e3270a-b379-392f-0cea-b40bd5c384df",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|68e3270a-b379-392f-0cea-b40bd5c384df",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724408572282
        },
        "e-269": {
          id: "e-269",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-268"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|68e3270a-b379-392f-0cea-b40bd5c384df",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|68e3270a-b379-392f-0cea-b40bd5c384df",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724408572282
        },
        "e-271": {
          id: "e-271",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-270"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724408933096
        },
        "e-272": {
          id: "e-272",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-273"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|0d4d4bf0-c499-f339-a0db-f52d8248c315",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|0d4d4bf0-c499-f339-a0db-f52d8248c315",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1724409079350
        },
        "e-304": {
          id: "e-304",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-305"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|c2ea1d90-6599-b83e-e140-70738152df5f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|c2ea1d90-6599-b83e-e140-70738152df5f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724410913546
        },
        "e-306": {
          id: "e-306",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-307"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|c2ea1d90-6599-b83e-e140-70738152df63",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|c2ea1d90-6599-b83e-e140-70738152df63",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724410913546
        },
        "e-308": {
          id: "e-308",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-309"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|325b3837-c935-cb40-3531-1f8aa32f0134",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|325b3837-c935-cb40-3531-1f8aa32f0134",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724410928904
        },
        "e-310": {
          id: "e-310",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-311"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|325b3837-c935-cb40-3531-1f8aa32f0149",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|325b3837-c935-cb40-3531-1f8aa32f0149",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724410928904
        },
        "e-312": {
          id: "e-312",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-313"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|325b3837-c935-cb40-3531-1f8aa32f0158",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|325b3837-c935-cb40-3531-1f8aa32f0158",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724410928904
        },
        "e-314": {
          id: "e-314",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-315"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|325b3837-c935-cb40-3531-1f8aa32f015d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|325b3837-c935-cb40-3531-1f8aa32f015d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724410928904
        },
        "e-316": {
          id: "e-316",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-317"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|325b3837-c935-cb40-3531-1f8aa32f0165",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|325b3837-c935-cb40-3531-1f8aa32f0165",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724410928904
        },
        "e-326": {
          id: "e-326",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-327"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|1b23080a-c3e0-32ae-f2cd-ef645a97a91e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|1b23080a-c3e0-32ae-f2cd-ef645a97a91e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724439926130
        },
        "e-328": {
          id: "e-328",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-4",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-329"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|1b23080a-c3e0-32ae-f2cd-ef645a97a955",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|1b23080a-c3e0-32ae-f2cd-ef645a97a955",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724439926130
        },
        "e-329": {
          id: "e-329",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-5",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-328"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|1b23080a-c3e0-32ae-f2cd-ef645a97a955",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|1b23080a-c3e0-32ae-f2cd-ef645a97a955",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724439926130
        },
        "e-330": {
          id: "e-330",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-331"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|06a5b39a-4a78-32fc-a0cc-ded75d34021f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|06a5b39a-4a78-32fc-a0cc-ded75d34021f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724455960527
        },
        "e-333": {
          id: "e-333",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-334"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|1f5547bf-5207-ca20-a3b0-a48065c14240",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|1f5547bf-5207-ca20-a3b0-a48065c14240",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1724684675332
        },
        "e-335": {
          id: "e-335",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-336"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc76793ce6691964781cf1|5752751c-37cb-47bf-e4df-6ea87750ce92",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|5752751c-37cb-47bf-e4df-6ea87750ce92",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724686556956
        },
        "e-337": {
          id: "e-337",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-338"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc76793ce6691964781cf1|8fe26995-c63c-2bb3-9090-288f957c73cf",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|8fe26995-c63c-2bb3-9090-288f957c73cf",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724688959987
        },
        "e-339": {
          id: "e-339",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-340"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|8fe26995-c63c-2bb3-9090-288f957c73d5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|8fe26995-c63c-2bb3-9090-288f957c73d5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724688959987
        },
        "e-340": {
          id: "e-340",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-339"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|8fe26995-c63c-2bb3-9090-288f957c73d5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|8fe26995-c63c-2bb3-9090-288f957c73d5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724688959987
        },
        "e-341": {
          id: "e-341",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-342"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc76793ce6691964781cf1|585a1c20-e392-b82c-d268-024eec3adcdf",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|585a1c20-e392-b82c-d268-024eec3adcdf",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724762485068
        },
        "e-343": {
          id: "e-343",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-4",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-344"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|585a1c20-e392-b82c-d268-024eec3add16",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|585a1c20-e392-b82c-d268-024eec3add16",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724762485068
        },
        "e-344": {
          id: "e-344",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-5",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-343"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|585a1c20-e392-b82c-d268-024eec3add16",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|585a1c20-e392-b82c-d268-024eec3add16",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724762485068
        },
        "e-345": {
          id: "e-345",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-346"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c49ef",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c49ef",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724765615572
        },
        "e-347": {
          id: "e-347",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-348"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c49f3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c49f3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724765615572
        },
        "e-349": {
          id: "e-349",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-350"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c49f7",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c49f7",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724765615572
        },
        "e-351": {
          id: "e-351",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-352"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c4a0c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c4a0c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724765615572
        },
        "e-353": {
          id: "e-353",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-354"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c4a1b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c4a1b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724765615572
        },
        "e-355": {
          id: "e-355",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-356"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c4a20",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c4a20",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724765615572
        },
        "e-357": {
          id: "e-357",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-358"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c4a28",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|5aaa8b9e-ed86-9add-1253-896be21c4a28",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724765615572
        },
        "e-360": {
          id: "e-360",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-359"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724765809290
        },
        "e-362": {
          id: "e-362",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-363"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|77f4d637-34bb-0814-c656-facafff52de3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|77f4d637-34bb-0814-c656-facafff52de3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724766134072
        },
        "e-364": {
          id: "e-364",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-365"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|5ec85041-8e60-11d5-14ee-0c5bf5cfcd7a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|5ec85041-8e60-11d5-14ee-0c5bf5cfcd7a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1724769530175
        },
        "e-366": {
          id: "e-366",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-367"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc768971fae5b313e15465|34a0d719-efe6-d86f-8fc1-c7e7a4efb2fd",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|34a0d719-efe6-d86f-8fc1-c7e7a4efb2fd",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724777700924
        },
        "e-368": {
          id: "e-368",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-369"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|34a0d719-efe6-d86f-8fc1-c7e7a4efb303",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|34a0d719-efe6-d86f-8fc1-c7e7a4efb303",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724777700924
        },
        "e-369": {
          id: "e-369",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-368"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|34a0d719-efe6-d86f-8fc1-c7e7a4efb303",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|34a0d719-efe6-d86f-8fc1-c7e7a4efb303",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724777700924
        },
        "e-370": {
          id: "e-370",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-371"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc768971fae5b313e15465|5fc3666b-fc5b-3176-2a24-289905a5be32",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|5fc3666b-fc5b-3176-2a24-289905a5be32",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724778278473
        },
        "e-372": {
          id: "e-372",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-373"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc768971fae5b313e15465|f70fdcc1-7cb5-1c7e-5b08-6e35a338c794",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|f70fdcc1-7cb5-1c7e-5b08-6e35a338c794",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724778339082
        },
        "e-374": {
          id: "e-374",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-375"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc768971fae5b313e15465|c466f000-4cf0-9a3d-8ff6-88081399ce53",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|c466f000-4cf0-9a3d-8ff6-88081399ce53",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724778783047
        },
        "e-376": {
          id: "e-376",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-4",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-377"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|c466f000-4cf0-9a3d-8ff6-88081399ce8a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|c466f000-4cf0-9a3d-8ff6-88081399ce8a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724778783047
        },
        "e-377": {
          id: "e-377",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-5",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-376"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|c466f000-4cf0-9a3d-8ff6-88081399ce8a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|c466f000-4cf0-9a3d-8ff6-88081399ce8a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724778783047
        },
        "e-379": {
          id: "e-379",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-378"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724779635723
        },
        "e-380": {
          id: "e-380",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf069776465bbf134df106|e21fc64a-1d6a-fda7-378a-09289b679217",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|e21fc64a-1d6a-fda7-378a-09289b679217",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1724864471007
        },
        "e-381": {
          id: "e-381",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-382"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf069776465bbf134df106|378f4204-dd5b-fd0c-dff3-b3b0b6de25b0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|378f4204-dd5b-fd0c-dff3-b3b0b6de25b0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1724900431597
        },
        "e-383": {
          id: "e-383",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-384"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|aa8a5fec-9277-0da8-3082-b7458a87e179",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|aa8a5fec-9277-0da8-3082-b7458a87e179",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724900465664
        },
        "e-385": {
          id: "e-385",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-386"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf069776465bbf134df106|aa8a5fec-9277-0da8-3082-b7458a87e17f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|aa8a5fec-9277-0da8-3082-b7458a87e17f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724900465664
        },
        "e-386": {
          id: "e-386",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-385"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf069776465bbf134df106|aa8a5fec-9277-0da8-3082-b7458a87e17f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|aa8a5fec-9277-0da8-3082-b7458a87e17f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1724900465664
        },
        "e-387": {
          id: "e-387",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-388"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|aaa48d48-d049-1795-f6cc-39d24c5e9bed",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|aaa48d48-d049-1795-f6cc-39d24c5e9bed",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724930032435
        },
        "e-389": {
          id: "e-389",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-390"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|5c779c03-2611-16f2-5494-1c545d2e6c11",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|5c779c03-2611-16f2-5494-1c545d2e6c11",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724930139458
        },
        "e-391": {
          id: "e-391",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-392"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|20771e68-a6f1-b1b7-514b-2288d48ce91f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|20771e68-a6f1-b1b7-514b-2288d48ce91f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724936426093
        },
        "e-393": {
          id: "e-393",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-394"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|7b60c8b5-83ca-8de5-eebd-604e7ffe8d73",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|7b60c8b5-83ca-8de5-eebd-604e7ffe8d73",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724936436698
        },
        "e-395": {
          id: "e-395",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-396"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf069776465bbf134df106|5b730c81-dd8b-cd99-0a99-70306c700015",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|5b730c81-dd8b-cd99-0a99-70306c700015",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1724936578775
        },
        "e-397": {
          id: "e-397",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-398"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|bcacd2af-d36d-2a4c-7aa7-6c7067e76804",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|bcacd2af-d36d-2a4c-7aa7-6c7067e76804",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724939039351
        },
        "e-399": {
          id: "e-399",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-400"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf069776465bbf134df106|bcacd2af-d36d-2a4c-7aa7-6c7067e76807",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|bcacd2af-d36d-2a4c-7aa7-6c7067e76807",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724939039351
        },
        "e-405": {
          id: "e-405",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-406"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|ab1420f9-8f96-5242-a45f-718426805151",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|ab1420f9-8f96-5242-a45f-718426805151",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724939060870
        },
        "e-409": {
          id: "e-409",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-34",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|5fc3666b-fc5b-3176-2a24-289905a5be41",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|5fc3666b-fc5b-3176-2a24-289905a5be41",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-34-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-34-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1724956943892
        },
        "e-410": {
          id: "e-410",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-34",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc76793ce6691964781cf1|5752751c-37cb-47bf-e4df-6ea87750ce99",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|5752751c-37cb-47bf-e4df-6ea87750ce99",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-34-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-34-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1724957021345
        },
        "e-411": {
          id: "e-411",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-412"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|a73c5e31-7a1c-1b24-d27e-1867dd5a25f1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|a73c5e31-7a1c-1b24-d27e-1867dd5a25f1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724957357425
        },
        "e-413": {
          id: "e-413",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-414"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|a73c5e31-7a1c-1b24-d27e-1867dd5a25f5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|a73c5e31-7a1c-1b24-d27e-1867dd5a25f5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1724957357425
        },
        "e-415": {
          id: "e-415",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|a57c3486-52a8-05b3-58b2-0796dfdc7055",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|a57c3486-52a8-05b3-58b2-0796dfdc7055",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1725022699297
        },
        "e-418": {
          id: "e-418",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-419"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|9650825f-5c11-0798-2b0c-e2b44cbd37d6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|9650825f-5c11-0798-2b0c-e2b44cbd37d6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725023305769
        },
        "e-420": {
          id: "e-420",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-421"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|9650825f-5c11-0798-2b0c-e2b44cbd37dc",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|9650825f-5c11-0798-2b0c-e2b44cbd37dc",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725023305769
        },
        "e-421": {
          id: "e-421",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-420"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|9650825f-5c11-0798-2b0c-e2b44cbd37dc",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|9650825f-5c11-0798-2b0c-e2b44cbd37dc",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725023305769
        },
        "e-423": {
          id: "e-423",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-422"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725023352506
        },
        "e-424": {
          id: "e-424",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-425"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|43b4f0b9-9896-c642-eced-2c2dbdefcec4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|43b4f0b9-9896-c642-eced-2c2dbdefcec4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1725025961187
        },
        "e-426": {
          id: "e-426",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-427"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|768b7e99-6ded-9d52-7c80-25a43f937b9f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|768b7e99-6ded-9d52-7c80-25a43f937b9f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725026258589
        },
        "e-428": {
          id: "e-428",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-429"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|4ab69dd9-a14c-0f77-6f6b-a98fee1127c1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|4ab69dd9-a14c-0f77-6f6b-a98fee1127c1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725033546773
        },
        "e-429": {
          id: "e-429",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-428"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|4ab69dd9-a14c-0f77-6f6b-a98fee1127c1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|4ab69dd9-a14c-0f77-6f6b-a98fee1127c1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725033546773
        },
        "e-430": {
          id: "e-430",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-431"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|0ee7bcfd-0d2f-37e1-b533-ffdf154a423a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|0ee7bcfd-0d2f-37e1-b533-ffdf154a423a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725036411580
        },
        "e-432": {
          id: "e-432",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-433"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|0ee7bcfd-0d2f-37e1-b533-ffdf154a423d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|0ee7bcfd-0d2f-37e1-b533-ffdf154a423d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725036411580
        },
        "e-434": {
          id: "e-434",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-435"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|0ee7bcfd-0d2f-37e1-b533-ffdf154a4243",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|0ee7bcfd-0d2f-37e1-b533-ffdf154a4243",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725036411580
        },
        "e-436": {
          id: "e-436",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-437"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|9871e5ed-8637-96a5-69cd-3f14fd19e944",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|9871e5ed-8637-96a5-69cd-3f14fd19e944",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1725046433750
        },
        "e-438": {
          id: "e-438",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-439"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|2104de5a-a134-3083-e25f-89e6d0b3ed28",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|2104de5a-a134-3083-e25f-89e6d0b3ed28",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725046468637
        },
        "e-440": {
          id: "e-440",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-441"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cc768971fae5b313e15465|b52653e0-9a6b-330e-72d9-cac9e16b1ba3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|b52653e0-9a6b-330e-72d9-cac9e16b1ba3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725049428891
        },
        "e-442": {
          id: "e-442",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-443"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|03544bf8-1ac7-ba36-add2-6914e1d727d9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|03544bf8-1ac7-ba36-add2-6914e1d727d9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1725049513260
        },
        "e-444": {
          id: "e-444",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-445"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|73262260-ecf4-2371-f793-20bb91f73867",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|73262260-ecf4-2371-f793-20bb91f73867",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725049543330
        },
        "e-445": {
          id: "e-445",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-444"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|73262260-ecf4-2371-f793-20bb91f73867",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|73262260-ecf4-2371-f793-20bb91f73867",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725049543330
        },
        "e-446": {
          id: "e-446",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c7f446ad9e2a26a134c|208fce6b-02b5-6324-f8bd-85e4dad34a3e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c7f446ad9e2a26a134c|208fce6b-02b5-6324-f8bd-85e4dad34a3e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1725203794219
        },
        "e-447": {
          id: "e-447",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-448"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c7f446ad9e2a26a134c|57fef9a5-9fec-33f8-4795-4b0ee3c5e436",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c7f446ad9e2a26a134c|57fef9a5-9fec-33f8-4795-4b0ee3c5e436",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725204695604
        },
        "e-448": {
          id: "e-448",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-447"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c7f446ad9e2a26a134c|57fef9a5-9fec-33f8-4795-4b0ee3c5e436",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c7f446ad9e2a26a134c|57fef9a5-9fec-33f8-4795-4b0ee3c5e436",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725204695604
        },
        "e-450": {
          id: "e-450",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-449"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c7f446ad9e2a26a134c",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c7f446ad9e2a26a134c",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725207428632
        },
        "e-451": {
          id: "e-451",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-452"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c7f446ad9e2a26a134c|b4e21eff-e9b8-1a01-9af4-71457b1904c8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c7f446ad9e2a26a134c|b4e21eff-e9b8-1a01-9af4-71457b1904c8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1725208472135
        },
        "e-453": {
          id: "e-453",
          name: "",
          animationType: "custom",
          eventTypeId: "SCROLLING_IN_VIEW",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-35",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c7f446ad9e2a26a134c|5b4f54fe-e50a-17cf-2161-c78044defbd8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c7f446ad9e2a26a134c|5b4f54fe-e50a-17cf-2161-c78044defbd8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-35-p",
            smoothing: 50,
            startsEntering: !0,
            addStartOffset: !1,
            addOffsetValue: 50,
            startsExiting: !1,
            addEndOffset: !1,
            endOffsetValue: 50
          }],
          createdOn: 1725212624539
        },
        "e-454": {
          id: "e-454",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-36",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-455"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            selector: ".fs-toc_h-trigger",
            originalId: "66bf6fdcd5def4b75703f07c|b11afb98-7e43-e23b-3220-dfa2a426f783",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".fs-toc_h-trigger",
            originalId: "66bf6fdcd5def4b75703f07c|b11afb98-7e43-e23b-3220-dfa2a426f783",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1651960888786
        },
        "e-455": {
          id: "e-455",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-37",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-454"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            selector: ".fs-toc_h-trigger",
            originalId: "66bf6fdcd5def4b75703f07c|b11afb98-7e43-e23b-3220-dfa2a426f783",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".fs-toc_h-trigger",
            originalId: "66bf6fdcd5def4b75703f07c|b11afb98-7e43-e23b-3220-dfa2a426f783",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1651960888790
        },
        "e-457": {
          id: "e-457",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-18",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-456"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725305167355
        },
        "e-458": {
          id: "e-458",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-40",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-459"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|aeaa1469-8a0f-3b27-391d-a73cc97cda9b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|aeaa1469-8a0f-3b27-391d-a73cc97cda9b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725404047426
        },
        "e-459": {
          id: "e-459",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-41",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-458"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|aeaa1469-8a0f-3b27-391d-a73cc97cda9b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|aeaa1469-8a0f-3b27-391d-a73cc97cda9b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725404047431
        },
        "e-460": {
          id: "e-460",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-38",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-461"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|aeaa1469-8a0f-3b27-391d-a73cc97cda9f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|aeaa1469-8a0f-3b27-391d-a73cc97cda9f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725404069375
        },
        "e-461": {
          id: "e-461",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-39",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-460"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|aeaa1469-8a0f-3b27-391d-a73cc97cda9f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|aeaa1469-8a0f-3b27-391d-a73cc97cda9f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725404069377
        },
        "e-462": {
          id: "e-462",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-40",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-463"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|36742f16-2b42-6802-155c-d2388c6edff5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|36742f16-2b42-6802-155c-d2388c6edff5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725412080335
        },
        "e-463": {
          id: "e-463",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-41",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-462"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|36742f16-2b42-6802-155c-d2388c6edff5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|36742f16-2b42-6802-155c-d2388c6edff5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725412080338
        },
        "e-464": {
          id: "e-464",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-38",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-465"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|36742f16-2b42-6802-155c-d2388c6edff9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|36742f16-2b42-6802-155c-d2388c6edff9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725412097548
        },
        "e-465": {
          id: "e-465",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-39",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-464"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66bf0f19b199fee1a1849d69|36742f16-2b42-6802-155c-d2388c6edff9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66bf0f19b199fee1a1849d69|36742f16-2b42-6802-155c-d2388c6edff9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725412097583
        },
        "e-466": {
          id: "e-466",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-467"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c7f446ad9e2a26a134c|48461910-b523-fba7-8a5d-a72a8c48deda",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c7f446ad9e2a26a134c|48461910-b523-fba7-8a5d-a72a8c48deda",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725443612268
        },
        "e-468": {
          id: "e-468",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-469"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c7f446ad9e2a26a134c|48461910-b523-fba7-8a5d-a72a8c48dee0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c7f446ad9e2a26a134c|48461910-b523-fba7-8a5d-a72a8c48dee0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725443612268
        },
        "e-469": {
          id: "e-469",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-468"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c7f446ad9e2a26a134c|48461910-b523-fba7-8a5d-a72a8c48dee0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c7f446ad9e2a26a134c|48461910-b523-fba7-8a5d-a72a8c48dee0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725443612268
        },
        "e-470": {
          id: "e-470",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|734bec01-9abf-9a89-28d7-9c24a3295b2d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|734bec01-9abf-9a89-28d7-9c24a3295b2d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1725447570232
        },
        "e-471": {
          id: "e-471",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-472"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|6dcc3d02-e4b6-e8c6-2f17-43c9ee6f87c8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|6dcc3d02-e4b6-e8c6-2f17-43c9ee6f87c8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1725456731237
        },
        "e-473": {
          id: "e-473",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-474"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|8314592a-84cc-497b-74cf-cfa2bf4dfcf3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|8314592a-84cc-497b-74cf-cfa2bf4dfcf3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725457155919
        },
        "e-475": {
          id: "e-475",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-476"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|8314592a-84cc-497b-74cf-cfa2bf4dfcf9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|8314592a-84cc-497b-74cf-cfa2bf4dfcf9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725457155919
        },
        "e-476": {
          id: "e-476",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-475"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|8314592a-84cc-497b-74cf-cfa2bf4dfcf9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|8314592a-84cc-497b-74cf-cfa2bf4dfcf9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725457155919
        },
        "e-477": {
          id: "e-477",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-478"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|f9ce11da-b286-aed7-1b44-434fd2780724",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|f9ce11da-b286-aed7-1b44-434fd2780724",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725457306746
        },
        "e-479": {
          id: "e-479",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-480"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|f9ce11da-b286-aed7-1b44-434fd2780728",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|f9ce11da-b286-aed7-1b44-434fd2780728",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725457306746
        },
        "e-481": {
          id: "e-481",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-482"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|b6a04493-1a69-45e4-4116-b989a2874181",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|b6a04493-1a69-45e4-4116-b989a2874181",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725457660012
        },
        "e-483": {
          id: "e-483",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-484"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|b6a04493-1a69-45e4-4116-b989a2874185",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|b6a04493-1a69-45e4-4116-b989a2874185",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725457660012
        },
        "e-485": {
          id: "e-485",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-486"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|b6a04493-1a69-45e4-4116-b989a28741b6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|b6a04493-1a69-45e4-4116-b989a28741b6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1725457660012
        },
        "e-489": {
          id: "e-489",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-490"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|e4aac047-a8c5-72b2-16c4-ad72b0a67658",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|e4aac047-a8c5-72b2-16c4-ad72b0a67658",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725457881035
        },
        "e-491": {
          id: "e-491",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-492"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|e4aac047-a8c5-72b2-16c4-ad72b0a6765c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|e4aac047-a8c5-72b2-16c4-ad72b0a6765c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725457881035
        },
        "e-493": {
          id: "e-493",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-494"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|e4aac047-a8c5-72b2-16c4-ad72b0a6765f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|e4aac047-a8c5-72b2-16c4-ad72b0a6765f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725457881035
        },
        "e-495": {
          id: "e-495",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-496"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|3321498b-d3ff-d597-8f21-2476ecf1b005",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|3321498b-d3ff-d597-8f21-2476ecf1b005",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725459623022
        },
        "e-497": {
          id: "e-497",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-498"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06a4205bfe1b74e19b6d|6eaa61ee-d69e-bd0b-2630-3ed46c043546",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06a4205bfe1b74e19b6d|6eaa61ee-d69e-bd0b-2630-3ed46c043546",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725459627463
        },
        "e-499": {
          id: "e-499",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb289",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb289",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1725623005267
        },
        "e-500": {
          id: "e-500",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-501"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb2aa",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb2aa",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-502": {
          id: "e-502",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-503"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb2c4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb2c4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-504": {
          id: "e-504",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-505"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb2c8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb2c8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-506": {
          id: "e-506",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-507"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb2e2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb2e2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-508": {
          id: "e-508",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-509"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb2e6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb2e6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-510": {
          id: "e-510",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-511"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb310",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb310",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-512": {
          id: "e-512",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-513"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb32a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb32a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-514": {
          id: "e-514",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-515"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb32e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb32e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-516": {
          id: "e-516",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-517"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb333",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb333",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-518": {
          id: "e-518",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-519"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb35f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb35f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-520": {
          id: "e-520",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-521"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb363",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb363",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-522": {
          id: "e-522",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-523"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb380",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb380",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725623005267
        },
        "e-524": {
          id: "e-524",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-525"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb386",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb386",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725623005267
        },
        "e-525": {
          id: "e-525",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-524"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb386",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf06b158915731fea94a35|e641eb21-33f3-8032-bd01-4b07c18bb386",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725623005267
        },
        "e-529": {
          id: "e-529",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-30",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-528"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18cecb95b798eeebf75c0",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725624778484
        },
        "e-530": {
          id: "e-530",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-531"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|b9ab1b92-1ad0-ca9d-133c-485f95c2d4bc",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|b9ab1b92-1ad0-ca9d-133c-485f95c2d4bc",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725624860944
        },
        "e-532": {
          id: "e-532",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-533"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|b9ab1b92-1ad0-ca9d-133c-485f95c2d4bf",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|b9ab1b92-1ad0-ca9d-133c-485f95c2d4bf",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725624860944
        },
        "e-534": {
          id: "e-534",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-535"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18cecb95b798eeebf75c0|b9ab1b92-1ad0-ca9d-133c-485f95c2d4c2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|b9ab1b92-1ad0-ca9d-133c-485f95c2d4c2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1725624860944
        },
        "e-536": {
          id: "e-536",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-537"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|8a2417d7-240f-79db-38ed-3a395ec0dbf8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|8a2417d7-240f-79db-38ed-3a395ec0dbf8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725634569134
        },
        "e-540": {
          id: "e-540",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-541"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|1a6ce9c2-b569-7c58-8eab-bc07f5ded4f3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|1a6ce9c2-b569-7c58-8eab-bc07f5ded4f3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725636859861
        },
        "e-544": {
          id: "e-544",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-545"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|a474f320-c24a-27a2-cee6-394786c0def1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|a474f320-c24a-27a2-cee6-394786c0def1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725647343409
        },
        "e-546": {
          id: "e-546",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-547"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|45b34b61-c973-6719-c759-cc390863e3e9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|45b34b61-c973-6719-c759-cc390863e3e9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725649787140
        },
        "e-548": {
          id: "e-548",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-549"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|99005b3e-7402-0ee3-25d4-62e3792b2bb2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|99005b3e-7402-0ee3-25d4-62e3792b2bb2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725649867657
        },
        "e-550": {
          id: "e-550",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-551"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990a8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990a8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725651512198
        },
        "e-552": {
          id: "e-552",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-553"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990ac",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990ac",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725651512198
        },
        "e-554": {
          id: "e-554",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-555"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990b0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990b0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725651512198
        },
        "e-556": {
          id: "e-556",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-557"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990c5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990c5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725651512198
        },
        "e-558": {
          id: "e-558",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-559"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990d4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990d4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725651512198
        },
        "e-560": {
          id: "e-560",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-561"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990d9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990d9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725651512198
        },
        "e-562": {
          id: "e-562",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-563"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990e1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|661723d4-bb82-b121-4c78-d28909d990e1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725651512198
        },
        "e-564": {
          id: "e-564",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-565"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|24a88d9a-ac8a-291e-7594-56271cf5e764",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|24a88d9a-ac8a-291e-7594-56271cf5e764",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725652514645
        },
        "e-566": {
          id: "e-566",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-567"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d18cecb95b798eeebf75c0|5be4ca30-4d52-ffdd-71e8-de630f357c83",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|5be4ca30-4d52-ffdd-71e8-de630f357c83",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725652530725
        },
        "e-570": {
          id: "e-570",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-571"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18cecb95b798eeebf75c0|29ad2ad8-0278-4713-daba-902f535c3314",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|29ad2ad8-0278-4713-daba-902f535c3314",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1725653150697
        },
        "e-575": {
          id: "e-575",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-30",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-574"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d87696e1f4a4cc3993bb34",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725892482887
        },
        "e-576": {
          id: "e-576",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-577"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|ef6a99ee-036e-d9f3-3f14-a73249340a14",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|ef6a99ee-036e-d9f3-3f14-a73249340a14",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725893188045
        },
        "e-578": {
          id: "e-578",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-579"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|534e8717-74f0-10d4-efa3-a544605a0105",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|534e8717-74f0-10d4-efa3-a544605a0105",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725894128556
        },
        "e-580": {
          id: "e-580",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-581"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|0939cbd5-347d-c4ca-be18-792027f5071e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|0939cbd5-347d-c4ca-be18-792027f5071e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725894471106
        },
        "e-582": {
          id: "e-582",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-583"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|d4c15118-a593-a924-4a64-530a0e353bb0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|d4c15118-a593-a924-4a64-530a0e353bb0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725894928398
        },
        "e-586": {
          id: "e-586",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-587"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|815485f0-957f-41d3-f758-ae057091e860",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|815485f0-957f-41d3-f758-ae057091e860",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725895813902
        },
        "e-588": {
          id: "e-588",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-589"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|815485f0-957f-41d3-f758-ae057091e863",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|815485f0-957f-41d3-f758-ae057091e863",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725895813902
        },
        "e-590": {
          id: "e-590",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-591"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|815485f0-957f-41d3-f758-ae057091e869",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|815485f0-957f-41d3-f758-ae057091e869",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725895813902
        },
        "e-592": {
          id: "e-592",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-593"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648928",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648928",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725896213300
        },
        "e-594": {
          id: "e-594",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-595"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c164892c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c164892c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725896213300
        },
        "e-596": {
          id: "e-596",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-597"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648930",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648930",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725896213300
        },
        "e-598": {
          id: "e-598",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-599"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648945",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648945",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725896213300
        },
        "e-600": {
          id: "e-600",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-601"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648a81",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648a81",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725896213300
        },
        "e-602": {
          id: "e-602",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-603"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648a86",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648a86",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725896213300
        },
        "e-604": {
          id: "e-604",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-605"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648a8e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648a8e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725896213300
        },
        "e-606": {
          id: "e-606",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-607"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648a9a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648a9a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725896213300
        },
        "e-608": {
          id: "e-608",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-609"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648a9d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|56a17d90-d180-bbfe-4dad-7629c1648a9d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725896213300
        },
        "e-611": {
          id: "e-611",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-14",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-610"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d87696e1f4a4cc3993bb34",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725896233859
        },
        "e-613": {
          id: "e-613",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-15",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-612"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d87696e1f4a4cc3993bb34",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725896243312
        },
        "e-615": {
          id: "e-615",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-17",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-614"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d87696e1f4a4cc3993bb34",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725896250877
        },
        "e-617": {
          id: "e-617",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-16",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-616"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d87696e1f4a4cc3993bb34",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725896275043
        },
        "e-618": {
          id: "e-618",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0fae7f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0fae7f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1725909392847
        },
        "e-621": {
          id: "e-621",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-622"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0faeb1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0faeb1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 5,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725909392847
        },
        "e-623": {
          id: "e-623",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-624"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|aaebc03f-e46f-3f7c-2339-07d139f860be",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|aaebc03f-e46f-3f7c-2339-07d139f860be",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725963790809
        },
        "e-624": {
          id: "e-624",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-623"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|aaebc03f-e46f-3f7c-2339-07d139f860be",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|aaebc03f-e46f-3f7c-2339-07d139f860be",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725963790809
        },
        "e-625": {
          id: "e-625",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-626"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|c957b891-c690-bde5-f18b-aa743132c1df",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|c957b891-c690-bde5-f18b-aa743132c1df",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725963802891
        },
        "e-626": {
          id: "e-626",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-625"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|c957b891-c690-bde5-f18b-aa743132c1df",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|c957b891-c690-bde5-f18b-aa743132c1df",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725963802891
        },
        "e-627": {
          id: "e-627",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-628"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|700751db-0baf-d3e2-ed4c-a1a9a36a3346",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|700751db-0baf-d3e2-ed4c-a1a9a36a3346",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725963807425
        },
        "e-628": {
          id: "e-628",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-627"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|700751db-0baf-d3e2-ed4c-a1a9a36a3346",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|700751db-0baf-d3e2-ed4c-a1a9a36a3346",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725963807425
        },
        "e-629": {
          id: "e-629",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-630"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|c6927312-ac6e-99d9-1a6d-0dceecaccc61",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|c6927312-ac6e-99d9-1a6d-0dceecaccc61",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725963808424
        },
        "e-630": {
          id: "e-630",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-629"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|c6927312-ac6e-99d9-1a6d-0dceecaccc61",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|c6927312-ac6e-99d9-1a6d-0dceecaccc61",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725963808424
        },
        "e-633": {
          id: "e-633",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-42",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-634"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|00ad20ef-47bb-aba3-ac57-b7c495785ae6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|00ad20ef-47bb-aba3-ac57-b7c495785ae6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1717581841176
        },
        "e-634": {
          id: "e-634",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-43",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-633"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|00ad20ef-47bb-aba3-ac57-b7c495785ae6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|00ad20ef-47bb-aba3-ac57-b7c495785ae6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1717581841176
        },
        "e-635": {
          id: "e-635",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-44",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-636"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            selector: ".pricing_dropdown.initial-close",
            originalId: "6659a7f75ca2c18081eab9b5|12d70965-0cda-4e48-e6fc-da46bd490f8e",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".pricing_dropdown.initial-close",
            originalId: "6659a7f75ca2c18081eab9b5|12d70965-0cda-4e48-e6fc-da46bd490f8e",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1717448606372
        },
        "e-636": {
          id: "e-636",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-45",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-635"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            selector: ".pricing_dropdown.initial-close",
            originalId: "6659a7f75ca2c18081eab9b5|12d70965-0cda-4e48-e6fc-da46bd490f8e",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".pricing_dropdown.initial-close",
            originalId: "6659a7f75ca2c18081eab9b5|12d70965-0cda-4e48-e6fc-da46bd490f8e",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1717448606376
        },
        "e-639": {
          id: "e-639",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-640"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|5ac4527c-9ea4-3c3c-56ec-d67a72cdc22b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|5ac4527c-9ea4-3c3c-56ec-d67a72cdc22b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725966959584
        },
        "e-640": {
          id: "e-640",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-639"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|5ac4527c-9ea4-3c3c-56ec-d67a72cdc22b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|5ac4527c-9ea4-3c3c-56ec-d67a72cdc22b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725966959584
        },
        "e-641": {
          id: "e-641",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-642"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|88bbe88c-4574-e086-1c4c-598a200cbfb6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|88bbe88c-4574-e086-1c4c-598a200cbfb6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725966963308
        },
        "e-642": {
          id: "e-642",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-641"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|88bbe88c-4574-e086-1c4c-598a200cbfb6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|88bbe88c-4574-e086-1c4c-598a200cbfb6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725966963308
        },
        "e-643": {
          id: "e-643",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-644"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|f235fac4-956e-11b9-0317-29b288bd92de",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|f235fac4-956e-11b9-0317-29b288bd92de",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725966968159
        },
        "e-644": {
          id: "e-644",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-643"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|f235fac4-956e-11b9-0317-29b288bd92de",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|f235fac4-956e-11b9-0317-29b288bd92de",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725966968159
        },
        "e-645": {
          id: "e-645",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-646"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|3c542f98-6019-6b7d-8ea7-9f47136be669",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|3c542f98-6019-6b7d-8ea7-9f47136be669",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725966973278
        },
        "e-646": {
          id: "e-646",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-645"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|3c542f98-6019-6b7d-8ea7-9f47136be669",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|3c542f98-6019-6b7d-8ea7-9f47136be669",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725966973278
        },
        "e-647": {
          id: "e-647",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-648"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|46c539cb-db12-f615-f80e-82211b79c4d1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|46c539cb-db12-f615-f80e-82211b79c4d1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725970807361
        },
        "e-648": {
          id: "e-648",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-647"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|46c539cb-db12-f615-f80e-82211b79c4d1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|46c539cb-db12-f615-f80e-82211b79c4d1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725970807361
        },
        "e-651": {
          id: "e-651",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-652"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|7a78fd8c-0d98-c274-4623-2fec557dac6e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|7a78fd8c-0d98-c274-4623-2fec557dac6e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725970850885
        },
        "e-652": {
          id: "e-652",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-651"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|7a78fd8c-0d98-c274-4623-2fec557dac6e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|7a78fd8c-0d98-c274-4623-2fec557dac6e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725970850885
        },
        "e-653": {
          id: "e-653",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-654"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|0d654966-629d-4d68-3584-a273ecd39381",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|0d654966-629d-4d68-3584-a273ecd39381",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725970851200
        },
        "e-654": {
          id: "e-654",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-653"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|0d654966-629d-4d68-3584-a273ecd39381",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|0d654966-629d-4d68-3584-a273ecd39381",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725970851200
        },
        "e-655": {
          id: "e-655",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-656"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|4e59dbb3-78ca-cfa8-babb-e6ba1e37f05e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|4e59dbb3-78ca-cfa8-babb-e6ba1e37f05e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1725972528848
        },
        "e-657": {
          id: "e-657",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-658"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|4e59dbb3-78ca-cfa8-babb-e6ba1e37f064",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|4e59dbb3-78ca-cfa8-babb-e6ba1e37f064",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725972528848
        },
        "e-658": {
          id: "e-658",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-657"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|4e59dbb3-78ca-cfa8-babb-e6ba1e37f064",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|4e59dbb3-78ca-cfa8-babb-e6ba1e37f064",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725972528848
        },
        "e-659": {
          id: "e-659",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-660"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a72f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a72f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725979795626
        },
        "e-660": {
          id: "e-660",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-659"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a72f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a72f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725979795626
        },
        "e-661": {
          id: "e-661",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-662"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a743",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a743",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725979795626
        },
        "e-662": {
          id: "e-662",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-661"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a743",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a743",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725979795626
        },
        "e-665": {
          id: "e-665",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-666"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a76f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a76f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725979795626
        },
        "e-666": {
          id: "e-666",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-665"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a76f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a76f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725979795626
        },
        "e-667": {
          id: "e-667",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-668"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a783",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a783",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725979795626
        },
        "e-668": {
          id: "e-668",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-667"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a783",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|1dfd455a-3cac-0fe6-73ec-70223da4a783",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725979795626
        },
        "e-669": {
          id: "e-669",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-42",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-670"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|e3680a28-8686-6cf1-84d6-485321936b22",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|e3680a28-8686-6cf1-84d6-485321936b22",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725984380879
        },
        "e-670": {
          id: "e-670",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-43",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-669"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|e3680a28-8686-6cf1-84d6-485321936b22",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|e3680a28-8686-6cf1-84d6-485321936b22",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725984380879
        },
        "e-671": {
          id: "e-671",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-672"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f598",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f598",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725986161831
        },
        "e-672": {
          id: "e-672",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-671"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f598",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f598",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725986161831
        },
        "e-673": {
          id: "e-673",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-674"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5a8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5a8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725986161831
        },
        "e-674": {
          id: "e-674",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-673"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5a8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5a8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725986161831
        },
        "e-677": {
          id: "e-677",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-678"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5c6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5c6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725986161831
        },
        "e-678": {
          id: "e-678",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-677"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5c6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5c6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725986161831
        },
        "e-679": {
          id: "e-679",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-680"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5d6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5d6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725986161831
        },
        "e-680": {
          id: "e-680",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-679"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5d6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|d68cac4a-b016-527a-5a66-637f1a96f5d6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725986161831
        },
        "e-681": {
          id: "e-681",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-682"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|6bc84ebb-59b3-ae7e-7272-5fe783930c3f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|6bc84ebb-59b3-ae7e-7272-5fe783930c3f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725996241455
        },
        "e-682": {
          id: "e-682",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-681"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|6bc84ebb-59b3-ae7e-7272-5fe783930c3f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|6bc84ebb-59b3-ae7e-7272-5fe783930c3f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1725996241455
        },
        "e-683": {
          id: "e-683",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-684"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "bf49efa2-f0da-de8c-b8af-f83302033576",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "bf49efa2-f0da-de8c-b8af-f83302033576",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726230233693
        },
        "e-685": {
          id: "e-685",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-686"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6a8ea2a7-6f70-dacf-eaec-e606256be4a4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6a8ea2a7-6f70-dacf-eaec-e606256be4a4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726230356287
        },
        "e-687": {
          id: "e-687",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-47",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-688"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "b25a7bb5-3b7b-645b-fb16-02d8c832b9d0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "b25a7bb5-3b7b-645b-fb16-02d8c832b9d0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726230469802
        },
        "e-699": {
          id: "e-699",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-700"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "b25a7bb5-3b7b-645b-fb16-02d8c832bb00",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "b25a7bb5-3b7b-645b-fb16-02d8c832bb00",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726231017864
        },
        "e-700": {
          id: "e-700",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-699"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "b25a7bb5-3b7b-645b-fb16-02d8c832bb00",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "b25a7bb5-3b7b-645b-fb16-02d8c832bb00",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726231017875
        },
        "e-701": {
          id: "e-701",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-702"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "b25a7bb5-3b7b-645b-fb16-02d8c832bb00",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "b25a7bb5-3b7b-645b-fb16-02d8c832bb00",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726231106777
        },
        "e-703": {
          id: "e-703",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-704"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd|092952a9-3601-e068-ec05-28ce3da20a6f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|092952a9-3601-e068-ec05-28ce3da20a6f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726231221435
        },
        "e-705": {
          id: "e-705",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-706"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "95c38729-4dda-d4e8-751b-32bc92e97dc1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "95c38729-4dda-d4e8-751b-32bc92e97dc1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726231266487
        },
        "e-706": {
          id: "e-706",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-705"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "95c38729-4dda-d4e8-751b-32bc92e97dc1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "95c38729-4dda-d4e8-751b-32bc92e97dc1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726231266487
        },
        "e-707": {
          id: "e-707",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-708"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "95c38729-4dda-d4e8-751b-32bc92e97dc1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "95c38729-4dda-d4e8-751b-32bc92e97dc1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726231308233
        },
        "e-709": {
          id: "e-709",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-710"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "b25a7bb5-3b7b-645b-fb16-02d8c832baf3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "b25a7bb5-3b7b-645b-fb16-02d8c832baf3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726235286381
        },
        "e-721": {
          id: "e-721",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-722"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d8bf541c243f8911f651fe|3e6c393d-a395-017e-87bc-d38bcdaac0e4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d8bf541c243f8911f651fe|3e6c393d-a395-017e-87bc-d38bcdaac0e4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1726252152236
        },
        "e-723": {
          id: "e-723",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-724"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|1cb68140-130c-5837-097b-ad1271969474",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|1cb68140-130c-5837-097b-ad1271969474",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 250,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726254971725
        },
        "e-725": {
          id: "e-725",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-726"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|625aad0e-0da8-4906-55c5-eeb7b2c32934",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|625aad0e-0da8-4906-55c5-eeb7b2c32934",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 1,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726254986500
        },
        "e-727": {
          id: "e-727",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-728"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf069776465bbf134df106|b9b7a719-878f-101e-876f-93bd9510d60d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|b9b7a719-878f-101e-876f-93bd9510d60d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726255225846
        },
        "e-729": {
          id: "e-729",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-730"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cf069776465bbf134df106|2b579745-37c2-86bf-d257-a62f2fd1f3cb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|2b579745-37c2-86bf-d257-a62f2fd1f3cb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726255246948
        },
        "e-731": {
          id: "e-731",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-732"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0fae8a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0fae8a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 250,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726255417518
        },
        "e-733": {
          id: "e-733",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-734"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0fae8c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0fae8c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 1,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726255431588
        },
        "e-735": {
          id: "e-735",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-736"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d8bf541c243f8911f651fe|e5aa9442-eda1-4b3a-9b0e-05107becf09f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d8bf541c243f8911f651fe|e5aa9442-eda1-4b3a-9b0e-05107becf09f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 250,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726255627241
        },
        "e-737": {
          id: "e-737",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-738"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d8bf541c243f8911f651fe|8368c9f6-bf85-5bd8-6c5c-da913cb4e15f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d8bf541c243f8911f651fe|8368c9f6-bf85-5bd8-6c5c-da913cb4e15f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 1,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726255640399
        },
        "e-739": {
          id: "e-739",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInLeft",
              autoStopEventId: "e-740"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d8bf541c243f8911f651fe|026370ea-894f-34a1-b1f8-02e85e8875f2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d8bf541c243f8911f651fe|026370ea-894f-34a1-b1f8-02e85e8875f2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: "LEFT",
            effectIn: !0
          },
          createdOn: 1726255657837
        },
        "e-741": {
          id: "e-741",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInRight",
              autoStopEventId: "e-742"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d8bf541c243f8911f651fe|952c0950-446f-102b-b65f-103272eacbe5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d8bf541c243f8911f651fe|952c0950-446f-102b-b65f-103272eacbe5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: "RIGHT",
            effectIn: !0
          },
          createdOn: 1726255674834
        },
        "e-743": {
          id: "e-743",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-744"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0fae79",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0fae79",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726255758264
        },
        "e-745": {
          id: "e-745",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-746"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0fae7f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d8bf541c243f8911f651fe|4501ec3d-2548-6c33-50f4-c2c4fb0fae7f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 200,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726255778070
        },
        "e-747": {
          id: "e-747",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-748"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|e21fc64a-1d6a-fda7-378a-09289b679217",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|e21fc64a-1d6a-fda7-378a-09289b679217",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 250,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726259659786
        },
        "e-749": {
          id: "e-749",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-750"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66cf069776465bbf134df106|27100e28-e98b-43c4-b4ca-9630270c366d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cf069776465bbf134df106|27100e28-e98b-43c4-b4ca-9630270c366d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726259681878
        },
        "e-759": {
          id: "e-759",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-23",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-760"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|1650a22e-c86f-d416-c53b-eeb434dc9ab9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|1650a22e-c86f-d416-c53b-eeb434dc9ab9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726274666290
        },
        "e-760": {
          id: "e-760",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-24",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-759"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|1650a22e-c86f-d416-c53b-eeb434dc9ab9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|1650a22e-c86f-d416-c53b-eeb434dc9ab9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726274666293
        },
        "e-761": {
          id: "e-761",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-762"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66e0ac6bddfd09be10d45cd2|c3c95f4c-7282-d916-4aab-ad361572e695",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66e0ac6bddfd09be10d45cd2|c3c95f4c-7282-d916-4aab-ad361572e695",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1726276877891
        },
        "e-763": {
          id: "e-763",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-929"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|0d0fe09f-ba69-f83d-3d3e-15442a60058c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|0d0fe09f-ba69-f83d-3d3e-15442a60058c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1726277006276
        },
        "e-765": {
          id: "e-765",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-927"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|66833e98-211e-5104-70bb-905c367e3936",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|66833e98-211e-5104-70bb-905c367e3936",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1726277078509
        },
        "e-767": {
          id: "e-767",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-768"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|00d8b762-38ad-9fe5-0ce5-c227f1798235",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|00d8b762-38ad-9fe5-0ce5-c227f1798235",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1726278457563
        },
        "e-781": {
          id: "e-781",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-23",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-782"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|3f0c417e-cfb9-ecb3-a1aa-8470df02fd22",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|3f0c417e-cfb9-ecb3-a1aa-8470df02fd22",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726280928007
        },
        "e-782": {
          id: "e-782",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-24",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-781"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|3f0c417e-cfb9-ecb3-a1aa-8470df02fd22",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|3f0c417e-cfb9-ecb3-a1aa-8470df02fd22",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726280928014
        },
        "e-783": {
          id: "e-783",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-784"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|1650a22e-c86f-d416-c53b-eeb434dc9ab1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|1650a22e-c86f-d416-c53b-eeb434dc9ab1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726281188444
        },
        "e-784": {
          id: "e-784",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-783"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|1650a22e-c86f-d416-c53b-eeb434dc9ab1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|1650a22e-c86f-d416-c53b-eeb434dc9ab1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726281188451
        },
        "e-785": {
          id: "e-785",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-786"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c59b62a5bd50dfb21ff|4ab69dd9-a14c-0f77-6f6b-a98fee1127c1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c59b62a5bd50dfb21ff|4ab69dd9-a14c-0f77-6f6b-a98fee1127c1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726425778245
        },
        "e-787": {
          id: "e-787",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-788"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18cecb95b798eeebf75c0|aa6bc9bd-7363-20ff-0be2-3c950706921e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|aa6bc9bd-7363-20ff-0be2-3c950706921e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726433666028
        },
        "e-789": {
          id: "e-789",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-790"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18cecb95b798eeebf75c0|5a4f30f8-b3aa-3af6-0029-a9ccef9942ce",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|5a4f30f8-b3aa-3af6-0029-a9ccef9942ce",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726433690940
        },
        "e-791": {
          id: "e-791",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-792"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18cecb95b798eeebf75c0|80c5a560-bb31-f7b5-1830-623448a623a1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|80c5a560-bb31-f7b5-1830-623448a623a1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726433728674
        },
        "e-793": {
          id: "e-793",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-794"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18cecb95b798eeebf75c0|1a6ce9c2-b569-7c58-8eab-bc07f5ded4fa",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|1a6ce9c2-b569-7c58-8eab-bc07f5ded4fa",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726433761191
        },
        "e-795": {
          id: "e-795",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-796"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18cecb95b798eeebf75c0|45b34b61-c973-6719-c759-cc390863e3f2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|45b34b61-c973-6719-c759-cc390863e3f2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726433793948
        },
        "e-797": {
          id: "e-797",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-798"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18cecb95b798eeebf75c0|99005b3e-7402-0ee3-25d4-62e3792b2bbb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18cecb95b798eeebf75c0|99005b3e-7402-0ee3-25d4-62e3792b2bbb",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726433817839
        },
        "e-799": {
          id: "e-799",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-800"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|a251dadc-a32c-03c2-2940-f7ddee86d784",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|a251dadc-a32c-03c2-2940-f7ddee86d784",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726434343982
        },
        "e-801": {
          id: "e-801",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-802"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|0939cbd5-347d-c4ca-be18-792027f50726",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|0939cbd5-347d-c4ca-be18-792027f50726",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726434371164
        },
        "e-803": {
          id: "e-803",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-804"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d87696e1f4a4cc3993bb34|9e7d86b9-79c0-f153-40d4-9f34869df512",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d87696e1f4a4cc3993bb34|9e7d86b9-79c0-f153-40d4-9f34869df512",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726434386501
        },
        "e-805": {
          id: "e-805",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-31",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-806"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c5f64a73f147491ef4baf5|1f1f75f6-1ef3-8548-363a-f38feb494836",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c5f64a73f147491ef4baf5|1f1f75f6-1ef3-8548-363a-f38feb494836",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726448410130
        },
        "e-807": {
          id: "e-807",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-31",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-808"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c48e46b9ea63b01cc24f14|dd99e6ed-4641-1494-6223-cb2754d1470a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c48e46b9ea63b01cc24f14|dd99e6ed-4641-1494-6223-cb2754d1470a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726452252705
        },
        "e-817": {
          id: "e-817",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-818"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|c4f79129-1cc5-54b7-0c90-098eebcc8564",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|c4f79129-1cc5-54b7-0c90-098eebcc8564",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453033684
        },
        "e-818": {
          id: "e-818",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-817"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|c4f79129-1cc5-54b7-0c90-098eebcc8564",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|c4f79129-1cc5-54b7-0c90-098eebcc8564",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453033684
        },
        "e-823": {
          id: "e-823",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-824"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|90441568-475b-3221-bb4b-ed52ab766ce6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|90441568-475b-3221-bb4b-ed52ab766ce6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453065800
        },
        "e-824": {
          id: "e-824",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-823"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|90441568-475b-3221-bb4b-ed52ab766ce6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|90441568-475b-3221-bb4b-ed52ab766ce6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453065800
        },
        "e-845": {
          id: "e-845",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-846"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|556d3b7a-3fb9-3c12-ae00-caa7a91fcf07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|556d3b7a-3fb9-3c12-ae00-caa7a91fcf07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453340072
        },
        "e-846": {
          id: "e-846",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-845"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|556d3b7a-3fb9-3c12-ae00-caa7a91fcf07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|556d3b7a-3fb9-3c12-ae00-caa7a91fcf07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453340072
        },
        "e-847": {
          id: "e-847",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-848"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79beed",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79beed",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726453622232
        },
        "e-849": {
          id: "e-849",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInLeft",
              autoStopEventId: "e-850"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79beed",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79beed",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "LEFT",
            effectIn: !0
          },
          createdOn: 1726453622232
        },
        "e-855": {
          id: "e-855",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-856"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bef6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bef6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453622232
        },
        "e-856": {
          id: "e-856",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-855"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bef6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bef6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453622232
        },
        "e-861": {
          id: "e-861",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-862"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bf06",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bf06",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453622232
        },
        "e-862": {
          id: "e-862",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-861"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bf06",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bf06",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453622232
        },
        "e-867": {
          id: "e-867",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-868"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bf16",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bf16",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453622232
        },
        "e-868": {
          id: "e-868",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-867"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bf16",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b566efd97de05ce88bb635|b65c3691-1d4d-86b3-9c4e-7ef4de79bf16",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726453622232
        },
        "e-869": {
          id: "e-869",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-870"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|ef2c2a9a-7a2c-4e75-7de0-ec1e3c1e46ec",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|ef2c2a9a-7a2c-4e75-7de0-ec1e3c1e46ec",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726487967417
        },
        "e-871": {
          id: "e-871",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-872"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|ef2c2a9a-7a2c-4e75-7de0-ec1e3c1e46f0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|ef2c2a9a-7a2c-4e75-7de0-ec1e3c1e46f0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726487967417
        },
        "e-873": {
          id: "e-873",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-874"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|ef2c2a9a-7a2c-4e75-7de0-ec1e3c1e46f2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|ef2c2a9a-7a2c-4e75-7de0-ec1e3c1e46f2",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726487967417
        },
        "e-875": {
          id: "e-875",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-876"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|a97d7bd4-e791-928b-ac03-158532def84a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|a97d7bd4-e791-928b-ac03-158532def84a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726488020551
        },
        "e-876": {
          id: "e-876",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-875"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|a97d7bd4-e791-928b-ac03-158532def84a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|a97d7bd4-e791-928b-ac03-158532def84a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726488020551
        },
        "e-877": {
          id: "e-877",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-878"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|3da01a4a-f96b-7492-ed36-d724eaf25cf9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|3da01a4a-f96b-7492-ed36-d724eaf25cf9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488061112
        },
        "e-879": {
          id: "e-879",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-4",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-880"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|3da01a4a-f96b-7492-ed36-d724eaf25d30",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|3da01a4a-f96b-7492-ed36-d724eaf25d30",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726488061112
        },
        "e-880": {
          id: "e-880",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-5",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-879"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|3da01a4a-f96b-7492-ed36-d724eaf25d30",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|3da01a4a-f96b-7492-ed36-d724eaf25d30",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726488061112
        },
        "e-881": {
          id: "e-881",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-882"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|3da01a4a-f96b-7492-ed36-d724eaf25d5d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|3da01a4a-f96b-7492-ed36-d724eaf25d5d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1726488061112
        },
        "e-883": {
          id: "e-883",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-884"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|41fa2b02-59e7-f884-ea22-e4139556ae7a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|41fa2b02-59e7-f884-ea22-e4139556ae7a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488128795
        },
        "e-885": {
          id: "e-885",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-886"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|41fa2b02-59e7-f884-ea22-e4139556ae7d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|41fa2b02-59e7-f884-ea22-e4139556ae7d",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488128795
        },
        "e-887": {
          id: "e-887",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "SLIDE_EFFECT",
            instant: !1,
            config: {
              actionListId: "slideInBottom",
              autoStopEventId: "e-888"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|41fa2b02-59e7-f884-ea22-e4139556ae80",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|41fa2b02-59e7-f884-ea22-e4139556ae80",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 4,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: "BOTTOM",
            effectIn: !0
          },
          createdOn: 1726488128795
        },
        "e-889": {
          id: "e-889",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-890"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|9f1bbda1-dfb4-5345-81c0-e87141a6d7d0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|9f1bbda1-dfb4-5345-81c0-e87141a6d7d0",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488595113
        },
        "e-891": {
          id: "e-891",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-892"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|9f1bbda1-dfb4-5345-81c0-e87141a6d7d3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|9f1bbda1-dfb4-5345-81c0-e87141a6d7d3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488595113
        },
        "e-893": {
          id: "e-893",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-894"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|9f1bbda1-dfb4-5345-81c0-e87141a6d7d5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|9f1bbda1-dfb4-5345-81c0-e87141a6d7d5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488595113
        },
        "e-895": {
          id: "e-895",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-896"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|1d981bff-879b-3bdf-1b88-da790d36ef8e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|1d981bff-879b-3bdf-1b88-da790d36ef8e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488662646
        },
        "e-897": {
          id: "e-897",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-898"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc13f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc13f",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488991384
        },
        "e-899": {
          id: "e-899",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-900"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc143",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc143",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488991384
        },
        "e-901": {
          id: "e-901",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-902"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc147",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc147",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488991384
        },
        "e-903": {
          id: "e-903",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-904"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc15c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc15c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488991384
        },
        "e-905": {
          id: "e-905",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-906"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc16b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc16b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488991384
        },
        "e-907": {
          id: "e-907",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-908"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc170",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc170",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488991384
        },
        "e-909": {
          id: "e-909",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-910"
            }
          },
          mediaQueries: ["main"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc178",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|841ea6c1-16b0-bcba-ede6-78eb85fcc178",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726488991384
        },
        "e-911": {
          id: "e-911",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-912"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|7d6b35b9-f72a-919f-72f5-4332301a64d5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|7d6b35b9-f72a-919f-72f5-4332301a64d5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726489326451
        },
        "e-913": {
          id: "e-913",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-914"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|7d6b35b9-f72a-919f-72f5-4332301a64d8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|7d6b35b9-f72a-919f-72f5-4332301a64d8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 350,
            direction: null,
            effectIn: !0
          },
          createdOn: 1726489326451
        },
        "e-915": {
          id: "e-915",
          name: "",
          animationType: "custom",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-48",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-916"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|4b5d4123-592e-4096-4c67-455284559676",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|4b5d4123-592e-4096-4c67-455284559676",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 0,
            scrollOffsetUnit: "%",
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726491015162
        },
        "e-918": {
          id: "e-918",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-917"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726491194508
        },
        "e-919": {
          id: "e-919",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_START",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-25",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-920"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1726491215960
        },
        "e-922": {
          id: "e-922",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|e29aaf4a-35ab-d34f-89ec-9c335602f6a3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|e29aaf4a-35ab-d34f-89ec-9c335602f6a3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1726542040295
        },
        "e-923": {
          id: "e-923",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|bf51f74d-0f0f-cacf-f9ca-6c358231716c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|bf51f74d-0f0f-cacf-f9ca-6c358231716c",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1726542112274
        },
        "e-924": {
          id: "e-924",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|40621170-7f48-31b3-5e4a-85f222f66878",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|40621170-7f48-31b3-5e4a-85f222f66878",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1726542126924
        },
        "e-925": {
          id: "e-925",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "664e31bc72082255f0e532dd|6b7bad2a-7968-ed4d-19f6-6cec3f9ddbe8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "664e31bc72082255f0e532dd|6b7bad2a-7968-ed4d-19f6-6cec3f9ddbe8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1726542204967
        },
        "e-926": {
          id: "e-926",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66e0ac6bddfd09be10d45cd2|3eff31b9-9db0-1680-ecf3-399061e2e1ef",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66e0ac6bddfd09be10d45cd2|3eff31b9-9db0-1680-ecf3-399061e2e1ef",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1726542217979
        },
        "e-927": {
          id: "e-927",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-49",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-928"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "61632ce5-54da-74bf-b4ba-1dbb084e5848",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "61632ce5-54da-74bf-b4ba-1dbb084e5848",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1727088349296
        },
        "e-929": {
          id: "e-929",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-50",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-930"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "61632ce5-54da-74bf-b4ba-1dbb084e5876",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "61632ce5-54da-74bf-b4ba-1dbb084e5876",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1727088349296
        },
        "e-933": {
          id: "e-933",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-934"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66b8e0336a9e61a39e9214fa|7d6b35b9-f72a-919f-72f5-4332301a64d6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66b8e0336a9e61a39e9214fa|7d6b35b9-f72a-919f-72f5-4332301a64d6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1727961521135
        },
        "e-935": {
          id: "e-935",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-47",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-936"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|67f819a3-bcd2-20fa-d9ca-ccaaa19693e7",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|67f819a3-bcd2-20fa-d9ca-ccaaa19693e7",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1730106732790
        },
        "e-937": {
          id: "e-937",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-938"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc76793ce6691964781cf1|1650a22e-c86f-d416-c53b-eeb434dc9ab1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc76793ce6691964781cf1|1650a22e-c86f-d416-c53b-eeb434dc9ab1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1730106909171
        },
        "e-939": {
          id: "e-939",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-940"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|c4ccc982-a1e7-9644-210b-ce3ea3afbb68",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|c4ccc982-a1e7-9644-210b-ce3ea3afbb68",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1730120910833
        },
        "e-940": {
          id: "e-940",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-2",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-939"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|c4ccc982-a1e7-9644-210b-ce3ea3afbb68",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|c4ccc982-a1e7-9644-210b-ce3ea3afbb68",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1730120910833
        },
        "e-941": {
          id: "e-941",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-942"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|c4ccc982-a1e7-9644-210b-ce3ea3afbb68",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|c4ccc982-a1e7-9644-210b-ce3ea3afbb68",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1730120910833
        },
        "e-945": {
          id: "e-945",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-47",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-946"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66cc768971fae5b313e15465|03f95f4c-2040-4dc7-6e27-11544e708fc6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66cc768971fae5b313e15465|03f95f4c-2040-4dc7-6e27-11544e708fc6",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1730120938614
        },
        "e-989": {
          id: "e-989",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-990"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|5cd0b8f1-4f95-daf0-3ef3-dcffcf5f22ed",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|5cd0b8f1-4f95-daf0-3ef3-dcffcf5f22ed",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1732606725838
        },
        "e-991": {
          id: "e-991",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-992"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|5cd0b8f1-4f95-daf0-3ef3-dcffcf5f22f1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|5cd0b8f1-4f95-daf0-3ef3-dcffcf5f22f1",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 300,
            direction: null,
            effectIn: !0
          },
          createdOn: 1732606725838
        },
        "e-993": {
          id: "e-993",
          name: "",
          animationType: "preset",
          eventTypeId: "SCROLL_INTO_VIEW",
          action: {
            id: "",
            actionTypeId: "FADE_EFFECT",
            instant: !1,
            config: {
              actionListId: "fadeIn",
              autoStopEventId: "e-994"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66d18c6ce3f0468983c1f747|5cd0b8f1-4f95-daf0-3ef3-dcffcf5f22f3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66d18c6ce3f0468983c1f747|5cd0b8f1-4f95-daf0-3ef3-dcffcf5f22f3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: 2,
            scrollOffsetUnit: "%",
            delay: 400,
            direction: null,
            effectIn: !0
          },
          createdOn: 1732606725838
        },
        "e-997": {
          id: "e-997",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-51",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-998"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66e0ac6bddfd09be10d45cd2|ee938e4e-3b4a-fc81-964f-56cea6d02135",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66e0ac6bddfd09be10d45cd2|ee938e4e-3b4a-fc81-964f-56cea6d02135",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1733472199522
        },
        "e-999": {
          id: "e-999",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-4",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1000"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66e0ac6bddfd09be10d45cd2|fa63f501-d739-557a-7c84-e4e0dfca7015",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66e0ac6bddfd09be10d45cd2|fa63f501-d739-557a-7c84-e4e0dfca7015",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1733481453450
        },
        "e-1000": {
          id: "e-1000",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-5",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-999"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66e0ac6bddfd09be10d45cd2|fa63f501-d739-557a-7c84-e4e0dfca7015",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66e0ac6bddfd09be10d45cd2|fa63f501-d739-557a-7c84-e4e0dfca7015",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1733481453450
        },
        "e-1001": {
          id: "e-1001",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-6",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1002"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66e0ac6bddfd09be10d45cd2|fa63f501-d739-557a-7c84-e4e0dfca7043",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66e0ac6bddfd09be10d45cd2|fa63f501-d739-557a-7c84-e4e0dfca7043",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1733481453450
        },
        "e-1002": {
          id: "e-1002",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-7",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1001"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66e0ac6bddfd09be10d45cd2|fa63f501-d739-557a-7c84-e4e0dfca7043",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66e0ac6bddfd09be10d45cd2|fa63f501-d739-557a-7c84-e4e0dfca7043",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1733481453450
        },
        "e-1004": {
          id: "e-1004",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1003"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "675bf2b311fd4fb91c79b71d",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "675bf2b311fd4fb91c79b71d",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734090289863
        },
        "e-1006": {
          id: "e-1006",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-14",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1005"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "675bf2b311fd4fb91c79b71d",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "675bf2b311fd4fb91c79b71d",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734098083528
        },
        "e-1008": {
          id: "e-1008",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-17",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1007"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "675bf2b311fd4fb91c79b71d",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "675bf2b311fd4fb91c79b71d",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734098115087
        },
        "e-1010": {
          id: "e-1010",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-15",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1009"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "675bf2b311fd4fb91c79b71d",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "675bf2b311fd4fb91c79b71d",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734098140607
        },
        "e-1012": {
          id: "e-1012",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-16",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1011"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "675bf2b311fd4fb91c79b71d",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "675bf2b311fd4fb91c79b71d",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734098152516
        },
        "e-1013": {
          id: "e-1013",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1014"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "675bf2b311fd4fb91c79b71d|ee5c9674-d673-dec9-7a41-172548115573",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "675bf2b311fd4fb91c79b71d|ee5c9674-d673-dec9-7a41-172548115573",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734171507293
        },
        "e-1014": {
          id: "e-1014",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1013"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "675bf2b311fd4fb91c79b71d|ee5c9674-d673-dec9-7a41-172548115573",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "675bf2b311fd4fb91c79b71d|ee5c9674-d673-dec9-7a41-172548115573",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734171507293
        },
        "e-1015": {
          id: "e-1015",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1016"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "675bf2b311fd4fb91c79b71d|fd01bbf7-5478-1e8b-15f2-037e6fa7ea17",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "675bf2b311fd4fb91c79b71d|fd01bbf7-5478-1e8b-15f2-037e6fa7ea17",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734174633766
        },
        "e-1017": {
          id: "e-1017",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-53",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1018"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913|64bc9096-5bd4-2185-fb6e-a9a4e5be13b7",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913|64bc9096-5bd4-2185-fb6e-a9a4e5be13b7",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734596486904
        },
        "e-1018": {
          id: "e-1018",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-54",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1017"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913|64bc9096-5bd4-2185-fb6e-a9a4e5be13b7",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913|64bc9096-5bd4-2185-fb6e-a9a4e5be13b7",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734596486904
        },
        "e-1019": {
          id: "e-1019",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-55",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1020"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913|64bc9096-5bd4-2185-fb6e-a9a4e5be13b7",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913|64bc9096-5bd4-2185-fb6e-a9a4e5be13b7",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734596486904
        },
        "e-1021": {
          id: "e-1021",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-53",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1022"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "675bf2b311fd4fb91c79b71d|e5925718-e506-48fa-05e2-0f7f61e10be8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "675bf2b311fd4fb91c79b71d|e5925718-e506-48fa-05e2-0f7f61e10be8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734680825082
        },
        "e-1022": {
          id: "e-1022",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-54",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1021"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "675bf2b311fd4fb91c79b71d|e5925718-e506-48fa-05e2-0f7f61e10be8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "675bf2b311fd4fb91c79b71d|e5925718-e506-48fa-05e2-0f7f61e10be8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734680825082
        },
        "e-1023": {
          id: "e-1023",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-55",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1024"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "675bf2b311fd4fb91c79b71d|e5925718-e506-48fa-05e2-0f7f61e10be8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "675bf2b311fd4fb91c79b71d|e5925718-e506-48fa-05e2-0f7f61e10be8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734680825082
        },
        "e-1031": {
          id: "e-1031",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1032"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913|12787c41-59f0-d843-c162-93baedbde871",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913|12787c41-59f0-d843-c162-93baedbde871",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734683167353
        },
        "e-1033": {
          id: "e-1033",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1034"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913|4cf5a1ec-eb40-6da0-98c5-b90808ce8384",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913|4cf5a1ec-eb40-6da0-98c5-b90808ce8384",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734683786942
        },
        "e-1035": {
          id: "e-1035",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1036"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913|b01ad6ec-6d7e-8b41-63c2-4c2a3caaf176",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913|b01ad6ec-6d7e-8b41-63c2-4c2a3caaf176",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734684311860
        },
        "e-1038": {
          id: "e-1038",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-14",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1037"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734687882146
        },
        "e-1040": {
          id: "e-1040",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-17",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1039"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734687900505
        },
        "e-1042": {
          id: "e-1042",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-15",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1041"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734687910898
        },
        "e-1044": {
          id: "e-1044",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-16",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1043"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734687923300
        },
        "e-1047": {
          id: "e-1047",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1048"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913|9b1853af-32cd-ffe0-d520-f8c754385c0b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913|9b1853af-32cd-ffe0-d520-f8c754385c0b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734690428738
        },
        "e-1051": {
          id: "e-1051",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-58",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1052"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6763cd6e6c9bf69e5ea25913|19bd5464-176b-8bbf-1773-bc9ab1d96074",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6763cd6e6c9bf69e5ea25913|19bd5464-176b-8bbf-1773-bc9ab1d96074",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1734692520309
        },
        "e-1057": {
          id: "e-1057",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1058"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "679b420142aaaff442d0771e|12787c41-59f0-d843-c162-93baedbde871",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "679b420142aaaff442d0771e|12787c41-59f0-d843-c162-93baedbde871",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1738228228749
        },
        "e-1059": {
          id: "e-1059",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1060"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "679b420142aaaff442d0771e|4cf5a1ec-eb40-6da0-98c5-b90808ce8384",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "679b420142aaaff442d0771e|4cf5a1ec-eb40-6da0-98c5-b90808ce8384",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1738228228749
        },
        "e-1061": {
          id: "e-1061",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1062"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "679b420142aaaff442d0771e|b01ad6ec-6d7e-8b41-63c2-4c2a3caaf176",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "679b420142aaaff442d0771e|b01ad6ec-6d7e-8b41-63c2-4c2a3caaf176",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1738228228749
        },
        "e-1064": {
          id: "e-1064",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-14",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1063"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "679b420142aaaff442d0771e",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "679b420142aaaff442d0771e",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1738228228749
        },
        "e-1066": {
          id: "e-1066",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-17",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1065"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "679b420142aaaff442d0771e",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "679b420142aaaff442d0771e",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1738228228749
        },
        "e-1068": {
          id: "e-1068",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-15",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1067"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "679b420142aaaff442d0771e",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "679b420142aaaff442d0771e",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1738228228749
        },
        "e-1070": {
          id: "e-1070",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-16",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1069"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "679b420142aaaff442d0771e",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "679b420142aaaff442d0771e",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1738228228749
        },
        "e-1071": {
          id: "e-1071",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1072"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "679b420142aaaff442d0771e|9b1853af-32cd-ffe0-d520-f8c754385c0b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "679b420142aaaff442d0771e|9b1853af-32cd-ffe0-d520-f8c754385c0b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1738228228749
        },
        "e-1073": {
          id: "e-1073",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-58",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1074"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "679b420142aaaff442d0771e|19bd5464-176b-8bbf-1773-bc9ab1d96074",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "679b420142aaaff442d0771e|19bd5464-176b-8bbf-1773-bc9ab1d96074",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1738228228749
        },
        "e-1075": {
          id: "e-1075",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1076"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "679b420142aaaff442d0771e|7f9fa3c7-682c-1183-3c6b-614e9803b978",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "679b420142aaaff442d0771e|7f9fa3c7-682c-1183-3c6b-614e9803b978",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1738312478926
        },
        "e-1077": {
          id: "e-1077",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "679b420142aaaff442d0771e|736212c3-1979-329b-ed82-4b83280de929",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "679b420142aaaff442d0771e|736212c3-1979-329b-ed82-4b83280de929",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1738318146258
        },
        "e-1078": {
          id: "e-1078",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_MOVE",
          action: {
            id: "",
            actionTypeId: "GENERAL_CONTINUOUS_ACTION",
            config: {
              actionListId: "a-3",
              affectedElements: {},
              duration: 0
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "67a9fd3b9a3b0fbd378edf76|68a54096-134d-9c13-f70c-1e8d5e7a8ac9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "67a9fd3b9a3b0fbd378edf76|68a54096-134d-9c13-f70c-1e8d5e7a8ac9",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: [{
            continuousParameterGroupId: "a-3-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }, {
            continuousParameterGroupId: "a-3-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: !1,
            smoothing: 50,
            restingState: 50
          }],
          createdOn: 1739193832951
        },
        "e-1079": {
          id: "e-1079",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1080"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "67a9fd3b9a3b0fbd378edf76|68a54096-134d-9c13-f70c-1e8d5e7a8ae4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "67a9fd3b9a3b0fbd378edf76|68a54096-134d-9c13-f70c-1e8d5e7a8ae4",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1739193832951
        },
        "e-1081": {
          id: "e-1081",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1082"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "67a9fd3b9a3b0fbd378edf76|68a54096-134d-9c13-f70c-1e8d5e7a8b3a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "67a9fd3b9a3b0fbd378edf76|68a54096-134d-9c13-f70c-1e8d5e7a8b3a",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1739193832951
        },
        "e-1083": {
          id: "e-1083",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1084"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "67a9fd3b9a3b0fbd378edf76|68a54096-134d-9c13-f70c-1e8d5e7a8bb3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "67a9fd3b9a3b0fbd378edf76|68a54096-134d-9c13-f70c-1e8d5e7a8bb3",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1739193832951
        },
        "e-1087": {
          id: "e-1087",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-46",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1088"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "67a9fd3b9a3b0fbd378edf76|68a54096-134d-9c13-f70c-1e8d5e7a8db8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "67a9fd3b9a3b0fbd378edf76|68a54096-134d-9c13-f70c-1e8d5e7a8db8",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1739193832951
        },
        "e-1089": {
          id: "e-1089",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-58",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1090"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "67a9fd3b9a3b0fbd378edf76|b30872d2-a004-5153-6c8b-2e38005b9d14",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "67a9fd3b9a3b0fbd378edf76|b30872d2-a004-5153-6c8b-2e38005b9d14",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1739194298495
        },
        "e-1092": {
          id: "e-1092",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-14",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1091"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "67a9fd3b9a3b0fbd378edf76",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "67a9fd3b9a3b0fbd378edf76",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1739197523300
        },
        "e-1094": {
          id: "e-1094",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-17",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1093"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "67a9fd3b9a3b0fbd378edf76",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "67a9fd3b9a3b0fbd378edf76",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1739197537760
        },
        "e-1096": {
          id: "e-1096",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-15",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1095"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "67a9fd3b9a3b0fbd378edf76",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "67a9fd3b9a3b0fbd378edf76",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1739197551097
        },
        "e-1098": {
          id: "e-1098",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-16",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1097"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "67a9fd3b9a3b0fbd378edf76",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "67a9fd3b9a3b0fbd378edf76",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !0,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1739197560873
        },
        "e-1099": {
          id: "e-1099",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-63",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1100"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebdb6b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebdb6b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1744207534845
        },
        "e-1100": {
          id: "e-1100",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OUT",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-64",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1099"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebdb6b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebdb6b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1744207534845
        },
        "e-1101": {
          id: "e-1101",
          name: "",
          animationType: "preset",
          eventTypeId: "DROPDOWN_OPEN",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-65",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1102"
            }
          },
          mediaQueries: ["main"],
          target: {
            selector: ".nav_dropdown",
            originalId: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebda60",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".nav_dropdown",
            originalId: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebda60",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1744207534845
        },
        "e-1102": {
          id: "e-1102",
          name: "",
          animationType: "preset",
          eventTypeId: "DROPDOWN_CLOSE",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-66",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1101"
            }
          },
          mediaQueries: ["main"],
          target: {
            selector: ".nav_dropdown",
            originalId: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebda60",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".nav_dropdown",
            originalId: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebda60",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1744207534845
        },
        "e-1103": {
          id: "e-1103",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_OVER",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-67",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1104"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            selector: ".flex-horizontal-left-center.gap-18",
            originalId: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebdaaa",
            appliesTo: "CLASS"
          },
          targets: [{
            selector: ".flex-horizontal-left-center.gap-18",
            originalId: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebdaaa",
            appliesTo: "CLASS"
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1744207534845
        },
        "e-1105": {
          id: "e-1105",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-68",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1106"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebdb73",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebdb73",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1744207534845
        },
        "e-1106": {
          id: "e-1106",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-69",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1105"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebdb73",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "66c73e3ce68157eaaa97b1ea|a055dfa4-6beb-026e-fb81-093560ebdb73",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1744207534845
        },
        "e-1107": {
          id: "e-1107",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-70",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1108"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "35bb9e57-b03a-f6e4-6047-e28a141742ed",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "35bb9e57-b03a-f6e4-6047-e28a141742ed",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1744209287338
        },
        "e-1111": {
          id: "e-1111",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1112"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "67a9fd3b9a3b0fbd378edf76|116420e8-055a-3186-2dd8-995fff550a30",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "67a9fd3b9a3b0fbd378edf76|116420e8-055a-3186-2dd8-995fff550a30",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1748260820469
        },
        "e-1113": {
          id: "e-1113",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-10",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1114"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6836c8ea2a01b669e79d1574|d16f2498-7be6-91af-4768-8b40c67cad07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6836c8ea2a01b669e79d1574|d16f2498-7be6-91af-4768-8b40c67cad07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1748501742848
        },
        "e-1114": {
          id: "e-1114",
          name: "",
          animationType: "custom",
          eventTypeId: "MOUSE_SECOND_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-11",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1113"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6836c8ea2a01b669e79d1574|d16f2498-7be6-91af-4768-8b40c67cad07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6836c8ea2a01b669e79d1574|d16f2498-7be6-91af-4768-8b40c67cad07",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1748501742853
        },
        "e-1116": {
          id: "e-1116",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1115"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6836c8ea2a01b669e79d1574",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6836c8ea2a01b669e79d1574",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1748506385501
        },
        "e-1118": {
          id: "e-1118",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-14",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1117"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6836c8ea2a01b669e79d1574",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6836c8ea2a01b669e79d1574",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1748506406290
        },
        "e-1120": {
          id: "e-1120",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-17",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1119"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6836c8ea2a01b669e79d1574",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6836c8ea2a01b669e79d1574",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1748506429009
        },
        "e-1122": {
          id: "e-1122",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-15",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1121"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6836c8ea2a01b669e79d1574",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6836c8ea2a01b669e79d1574",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1748506443229
        },
        "e-1124": {
          id: "e-1124",
          name: "",
          animationType: "custom",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-16",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1123"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6836c8ea2a01b669e79d1574",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6836c8ea2a01b669e79d1574",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1748506457537
        },
        "e-1128": {
          id: "e-1128",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1127"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6847f0240b582426aa60db29",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6847f0240b582426aa60db29",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749544998781
        },
        "e-1130": {
          id: "e-1130",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-14",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1129"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6847f0240b582426aa60db29",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6847f0240b582426aa60db29",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749544998781
        },
        "e-1132": {
          id: "e-1132",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-17",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1131"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6847f0240b582426aa60db29",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6847f0240b582426aa60db29",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749544998781
        },
        "e-1134": {
          id: "e-1134",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-15",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1133"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6847f0240b582426aa60db29",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6847f0240b582426aa60db29",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749544998781
        },
        "e-1136": {
          id: "e-1136",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-16",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1135"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6847f0240b582426aa60db29",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "6847f0240b582426aa60db29",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749544998781
        },
        "e-1145": {
          id: "e-1145",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1146"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6847f0240b582426aa60db29|7c189cf1-89fb-ef2c-fdb2-99a84d945705",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6847f0240b582426aa60db29|7c189cf1-89fb-ef2c-fdb2-99a84d945705",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749616032576
        },
        "e-1147": {
          id: "e-1147",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1148"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6847f0240b582426aa60db29|7c189cf1-89fb-ef2c-fdb2-99a84d94570e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6847f0240b582426aa60db29|7c189cf1-89fb-ef2c-fdb2-99a84d94570e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749616032576
        },
        "e-1149": {
          id: "e-1149",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1150"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6847f0240b582426aa60db29|7c189cf1-89fb-ef2c-fdb2-99a84d945717",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6847f0240b582426aa60db29|7c189cf1-89fb-ef2c-fdb2-99a84d945717",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749616032576
        },
        "e-1151": {
          id: "e-1151",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1152"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6847f0240b582426aa60db29|7c189cf1-89fb-ef2c-fdb2-99a84d945728",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6847f0240b582426aa60db29|7c189cf1-89fb-ef2c-fdb2-99a84d945728",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749616032576
        },
        "e-1153": {
          id: "e-1153",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1154"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6846b03ab415312eda526a54|1cf999ae-f73e-fa09-63fb-cbadee51c482",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6846b03ab415312eda526a54|1cf999ae-f73e-fa09-63fb-cbadee51c482",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749781246344
        },
        "e-1155": {
          id: "e-1155",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1156"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6846b03ab415312eda526a54|1cf999ae-f73e-fa09-63fb-cbadee51c48b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6846b03ab415312eda526a54|1cf999ae-f73e-fa09-63fb-cbadee51c48b",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749781246344
        },
        "e-1157": {
          id: "e-1157",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1158"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6846b03ab415312eda526a54|1cf999ae-f73e-fa09-63fb-cbadee51c494",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6846b03ab415312eda526a54|1cf999ae-f73e-fa09-63fb-cbadee51c494",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749781246344
        },
        "e-1159": {
          id: "e-1159",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1160"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6846b03ab415312eda526a54|1cf999ae-f73e-fa09-63fb-cbadee51c4a5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "6846b03ab415312eda526a54|1cf999ae-f73e-fa09-63fb-cbadee51c4a5",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1749781246344
        },
        "e-1162": {
          id: "e-1162",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1161"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "684fca98e84649958fd9a3ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "684fca98e84649958fd9a3ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750059673562
        },
        "e-1164": {
          id: "e-1164",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-14",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1163"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "684fca98e84649958fd9a3ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "684fca98e84649958fd9a3ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750059673562
        },
        "e-1166": {
          id: "e-1166",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-17",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1165"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "684fca98e84649958fd9a3ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "684fca98e84649958fd9a3ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750059673562
        },
        "e-1168": {
          id: "e-1168",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-15",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1167"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "684fca98e84649958fd9a3ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "684fca98e84649958fd9a3ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750059673562
        },
        "e-1170": {
          id: "e-1170",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-16",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1169"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "684fca98e84649958fd9a3ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [{
            id: "684fca98e84649958fd9a3ff",
            appliesTo: "PAGE",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750059673562
        },
        "e-1171": {
          id: "e-1171",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1172"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "684fca98e84649958fd9a3ff|7c189cf1-89fb-ef2c-fdb2-99a84d945705",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "684fca98e84649958fd9a3ff|7c189cf1-89fb-ef2c-fdb2-99a84d945705",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750059673562
        },
        "e-1173": {
          id: "e-1173",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1174"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "684fca98e84649958fd9a3ff|7c189cf1-89fb-ef2c-fdb2-99a84d94570e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "684fca98e84649958fd9a3ff|7c189cf1-89fb-ef2c-fdb2-99a84d94570e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750059673562
        },
        "e-1175": {
          id: "e-1175",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1176"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "684fca98e84649958fd9a3ff|7c189cf1-89fb-ef2c-fdb2-99a84d945717",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "684fca98e84649958fd9a3ff|7c189cf1-89fb-ef2c-fdb2-99a84d945717",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750059673562
        },
        "e-1177": {
          id: "e-1177",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1178"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "684fca98e84649958fd9a3ff|7c189cf1-89fb-ef2c-fdb2-99a84d945728",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [{
            id: "684fca98e84649958fd9a3ff|7c189cf1-89fb-ef2c-fdb2-99a84d945728",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          }],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750059673562
        },
        "e-1180": {
          id: "e-1180",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-12",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1179"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6853e2e593bc4b35fa440979",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750328038865
        },
        "e-1182": {
          id: "e-1182",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-14",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1181"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6853e2e593bc4b35fa440979",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750328038865
        },
        "e-1184": {
          id: "e-1184",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-17",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1183"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6853e2e593bc4b35fa440979",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750328038865
        },
        "e-1186": {
          id: "e-1186",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-15",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1185"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6853e2e593bc4b35fa440979",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750328038865
        },
        "e-1188": {
          id: "e-1188",
          name: "",
          animationType: "preset",
          eventTypeId: "PAGE_FINISH",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-16",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1187"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6853e2e593bc4b35fa440979",
            appliesTo: "PAGE",
            styleBlockIds: []
          },
          targets: [],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750328038865
        },
        "e-1189": {
          id: "e-1189",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1190"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6853e2e593bc4b35fa440979|7c189cf1-89fb-ef2c-fdb2-99a84d945705",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750328038865
        },
        "e-1191": {
          id: "e-1191",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1192"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6853e2e593bc4b35fa440979|7c189cf1-89fb-ef2c-fdb2-99a84d94570e",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750328038865
        },
        "e-1193": {
          id: "e-1193",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1194"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6853e2e593bc4b35fa440979|7c189cf1-89fb-ef2c-fdb2-99a84d945717",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750328038865
        },
        "e-1195": {
          id: "e-1195",
          name: "",
          animationType: "preset",
          eventTypeId: "MOUSE_CLICK",
          action: {
            id: "",
            actionTypeId: "GENERAL_START_ACTION",
            config: {
              delay: 0,
              easing: "",
              duration: 0,
              actionListId: "a-57",
              affectedElements: {},
              playInReverse: !1,
              autoStopEventId: "e-1196"
            }
          },
          mediaQueries: ["main", "medium", "small", "tiny"],
          target: {
            id: "6853e2e593bc4b35fa440979|7c189cf1-89fb-ef2c-fdb2-99a84d945728",
            appliesTo: "ELEMENT",
            styleBlockIds: []
          },
          targets: [],
          config: {
            loop: !1,
            playInReverse: !1,
            scrollOffsetValue: null,
            scrollOffsetUnit: null,
            delay: null,
            direction: null,
            effectIn: null
          },
          createdOn: 1750328038865
        }
      },
      actionLists: {
        a: {
          id: "a",
          title: "Button Hover: IN",
          actionItemGroups: [{
            actionItems: [{
              id: "a-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5"]
                },
                value: "block"
              }
            }, {
              id: "a-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow.is-black",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5", "375196ca-a5dc-1ce5-ed4f-8d7cb82017cf"]
                },
                value: "none"
              }
            }]
          }, {
            actionItems: [{
              id: "a-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 110,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5"]
                },
                value: "none"
              }
            }, {
              id: "a-n-3",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["f6d29349-c204-6ffc-8b5a-a48fe81456b3"]
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1
              }
            }]
          }, {
            actionItems: [{
              id: "a-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg",
                  selectorGuids: ["26078fb2-52df-3045-67fe-f1f5ec0481f6"]
                },
                yValue: -100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX"
              }
            }, {
              id: "a-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow.is-black",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5", "375196ca-a5dc-1ce5-ed4f-8d7cb82017cf"]
                },
                value: "block"
              }
            }]
          }, {
            actionItems: [{
              id: "a-n-5",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1722515312839
        },
        "a-2": {
          id: "a-2",
          title: "Button Hover: Out",
          actionItemGroups: [{
            actionItems: [{
              id: "a-2-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 110,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-2-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg",
                  selectorGuids: ["26078fb2-52df-3045-67fe-f1f5ec0481f6"]
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-2-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-2-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["f6d29349-c204-6ffc-8b5a-a48fe81456b3"]
                },
                globalSwatchId: "--text-color--text-secondary",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1
              }
            }]
          }, {
            actionItems: [{
              id: "a-2-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow.is-black",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5", "375196ca-a5dc-1ce5-ed4f-8d7cb82017cf"]
                },
                value: "none"
              }
            }, {
              id: "a-2-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5"]
                },
                value: "block"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722517510249
        },
        "a-4": {
          id: "a-4",
          title: "WK-Lighting Fast Reports",
          actionItemGroups: [{
            actionItems: [{
              id: "a-4-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuint",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wk_graph_img",
                  selectorGuids: ["58528cd6-a3e3-1f25-9d46-a7df9da5143c"]
                },
                xValue: 18,
                yValue: 0,
                zValue: null,
                xUnit: "px",
                yUnit: "px",
                zUnit: "px"
              }
            }, {
              id: "a-4-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuint",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".get_started_img",
                  selectorGuids: ["0c568ce5-cb6d-19ad-1944-31d5d76d69ea"]
                },
                xValue: 59,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722547297677
        },
        "a-5": {
          id: "a-5",
          title: "WK-Lighting Fast Reports OUT",
          actionItemGroups: [{
            actionItems: [{
              id: "a-5-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuint",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wk_graph_img",
                  selectorGuids: ["58528cd6-a3e3-1f25-9d46-a7df9da5143c"]
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "px",
                yUnit: "px",
                zUnit: "px"
              }
            }, {
              id: "a-5-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuint",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".get_started_img",
                  selectorGuids: ["0c568ce5-cb6d-19ad-1944-31d5d76d69ea"]
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722547297677
        },
        "a-6": {
          id: "a-6",
          title: "WK State of the art",
          actionItemGroups: [{
            actionItems: [{
              id: "a-6-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wk_graph_img_right",
                  selectorGuids: ["f44b2ec2-bb79-ba1f-6d5c-f02ef6914017"]
                },
                xValue: -22,
                yValue: null,
                xUnit: "%",
                yUnit: "px",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722548388812
        },
        "a-7": {
          id: "a-7",
          title: "WK State of the art OUT",
          actionItemGroups: [{
            actionItems: [{
              id: "a-7-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".wk_graph_img_right",
                  selectorGuids: ["f44b2ec2-bb79-ba1f-6d5c-f02ef6914017"]
                },
                xValue: 0,
                yValue: null,
                xUnit: "%",
                yUnit: "px",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722548388812
        },
        "a-9": {
          id: "a-9",
          title: "Text Link Arrow",
          actionItemGroups: [{
            actionItems: [{
              id: "a-9-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text_link_arrow",
                  selectorGuids: ["2550f747-a14c-a998-ff92-38f2605908e5"]
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-9-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text_link_arrow",
                  selectorGuids: ["2550f747-a14c-a998-ff92-38f2605908e5"]
                },
                xValue: -14,
                yValue: null,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-9-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text_link_arrow",
                  selectorGuids: ["2550f747-a14c-a998-ff92-38f2605908e5"]
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1722612650813
        },
        "a-10": {
          id: "a-10",
          title: "FAQ OPEN",
          actionItemGroups: [{
            actionItems: [{
              id: "a-10-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq_arrow",
                  selectorGuids: ["a7fd8757-8759-7c4c-b33a-d1233c096820"]
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg"
              }
            }, {
              id: "a-10-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq_answer_wrap",
                  selectorGuids: ["9f06eb26-7d44-ee32-fb5a-2c743d0fa8de"]
                },
                value: "none"
              }
            }]
          }, {
            actionItems: [{
              id: "a-10-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq_arrow",
                  selectorGuids: ["a7fd8757-8759-7c4c-b33a-d1233c096820"]
                },
                zValue: 90,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg"
              }
            }, {
              id: "a-10-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq_answer_wrap",
                  selectorGuids: ["9f06eb26-7d44-ee32-fb5a-2c743d0fa8de"]
                },
                value: "block"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1722718393548
        },
        "a-11": {
          id: "a-11",
          title: "FAQ CLOSE",
          actionItemGroups: [{
            actionItems: [{
              id: "a-11-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq_arrow",
                  selectorGuids: ["a7fd8757-8759-7c4c-b33a-d1233c096820"]
                },
                yValue: null,
                zValue: 0,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "deg"
              }
            }, {
              id: "a-11-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".faq_answer_wrap",
                  selectorGuids: ["9f06eb26-7d44-ee32-fb5a-2c743d0fa8de"]
                },
                value: "none"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722718393548
        },
        "a-12": {
          id: "a-12",
          title: "MARQUEE Investors Partners",
          actionItemGroups: [{
            actionItems: [{
              id: "a-12-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".marquee_wrapper",
                  selectorGuids: ["d17a9ae0-f708-3015-df00-74d9fd28539c"]
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-12-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 80000,
                target: {
                  selector: ".marquee_wrapper",
                  selectorGuids: ["d17a9ae0-f708-3015-df00-74d9fd28539c"]
                },
                xValue: -50,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722825025786
        },
        "a-13": {
          id: "a-13",
          title: "HOW KRYPTOS WORK",
          actionItemGroups: [{
            actionItems: [{
              id: "a-13-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-1",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "3cfda006-a080-d7dc-dcc6-010dc3b104d5"]
                },
                value: "flex"
              }
            }, {
              id: "a-13-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-2",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "c8205ab2-4928-4273-ceaf-9f942bc5b65e"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-3",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "a64f45d8-d4f4-e89b-100e-73b9c3759a7e"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-4",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "d3191f7f-2b50-8cfc-098a-c5e8bd49cc7c"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-5",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "2553920c-fe7b-302d-586d-96fdd8a405fc"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-6",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "8bedc929-c29c-b2b1-9bc7-b48cc93506b1"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-7",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "92c41388-4983-b288-92ed-46381525542b"]
                },
                value: "none"
              }
            }]
          }, {
            actionItems: [{
              id: "a-13-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-1",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "3cfda006-a080-d7dc-dcc6-010dc3b104d5"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-2",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "c8205ab2-4928-4273-ceaf-9f942bc5b65e"]
                },
                value: "flex"
              }
            }]
          }, {
            actionItems: [{
              id: "a-13-n-10",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-2",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "c8205ab2-4928-4273-ceaf-9f942bc5b65e"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-11",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-3",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "a64f45d8-d4f4-e89b-100e-73b9c3759a7e"]
                },
                value: "flex"
              }
            }]
          }, {
            actionItems: [{
              id: "a-13-n-12",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-3",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "a64f45d8-d4f4-e89b-100e-73b9c3759a7e"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-13",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-4",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "d3191f7f-2b50-8cfc-098a-c5e8bd49cc7c"]
                },
                value: "flex"
              }
            }]
          }, {
            actionItems: [{
              id: "a-13-n-14",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-4",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "d3191f7f-2b50-8cfc-098a-c5e8bd49cc7c"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-15",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-5",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "2553920c-fe7b-302d-586d-96fdd8a405fc"]
                },
                value: "flex"
              }
            }]
          }, {
            actionItems: [{
              id: "a-13-n-16",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-5",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "2553920c-fe7b-302d-586d-96fdd8a405fc"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-17",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-6",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "8bedc929-c29c-b2b1-9bc7-b48cc93506b1"]
                },
                value: "flex"
              }
            }]
          }, {
            actionItems: [{
              id: "a-13-n-18",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-6",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "8bedc929-c29c-b2b1-9bc7-b48cc93506b1"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-19",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-7",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "92c41388-4983-b288-92ed-46381525542b"]
                },
                value: "flex"
              }
            }]
          }, {
            actionItems: [{
              id: "a-13-n-20",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-7",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "92c41388-4983-b288-92ed-46381525542b"]
                },
                value: "none"
              }
            }, {
              id: "a-13-n-21",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 4000,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".mobile_screen_small.screen-1",
                  selectorGuids: ["53c5416c-8ca4-f391-b583-7ad0743c8149", "3cfda006-a080-d7dc-dcc6-010dc3b104d5"]
                },
                value: "flex"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723001250546
        },
        "a-14": {
          id: "a-14",
          title: "ROW1 INTEGRATIONS MARQUEE",
          actionItemGroups: [{
            actionItems: [{
              id: "a-14-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".marquee_wrapper_small.row_one",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "f84ad3ea-b4a4-6833-0d0f-79cb40f3c05f"]
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-14-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 15000,
                target: {
                  selector: ".marquee_wrapper_small.row_one",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "f84ad3ea-b4a4-6833-0d0f-79cb40f3c05f"]
                },
                xValue: -60,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-14-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".marquee_wrapper_small.row_one",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "f84ad3ea-b4a4-6833-0d0f-79cb40f3c05f"]
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723027192195
        },
        "a-15": {
          id: "a-15",
          title: "ROW2 INTEGRATIONS MARQUEE",
          actionItemGroups: [{
            actionItems: [{
              id: "a-15-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".marquee_wrapper_small.row_two",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "7955f1ae-7e69-9ab8-6c75-641aea4b7288"]
                },
                xValue: -63,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-15-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 15000,
                target: {
                  selector: ".marquee_wrapper_small.row_two",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "7955f1ae-7e69-9ab8-6c75-641aea4b7288"]
                },
                xValue: -6.5,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-15-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".marquee_wrapper_small.row_two",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "7955f1ae-7e69-9ab8-6c75-641aea4b7288"]
                },
                xValue: -63,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723027192195
        },
        "a-16": {
          id: "a-16",
          title: "ROW4 INTEGRATIONS MARQUEE",
          actionItemGroups: [{
            actionItems: [{
              id: "a-16-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".marquee_wrapper_small.row_four",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "ba8945b3-45e5-f6d6-a7fb-c82894f2c59c"]
                },
                xValue: -66,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-16-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 15000,
                target: {
                  selector: ".marquee_wrapper_small.row_four",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "ba8945b3-45e5-f6d6-a7fb-c82894f2c59c"]
                },
                xValue: -8,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-16-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".marquee_wrapper_small.row_four",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "ba8945b3-45e5-f6d6-a7fb-c82894f2c59c"]
                },
                xValue: -66,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723027192195
        },
        "a-17": {
          id: "a-17",
          title: "ROW3 INTEGRATIONS MARQUEE",
          actionItemGroups: [{
            actionItems: [{
              id: "a-17-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".marquee_wrapper_small.row_three",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "5e7e9f4c-8670-f645-de7f-68447af4d944"]
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-17-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 15000,
                target: {
                  selector: ".marquee_wrapper_small.row_three",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "5e7e9f4c-8670-f645-de7f-68447af4d944"]
                },
                xValue: -58.4,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-17-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".marquee_wrapper_small.row_three",
                  selectorGuids: ["2b6c37e4-ac95-2b1b-fd7c-b6cce3d2ea0e", "5e7e9f4c-8670-f645-de7f-68447af4d944"]
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723027192195
        },
        "a-20": {
          id: "a-20",
          title: "NAV DROPDOWN OPEN",
          actionItemGroups: [{
            actionItems: [{
              id: "a-20-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-dropdown_list",
                  selectorGuids: ["b763f18d-3225-a6b3-9df4-dd7dd865ecd9"]
                },
                value: 0,
                unit: ""
              }
            }]
          }, {
            actionItems: [{
              id: "a-20-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-dropdown_list",
                  selectorGuids: ["b763f18d-3225-a6b3-9df4-dd7dd865ecd9"]
                },
                value: 1,
                unit: ""
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723136441454
        },
        "a-21": {
          id: "a-21",
          title: "NAV DROPDOWN CLOSES",
          actionItemGroups: [{
            actionItems: [{
              id: "a-21-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-dropdown_list",
                  selectorGuids: ["b763f18d-3225-a6b3-9df4-dd7dd865ecd9"]
                },
                value: 1,
                unit: ""
              }
            }]
          }, {
            actionItems: [{
              id: "a-21-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "easeInOut",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-dropdown_list",
                  selectorGuids: ["b763f18d-3225-a6b3-9df4-dd7dd865ecd9"]
                },
                value: 0,
                unit: ""
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1723136441454
        },
        "a-22": {
          id: "a-22",
          title: "USECASE Arrow",
          actionItemGroups: [{
            actionItems: [{
              id: "a-22-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_arrow_usecase",
                  selectorGuids: ["73c7aa97-18c6-9134-c471-b953817cb4e7"]
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-22-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_arrow_usecase",
                  selectorGuids: ["73c7aa97-18c6-9134-c471-b953817cb4e7"]
                },
                xValue: -14,
                yValue: null,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-22-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_arrow_usecase",
                  selectorGuids: ["73c7aa97-18c6-9134-c471-b953817cb4e7"]
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723137272959
        },
        "a-23": {
          id: "a-23",
          title: "HAMBURGER OPEN",
          actionItemGroups: [{
            actionItems: [{
              id: "a-23-n",
              actionTypeId: "PLUGIN_LOTTIE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".lottie_hamburger",
                  selectorGuids: ["bcf67fda-f761-03c3-ae5e-2bb862cf3fd4"]
                },
                value: 0
              }
            }]
          }, {
            actionItems: [{
              id: "a-23-n-2",
              actionTypeId: "PLUGIN_LOTTIE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".lottie_hamburger",
                  selectorGuids: ["bcf67fda-f761-03c3-ae5e-2bb862cf3fd4"]
                },
                value: 40.4
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723159900559
        },
        "a-24": {
          id: "a-24",
          title: "HAMBURGER CLOSE",
          actionItemGroups: [{
            actionItems: [{
              id: "a-24-n-2",
              actionTypeId: "PLUGIN_LOTTIE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".lottie_hamburger",
                  selectorGuids: ["bcf67fda-f761-03c3-ae5e-2bb862cf3fd4"]
                },
                value: 100
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1723159900559
        },
        "a-25": {
          id: "a-25",
          title: "CRYTO TAX HERO IMG",
          actionItemGroups: [{
            actionItems: [{
              id: "a-25-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".cts_hero_bg_img",
                  selectorGuids: ["61dc8e13-1307-5a91-5fb1-2e4611892610"]
                },
                xValue: 0,
                yValue: 0,
                locked: !0
              }
            }, {
              id: "a-25-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".cts_hero_bg_img",
                  selectorGuids: ["61dc8e13-1307-5a91-5fb1-2e4611892610"]
                },
                xValue: null,
                yValue: null,
                zValue: -208,
                xUnit: "px",
                yUnit: "px",
                zUnit: "px"
              }
            }]
          }, {
            actionItems: [{
              id: "a-25-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outCirc",
                duration: 1000,
                target: {
                  selector: ".cts_hero_bg_img",
                  selectorGuids: ["61dc8e13-1307-5a91-5fb1-2e4611892610"]
                },
                xValue: 1,
                yValue: 1,
                locked: !0
              }
            }, {
              id: "a-25-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  selector: ".cts_hero_bg_img",
                  selectorGuids: ["61dc8e13-1307-5a91-5fb1-2e4611892610"]
                },
                yValue: null,
                zValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "px"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723297802157
        },
        "a-26": {
          id: "a-26",
          title: "CTS HERO IMG",
          continuousParameterGroups: [{
            id: "a-26-p",
            type: "MOUSE_X",
            parameterLabel: "Mouse X",
            continuousActionGroups: [{
              keyframe: 0,
              actionItems: [{
                id: "a-26-n",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "66b575ea087e5c4ec787cd22|6a5d9436-418b-6659-f665-599d570dde14"
                  },
                  yValue: -10,
                  xUnit: "DEG",
                  yUnit: "deg",
                  zUnit: "DEG"
                }
              }]
            }, {
              keyframe: 100,
              actionItems: [{
                id: "a-26-n-2",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "66b575ea087e5c4ec787cd22|6a5d9436-418b-6659-f665-599d570dde14"
                  },
                  yValue: 10,
                  xUnit: "DEG",
                  yUnit: "deg",
                  zUnit: "DEG"
                }
              }]
            }]
          }, {
            id: "a-26-p-2",
            type: "MOUSE_Y",
            parameterLabel: "Mouse Y",
            continuousActionGroups: [{
              keyframe: 0,
              actionItems: [{
                id: "a-26-n-3",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "66b575ea087e5c4ec787cd22|6a5d9436-418b-6659-f665-599d570dde14"
                  },
                  xValue: 10,
                  xUnit: "deg",
                  yUnit: "DEG",
                  zUnit: "DEG"
                }
              }]
            }, {
              keyframe: 100,
              actionItems: [{
                id: "a-26-n-4",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "66b575ea087e5c4ec787cd22|6a5d9436-418b-6659-f665-599d570dde14"
                  },
                  xValue: -10,
                  xUnit: "deg",
                  yUnit: "DEG",
                  zUnit: "DEG"
                }
              }]
            }]
          }],
          createdOn: 1723744589117
        },
        "a-27": {
          id: "a-27",
          title: "SHOW: ARROW GET STARTED",
          actionItemGroups: [{
            actionItems: [{
              id: "a-27-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".get_started_arrow",
                  selectorGuids: ["2059d821-3c11-1ab7-837a-e8cab938bdc0"]
                },
                value: "none"
              }
            }]
          }, {
            actionItems: [{
              id: "a-27-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".get_started_arrow",
                  selectorGuids: ["2059d821-3c11-1ab7-837a-e8cab938bdc0"]
                },
                value: "block"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723745362130
        },
        "a-28": {
          id: "a-28",
          title: "HIDE: ARROW GET STARTED",
          actionItemGroups: [{
            actionItems: [{
              id: "a-28-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".get_started_arrow",
                  selectorGuids: ["2059d821-3c11-1ab7-837a-e8cab938bdc0"]
                },
                value: "none"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1723745362130
        },
        "a-30": {
          id: "a-30",
          title: "MARQUEE TAX",
          actionItemGroups: [{
            actionItems: [{
              id: "a-30-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".marquee_wrapper",
                  selectorGuids: ["d17a9ae0-f708-3015-df00-74d9fd28539c"]
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-30-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 80000,
                target: {
                  selector: ".marquee_wrapper",
                  selectorGuids: ["d17a9ae0-f708-3015-df00-74d9fd28539c"]
                },
                xValue: -51,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722825025786
        },
        "a-31": {
          id: "a-31",
          title: "Back Button arrow",
          actionItemGroups: [{
            actionItems: [{
              id: "a-31-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text_link_arrow.rotate",
                  selectorGuids: ["2550f747-a14c-a998-ff92-38f2605908e5", "aabebd92-5caf-00ef-941f-de90f1b3b7ca"]
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX"
              }
            }, {
              id: "a-31-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text_link_arrow.rotate",
                  selectorGuids: ["2550f747-a14c-a998-ff92-38f2605908e5", "aabebd92-5caf-00ef-941f-de90f1b3b7ca"]
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg"
              }
            }]
          }, {
            actionItems: [{
              id: "a-31-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text_link_arrow.rotate",
                  selectorGuids: ["2550f747-a14c-a998-ff92-38f2605908e5", "aabebd92-5caf-00ef-941f-de90f1b3b7ca"]
                },
                xValue: -14,
                yValue: null,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-31-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".text_link_arrow.rotate",
                  selectorGuids: ["2550f747-a14c-a998-ff92-38f2605908e5", "aabebd92-5caf-00ef-941f-de90f1b3b7ca"]
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1722612650813
        },
        "a-32": {
          id: "a-32",
          title: "Reveal Play CTA",
          actionItemGroups: [{
            actionItems: [{
              id: "a-32-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".play_cta",
                  selectorGuids: ["dc280cd6-1265-d686-cc29-df37a459fbbf"]
                },
                value: "none"
              }
            }, {
              id: "a-32-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".play_cta",
                  selectorGuids: ["dc280cd6-1265-d686-cc29-df37a459fbbf"]
                },
                value: 0,
                unit: ""
              }
            }]
          }, {
            actionItems: [{
              id: "a-32-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outBounce",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".play_cta",
                  selectorGuids: ["dc280cd6-1265-d686-cc29-df37a459fbbf"]
                },
                value: 1,
                unit: ""
              }
            }, {
              id: "a-32-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "outBounce",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".play_cta",
                  selectorGuids: ["dc280cd6-1265-d686-cc29-df37a459fbbf"]
                },
                value: "flex"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1724118651646
        },
        "a-33": {
          id: "a-33",
          title: "Hide Play CTA",
          actionItemGroups: [{
            actionItems: [{
              id: "a-33-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outBounce",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".play_cta",
                  selectorGuids: ["dc280cd6-1265-d686-cc29-df37a459fbbf"]
                },
                value: 0,
                unit: ""
              }
            }, {
              id: "a-33-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "outBounce",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".play_cta",
                  selectorGuids: ["dc280cd6-1265-d686-cc29-df37a459fbbf"]
                },
                value: "none"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1724118651646
        },
        "a-3": {
          id: "a-3",
          title: "TOP BAR",
          continuousParameterGroups: [{
            id: "a-3-p",
            type: "MOUSE_X",
            parameterLabel: "Mouse X",
            continuousActionGroups: [{
              keyframe: 0,
              actionItems: [{
                id: "a-3-n",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "664e31bc72082255f0e532dd|b6430d3a-42db-739f-c984-57b326a09874"
                  },
                  yValue: -10,
                  xUnit: "DEG",
                  yUnit: "deg",
                  zUnit: "DEG"
                }
              }, {
                id: "a-3-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".abs_highlight",
                    selectorGuids: ["8f98237f-017a-cef0-a689-b0dd99e7b122"]
                  },
                  xValue: 250,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX"
                }
              }]
            }, {
              keyframe: 100,
              actionItems: [{
                id: "a-3-n-2",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "664e31bc72082255f0e532dd|b6430d3a-42db-739f-c984-57b326a09874"
                  },
                  yValue: 10,
                  xUnit: "DEG",
                  yUnit: "deg",
                  zUnit: "DEG"
                }
              }, {
                id: "a-3-n-4",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".abs_highlight",
                    selectorGuids: ["8f98237f-017a-cef0-a689-b0dd99e7b122"]
                  },
                  xValue: -250,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX"
                }
              }]
            }]
          }, {
            id: "a-3-p-2",
            type: "MOUSE_Y",
            parameterLabel: "Mouse Y",
            continuousActionGroups: [{
              keyframe: 0,
              actionItems: [{
                id: "a-3-n-5",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "664e31bc72082255f0e532dd|b6430d3a-42db-739f-c984-57b326a09874"
                  },
                  xValue: 10,
                  xUnit: "deg",
                  yUnit: "DEG",
                  zUnit: "DEG"
                }
              }]
            }, {
              keyframe: 100,
              actionItems: [{
                id: "a-3-n-6",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "664e31bc72082255f0e532dd|b6430d3a-42db-739f-c984-57b326a09874"
                  },
                  xValue: -10,
                  xUnit: "deg",
                  yUnit: "DEG",
                  zUnit: "DEG"
                }
              }]
            }]
          }],
          createdOn: 1722521258171
        },
        "a-34": {
          id: "a-34",
          title: "ENTERPRISE ACCOUNTANT IMG",
          continuousParameterGroups: [{
            id: "a-34-p",
            type: "MOUSE_X",
            parameterLabel: "Mouse X",
            continuousActionGroups: [{
              keyframe: 0,
              actionItems: [{
                id: "a-34-n",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "66cc768971fae5b313e15465|5fc3666b-fc5b-3176-2a24-289905a5be41"
                  },
                  yValue: -10,
                  xUnit: "DEG",
                  yUnit: "deg",
                  zUnit: "DEG"
                }
              }]
            }, {
              keyframe: 100,
              actionItems: [{
                id: "a-34-n-2",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "66cc768971fae5b313e15465|5fc3666b-fc5b-3176-2a24-289905a5be41"
                  },
                  yValue: 10,
                  xUnit: "DEG",
                  yUnit: "deg",
                  zUnit: "DEG"
                }
              }]
            }]
          }, {
            id: "a-34-p-2",
            type: "MOUSE_Y",
            parameterLabel: "Mouse Y",
            continuousActionGroups: [{
              keyframe: 0,
              actionItems: [{
                id: "a-34-n-3",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "66b575ea087e5c4ec787cd22|6a5d9436-418b-6659-f665-599d570dde14"
                  },
                  xValue: 10,
                  xUnit: "deg",
                  yUnit: "DEG",
                  zUnit: "DEG"
                }
              }]
            }, {
              keyframe: 100,
              actionItems: [{
                id: "a-34-n-4",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: !0,
                    id: "66b575ea087e5c4ec787cd22|6a5d9436-418b-6659-f665-599d570dde14"
                  },
                  xValue: -10,
                  xUnit: "deg",
                  yUnit: "DEG",
                  zUnit: "DEG"
                }
              }]
            }]
          }],
          createdOn: 1723744589117
        },
        "a-35": {
          id: "a-35",
          title: "CAREER HANDS",
          continuousParameterGroups: [{
            id: "a-35-p",
            type: "SCROLL_PROGRESS",
            parameterLabel: "Scroll",
            continuousActionGroups: [{
              keyframe: 0,
              actionItems: [{
                id: "a-35-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.left",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "1d61acc9-68cd-cc6f-7dfd-2978d91ca27f"]
                  },
                  xValue: 1,
                  yValue: 1,
                  zValue: 1,
                  locked: !0
                }
              }, {
                id: "a-35-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.right",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "19673edd-69e7-f4b3-5b0c-a37a6d6b50b3"]
                  },
                  xValue: 1,
                  yValue: 1,
                  zValue: 1,
                  locked: !0
                }
              }, {
                id: "a-35-n-5",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.right",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "19673edd-69e7-f4b3-5b0c-a37a6d6b50b3"]
                  },
                  xValue: 100,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX"
                }
              }, {
                id: "a-35-n-7",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.left",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "1d61acc9-68cd-cc6f-7dfd-2978d91ca27f"]
                  },
                  xValue: -100,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX"
                }
              }]
            }, {
              keyframe: 50,
              actionItems: [{
                id: "a-35-n-2",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.left",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "1d61acc9-68cd-cc6f-7dfd-2978d91ca27f"]
                  },
                  xValue: 1.5,
                  yValue: 1.5,
                  zValue: 1.5,
                  locked: !0
                }
              }, {
                id: "a-35-n-4",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.right",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "19673edd-69e7-f4b3-5b0c-a37a6d6b50b3"]
                  },
                  xValue: 1.5,
                  yValue: 1.5,
                  zValue: 1.5,
                  locked: !0
                }
              }, {
                id: "a-35-n-6",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.right",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "19673edd-69e7-f4b3-5b0c-a37a6d6b50b3"]
                  },
                  xValue: -23,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX"
                }
              }, {
                id: "a-35-n-8",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.left",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "1d61acc9-68cd-cc6f-7dfd-2978d91ca27f"]
                  },
                  xValue: 24,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX"
                }
              }, {
                id: "a-35-n-11",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.right",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "19673edd-69e7-f4b3-5b0c-a37a6d6b50b3"]
                  },
                  value: 1,
                  unit: ""
                }
              }, {
                id: "a-35-n-12",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.left",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "1d61acc9-68cd-cc6f-7dfd-2978d91ca27f"]
                  },
                  value: 1,
                  unit: ""
                }
              }, {
                id: "a-35-n-13",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".handshake_img",
                    selectorGuids: ["d5ae15b2-ddc0-03d7-ab52-360cea298f5b"]
                  },
                  value: 0,
                  unit: ""
                }
              }]
            }, {
              keyframe: 51,
              actionItems: [{
                id: "a-35-n-9",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.left",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "1d61acc9-68cd-cc6f-7dfd-2978d91ca27f"]
                  },
                  value: 0,
                  unit: ""
                }
              }, {
                id: "a-35-n-10",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".hand_img.right",
                    selectorGuids: ["64623150-322f-763e-e608-3270cef61032", "19673edd-69e7-f4b3-5b0c-a37a6d6b50b3"]
                  },
                  value: 0,
                  unit: ""
                }
              }, {
                id: "a-35-n-14",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".handshake_img",
                    selectorGuids: ["d5ae15b2-ddc0-03d7-ab52-360cea298f5b"]
                  },
                  value: 1,
                  unit: ""
                }
              }]
            }]
          }],
          createdOn: 1725212627747
        },
        "a-36": {
          id: "a-36",
          title: "fs-toc EXPAND",
          actionItemGroups: [{
            actionItems: [{
              id: "a-36-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".fs-toc_link-wrapper",
                  selectorGuids: ["53b428be-dc4d-356f-5e41-f86ff28dac1d"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: !1
              }
            }]
          }, {
            actionItems: [{
              id: "a-36-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 200,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".fs-toc_link-wrapper",
                  selectorGuids: ["53b428be-dc4d-356f-5e41-f86ff28dac1d"]
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: !1
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1651177342310
        },
        "a-37": {
          id: "a-37",
          title: "fs-toc COLLAPSE",
          actionItemGroups: [{
            actionItems: [{
              id: "a-37-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 200,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".fs-toc_link-wrapper",
                  selectorGuids: ["53b428be-dc4d-356f-5e41-f86ff28dac1d"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: !1
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1651177342310
        },
        "a-18": {
          id: "a-18",
          title: "NAVBAR REVEAL",
          actionItemGroups: [{
            actionItems: [{
              id: "a-18-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".navbar",
                  selectorGuids: ["2e53552a-eeaa-1166-f608-3fe3ee1807f1"]
                },
                yValue: -80,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX"
              }
            }, {
              id: "a-18-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".navbar",
                  selectorGuids: ["2e53552a-eeaa-1166-f608-3fe3ee1807f1"]
                },
                value: 0,
                unit: ""
              }
            }]
          }, {
            actionItems: [{
              id: "a-18-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 200,
                target: {
                  selector: ".navbar",
                  selectorGuids: ["2e53552a-eeaa-1166-f608-3fe3ee1807f1"]
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX"
              }
            }, {
              id: "a-18-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outExpo",
                duration: 200,
                target: {
                  selector: ".navbar",
                  selectorGuids: ["2e53552a-eeaa-1166-f608-3fe3ee1807f1"]
                },
                value: 1,
                unit: ""
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723128201554
        },
        "a-40": {
          id: "a-40",
          title: "PREVIOUS Button Hover: IN",
          actionItemGroups: [{
            actionItems: [{
              id: "a-40-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-40-n-11",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".previous-arrow.white",
                  selectorGuids: ["759213bd-ad0a-7d19-2c48-d4e5dda21565", "4fbde3a1-0c47-706d-4f31-7fd43e72006f"]
                },
                value: "block"
              }
            }, {
              id: "a-40-n-10",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".previous-arrow.black",
                  selectorGuids: ["759213bd-ad0a-7d19-2c48-d4e5dda21565", "5b652165-3fd6-b87d-8650-db0a8436a72c"]
                },
                value: "none"
              }
            }]
          }, {
            actionItems: [{
              id: "a-40-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 110,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-40-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["f6d29349-c204-6ffc-8b5a-a48fe81456b3"]
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1
              }
            }]
          }, {
            actionItems: [{
              id: "a-40-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg",
                  selectorGuids: ["26078fb2-52df-3045-67fe-f1f5ec0481f6"]
                },
                yValue: -100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-40-n-9",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-40-n-13",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".previous-arrow.black",
                  selectorGuids: ["759213bd-ad0a-7d19-2c48-d4e5dda21565", "5b652165-3fd6-b87d-8650-db0a8436a72c"]
                },
                value: "block"
              }
            }, {
              id: "a-40-n-12",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".previous-arrow.white",
                  selectorGuids: ["759213bd-ad0a-7d19-2c48-d4e5dda21565", "4fbde3a1-0c47-706d-4f31-7fd43e72006f"]
                },
                value: "none"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1722515312839
        },
        "a-41": {
          id: "a-41",
          title: "PREVIOUS Button Hover: Out",
          actionItemGroups: [{
            actionItems: [{
              id: "a-41-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 110,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-41-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg",
                  selectorGuids: ["26078fb2-52df-3045-67fe-f1f5ec0481f6"]
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-41-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-41-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["f6d29349-c204-6ffc-8b5a-a48fe81456b3"]
                },
                globalSwatchId: "--text-color--text-secondary",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1
              }
            }]
          }, {
            actionItems: [{
              id: "a-41-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".previous-arrow.black",
                  selectorGuids: ["759213bd-ad0a-7d19-2c48-d4e5dda21565", "5b652165-3fd6-b87d-8650-db0a8436a72c"]
                },
                value: "none"
              }
            }, {
              id: "a-41-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".previous-arrow.white",
                  selectorGuids: ["759213bd-ad0a-7d19-2c48-d4e5dda21565", "4fbde3a1-0c47-706d-4f31-7fd43e72006f"]
                },
                value: "block"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722517510249
        },
        "a-38": {
          id: "a-38",
          title: "NEXT Button Hover: IN",
          actionItemGroups: [{
            actionItems: [{
              id: "a-38-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-38-n-11",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".next-arrow.black",
                  selectorGuids: ["d78e1532-94e3-36bc-2f69-244ab901a1df", "810b34ca-0d3f-bf5d-ae67-8fabf4f970f1"]
                },
                value: "none"
              }
            }, {
              id: "a-38-n-10",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".next-arrow.white",
                  selectorGuids: ["d78e1532-94e3-36bc-2f69-244ab901a1df", "502148f7-33f5-e1bd-91f6-770511f3bdf6"]
                },
                value: "block"
              }
            }]
          }, {
            actionItems: [{
              id: "a-38-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 110,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-38-n-13",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".next-arrow.white",
                  selectorGuids: ["d78e1532-94e3-36bc-2f69-244ab901a1df", "502148f7-33f5-e1bd-91f6-770511f3bdf6"]
                },
                value: "none"
              }
            }, {
              id: "a-38-n-12",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".next-arrow.black",
                  selectorGuids: ["d78e1532-94e3-36bc-2f69-244ab901a1df", "810b34ca-0d3f-bf5d-ae67-8fabf4f970f1"]
                },
                value: "block"
              }
            }, {
              id: "a-38-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["f6d29349-c204-6ffc-8b5a-a48fe81456b3"]
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1
              }
            }]
          }, {
            actionItems: [{
              id: "a-38-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg",
                  selectorGuids: ["26078fb2-52df-3045-67fe-f1f5ec0481f6"]
                },
                yValue: -100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-38-n-9",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1722515312839
        },
        "a-39": {
          id: "a-39",
          title: "NEXT Button Hover: Out",
          actionItemGroups: [{
            actionItems: [{
              id: "a-39-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 110,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-39-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg",
                  selectorGuids: ["26078fb2-52df-3045-67fe-f1f5ec0481f6"]
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-39-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-39-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["f6d29349-c204-6ffc-8b5a-a48fe81456b3"]
                },
                globalSwatchId: "--text-color--text-secondary",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1
              }
            }]
          }, {
            actionItems: [{
              id: "a-39-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".next-arrow.black",
                  selectorGuids: ["d78e1532-94e3-36bc-2f69-244ab901a1df", "810b34ca-0d3f-bf5d-ae67-8fabf4f970f1"]
                },
                value: "none"
              }
            }, {
              id: "a-39-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".next-arrow.white",
                  selectorGuids: ["d78e1532-94e3-36bc-2f69-244ab901a1df", "502148f7-33f5-e1bd-91f6-770511f3bdf6"]
                },
                value: "block"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722517510249
        },
        "a-42": {
          id: "a-42",
          title: "CLOSE FIRST PRICING CARD",
          actionItemGroups: [{
            actionItems: [{
              id: "a-42-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing_list.first",
                  selectorGuids: ["3d507099-48a6-21ff-1e85-dec65017976f", "3d507099-48a6-21ff-1e85-dec65017977b"]
                },
                value: "none"
              }
            }, {
              id: "a-42-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 200,
                target: {},
                globalSwatchId: "@var_variable-33d17274",
                rValue: 0,
                bValue: 93,
                gValue: 114,
                aValue: 1
              }
            }, {
              id: "a-42-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing_dropdown-icon.first",
                  selectorGuids: ["3d507099-48a6-21ff-1e85-dec650179770", "3d507099-48a6-21ff-1e85-dec650179782"]
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1717478669864
        },
        "a-43": {
          id: "a-43",
          title: "OPEN FIRST PRICING CARD",
          actionItemGroups: [{
            actionItems: [{
              id: "a-43-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing_list.first",
                  selectorGuids: ["3d507099-48a6-21ff-1e85-dec65017976f", "3d507099-48a6-21ff-1e85-dec65017977b"]
                },
                value: "grid"
              }
            }, {
              id: "a-43-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 200,
                target: {},
                globalSwatchId: "@var_variable-79caa1a1",
                rValue: 0,
                bValue: 147,
                gValue: 198,
                aValue: 1
              }
            }, {
              id: "a-43-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing_dropdown-icon.first",
                  selectorGuids: ["3d507099-48a6-21ff-1e85-dec650179770", "3d507099-48a6-21ff-1e85-dec650179782"]
                },
                zValue: 90,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1717478669864
        },
        "a-44": {
          id: "a-44",
          title: "OPENS PRICING DROPDOWN",
          actionItemGroups: [{
            actionItems: [{
              id: "a-44-n",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {},
                globalSwatchId: "@var_variable-33d17274",
                rValue: 0,
                bValue: 93,
                gValue: 114,
                aValue: 1
              }
            }, {
              id: "a-44-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing_dropdown-icon",
                  selectorGuids: ["3d507099-48a6-21ff-1e85-dec650179770"]
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg"
              }
            }, {
              id: "a-44-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing_list.initial-close",
                  selectorGuids: ["3d507099-48a6-21ff-1e85-dec65017976f", "3d507099-48a6-21ff-1e85-dec650179780"]
                },
                value: "none"
              }
            }]
          }, {
            actionItems: [{
              id: "a-44-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {},
                globalSwatchId: "@var_variable-79caa1a1",
                rValue: 0,
                bValue: 147,
                gValue: 198,
                aValue: 1
              }
            }, {
              id: "a-44-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing_dropdown-icon",
                  selectorGuids: ["3d507099-48a6-21ff-1e85-dec650179770"]
                },
                zValue: 90,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg"
              }
            }, {
              id: "a-44-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing_list.initial-close",
                  selectorGuids: ["3d507099-48a6-21ff-1e85-dec65017976f", "3d507099-48a6-21ff-1e85-dec650179780"]
                },
                value: "block"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1717393053431
        },
        "a-45": {
          id: "a-45",
          title: "CLOSE PRICING DROPDOWN",
          actionItemGroups: [{
            actionItems: [{
              id: "a-45-n",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {},
                globalSwatchId: "@var_variable-33d17274",
                rValue: 0,
                bValue: 93,
                gValue: 114,
                aValue: 1
              }
            }, {
              id: "a-45-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing_dropdown-icon",
                  selectorGuids: ["3d507099-48a6-21ff-1e85-dec650179770"]
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg"
              }
            }, {
              id: "a-45-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pricing_list.initial-close",
                  selectorGuids: ["3d507099-48a6-21ff-1e85-dec65017976f", "3d507099-48a6-21ff-1e85-dec650179780"]
                },
                value: "none"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1717393053431
        },
        "a-46": {
          id: "a-46",
          title: "POPUP OPEN : GET STARTED",
          actionItemGroups: [{
            actionItems: [{
              id: "a-46-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".popup_wrapper",
                  selectorGuids: ["ef60831a-e8bf-584b-b61b-dc6dbc77856e"]
                },
                value: "none"
              }
            }]
          }, {
            actionItems: [{
              id: "a-46-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 500,
                easing: "",
                duration: 0,
                target: {
                  selector: ".popup_wrapper",
                  selectorGuids: ["ef60831a-e8bf-584b-b61b-dc6dbc77856e"]
                },
                value: "flex"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1726230237505
        },
        "a-47": {
          id: "a-47",
          title: "POPUP CLOSE : GET STARTED",
          actionItemGroups: [{
            actionItems: [{
              id: "a-47-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".popup_wrapper",
                  selectorGuids: ["ef60831a-e8bf-584b-b61b-dc6dbc77856e"]
                },
                value: "none"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1726230237505
        },
        "a-48": {
          id: "a-48",
          title: "Crypto Tax Video",
          actionItemGroups: [{
            actionItems: [{
              id: "a-48-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: !0,
                  id: "66b8e0336a9e61a39e9214fa|4b5d4123-592e-4096-4c67-455284559676"
                },
                xValue: 0.8,
                yValue: 0.8,
                locked: !0
              }
            }]
          }, {
            actionItems: [{
              id: "a-48-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "easeIn",
                duration: 500,
                target: {
                  useEventTarget: !0,
                  id: "66b8e0336a9e61a39e9214fa|4b5d4123-592e-4096-4c67-455284559676"
                },
                xValue: 1,
                yValue: 1,
                locked: !0
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1726491021576
        },
        "a-49": {
          id: "a-49",
          title: "[CLOSE] COOKIE PREFERENCES POPUP 3",
          actionItemGroups: [{
            actionItems: [{
              id: "a-49-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".preferences_popup",
                  selectorGuids: ["fccd1bf4-c169-d015-2fbe-7463ceb653c5"]
                },
                value: "none"
              }
            }, {
              id: "a-49-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".preferences_popup",
                  selectorGuids: ["fccd1bf4-c169-d015-2fbe-7463ceb653c5"]
                },
                value: 0,
                unit: ""
              }
            }, {
              id: "a-49-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".preferences_popup",
                  selectorGuids: ["fccd1bf4-c169-d015-2fbe-7463ceb653c5"]
                },
                yValue: 10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1717025696928
        },
        "a-50": {
          id: "a-50",
          title: "[OPEN] COOKIE PREFERENCES POPUP 2",
          actionItemGroups: [{
            actionItems: [{
              id: "a-50-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".preferences_popup",
                  selectorGuids: ["fccd1bf4-c169-d015-2fbe-7463ceb653c5"]
                },
                value: "none"
              }
            }, {
              id: "a-50-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".preferences_popup",
                  selectorGuids: ["fccd1bf4-c169-d015-2fbe-7463ceb653c5"]
                },
                value: 0,
                unit: ""
              }
            }, {
              id: "a-50-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".preferences_popup",
                  selectorGuids: ["fccd1bf4-c169-d015-2fbe-7463ceb653c5"]
                },
                yValue: 10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-50-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".cookie_banner_container",
                  selectorGuids: ["fccd1bf4-c169-d015-2fbe-7463ceb653cb"]
                },
                value: "none"
              }
            }, {
              id: "a-50-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".preferences_popup",
                  selectorGuids: ["fccd1bf4-c169-d015-2fbe-7463ceb653c5"]
                },
                value: "flex"
              }
            }, {
              id: "a-50-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".preferences_popup",
                  selectorGuids: ["fccd1bf4-c169-d015-2fbe-7463ceb653c5"]
                },
                value: 1,
                unit: ""
              }
            }, {
              id: "a-50-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".preferences_popup",
                  selectorGuids: ["fccd1bf4-c169-d015-2fbe-7463ceb653c5"]
                },
                yValue: -10,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1717025696928
        },
        "a-51": {
          id: "a-51",
          title: "POPUP CLOSE BF",
          actionItemGroups: [{
            actionItems: [{
              id: "a-51-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: !0,
                  id: "664e31bc72082255f0e532dd|f42556bf-8e95-624e-4206-33b01165c10f"
                },
                value: "none"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1732283615490
        },
        "a-53": {
          id: "a-53",
          title: "Button Hover: IN 2",
          actionItemGroups: [{
            actionItems: [{
              id: "a-53-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-53-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5"]
                },
                value: "block"
              }
            }, {
              id: "a-53-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow.is-black",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5", "375196ca-a5dc-1ce5-ed4f-8d7cb82017cf"]
                },
                value: "none"
              }
            }]
          }, {
            actionItems: [{
              id: "a-53-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 110,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-53-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5"]
                },
                value: "none"
              }
            }, {
              id: "a-53-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["f6d29349-c204-6ffc-8b5a-a48fe81456b3"]
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1
              }
            }]
          }, {
            actionItems: [{
              id: "a-53-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg",
                  selectorGuids: ["26078fb2-52df-3045-67fe-f1f5ec0481f6"]
                },
                yValue: -100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX"
              }
            }, {
              id: "a-53-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow.is-black",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5", "375196ca-a5dc-1ce5-ed4f-8d7cb82017cf"]
                },
                value: "block"
              }
            }]
          }, {
            actionItems: [{
              id: "a-53-n-9",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1722515312839
        },
        "a-54": {
          id: "a-54",
          title: "Button Hover: Out 2",
          actionItemGroups: [{
            actionItems: [{
              id: "a-54-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 110,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-54-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg",
                  selectorGuids: ["26078fb2-52df-3045-67fe-f1f5ec0481f6"]
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-54-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-54-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["f6d29349-c204-6ffc-8b5a-a48fe81456b3"]
                },
                globalSwatchId: "--text-color--text-secondary",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1
              }
            }]
          }, {
            actionItems: [{
              id: "a-54-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow.is-black",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5", "375196ca-a5dc-1ce5-ed4f-8d7cb82017cf"]
                },
                value: "none"
              }
            }, {
              id: "a-54-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5"]
                },
                value: "block"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722517510249
        },
        "a-55": {
          id: "a-55",
          title: "POPUP OPEN : GET STARTED 2",
          actionItemGroups: [{
            actionItems: [{
              id: "a-55-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".popup_wrapper",
                  selectorGuids: ["ef60831a-e8bf-584b-b61b-dc6dbc77856e"]
                },
                value: "none"
              }
            }]
          }, {
            actionItems: [{
              id: "a-55-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 500,
                easing: "",
                duration: 0,
                target: {
                  selector: ".popup_wrapper",
                  selectorGuids: ["ef60831a-e8bf-584b-b61b-dc6dbc77856e"]
                },
                value: "flex"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1726230237505
        },
        "a-57": {
          id: "a-57",
          title: "POPUP OPEN CHECKLIST",
          actionItemGroups: [{
            actionItems: [{
              id: "a-57-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".popup_wrapper_checklist",
                  selectorGuids: ["2635ceab-14b5-373c-4bd2-75576d5852f1"]
                },
                value: "flex"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1734690434409
        },
        "a-58": {
          id: "a-58",
          title: "POPUP CLOSE CHECKLIST",
          actionItemGroups: [{
            actionItems: [{
              id: "a-58-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".popup_wrapper_checklist",
                  selectorGuids: ["2635ceab-14b5-373c-4bd2-75576d5852f1"]
                },
                value: "none"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1734690434409
        },
        "a-63": {
          id: "a-63",
          title: "Button Hover: IN 4",
          actionItemGroups: [{
            actionItems: [{
              id: "a-63-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-63-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5"]
                },
                value: "block"
              }
            }, {
              id: "a-63-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow.is-black",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5", "375196ca-a5dc-1ce5-ed4f-8d7cb82017cf"]
                },
                value: "none"
              }
            }]
          }, {
            actionItems: [{
              id: "a-63-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 110,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-63-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5"]
                },
                value: "none"
              }
            }, {
              id: "a-63-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["f6d29349-c204-6ffc-8b5a-a48fe81456b3"]
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1
              }
            }]
          }, {
            actionItems: [{
              id: "a-63-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg",
                  selectorGuids: ["26078fb2-52df-3045-67fe-f1f5ec0481f6"]
                },
                yValue: -100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX"
              }
            }, {
              id: "a-63-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow.is-black",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5", "375196ca-a5dc-1ce5-ed4f-8d7cb82017cf"]
                },
                value: "block"
              }
            }]
          }, {
            actionItems: [{
              id: "a-63-n-9",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outCubic",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1722515312839
        },
        "a-64": {
          id: "a-64",
          title: "Button Hover: Out 4",
          actionItemGroups: [{
            actionItems: [{
              id: "a-64-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 110,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-64-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg",
                  selectorGuids: ["26078fb2-52df-3045-67fe-f1f5ec0481f6"]
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-64-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_bg_inner",
                  selectorGuids: ["a6ee5518-7d9a-34e3-f5db-80327595535b"]
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: !1
              }
            }, {
              id: "a-64-n-4",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["f6d29349-c204-6ffc-8b5a-a48fe81456b3"]
                },
                globalSwatchId: "--text-color--text-secondary",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1
              }
            }]
          }, {
            actionItems: [{
              id: "a-64-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow.is-black",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5", "375196ca-a5dc-1ce5-ed4f-8d7cb82017cf"]
                },
                value: "none"
              }
            }, {
              id: "a-64-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button_arrow",
                  selectorGuids: ["5e4abd06-9702-9c5c-97c3-6b877d6dd7a5"]
                },
                value: "block"
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1722517510249
        },
        "a-65": {
          id: "a-65",
          title: "NAV DROPDOWN OPEN 2",
          actionItemGroups: [{
            actionItems: [{
              id: "a-65-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-dropdown_list",
                  selectorGuids: ["b763f18d-3225-a6b3-9df4-dd7dd865ecd9"]
                },
                value: 0,
                unit: ""
              }
            }]
          }, {
            actionItems: [{
              id: "a-65-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-dropdown_list",
                  selectorGuids: ["b763f18d-3225-a6b3-9df4-dd7dd865ecd9"]
                },
                value: 1,
                unit: ""
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723136441454
        },
        "a-66": {
          id: "a-66",
          title: "NAV DROPDOWN CLOSES 2",
          actionItemGroups: [{
            actionItems: [{
              id: "a-66-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-dropdown_list",
                  selectorGuids: ["b763f18d-3225-a6b3-9df4-dd7dd865ecd9"]
                },
                value: 1,
                unit: ""
              }
            }]
          }, {
            actionItems: [{
              id: "a-66-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 500,
                easing: "easeInOut",
                duration: 1000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-dropdown_list",
                  selectorGuids: ["b763f18d-3225-a6b3-9df4-dd7dd865ecd9"]
                },
                value: 0,
                unit: ""
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1723136441454
        },
        "a-67": {
          id: "a-67",
          title: "USECASE Arrow 2",
          actionItemGroups: [{
            actionItems: [{
              id: "a-67-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_arrow_usecase",
                  selectorGuids: ["73c7aa97-18c6-9134-c471-b953817cb4e7"]
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-67-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_arrow_usecase",
                  selectorGuids: ["73c7aa97-18c6-9134-c471-b953817cb4e7"]
                },
                xValue: -14,
                yValue: null,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              id: "a-67-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav_arrow_usecase",
                  selectorGuids: ["73c7aa97-18c6-9134-c471-b953817cb4e7"]
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723137272959
        },
        "a-68": {
          id: "a-68",
          title: "HAMBURGER OPEN 2",
          actionItemGroups: [{
            actionItems: [{
              id: "a-68-n",
              actionTypeId: "PLUGIN_LOTTIE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".lottie_hamburger",
                  selectorGuids: ["bcf67fda-f761-03c3-ae5e-2bb862cf3fd4"]
                },
                value: 0
              }
            }]
          }, {
            actionItems: [{
              id: "a-68-n-2",
              actionTypeId: "PLUGIN_LOTTIE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".lottie_hamburger",
                  selectorGuids: ["bcf67fda-f761-03c3-ae5e-2bb862cf3fd4"]
                },
                value: 40.4
              }
            }]
          }],
          useFirstGroupAsInitialState: !0,
          createdOn: 1723159900559
        },
        "a-69": {
          id: "a-69",
          title: "HAMBURGER CLOSE 2",
          actionItemGroups: [{
            actionItems: [{
              id: "a-69-n",
              actionTypeId: "PLUGIN_LOTTIE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".lottie_hamburger",
                  selectorGuids: ["bcf67fda-f761-03c3-ae5e-2bb862cf3fd4"]
                },
                value: 100
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1723159900559
        },
        "a-70": {
          id: "a-70",
          title: "COPY",
          actionItemGroups: [{
            actionItems: [{
              id: "a-70-n",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cop-clip",
                  selectorGuids: ["480382c8-dd45-a827-ce3a-5b611704e957"]
                },
                filters: [{
                  type: "brightness",
                  filterId: "297e",
                  value: 200,
                  unit: "%"
                }]
              }
            }, {
              id: "a-70-n-2",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cop-clip",
                  selectorGuids: ["480382c8-dd45-a827-ce3a-5b611704e957"]
                },
                filters: [{
                  type: "contrast",
                  filterId: "a727",
                  value: 55,
                  unit: "%"
                }]
              }
            }]
          }, {
            actionItems: [{
              id: "a-70-n-3",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 5000,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cop-clip",
                  selectorGuids: ["480382c8-dd45-a827-ce3a-5b611704e957"]
                },
                filters: [{
                  type: "brightness",
                  filterId: "1674",
                  value: 100,
                  unit: "%"
                }]
              }
            }, {
              id: "a-70-n-4",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 5000,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cop-clip",
                  selectorGuids: ["480382c8-dd45-a827-ce3a-5b611704e957"]
                },
                filters: [{
                  type: "contrast",
                  filterId: "c50c",
                  value: 100,
                  unit: "%"
                }]
              }
            }]
          }],
          useFirstGroupAsInitialState: !1,
          createdOn: 1744209295826
        },
        fadeIn: {
          id: "fadeIn",
          useFirstGroupAsInitialState: !0,
          actionItemGroups: [{
            actionItems: [{
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                value: 0
              }
            }]
          }, {
            actionItems: [{
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                value: 1
              }
            }]
          }]
        },
        slideInLeft: {
          id: "slideInLeft",
          useFirstGroupAsInitialState: !0,
          actionItemGroups: [{
            actionItems: [{
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                value: 0
              }
            }]
          }, {
            actionItems: [{
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                xValue: -100,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                value: 1
              }
            }, {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }]
        },
        growBigIn: {
          id: "growBigIn",
          useFirstGroupAsInitialState: !0,
          actionItemGroups: [{
            actionItems: [{
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                value: 0
              }
            }]
          }, {
            actionItems: [{
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                xValue: 0,
                yValue: 0
              }
            }]
          }, {
            actionItems: [{
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                xValue: 1,
                yValue: 1
              }
            }, {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                value: 1
              }
            }]
          }]
        },
        slideInBottom: {
          id: "slideInBottom",
          useFirstGroupAsInitialState: !0,
          actionItemGroups: [{
            actionItems: [{
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                value: 0
              }
            }]
          }, {
            actionItems: [{
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                xValue: 0,
                yValue: 100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX"
              }
            }, {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                value: 1
              }
            }]
          }]
        },
        slideInRight: {
          id: "slideInRight",
          useFirstGroupAsInitialState: !0,
          actionItemGroups: [{
            actionItems: [{
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                value: 0
              }
            }]
          }, {
            actionItems: [{
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                xValue: 100,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }, {
            actionItems: [{
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                value: 1
              }
            }, {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: !0
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX"
              }
            }]
          }]
        }
      },
      site: {
        mediaQueries: [{
          key: "main",
          min: 992,
          max: 10000
        }, {
          key: "medium",
          min: 768,
          max: 991
        }, {
          key: "small",
          min: 480,
          max: 767
        }, {
          key: "tiny",
          min: 0,
          max: 479
        }]
      }
    });
  }
}]);
