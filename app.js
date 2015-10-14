var pmx = require('pmx');
var varnishStats = require('./lib/stats.js');
var varnishActions = require('./lib/actions.js');

pmx.initModule({

  pid: pmx.resolvePidPaths(['/var/run/varnishd.pid']),

  // Options related to the display style on Keymetrics
  widget: {

    // Logo displayed
    logo: 'https://www.varnish-cache.org/sites/default/files/pictures/varnishcache_rgb-gimp2-alpha.png',

    // Module colors
    // 0 = main element
    // 1 = secondary
    // 2 = main border
    // 3 = secondary border
    theme: ['#1B2228', '#1B2228', '#73b9e3', '#5c5c5b'],

    // Section to show / hide
    el: {
      probes: true,
      actions: true
    },

    // Main block to show / hide
    block: {
      actions: true,
      issues: true,
      meta: true,

      // Custom metrics to put in BIG
      main_probes: ['Uptime', 'Client Requests','Cache hits','Cache misses','Backend failures']
    }

  }

}, function (err, conf) {
  // Init metrics refresh loop
  varnishStats.init();

  // Init actions
  varnishActions.init();
});
