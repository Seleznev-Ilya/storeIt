"use strict";
import { HEADER } from "./constants.js";
HEADER.URL = window.location.href.slice(0, window.location.href.lastIndexOf('CodeIt') - 1);

document.querySelector('.header__menu-icon-wrapper').onclick = function () {
    document.querySelector('.header__menu-icon').classList.toggle('menu-icon-active');
    document.querySelector('.nav').classList.toggle('hide');
};

function createHeading() {
    let headingHTML = document.querySelector('.heading span');
    const url = window.location.href.split('/');
    let bСrumbsArr = url.slice(url.indexOf('CodeIt') + 1)
    let breadСrumbsb = bСrumbsArr.map(item => {
        let sought = item.indexOf('.');

        return ~sought
            ? item.slice(0, sought)
            : item;
    })
    let heading = breadСrumbsb[breadСrumbsb.length - 1];
    if (heading === Object.keys(HEADER)[0]) {
        heading = HEADER[heading];
    }
    headingHTML.innerText = heading.toUpperCase();
}
createHeading();
function createBreadСrumbs() {
    let bc = document.querySelector('.breadСrumbs');
    const url = window.location.href.split('/');
    let bСrumbsArr = url.slice(url.indexOf('CodeIt') + 1)
    let breadСrumbsb = bСrumbsArr.map(item => {
        let sought = item.indexOf('.');
        return ~sought
            ? item.slice(0, sought)
            : item;
    })
    function createBreadСrumbsLinks() {
        let breadСrumbsLinks = [];
        let bСrumbsArr = url.slice(url.indexOf('CodeIt'));
        let htmlStr = '.html';
        let breadСrumbsb = bСrumbsArr.map(item => {
            let sought = item.indexOf('.');
            return ~sought
                ? item.slice(0, sought)
                : item;
        })
        let linkBC = [];
        linkBC.push(HEADER.URL);
        let linksArr = [];

        for (let i = 0; i <= breadСrumbsb.length; i++) {
            let k = linkBC.concat(breadСrumbsb);
            k.push(k.pop() + htmlStr)
            linksArr.push(k);
            breadСrumbsb.pop();
        }

        for (let i = 0; i < linksArr.length; i++) {
            breadСrumbsLinks.unshift(linksArr[i].join('/'));
        }
        return breadСrumbsLinks;
    }
    for (let i = 0; i < breadСrumbsb.length; i++) {
        let a = document.createElement('a');
        let linkText = breadСrumbsb[i].toUpperCase();
        if (breadСrumbsb[i] === Object.keys(HEADER)[0]) {
            a.append(HEADER[breadСrumbsb[i]]);

        } else {
            a.append(linkText);
        }
        a.href = createBreadСrumbsLinks()[i];
        i == breadСrumbsb.length - 1
            ? bc.append(a)
            : bc.append(a);
    }
}
createBreadСrumbs();

function markActiveNav() {
    let nav = document.querySelector('.nav').childNodes;
    function clearActiveClass() {
        nav.forEach((item) => {
            if (item.nodeName === 'LI' && item.firstChild.nodeName === 'A') {
                item.firstChild.classList.remove('nav__active');
                // console.log(item.firstChild);
            }
        })
    }
    function getURLsLocationName() {
        const url = window.location.href.split('/');
        let active = url[url.indexOf('CodeIt') + 1]
        let sought = active.indexOf('.');
        if (~sought) {
            active = active.slice(0, sought)
        }
        return active;
    }
    function addActivClass() {
        nav.forEach((item) => {
            if (item.nodeName === 'LI' && item.firstChild.nodeName === 'A') {
                if (getURLsLocationName() === item.firstChild.className) {

                    item.firstChild.classList.add('nav__active');
                }
            }
        })
    }
    clearActiveClass();
    addActivClass();
}
markActiveNav();


