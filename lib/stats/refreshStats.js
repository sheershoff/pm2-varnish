var pmx = require('pmx');
var shelljs = require('shelljs');
var _ = require('lodash');
var moment = require('moment');
require("moment-duration-format");
var humanize = require('humanize');

module.exports = function refreshStats(metrics) {
  shelljs.exec('varnishstat -1j', {async: true, silent: true}, function (err, out) {
    if (err) {
      return pmx.notify("Varnishstat Error: " + err);
    }

    var stats = JSON.parse(out);

    var uptime = _.get(stats, ['MAIN.uptime', 'value']);
    if (uptime) {
      var formattedUptime = moment.duration(uptime, "seconds").format("d[d] h[h] m[m]");
      metrics.uptime.set(formattedUptime);
    }

    var clientRequests = _.get(stats, ['MAIN.client_req', 'value'], 'N/A');
    metrics.clientRequests.set(clientRequests);

    var cacheHits = _.get(stats, ['MAIN.cache_hit', 'value'], 'N/A');
    metrics.cacheHits.set(cacheHits);

    var cacheMisses = _.get(stats, ['MAIN.cache_miss', 'value'], 'N/A');
    metrics.cacheMisses.set(cacheMisses);

    var cacheHitpass = _.get(stats, ['MAIN.cache_hitpass', 'value'], 'N/A');
    metrics.cacheHitpass.set(cacheHitpass);

    var backendBusy = _.get(stats, ['MAIN.backend_busy', 'value'], 'N/A');
    metrics.backendBusy.set(backendBusy);

    var backendFail = _.get(stats, ['MAIN.backend_fail', 'value'], 'N/A');
    metrics.backendFail.set(backendFail);

    var reqHeaderSize = _.get(stats, ['MAIN.s_req_hdrbytes', 'value']);
    metrics.reqHeaderSize.set(humanize.filesize(reqHeaderSize));

    var reqBodySize = _.get(stats, ['MAIN.s_req_bodybytes', 'value']);
    metrics.reqBodySize.set(humanize.filesize(reqBodySize));

    var resHeaderSize = _.get(stats, ['MAIN.s_resp_hdrbytes', 'value']);
    metrics.resHeaderSize.set(humanize.filesize(resHeaderSize));

    var resBodySize = _.get(stats, ['MAIN.s_resp_bodybytes', 'value']);
    metrics.resBodySize.set(humanize.filesize(resBodySize));


  });
};