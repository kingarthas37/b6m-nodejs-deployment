var express = require('express');
var _ = require('underscore');
var md5 = require('blueimp-md5').md5;
var randomString = require('randomstring');
var request = require('request');
var Cache = require('local-cache');

var router = express.Router();

var cache = new Cache('10.10.100.15','11311');

router.get('/',function(req,res){
    var result = {
        status : 1
    };

    var url = "https://open.oapi.vipshop.com/oauth/authorize.php";
    var app_id = "68";
    var app_secret = "12bb0d1a2d53ed6afd5b76d37950aa4e";
    var state = randomString.generate(16);
    var signature = md5(app_id + md5(app_secret + state));

    var params = {
        app_id : app_id,
        state : state,
        app_type : 1,
        signature : signature
    };

    var p = _.map(params,function(value,key){
        return key + '=' + value;
    });

    url += '?' + p.join('&');

    cache.nset('vip_state_signature',params,600,function(err){
        if(err) {
            console.log('set state and signature error:',err);
        }
    });

    request(url,function(err,response,body){
        if(!err && response.statusCode === 200){
            res.send(body);
        }else {
            console.log("cannot get token from vip:",err);
        }
    });

    //res.send(JSON.stringify(result));
});

router.get('/callback',function(req,res){
    var stat = req.query.stat;
    var once_token = req.query.once_token;


    cache.nget('vip_state_signature',function(err,data){
        var result = {};
        if(err || !data || _.isEmpty(data)) {
            result.code  = 1;
            result.msg = '缺少state或once_token参数';
            result.data = {};
        }else {
            if(data.stat === stat) {
                result.code = 0;
                result.msg = '校验成功';
                result.data = {once_token : once_token};
            }else {
                result.code = 2;
                result.msg = '校验state失败';
                result.data = {};
            }
        }

        res.send(result);
    });

    //res.send(JSON.stringify(result));
});




module.exports= router;


