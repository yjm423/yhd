import {Tool } from './tool.js';
var tool = new Tool();
class Floor {
    constructor() {
        this.indexleft = tool.$('#indexleft');
    }
    init() {
        var top = document.documentElement.scrollTop;
        // if (top > 620) {
        //     this.indexleft.style.position = 'fixed';
        //     this.indexleft.style.top = 156 + 'px';
        // } else {
        //     this.indexleft.style.position = 'absolute';
        //     this.indexleft.style.top = 0;
        // }
        // window.onscroll = function () {
        //     if (top > 620) {
        //         this.indexleft.style.position = 'fixed';
        //         this.indexleft.style.top = 156 + 'px';
        //     } else {
        //         this.indexleft.style.position = 'absolute';
        //         this.indexleft.style.top = 0;
        //     }
        // }
    }
}
new Floor().init();
export {Floor}