
function minifyHtml(html) {
    // minify inline styles
    html = html.replace(/<style>([\w\W]*?)<\/style>/g, function($0, $1) {
        return '<style>' + minifyCss($1) + '</style>';
    });
    
    // remove whitespace before tags
    html = html.replace(/^\s+(?=<)/gm, '');
    return html;
}


function minifyCss(cssText) {
    // remove comments
    cssText = cssText.replace(/\/\*[\w\W]*?\*\//g, '');

    // normalise whitespace
    cssText = cssText.replace(/\n\s*\n/g ,'\n');
    cssText = cssText.replace(/[\n\r \t]/g,' ');
    cssText = cssText.replace(/ +/g,' ');

    // collapse whitespace
    cssText = cssText.replace(/ ?([,:;{}~+>\/]) ?/g,'$1');

    // remove trailing semi-colons
    cssText = cssText.replace(/;}/g,'}');

    // remove leading zeros
    cssText = cssText.replace(/([:,\s])0\./g,'$1.');

    return cssText.trim();
}

module.exports = {
    minifyCss: minifyCss,
    minifyHtml: minifyHtml
}
