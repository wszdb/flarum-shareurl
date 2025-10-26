<?php

namespace Wszdb\ShareUrl\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Wszdb\ShareUrl\Commands\SaveSettings;

class SaveSettingsController extends AbstractShowController
{
    public $serializer = \Flarum\Api\Serializer\ForumSerializer::class;

    protected $dispatcher;

    public function __construct(Dispatcher $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $data = $request->getParsedBody();

        $actor->assertAdmin();

        return $this->dispatcher->dispatch(
            new SaveSettings($actor, $data)
        );
    }
}