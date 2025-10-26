<?php

namespace Wszdb\ShareUrl;

use Flarum\Extend;
use Flarum\Settings\SettingsRepositoryInterface;

return [
    // 注册前端资源
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),
    
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    // 注册语言包
    new Extend\Locales(__DIR__.'/locale'),

    // 注册设置项
    (new Extend\Settings())
        ->serializeToForum('wszdb.shareurl.warningText', 'wszdb.shareurl.warning_text')
        ->serializeToForum('wszdb.shareurl.whitelist', 'wszdb.shareurl.whitelist', function ($value) {
            return $value ? explode(',', $value) : [];
        })
        ->serializeToForum('wszdb.shareurl.enableCopyLink', 'wszdb.shareurl.enable_copy_link', function ($value) {
            return (bool)$value;
        })
        ->default('wszdb.shareurl.warning_text', 'External link warning: This link will open in a new window.')
        ->default('wszdb.shareurl.whitelist', '')
        ->default('wszdb.shareurl.enable_copy_link', true),
];