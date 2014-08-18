var express = require('express');
var async  = require('async');
var _ = require('underscore');
var api = require('local-cms-api');
var Pager = require('local-pager');
var tkd = require('../tkd.json');
var md5 = require('blueimp-md5').md5;

var router = express.Router();


//频道首页
router.get('/',function(req,res){

    //获取当前channel_id
    var categoryId = req.query.category_id || '';
    var pageSize = 45;  // 显示个数
    var curPage = Number(req.query.page) || 1;   // 当前页码

    var sort = req.query.sort || '',
        field = req.query.field || '';

    api.parallel(
        {tejia:[
            {
                key:'channel',
                cache:{ left:60*60*24 }
            },
            {
                key:'indexBrandList',
                cache:{ left:60*60*2 }
            },
            {
                key:'indexGoodsList',
                params: {
                    category_id:categoryId,
                    page : curPage,
                    page_size : pageSize,
                    sort:sort,
                    field:field
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

            data.isHome = true;
            data.sort = sort;
            data.field = field;

            data.curCategory = req.query.category_id || '';

            data.showLeftBar = true;

            data.pager = new Pager({
                pageSize:pageSize,  //显示的条数
                totalCount:Math.ceil(data.indexGoodsList.count / pageSize),  //page总数
                curPage:curPage,  //当前页码,
                numCount:data.indexGoodsList.pages, //显示1,2,3,4,5...的个数
                pageUrl:'?sort='+sort + '&field=' + field + '&category_id=' + categoryId
            });

            res.render('index', data);
        }
    );

});

module.exports= router;