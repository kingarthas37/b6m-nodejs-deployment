var hbs = require('express-hbs');

//注册pager handler
hbs.registerHelper('pager',function(pager,options) {

    var html = '';

    if( pager.totalCount != '0' && pager.totalCount != ''  ) {

        html += '<div class="page clear-fix">'
        html += '<div>';

        if (pager.page >= 2) {
            html +=  '<a class="first" href="'+ pager.pageUrl + pager.pageUrlParam + 'page=1">首 页</a>';
            html +=  '<a class="prev" href="'+ pager.pageUrl + pager.pageUrlParam +'page='+ (pager.page - 1) +'">&lt;</a>';
        }

        if ((pager.page - 2) > 1 && pager.pageNum >=5) {
            html += '<span>...</span>';
        }


        for(var i =0;i < pager.pages.length; i++) {
            if(Number(pager.pages[i]) === pager.page) {
                html += '<span class="cur">'+ pager.page +'</span>';
            }else {
                html += '<a href="'+ pager.pageUrl + pager.pageUrlParam +'page='+ Number(pager.pages[i]) +'" target="_self" page="'+ Number(pager.pages[i]) +'">'+ Number(pager.pages[i]) +'</a>';
            }
        }


        if ((pager.page + 2) < pager.pageNum && pager.pageNum >= 5) {
            html += '<span>...</span>';
        }

        if(pager.page< pager.pageNum) {
            html += '<a href="'+ pager.pageUrl + pager.pageUrlParam + 'page='+ (pager.page + 1) +'" class="next" target="_self" page="'+ (pager.page + 1) +'">&gt;</a>';
            html += '<a href="'+ pager.pageUrl + pager.pageUrlParam + 'page='+ (pager.pageNum) +'" class="last" target="_self" page="'+ (pager.pageNum) +'">尾 页</a>';
        }

        html += '<span page="'+ pager.pageNum +'" class="pagenum">共 '+ pager.pageNum +' 页&nbsp;第</span>';
        html +=    '<span class="page-input">';
        html +=   '<input class="page-field" type="text" value="'+ pager.page +'">';
        html += '<a class="page-go" href="javascript:void(0)" target="_self">GO</a>';
        html += '</span>';
        html += '<span class="go">页</span>';
        html += '</div>';
        html +=  '</div>';


        return new hbs.SafeString(html);
    }

    return '';

});


//注册leftbar
hbs.registerHelper('leftbar',function(items,cur,options) {


   var html = '';
    for(var i=0;i < items.length;i++) {
        var c = '';
        switch (items[i].name) {
            case '女装':
                c = 'nvz';
            break;
            case '男装':
                c = 'xb';
            break;
            case '鞋包':
                c = 'nanz';
                break;
            case '内衣':
                c = 'ny';
                break;
            case '美妆':
                c = 'mz';
                break;
            case '配饰':
                c = 'ps';
                break;
            case '饰品':
                c = 'ps';
                break;
            case '母婴':
                c = 'my';
                break;
            case '家居':
                c = 'jj';
                break;
            case '食品':
                c = 'sp';
                break;
            case '家电':
                c = 'jd';
                break;
            case '数码':
                c = 'sm';
                break;
            case '车品':
                c = 'cp';
                break;
        }
        var sp = i %2 ===0 ? '|':'';
        var _cur = items[i].id == cur ? ' hover':'';



        html += '<a data-id="'+ items[i].id +'" class="'+ _cur +'" href="?category_id='+ items[i].id +'"><em class="'+ c  + '"></em>'+ items[i].name +'</a>' + sp;
    }
    return new hbs.SafeString(html);
});



//注册折扣helper
hbs.registerHelper('discount-helper',function(p1,p2,options) {
    return Math.round((p1/p2 * 10)*10)/10;
});



//注册sort helper
hbs.registerHelper('sort-index',function(sort,field,curCategory,options) {
    var html = '';
    html += '<a href="/?category_id='+ curCategory +'" class="' + (!sort ? 'curre' : '') + '">默认</a>|';
    //html += '<a href="/?category_id='+ curCategory +'&sort=' + (sort !== 'asc' ? 'asc' : 'desc') + '&field=price"'+ ((field === 'price') ? '" class="'+ (sort !== 'asc' ? 'sort curre' : 'invert curre') + '"' : '') + '">价格<em></em></a>|';
    html += '<a href="/?category_id='+ curCategory +'&sort=' + (sort !== 'desc' ? 'desc' : 'asc') + '&field=sales"'+ ((field === 'sales') ? '" class="'+ (sort !== 'desc' ? 'invert curre' : 'sort curre') + '"' : '') + '">销量<em></em></a>';
    return new hbs.SafeString(html);
});



