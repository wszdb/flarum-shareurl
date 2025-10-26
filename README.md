# Flarum ShareURL Plugin

A Flarum plugin that adds external link warning and one-click copy link functionality to enhance forum security and user experience.

## Features

- 🔗 **External Link Warning**: When users click on external links, a modal warning will appear to alert them about potential risks. Users can choose to proceed or cancel.
- ⚙️ **Admin Configurable Warning Text**: Administrators can customize the warning message displayed to users.
- 📝 **Whitelist Keywords**: Set up comma-separated keywords for external links that should bypass the warning (e.g., trusted domains).
- 📋 **One-Click Copy Link**: Adds a "Copy and Share" button to discussion pages, allowing users to quickly copy the post title and URL.
- 🔧 **Admin Toggle**: Enable or disable copy link functionality through the admin panel.
- 🌐 **Multilingual Support**: Full support for both English and Chinese languages.

## Installation

1. Install the plugin via Composer:
```bash
composer require wszdb/flarum-shareurl
```

2. Enable the plugin in the Flarum admin panel.

3. Configure the settings in the admin panel:
   - Set your custom warning text
   - Add whitelist keywords (comma-separated)
   - Enable/disable copy link button

## Usage

### For Users

- **External Links**: When clicking on external links, you'll see a security reminder. Click "Confirm" to proceed or "Cancel" to stay on the current page.
- **Copy Link**: In discussion pages, click the "Copy and Share" button in the sidebar to copy the post title and URL to your clipboard.

### For Administrators

1. Go to **Admin Panel → Extensions → ShareURL → Settings**
2. Configure the following options:
   - **Warning Text**: Customize the message shown to users when they click external links
   - **Whitelist Keywords**: Add trusted domains or keywords (comma-separated) that won't trigger the warning
   - **Enable Copy Link Button**: Toggle the visibility of the copy link button

## Screenshots

*Coming soon...*

## Requirements

- Flarum 1.0 or higher
- PHP 7.4 or higher
- Composer

## License

MIT License

## Support

- 📧 **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/wszdb/flarum-shareurl/issues)
- 💬 **Discussions**: Join our community discussions on [GitHub Discussions](https://github.com/wszdb/flarum-shareurl/discussions)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Developed by [wszdb](https://github.com/wszdb)

---

This plugin was automatically developed using [AiPy](https://www.aipyaipy.com/).  
Code: XOFS