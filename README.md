b6m-nodejs-deployment
=====================

b6m团队nodejs+前端项目部署示例

线上预览：[http://tejia.b5m.com](http://tejia.b5m.com)

*执行npm install安装所有模块
*执行node start运行项目(port:3003)

###核心模块:
*使用node-express搭建web框架
*使用node-handlebars模板引擎
*使用[fis](http://fis.baidu.com/)搭建前端资源部署
*使用node-async进行数据请求异步回调流程控制
*使用node-memcached进行缓存管理

###工作流程：
由前端团队统一开发、管理、配置整个项目的view层，包括模板嵌套、路由、缓存等控制，而所有数据业务工作一概分离，我们使用了node-request模块对所有数据统一后端提供restful api调用，这样便不需要后端人员对前端代码的维护，而前端人员可任意修改视图上的任何代码，最终大幅减少沟通成本，提高工作效率，具体可参考[http://ued.taobao.org/blog/2014/04/full-stack-development-with-nodejs/](http://ued.taobao.org/blog/2014/04/full-stack-development-with-nodejs/)
