var express = require('express');
var async  = require('async');
var _ = require('underscore');
var api = require('local-cms-api');
var tkd = require('../tkd.json');

var router = express.Router();





router.get('/',function(req,res){

    //获取当前channel_id
    var categoryId = req.query.category_id || '',
        channelId = req.query.channel || '',
        sort = req.query.sort || '',
        field = req.query.field || '';

    api.parallel(
        {tejia:[
            {
                key:'channel',
                cache:{ left:60*60*24 }
            },
            {
                key:'indexGoodsList',
                params: {
                    category_id:categoryId,
                    page_size : 10,
                    sort:sort,
                    field:field,
                    ref:'cli'
                },
                cache:{ left:60*60*2 }
            },
            {
                key:'channelGoodsList',
                params: {
                    category_id:categoryId,
                    page_size : 10,
                    sort:sort,
                    channel_id:channelId,
                    field:field,
                    ref:'cli'
                },
                cache:{ left:60*60*2 }
            },
            {
                key:'getCategoryList',
                cache:{ left:60*60*24 }
            }
        ]},
        function(err,data){

            data.Title = tkd.index.t;
            data.Keywords = tkd.index.k;
            data.Description = tkd.index.d;

            data.curChannel = channelId;
            data.curField = field;
            data.curSort = sort;
            data.curCategory = categoryId;

            //selected channel
            if(_.isArray(data.channel)) {
                data.channel.forEach(function(n,i) {
                    if(channelId === n.id) {
                        return data.selectChannel = n.name;
                    }
                });
            }

            //selected category
            if(_.isArray(data.getCategoryList)) {
                data.getCategoryList.forEach(function(n,i){
                    if(categoryId === n.id) {
                        return data.selectCategory = n.name;
                    }
                });
            }

            //select field
            if(field==='price') {
                data.selectField = '折扣';
            }else if(field === 'sales') {
                data.selectField = '人气';
            }else {
                data.selectField = '最新';
            }


            /*    data.channel.curChannel = 0;
             console.log(data.channel);
             data.getCategoryList.curChannel =0;*/


            res.render('client', data);
        }
    );

});

module.exports= router;