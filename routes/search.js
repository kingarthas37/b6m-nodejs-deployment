var express = require('express');
var async  = require('async');
var _ = require('underscore');
var api = require('local-cms-api');
var Pager = require('local-pager');
var tkd = require('../tkd.json');

var router = express.Router();



//频道首页
router.get('/:keyword',function(req,res){

    //获取当前channel_id
    var pageSize = 45;  // 显示个数
    var curPage = Number(req.query.page) || 1;   // 当前页码
    var keyword = req.params.keyword;

    var sort = req.query.sort || '',
        field = req.query.field || '';

    api.parallel(
        {tejia:[
            'channel',
            {
                key:'searchGoodsList',
                params: {
                    page:curPage,
                    keyword:keyword,
                    page_size:pageSize,
                    sort:sort,
                    field:field
                },
                cache:{ left:60*60*2 }
            }
        ]},
        function(err,data){

            if(!data.searchGoodsList.count) {

                api.parallel(
                    {tejia:[
                        'channel',
                        {
                            key:'channelGoodsList',
                            params: {
                                channel_id:1,
                                page_size:9
                            },
                            cache:{ left:60*60*2 }
                        }
                    ]},
                    function(err,data){

                        data.Title = tkd.index.t;
                        data.Keywords = tkd.index.k;
                        data.Description = tkd.index.d;

                        data.keyword = keyword;
                        console.log(data.channelGoodsList.data);
                        res.render('search', data);
                    }
                );
                //console.log(data.channelGoodsList.data);
                return;
            }

            data.Title = tkd.index.t;
            data.Keywords = tkd.index.k;
            data.Description = tkd.index.d;

            data.sort = sort;
            data.field = field;
            data.keyword = keyword;

            data.pager = new Pager({
                pageSize:pageSize,  //显示的条数
                totalCount:Math.ceil(data.searchGoodsList.count / pageSize),  //page总数
                curPage:curPage,  //当前页码,
                numCount:data.searchGoodsList.pages, //显示1,2,3,4,5...的个数
                pageUrl:'/search/'+ keyword
            });
           console.log(data);
            res.render('search', data);
        }
    );

});


module.exports= router;


