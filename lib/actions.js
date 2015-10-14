var pmx = require('pmx');
var shelljs = require('shelljs');

function initActions() {

  // Show Full Stats
  pmx.action('Full Stats', function (reply) {
    shelljs.exec('varnishstat -1j', {async: true, silent: true}, function (err, out) {
      if(err){
        return reply("Couldn't get stats: " + err);
      }

      reply(out);
    });
  });

}

function init() {
  initActions();
}

module.exports.init = init;