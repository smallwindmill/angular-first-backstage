import { Component, OnInit } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { Router } from '@angular/router';

import { RequestService } from '../../services/request.service';

declare var $: any;
declare var layer: any;

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
   members : any;
   showLists : any;
   managers : any;
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
    document.title='社区/管理员';

    this.communityId = sessionStorage.communityId;
    this.userShow = sessionStorage.accountNo;
    this.tokenId = sessionStorage.tokenId;

    // this.IP = 'http://112.124.15.205:8090';
     this.IP = this.requestService.IP;

    this.pages =new Array();
    let that=this;

    $('#just_js').remove();

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.src = "assets/js/new.js";
    script.id = "just4_js";
    $('body').append(script);

    this.requestService.getManager(this.communityId,1,this.tokenId).subscribe( res=>{
      if(res.json().code==0){
        this.managers = res.json().target.users;//.slice().reverse();
        let pages_copy=res.json().target.totalPage;
        for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
      }else if(res.json().code==3){
       layer.msg('登录超时，请重新登录');
       this.router.navigate(['/login']);
     }
      $('#loading_con').fadeOut();
    })
    // 获取管理员


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
      $('#myModal-moremanagerInfo .glyphicon-edit.text-danger').removeClass('glyphicon-edit text-danger').addClass('glyphicon-pencil');
         $('#myModal-moremanagerInfo #cancel').text('确定').addClass('btn-primary').removeClass('btn-danger');
        $('#myModal-moremanagerInfo #upload').addClass('hide').fadeOut();
        $('#myModal-moremanagerInfo input').each(function(){$(this).prop('disabled',true);})
        $('#myModal-moremanagerInfo .rePassword').addClass('hide');
        $('#myModal-moremanagerInfo .sexCon').removeClass('hide');
        $('#myModal-moremanagerInfo .sexChoiceCon').addClass('hide');
        $('input').not('input:radio').val('');
        $('input').parent().removeClass('has-error');
        $('input').siblings('.showRed').text(' ');
    }



    $('form input').blur(function(){
         var $parent = $(this).parent();
         // var $parent = $(this).parent();
         //验证社区名
         if( $(this).is('#alias') ){
            if( $(this).val()=="" || $(this).val().length < 2 ){
              $(this).siblings('.showRed').text('用户名至少两个字符');
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
         //验证账号
         if( $(this).is('#accountNo') ){
           if( $(this).val()=="" || ( $(this).val()!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test($(this).val()) ) ){
              $(this).siblings('.showRed').text('请输入正确的E-Mail地址');
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
          //验证密码
         if( $(this).is('#password') ){
            if( $(this).val()=="" || $(this).val().length < 6 ){
              $(this).siblings('.showRed').text('密码至少六位数');
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
          //验证密码
         if( $(this).is('#rePassword') ){
           if( $(this).val()=="" || $(this).val().length < 6 || $(this).val()!=$(this).parent().parent().find('#password').val() ){
              $(this).siblings('.showRed').text('两次密码不一致');
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
         // 验证手机号
         if( $(this).is('#phoneNumber') ){
           if( $(this).val()=="" || ( $(this).val()!="" && !/^1[34578]\d{9}$/.test($(this).val()) ) ){
              $(this).siblings('.showRed').text('请输入正确手机号码');
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
    });

  }

    newManager=($event)=>{
      let len=$event.target.text;
      let that=this;
      let pageId = $('.pagination li.active a').prop('id');
      $('#myModal-manager #forBtn').text(len);
      that.shouldHide();
      $('#myModal-manager').modal();
      $('#myModal-manager .modal-content #upload').click( ()=> {
        $('#myModal-manager form input').trigger('blur');
       if($('body').attr('ver')){return false;}
        let accountNo=$('#myModal-manager #accountNo').val();
        let managerName=$('#myModal-manager #managerName').val();
        let password=$('#myModal-manager #password').val();
        let alias=$('#myModal-manager #alias').val();
        let sex=$('#myModal-manager input:radio:checked').val();
       that.requestService.addManager(that.communityId,accountNo,password,alias,sex,that.tokenId).subscribe(res =>{
         if(res.json().code==0){
          // that.managers = res.json().target;
          $('#myModal-manager').modal('hide');
          that.requestService.getManager(that.communityId,pageId,that.tokenId).subscribe( res=>{
              if(res.json().code==0){
                that.managers = res.json().target.users;//.slice().reverse();
               that.pages = [];
                let pages_copy=res.json().target.totalPage;
                for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
              }else if(res.json().code==3){
               layer.msg('登录超时，请重新登录');
               that.router.navigate(['/login']);
             }
           })
          layer.msg(res.json().text);
         }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           that.router.navigate(['/login']);
         }
        })
      })
    }
    // 新建管理员

    moremanagerInfo=($event)=>{
      let Id=$event.target.id;
      $('#myModal-moremanagerInfo').attr('managerId',Id);
          $('#myModal-moremanagerInfo #forBtn').text('管理员信息');
          // $('#edit span').removeClass('glyphicon-edit text-danger');
          $('#myModal-moremanagerInfo #upload').fadeOut().delay(4000);
          $('#myModal-moremanagerInfo input').each(function(){$(this).prop('disabled',true);})
       this.requestService.getSimpleManager(Id,this.tokenId).subscribe( res=>{
         if(res.json().code==0){
          let managerArry=res.json().target;
          $('#myModal-moremanagerInfo #alias').val(managerArry.alias);
          $('#myModal-moremanagerInfo #accountNo').val(managerArry.accountNo);
          // $('#myModal-moremanagerInfo #password').val(managerArry.password);
          $('#myModal-moremanagerInfo #password').val('HGBHJ4');
          $('#myModal-moremanagerInfo #rePassword').val('HGBHJ4');
          (managerArry.sex==0)?$('#myModal-moremanagerInfo #sex').val('女'):$('#myModal-moremanagerInfo #sex').val('男');
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
      })
        this.shouldHide();
         $('#myModal-moremanagerInfo').modal();
    }
    // 更多管理员信息

    deleteManager=($event)=>{
      // let pageId=$('table#example1 tfoot td li.active').children().text();
      let that=this;
        let deleteManagerId=$($event.target).prop('id');
            layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
                layer.close(index);
                  $.ajax({
                    type : 'post',
                    url : that.IP+'/web/deleteManager',
                    data : {
                      accountid : deleteManagerId,
                      tokenId : that.tokenId
                    },
                    success:function(data){
                    if(data.code==0){
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
    // 删除管理员

    edit=($event)=>{
      let that = this;
      if(!$($event.target).hasClass('glyphicon-edit text-danger')){
        $($event.target).addClass('glyphicon-edit text-danger ').removeClass('glyphicon-pencil');
         $('#myModal-moremanagerInfo input').each(function(){$(this).prop('disabled',false);})
         $('#myModal-moremanagerInfo #upload').removeClass('hide').fadeIn();
        $('#myModal-moremanagerInfo #cancel').text('取消').removeClass('btn-primary').addClass('btn-danger');
        $('#myModal-moremanagerInfo .sexCon').addClass('hide');
        $('#myModal-moremanagerInfo .sexChoiceCon').removeClass('hide');
        $('#myModal-moremanagerInfo .rePassword').removeClass('hide');
      }else{
        $('#myModal-moremanagerInfo .glyphicon-edit.text-danger').removeClass('glyphicon-edit text-danger').addClass('glyphicon-pencil');
         $('#myModal-moremanagerInfo #cancel').text('确定').addClass('btn-primary').removeClass('btn-danger');
        $('#myModal-moremanagerInfo #upload').addClass('hide').fadeOut();
        $('#myModal-moremanagerInfo input').each(function(){$(this).prop('disabled',true);})
        $('#myModal-moremanagerInfo .sexCon').removeClass('hide');
        $('#myModal-moremanagerInfo .sexChoiceCon').addClass('hide');
        $('#myModal-moremanagerInfo .rePassword').addClass('hide');

      }
    }

    changemanagerUpload=($event)=>{
      $('#myModal-moremanagerInfo form input').trigger('blur');
       if($('body').attr('ver')){return false;}
      let that = this;
      let pageId=$('table#example1 tfoot td li.active').children().text();
      let accountid = $('#myModal-moremanagerInfo').attr('managerid');
      let alias=$('#myModal-moremanagerInfo #alias').val();
      let accountNo=$('#myModal-moremanagerInfo #accountNo').val();
      let password=$('#myModal-moremanagerInfo #password').val();
      let sex=$('#myModal-moremanagerInfo input:radio:checked').val();
      that.requestService.updateManager(that.communityId,accountid,accountNo,password,alias,sex,that.tokenId).subscribe(res=>{
        if(res.json().code==0){
          $('#myModal-moremanagerInfo').modal('hide');
          $($event.target).removeClass('glyphicon-edit text-danger');
          layer.msg('修改成功');
          that.requestService.getManager(that.communityId,pageId,that.tokenId).subscribe(res=>{
               if(res.json().code==0){
               that.managers = res.json().target.users;//.slice().reverse();
               let pages_copy=res.json().target.totalPage;
               for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
               that.shouldHide();
             }else if(res.json().code==3){
              layer.msg('登录超时，请重新登录');
              that.router.navigate(['/login']);
            }
          })
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         that.router.navigate(['/login']);
       }
       layer.msg(res.json().text);
      })
    }
    // 修改管理员


    changePage=($event)=>{
      let pageId=$($event.target).text();
       $($event.target).parent().addClass('active').siblings().removeClass('active');
       this.requestService.getMembers(1,1,pageId,this.tokenId).subscribe( res=>{
         if(res.json().code==0){
          this.pages=[];
          this.members = res.json().target.users;
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
        //.slice().reverse();
        // this.pages = res.json().target();
      })
    }
    // 分页更改显示管理员

    firstPage=($event)=>{
      if($($event.target).parent().parent().children().eq(2).hasClass('active')){
        layer.msg('当前已经是第一页！');return;
      }
       $($event.target).parent().parent().children().eq(2).addClass('active').siblings().removeClass('active');
       // $($event.target).prop('disabled',true).nextSibling().prop('disabled',true);
       this.requestService.getMembers(1,1,1,this.tokenId).subscribe( res=>{
         if(res.json().code==0){
          this.pages=[];
          this.members = res.json().target.users;
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
         that.requestService.getMembers(1,1,pageId,this.tokenId).subscribe( res=>{
           if(res.json().code==0){
             that.pages=[];
             that.members = res.json().target.users;
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
             that.requestService.getMembers(1,1,pageId,this.tokenId).subscribe( res=>{
               if(res.json().code==0){
                 that.pages=[];
                 that.members = res.json().target.users;
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
       this.requestService.getMembers(1,1,len,this.tokenId).subscribe( res=>{
         if(res.json().code==0){
          this.pages=[];
          this.members = res.json().target.users;
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
      })
    }
    //最后一页


}
