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
;var taov2_config={
    '/static/html/taov2/index':["index"],
        '/static/html/taov2/detail':["detail"],
    '/static/html/taov2/brand-detail':["brandDetail"]
}
var Taov2=function(){
    Taov2.prototype.Init=function(arg){
        var THIS=this;
        var URL=window.location.href;

        $.each(taov2_config,function(key,val){
            var newReg=new RegExp(key,"g");
            if(newReg.test(URL)==true){
                for(var i= 0;i<val.length;i++){
                    THIS[val[i]]();
                }
            }
        });
    }
}
$(function(){

    var Taov2Init=new Taov2();

    Taov2Init.Init();
});
//首页
Taov2.prototype.index=function(){
  $("#Fixed_left").attr({"left":$("#Fixed_left").offset().left,"top":$("#Fixed_left").offset().top});

   //悬浮固定函数
    $(window).scroll(function(){
        var h=$(this).scrollTop();
        //console.log();
        var realtop=parseInt($("#Fixed_left").attr("top"));
        var realleft=parseInt($("#Fixed_left").attr("left"));
          if(h>realtop){
              $("#Fixed_left").addClass("fixed");
              $("#Fixed_left").css("left",$("#Fixed_left").attr("left")+"px");
          }
          else{
              $("#Fixed_left").removeClass("fixed");
              $("#Fixed_left").css("left","5px");
          }
    });
//鼠标点击选择类目
    $(".ttj-fixd-list").find("a").click(function(){
        $(this).addClass("hover");
        $(this).siblings().removeClass("hover");
    });
//图片滚动函数
if($(".taotj-image-rotation").find("ul").find("li").length>3){


    $(".taotj-image-rotation").find("ul").find("li").each(function(){
        var li= $(this).clone();
        $(".taotj-image-rotation").find("ul").append(li);
    });
    $(".taotj-image-rotation").find("ul").css("margin-left","-326px");
    $(".taotj-image-rotation").find(".image-rotation-l").click(function(event){
      event.preventDefault();
      var $ul=$(this).siblings("ul");

      $ul.animate({marginLeft:"-=326px"},300,function(){
          var $li= $ul.find("li:first").remove();
          $li.appendTo($ul);
          $ul.css("margin-left","-326px");
      });

  });
    $(".taotj-image-rotation").find(".image-rotation-r").click(function(event){
        event.preventDefault();
        var $ul=$(this).siblings("ul");

        $ul.animate({marginLeft:"+=326px"},300,function(){

            var $li= $ul.find("li:last").remove();
            $ul.prepend($li);
            $ul.css("margin-left","-326px");
        });
        //console.log(parseInt($ul.css("margin-left")));
    });
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
//
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