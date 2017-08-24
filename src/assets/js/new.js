layui.use(['layer', 'form'], function(){
  var layer = layui.layer
  ,form = layui.form();
});
// 初始化layer;


/*$('body').on('click', function (e) {
 $('.modal-dialog').each(function(){
    num=$(this).height()/$('body').height();
    percent= num*100+'%';
    console.log(num+','+percent+','+$(this).height()+','+$('body').height());
   if($(this).height()<$('body').height()){
    num=$(this).height()/$('body').height();
    percent= num*100+'%';
    $(this).css('marginTop',percent);
   }else{
    $(this).css('marginTop',0);
   }
  })
})*/


    function change_win(){
      var percent=(180/$('body').width() )*100;
       if($('body').width()<=768){
         if( !$('#menu').hasClass('scroll') ){
            $('#menu').addClass('scroll');
            $('#wrapper').addClass('scroll');
            $('#wrapper').css('width',(100-percent)+'%');
          }else {
            $('#menu').removeClass('scroll');
            $('#wrapper').removeClass('scroll');
            $('#wrapper').css('width',(100+percent)+'%');
          }
        }else{
          if( !$('#menu').hasClass('noScroll') ){
            $('#menu').addClass('noScroll');
            $('#wrapper').addClass('noScroll');
            $('#wrapper').css('width',(100+percent)+'%');
          }else {
            $('#menu').removeClass('noScroll');
            $('#wrapper').removeClass('noScroll');
            $('#wrapper').css('width',(100-percent)+'%');
          }
        }
    }
    // 定义横滑动画

    $('.header-link.hide-menu').click(
      function(){
        change_win();
    })
    // 点击触发

    window.onresize= ()=>{
      var percent=(180/$('body').width() )*100;
        // console.log(percent);
       if($('body').width()<=768){
         if( !$('#menu').hasClass('scroll') ){
            $('#wrapper').css('width',(100)+'%');
          }else {
            $('#wrapper').css('width',(100-percent)+'%');
          }
          // console.log(100-percent,$('body').css('width'));
        }else{
          if( !$('#menu').hasClass('noScroll') ){
            $('#wrapper').css('width',(100-percent)+'%');
          }else {
            $('#wrapper').css('width',(100)+'%');
          }
        }
    }
    // 菜单横滑之后缩放屏幕，使内容页宽度自适应；


    $('#menu-user ul').height($('#wrapper').height());
    $('#wrapper .user-con .panel').height($('#wrapper').height()-$('#wrapper .row .row:eq(0)').height()+26);



