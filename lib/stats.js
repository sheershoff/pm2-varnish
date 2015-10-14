var pmx = require('pmx');

var refreshStats = require('./stats/refreshStats');
var refreshVersion = require('./stats/refreshVersion');

var metrics = {};
var REFRESH_RATE = 5000; // ms
var probe = pmx.probe();

// Init metrics with default values
function initMetrics() {
  metrics.version = probe.metric({
    name: 'Varnish Version',
    value: 'N/A'
  });
  metrics.uptime = probe.metric({
    name: 'Uptime',
    value: 'N/A'
  });
  metrics.clientRequests = probe.metric({
    name: 'Client Requests',
    value: 'N/A'
  });
  metrics.cacheHits = probe.metric({
    name: 'Cache hits',
    value: 'N/A'
  });
  metrics.cacheHitpass = probe.metric({
    name: 'Cache Hits for pass',
    value: 'N/A'
  });
  metrics.cacheMisses = probe.metric({
    name: 'Cache misses',
    value: 'N/A'
  });
  metrics.backendBusy = probe.metric({
    name: 'Backend conn. busy',
    value: 'N/A'
  });
  metrics.backendFail = probe.metric({
    name: 'Backend failures',
    value: 'N/A',
    alert: {
      mode: 'threshold-avg',
      value: 5000,
      msg: 'Too many Backend failures',
      cmp: ">"
    }
  });
  metrics.reqHeaderSize = probe.metric({
    name: 'Req. Header Size',
    value: 'N/A'
  });
  metrics.reqBodySize = probe.metric({
    name: 'Req. Body Size',
    value: 'N/A'
  });
  metrics.resHeaderSize = probe.metric({
    name: 'Res. Header Size',
    value: 'N/A'
  });
  metrics.resBodySize = probe.metric({
    name: 'Res. Body Size',
    value: 'N/A'
  });
}

// Refresh metrics
function refreshMetrics() {
  refreshStats(metrics);
}

function init() {
  initMetrics();
  setInterval(refreshMetrics.bind(this), REFRESH_RATE);
  refreshVersion(metrics);
}

module.exports.init = init;
