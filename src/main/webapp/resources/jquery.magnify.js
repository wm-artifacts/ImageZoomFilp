/*!
 *  __  __    _    ____ _   _ ___ _______   __
 * |  \/  |  / \  / ___| \ | |_ _|  ___\ \ / /
 * | |\/| | / _ \| |  _|  \| || || |_   \ V /
 * | |  | |/ ___ \ |_| | |\  || ||  _|   | |
 * |_|  |_/_/   \_\____|_| \_|___|_|     |_|
 *
 * jquery.magnify - v1.6.3
 * A jQuery plugin to view images just like in windows
 * https://github.com/nzbin/magnify#readme
 *
 * Copyright (c) 2017 nzbin
 * Released under the MIT License
 */
! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? t(require("jquery")) : t(jQuery)
}(function(C) {
    "use strict";

    function o(t) {
        return C(t).attr("data-src") ? C(t).attr("data-src") : C(t).attr("href")
    }

    function S(t, i, e, a) {
        var s = a ? t.h : t.w,
            t = a ? t.w : t.h;
        (t > i.h || s > i.w) && e.addClass("is-grab"), t <= i.h && s <= i.w && e.removeClass("is-grab")
    }

    function t() {
        return "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch
    }

    function I() {
        return "Microsoft Internet Explorer" == navigator.appName && 0 < navigator.appVersion.indexOf("MSIE 8.0") || "Microsoft Internet Explorer" == navigator.appName && 0 < navigator.appVersion.indexOf("MSIE 7.0")
    }

    function a(t, i) {
        this.options = C.extend(!0, {}, r, i), i && C.isArray(i.footerToolbar) && (this.options.footerToolbar = i.footerToolbar), i && C.isArray(i.headerToolbar) && (this.options.headerToolbar = i.headerToolbar), this.$el = C(t), this.isOpened = !1, this.isMaximized = !1, this.isRotated = !1, this.rotateAngle = 0, this.isDoResize = !1, this.imageData = {}, this.modalData = {
            width: null,
            height: null,
            left: null,
            top: null
        }, this.init(t, this.options)
    }
    var l = C(window),
        D = C(document),
        s = "click",
        e = "resize",
        n = "keydown",
        h = "wheel mousewheel DOMMouseScroll",
        E = t() ? "touchstart" : "mousedown",
        W = t() ? "touchmove" : "mousemove",
        O = t() ? "touchend" : "mouseup",
        H = ".magnify",
        r = {
            draggable: !0,
            resizable: !0,
            movable: !0,
            keyboard: !0,
            title: !0,
            modalWidth: 320,
            modalHeight: 320,
            fixedContent: !0,
            fixedModalSize: !1,
            initMaximized: !1,
            gapThreshold: .02,
            ratioThreshold: .1,
            minRatio: .05,
            maxRatio: 16,
            headerToolbar: ["maximize", "close"],
            footerToolbar: ["zoomIn", "zoomOut", "prev", "fullscreen", "next", "actualSize", "rotateRight"],
            icons: {
                minimize: '<svg viewBox="0 0 1024 1024" class="svg-inline-icon">          <path fill="currentColor" d="M1024 749.714v109.714c0 50.286-41.143 91.429-91.429 91.429          h-841.143c-50.286 0-91.429-41.143-91.429-91.429v-109.714c0-50.286 41.143-91.429 91.429          -91.429h841.143c50.286 0 91.429 41.143 91.429 91.429z"></path>        </svg>',
                maximize: '<svg viewBox="0 0 1024 1024" class="svg-inline-icon">          <path fill="currentColor" d="M146.286 804.571h731.429v-438.857h-731.429v438.857z          M1024 164.571v694.857c0 50.286-41.143 91.429-91.429 91.429h-841.143c-50.286 0          -91.429-41.143-91.429-91.429v-694.857c0-50.286 41.143-91.429 91.429-91.429          h841.143c50.286 0 91.429 41.143 91.429 91.429z"></path>        </svg>',
                close: '<svg viewBox="0 0 804.5714285714286 1024" class="svg-inline-icon">          <path fill="currentColor" d="M741.714 755.429c0 14.286-5.714 28.571-16 38.857          l-77.714 77.714c-10.286 10.286-24.571 16-38.857 16s-28.571-5.714-38.857-16l-168-168          -168 168c-10.286 10.286-24.571 16-38.857 16s-28.571-5.714-38.857-16l-77.714-77.714          c-10.286-10.286-16-24.571-16-38.857s5.714-28.571 16-38.857l168-168-168-168c-10.286-10.286          -16-24.571-16-38.857s5.714-28.571 16-38.857l77.714-77.714c10.286-10.286 24.571-16 38.857          -16s28.571 5.714 38.857 16l168 168 168-168c10.286-10.286 24.571-16 38.857-16          s28.571 5.714 38.857 16l77.714 77.714c10.286 10.286 16 24.571 16 38.857s-5.714 28.571          -16 38.857l-168 168 168 168c10.286 10.286 16 24.571 16 38.857z"></path>        </svg>',
                zoomIn: '<svg viewBox="0 0 950.8571428571428 1024" class="svg-inline-icon">          <path fill="currentColor" d="M585.143 457.143v36.571c0 9.714-8.571 18.286-18.286 18.286          h-128v128c0 9.714-8.571 18.286-18.286 18.286h-36.571c-9.714 0-18.286-8.571-18.286-18.286          v-128h-128c-9.714 0-18.286-8.571-18.286-18.286v-36.571c0-9.714 8.571-18.286 18.286-18.286          h128v-128c0-9.714 8.571-18.286 18.286-18.286h36.571c9.714 0 18.286 8.571 18.286 18.286          v128h128c9.714 0 18.286 8.571 18.286 18.286zM658.286 475.429c0-141.143-114.857-256-256          -256s-256 114.857-256 256 114.857 256 256 256 256-114.857 256-256zM950.857 950.857          c0 40.571-32.571 73.143-73.143 73.143-19.429 0-38.286-8-51.429-21.714l-196-195.429          c-66.857 46.286-146.857 70.857-228 70.857-222.286 0-402.286-180-402.286-402.286s180          -402.286 402.286-402.286 402.286 180 402.286 402.286c0 81.143-24.571 161.143-70.857 228          l196 196c13.143 13.143 21.143 32 21.143 51.429z"></path>        </svg>',
                zoomOut: '<svg viewBox="0 0 950.8571428571428 1024" class="svg-inline-icon">          <path fill="currentColor" d="M585.143 457.143v36.571c0 9.714-8.571 18.286-18.286 18.286          h-329.143c-9.714 0-18.286-8.571-18.286-18.286v-36.571c0-9.714 8.571-18.286 18.286-18.286          h329.143c9.714 0 18.286 8.571 18.286 18.286zM658.286 475.429c0-141.143-114.857-256-256          -256s-256 114.857-256 256 114.857 256 256 256 256-114.857 256-256zM950.857 950.857          c0 40.571-32.571 73.143-73.143 73.143-19.429 0-38.286-8-51.429-21.714l-196-195.429          c-66.857 46.286-146.857 70.857-228 70.857-222.286 0-402.286-180-402.286-402.286s180          -402.286 402.286-402.286 402.286 180 402.286 402.286c0 81.143-24.571 161.143-70.857 228          l196 196c13.143 13.143 21.143 32 21.143 51.429z"></path>        </svg>',
                prev: '<svg viewBox="0 0 914.2857142857142 1024" class="svg-inline-icon">          <path fill="currentColor" d="M877.714 512v73.143c0 38.857-25.714 73.143-66.857 73.143          h-402.286l167.429 168c13.714 13.143 21.714 32 21.714 51.429s-8 38.286-21.714 51.429          l-42.857 43.429c-13.143 13.143-32 21.143-51.429 21.143s-38.286-8-52-21.143l-372-372.571          c-13.143-13.143-21.143-32-21.143-51.429s8-38.286 21.143-52l372-371.429c13.714          -13.714 32.571-21.714 52-21.714s37.714 8 51.429 21.714l42.857 42.286          c13.714 13.714 21.714 32.571 21.714 52s-8 38.286-21.714 52l-167.429 167.429h402.286          c41.143 0 66.857 34.286 66.857 73.143z"></path>        </svg>',
                next: '<svg viewBox="0 0 841.1428571428571 1024" class="svg-inline-icon">          <path fill="currentColor" d="M841.143 548.571c0 19.429-7.429 38.286-21.143 52l-372 372          c-13.714 13.143-32.571 21.143-52 21.143s-37.714-8-51.429-21.143l-42.857-42.857c-13.714          -13.714-21.714-32.571-21.714-52s8-38.286 21.714-52l167.429-167.429h-402.286c-41.143 0          -66.857-34.286-66.857-73.143v-73.143c0-38.857 25.714-73.143 66.857-73.143h402.286          l-167.429-168c-13.714-13.143-21.714-32-21.714-51.429s8-38.286 21.714-51.429l42.857          -42.857c13.714-13.714 32-21.714 51.429-21.714s38.286 8 52 21.714l372 372          c13.714 13.143 21.143 32 21.143 51.429z"></path>        </svg>',
                fullscreen: '<svg viewBox="0 0 1097.142857142857 1024" class="svg-inline-icon">          <path fill="currentColor" d="M365.714 329.143c0 60.571-49.143 109.714-109.714 109.714          s-109.714-49.143-109.714-109.714 49.143-109.714 109.714          -109.714 109.714 49.143 109.714 109.714zM950.857 548.571v256h-804.571v-109.714l182.857          -182.857 91.429 91.429 292.571-292.571zM1005.714 146.286h-914.286c-9.714 0-18.286 8.571          -18.286 18.286v694.857c0 9.714 8.571 18.286 18.286 18.286h914.286c9.714 0 18.286          -8.571 18.286-18.286v-694.857c0-9.714-8.571-18.286-18.286-18.286zM1097.143 164.571          v694.857c0 50.286-41.143 91.429-91.429 91.429h-914.286c-50.286 0-91.429-41.143-91.429          -91.429v-694.857c0-50.286 41.143-91.429 91.429-91.429h914.286          c50.286 0 91.429 41.143 91.429 91.429z"></path>        </svg>',
                actualSize: '<svg viewBox="0 0 877.7142857142857 1024" class="svg-inline-icon">          <path fill="currentColor" d="M733.143 309.143l-202.857 202.857 202.857 202.857 82.286          -82.286c10.286-10.857 26.286-13.714 40-8 13.143 5.714 22.286 18.857 22.286 33.714v256          c0 20-16.571 36.571-36.571 36.571h-256c-14.857 0-28-9.143-33.714-22.857-5.714-13.143          -2.857-29.143 8-39.429l82.286-82.286-202.857-202.857-202.857 202.857 82.286 82.286          c10.857 10.286 13.714 26.286 8 39.429-5.714 13.714-18.857 22.857-33.714 22.857h-256          c-20 0-36.571-16.571-36.571-36.571v-256c0-14.857 9.143-28 22.857-33.714 13.143          -5.714 29.143-2.857 39.429 8l82.286 82.286 202.857-202.857-202.857-202.857-82.286 82.286          c-6.857 6.857-16 10.857-25.714 10.857-4.571 0-9.714-1.143-13.714-2.857-13.714-5.714          -22.857-18.857-22.857-33.714v-256c0-20 16.571-36.571 36.571-36.571h256          c14.857 0 28 9.143 33.714 22.857 5.714 13.143 2.857 29.143-8 39.429          l-82.286 82.286 202.857 202.857 202.857-202.857-82.286-82.286c-10.857-10.286-13.714          -26.286-8-39.429 5.714-13.714 18.857-22.857 33.714-22.857h256          c20 0 36.571 16.571 36.571 36.571v256c0 14.857-9.143 28-22.286 33.714-4.571 1.714          -9.714 2.857-14.286 2.857-9.714 0-18.857-4-25.714-10.857z"></path>        </svg>',
                rotateLeft: '<svg viewBox="0 0 877.7142857142857 1024" class="svg-inline-icon">          <path fill="currentColor" d="M877.714 512c0 241.714-197.143 438.857-438.857 438.857          -130.857 0-254.286-57.714-337.714-158.286-5.714-7.429-5.143-18.286 1.143-24.571l78.286          -78.857c4-3.429 9.143-5.143 14.286          -5.143 5.143 0.571 10.286 2.857 13.143 6.857 56 72.571 140 113.714 230.857 113.714 161.143 0 292.571          -131.429 292.571-292.571s-131.429-292.571-292.571-292.571c-74.857 0-145.714 28.571          -198.857 78.286l78.286 78.857c10.857 10.286 13.714 26.286 8 39.429-5.714 13.714          -18.857 22.857-33.714 22.857h-256c-20 0-36.571-16.571-36.571-36.571v-256          c0-14.857 9.143-28 22.857-33.714 13.143-5.714 29.143-2.857 39.429 8l74.286 73.714          c80.571-76 189.714-121.143 302.286-121.143 241.714 0 438.857 197.143 438.857 438.857z"></path>        </svg>',
                rotateRight: '<svg viewBox="0 0 877.7142857142857 1024" class="svg-inline-icon">          <path fill="currentColor" d="M877.714 146.286v256c0 20-16.571 36.571-36.571 36.571h-256          c-14.857 0-28-9.143-33.714-22.857-5.714-13.143-2.857-29.143 8-39.429l78.857-78.857          c-53.714-49.714-124.571-78.286-199.429-78.286-161.143 0-292.571 131.429-292.571 292.571          s131.429 292.571 292.571 292.571c90.857 0 174.857-41.143 230.857-113.714 2.857-4 8          -6.286 13.143-6.857 5.143 0 10.286 1.714 14.286 5.143l78.286 78.857          c6.857 6.286 6.857 17.143 1.143 24.571-83.429 100.571-206.857 158.286-337.714 158.286          -241.714 0-438.857-197.143-438.857-438.857s197.143-438.857 438.857-438.857          c112.571 0 221.714 45.143 302.286 121.143l74.286-73.714c10.286-10.857 26.286-13.714 40          -8 13.143 5.714 22.286 18.857 22.286 33.714z"></path>        </svg>'
            },
            i18n: {
                minimize: "minimize",
                maximize: "maximize",
                close: "close",
                zoomIn: "zoom-in(+)",
                zoomOut: "zoom-out(-)",
                prev: "prev(←)",
                next: "next(→)",
                fullscreen: "fullscreen",
                actualSize: "actual-size(Ctrl+Alt+0)",
                rotateLeft: "rotate-left(Ctrl+,)",
                rotateRight: "rotate-right(Ctrl+.)"
            },
            multiInstances: !0,
            initEvent: "click",
            initAnimation: !0,
            fixedModalPos: !1,
            zIndex: 1090,
            dragHandle: !1,
            callbacks: {
                beforeOpen: C.noop,
                opened: C.noop,
                beforeClose: C.noop,
                closed: C.noop,
                beforeChange: C.noop,
                changed: C.noop
            },
            progressiveLoading: !0,
            customButtons: {}
        },
        R = {
            isMoving: !1,
            isResizing: !1,
            zIndex: r.zIndex
        },
        g = null;
    a.prototype = {
        init: function(t, i) {
            var e = o(t);
            this.groupName = null;
            var a = C(t).attr("data-group"),
                t = D.find('[data-group="' + a + '"]');
            void 0 !== a ? (this.groupName = a, this.getImageGroup(t, e)) : this.getImageGroup(g.not("[data-group]"), e), this.open(), this.loadImage(e), i.draggable && this.draggable(this.$magnify, this.dragHandle, ".magnify-button"), i.movable && this.movable(this.$stage, I() ? ".magnify-image" : this.$image), i.resizable && this.resizable(this.$magnify, this.$stage, I() ? ".magnify-image" : this.$image, i.modalWidth, i.modalHeight)
        },
        _createBtns: function(t) {
            var e = this,
                a = ["minimize", "maximize", "close", "zoomIn", "zoomOut", "prev", "next", "fullscreen", "actualSize", "rotateLeft", "rotateRight"],
                s = "";
            return C.each(t, function(t, i) {
                0 <= C.inArray(i, a) ? s += '<button class="magnify-button magnify-button-' + i + '" title="' + e.options.i18n[i] + '">' + e.options.icons[i] + "</button>" : e.options.customButtons[i] && (s += '<button class="magnify-button magnify-button-' + i + '" title="' + (e.options.customButtons[i].title || "") + '">' + e.options.customButtons[i].text + "</button>")
            }), s
        },
        _createTitle: function() {
            return this.options.title ? '<div class="magnify-title"></div>' : ""
        },
        _createTemplate: function() {
            return '<div class="magnify-modal" tabindex="0">        <div class="magnify-header">          <div class="magnify-toolbar">' + this._createBtns(this.options.headerToolbar) + "          </div>" + this._createTitle() + '        </div>        <div class="magnify-stage">          <img class="magnify-image" src="" alt="" />        </div>        <div class="magnify-footer">          <div class="magnify-toolbar">' + this._createBtns(this.options.footerToolbar) + "          </div>        </div>      </div>"
        },
        build: function() {
            var t = this._createTemplate(),
                t = C(t);
            this.$magnify = t, this.$stage = t.find(".magnify-stage"), this.$title = t.find(".magnify-title"), this.$image = t.find(".magnify-image"), this.$close = t.find(".magnify-button-close"), this.$maximize = t.find(".magnify-button-maximize"), this.$minimize = t.find(".magnify-button-minimize"), this.$zoomIn = t.find(".magnify-button-zoomIn"), this.$zoomOut = t.find(".magnify-button-zoomOut"), this.$actualSize = t.find(".magnify-button-actualSize"), this.$fullscreen = t.find(".magnify-button-fullscreen"), this.$rotateLeft = t.find(".magnify-button-rotateLeft"), this.$rotateRight = t.find(".magnify-button-rotateRight"), this.$prev = t.find(".magnify-button-prev"), this.$next = t.find(".magnify-button-next"), this.$stage.addClass("stage-ready"), this.$image.addClass("image-ready"), this.$magnify.css("z-index", R.zIndex), this.options.dragHandle && ".magnify-modal" !== this.options.dragHandle ? this.dragHandle = this.$magnify.find(this.options.dragHandle) : this.dragHandle = this.$magnify, C("body").append(this.$magnify), this._addEvents(), this._addCustomButtonEvents()
        },
        open: function() {
            var t;
            this._triggerHook("beforeOpen", this), this.options.multiInstances || C(".magnify-modal").eq(0).remove(), !C(".magnify-modal").length && this.options.fixedContent && (C("html").css({
                overflow: "hidden"
            }), document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && ((t = function() {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t);
                var i = t.offsetWidth - t.clientWidth;
                return document.body.removeChild(t), i
            }()) && C("html").css({
                "padding-right": t
            }))), this.build(), this.setModalPos(this.$magnify), this.$magnify.focus(), this._triggerHook("opened", this)
        },
        close: function(t) {
            this._triggerHook("beforeClose", this), this.$magnify.remove(), this.isOpened = !1, this.isMaximized = !1, this.isRotated = !1, this.rotateAngle = 0, C(".magnify-modal").length || (this.options.fixedContent && C("html").css({
                overflow: "",
                "padding-right": ""
            }), this.options.multiInstances && (R.zIndex = this.options.zIndex), l.off(e + H)), this._triggerHook("closed", this)
        },
        setModalPos: function(t) {
            var i = l.width(),
                e = l.height(),
                a = D.scrollLeft(),
                s = D.scrollTop(),
                o = this.options.modalWidth,
                n = this.options.modalHeight;
            this.options.initMaximized ? (t.addClass("magnify-maximize"), t.css({
                width: "100%",
                height: "100%",
                left: 0,
                top: 0
            }), this.isOpened = !0, this.isMaximized = !0) : t.css({
                width: o,
                height: n,
                left: (i - o) / 2 + a + "px",
                top: (e - n) / 2 + s + "px"
            })
        },
        setModalSize: function(t) {
            var i = this,
                e = l.width(),
                a = l.height(),
                s = D.scrollLeft(),
                o = D.scrollTop(),
                n = {
                    left: this.$stage.css("left"),
                    right: this.$stage.css("right"),
                    top: this.$stage.css("top"),
                    bottom: this.$stage.css("bottom"),
                    borderLeft: this.$stage.css("border-left-width"),
                    borderRight: this.$stage.css("border-right-width"),
                    borderTop: this.$stage.css("border-top-width"),
                    borderBottom: this.$stage.css("border-bottom-width")
                },
                h = t.width + parseFloat(n.left) + parseFloat(n.right) + parseFloat(n.borderLeft) + parseFloat(n.borderRight),
                r = t.height + parseFloat(n.top) + parseFloat(n.bottom) + parseFloat(n.borderTop) + parseFloat(n.borderBottom),
                n = (0 < this.options.gapThreshold ? this.options.gapThreshold : 0) + 1,
                n = Math.min(e / (h * n), a / (r * n), 1),
                h = Math.max(h * n, this.options.modalWidth),
                n = Math.max(r * n, this.options.modalHeight),
                o = {
                    width: (h = this.options.fixedModalSize ? this.options.modalWidth : Math.round(h)) + "px",
                    height: (n = this.options.fixedModalSize ? this.options.modalHeight : Math.round(n)) + "px",
                    left: (e - h) / 2 + s + "px",
                    top: (a - n) / 2 + o + "px"
                };
            this.options.initAnimation ? this.$magnify.animate(o, function() {
                i.setImageSize(t)
            }) : (this.$magnify.css(o), this.setImageSize(t)), this.isOpened = !0
        },
        getImageScaleToStage: function(t, i) {
            return this.isRotated ? Math.min(t / this.img.height, i / this.img.width, 1) : Math.min(t / this.img.width, i / this.img.height, 1)
        },
        setImageSize: function(t) {
            var i = I() ? this.$stage.find(".magnify-image") : this.$image,
                e = {
                    w: this.$stage.width(),
                    h: this.$stage.height()
                },
                a = this.getImageScaleToStage(e.w, e.h);
            i.css({
                width: Math.ceil(t.width * a) + "px",
                height: Math.ceil(t.height * a) + "px",
                left: (e.w - Math.ceil(t.width * a)) / 2 + "px",
                top: (e.h - Math.ceil(t.height * a)) / 2 + "px"
            }), I() && i.find("group").css({
                width: Math.floor(t.width * a) + "px",
                height: Math.floor(t.height * a) + "px"
            }), C.extend(this.imageData, {
                initWidth: t.width * a,
                initHeight: t.height * a,
                initLeft: (e.w - t.width * a) / 2,
                initTop: (e.h - t.height * a) / 2,
                width: t.width * a,
                height: t.height * a,
                left: (e.w - t.width * a) / 2,
                top: (e.h - t.height * a) / 2
            }), S({
                w: i.width(),
                h: i.height()
            }, {
                w: this.$stage.width(),
                h: this.$stage.height()
            }, this.$stage, this.isRotated), this.imageLoaded || (this.$magnify.find(".magnify-loader").remove(), this.$stage.removeClass("stage-ready"), this.$image.removeClass("image-ready"), this.options.initAnimation && !this.options.progressiveLoading && i.fadeIn(), this.imageLoaded = !0)
        },
        loadImage: function(t, i, e) {
            var a, s, o, n, h = this;
            this.$image.removeAttr("style").attr("src", ""), this.isRotated = !1, this.rotateAngle = 0, this.imageLoaded = !1, this.$magnify.append('<div class="magnify-loader"></div>'), this.$stage.addClass("stage-ready"), this.$image.addClass("image-ready"), this.options.initAnimation && !this.options.progressiveLoading && this.$image.hide(), I() ? this.$stage.html('<img class="magnify-image" id="magnify-image" src="' + t + '" alt="" />') : this.$image.attr("src", t), a = t, s = function(t) {
                h.img = t, h.imageData = {
                    originalWidth: t.width,
                    originalHeight: t.height
                }, h.isMaximized || h.isOpened && h.options.fixedModalPos ? h.setImageSize(t) : h.setModalSize(t), i && i.call()
            }, o = function() {
                h.$magnify.find(".magnify-loader").remove(), e && e.call()
            }, (n = new Image).onload = function() {
                s(n)
            }, n.onerror = function() {
                o(n)
            }, n.src = a, this.options.title && this.setImageTitle(t)
        },
        getImageGroup: function(t, a) {
            var s = this;
            s.groupData = [], C(t).each(function(t, i) {
                var e = o(this);
                s.groupData.push({
                    src: e,
                    caption: C(this).attr("data-caption")
                }), a === e && (s.groupIndex = t)
            })
        },
        setImageTitle: function(t) {
            t = this.groupData[this.groupIndex].caption || t.replace(/^.*?\/*([^/?]*)\.[a-z]+(\?.+|$)/gi, "$1");
            this.$title.html(t)
        },
        jump: function(t) {
            this._triggerHook("beforeChange", [this, this.groupIndex]), this.groupIndex = this.groupIndex + t, this.jumpTo(this.groupIndex)
        },
        jumpTo: function(t) {
            var i = this;
            0 <= (t %= this.groupData.length) ? t %= this.groupData.length : t < 0 && (t = (this.groupData.length + t) % this.groupData.length), this.groupIndex = t, this.loadImage(this.groupData[t].src, function() {
                i._triggerHook("changed", [i, t])
            }, function() {
                i._triggerHook("changed", [i, t])
            })
        },
        wheel: function(t) {
            t.preventDefault();
            var i = 1;
            t.originalEvent.deltaY ? i = 0 < t.originalEvent.deltaY ? 1 : -1 : t.originalEvent.wheelDelta ? i = -t.originalEvent.wheelDelta / 120 : t.originalEvent.detail && (i = 0 < t.originalEvent.detail ? 1 : -1);
            var e = -i * this.options.ratioThreshold,
                i = {
                    x: t.originalEvent.clientX - this.$stage.offset().left + D.scrollLeft(),
                    y: t.originalEvent.clientY - this.$stage.offset().top + D.scrollTop()
                };
            this.zoom(e, i, t)
        },
        zoom: function(t, i, e) {
            this.$image = I() ? this.$stage.find(".magnify-image") : this.$image, t = t < 0 ? 1 / (1 - t) : 1 + t, (t = this.$image.width() / this.imageData.originalWidth * t) > this.options.maxRatio || t < this.options.minRatio || this.zoomTo(t, i, e)
        },
        zoomTo: function(t, i, e) {
            var a = I() ? this.$stage.find(".magnify-image") : this.$image,
                s = this.$stage,
                o = this.imageData.width,
                n = this.imageData.height,
                h = this.imageData.left,
                r = this.imageData.top,
                l = {
                    w: s.width(),
                    h: s.height(),
                    x: s.offset().left,
                    y: s.offset().top
                },
                g = this.imageData.originalWidth * t,
                c = this.imageData.originalHeight * t,
                s = i.x - (i.x - h) / o * g,
                t = i.y - (i.y - r) / n * c,
                h = this.isRotated ? (g - c) / 2 : 0,
                o = this.isRotated ? c : g,
                i = this.isRotated ? g : c,
                r = l.w - g,
                n = l.h - c,
                t = i <= l.h ? (l.h - c) / 2 : h < t ? h : n - h < t ? t : n - h,
                s = o <= l.w ? (l.w - g) / 2 : -h < s ? -h : r + h < s ? s : r + h;
            Math.abs(this.imageData.initWidth - g) < .05 * this.imageData.initWidth ? this.setImageSize(this.img) : (a.css({
                width: Math.round(g) + "px",
                height: Math.round(c) + "px",
                left: Math.round(s) + "px",
                top: Math.round(t) + "px"
            }), I() && a.find("group").css({
                width: Math.ceil(g) + "px",
                height: Math.ceil(c) + "px"
            }), S({
                w: Math.round(o),
                h: Math.round(i)
            }, {
                w: l.w,
                h: l.h
            }, this.$stage)), C.extend(this.imageData, {
                width: g,
                height: c,
                left: s,
                top: t
            })
        },
        rotate: function(t) {
            this.rotateAngle = this.rotateAngle + t, this.rotateAngle / 90 % 2 == 0 ? this.isRotated = !1 : this.isRotated = !0, this.rotateTo(this.rotateAngle)
        },
        rotateTo: function(t) {
            (I() ? this.$stage.find(".magnify-image") : this.$image).rotate({
                angle: t
            }), this.setImageSize({
                width: this.imageData.originalWidth,
                height: this.imageData.originalHeight
            }), this.$stage.removeClass("is-grab")
        },
        resize: function() {
            var e, a, s, t = this;
            return e = function() {
                    t.isOpened && (t.isMaximized ? t.setImageSize({
                        width: t.imageData.originalWidth,
                        height: t.imageData.originalHeight
                    }) : t.setModalSize({
                        width: t.imageData.originalWidth,
                        height: t.imageData.originalHeight
                    }))
                }, a = 500, s = null,
                function() {
                    var t = this,
                        i = arguments;
                    clearTimeout(s), s = setTimeout(function() {
                        e.apply(t, i)
                    }, a)
                }
        },
        maximize: function() {
            var t, i;
            this.$magnify.focus(), this.isMaximized ? (this.$magnify.removeClass("magnify-maximize"), t = (l.width() - this.options.modalWidth) / 2 + D.scrollLeft(), i = (l.height() - this.options.modalHeight) / 2 + D.scrollTop(), this.$magnify.css({
                width: this.modalData.width || this.options.modalWidth,
                height: this.modalData.height || this.options.modalHeight,
                left: this.modalData.left || t,
                top: this.modalData.top || i
            }), this.isMaximized = !1) : (this.modalData = {
                width: this.$magnify.width(),
                height: this.$magnify.height(),
                left: this.$magnify.offset().left,
                top: this.$magnify.offset().top
            }, this.$magnify.addClass("magnify-maximize"), this.$magnify.css({
                width: "100%",
                height: "100%",
                left: 0,
                top: 0
            }), this.isMaximized = !0), this.setImageSize({
                width: this.imageData.originalWidth,
                height: this.imageData.originalHeight
            })
        },
        fullscreen: function() {
            var t;
            this.$magnify.focus(), (t = this.$magnify[0]).requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.msRequestFullscreen && t.msRequestFullscreen()
        },
        _keydown: function(t) {
            var i = this;
            if (!this.options.keyboard) return !1;
            var e = t.keyCode || t.which || t.charCode,
                a = t.ctrlKey || t.metaKey,
                s = t.altKey || t.metaKey;
            switch (e) {
                case 37:
                    i.jump(-1);
                    break;
                case 39:
                    i.jump(1);
                    break;
                case 187:
                    i.zoom(3 * i.options.ratioThreshold, {
                        x: i.$stage.width() / 2,
                        y: i.$stage.height() / 2
                    }, t);
                    break;
                case 189:
                    i.zoom(3 * -i.options.ratioThreshold, {
                        x: i.$stage.width() / 2,
                        y: i.$stage.height() / 2
                    }, t);
                    break;
                case 61:
                    i.zoom(3 * i.options.ratioThreshold, {
                        x: i.$stage.width() / 2,
                        y: i.$stage.height() / 2
                    }, t);
                    break;
                case 173:
                    i.zoom(3 * -i.options.ratioThreshold, {
                        x: i.$stage.width() / 2,
                        y: i.$stage.height() / 2
                    }, t);
                    break;
                case 48:
                    a && s && i.zoomTo(1, {
                        x: i.$stage.width() / 2,
                        y: i.$stage.height() / 2
                    }, t);
                    break;
                case 188:
                    a && i.rotate(-90);
                    break;
                case 190:
                    a && i.rotate(90);
                    break;
                case 81:
                    this.close()
            }
        },
        _addEvents: function() {
            var i = this;
            this.$close.off(s + H).on(s + H, function(t) {
                i.close()
            }), this.$stage.off(h + H).on(h + H, function(t) {
                i.wheel(t)
            }), this.$zoomIn.off(s + H).on(s + H, function(t) {
                i.zoom(3 * i.options.ratioThreshold, {
                    x: i.$stage.width() / 2,
                    y: i.$stage.height() / 2
                }, t)
            }), this.$zoomOut.off(s + H).on(s + H, function(t) {
                i.zoom(3 * -i.options.ratioThreshold, {
                    x: i.$stage.width() / 2,
                    y: i.$stage.height() / 2
                }, t)
            }), this.$actualSize.off(s + H).on(s + H, function(t) {
                i.zoomTo(1, {
                    x: i.$stage.width() / 2,
                    y: i.$stage.height() / 2
                }, t)
            }), this.$prev.off(s + H).on(s + H, function() {
                i.jump(-1)
            }), this.$fullscreen.off(s + H).on(s + H, function() {
                i.fullscreen()
            }), this.$next.off(s + H).on(s + H, function() {
                i.jump(1)
            }), this.$rotateLeft.off(s + H).on(s + H, function() {
                i.rotate(-90)
            }), this.$rotateRight.off(s + H).on(s + H, function() {
                i.rotate(90)
            }), this.$maximize.off(s + H).on(s + H, function() {
                i.maximize()
            }), this.$magnify.off(n + H).on(n + H, function(t) {
                i._keydown(t)
            }), l.on(e + H, i.resize())
        },
        _addCustomButtonEvents: function() {
            var i, e = this;
            for (i in e.options.customButtons) this.$magnify.find(".magnify-button-" + i).off(s + H).on(s + H, function(t) {
                e.options.customButtons[i].click.apply(e, [e, t])
            })
        },
        _triggerHook: function(t, i) {
            this.options.callbacks[t] && this.options.callbacks[t].apply(this, C.isArray(i) ? i : [i])
        }
    }, C.fn.magnify = function(i) {
        for (var t in g = C(this), i) "string" != typeof i[t] || isNaN(i[t]) || (i[t] = parseFloat(i[t]));
        var e = C.extend(!0, {}, r, i);
        return R.zIndex = e.zIndex, "string" == typeof i || ("dblclick" === e.initEvent && g.off("click" + H).on("click" + H, function(t) {
            t.preventDefault(), t.stopPropagation()
        }), g.off(e.initEvent + H).on(e.initEvent + H, function(t) {
            t.preventDefault(), t.stopPropagation(), C(this).data("magnify", new a(this, i))
        })), g
    }, D.on(s + H, "[data-magnify]", function(t) {
        g = C("[data-magnify]"), t.preventDefault(), C(this).data("magnify", new a(this, r))
    });
    C.extend(a.prototype, {
        draggable: function(e, t, i) {
            var a = this,
                s = !1,
                o = 0,
                n = 0,
                h = 0,
                r = 0,
                l = function(t) {
                    var i;
                    (t = t || window.event).preventDefault(), !s || R.isMoving || R.isResizing || a.isMaximized || (i = "touchmove" === t.type ? t.originalEvent.targetTouches[0].pageX : t.clientX, t = "touchmove" === t.type ? t.originalEvent.targetTouches[0].pageY : t.clientY, i = i - o, t = t - n, C(e).css({
                        left: i + h + "px",
                        top: t + r + "px"
                    }))
                },
                g = function(t) {
                    D.off(W + H, l).off(O + H, g), s = !1
                };
            C(t).on(E + H, function(t) {
                if (t = t || window.event, e.focus(), C(t.target).closest(i).length) return !0;
                a.options.multiInstances && e.css("z-index", ++R.zIndex), s = !0, o = "touchstart" === t.type ? t.originalEvent.targetTouches[0].pageX : t.clientX, n = "touchstart" === t.type ? t.originalEvent.targetTouches[0].pageY : t.clientY, h = C(e).offset().left, r = C(e).offset().top, D.on(W + H, l).on(O + H, g)
            })
        }
    });
    C.extend(a.prototype, {
        movable: function(n, h) {
            var r = this,
                l = !1,
                g = 0,
                c = 0,
                m = 0,
                d = 0,
                p = 0,
                f = 0,
                u = 0,
                v = function(t) {
                    (t = t || window.event).preventDefault();
                    var i, e, a, s = I() ? C(n).find(h) : C(h);
                    l && (e = "touchmove" === t.type ? t.originalEvent.targetTouches[0].pageX : t.clientX, a = "touchmove" === t.type ? t.originalEvent.targetTouches[0].pageY : t.clientY, t = (i = e - g) + m, a = (e = a - c) + d, 0 < f ? u < e + d ? a = u : e + d < -f + u && (a = -f + u) : a = d, 0 < p ? -u < i + m ? t = -u : i + m < -p - u && (t = -p - u) : t = m, s.css({
                        left: t + "px",
                        top: a + "px"
                    }), C.extend(r.imageData, {
                        left: t,
                        top: a
                    }))
                },
                _ = function(t) {
                    D.off(W + H, v).off(O + H, _), l = !1, R.isMoving = !1, C("html, body, .magnify-modal, .magnify-stage, .magnify-button, .magnify-resizable-handle").removeClass("is-grabbing")
                };
            C(n).on(E + H, function(t) {
                (t = t || window.event).preventDefault();
                var i = I() ? C(n).find(h) : C(h),
                    e = i.width(),
                    a = i.height(),
                    s = C(n).width(),
                    o = C(n).height();
                g = "touchstart" === t.type ? t.originalEvent.targetTouches[0].pageX : t.clientX, c = "touchstart" === t.type ? t.originalEvent.targetTouches[0].pageY : t.clientY, u = r.isRotated ? (e - a) / 2 : 0, p = r.isRotated ? a - s : e - s, f = r.isRotated ? e - o : a - o, l = 0 < p || 0 < f, R.isMoving = 0 < p || 0 < f, m = i.position().left - (I() ? 0 : u), d = i.position().top + (I() ? 0 : u), n.hasClass("is-grab") && C("html, body, .magnify-modal, .magnify-stage, .magnify-button, .magnify-resizable-handle").addClass("is-grabbing"), D.on(W + H, v).on(O + H, _)
            })
        }
    });
    C.extend(a.prototype, {
        resizable: function(g, c, m, d, p) {
            var f = this,
                t = C('<div class="magnify-resizable-handle magnify-resizable-handle-e"></div>'),
                i = C('<div class="magnify-resizable-handle magnify-resizable-handle-w"></div>'),
                e = C('<div class="magnify-resizable-handle magnify-resizable-handle-s"></div>'),
                a = C('<div class="magnify-resizable-handle magnify-resizable-handle-n"></div>'),
                s = C('<div class="magnify-resizable-handle magnify-resizable-handle-se"></div>'),
                o = C('<div class="magnify-resizable-handle magnify-resizable-handle-sw"></div>'),
                n = C('<div class="magnify-resizable-handle magnify-resizable-handle-ne"></div>'),
                h = C('<div class="magnify-resizable-handle magnify-resizable-handle-nw"></div>'),
                r = {
                    e: t,
                    w: i,
                    s: e,
                    n: a,
                    se: s,
                    sw: o,
                    ne: n,
                    nw: h
                };
            C(g).append(t, i, e, a, s, o, n, h);
            var l, u = !1,
                v = 0,
                _ = 0,
                y = {
                    w: 0,
                    h: 0,
                    l: 0,
                    t: 0
                },
                x = {
                    w: 0,
                    h: 0,
                    l: 0,
                    t: 0
                },
                w = 0,
                b = 0,
                z = 0,
                $ = "",
                M = function(t) {
                    (t = t || window.event).preventDefault();
                    var i, e, a, s, o, n, h, r, l = I() ? C(c).find(m) : C(m);
                    u && !f.isMaximized && (i = "touchmove" === t.type ? t.originalEvent.targetTouches[0].pageX : t.clientX, e = "touchmove" === t.type ? t.originalEvent.targetTouches[0].pageY : t.clientY, o = $, h = s = e - _, r = -(n = a = i - v) + y.w > d ? n + y.l : y.l + y.w - d, t = -h + y.h > p ? h + y.t : y.t + y.h - p, e = {
                        e: {
                            width: Math.max(n + y.w, d) + "px"
                        },
                        s: {
                            height: Math.max(h + y.h, p) + "px"
                        },
                        se: {
                            width: Math.max(n + y.w, d) + "px",
                            height: Math.max(h + y.h, p) + "px"
                        },
                        w: {
                            width: Math.max(-n + y.w, d) + "px",
                            left: r + "px"
                        },
                        n: {
                            height: Math.max(-h + y.h, p) + "px",
                            top: t + "px"
                        },
                        nw: {
                            width: Math.max(-n + y.w, d) + "px",
                            height: Math.max(-h + y.h, p) + "px",
                            top: t + "px",
                            left: r + "px"
                        },
                        ne: {
                            width: Math.max(n + y.w, d) + "px",
                            height: Math.max(-h + y.h, p) + "px",
                            top: t + "px"
                        },
                        sw: {
                            width: Math.max(-n + y.w, d) + "px",
                            height: Math.max(h + y.h, p) + "px",
                            left: r + "px"
                        }
                    }[o], C(g).css(e), i = $, t = a, n = s, h = I() ? C(c).find(m) : C(m), r = I() ? h.position().left + w : h.position().left, o = I() ? h.position().top - w : h.position().top, e = t + y.w > d ? x.w - b + t - w : d - (y.w - x.w) - b - w, a = n + y.h > p ? x.h - z + n + w : p - (y.h - x.h) - z + w, s = -t + y.w > d ? x.w - b - t - w : d - (y.w - x.w) - b - w, h = -n + y.h > p ? x.h - z - n + w : p - (y.h - x.h) - z + w, t = (0 < e || r < 0 ? r : 0) - w, n = (0 < a || o < 0 ? o : 0) + w, r = (0 < s || r < 0 ? r : 0) - w, o = (0 < h || o < 0 ? o : 0) + w, l.css({
                        e: {
                            left: -w <= e ? (e - w) / 2 + "px" : e < t ? t + "px" : e + "px"
                        },
                        s: {
                            top: w <= a ? (a + w) / 2 + "px" : a < n ? n + "px" : a + "px"
                        },
                        se: {
                            top: w <= a ? (a + w) / 2 + "px" : a < n ? n + "px" : a + "px",
                            left: -w <= e ? (e - w) / 2 + "px" : e < t ? t + "px" : e + "px"
                        },
                        w: {
                            left: -w <= s ? (s - w) / 2 + "px" : s < r ? r + "px" : s + "px"
                        },
                        n: {
                            top: w <= h ? (h + w) / 2 + "px" : h < o ? o + "px" : h + "px"
                        },
                        nw: {
                            top: w <= h ? (h + w) / 2 + "px" : h < o ? o + "px" : h + "px",
                            left: -w <= s ? (s - w) / 2 + "px" : s < r ? r + "px" : s + "px"
                        },
                        ne: {
                            top: w <= h ? (h + w) / 2 + "px" : h < o ? o + "px" : h + "px",
                            left: -w <= e ? (e - w) / 2 + "px" : e < t ? t + "px" : e + "px"
                        },
                        sw: {
                            top: w <= a ? (a + w) / 2 + "px" : a < n ? n + "px" : a + "px",
                            left: -w <= s ? (s - w) / 2 + "px" : s < r ? r + "px" : s + "px"
                        }
                    }[i]), f.isDoResize = !0)
                },
                T = function(t) {
                    D.off(W + H, M).off(O + H, T), R.isResizing && S({
                        w: b,
                        h: z
                    }, {
                        w: C(c).width(),
                        h: C(c).height()
                    }, c), u = !1, R.isResizing = !1, C("html, body, .magnify-modal, .magnify-stage, .magnify-button").css("cursor", "");
                    var i = f.getImageScaleToStage(C(c).width(), C(c).height());
                    C.extend(f.imageData, {
                        initWidth: f.img.width * i,
                        initHeight: f.img.height * i,
                        initLeft: (C(c).width() - f.img.width * i) / 2,
                        initTop: (C(c).height() - f.img.height * i) / 2
                    })
                };
            C.each(r, function(i, t) {
                t.on(E + H, function(t) {
                    ! function(t, i) {
                        (i = i || window.event).preventDefault();
                        var e = I() ? C(c).find(m) : C(m);
                        u = !0, R.isResizing = !0, v = "touchstart" === i.type ? i.originalEvent.targetTouches[0].pageX : i.clientX, _ = "touchstart" === i.type ? i.originalEvent.targetTouches[0].pageY : i.clientY, y = {
                            w: C(g).width(),
                            h: C(g).height(),
                            l: C(g).offset().left,
                            t: C(g).offset().top
                        }, x = {
                            w: C(c).width(),
                            h: C(c).height(),
                            l: C(c).offset().left,
                            t: C(c).offset().top
                        }, l = {
                            w: e.width(),
                            h: e.height(),
                            l: e.position().left,
                            t: e.position().top
                        }, w = f.isRotated ? (l.w - l.h) / 2 : 0, b = f.isRotated ? l.h : l.w, z = f.isRotated ? l.w : l.h, $ = t, C("html,body,.magnify-modal,.magnify-stage,.magnify-button").css("cursor", t + "-resize"), D.on(W + H, M).on(O + H, T)
                    }(i, t)
                })
            })
        }
    })
}),
function($) {
    for (var supportedCSS, supportedCSSOrigin, styles = document.getElementsByTagName("head")[0].style, toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" "), a = 0, df; a < toCheck.length; a++) void 0 !== styles[toCheck[a]] && (supportedCSS = toCheck[a]);
    supportedCSS && (supportedCSSOrigin = supportedCSS.replace(/[tT]ransform/, "TransformOrigin"), "T" == supportedCSSOrigin[0] && (supportedCSSOrigin[0] = "t")), eval('IE = "v"=="\v"'), jQuery.fn.extend({
        rotate: function(t) {
            if (0 !== this.length && void 0 !== t) {
                "number" == typeof t && (t = {
                    angle: t
                });
                for (var i = [], e = 0, a = this.length; e < a; e++) {
                    var s, o = this.get(e);
                    o.Wilq32 && o.Wilq32.PhotoEffect ? o.Wilq32.PhotoEffect._handleRotation(t) : (s = $.extend(!0, {}, t), s = new Wilq32.PhotoEffect(o, s)._rootObj, i.push($(s)))
                }
                return i
            }
        },
        getRotateAngle: function() {
            for (var t = [0], i = 0, e = this.length; i < e; i++) {
                var a = this.get(i);
                a.Wilq32 && a.Wilq32.PhotoEffect && (t[i] = a.Wilq32.PhotoEffect._angle)
            }
            return t
        },
        stopRotate: function() {
            for (var t = 0, i = this.length; t < i; t++) {
                var e = this.get(t);
                e.Wilq32 && e.Wilq32.PhotoEffect && clearTimeout(e.Wilq32.PhotoEffect._timer)
            }
        }
    }), Wilq32 = window.Wilq32 || {}, Wilq32.PhotoEffect = supportedCSS ? function(t, i) {
        t.Wilq32 = {
            PhotoEffect: this
        }, this._img = this._rootObj = this._eventObj = t, this._handleRotation(i)
    } : function(t, i) {
        var e;
        this._img = t, this._onLoadDelegate = [i], this._rootObj = document.createElement("span"), this._rootObj.style.display = "inline-block", this._rootObj.Wilq32 = {
            PhotoEffect: this
        }, t.parentNode.insertBefore(this._rootObj, t), t.complete ? this._Loader() : (e = this, jQuery(this._img).bind("load", function() {
            e._Loader()
        }))
    }, Wilq32.PhotoEffect.prototype = {
        _setupParameters: function(t) {
            this._parameters = this._parameters || {}, "number" != typeof this._angle && (this._angle = 0), "number" == typeof t.angle && (this._angle = t.angle), this._parameters.animateTo = "number" == typeof t.animateTo ? t.animateTo : this._angle, this._parameters.step = t.step || this._parameters.step || null, this._parameters.easing = t.easing || this._parameters.easing || this._defaultEasing, this._parameters.duration = "duration" in t ? t.duration : t.duration || this._parameters.duration || 1e3, this._parameters.callback = t.callback || this._parameters.callback || this._emptyFunction, this._parameters.center = t.center || this._parameters.center || ["50%", "50%"], "string" == typeof this._parameters.center[0] ? this._rotationCenterX = parseInt(this._parameters.center[0], 10) / 100 * this._imgWidth * this._aspectW : this._rotationCenterX = this._parameters.center[0], "string" == typeof this._parameters.center[1] ? this._rotationCenterY = parseInt(this._parameters.center[1], 10) / 100 * this._imgHeight * this._aspectH : this._rotationCenterY = this._parameters.center[1], t.bind && t.bind != this._parameters.bind && this._BindEvents(t.bind)
        },
        _emptyFunction: function() {},
        _defaultEasing: function(t, i, e, a, s) {
            return -a * ((i = i / s - 1) * i * i * i - 1) + e
        },
        _handleRotation: function(t, i) {
            supportedCSS || this._img.complete || i ? (this._setupParameters(t), this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart()) : this._onLoadDelegate.push(t)
        },
        _BindEvents: function(t) {
            if (t && this._eventObj) {
                if (this._parameters.bind) {
                    var i = this._parameters.bind;
                    for (e in i) i.hasOwnProperty(e) && jQuery(this._eventObj).unbind(e, i[e])
                }
                for (var e in this._parameters.bind = t) t.hasOwnProperty(e) && jQuery(this._eventObj).bind(e, t[e])
            }
        },
        _Loader: IE ? function() {
            var t, i = this._img.width,
                e = this._img.height;
            for (this._imgWidth = i, this._imgHeight = e, this._img.parentNode.removeChild(this._img), this._vimage = this.createVMLNode("image"), this._vimage.src = this._img.src, this._vimage.style.height = e + "px", this._vimage.style.width = i + "px", this._vimage.style.position = "absolute", this._vimage.style.top = "0px", this._vimage.style.left = "0px", this._aspectW = this._aspectH = 1, this._container = this.createVMLNode("group"), this._container.style.width = i, this._container.style.height = e, this._container.style.position = "absolute", this._container.style.top = "0px", this._container.style.left = "0px", this._container.setAttribute("coordsize", i - 1 + "," + (e - 1)), this._container.appendChild(this._vimage), this._rootObj.appendChild(this._container), this._rootObj.style.position = "relative", this._rootObj.style.width = i + "px", this._rootObj.style.height = e + "px", this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._eventObj = this._rootObj; t = this._onLoadDelegate.shift();) this._handleRotation(t, !0)
        } : function() {
            this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._imgWidth = this._img.naturalWidth, this._imgHeight = this._img.naturalHeight;
            var t, i = Math.sqrt(this._imgHeight * this._imgHeight + this._imgWidth * this._imgWidth);
            for (this._width = 3 * i, this._height = 3 * i, this._aspectW = this._img.offsetWidth / this._img.naturalWidth, this._aspectH = this._img.offsetHeight / this._img.naturalHeight, this._img.parentNode.removeChild(this._img), this._canvas = document.createElement("canvas"), this._canvas.setAttribute("width", this._width), this._canvas.style.position = "relative", this._canvas.style.left = -this._img.height * this._aspectW + "px", this._canvas.style.top = -this._img.width * this._aspectH + "px", this._canvas.Wilq32 = this._rootObj.Wilq32, this._rootObj.appendChild(this._canvas), this._rootObj.style.width = this._img.width * this._aspectW + "px", this._rootObj.style.height = this._img.height * this._aspectH + "px", this._eventObj = this._canvas, this._cnv = this._canvas.getContext("2d"); t = this._onLoadDelegate.shift();) this._handleRotation(t, !0)
        },
        _animateStart: function() {
            this._timer && clearTimeout(this._timer), this._animateStartTime = +new Date, this._animateStartAngle = this._angle, this._animate()
        },
        _animate: function() {
            var t, i = +new Date,
                e = i - this._animateStartTime > this._parameters.duration;
            e && !this._parameters.animatedGif ? clearTimeout(this._timer) : ((this._canvas || this._vimage || this._img) && (i = this._parameters.easing(0, i - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration), this._rotate(~~(10 * i) / 10)), this._parameters.step && this._parameters.step(this._angle), (t = this)._timer = setTimeout(function() {
                t._animate.call(t)
            }, 10)), this._parameters.callback && e && (this._angle = this._parameters.animateTo, this._rotate(this._angle), this._parameters.callback.call(this._rootObj))
        },
        _rotate: (df = Math.PI / 180, IE ? function(t) {
            this._angle = t, this._container.style.rotation = t % 360 + "deg", this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px", this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px", this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px", this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px"
        } : supportedCSS ? function(t) {
            this._angle = t, this._img.style[supportedCSS] = "rotate(" + t % 360 + "deg)", this._img.style[supportedCSSOrigin] = this._parameters.center.join(" ")
        } : function(t) {
            t = (this._angle = t) % 360 * df, this._canvas.width = this._width, this._canvas.height = this._height, this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH), this._cnv.translate(this._rotationCenterX, this._rotationCenterY), this._cnv.rotate(t), this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY), this._cnv.scale(this._aspectW, this._aspectH), this._cnv.drawImage(this._img, 0, 0)
        })
    }, IE && (Wilq32.PhotoEffect.prototype.createVMLNode = function() {
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            return document.namespaces.rvml || document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
                function(t) {
                    return document.createElement("<rvml:" + t + ' class="rvml">')
                }
        } catch (t) {
            return function(t) {
                return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
    }())
}(jQuery);