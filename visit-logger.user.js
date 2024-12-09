// ==UserScript==
// @name         Visit Logger
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Log visits
// @author       Your Name
// @match        *://*/*
// @icon         data:image/png;base64,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
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

// Function to create the counter element
function createCounter(count_value) {
    const counter = document.createElement('div');
    counter.id = 'visit-counter';
    counter.style.position = 'fixed';
    counter.style.bottom = '20px';
    counter.style.right = '20px';
    counter.style.background = 'rgba(0, 0, 0, 0.6)';
    counter.style.color = 'white';
    counter.style.padding = '4px 8px';
    counter.style['border-color'] = 'white';
    counter.style['border-width'] = '1px';
    counter.style.borderStyle = 'solid';
    counter.style.borderRadius = '5px';
    counter.style.fontSize = '14px';
    counter.style.zIndex = '1000';
    counter.style.cursor = 'move';
    counter.textContent = `🏆 ${count_value} visits`;
    document.body.appendChild(counter);
    return counter;
}

// Function to restore saved position
function restorePosition(counter) {
    const savedPosition = JSON.parse(localStorage.getItem('visitCounterPosition'));
    if (savedPosition) {
        counter.style.top = savedPosition.top;
        counter.style.left = savedPosition.left;
        counter.style.bottom = savedPosition.bottom;
        counter.style.right = savedPosition.right;
    }
}

// Function to enable drag-and-drop for the counter
function enableDragAndDrop(counter) {
    let offsetX, offsetY, isDragging = false;

    counter.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - counter.getBoundingClientRect().left;
        offsetY = e.clientY - counter.getBoundingClientRect().top;
        counter.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        counter.style.left = `${x}px`;
        counter.style.top = `${y}px`;
        counter.style.right = 'auto';
        counter.style.bottom = 'auto';
    });

    document.addEventListener('mouseup', () => {
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        if (isDragging) {
            isDragging = false;
            counter.style.transition = '';

            // Save the position to localStorage
            const rect = counter.getBoundingClientRect();
            const position = {
                //                top: `${rect.top}px`,
                //                left: `${rect.left}px`,
                top: `${(rect.top / pageHeight) * 100}%`,
                left: `${(rect.left / pageWidth) * 100}%`,
                bottom: 'auto',
                right: 'auto'
            };
            localStorage.setItem('visitCounterPosition', JSON.stringify(position));
        }
    });
}

