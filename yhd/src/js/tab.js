import {Tool} from './tool.js';
var tool=new Tool();
function tab() {
   

    const left=tool.$('.arr_l','all');
    const right=tool.$('.arr_r','all');
    let l = 0;
    var num = 0;

    for (let i = 0; i < right.length; i++) {
       
        right[i].onclick = function () {
            
            num=this.parentNode.num;
            if (num < 2) {
                
                l = l - 210;
                var rank_wrap = this.parentNode.children[3].children[0];
                tool.bufferMove(rank_wrap, { left: l });
                num++;
            } else {
                num = 2;
            }
            
        }

        left[i].onclick = function () {
          
            num=this.parentNode.num;
            if (num >0) {
                l = l + 210;
                var rank_wrap = this.parentNode.children[3].children[0];
                tool.bufferMove(rank_wrap, { left: l });
                num--;
            } else {
                num = 0;
            }
            this.parentNode.num=num;
        }

    }


}
tab();
export { tab }





