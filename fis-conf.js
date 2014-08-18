var config = require('./package.json');


/*
var proj_name = config.name + '/';
fis.config.set('proj_name',proj_name);
*/


fis.config.merge({

    modules : {
        parser : {less : ['less']}
    },

    roadmap : {

        //所有资源加cdn地址前缀
        domain:'http://staticcdn.b5m.com/proj/' + config.name,

        ext: {
            less : 'css'
        },

        path : [

            //排除非编译目录
            {
                reg:/\/(node_modules|bin|config|lib|routes|views)\//i,
                release:false
            },

            //排除非编译文件
            {
                reg:/\/(app\.js|package\.json|run\.json)/i,
                release:false
            },

            //只编译development目录
            {
                reg:/\/public\/(?!development\/)/i,
                release:false
            },

            {
                reg:/\/public\/development\/html\/(.*)/i,
                release:'/html/$1'
            },

            {
                reg:/\/public\/development\/css\/(.*)/i,
                release:'/css/$1'
            },

            {
                reg:/\/public\/development\/images\/(.*)/i,
                release:'/images/$1'
            },

            {
                reg:/\/public\/development\/js\/(.*)/i,
                release:'/js/$1'
            },

            {
                reg:/\/css\/([^\/]+\.png)/i,
                release:'/images/$1'
            }
        ]
    },

    pack:{
        'css/tejia_min.css':[
            '/public/development/css/brand.less',
            '/public/development/css/taov2.less',
            '/public/development/css/detail.less'
        ],
        'js/tejia_min.js':[
            '/public/development/js/countTime.js',
            '/public/development/js/taov2.js'
        ],
        //client内嵌页css
        'css/client_min.css':[
            '/public/development/css/client.less'
        ],
        'js/client_min.js':[
            '/public/development/js/jquery.jcarousel.js',
            '/public/development/js/client.js'
        ]
    },
    deploy : {
        build : {
            to : './public/build'
        },
        stage : {
            receiver:'http://172.16.11.51/receiver.php',
            to : '/var/web/static/proj/' + config.name
        },
        prod: {
            receiver:'http://10.10.99.101:8244/receiver.php',
            to : '/opt/webroot/nginx_staticcdn_80/proj/' + config.name
        }
    }
});