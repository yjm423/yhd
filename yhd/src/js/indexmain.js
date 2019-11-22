require.config({
    paths:{
        jquery:'./lib/jquery',
        indexRender:'./index',
        lazyload:'./lib/jquery.lazyload'
    }
    
});

require(['jquery','indexRender'],function($,index){
    require(['lazyload'],function(){
        index.render();
    })
    index.tab();
    index.ranktab();

});