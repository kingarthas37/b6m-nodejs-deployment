var index = require('./index');
var channel = require('./channel');
var detail = require('./detail');
var brand = require('./brand');
var search = require('./search');
var vip = require('./vip');
var client = require('./client');


module.exports = {
    '/' : index,
    '/vip' : vip,
    '/channel' : channel,
    '/detail' : detail,
    '/brand' : brand,
    '/search' : search,
    '/client' : client
};