// ==UserScript==
// @name         Image Link Checker with Toast Notification
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Detect broken image links and notify via toast, scroll to the broken image on toast click
// @author       You
// @match        https://gitlab.com/umaumax/memo/-/wikis/*
// @grant        none
// ==/UserScript==

function omitText(text, max_length = 77) {
    if (text.length > max_length) {
        return text.substr(0, max_length) + '...';
    }
    return text;
}

function getOriginalImageSrc(img) {
    if (img.hasAttribute('data-canonical-src')) {
        return img.getAttribute('data-canonical-src');
    }
    return img.src;
}

function showImgToast(img) {
    const imgSrc = getOriginalImageSrc(img);
    if (imgSrc == "") {
        // NOTE: load直後はdisplay:noneで遅延でdata-src属性が適用されるケースがある(このログは最新の要素の状態を指し示している)
        console.log('❌️ No image src:', img);
        return;
    }
    const message = `❌️ Broken image detected: <a href="${imgSrc}">${omitText(imgSrc)}</a>`;
    showToast(message, img);
}

function showToast(message, imageElement) {
    const toast = document.createElement('div');
    toast.innerHTML = message;

    toast.style.margin = '10px';
    toast.style.padding = '10px';
    toast.style.backgroundColor = '#FF7979';
    toast.style.color = 'white';
    toast.style.borderRadius = '5px';
    toast.style.cursor = 'pointer';
    const toastBase = document.getElementById('toastBase');
    toastBase.appendChild(toast);

    toast.addEventListener('click', function() {
        imageElement.scrollIntoView({
            behavior: 'smooth'
        });
        toastBase.removeChild(toast);
    });

    setTimeout(() => {
        if (toastBase.contains(toast)) {
            toastBase.removeChild(toast);
        }
    }, 5000);
}

(function() {
    'use strict';

    const toastBase = document.createElement('div');
    toastBase.id = 'toastBase';
    toastBase.style.position = 'fixed';
    toastBase.style.top = '20px';
    toastBase.style.right = '20px';
    toastBase.style.padding = '10px';
    toastBase.style.cursor = 'pointer';
    toastBase.style['z-index'] = '9999';
    document.body.appendChild(toastBase);

    function detectBrokenImages() {
        const images = document.querySelectorAll('img:not([data-img-detected="true"])');
        images.forEach(img => {
            img.setAttribute('data-img-detected', 'true');
            if (img.complete) {
                if (img.naturalWidth == 0 && img.naturalHeight == 0) {
                    showImgToast(img);
                }
            } else {
                img.addEventListener('error', function() {
                    showImgToast(img);
                });
            }

        });
    }

    setInterval(() => {
        detectBrokenImages();
    }, 1000);

    window.addEventListener('load', detectBrokenImages);
})();
