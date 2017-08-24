import { Component, OnInit } from '@angular/core';
import { HttpModule , Http }    from '@angular/http';
import { Router }    from '@angular/router';

import { RequestService }    from '../../services/request.service';




declare var $:any;
declare var layer:any;
// declare var round:any;


@Component({
  selector: 'app-gover-wait',
  templateUrl: './gover-wait.component.html',
  styleUrls: ['./gover-info.component.css','./gover-wait.component.css']
})
export class GoverWaitComponent implements OnInit  {

  list : any ;pages : any;status : any;
  userShow : boolean;
  communityId:any;
  pid : any;

  tokenId : string;
  IP : string;


  constructor( private http: Http , private requestService : RequestService,private router : Router) { }

  ngOnInit() {

    $('#loading_con').fadeIn();

     this.userShow = sessionStorage.accountNo;
     this.communityId = sessionStorage.communityId;
     this.tokenId = sessionStorage.tokenId;

     this.pid = 8;
     // this.IP = 'http://112.124.15.205:8090';
     this.IP = this.requestService.IP;

     this.status = 0;
     let that = this;

    $('#just_js').remove();

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.id = "just_js";
    script.src = '/assets/js/new.js';     //填自己的js路径
    $('body').append(script);

    document.title='社区/政务待办';



    this.requestService.getGoverDealClass(this.communityId,this.tokenId).subscribe(res =>{
      if(res.json().code==0){
        let btnCon=res.json().target;
        for(var x=0;x<btnCon.length;x++){
          var typeCon='<div class="btn" id="'+btnCon[x].id+'"><span>'+btnCon[x].name+'</span></div>';
          $('.type').append(typeCon);}

          $('.type .btn span').on('click',function(){
               that.pages=$('table#example1 tfoot td li.active a').text();
               let businessId=$(this).parent().prop('id');
               $(this).parent().addClass('btn-info').siblings().removeClass('btn-info');
               that.requestService.getPopulationInformationByClassification(that.communityId,businessId,that.pages,that.tokenId).subscribe( res => {
                   if(res.json().code==0){
                     that.list = res.json().target.populationInformationVos;//.slice().reverse();
                     that.pages=[];//清空页码；
                     let pages_copy=res.json().target.totalPage;
                     let pages_copy1=new Array();
                     for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
                   }else if(res.json().code==3){
                     layer.msg('登录超时，请重新登录');
                     this.router.navigate(['/login']);
                   }
                });
          })

          $('.status .btn').on('click',function(){
               let businessId=$('.type .btn.btn-info').prop('id');
               let statusId=$(this).prop('id');
               if(statusId==undefined){return false;}
               $(this).addClass('btn-info').siblings().removeClass('btn-info');
               that.pages=$('table#example1 tfoot td li.active a').text();
               that.requestService.getPopulationInformationByStatus(that.communityId,businessId,statusId,that.pages,that.tokenId).subscribe( res => {
                   that.list = res.json().target.populationInformationVos;//.slice().reverse();
                   that.pages=[];//清空页码；
                   let pages_copy=res.json().target.totalPage;
                   let pages_copy1=new Array();
                   for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
                     if(res.status==200){
                       // console.log(that.pid);
                       // layer.msg('数据获取成功');
                     }else{
                       // layer.msg('数据获取错误');
                     }
                  });
          })
          // 通过分类获取和状态获取待办事项
      }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
    })
    //获取分类


    this.requestService.getPopulationInformation(this.communityId,1,this.tokenId).subscribe(res=>{
      if(res.json().code==0){
       this.pages=[];//清空页码；
        this.list = res.json().target.populationInformationVos;//.slice().reverse();
        let pages_copy=res.json().target.totalPage;
        let pages_copy1=new Array();
        for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
      }else if(res.json().code==3){
       layer.msg('登录超时，请重新登录');
       this.router.navigate(['/login']);
     }
    $('#loading_con').fadeOut();
    })
  // 获取待办事项


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

  }


   getAllClass=() => {
        this.requestService.getPopulationInformation(this.communityId,1,this.tokenId).subscribe(res=>{
          if(res.json().code==0){
           this.pages=[];//清空页码；
            this.list = res.json().target.populationInformationVos;//.slice().reverse();
            let pages_copy=res.json().target.totalPage;
            let pages_copy1=new Array();
            for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
          }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
        })
      // 获取全部待办事项
    }



