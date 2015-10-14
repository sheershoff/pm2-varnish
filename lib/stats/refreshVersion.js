var pmx = require('pmx');
var shelljs = require('shelljs');

module.exports = function refreshVersion(metrics) {
  shelljs.exec('varnishstat -V', {async: true, silent: true}, function (err, out) {
    if(err){
      return pmx.notify("Couldn't get Varnish version: " + err);
    }

    var matches = out.match(/^varnishstat \(varnish-(.+)\)/);
    if(matches){
      metrics.version.set(matches[1]);
    }
  });
};