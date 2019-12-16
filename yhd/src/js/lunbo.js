class Lunbo {
    constructor() {
        this.oli = document.querySelectorAll('.tab_ol li');
        this.imgli = document.querySelectorAll('.lunbo_li');
    }
    init() {
        let _this = this;
        var timer;
        for (let i = 0; i < this.oli.length; i++) {
            this.oli[i].onmouseover = function () {
                clearInterval(timer);
                _this.index = i;
                for (let j = 0; j < _this.oli.length; j++) {
                    _this.oli[j].className = '';
                    _this.imgli[j].style.opacity = 0;
                }
                
                this.className = 'cur';

                //对象索引的图片显示 
                _this.imgli[i].style.opacity = 1;
            }
            //设置自动跳转
            this.oli[i].onmouseout = function () {               
                timer = setInterval(function () {
                   _this.tab();
                }, 2000);
            }        
        }

        this.index=0;
        timer = setInterval(function () {
            _this.tab();
        }, 2000);


    }

    tab(){
        ++this.index;
        if(this.index>=4){
            this.index=0;
        }
        for (let j = 0; j < this.oli.length; j++) {
            this.oli[j].className = '';
            this.imgli[j].style.opacity = 0;
        }
        this.oli[this.index].className = 'cur';
        this.imgli[this.index].style.opacity = 1;
    }


}

export { Lunbo }