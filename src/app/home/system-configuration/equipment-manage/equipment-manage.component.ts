import { Component, OnInit } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { Router } from '@angular/router';

import { RequestService } from '../../../services/request.service';

declare var $: any;
declare var layer: any;

@Component({
  selector: 'app-equipment-manage',
  templateUrl: './equipment-manage.component.html',
  styleUrls: ['./equipment-manage.component.css']
})
export class EquipmentManageComponent implements OnInit {
   // equipments : any;
   showLists : any;
   equipments : any;
   departmentsTwo : any;
   departmentsThree : any;
   departmentsFive : any;
   pages : any;

   communityId : any;
   userShow : any;

   tokenId : string;
   IP : string;

   shouldHide : any;
   formVer : any;



  constructor(private http:Http,private requestService:RequestService,private router:Router) {
    }


  ngOnInit() {

    $('#loading_con').fadeIn();
    document.title='社区/设备管理';

    this.communityId = sessionStorage.communityId;
    this.userShow = sessionStorage.accountNo;
    this.tokenId = sessionStorage.tokenId;

    // this.IP = 'http://112.124.15.205:8090';
     this.IP = this.requestService.IP;

    this.pages =new Array();
    let that=this;

    this.requestService.getAllDevice(this.communityId,1,this.tokenId).subscribe( res=>{
      if(res.json().target==""){layer.msg('该部门设备无数据');return;}
        if(res.json().code==0){
        this.equipments = res.json().target.devices;//.slice().reverse();
        // console.log(this.equipments);
        let pages_copy=res.json().target.totalPage;
        for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
      }else if(res.json().code==3){
       layer.msg('登录超时，请重新登录');
       this.router.navigate(['/login']);
     }
    $('#loading_con').fadeOut();
    // console.log(this.pages);
    })
    // 获取设备

    $('#just_js').remove();

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.src = "assets/js/new.js";
    script.id = "just_js";
    $('body').append(script);


    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.src = 'assets/js/new.js';     //填自己的js路径
    $('body').append(script);



    $('table#example1 #all').click(function(){
      $('table#example1 tbody input[type="checkbox"]').each(function(){
       console.log($(this).prop('checked'));
       if($('table#example1 #all').prop('checked')){
         $(this).prop('checked',true);
         $('table#example1 #all').parent().find('span').text('全不选');
       }else{
         $(this).prop('checked',false);
         $('table#example1 #all').parent().find('span').text('全选');
       }
     })
    }),// 全选与全不选

    $('table#example1').change(function(){
      var i=0;
      $('table#example1 tbody input[type="checkbox"]').each(function(){
       if(!$(this).prop('checked')){
         // console.log($(this).parent().parent().html());
         i++;
       }
      })
      if(i>0){
       $('table#example1 #all').parent().find('span').text('全不选');
       $('table#example1 #all').prop('checked',false);}else{
         $('table#example1 #all').parent().find('span').text('全选');
         $('table#example1 #all').prop('checked',true);}
    })

    $('table#example1 #other').click(function(){
    // $('table#example1 #all').prop('checked',false);
    $('table#example1 tbody input[type="checkbox"]').each(function(){
      console.log($(this).prop("checked"));
       if($(this).prop('checked')){
         $(this).prop('checked',false);
       }else{
         $(this).prop('checked',true);
       }
    })
    })//表格操作 反选

    this.shouldHide=() => {
      $('#myModal-moreEquipmentInfo .glyphicon-edit.text-danger').removeClass('glyphicon-edit text-danger').addClass('glyphicon-pencil');
         $('#myModal-moreEquipmentInfo #cancel').text('确定').addClass('btn-primary').removeClass('btn-danger');
        $('#myModal-moreEquipmentInfo #upload').addClass('hide').fadeOut();
        $('#myModal-moreEquipmentInfo input').each(function(){$(this).prop('disabled',true);})
        $('input').val('');
        $('input').siblings('.showRed').text('').addClass('showRed');
        $('input').parent().removeClass('has-error');
        $('div #upload').prop('disabled',false);
    }

      window.onload=function(){
        $('.side-user li').each(function(){
          var icon='<span class="fa fa-folder"></span>';
            // console.log($(this).find('ul').css('display')+','+$(this).find('span').is('.fa'));
          // $(this).find('li').height(0);
          if($(this).find('ul').css('display')!=undefined&&$(this).find('span').is('.fa')==false){
             $(this).children('a').prepend(icon);
          }
          else{
            $(this).children('a .fa.fa-icon').remove();
          }
        })
      }

      $('form input').blur(function(){
          var $parent = $(this).parent();
          //验证设备码
          if( $(this).is('#equipmentSN') ){
             if( this.value=="" || this.value.length < 2 ){
               $(this).siblings('.showRed').text('设备码不能为空');
               $(this).parent().addClass('has-error');
               $('div #upload').prop('disabled',true);
               $('body').attr('ver',1);
             }else{
               $(this).siblings('.showRed').text('').addClass('showRed');
               $(this).parent().removeClass('has-error');
               $('div #upload').prop('disabled',false);
               $('body').attr('ver','');
             }
          }
          //验证设备名
          if( $(this).is('#equipmentName') ){
            if( this.value=="" ){
               $(this).siblings('.showRed').text('设备名不能为空');
               $(this).parent().addClass('has-error');
               $('div #upload').prop('disabled',true);
               $('body').attr('ver',1);
             }else{
               $(this).siblings('.showRed').text('').addClass('showRed');
               $(this).parent().removeClass('has-error');
               $('div #upload').prop('disabled',false);
               $('body').attr('ver','');
             }
          }
           //验证设备地址
          if( $(this).is('#equipmentAddress') ){
             if( this.value==""){
               $(this).siblings('.showRed').text('放置地址不能为空');
               $(this).parent().addClass('has-error');
               $('div #upload').prop('disabled',true);
               $('body').attr('ver',1);
             }else{
               $(this).siblings('.showRed').text('').addClass('showRed');
               $(this).parent().removeClass('has-error');
               $('div #upload').prop('disabled',false);
               $('body').attr('ver','');
             }
          }
      }).keyup(function(){
         $(this).triggerHandler("blur");
      }).focus(function(){
           $(this).triggerHandler("blur");
      }).change(function(){
           $(this).triggerHandler("blur");
      });



  }

