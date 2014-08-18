$(function(){
 /*
 * // 多个倒计时需要这样调用
    $('.J_CountDown').each(function () {
        var $this = $(this),
            data = $this.attr('data-config');
        $this.countTime(eval('(' + data + ')'));
    });

    // 单个倒计时可以如此调用，效率更快。
    $('#J_CountDown').countTime({
        "endTime":'2012/12/21 01:01:01',
        "timeStamp":false
    });

    // 单个倒计时可以如此调用，效率更快。
    $('#countDown').countTime({
        "startTime":'2012-9-7 17:25:00 ',
        "endTime":'2012/12/21 01:01:01',
        "startTips":'距离活动开始时间：',
        "endTips":'活动结束时间：'
    });
1.stampSet(加载方式)属性只有timeStamp:true的情况下方才起效,
2.timeStamp:true时,如不对stampSet进行手动设定,默认加载方式是"normal",即连时间和时间后的中文一起append至父元素,"after"是表示将数字和时间后的中文分开append
 */
 $.fn.countTime=function(options){
         // 设置默认属性

        var settings = {
                "startTime":0,
                "endTime":this.attr('data-end') || 0,
                "nowTime":0,
                "interval":1000,
                "minDigit":true,
                "showDay":true,
                "timeUnitCls":{
                    "day":'m-d',
                    "hour":'m-h',
                    "min":'m-m',
                    "sec":'m-s'
                },
                "startTips":'',
                "endTips":'',
                "stopTips":'',
                "timeStamp":true,
				"stampSet":
				{   "model":"normal",
					"set":{"day":'天', 
					  "hour":'时', 
					  "min":'分', 
					  "sec":'秒'
					 }
				}
            },
            opts = $.extend({}, settings, options);
 
        return this.each(function () {
            var $timer = null,
                $this = $(this),
                $block = $('<span></span>'),
                nowTime,
            // 匹配时间
                startTime = isNaN(opts.startTime) ? (Date.parse(opts.startTime.replace(/-/g, '/')) / 1000) : Math.round(opts.startTime),
                endTime = isNaN(opts.endTime) ? (Date.parse(opts.endTime.replace(/-/g, '/')) / 1000) : Math.round(opts.endTime);
 
            // 判断当前时间
            nowTime = opts.nowTime === 0 ? Math.round(new Date().getTime() / 1000) : Math.round(opts.nowTime);

            // 补零方法
            function addZero(isAdd, time) {
                if (!isAdd) return time;
                else return time < 10 ? time = '0' + time : time;
            }
            // 天、时、分、秒
            var timeStamp = {"day":'', "hour":'', "min":'', "sec":''};
            if (opts.timeStamp) timeStamp =opts.stampSet.set;// {"day":'天', "hour":'时', "min":'分', "sec":'秒'};
            
			(function remainTime() {
                var time = {},
                    seconds,
                    word = '';
                // 获取需要计时的毫秒数
                seconds = nowTime < startTime ? startTime - nowTime : endTime - nowTime;
                $this.html('');

                // 是否显示天数
                if (opts.showDay) {
                    time.day = addZero(opts.minDigit, Math.floor(seconds / 3600 / 24));
                    time.hour = addZero(opts.minDigit, Math.floor(seconds / 3600 % 24));
                } else {
                    time.hour = addZero(opts.minDigit, Math.floor(seconds / 3600));
                }
                time.min = addZero(opts.minDigit, Math.floor(seconds / 60 % 60));
                time.sec = addZero(opts.minDigit, Math.floor(seconds % 60));

                // 活动开始倒计时
                if (nowTime < startTime) {
                    if (opts.startTips) word = opts.startTips;
                } else {
                    // 活动结束倒计时
                    if (endTime > nowTime) {
                        if (opts.endTips) word = opts.endTips;
                    }// 倒计时停止
                    else {
                        if (opts.stopTips) {
                            word = opts.stopTips;
                            $this.html(word);
                        } else {
                            for (var i in time) {
                                if (i == 'day' && !opts.showDay) continue;
                                time[i] = 0;  // 时间置0
								if(opts.timeStamp){
								  switch(opts.stampSet.model){
								    case "after":
									var _stamp=$(timeStamp[i]);
									 $block.clone().addClass(opts.timeUnitCls[i]).text(time[i]).appendTo($this);
									 _stamp.appendTo($this);
									 //$block.clone().addClass(opts.timeUnitCls[i]).text(time[i] + timeStamp[i]).appendTo($this);
									 break;
									 case "normal":
									 $block.clone().addClass(opts.timeUnitCls[i]).text(time[i] + timeStamp[i]).appendTo($this);
									 break;
								  }
								}
                                
                            }
                        }
                        clearTimeout($timer);
                        return false;
                    }
                }
                // 写入
                $this.html(word);
                for (var i in time) {
                    if (i == 'day' && !opts.showDay) continue;
                    if(opts.timeStamp){
								  switch(opts.stampSet.model){
								    case "after":
									var _stamp=$(timeStamp[i]);
									 $block.clone().addClass(opts.timeUnitCls[i]).text(time[i]).appendTo($this);
									 _stamp.appendTo($this);
									 //$block.clone().addClass(opts.timeUnitCls[i]).text(time[i] + timeStamp[i]).appendTo($this);
									 break;
									 case "normal":
									 $block.clone().addClass(opts.timeUnitCls[i]).text(time[i] + timeStamp[i]).appendTo($this);
									 break;
								  }
								}
                }

                // 累加时间
                nowTime = nowTime + opts.interval / 1000;
                 // 循环调用
                $timer = setTimeout(function () {
                    remainTime();
                }, opts.interval);
            })();
        });
 }
});
;
var Taov2=function(){}

