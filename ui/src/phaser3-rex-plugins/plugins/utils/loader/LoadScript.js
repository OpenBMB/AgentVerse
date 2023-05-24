var LoadScript = function (url, onload) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0, cnt = scripts.length; i < cnt; i++) {
        if (scripts[i].src.indexOf(url) != -1) {
            if (onload) {
                onload();
            }
            return;
        }
    }

    var newScriptTag = document.createElement('script');
    newScriptTag.setAttribute('src', url);

    if (onload) {
        newScriptTag.onload = onload;
    }

    document.head.appendChild(newScriptTag);
};
export default LoadScript;