require.config({
    paths:{
        jquery:'./jquery',
        cookie:"https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min",
        details:'./details'
    }
    
});

require(['jquery','details'],function($,details){
    details.render();
    details.amplify();
    details.tabSwitch();
    details.addgood();

});