hbs.registerHelper('page-minus',function(p,options) {
    return p === 1 ? 1 : p - 1;
});

hbs.registerHelper('page-plus',function(p,options) {
    return  p + 1;
});


hbs.registerHelper('gettime',function(time,options) {
    if(typeof(time)==='string') {
        return time;
    }
    return parseInt((new Date().getTime())/1000);
});


//注册sort helper
hbs.registerHelper('sort',function(channelId,sort,field,curCategory,options) {
    var html = '';
    html += '<a ' + ((!sort && !field) ? 'class="nine-red"' : '')  + ' href="/channel/'+ channelId +'?category_id='+ curCategory +'">默认排序</a>';
    //html += '<a ' + ((field === 'price') ? 'class="nine-red"' : '')  + ' href="/channel/'+ channelId + '?category_id='+ curCategory +'&sort='+ (sort !== 'asc' ? 'asc' : 'desc') + '&field=price">价格' + ((field === 'price') ? '<em class="'+ (sort !== 'asc' ? 'nine-dow' : 'nine-top') + '"></em>' : '') +'</a>';
    html += '<a ' + ((field === 'sales') ? 'class="nine-red"' : '')  + ' href="/channel/'+ channelId + '?category_id='+ curCategory +'&sort='+ (sort !== 'desc' ? 'desc' : 'asc') + '&field=sales">销量' + ((field === 'sales') ? '<em class="'+ (sort !== 'asc' ? 'nine-dow' : 'nine-top') + '"></em>' : '') +'</a>';
    return new hbs.SafeString(html);
});


//brand detailo sort helper
hbs.registerHelper('sort-brand-detail',function(brandId,sort,field,stock,options) {

    var html = '';
    html += '<a href="/brand/detail/'+ brandId +'" class="def">默认</a>';
    html += '<a href="/brand/detail/'+ brandId +'?stock='+ stock +'&sort='+ (sort !== 'asc' ? 'asc' : 'desc') +'&field=price" class="dis '+ ((field === 'price') ?  (sort !== 'asc' ? 'down' : 'up')  : '') +'">价格</a>';
    html += '<a href="/brand/detail/'+ brandId +'?stock='+ stock +'&sort='+ (sort !== 'desc' ? 'desc' : 'asc') +'&field=sales" class="dis '+ ((field === 'sales') ?  (sort !== 'asc' ? 'down' : 'up')  : '') +'">折扣</a>';

   /* html += '<a ' + ((!sort && !field) ? 'class="nine-red"' : '')  + ' href="/channel/'+ channelId +'?category_id='+ curCategory +'">默认排序</a>';
    html += '<a ' + ((field === 'price') ? 'class="nine-red"' : '')  + ' href="/channel/'+ channelId + '?category_id='+ curCategory +'&sort='+ (sort !== 'asc' ? 'asc' : 'desc') + '&field=price">价格' + ((field === 'price') ? '<em class="'+ (sort !== 'asc' ? 'nine-dow' : 'nine-top') + '"></em>' : '') +'</a>';
    html += '<a ' + ((field === 'sales') ? 'class="nine-red"' : '')  + ' href="/channel/'+ channelId + '?category_id='+ curCategory +'&sort='+ (sort !== 'desc' ? 'desc' : 'asc') + '&field=sales">销量' + ((field === 'sales') ? '<em class="'+ (sort !== 'asc' ? 'nine-dow' : 'nine-top') + '"></em>' : '') +'</a>';*/
    return new hbs.SafeString(html);
});



hbs.registerHelper('html',function(text,options) {
    text = text.replace(/<textarea[^>]*>/,'');
    text = text.replace(/<\/textarea>/,'');
    text = text.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
    text=text.replace(/data-lazyload/g,"src");
    return new hbs.SafeString(text);
});


//注册handlebars helper，debug css,js
hbs.registerHelper('assetsmap',function(items,options) {
    var uris ='';
    for(var i=0;i<items.length;i++) {
        uris += '<link rel="stylesheet" type="text/css" href="' + items.res[items[i]].uri +'"/>\n';
    }
    return uris;
});
