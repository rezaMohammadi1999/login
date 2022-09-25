var fum = function() { return { util: {} } }();
fum.util.config = {
    cdir: 'ui-2.1',
    init: function() {
        var idSeed = 0;
        var ua = navigator.userAgent.toLowerCase();
        this.isIE = ua.indexOf("msie") > -1;
        this.isIE7 = ua.indexOf("msie 7") > -1;
        this.isStrict = document.compatMode == "CSS1Compat",
            this.isOpera = ua.indexOf("opera") > -1,
            this.isSafari = (/webkit|khtml/).test(ua),
            this.isIE = ua.indexOf("msie") > -1,
            this.isIE7 = ua.indexOf("msie 7") > -1,
            this.isGecko = !this.isSafari && ua.indexOf("gecko") > -1,
            this.isBorderBox = this.isIE && !this.isStrict,
            this.isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1),
            this.isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1),
            this.isLinux = (ua.indexOf("linux") != -1),
            this.isSecure = window.location.href.toLowerCase().indexOf("https") === 0;
        if (this.isIE && !this.isIE7) {
            try {
                document.execCommand("BackgroundImageCache", false, true);
            } catch (e) {}
        }
    }
};
fum.util.config.init();

fum.util.number = {
    addCommas: function(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
}