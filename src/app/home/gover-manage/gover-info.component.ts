// import "layui.js";
import { Component, OnInit  ,OnChanges } from '@angular/core';
import { HttpModule , Http }    from '@angular/http';
import { Router }  from '@angular/router';
import { ActivatedRoute }    from '@angular/router';

import { RequestService }    from '../../services/request.service';




declare var $:any;
declare var layer:any;
// declare var round:any;

@Component({
  selector: 'app-gover-info',
  templateUrl: './gover-info.component.html',
  styleUrls: ['./gover-info.component.css']
})
export class GoverInfoComponent implements OnInit ,OnChanges {

  userShow : any;
  communityId : any;
  tokenId : string;

  pid : any;name : string;
  list: any;
  list1: any;
  pages: any;
  deletePublishId: number;
  picUrl : string;

  IP : string;

  upLoadImg : any;

  three : any;four : any;five : any;six : any;

  constructor( private http: Http ,private requestService : RequestService, private router:Router, private activatedRoute:ActivatedRoute) { }


  ngOnChanges(){}
  ngOnInit() {

    $('#loading_con').fadeIn();

    this.userShow = sessionStorage.accountNo;
    this.communityId = sessionStorage.communityId;
    this.tokenId = sessionStorage.tokenId;

    this.pages = new Array();
    // this.IP = 'http://112.124.15.205:8090';
    this.IP = this.requestService.IP;


    let that = this;

    $('#just_js').remove();

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.id = "just_js";
    script.src = '/assets/js/new.js';

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.src = 'assets/plug/btsp-fileinput/js/fileinput.min.js';     //填自己的js路径
    $('body').append(script);

    this.activatedRoute.params.subscribe(params => {
      if( params.id ){
        this.pid =  params.id;
        // this.name =  params.name;
      }
    })

    this.requestService.getParentClassification(this.tokenId).subscribe(res=>{
      if(res.json().code==0){
        for (var i = 0; i <res.json().target.length; i++) {
          if(res.json().target[i].id==this.pid){
            this.name=res.json().target[i].name;
             document.title='社区/'+this.name;
          }
        }
      }else if(res.json().code==3){
       layer.msg('登录超时，请重新登录');
       that.router.navigate(['/login']);
      }
    })

    $('form input').blur(function(){
       var $parent = $(this).parent();
       if( $(this).is('#title') ){
          if( this.value==""){
            $(this).siblings('.showRed').text('显示名称不能为空');
            $(this).parent().addClass('has-error');
            $('#upload').prop('disabled',true);
            $('body').attr('ver',1);
          }else{
            $(this).siblings('.showRed').text('');
            $(this).parent().removeClass('has-error');
            $('#upload').prop('disabled',false);
            $('body').attr('ver','');
          }
       }
       //验证标题
    }).keyup(function(){
       $(this).triggerHandler("blur");
    }).focus(function(){
         $(this).triggerHandler("blur");
    }).change(function(){
         $(this).triggerHandler("blur");
    });

     this.requestService.getPublishByClassification(this.communityId,this.pid,'','',this.tokenId).subscribe( res => {
       if(res.json().code==0){
        this.pages=[];//清空页码;
        this.list=res.json().target.beanList;//.slice().reverse();
        let pages_copy=res.json().target.totalPage;
        let pages_copy1=new Array();
        for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
        $('#loading_con').fadeOut();
      }
    },err=> {
      console.log(err.type);
     if(err.type==3){
       layer.msg('登录超时，请重新登录');
       that.router.navigate(['/login']);
     }
    });
    // 获取全部文章内容

    $.ajax({
     type : 'get',
     url : that.IP+'/web/getClassification',
     data : {
       pid : that.pid,
       communityId : that.communityId,
       tokenId : that.tokenId
     },
     success:function(data){
       // console.log(data.code);
       if(data.code==0){
        var btnCon=data.target;
          // console.log(btnCon);
        var color=['btn'];
        for(var x=0;x<btnCon.length;x++){
          var typeCon='<div class="btn" id="'+btnCon[x].id+'"><span>'+btnCon[x].name+'</span></div>';
          $('.type').append(typeCon);
        }
        $('.type .btn span').click(function(){
           $('#loading_con').fadeIn();
           let partId=$(this).parent().prop('id');
           $(this).parent().addClass('btn-info').siblings().removeClass('btn-info');
           let page='';
            $('table#example1 tfoot td li').each(function(){
              if($(this).hasClass('active')){
              page=$(this).children().text();
              }
            })
           that.requestService.getPublishByClassification(that.communityId,that.pid,page,partId,that.tokenId).subscribe( res => {
             if(res.json().code==0){
               that.list = res.json().target.beanList;//.slice().reverse();
               that.pages=[];//清空页码；
               let pages_copy=res.json().target.totalPage;
               let pages_copy1=new Array();
               for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
              }else if(res.json().code==3){
               layer.msg('登录超时，请重新登录');
               that.router.navigate(['/login']);
              }
               $('#loading_con').fadeOut();
            });
        })
      // 通过分类获取文章
      // 避免函数内调用angular的this时与jQuery混杂
      }else if(data.code==3){
       layer.msg('登录超时，请重新登录');
       that.router.navigate(['/login']);
      }
    }
  })//获取分类



    that.upLoadImg=()=>{
     let that = this;
     var formData = new FormData();
     var name = $("#myModal #icon").val();
     formData.append("file",$("#myModal #icon")[0].files[0]);
     formData.append("name",name);
     $.ajax({
       url : that.IP+'/upload.do',
       type : 'POST',
       async : false,
       data : formData,
       processData : false,
       contentType : false,
       beforeSend:function(){
       // console.log("正在进行，请稍候");
      },
       success : function(data) {
         if(data.code==0){
           that.picUrl = data.target.src;
         }else if(data.code==3){
           layer.msg('登录超时，请重新登录');
           that.router.navigate(['/login']);
         }
         // layer.msg(data.text);
       },
         error : function(data) {
         layer.msg('网络错误');
       }
     })
    }
     // 发布图片

  }


