/**
 * 顶部悬浮效果
 * 二维码粘性定位
 */
import {Tool} from './tool.js';
var tool=new Tool();
class Float{
    constructor(){
        this.topsearch=tool.$('.hd_search_form');
        this.erweima=tool.$('.happy_summer');
    }
    init(){
        let _this=this;
        function addEvent(obj,etype,fn){//obj:元素对象  etype:事件类型   fn:事件处理函数
            if(obj.addEventListener){//标准
                obj.addEventListener(etype,fn,false);
            }else{//IE
                obj.attachEvent('on'+etype,fn);
            }  
        }

        addEvent(window,'scroll',function(){
            
            var top=document.documentElement.scrollTop;
            // 顶部悬浮
            if(top>800){
                tool.bufferMove(_this.topsearch,{top:-0});

            }else{
                tool.bufferMove(_this.topsearch,{top:-60});
                // _this.topsearch.style.top=-60+'px';
            }

            // 二维码定位
            if(top>620){
                _this.erweima.style.position='fixed';
                _this.erweima.style.top=156+'px';
            }else{
                _this.erweima.style.position='absolute';
                _this.erweima.style.top=0;
            }
            
        });
        
      
        var top=document.documentElement.scrollTop;
        if(top>620){
            _this.erweima.style.position='fixed';
            _this.erweima.style.top=156+'px';
        }else{
            _this.erweima.style.position='absolute';
            _this.erweima.style.top=0;
          
        }
    }
}
new Float().init();
export {Float}