    addClass=()=>{
      let that = this;
      $('.type .btn').each(function(i){
          $(this).removeClass('active-border').children('.panel-tools').remove();
      })
      $('#forBtn').text('政务告知添加分类');
      $('#myModal').modal();
        // 添加分类模态框
      $('.modal .modal-content #upload').click(function(){
        $('#myModal form input').trigger('blur');
        if($('body').attr('ver')){return false;}
          let title=$('.modal-content #title').val();
          let parId=3;
          that.requestService.addGoverDealClass(title,that.communityId,that.tokenId).subscribe(res=>{
             $('#myModal').modal('hide');
              $('#myModal input').val('');
               that.requestService.getGoverDealClass(that.communityId,that.tokenId).subscribe(res =>{
                 if(res.json().code==0){
                   let btnCon=res.json().target;
                     var typeCon='<div class="btn" id="'+btnCon[btnCon.length-1].id+'"><span>'+btnCon[btnCon.length-1].name+'</span></div>';
                     $('.type').append(typeCon);
                  }else if(res.json().code==3){
                   layer.msg('登录超时，请重新登录');
                   this.router.navigate(['/login']);
                 }
                 layer.msg('添加成功');
               })
             // 添加之后刷新页面数据
        })
      })
    }
    // 添加分类

    manageClass=($event)=>{
      let that=this;
      $('.type .btn').each(function(i){
        if(i<=0){ return}
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
      })
      // 管理分类时，添加修改和删除按钮

      $('.btn .closebox').click( function(){
        let that = this;
         let deleteId=$(this).parent().parent().prop('id');
         if($('table tbody tr').length>0){layer.msg('该分类下留有数据，不能删除');return;}
         layer.confirm('确定删除分类吗?', {icon: 3, title:'提示'}, function(index){
             layer.close(index);
             $.ajax({
               type : 'post',
               url : that.IP+'/web/deleteMatter',
               data : {
                  matterId : deleteId,
               },
               success : function(data){
                 if(data.code==0){
                   let dele = '#'+deleteId;
                   $(dele).remove();
                 }else if(data.code==3){
                   layer.msg('登录超时，请重新登录');
                   this.router.navigate(['/login']);
                 }
               }
             })
             layer.msg('操作成功');
           },function(index){
             layer.close(index);
             // layer.msg('操作取消');
         })
         // 自动平移补位，功能效果待补全;
       })
      // 删除分类（在each中循环click事件会使节点遍历更加复杂）

      $('.btn .editbox').click( function(){
        $('#myModal form input').trigger('blur');
        if($('body').attr('ver')){return false;}

          $('#myModal #forBtn').text('修改分类');
          let len=$(this).parent().parent().children('span').text();
         $('.modal-content #title').val(len);
          $('#myModal').modal();
         let changeId=$(this).parent().parent().prop('id');
         $('.modal .modal-content #upload').off('click').on('click',function(){
           let typeName=$('.modal-content #title').val();
             $.ajax({
               type : 'post',
               url : that.IP+'/web/updateMatter',
               data : {
                  matterId : changeId,
                  name : typeName,
                  tokenId : that.tokenId
               },
               success : function(data){
                 if(data.code==0){
                   $('#myModal').modal('hide');
                   $('#myModal input').val('');
                   let change = '#'+changeId;
                   $(change).children('span').text(typeName);
                   return;
                 }else if(data.code==3){
                   layer.msg('登录超时，请重新登录');
                   this.router.navigate(['/login']);
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


    deletePop=($event)=>{
      let that = this;
      let popId=$($event.target).prop('id');/*
      let businessId=$('.hpanel .type .btn.btn-info span').prop('id');
      let statusId=$('.hpanel .status  .btn.btn-info').prop('id');
      let pageId = $('.pagination li.active a').prop('id');*/
      layer.confirm('确定删除该待办事项吗?', {icon: 3, title:'提示'}, function(index){
            layer.close(index);
           that.requestService.deletePopulationInformation(popId,that.tokenId).subscribe(res=>{
               if(res.json().code==0){
                 $($event.target).parent().parent().remove();
                // 删除成功后，在htmlDOM中移除元素
               }else if(res.json().code==3){
               layer.msg('登录超时，请重新登录');
               this.router.navigate(['/login']);
             }
              layer.msg(res.json().text);
           })
          },function(index){
            layer.close(index);
            layer.msg('操作取消');
          })
    }
    //删除文章



    morePopInfo=($event)=>{
      $('#myModal-morePopInfo').modal();
      this.requestService.getSimplePopulationInformation(this.communityId,$event.target.id,this.tokenId).subscribe(res=>{
        if(res.json().code==0){
         $('#myModal-morePopInfo #name').text(res.json().target.name);
         if(res.json().target.sex==0){
           $('#myModal-morePopInfo #sex').text('女');
         }else{
           $('#myModal-morePopInfo #sex').text('男');
         }
         $('#myModal-morePopInfo #nation').text(res.json().target.nation);
         $('#myModal-morePopInfo #birthday').text(res.json().target.birthday);
         $('#myModal-morePopInfo #cardNumber').text(res.json().target.cardNumber);
         $('#myModal-morePopInfo #office').text(res.json().target.office);
         $('#myModal-morePopInfo #permanentAddress').text(res.json().target.permanentAddress);
         $('#myModal-morePopInfo #address').text(res.json().target.address);
         $('#myModal-morePopInfo #phoneNumber').text(res.json().target.phoneNumber);
         if(res.json().target.application==0){
           $('#myModal-morePopInfo #application').text('常住');
         }else{
           $('#myModal-morePopInfo #application').text('租住');
         }
         $('#myModal-morePopInfo #before img').prop('src',res.json().target.cardBeforePhotoUrl);
         $('#myModal-morePopInfo #back img').prop('src',res.json().target.cardBackPhotoUrl);
        }else if(res.json().code==3){
          layer.msg('登录超时，请重新登录');
          this.router.navigate(['/login']);
        }
      })
    }
    // 查看待办事项详情

    checkedPop=($event)=>{
      let status=($event.target.title==0)?1:0;
      let pageId =$('table#example1 tfoot td li.active a').text();
      // console.log(this.status);
      this.requestService.updateStatus($event.target.id,status,this.tokenId).subscribe(res=>{
        // data.status =
        if(res.json().code==0){
          this.requestService.getPopulationInformation(this.communityId,pageId,this.tokenId).subscribe(res=>{
             this.pages=[];//清空页码；
              this.list = res.json().target.populationInformationVos;//.slice().reverse();
              let pages_copy=res.json().target.totalPage;
              let pages_copy1=new Array();
              for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
          })
        }else if(res.json().code==3){
          layer.msg('登录超时，请重新登录');
          this.router.navigate(['/login']);
          return;
        }
        layer.msg(res.json().text);
      })
    }
    // 修改申请状态

    waitChecked=($event)=>{}


    changePage=($event)=>{
      let pageId=$($event.target).text();
       $($event.target).parent().addClass('active').siblings().removeClass('active');
        this.requestService.getPopulationInformation(this.communityId,pageId,this.tokenId).subscribe( res=>{
          if(res.json().code==0){
            this.list = res.json().target.populationInformationVos;//.slice().reverse();
            this.pages=[];//清空页码;
            let pages_copy=res.json().target.totalPage;
            let pages_copy1=new Array();
            for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
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
       $($event.target).parent().parent().children().eq(2).addClass('active').siblings().removeClass('active');
       // $($event.target).prop('disabled',true).nextSibling().prop('disabled',true);
       this.requestService.getPopulationInformation(this.communityId,1,that.tokenId).subscribe( res=>{
         if(res.json().code==0){
          this.pages=[];
          this.list = res.json().target.populationInformationVos;//.slice().reverse();
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
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
        $('.pagination li').eq(pageId+1).addClass('active').siblings().removeClass('active');
         that.requestService.getPopulationInformation(this.communityId,pageId,that.tokenId).subscribe( res=>{
           if(res.json().code==0){
             that.pages=[];
             that.list = res.json().target.populationInformationVos;//.slice().reverse();
              let pages_copy=res.json().target.totalPage;
              for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
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
            $('.pagination li').eq(pageId+1).addClass('active').siblings().removeClass('active');
             that.requestService.getPopulationInformation(this.communityId,pageId,that.tokenId).subscribe( res=>{
                if(res.json().code==0){
                 that.pages=[];
                 that.list = res.json().target.populationInformationVos;//.slice().reverse();
                  let pages_copy=res.json().target.totalPage;
                  for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
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
       $($event.target).parent().parent().children().eq(len+1).addClass('active').siblings().removeClass('active');
       this.requestService.getPopulationInformation(this.communityId,len,that.tokenId).subscribe( res=>{
          if(res.json().code==0){
            this.pages=[];
            this.list = res.json().target.populationInformationVos;//.slice().reverse();
            let pages_copy=res.json().target.totalPage;
            for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
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