    addClass=($event)=>{
      let that=this;
      $('.type .btn').each(function(i){
          $(this).removeClass('active-border').children('.panel-tools').remove();
      })
      $('#forBtn') .text('添加分类');
      $('#myModal').modal();
      // 添加分类模态框
      $('.modal .modal-content #upload').click(function(){
        let title=$('#myModal .modal-content #title').val();
        $('#myModal form input').trigger('blur');
        if($('body').attr('ver')){return false;}
        that.upLoadImg();
        console.log(that.picUrl);
        $.ajax({
          type : "post",
          url : that.IP+"/web/addClassification",
          data : {
            pid : this.pid,
            name : title,
            communityId : that.communityId,
            picUrl : that.picUrl,
            tokenId : that.tokenId
          },
          dataType : "json",
          success:function(data){
            $('#myModal').modal('hide');
            $('#myModal input').val('');
            // 添加成功隐藏模态框
            $.ajax({
              type : 'get',
              url : that.IP+'/web/getClassification',
              data : {
                pid : that.pid,
                communityId : that.communityId,
                tokenId : that.tokenId
              },
              success:function(data){
                // console.log(this.communityId);
                var btnCon=data.target;
                var typeCon='<div class="btn" id="'+btnCon[btnCon.length-1].id+'"><span>'+btnCon[btnCon.length-1].name+'</span></div>';
                $('.type').append(typeCon);
                }
              })
            // 生成分类目录
          }
        })
    // 添加分类
      })
    }