(function() {
    'use strict';

    let content = '';
    content += `
    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.75; }
        100% { transform: scale(1); opacity: 1; }
    }

    a[data-history_count]::before {
        content: "";
        width: fit-content;
        position: absolute;
        top: 0px;
        left: -8px;
        background-color: #000;
        color: white;
        /* font-size: 10px; */
        padding: 1px 4px;
        border-radius: 2px;
        white-space: nowrap;
        animation: pulse 2s infinite;
    }
    a[data-history_count]::before { content: attr(data-history_count); background: #cc6347; }

    a[data-history_count] {
        position: relative;
    }

    /*
    h1::before { content: "H1"; background: #ff6347; }
    h2::before { content: "H2"; background: #1e90ff; }
    h3::before { content: "H3"; background: #228b22; }
    h4::before { content: "H4"; background: #c71585; }
    h5::before { content: "H5"; background: #8a2be2; }
    h6::before { content: "H6"; background: #666666; }
    */

    #rankingDialog {
    background: rgba(0, 0, 0, 0.7);

    a {
        display: flex;
        padding: 0px 10px;
        justify-content:space-between;
        color: #ff0;
        padding: 0px 24px;
        border-bottom: 1px solid #888;
    span.title {
        color: orange;
        list-style: none;
        overflow: hidden;
        white-space: nowrap;
    }
    span.timestamp {
        color: pink;
        list-style: none;
        overflow: hidden;
        white-space: nowrap;
    }
    }
`

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = content;
    document.getElementsByTagName('head')[0].appendChild(style);

    function get_domain_key(url) {
        const domain = new URL(url).hostname;
        return `visitHistory_${domain}`;
    }
    const url = window.location.href;
    const domainKey = get_domain_key(url);

    function add_history_count(domainHistory, url, title) {
        const timestamp = new Date().toISOString();
        if (!(url in domainHistory)) {
            domainHistory[url] = {
                title,
                timestamps: [],
            }
        }
        domainHistory[url].title = title;
        domainHistory[url].timestamps.push(timestamp);
    }

    let domainHistory = GM_getValue(domainKey, {});
    add_history_count(domainHistory, url, document.title);

    GM_setValue(domainKey, domainHistory);

    function search_history_count(url) {
        const domainKey = get_domain_key(url);
        let domainHistory = GM_getValue(domainKey, {});
        let current_page_count = get_history_count(domainHistory, url);
        return current_page_count;
    }

    function get_history_count(domainHistory, url) {
        if (url in domainHistory) {
            return domainHistory[url].timestamps.length;
        }
        return 0;
    }
    let current_page_count = get_history_count(domainHistory, url);

    const counter_element = createCounter(current_page_count);
    restorePosition(counter_element);
    enableDragAndDrop(counter_element);

    function check_link(link_element) {
        const url = link_element.href;
        const count = search_history_count(url);
        if (count > 0) {
            if (!("history_count" in link_element.dataset)) {
                link_element.dataset.history_count = count;
            }
            // console.log('⭐️', url, count);
        }
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (!(node instanceof HTMLElement)) return;
                let link_elements = node.querySelectorAll("a");
                link_elements.forEach((link_element) => {
                    // console.log('🔥', link_element);
                    check_link(link_element);
                });
            });
        });
    });

    observer.observe(document.body, {
        childList: true, // 子ノードの追加・削除を監視
        subtree: true // 全ての子孫ノードを監視
    });

    let link_elements = document.querySelectorAll("a");
    link_elements.forEach((link_element) => {
        console.log('🔥', link_element);
        check_link(link_element);
    });

    function timeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000); // Difference in seconds

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);

        if (days > 0) {
            return days === 1 ? "1 day ago" : `${days} days ago`;
        } else if (hours > 0) {
            return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
        } else if (minutes > 0) {
            return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
        } else {
            return diffInSeconds === 1 ? "1 second ago" : `${diffInSeconds} seconds ago`;
        }
    }

    function ranking(domainHistory) {
        const modalHTML = `
        <dialog id="rankingDialog" style="position: relative; width: 90%; padding: 20px; border: none; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);">
            <button id="closeModalButton" style="position: absolute; top: 12px; right: 12px;">❌️</button>
            <h2 style="color: #fff; text-align: center;">History</h2>
            <ul id="rankingList"></ul>
        </dialog>
    `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const rankingDialog = document.getElementById('rankingDialog');
        const showRankingButton = document.getElementById('visit-counter');
        const closeModalButton = document.getElementById('closeModalButton');
        const rankingList = document.getElementById('rankingList');

        function populateRankingList() {
            rankingList.innerHTML = '';
            for (const [key, value] of Object.entries(domainHistory).slice().reverse()) {
                const li = document.createElement("li");
                const span = document.createElement("span");

                const url = document.createElement("a");
                url.href = key;
                url.classList.add("url");
                url.textContent = key;
                // url.dataset.history_count="";

                const title = document.createElement("span");
                title.classList.add("title");
                title.textContent = value.title;

                let time_text = timeAgo(new Date(value.timestamps[0]));
                const timestamp = document.createElement("span");
                timestamp.classList.add("timestamp");
                timestamp.textContent = time_text;

                // span.appendChild(url);
                url.appendChild(title);
                url.appendChild(timestamp);
                li.appendChild(url);
                rankingList.appendChild(li);
            }
        }

        let isDragging = false;
        let startTime;
        showRankingButton.addEventListener('mousedown', (e) => {
            startTime = Date.now();
            isDragging = false;
        });

        showRankingButton.addEventListener('mouseup', () => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime > 200) {
                return;
            }
            // NOTE: click (not drag)

            populateRankingList();
            rankingDialog.showModal();
        });

        closeModalButton.addEventListener('click', () => {
            rankingDialog.close();
        });
    }
    ranking(domainHistory);
})();