    newEquipment=($event)=>{
      let len=$event.target.text;
      let that=this;
      $('#myModal-Equipment #forBtn').text(len);
      $('#myModal-Equipment').modal();
      // console.log($(this).prop('id'));
      $('#myModal-Equipment .modal-content #upload').click( ()=> {
       $('#myModal-Equipment form input').trigger('blur');
       if($('body').attr('ver')){return false;}
        let equipmentSN=$('#myModal-Equipment #equipmentSN').val();
        let equipmentName=$('#myModal-Equipment #equipmentName').val();
        let equipmentAddress=$('#myModal-Equipment #equipmentAddress').val();
        // let creatorName=$('#myModal-Equipment #creatorName').val();
        let creatorName=sessionStorage.accountNo;
       that.requestService.addDevice(that.communityId,equipmentSN,equipmentName,equipmentAddress,creatorName,that.tokenId).subscribe(res =>{
         if(res.json().code==0){
          that.equipments = res.json().target;
          $('#myModal-Equipment').modal('hide');let page = 1;
          that.requestService.getAllDevice(that.communityId,page,that.tokenId).subscribe( res=>{
              if(res.json().code==0){
                that.equipments = res.json().target.devices;//.slice().reverse();
                that.pages=[];
                that.shouldHide();
                let pages_copy=res.json().target.totalPage;
                for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
              }else if(res.json().code==3){
               layer.msg('登录超时，请重新登录');
               that.router.navigate(['/login']);
             }
            // console.log(that.pages);
           })
          layer.msg('添加成功');
         }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           that.router.navigate(['/login']);
         }
        })
      })
    }
    // 新建设备

    moreEquipmentInfo=($event)=>{
      let Id=$event.target.id;
      $('#myModal-moreEquipmentInfo').attr('equipmentId',Id);
        class equipmentArr{
         deviceSN : string;
         name : string;
         address : number;
         creatorName : string;
         createDate : number;
         id : number;
         };
       let equipmentArry = new equipmentArr();
          $('#myModal-moreEquipmentInfo #forBtn').text('设备信息');
          // $('#edit span').removeClass('glyphicon-edit text-danger');
          $('#myModal-moreEquipmentInfo #upload').fadeOut().delay(4000);
          $('#myModal-moreEquipmentInfo input').each(function(){$(this).prop('disabled',true);})
       this.requestService.getSimpleDevice(Id,this.tokenId).subscribe( res=>{
         if(res.json().code==0){
          equipmentArry=res.json().target;
          $('#myModal-moreEquipmentInfo #equipmentSN').val(equipmentArry.deviceSN);
          $('#myModal-moreEquipmentInfo #equipmentName').val(equipmentArry.name);
          $('#myModal-moreEquipmentInfo #equipmentAddress').val(equipmentArry.address);
          $('#myModal-moreEquipmentInfo #creatorName').val(equipmentArry.creatorName);
          $('#myModal-moreEquipmentInfo #creatDate').val(equipmentArry.createDate);
          $('#myModal-moreEquipmentInfo').attr('equiId',equipmentArry.id);
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
      })
         $('#myModal-moreEquipmentInfo').modal();
    }
    // 更多设备信息

    deleteEquipment=($event)=>{
      // let pageId=$('table#example1 tfoot td li.active').children().text();
      let that=this;
        let deleteMemberId=$($event.target).prop('id');
            layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
                layer.close(index);
                  $.ajax({
                    type : 'post',
                    url : that.IP+'/web/deleteEquipment',
                    data : {
                      member : deleteMemberId,
                      tokenId : that.tokenId
                    },
                    success:function(data){
                      if(data.code==0){
                      /*let page='';
                      page=$('table#example1 tfoot td li.active').children().text();
                     that.requestService.getAllDevice(that.communityId,page,this.tokenId).subscribe( res=>{
                       if(res.json().code==0){
                        this.pages=[];
                        this.devices = res.json().target.devices;
                        let pages_copy=res.json().target.totalPage;
                        for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
                       }else if(res.json().code==3){
                         layer.msg('登录超时，请重新登录');
                         this.router.navigate(['/login']);
                       }
                     })*/
                     $($event.target).parent().parent().remove();
                     layer.msg('删除成功');
                    }else if(data.code==3){
                     layer.msg('登录超时，请重新登录');
                     this.router.navigate(['/login']);
                   }
                  }
                })
             },function(index){
               layer.close(index);
               layer.msg('操作取消');
        })
    }
    // 删除设备

    edit=($event)=>{
      let that = this;
      if(!$($event.target).hasClass('glyphicon-edit text-danger')){
        $($event.target).addClass('glyphicon-edit text-danger ').removeClass('glyphicon-pencil');
         $('#myModal-moreEquipmentInfo input').each(function(){$(this).prop('disabled',false);})
         $('#myModal-moreEquipmentInfo #upload').removeClass('hide').fadeIn();
        $('#myModal-moreEquipmentInfo #cancel').text('取消').removeClass('btn-primary').addClass('btn-danger');
      }else{
        $('#myModal-moreEquipmentInfo .glyphicon-edit.text-danger').removeClass('glyphicon-edit text-danger').addClass('glyphicon-pencil');
         $('#myModal-moreEquipmentInfo #cancel').text('确定').addClass('btn-primary').removeClass('btn-danger');
        $('#myModal-moreEquipmentInfo #upload').addClass('hide').fadeOut();
        $('#myModal-moreEquipmentInfo input').each(function(){$(this).prop('disabled',true);})
      }
    }

    changeEquipmentUpload=($event)=>{
      $('#myModal-moreEquipmentInfo form input').trigger('blur');
       if($('body').attr('ver')){return false;}
      let pageId=$('table#example1 tfoot td li.active').children().text();
      let deviceId=$('#myModal-moreEquipmentInfo').attr('equipmentId');
      let deviceSN=$('#myModal-moreEquipmentInfo #equipmentSN').val();
      let name=$('#myModal-moreEquipmentInfo #equipmentName').val();
      let address=$('#myModal-moreEquipmentInfo #equipmentAddress').val();
      let createName=sessionStorage.alias;
      this.requestService.updateDevice(deviceId,deviceSN,name,createName,address,this.tokenId).subscribe(res=>{
        if(res.json().code==0){
          $('#myModal-moreEquipmentInfo').modal('hide');
          $($event.target).removeClass('glyphicon-edit text-danger');
          layer.msg('修改成功');
          this.requestService.getAllDevice(this.communityId,pageId,this.tokenId).subscribe(res=>{
             if(res.json().target==""){layer.msg('该部门设备无数据');return;}
               if(res.json().code==0){
               this.shouldHide();
               this.equipments = res.json().target.devices;//.slice().reverse();
               let pages_copy=res.json().target.totalPage;
               for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
             }else if(res.json().code==3){
              layer.msg('登录超时，请重新登录');
              this.router.navigate(['/login']);
            }
          })
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
      })
    }
    // 修改设备


    changePage=($event)=>{
      $('#loading_con').fadeIn();
      let pageId=$($event.target).text();
       $($event.target).parent().addClass('active').siblings().removeClass('active');
       this.requestService.getAllDevice(this.communityId,pageId,this.tokenId).subscribe( res=>{
         if(res.json().code==0){
          this.pages=[];
          this.equipments = res.json().target.devices;
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
        $('#loading_con').fadeOut();
        //.slice().reverse();
        // this.pages = res.json().target();
      })
    }
    // 分页更改显示设备

    firstPage=($event)=>{
      if($($event.target).parent().parent().children().eq(2).hasClass('active')){
        layer.msg('当前已经是第一页！');return;
      }
      $('#loading_con').fadeIn();
       $($event.target).parent().parent().children().eq(2).addClass('active').siblings().removeClass('active');
       // $($event.target).prop('disabled',true).nextSibling().prop('disabled',true);
       this.requestService.getAllDevice(this.communityId,1,this.tokenId).subscribe( res=>{
         if(res.json().code==0){
          this.pages=[];
          this.equipments = res.json().target.devices;
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
        $('#loading_con').fadeOut();
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
         that.requestService.getAllDevice(this.communityId,pageId,this.tokenId).subscribe( res=>{
           if(res.json().code==0){
             that.pages=[];
             that.equipments = res.json().target.devices;
              let pages_copy=res.json().target.totalPage;
              for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
            }else if(res.json().code==3){
             layer.msg('登录超时，请重新登录');
             this.router.navigate(['/login']);
           }
          })
        }else{layer.msg('当前已经是第一页！');}
        $('#loading_con').fadeOut();
    }
    // 上一页
    nextPage=($event)=>{
      let pageId=0;let that=this;let len=$('.pagination li').length-4;
      $('.pagination li').each(function(i){
        if($(this).hasClass('active')){
          pageId=i;return;
        }
       })
          if(pageId<=len){
            $('#loading_con').fadeIn();
            $('.pagination li').eq(pageId+1).addClass('active').siblings().removeClass('active');
             that.requestService.getAllDevice(this.communityId,pageId,this.tokenId).subscribe( res=>{
               if(res.json().code==0){
                 that.pages=[];
                 that.equipments = res.json().target.devices;
                  let pages_copy=res.json().target.totalPage;
                  for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
                }else if(res.json().code==3){
                 layer.msg('登录超时，请重新登录');
                 this.router.navigate(['/login']);
               }
              })
            }else{layer.msg('当前已经是最后一页！');}
            $('#loading_con').fadeOut();
    }
    //下一页

    lastPage=($event)=>{
      let pageId=0;let that=this;let len=$('.pagination li').length-4;
      if($($event.target).parent().parent().children().eq(len+1).hasClass('active')){
        layer.msg('当前已经是最后一页！');return;
      }
       $('#loading_con').fadeIn();
       $($event.target).parent().parent().children().eq(len+1).addClass('active').siblings().removeClass('active');
       this.requestService.getAllDevice(this.communityId,len,this.tokenId).subscribe( res=>{
         if(res.json().code==0){
          this.pages=[];
          this.equipments = res.json().target.devices;
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
       $('#loading_con').fadeOut();
      })
    }
    //最后一页


}
