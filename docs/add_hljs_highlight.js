
window.addEventListener('load', hljs_highlight, false);

function hljs_highlight() {
    hljs.highlightAll();
}

hljs.addPlugin(new CopyButtonPlugin());