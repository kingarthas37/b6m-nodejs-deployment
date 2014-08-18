'use strict';

function PageController(opt) {

    var dataPage = {};

    dataPage.pageSize = opt.pageSize || 5;
    // 当前页码

    dataPage.totalCount = opt.totalCount || 0;
    dataPage.page = opt.curPage || 1;


    // 总页数
    dataPage.pageNum = opt.totalCount || 10;

    dataPage.pageUrl = opt.pageUrl || '/';

    dataPage.pageUrlParam =  dataPage.pageUrl.indexOf('?') > -1 ?  '&' : '?';

    dataPage.pages = opt.numCount || [1,2,3,4,5];

    return dataPage;

}


module.exports = PageController;