$(function(){

   if(location.href.indexOf('category_id=') !== -1 && location.href.indexOf('#item')=== -1) {
       location.href = location.href + '#item';
   }


    //品牌页leftbar
    if(location.href.indexOf('tejia.b5m.com/brand') !== -1) {
        $('#Fixed_left').find('.ttj-fixd-list a').each(function(i,n) {
           $(n).attr('href','javascript:;').click(function() {

               $('html,body').animate({'scrollTop':$('.wc-item-wp[data-id='+ $(n).attr('data-id') + ']').offset().top});
               return false;
           });
        });
    }

    $('#query').autoFill('http://s.b5m.com/allAutoFill.htm','tejia');




    $('.header-rearch-submit').click(function() {
        location.href =  '/search/' + $('#query').val();
    });

    $('#query').on('keyup',function(e) {
        if(e.keyCode===13) {
            $('.header-rearch-submit').click();
        }
    });


    //分页
    (function() {

        var pageInput = $('.page .page-field'),
            pageGo = $('.page .page-go')
        url = location.href;

        if(!pageInput.length) {
            return;
        }

        pageGo.click(function() {
            if(!/\d+/.test(pageInput.val())) {
                alert('请输入正确的页数！');
                return false;
            }

            var maxPage = Number($('.pagenum').attr('page'));
            if(pageInput.val() > maxPage) {
                return location.href = location.href.replace(/page=\d+/,'page=' + maxPage);
            }

            if(pageInput.val() < 1) {
                return location.href = location.href.replace(/page=\d+/,'');
            }


            if(url.indexOf('page=') === -1) {
                location.href = location.href + ( url.indexOf('?') === -1 ? '?' : '&' )  +'page=' + pageInput.val();
            }else {
                location.href = location.href.replace(/page=\d+/,'page='+pageInput.val());
            }

        });

    })();



    //懒加载
   /* $('img[lazy-src]:visible').imglazyload({fadeIn:true});
    $( 'img[lazy-src]').one( 'lazyload', function(){
        $(this).imglazyload({fadeIn:true});
    });
*/
});
//首页
Taov2.prototype.index=function(){

if(document.body.clientWidth>980){
    this._ElementScroll($("#Fixed_left"),"fixed",function(ele,h,css){


        var realtop=parseInt(ele.attr("top"));
        var realleft=parseInt(ele.attr("left"));
        if(h>realtop){

            ele.addClass(css);
            ele.css({"left":ele.attr("left")+"px","top":"0px"});
        }
        else{
            ele.removeClass(css);
            ele.css({"left":"5px"});
        }
    });
}
    else if(document.body.clientWidth<980){
    //alert("oo");
    this._ElementScroll($("#Fixed_top"),"fixed",function(ele,h,css){


        var realtop=parseInt(ele.attr("top"));
        var realleft=parseInt(ele.attr("left"));
        if(h>realtop){

            ele.addClass(css);
            ele.css({"left":ele.attr("left")+"px","top":"0px","z-index":1000});
        }
        else{
            ele.removeClass(css);
            ele.css("left","0px");
        }
    });
}
//鼠标点击选择类目
    $(".ttj-fixd-list").find("a").click(function(){
        $(this).addClass("hover");
        $(this).siblings().removeClass("hover");
    });
    var timer;
//图片滚动函数
if($(".taotj-image-rotation").find("ul").find("li").length>3){


    $(".taotj-image-rotation").find("ul").find("li").each(function(){
        var li= $(this).clone();
        $(".taotj-image-rotation").find("ul").append(li);
    });
    $(".taotj-image-rotation").find("ul").css("margin-left","-326px");

    $(".taotj-image-rotation").find(".image-rotation-r").click(function(event){
      event.preventDefault();
        clearTimeout(timer);
      var $ul=$(this).siblings("ul");

      $ul.animate({marginLeft:"-=326px"},300,function(){
          var $li= $ul.find("li:first").remove();
          $li.appendTo($ul);
          $ul.css("margin-left","-326px");
      });

  });
    $(".taotj-image-rotation").find(".image-rotation-l").click(function(event){
        event.preventDefault();
        clearTimeout(timer);
        var $ul=$(this).siblings("ul");

        $ul.animate({marginLeft:"+=326px"},300,function(){

            var $li= $ul.find("li:last").remove();
            $ul.prepend($li);
            $ul.css("margin-left","-326px");
        });
        //console.log(parseInt($ul.css("margin-left")));
    });
    $(".taotj-image-rotation").find(".image-rotation-l").mouseleave(function(){
        timer=setInterval(function(){animate_left();},3500);
    });
    $(".taotj-image-rotation").find(".image-rotation-r").mouseleave(function(){
        timer=setInterval(function(){animate_left();},3500);
    });
    function animate_left(){
       // clearInterval(timer);
        clearTimeout(timer)
        var $ul=$(".taotj-image-rotation").find("ul");
        $ul.animate({marginLeft:"-=326px"},300,function(){
            var $li= $ul.find("li:first").remove();
            $li.appendTo($ul);
            $ul.css("margin-left","-326px");
        });
        timer=setTimeout(function(){

            animate_left();

        },3500);

    }
    animate_left();
}

    //页面滚动到自定义位置
    var url=window.location.href;
    //d("html,body").animate({scrollTop:0},function(){g=true;h.hide()})
    //倒计时函数

    $("[time]").each(function(){
        var _this = $(this),
            _start = _this.attr("start"),
            _end=_this.attr("end");
        _this.countTime({
            startTime:_start,
            endTime:_end

        });
    });
}
//详情页
Taov2.prototype.detail=function(){
    $(".boutique").attr("top",$(".boutique").offset().top);
    $("#panelsTop").attr("top",$("#panelsTop").offset().top);

    function scroll(){
        var scoll=$(window).scrollTop();
        var realH=$(".boutique").outerHeight();
        var minTop=parseInt($(".boutique").attr("top"));
        var maxTop=$(".footer").offset().top-realH-10;
        var left=$(".boutique").offset().left;
        if(scoll>=minTop&&scoll<maxTop){
            //alert("scoll>=minTop&&scoll<maxTop");
            $(".boutique").removeClass("wc-r-absolute");
            $(".boutique").css("left",left.toString()+"px");
            $(".boutique").addClass("fixed").css("top","0px");

        }
        else if(scoll>=maxTop){
            //console.log("scoll>=maxTop");
            //alert("scoll>=maxTop");
            $(".boutique").removeClass("fixed wc-r-absolute");
            $(".boutique").attr("style","");
            $(".boutique").css("left","0px");
            $(".boutique").addClass("wc-r-absolute");
        }
        else if(scoll<=minTop){
            //alert("scoll<=maxTop");
            $(".boutique").attr("class","boutique");
            // $(".boutique").css("left",left.toString()+"px");
            // $(".boutique").addClass("fixed").css("top","0px");

        }
        //console.log($(".footer").offset().top);
    }
   // var rt=$(".wc-detail").offset().top;
    function scrollT(){

        var scoll= $(window).scrollTop();

        var t=parseInt($("#bannerTop").attr("top"));

        var w=$("#bannerTop").attr("w");
        var l=$("#bannerTop").offset().left.toString()+"px";

        var b=$("#bannerTop");
        if($("#detail_show").length>0){
            var top1=parseInt($("#detail_show").attr("top"));
        }

        var top2=parseInt($("#invtroduce_show").attr("top"));
        if($("#detail_show").length>0){
        if(scoll>t&&scoll>=top1&&scoll<top2){


            b.find("li[scrollTo='detail_show']").addClass("current");
            b.find("li[scrollTo='detail_show']").siblings().removeClass("current");
            b.addClass("fixed");
            b.css({"left":l,"top":"0px","width": w.toString()+"px"});
        }

        else if(scoll>t&&scoll>top1&&scoll>=top2){
            b.find("li[scrollTo='invtroduce_show']").addClass("current");
            b.find("li[scrollTo='invtroduce_show']").siblings().removeClass("current");
            b.addClass("fixed");
            b.css({"left":l,"top":"0px","width": w.toString()+"px"});
        }
        else if(scoll<t){
            b.removeClass("fixed");
            b.attr("style","");
        }
        }
        else{
            if(scoll>t){

                b.find("li[scrollTo='invtroduce_show']").addClass("current");
                b.find("li[scrollTo='invtroduce_show']").siblings().removeClass("current");
                b.addClass("fixed");
                b.css({"left":l,"top":"0px","width": w.toString()+"px"});
            }


            else if(scoll<t){
                b.removeClass("fixed");
                b.attr("style","");
            }
        }
    }
    $(window).on("load",function(){

        if($(".wc-detail-l").height()>$(".wc-detail-r").height()){
         $(".wc-detail-r").height($(".wc-detail-l").height());
            $("#bannerTop").attr("top",$("#bannerTop").offset().top);
            $("#bannerTop").attr("w",$("#bannerTop").width());
            if($("#detail_show").length>0){
                $("#detail_show").attr("top",$("#detail_show").offset().top);
            }

            $("#invtroduce_show").attr("top",$("#invtroduce_show").offset().top);
            //$(".footer").attr("top",$(".footer").offset().top);
            $(window).on("scroll",function(){
                scroll();scrollT();
             });
        }
        else{
            $(window).on("scroll",function(){
                scroll();scrollT();
            });
        }

    });

    //console.log($(".wc-detail-r").offset().top);




    //tab切换
    $(".convert").on("click","li",function(){
        var idx=$(this).index();
        var scroll=$(this).attr("scrollTo");
        var  top=$("#"+scroll).attr("top");

        $(window).scrollTop(top);
        scrollT();
    });
    //输入字限制
    $(".usertext").on("keyup",function(){

        var num=200-$(this).val().length;
        if(num<=0){
            $(this).val($(this).val().substr(0,200));
            $(this).siblings(".input-num").find("strong").text("0");
        }
        else{
            $(this).siblings(".input-num").find("strong").text(num);
        }
         if($(this).val().length==0){
             $(this).siblings(".input-num").find("strong").text("200");
        }

    });
    $("[time]").each(function(){
        var _this = $(this),
            _start = _this.attr("start"),
            _end=_this.attr("end");
        _this.countTime({
            startTime:_start,
            endTime:_end

        });
    });
}
//品牌特卖页
Taov2.prototype.brand=function(){


    this._ElementScroll($("#Fixed_left"),"fixed",function(ele,h,css){


        var realtop=parseInt(ele.attr("top"));
        var realleft=parseInt(ele.attr("left"));
        if(h>realtop){

            ele.addClass(css);
            ele.css("left",ele.attr("left")+"px");
        }
        else{
            ele.removeClass(css);
            ele.css("left","5px");
        }
    });

    $("[time]").each(function(){
        var _this = $(this),
            _start = _this.attr("start"),
            _end=_this.attr("end");
        _this.countTime({
            startTime:_start,
            endTime:_end

        });
    });
}
//品牌特卖详情页
Taov2.prototype.brandDetail=function(){
    $("[time]").each(function(){
        var _this = $(this),
            _start = _this.attr("start"),
            _end=_this.attr("end");
        _this.countTime({
            startTime:_start,
            endTime:_end,
            stampSet:
            {  model:"after",
                set:{"day":'<em>天</em>',
                "hour":'<em>时</em>',
                "min":'<em>分</em>',
                "sec":'<em>秒</em>'
              }
            }

        });
    });
}
//公共函数

Taov2.prototype._ElementScroll=function(ele,css,fn){
   // $("#Fixed_left").attr({"left":$("#Fixed_left").offset().left,"top":$("#Fixed_left").offset().top});
    ele.attr({"left":ele.offset().left,"top":ele.offset().top});

    //悬浮固定函数

    $(window).scroll(function(){
        var h=$(this).scrollTop();
       fn(ele,h,css);

    });
}
var taoInit=new Taov2();