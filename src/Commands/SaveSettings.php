<?php

namespace Wszdb\ShareUrl\Commands;

use Flarum\User\User;
use Flarum\Settings\SettingsRepositoryInterface;

class SaveSettings
{
    public $actor;
    public $data;

    public function __construct(User $actor, array $data)
    {
        $this->actor = $actor;
        $this->data = $data;
    }

    public function handle(SettingsRepositoryInterface $settings)
    {
        if (isset($this->data['warning_text'])) {
            $settings->set('wszdb.shareurl.warning_text', $this->data['warning_text']);
        }

        if (isset($this->data['whitelist'])) {
            $settings->set('wszdb.shareurl.whitelist', $this->data['whitelist']);
        }

        return [
            'wszdb.shareurl.warning_text' => $settings->get('wszdb.shareurl.warning_text'),
            'wszdb.shareurl.whitelist' => $settings->get('wszdb.shareurl.whitelist'),
        ];
    }
}