// ==UserScript==
// @name         Add text/html Clipboard Converter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add a shortcut key (command + ctrl + v)
// @author       you
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    async function pasteFromClipboard() {
        try {
            const clipboardItems = await navigator.clipboard.read();
            let alert_message = '';
            for (const item of clipboardItems) {
                for (const item_type of item.types) {
                    // console.log('💡', item_type, '💡')
                    if (item_type === 'text/html') {
                        const clipboard = await item.getType(item_type);
                        const html = await clipboard.text();
                        // console.log('💡', html, '💡')

                        const type = "text/plain";
                        const blob = new Blob([html], { type });
                        const data = [new ClipboardItem({ [type]: blob })];
                        alert_message = '';
                        navigator.clipboard.write(data).then(
                            () => {
                                alert(`📋️: A current 'text/html' content has copied to 'text/plain' clipboard.\n '${html}'`);
                            },
                            (err) => {
                                console.error("navigator.clipboard.write:", err);
                            },
                        )
                    } else {
                        alert_message += `📋️: A current clipboard type is '${item_type}' not 'text/html'\n`;
                    }
                }
            }
            if (alert_message != '') {
                alert(alert_message);
            }
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }

    document.addEventListener('keydown', function(event) {
        // console.log('🌟metaKey', event.metaKey);
        // console.log('🌟ctrlKey', event.ctrlKey);
        // console.log('🌟key', event.key);
        if (event.metaKey && event.ctrlKey && event.key === 'v') {
            pasteFromClipboard()
        }
    });
})();