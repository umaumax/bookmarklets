// ==UserScript==
// @name         AdVideoBlocker
// @namespace
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tver.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tver.jp
// @grant        none
// @noframes
// ==/UserScript==

function is_video_playing(video) {
    return video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
}

function is_ad_video(video) {
    let video_src = video.currentSrc;
    let video_duration = video.duration;
    if (String(video_src).startsWith('blob:https://tver.jp/')) {
        return false;
    }
    const ad_video_duration_th = 60 * 2;
    if (video_duration >= ad_video_duration_th) {
        return false;
    }
    return true;
}

function skip_ad_video(video) {
    if (video.currentTime < video.duration) {
        video.currentTime = video.duration;
    }
}

function find_ad_videos() {
    let videos = document.getElementsByTagName("video");
    return Array.prototype.slice.call(videos).filter(video => is_ad_video(video));
}

function check_ad_video() {
    let videos = find_ad_videos();
    if (!videos) {
        return;
    }
    videos.forEach(video => {
        if (is_video_playing(video)) {
            skip_ad_video(video);
            console.log('[AdVideoBlocker] skip ad video: ', video);
        }
    });
}

function addPiPButton() {
    const button = document.createElement('button');
    button.textContent = '🖼️PiP';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.left = '150px';
    button.style.zIndex = '1000';
    button.addEventListener('click', () => {
        const video = document.querySelector('video');
        if (video) {
            if (document.pictureInPictureElement == video) {
                document.exitPictureInPicture()
                    .then(() => {
                        console.log("Succeed to exit PiP mode");
                    })
                    .catch((error) => {
                        console.error("Failed to exit PiP mode:", error);
                    });
            } else {
                video.requestPictureInPicture().catch(error => {
                    console.error('Failed to enter PiP mode:', error);
                });

            }
        }
    });
    document.body.appendChild(button);
}

(function() {
    'use strict';
    let check_ad_video_interval = 100;
    setInterval(check_ad_video, check_ad_video_interval);

    // NOTE: toggle video play by space key
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                // console.log("return due to input or textarea");
                return;
            }
            const video = document.querySelector('video');
            if (!video) {
                // console.log("return due to no video");
                return;
            }
            // NOTE: This will only fire once per each keypress.
            if (event.repeat) {
                // console.log("return due to event.repeat");
                event.preventDefault();
                return;
            }
            // NOTE: default controller
            if (document.activeElement.className.includes('controller_container')) {
                // console.log("return due to controller_container");
                return;
            }
            if (video.paused) {
                // console.log("video.play()");
                video.play();
            } else {
                // console.log("video.pause()");
                video.pause();
            }
            event.preventDefault();
            event.stopPropagation(); // for when the focus is on the video player
        }
    }, true); // for when the focus is on the video player

    addPiPButton();
})();