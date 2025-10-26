import { extend } from 'flarum/common/extend';
import app from 'flarum/admin/app';

app.initializers.add('wszdb-shareurl', () => {
    app.extensionData
        .for('wszdb-shareurl')
        .registerSetting({
            setting: 'wszdb.shareurl.warning_text',
            label: app.translator.trans('wszdb-shareurl.admin.settings.warning_text_label'),
            help: app.translator.trans('wszdb-shareurl.admin.settings.warning_text_help'),
            type: 'text',
        })
        .registerSetting({
            setting: 'wszdb.shareurl.whitelist',
            label: app.translator.trans('wszdb-shareurl.admin.settings.whitelist_label'),
            help: app.translator.trans('wszdb-shareurl.admin.settings.whitelist_help'),
            type: 'text',
        })
        .registerSetting({
            setting: 'wszdb.shareurl.enable_copy_link',
            label: app.translator.trans('wszdb-shareurl.admin.settings.enable_copy_link_label'),
            help: app.translator.trans('wszdb-shareurl.admin.settings.enable_copy_link_help'),
            type: 'boolean',
            default: true,
        });
});