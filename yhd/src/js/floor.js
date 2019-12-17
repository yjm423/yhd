import { Tool } from './tool.js';
var tool = new Tool();
class Floor {
    constructor() {
        this.indexleft = tool.$('#indexleft');
        this.floor=tool.$('.j-floor','all');
        this.mod=tool.$('.mod','all');
        this.back=tool.$('.back');
    }
    init() {
        //事件监听 兼容
        var _this=this;
       

        //楼梯显示
        this.addEvent(window, 'scroll', function () {

            var top = document.documentElement.scrollTop;
           
            if (top > 700) {
                this.indexleft.style.position = 'fixed';
                this.indexleft.style.top = 80 + 'px';
            } else {
                this.indexleft.style.position = 'absolute';
                this.indexleft.style.top = 0;
            }

        });

        var top = document.documentElement.scrollTop;
        if (top > 700) {
            this.indexleft.style.position = 'fixed';
            this.indexleft.style.top = 80 + 'px';
        } else {
            this.indexleft.style.position = 'absolute';
            this.indexleft.style.top = 0;
        }

        //点击楼梯显示对应的楼层
        
        for(let i=0;i<this.floor.length;i++){
            
            this.floor[i].onclick=function(){
                for(var j=0;j<_this.floor.length;j++){
                    tool.removeClass(_this.floor[j],'active');
                }
                this.index=i;
                console.log(this);
                tool.addClass(this,'active');
                document.documentElement.scrollTop=_this.mod[this.index].offsetTop-60;
            };
        }

        //回到顶部
        this.back.onclick=function(){
            for(var j=0;j<_this.floor.length;j++){
                tool.removeClass(_this.floor[j],'active');
            }
            document.documentElement.scrollTop=0;
        }

        //滚动事件
        window.onscroll=function(){
            _this.scroll();
        }
       this.scroll();
        
    }
   

    // 滚动事件 
    scroll(){
        for(var i=0;i<this.floor.length;i++){
            var height=document.documentElement.scrollTop;
           
            if(this.mod[i].offsetTop>height-100){
                for(var j=0;j<this.floor.length;j++){
                    tool.removeClass(this.floor[j],'active');
                }
               tool.addClass( this.floor[i],'active');
               return false;
            }
          
        }
    }

    
    addEvent(obj, etype, fn) {//obj:元素对象  etype:事件类型   fn:事件处理函数
        if (obj.addEventListener) {//标准
            obj.addEventListener(etype, fn, false);
        } else {//IE
            obj.attachEvent('on' + etype, fn);
        }
    }
}
new Floor().init();
export { Floor }