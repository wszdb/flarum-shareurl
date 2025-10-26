<?php

namespace Wszdb\ShareUrl\Listeners;

use Flarum\Post\Event\Rendered;
use Flarum\Post\Post;

class AddCopyLinkButton
{
    public function handle(Rendered $event)
    {
        if ($event->post->isFirstPost()) {
            $event->content .= <<<HTML
<button class="wszdb-shareurl-copy-button Button Button--secondary">
    {$event->post->forum()->translator()->trans('wszdb-shareurl.forum.copy_link_button')}
</button>
HTML;
        }
    }
}