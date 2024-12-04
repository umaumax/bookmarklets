// ==UserScript==
// @name         Image to Base64 Copy via Context Menu
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Image to Base64 Copy via Context Menu
// @author       Your Name
// @match        *://*/*
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    let lastClickedImage = null;
    document.addEventListener('contextmenu', (event) => {
        const target = event.target;

        if (target.tagName === 'IMG') {
            lastClickedImage = target;
        } else {
            lastClickedImage = null;
        }
    });

    GM_registerMenuCommand("Image to Base64", async () => {
        if (lastClickedImage) {
            try {
                const base64Data = await fetchImageToBasr64(lastClickedImage.src);
                GM_setClipboard(base64Data);
                alert("[Image to Base64 Copy via Context Menu] Success to copy to clipboarfd!");
            } catch (error) {
                console.error("[Image to Base64 Copy via Context Menu]", error);
                alert("[Image to Base64 Copy via Context Menu] Failed.");
            }
        } else {
            alert("Please select image!");
        }
    });

    function blobToBase64(blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    async function fetchImageToBasr64(image_url) {
        const blob = await (await fetch(image_url)).blob();
        const blob_uri = URL.createObjectURL(blob);
        return blobToBase64(blob);
    }
})();
