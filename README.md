# pm2-varnish
Varnish module for Keymetrics

![pm2-varnish screenshot](https://raw.githubusercontent.com/pm2-hive/pm2-varnish/master/pm2-varnish.jpg)

## Description

PM2 module to monitor key Varnish server metrics:

* Client Requests
* Cache hits / Cache misses
* Request / Response Sizes
* Backend connection failures / busy counts

## Requirements

This module requires a Varnish install (tested against v4.1.0).
PM2 needs to be able to execute the varnishstat command to get the metrics. Usually this command can only provide stats to
users in the varnish user group.

To check which user group you need to add your user to, run the shell command
(replace my-hostname with the name of your local hostname which you can get by first running 'cat /etc/hostname') : 
```bash
$ ls /var/lib/varnish/my-hostname/_.vsm -l
```

OUTPUT :   
-rw-r----- 1 root varnish 84934656 oct.  14 11:05 /var/lib/varnish/my-hostname/_.vsm

In this example you can see that the file belongs to the group varnish, so that's the group we'll be adding our user to :

```bash
$ sudo usermod -a -G varnish my-username
```

you usually need to logout and login again for the changes to apply

## Install

```bash
$ npm install pm2 -g

$ pm2 install pm2-varnish
```

## Uninstall

```bash
$ pm2 uninstall pm2-varnish
```

# License

MIT
