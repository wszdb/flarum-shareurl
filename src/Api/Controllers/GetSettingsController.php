<?php

namespace Wszdb\ShareUrl\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Flarum\Settings\SettingsRepositoryInterface;

class GetSettingsController extends AbstractShowController
{
    public $serializer = \Flarum\Api\Serializer\ForumSerializer::class;

    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();

        return [
            'wszdb.shareurl.warning_text' => $this->settings->get('wszdb.shareurl.warning_text', 'External link warning: This link will open in a new window.'),
            'wszdb.shareurl.whitelist' => $this->settings->get('wszdb.shareurl.whitelist', ''),
        ];
    }
}