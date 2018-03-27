<?php

return array(
	//'配置项'=>'配置值'
    
    //数据库配置
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => SAE_MYSQL_HOST_M, // 服务器地址
    'DB_NAME'   => 'app_mnichangxin', // 数据库名
    'DB_USER'   => SAE_MYSQL_USER, // 用户名
    'DB_PWD'    => SAE_MYSQL_PASS, // 密码
    'DB_PORT'   => SAE_MYSQL_PORT, // 端口
    'DB_PREFIX' => 'think_', // 数据库表前缀 
    'DB_CHARSET'=> 'utf8', // 字符集

    //网站静态目录配置
    '__PUBLIC__'  =>__ROOT__. '/Public'//用于存储js,css等文件
);