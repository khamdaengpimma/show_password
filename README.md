# Password Viewer Pro

Password Viewer Pro is a lightweight Google Chrome extension that helps you instantly view hidden passwords. It automatically detects password input fields on any webpage and adds a convenient "eye" (👁) button, allowing you to easily toggle the password visibility between hidden and plain text.

## Features

- **One-Click Visibility Toggle**: Instantly show or hide any password field by clicking the dynamically added button. The icon dynamically switches between an open eye (👁) and a closed monkey (🙈) to indicate state.
- **Smart Detection**: Automatically skips adding the toggle if the website already has a built-in "show/hide" password control, preventing duplicate and cluttered buttons.
- **Works on Dynamic Pages**: Uses a MutationObserver to detect and attach the button to password fields even when they are loaded dynamically (e.g., in Single Page Applications like React, Angular, or Vue).
- **Global On/Off Switch**: Comes with a simple popup menu to enable or disable the extension globally.
- **Cross-Device Sync**: Your settings (enabled/disabled state) are synchronized across your devices using Chrome's synced storage.
- **Privacy-Focused**: Everything runs locally in your browser. No data or passwords are ever collected, tracked, or sent to external servers.

## Installation

As this extension is custom-built and hasn't been submitted to the Chrome Web Store, you can easily load it locally as an "Unpacked Extension":

1. Clone this repository or download the source code to your computer.
2. Open Google Chrome and go to `chrome://extensions/`.
3. In the top right corner, turn on **Developer mode**.
4. Click the **Load unpacked** button that appears in the top left.
5. Select the `show_password` folder where you downloaded these files.
6. The extension is now installed! You should see the "Password Viewer Pro" icon in your Chrome toolbar.

## How It Works

- **`manifest.json`**: Defines the extension's configuration, permissions (storage, all URLs), and points to the popup and content script.
- **`content.js`**: Runs in the background of web pages you visit. It searches for elements with `type="password"`, intelligently checks if a visibility toggle already exists nearby, and if not, wraps the input and injects the dynamic toggle button. It also uses a MutationObserver to listen for any new passwords added to the screen later.
- **`popup.html` & `popup.js`**: Provide the user interface when clicking the extension icon in the toolbar, giving you a master switch to toggle the extension on or off.

## Tech Stack

- Manifest V3
- Vanilla JavaScript
- HTML & CSS
- Chrome Extension APIs (`chrome.storage.sync`)

## License

This project is licensed under the MIT License - feel free to use, modify, and distribute it as you see fit.
