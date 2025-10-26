<?php

namespace Wszdb\ShareUrl\Listeners;

use Flarum\Frontend\Event\Rendering;
use Flarum\Frontend\Document;

class AddExternalLinkWarning
{
    public function handle(Rendering $event)
    {
        $event->document->head[] = <<<HTML
<script>
// External link warning logic will be handled in forum.js
</script>
HTML;
    }
}