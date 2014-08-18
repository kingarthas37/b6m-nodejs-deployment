var express = require('express');
var async  = require('async');
var _ = require('underscore');
var api = require('local-cms-api');
var Pager = require('local-pager');
var tkd = require('../tkd.json');

var router = express.Router();



//频道首页
router.get('/:channel_id',function(req,res){

    //获取当前channel_id
    var categoryId = req.query.category_id || '';
    var channelId = req.params.channel_id || 0;
    var pageSize = 45;  // 显示个数
    var curPage = Number(req.query.page) || 1;   // 当前页码

    var sort = req.query.sort || '',
        field = req.query.field || '';

    api.parallel(
        {tejia:[
            'channel',
            {
                key:'channelGoodsList',
                params: {
                    category_id:categoryId,
                    page : curPage,
                    page_size : pageSize,
                    channel_id:channelId,
                    sort:sort,
                    field:field
                },
                cache:{ left:60*60*2 }
            },
            {
                key:'getCategoryList'
            }
        ]},
        function(err,data){

            data.channelId = channelId;
            data.sort = sort;
            data.field = field;


            switch(channelId) {
                case '1':
                    data.Title = tkd.channel1.t;
                    data.Keywords = tkd.channel1.k;
                    data.Description = tkd.channel1.d;
                 break;
                case '2':
                    data.Title = tkd.channel2.t;
                    data.Keywords = tkd.channel2.t;
                    data.Description = tkd.channel2.t;
                 break;
                case '3':
                    data.Title = tkd.channel3.t;
                    data.Keywords = tkd.channel3.t;
                    data.Description = tkd.channel3.t;
                 break;

            }


            data.curCategory = req.query.category_id || '';

            data.showLeftBar = true;

            //拼装导航cur
            data.channel.forEach(function(item,i) {
                if(item.id === channelId) {
                    return data.channel[i].cur = true;
                }
            });


            data.pager = new Pager({
                pageSize:pageSize,  //显示的条数
                totalCount:Math.ceil(data.channelGoodsList.count / pageSize),  //page总数
                curPage:curPage,  //当前页码,
                numCount:data.channelGoodsList.pages, //显示1,2,3,4,5...的个数
                pageUrl:'/channel/'+ channelId + '?sort='+sort + '&field='+field + '&category_id=' + categoryId
            });

            res.render('channel', data);
        }
    );

});

module.exports= router;
