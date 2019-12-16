// require.config({
//     paths:{
//         jquery:'./lib/jquery',
//         indexRender:'./index',
//         lazyload:'./lib/jquery.lazyload'
//     }
    
// });

// require(['jquery','indexRender'],function($,index){
//     require(['lazyload'],function(){
//         index.render();
//     })
//     index.tab();
//     index.ranktab();

// });

import{render} from './indexrender.js'
import{Lunbo} from './lunbo.js'
import{tab} from './tab.js'

new Lunbo().init();
export{render ,Lunbo,tab}