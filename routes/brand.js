var express = require('express');
var async  = require('async');
var _ = require('underscore');
var api = require('local-cms-api');
var Pager = require('local-pager');
var tkd = require('../tkd.json');

var router = express.Router();


router.get('/',function(req,res){

    var categoryId = req.query.category_id || '';

    api.parallel(
        {tejia:[
            'channel',
            {
              key:'getBrandFloorList',
              cache:{ left:60*60*2 }
            },
            {
              key:'getCountdownBrandList',
              cache:{ left:60*60*2 }
            },
            {
               key:'getCountdownBrandList',
                cache:{ left:60*60*2 }
            },
            {
              key:'bigBrand',
                cache:{ left:60*60*2 }
            },

            {
                key:'getNoticeBrandList',
                cache:{ left:60*60*2 }
            },
            {
                key:'channelBanner',
                params: {
                    channel_id : 4
                },
                cache:{ left:60*60*2 }
            },
            {
                key:'getCategoryList',
                params:{
                    channel_id:4
                },
                cache:{ left:60*60*2 }
            }
        ]},
        function(err,data){

            data.pageBrand = true;

            data.Title = tkd.brand.t;
            data.Keywords = tkd.brand.k;
            data.Description = tkd.brand.d;

            data.showLeftBar = true;

            res.render('brand', data);
        }
    );

});


router.get('/detail/:id',function(req,res){

   // var brandId = req.params.id || 0;
    var brandId = req.params.id;
    var pageSize = 15;  // 显示个数
    var curPage = Number(req.query.page) || 1;   // 当前页码
    var sort = req.query.sort || '',
        field = req.query.field || '';
    var stock = req.query.stock || '';

    api.parallel(
        {tejia:[
            'channel',
            {
                key:'brandpageProductList',
                params: {
                    brand_id:brandId,
                    page : curPage,
                    page_size : pageSize,
                    sort:sort,
                    field:field,
                    stock:stock
                }
            },
            {
                key:'brandBannerLeft',
                params:{
                    brand_id:brandId,
                    position:'left'
                }
            },
            {
                key:'brandBannerRight',
                params:{
                    brand_id:brandId,
                    position:'right'
                }
            }
        ]},
        function(err,data){

            data.pageBrand = true;
            data.brandId = brandId;
            data.stock = stock;
            data.sort = sort;
            data.field = field;

            console.log(data.brandpageProductList);
            data.pager = new Pager({
                pageSize:pageSize,  //显示的条数
                totalCount:Math.ceil(data.brandpageProductList.goods_count / pageSize),  //page总数
                curPage:curPage,  //当前页码,
                numCount:data.brandpageProductList.pages, //显示1,2,3,4,5...的个数
                pageUrl:'?brandId='+ brandId + '&sort='+sort + '&field=' + field + '&stock='+stock
            });
            res.render('brand-detail', data);
        }
    );
});



module.exports= router;
