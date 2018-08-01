! function(a, b) {
    function c(a) { return function() { var b = { method: a },
                c = Array.prototype.slice.call(arguments); /^get/.test(a) ? (d.assert(c.length > 0, "Get methods require a callback."), c.unshift(b)) : (/^set/.test(a) && (d.assert(0 !== c.length, "Set methods require a value."), b.value = c[0]), c = [b]), this.send.apply(this, c) } } var d = {};
    d.DEBUG = !1, d.VERSION = "0.0.11", d.CONTEXT = "player.js", d.POST_MESSAGE = !!a.postMessage, d.origin = function(b) { return "//" === b.substr(0, 2) && (b = a.location.protocol + b), b.split("/").slice(0, 3).join("/") }, d.addEvent = function(a, b, c) { a && (a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c) }, d.log = function() { d.log.history = d.log.history || [], d.log.history.push(arguments), a.console && d.DEBUG && a.console.log(Array.prototype.slice.call(arguments)) }, d.isString = function(a) { return "[object String]" === Object.prototype.toString.call(a) }, d.isObject = function(a) { return "[object Object]" === Object.prototype.toString.call(a) }, d.isArray = function(a) { return "[object Array]" === Object.prototype.toString.call(a) }, d.isNone = function(a) { return null === a || void 0 === a }, d.has = function(a, b) { return Object.prototype.hasOwnProperty.call(a, b) }, d.indexOf = function(a, b) { if (null == a) return -1; var c = 0,
            d = a.length; if (Array.prototype.IndexOf && a.indexOf === Array.prototype.IndexOf) return a.indexOf(b); for (; d > c; c++)
            if (a[c] === b) return c;
        return -1 }, d.assert = function(a, b) { if (!a) throw b || "Player.js Assert Failed" }, d.Keeper = function() { this.init() }, d.Keeper.prototype.init = function() { this.data = {} }, d.Keeper.prototype.getUUID = function() { return "listener-xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(a) { var b = 16 * Math.random() | 0,
                c = "x" === a ? b : 3 & b | 8; return c.toString(16) }) }, d.Keeper.prototype.has = function(a, b) { if (!this.data.hasOwnProperty(a)) return !1; if (d.isNone(b)) return !0; for (var c = this.data[a], e = 0; e < c.length; e++)
            if (c[e].id === b) return !0;
        return !1 }, d.Keeper.prototype.add = function(a, b, c, d, e) { var f = { id: a, event: b, cb: c, ctx: d, one: e };
        this.has(b) ? this.data[b].push(f) : this.data[b] = [f] }, d.Keeper.prototype.execute = function(a, b, c, e) { if (!this.has(a, b)) return !1; for (var f = [], g = [], h = 0; h < this.data[a].length; h++) { var i = this.data[a][h];
            d.isNone(b) || !d.isNone(b) && i.id === b ? (g.push({ cb: i.cb, ctx: i.ctx ? i.ctx : e, data: c }), i.one === !1 && f.push(i)) : f.push(i) }
        0 === f.length ? delete this.data[a] : this.data[a] = f; for (var j = 0; j < g.length; j++) { var k = g[j];
            k.cb.call(k.ctx, k.data) } }, d.Keeper.prototype.on = function(a, b, c, d) { this.add(a, b, c, d, !1) }, d.Keeper.prototype.one = function(a, b, c, d) { this.add(a, b, c, d, !0) }, d.Keeper.prototype.off = function(a, b) { var c = []; if (!this.data.hasOwnProperty(a)) return c; for (var e = [], f = 0; f < this.data[a].length; f++) { var g = this.data[a][f];
            d.isNone(b) || g.cb === b ? d.isNone(g.id) || c.push(g.id) : e.push(g) } return 0 === e.length ? delete this.data[a] : this.data[a] = e, c }, d.Player = function(a, b) { return this instanceof d.Player ? void this.init(a, b) : new d.Player(a, b) }, d.EVENTS = { READY: "ready", PLAY: "play", PAUSE: "pause", ENDED: "ended", TIMEUPDATE: "timeupdate", PROGRESS: "progress", ERROR: "error" }, d.EVENTS.all = function() { var a = []; for (var b in d.EVENTS) d.has(d.EVENTS, b) && d.isString(d.EVENTS[b]) && a.push(d.EVENTS[b]); return a }, d.METHODS = { PLAY: "play", PAUSE: "pause", GETPAUSED: "getPaused", MUTE: "mute", UNMUTE: "unmute", GETMUTED: "getMuted", SETVOLUME: "setVolume", GETVOLUME: "getVolume", GETDURATION: "getDuration", SETCURRENTTIME: "setCurrentTime", GETCURRENTTIME: "getCurrentTime", SETLOOP: "setLoop", GETLOOP: "getLoop", REMOVEEVENTLISTENER: "removeEventListener", ADDEVENTLISTENER: "addEventListener" }, d.METHODS.all = function() { var a = []; for (var b in d.METHODS) d.has(d.METHODS, b) && d.isString(d.METHODS[b]) && a.push(d.METHODS[b]); return a }, d.READIED = [], d.Player.prototype.init = function(c, e) { var f = this;
        d.isString(c) && (c = b.getElementById(c)), this.elem = c, d.assert("IFRAME" === c.nodeName, 'playerjs.Player constructor requires an Iframe, got "' + c.nodeName + '"'), d.assert(c.src, "playerjs.Player constructor requires a Iframe with a 'src' attribute."), this.origin = d.origin(c.src), this.keeper = new d.Keeper, this.isReady = !1, this.queue = [], this.events = d.EVENTS.all(), this.methods = d.METHODS.all(), d.POST_MESSAGE ? d.addEvent(a, "message", function(a) { f.receive(a) }) : d.log("Post Message is not Available."), d.indexOf(d.READIED, c.src) > -1 ? f.loaded = !0 : this.elem.onload = function() { f.loaded = !0 } }, d.Player.prototype.send = function(a, b, c) { if (a.context = d.CONTEXT, a.version = d.VERSION, b) { var e = this.keeper.getUUID();
            a.listener = e, this.keeper.one(e, a.method, b, c) } return this.isReady || "ready" === a.value ? (d.log("Player.send", a, this.origin), this.loaded === !0 && this.elem.contentWindow.postMessage(JSON.stringify(a), this.origin), !0) : (d.log("Player.queue", a), this.queue.push(a), !1) }, d.Player.prototype.receive = function(a) { if (d.log("Player.receive", a), a.origin !== this.origin) return !1; var b; try { b = JSON.parse(a.data) } catch (c) { return !1 } return b.context !== d.CONTEXT ? !1 : ("ready" === b.event && b.value && b.value.src === this.elem.src && this.ready(b), void(this.keeper.has(b.event, b.listener) && this.keeper.execute(b.event, b.listener, b.value, this))) }, d.Player.prototype.ready = function(a) { if (this.isReady === !0) return !1;
        a.value.events && (this.events = a.value.events), a.value.methods && (this.methods = a.value.methods), this.isReady = !0, this.loaded = !0; for (var b = 0; b < this.queue.length; b++) { var c = this.queue[b];
            d.log("Player.dequeue", c), "ready" === a.event && this.keeper.execute(c.event, c.listener, !0, this), this.send(c) }
        this.queue = [] }, d.Player.prototype.on = function(a, b, c) { var d = this.keeper.getUUID(); return "ready" === a ? this.keeper.one(d, a, b, c) : this.keeper.on(d, a, b, c), this.send({ method: "addEventListener", value: a, listener: d }), !0 }, d.Player.prototype.off = function(a, b) { var c = this.keeper.off(a, b); if (d.log("Player.off", c), c.length > 0)
            for (var e in c) return this.send({ method: "removeEventListener", value: a, listener: c[e] }), !0; return !1 }, d.Player.prototype.supports = function(a, b) { d.assert(d.indexOf(["method", "event"], a) > -1, 'evtOrMethod needs to be either "event" or "method" got ' + a), b = d.isArray(b) ? b : [b]; for (var c = "event" === a ? this.events : this.methods, e = 0; e < b.length; e++)
            if (-1 === d.indexOf(c, b[e])) return !1;
        return !0 }; for (var e = 0, f = d.METHODS.all().length; f > e; e++) { var g = d.METHODS.all()[e];
        d.Player.prototype.hasOwnProperty(g) || (d.Player.prototype[g] = c(g)) }
    d.addEvent(a, "message", function(a) { var b; try { b = JSON.parse(a.data) } catch (c) { return !1 } return b.context !== d.CONTEXT ? !1 : void("ready" === b.event && b.value && b.value.src && d.READIED.push(b.value.src)) }), d.Receiver = function(a, b) { this.init(a, b) }, d.Receiver.prototype.init = function(c, e) { var f = this;
        this.isReady = !1, this.origin = d.origin(b.referrer), this.methods = {}, this.supported = { events: c ? c : d.EVENTS.all(), methods: e ? e : d.METHODS.all() }, this.eventListeners = {}, this.reject = !(a.self !== a.top && d.POST_MESSAGE), this.reject || d.addEvent(a, "message", function(a) { f.receive(a) }) }, d.Receiver.prototype.receive = function(b) { if (b.origin !== this.origin) return !1; var c = {}; if (d.isObject(b.data)) c = b.data;
        else try { c = a.JSON.parse(b.data) } catch (e) { d.log("JSON Parse Error", e) }
        if (d.log("Receiver.receive", b, c), !c.method) return !1; if (c.context !== d.CONTEXT) return !1; if (-1 === d.indexOf(d.METHODS.all(), c.method)) return this.emit("error", { code: 2, msg: 'Invalid Method "' + c.method + '"' }), !1; var f = d.isNone(c.listener) ? null : c.listener; if ("addEventListener" === c.method) this.eventListeners.hasOwnProperty(c.value) ? -1 === d.indexOf(this.eventListeners[c.value], f) && this.eventListeners[c.value].push(f) : this.eventListeners[c.value] = [f], "ready" === c.value && this.isReady && this.ready();
        else if ("removeEventListener" === c.method) { if (this.eventListeners.hasOwnProperty(c.value)) { var g = d.indexOf(this.eventListeners[c.value], f);
                g > -1 && this.eventListeners[c.value].splice(g, 1), 0 === this.eventListeners[c.value].length && delete this.eventListeners[c.value] } } else this.get(c.method, c.value, f) }, d.Receiver.prototype.get = function(a, b, c) { var d = this; if (!this.methods.hasOwnProperty(a)) return this.emit("error", { code: 3, msg: 'Method Not Supported"' + a + '"' }), !1; var e = this.methods[a]; if ("get" === a.substr(0, 3)) { var f = function(b) { d.send(a, b, c) };
            e.call(this, f) } else e.call(this, b) }, d.Receiver.prototype.on = function(a, b) { this.methods[a] = b }, d.Receiver.prototype.send = function(b, c, e) { if (d.log("Receiver.send", b, c, e), this.reject) return d.log("Receiver.send.reject", b, c, e), !1; var f = { context: d.CONTEXT, version: d.VERSION, event: b };
        d.isNone(c) || (f.value = c), d.isNone(e) || (f.listener = e); var g = JSON.stringify(f);
        a.parent.postMessage(g, "" === this.origin ? "*" : this.origin) }, d.Receiver.prototype.emit = function(a, b) { if (!this.eventListeners.hasOwnProperty(a)) return !1;
        d.log("Instance.emit", a, b, this.eventListeners[a]); for (var c = 0; c < this.eventListeners[a].length; c++) { var e = this.eventListeners[a][c];
            this.send(a, b, e) } return !0 }, d.Receiver.prototype.ready = function() { d.log("Receiver.ready"), this.isReady = !0; var b = { src: a.location.toString(), events: this.supported.events, methods: this.supported.methods };
        this.emit("ready", b) || this.send("ready", b) }, d.HTML5Adapter = function(a) { return this instanceof d.HTML5Adapter ? void this.init(a) : new d.HTML5Adapter(a) }, d.HTML5Adapter.prototype.init = function(a) { d.assert(a, "playerjs.HTML5Adapter requires a video element"); var b = this.receiver = new d.Receiver;
        a.addEventListener("playing", function() { b.emit("play") }), a.addEventListener("pause", function() { b.emit("pause") }), a.addEventListener("ended", function() { b.emit("ended") }), a.addEventListener("timeupdate", function() { b.emit("timeupdate", { seconds: a.currentTime, duration: a.duration }) }), a.addEventListener("progress", function() { b.emit("buffered", { percent: a.buffered.length }) }), b.on("play", function() { a.play() }), b.on("pause", function() { a.pause() }), b.on("getPaused", function(b) { b(a.paused) }), b.on("getCurrentTime", function(b) { b(a.currentTime) }), b.on("setCurrentTime", function(b) { a.currentTime = b }), b.on("getDuration", function(b) { b(a.duration) }), b.on("getVolume", function(b) { b(100 * a.volume) }), b.on("setVolume", function(b) { a.volume = b / 100 }), b.on("mute", function() { a.muted = !0 }), b.on("unmute", function() { a.muted = !1 }), b.on("getMuted", function(b) { b(a.muted) }), b.on("getLoop", function(b) { b(a.loop) }), b.on("setLoop", function(b) { a.loop = b }) }, d.HTML5Adapter.prototype.ready = function() { this.receiver.ready() }, d.JWPlayerAdapter = function(a) { return this instanceof d.JWPlayerAdapter ? void this.init(a) : new d.JWPlayerAdapter(a) }, d.JWPlayerAdapter.prototype.init = function(a) { d.assert(a, "playerjs.JWPlayerAdapter requires a player object"); var b = this.receiver = new d.Receiver;
        this.looped = !1, a.on("pause", function() { b.emit("pause") }), a.on("play", function() { b.emit("play") }), a.on("time", function(a) { var c = a.position,
                d = a.duration; if (!c || !d) return !1; var e = { seconds: c, duration: d };
            b.emit("timeupdate", e) }); var c = this;
        a.on("complete", function() { c.looped === !0 ? a.seek(0) : b.emit("ended") }), a.on("error", function() { b.emit("error") }), b.on("play", function() { a.play(!0) }), b.on("pause", function() { a.pause(!0) }), b.on("getPaused", function(b) { b(a.getState().toLowerCase() !== "PLAYING".toLowerCase()) }), b.on("getCurrentTime", function(b) { b(a.getPosition()) }), b.on("setCurrentTime", function(b) { a.seek(b) }), b.on("getDuration", function(b) { b(a.getDuration()) }), b.on("getVolume", function(b) { b(a.getVolume()) }), b.on("setVolume", function(b) { a.setVolume(b) }), b.on("mute", function() { a.setMute(!0) }), b.on("unmute", function() { a.setMute(!1) }), b.on("getMuted", function(b) { b(a.getMute() === !0) }), b.on("getLoop", function(a) { a(this.looped) }, this), b.on("setLoop", function(a) { this.looped = a }, this) }, d.JWPlayerAdapter.prototype.ready = function() { this.receiver.ready() }, d.MockAdapter = function() { return this instanceof d.MockAdapter ? void this.init() : new d.MockAdapter }, d.MockAdapter.prototype.init = function() { var a = { duration: 20, currentTime: 0, interval: null, timeupdate: function() {}, volume: 100, mute: !1, playing: !1, loop: !1, play: function() { a.interval = setInterval(function() { a.currentTime += .25, a.timeupdate({ seconds: a.currentTime, duration: a.duration }) }, 250), a.playing = !0 }, pause: function() { clearInterval(a.interval), a.playing = !1 } },
            b = this.receiver = new d.Receiver;
        b.on("play", function() { var b = this;
            a.play(), this.emit("play"), a.timeupdate = function(a) { b.emit("timeupdate", a) } }), b.on("pause", function() { a.pause(), this.emit("pause") }), b.on("getPaused", function(b) { b(!a.playing) }), b.on("getCurrentTime", function(b) { b(a.currentTime) }), b.on("setCurrentTime", function(b) { a.currentTime = b }), b.on("getDuration", function(b) { b(a.duration) }), b.on("getVolume", function(b) { b(a.volume) }), b.on("setVolume", function(b) { a.volume = b }), b.on("mute", function() { a.mute = !0 }), b.on("unmute", function() { a.mute = !1 }), b.on("getMuted", function(b) { b(a.mute) }), b.on("getLoop", function(b) { b(a.loop) }), b.on("setLoop", function(b) { a.loop = b }) }, d.MockAdapter.prototype.ready = function() { this.receiver.ready() }, d.VideoJSAdapter = function(a) { return this instanceof d.VideoJSAdapter ? void this.init(a) : new d.VideoJSAdapter(a) }, d.VideoJSAdapter.prototype.init = function(a) { d.assert(a, "playerjs.VideoJSReceiver requires a player object"); var b = this.receiver = new d.Receiver;
        a.on("pause", function() { b.emit("pause") }), a.on("play", function() { b.emit("play") }), a.on("timeupdate", function(c) { var d = a.currentTime(),
                e = a.duration(); if (!d || !e) return !1; var f = { seconds: d, duration: e };
            b.emit("timeupdate", f) }), a.on("ended", function() { b.emit("ended") }), a.on("error", function() { b.emit("error") }), b.on("play", function() { a.play() }), b.on("pause", function() { a.pause() }), b.on("getPaused", function(b) { b(a.paused()) }), b.on("getCurrentTime", function(b) { b(a.currentTime()) }), b.on("setCurrentTime", function(b) { a.currentTime(b) }), b.on("getDuration", function(b) { b(a.duration()) }), b.on("getVolume", function(b) { b(100 * a.volume()) }), b.on("setVolume", function(b) { a.volume(b / 100) }), b.on("mute", function() { a.volume(0) }), b.on("unmute", function() { a.volume(1) }), b.on("getMuted", function(b) { b(0 === a.volume()) }), b.on("getLoop", function(b) { b(a.loop()) }), b.on("setLoop", function(b) { a.loop(b) }) }, d.VideoJSAdapter.prototype.ready = function() { this.receiver.ready() }, "function" == typeof define && define.amd ? define(function() { return d }) : "object" == typeof module && module.exports ? module.exports = d : a.playerjs = d }(window, document);