    manageClass=($event)=>{
      let that = this;
      $('.type .btn').each(function(i){
        if(i>0){
          let has=$(this).children().is($('.panel-tools'));//判断是否包含关闭按钮
          if(!has){
            $(this).addClass('active-border');
            $(this).prepend('<div class="panel-tools"><a href="javascript:void(0);" class="editbox"><i class="fa fa-edit"></i></a><a href="javascript:void(0);" class="closebox"><i class="fa fa-times"></i></a></div>');
            // console.log($(this).children().html());
          }
          else{
             $(this).removeClass('active-border');
            $(this).children('.panel-tools').remove();
            // console.log($(this).children().html());
          }
        }
      })
      // 管理分类时，添加修改和删除按钮

      $('.btn .closebox').click( function(){
         let deleteId=$(this).parent().parent().prop('id');
         if($('table tbody tr').length>0){layer.msg('该分类下留有数据，不能删除');return;}
         layer.confirm('确定删除分类吗?', {icon: 3, title:'提示'}, function(index){
             $.ajax({
               type : 'post',
               url : that.IP+'/web/deleteClassification',
               data : {
                  businessId : deleteId,
                  tokenId : that.tokenId
               },
               success : function(data){
             // item.parentsUntil('.type').fadeOut(1000).delay(4000).remove();
              if(data.code==0){
                 let dele = '#'+deleteId;
                  $(dele).remove();
              }else if(data.code==3){
               layer.msg('登录超时，请重新登录');
               that.router.navigate(['/login']);
             }
                 layer.msg(data.text);
                 layer.close(index);
               }
             })
           },function(index){
             layer.close(index);
             layer.msg('操作取消');
         })
         // 自动平移补位，功能效果待补全;
       })
      // 删除分类（在each中循环click事件会使节点遍历更加复杂）

      $('.btn .editbox').click( function(){
        let len=$(this).parent().parent().children('span').text();
         $('.modal-content #title').val(len);
         let changeId=$(this).parent().parent().prop('id');
         $('#myModal').modal();
          $('#myModal .modal-content input').focus().select();
         $('.modal .modal-content #upload').off('click').on('click',function(){

          $('#myModal form input').trigger('blur');
          if($('body').attr('ver')){return false;}

           let typeName=$('.modal-content #title').val();
             $.ajax({
               type : 'post',
               url : that.IP+'/web/updateClassification',
               data : {
                  businessId : changeId,
                  name : typeName,
                  tokenId : that.tokenId
               },
               success : function(data){
                 if(data.code==0){
                   $('#myModal').modal('hide');
                   $('#myModal input').val('');
                   let change = '#'+changeId;
                   $(change).children('span').text(typeName);
                   layer.msg('修改成功');
                   return;
                 }else if(data.code==3){
                   layer.msg('登录超时，请重新登录');
                   that.router.navigate(['/login']);
                 }
               },erro:function(){
                 layer.msg('修改出错');
               }
             })
          })
        })
      //修改分类名字
    }
    // 分类管理



