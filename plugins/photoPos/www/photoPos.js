var serviceName = 'com.lalalic.wetravel.PhotoPos';

/*
 * Get an instance of the background service factory
 * Use it to create a background service wrapper for your service
 */
var factory = require('com.red_folder.phonegap.plugin.backgroundservice.BackgroundService');
module.exports = factory.create(serviceName);