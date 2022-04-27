// ==UserScript==
// @name         AdVideoBlocker
// @namespace
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tver.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tver.jp
// @grant        none
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

function find_ad_videos(video) {
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

(function() {
    'use strict';
    let check_ad_video_interval = 100;
    setInterval(check_ad_video, check_ad_video_interval);
})();
