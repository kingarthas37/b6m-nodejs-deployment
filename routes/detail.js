var express = require('express');
var _ = require('underscore');
var api = require('local-cms-api');
var tkd = require('../tkd.json');

var router = express.Router();

router.get('/:goods_id',function(req,res){

    var goodsId = req.params.goods_id;

    api.parallel(
        {tejia:[
            'channel',
            {
                key:'goodsDetail',
                params: {
                    goods_id:goodsId
                },
                cache:{ left:60*60*2 }
            },
            {
                key:'recommandGoodsList',
                params: {
                    goods_id:goodsId
                },
                cache:{ left:60*60*2 }
            },
            {
                key:'getCategoryList'
            },
            {
                key:'getGoodsCommentList',
                params:{
                    goods_id:goodsId
                }
            }
        ]},
        function(err,data){

            data.Title = tkd.index.t;
            data.Keywords = tkd.index.k;
            data.Description = tkd.index.d;

            if(data.goodsDetail.content) {
                data.goodsDetail.content = data.goodsDetail.content.trim();
            }

               if(data.recommandGoodsList.similar.length>15){
                    //data.recommandGoodsList.similar=[];

                    data.recommandGoodsList.similar=data.recommandGoodsList.similar.slice(0,15);
                }
                //console.log(data.recommandGoodsList.similar);

            res.render('detail', data);
        }
    );

});


module.exports = router;


