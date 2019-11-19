require.config({
    paths:{
        jquery:'./jquery',
        indexRender:'./indexRender',
        lazyload:'./jquery.lazyload'
    }
    
});

require(['jquery','indexRender'],function($,index){
    require(['lazyload'],function(){
        index.render();
    })
    index.tab();
    

});