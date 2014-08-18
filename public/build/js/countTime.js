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