     deleteArctic=($event)=>{
        let deleteArcticId=$($event.target).parent().parent().prop('id');
        let cancel='';let that = this;
        let pageId = $('.pagination li.active a').prop('id');
        let businessId=$('.hpanel .type .btn.btn-info span').prop('id');
        console.log(businessId+','+pageId)
       layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
            layer.close(index);
           $.ajax({
            type : 'post',
            url : that.IP+"/web/deletePublish",
            data : {
              publishId: deleteArcticId,
              tokenId : that.tokenId
            },
            success:function(data){
              if(data.code==0){
                that.requestService.getPublishByClassification(that.communityId,that.pid,pageId,businessId,that.tokenId).subscribe( res => {
                  that.pages=[];//清空页码；
                  that.list=res.json().target.beanList;//.slice().reverse();
                  let pages_copy=res.json().target.totalPage;
                  let pages_copy1=new Array();
                  for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
                });
                // 删除过后刷新文章内容
              }else if(data.code==3){
               layer.msg('登录超时，请重新登录');
               that.router.navigate(['/login']);
             }
              layer.msg(data.text);
            }
           })
          },function(index){
            layer.close(index);
            layer.msg('操作取消');
          })
     }
      //删除文章

    moreArcticInfo=($event)=>{
       let ArcticId=$($event.target).parent().parent().prop('id');
       // console.log(ArcticId);
       this.router.navigate(['/info',ArcticId]);
     }
    //查看文章详情


    changePage=($event)=>{
      $('#loading_con').fadeIn();
      let pageId=$($event.target).text();
       $($event.target).parent().addClass('active').siblings().removeClass('active');
        this.requestService.getPublishByClassification(this.communityId,this.pid,pageId,'',this.tokenId).subscribe( res=>{
          if(res.json().code==0){
            this.list = res.json().target.beanList;//.slice().reverse();
            this.pages=[];//清空页码;
            let pages_copy=res.json().target.totalPage;
            let pages_copy1=new Array();
            for(let i=0;i<pages_copy;i++){this.pages.push(i+1);
            $('#loading_con').fadeOut();}
          }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
        // console.log( this.list );
      })
    }
    // 分页更改显示内容

    firstPage=($event)=>{
      let that = this;
      this.pid = $('#partName').attr('depart-id');
      if($($event.target).parent().parent().children().eq(2).hasClass('active')){
        layer.msg('当前已经是第一页！');return;
      }
      $('#loading_con').fadeIn();
       $($event.target).parent().parent().children().eq(2).addClass('active').siblings().removeClass('active');
       // $($event.target).prop('disabled',true).nextSibling().prop('disabled',true);
       this.requestService.getPublishByClassification(this.communityId,this.pid,1,'',that.tokenId).subscribe( res=>{
         if(res.json().code==0){
          this.pages=[];
          this.list = res.json().target.beanList;//.slice().reverse();
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);
          $('#loading_con').fadeOut();}
        }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
      })
    }
    // 第一页

    prevPage=($event)=>{
      let pageId=0;let that=this;
      $('.pagination li').each(function(i){//console.log(i);
        if($(this).hasClass('active')){
           pageId=i-2;return;//console.log(i);
         }
      })
      if(pageId>0){
        $('#loading_con').fadeIn();
        $('.pagination li').eq(pageId+1).addClass('active').siblings().removeClass('active');
         that.requestService.getPublishByClassification(this.communityId,this.pid,pageId,'',that.tokenId).subscribe( res=>{
           if(res.json().code==0){
             that.pages=[];
             that.list = res.json().target.beanList;//.slice().reverse();
              let pages_copy=res.json().target.totalPage;
              for(let i=0;i<pages_copy;i++){that.pages.push(i+1);
             $('#loading_con').fadeOut();}
            }else if(res.json().code==3){
             layer.msg('登录超时，请重新登录');
             this.router.navigate(['/login']);
           }
          })
        }else{layer.msg('当前已经是第一页！');}
    }
    // 上一页

    nextPage=($event)=>{
      let pageId=0;let that=this;let len=$('.pagination li').length-4;
      $('.pagination li').each(function(i){
        if($(this).hasClass('active')){
          pageId=i;return;//console.log(i);
        }
       })
       if(pageId<=len){
            $('#loading_con').fadeIn();
            $('.pagination li').eq(pageId+1).addClass('active').siblings().removeClass('active');
             that.requestService.getPublishByClassification(this.communityId,this.pid,pageId,'',that.tokenId).subscribe( res=>{
                if(res.json().code==0){
                 that.pages=[];
                 that.list = res.json().target.beanList;//.slice().reverse();
                  let pages_copy=res.json().target.totalPage;
                  for(let i=0;i<pages_copy;i++){that.pages.push(i+1);
                 $('#loading_con').fadeOut();}
                }else if(res.json().code==3){
                 layer.msg('登录超时，请重新登录');
                 this.router.navigate(['/login']);
               }
              })
            }else{layer.msg('当前已经是最后一页！');}
    }
    //下一页

    lastPage=($event)=>{
      let pageId=0;let that=this;let len=$('.pagination li').length-4;
      if($($event.target).parent().parent().children().eq(len+1).hasClass('active')){
        layer.msg('当前已经是最后一页！');return;
      }
      $('#loading_con').fadeIn();
       $($event.target).parent().parent().children().eq(len+1).addClass('active').siblings().removeClass('active');
       this.requestService.getPublishByClassification(this.communityId,this.pid,len,'',that.tokenId).subscribe( res=>{
          if(res.json().code==0){
            this.pages=[];
            this.list = res.json().target.beanList;//.slice().reverse();
            let pages_copy=res.json().target.totalPage;
            for(let i=0;i<pages_copy;i++){this.pages.push(i+1);
            $('#loading_con').fadeOut();}
          }else if(res.json().code==3){
             layer.msg('登录超时，请重新登录');
             this.router.navigate(['/login']);
           }
      })
    }
    //最后一页

    shouldHide=()=> {
      $('input').val('');
    }





}

