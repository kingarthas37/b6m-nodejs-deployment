/*
var currPageNo =1;
//var hour = $("#hourHidden").val();
var category = $("#categoryId").val();
var sortField = $("#sortField").val();
function aHref(hrefPageNo){
	cleanTime();
	if(hrefPageNo=='prev')
		currPageNo == countPageNumber ? currPageNo=1 : currPageNo++;
	else if(hrefPageNo=='next')
		currPageNo == 1 ? currPageNo=countPageNumber : currPageNo--;
	
	var urlWare = '/ajaxTypeFindPlugin.do?price='
		+ priceField
		+ '&categoryId='
		+ category
		+ '&sortField='
		+ sortField
		+ '&currPageNo='
		+ currPageNo;
	
	$.ajax({
		url : urlWare,
		type : 'get',
		dataType:'json'
	})
	.done(function(data){
		if(null != data[0]){
			$('.mod').remove();
			if(-1 != priceField){
				$(pageHtml(data[0])).appendTo('.tab-mod').end().fadeIn(2000);
				//maskOnClick();
			}else
				$(tomorrowHtml(data[0])).appendTo('.tab-mod').end().fadeIn(2000);
			redirectUrlEach();
		}
	});
}

function changeCategory(categoryId) {
	$("#categoryId").val(categoryId);
	urlFieldClient(categoryId,sortField);
}
function changeSort(sortField) {
	$("#sortField").val(sortField);
	urlFieldClient(category,sortField);
}
function urlFieldClient(categoryId,sortField){
	var url = '/b5tClientTao_'
		+ priceField
		+ "_"
		+ categoryId
		+ '_'
		+ sortField
		+ '_1';
	
		location.href = url;
}

function pageHtml(data){
	var mask = '';
	var kuai = '';
	var chao = '';
	var photo = '';
	var less = '';
	var salesPrice = new Number(data.salesPrice).toFixed(2);
	if (data.stock <= 5) {
		less = '<b class="icon-less"></b>';
	}else if (data.stock < 10 || (data.totalClick-data.initClick) > 200 ) {
		kuai = '<b class="icon-kuai"></b>';
	}else if (data.discount < 0.3) {
		chao = '<b class="icon-chao"></b>';
	}
	if (data.imgurl != null || data.sourceUrl != null) 
		photo = '<a redirect-url="true" data-source="'+data.sourceUrl+'" href="/detailed-'+data.source+'-'+data.categoryid+'-'+data.id+'.html" target="_blank" data-rd="2"><span><img src="'+data.imgurl+'"></span></a>';
	else
		photo = '<span><img src="images/b5t_index/default_236.png"/></span>';
	
	var wareHtml = [
			'<div class="mod">',
			'<h3 class="name">',
				'<a redirect-url="true" data-source="'+data.sourceUrl+'" href="/detailed-'+data.source+'-'+data.categoryid+'-'+data.id+'.html" target="_blank" data-rd="1">'+data.name+'</a>',
			'</h3>',
			'<div class="photo">',
			photo,
			'</div>',
			'<div class="now">',
				'<span class="price"><small>&yen;</small>'+salesPrice+'</span> <a redirect-url="true" data-source="'+data.sourceUrl+'" href="/'+data.id+'.html" target="_blank" class="btn" rel="nofollow" data-rd="1">去看看</a>',
			'</div>',
			mask+less+kuai+chao,
			'<div class="a-prev"><a href="javascript:aHref('+"'prev'"+');"></a></div>',
			'<div class="a-next"><a href="javascript:aHref('+"'next'"+');"></a></div>'
        ].join('');
	
	return wareHtml;
};

function tomorrowHtml(data){
	var photo='';
	var salesPrice = new Number(data.salesPrice).toFixed(2);
	if (data.imgurl != null || data.sourceUrl != null) 
		photo = '<a redirect-url="true" data-source="'+data.sourceUrl+'" href="#" target="_blank"><span><img src="'+data.imgurl+'"></span></a>';
	else
		photo = '<span><img src="images/b5t_index/default_236.png"/></span>';
		
	var wareHtml = [
			'<div class="mod">',
			'<h3 class="name">',
				'<a redirect-url="true" data-source="'+data.sourceUrl+'" href="#">'+data.name+'</a>',
			'</h3>',
			'<div class="photo">',
			photo,
			'</div>',
			'<div class="now next">',
				'<span class="price"><small>&yen;</small>',
					''+salesPrice+'</span> <span class="txt">即将开始...</span>',
			'</div>',
			'<div class="mask"></div>',
			'<div class="a-prev"><a href="javascript:aHref('+"'prev'"+');"></a></div>',
			'<div class="a-next"><a href="javascript:aHref('+"'next'"+');"></a></div>',
			'</div>'
        ].join('');
	return wareHtml;
};

$(function(){
	if(countPageNumber <= 1){
		$('.a-prev').hide();
		$('.a-next').hide();
	}
	//maskOnClick();
	
	$('.nav .item').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
	
	redirectUrlEach();
});

function redirectUrlEach(){
	$('a[redirect-url=true]').each(function(){
//		$(this).attr('href','http://stats.b5m.com/redirect.html?target='+encodeURIComponent($(this).attr('data-source'))+'&t=1&s=clentTao');
	});
}


function formatTime()
{
	aHref(currPageNo++);
}
var flag = setInterval(formatTime,1000*60*5);
function cleanTime(){
	clearInterval(flag);
	flag = setInterval(formatTime,1000*60*5);
}
*/


$(function() {


    $('.nav .item').hover(function(){
        $(this).addClass('hover');
    },function(){
        $(this).removeClass('hover');
    });


    $('.pic-slider').jcarousel({wrap:'circular'}).jcarouselAutoscroll({
        interval:4600,
        autostart: true
    });

    $('.pagination').on('jcarouselpagination:active', 'a',function () {
        $(this).addClass('active');
    }).on('jcarouselpagination:inactive', 'a',function () {
            $(this).removeClass('active');
        }).jcarouselPagination();
    $(".pic-slider").on('click','.pic-slider-per',function(){
        $('.pic-slider').jcarousel('scroll', '-=1');
    });
    $(".pic-slider").on('click','.pic-slider-next',function(){
        $('.pic-slider').jcarousel('scroll', '+=1');
    });



});