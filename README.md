# Kotori.js

一个辣鸡Javascript Loader

# 用法

```javascript
kotori.config({
    'jquery': '//cdn.bootcss.com/jquery/2.2.1/jquery.min.js',
    'moment': '//cdn.bootcss.com/moment.js/2.11.2/moment-with-locales.min.js',
    'jquery-validate': '//cdn.bootcss.com/jquery-validate/1.15.0/jquery.validate.min.js',
    'tinyMCE': '//cdn.bootcss.com/tinymce/4.3.10/tinymce.min.js',
    'tinyMCE-autoresize': '//cdn.bootcss.com/tinymce/4.3.12/plugins/autoresize/plugin.min.js',
    'jquery-datetimepicker': '//cdn.bootcss.com/jquery-datetimepicker/2.5.3/build/jquery.datetimepicker.full.min.js',
    'jquery-datetimepicker-style': '//cdn.bootcss.com/jquery-datetimepicker/2.5.4/build/jquery.datetimepicker.min.css',
    'jquery-mousewheel': '//cdn.bootcss.com/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js',
    'jquery-jcrop': '//cdn.bootcss.com/jquery-jcrop/0.9.12/js/jquery.Jcrop.min.js',
    'jquery-jcrop-style': '//cdn.bootcss.com/jquery-jcrop/0.9.12/css/jquery.Jcrop.min.css',
    'jquery-parallax': '//cdn.bootcss.com/jquery-parallax/1.1.3/jquery-parallax-min.js'
});

kotori.require(['moment', 'jquery', 'jquery-datetimepicker'], function() {
    console.log($);
    console.log($.datetimepicker);
});

kotori.require('jquery', function() {
    console.log($);
});

kotori.require('//cdn.bootcss.com/jquery/2.2.1/jquery.min.js', function() {
    console.log($);
});

```