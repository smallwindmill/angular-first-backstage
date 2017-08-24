import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpModule, Http} from '@angular/http';
import { RequestService} from '../../services/request.service';

// import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

declare var $  : any;
declare var layer  : any;

@Component({
  selector: 'app-community-manage',
  templateUrl: './community-manage.component.html',
  styleUrls: ['./community-manage.component.css']
})
export class CommunityManageComponent implements OnInit {
  tokenId : string;
  IP : string;

  communitys : any;
  areas : any;
  cities : any;

  newcommunityInfo : any;

  formVer : any;
  shouldHide : any;

  constructor(private http:Http,private requestService:RequestService,private router:Router) { }

  ngOnInit() {


    $('#loading_con').fadeIn();
    document.title="社区管理";

    $('#just_js').remove();

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.id = "just_js";
    script.src = '/assets/js/new.js';     //填自己的js路径

    $('body').append(script);


    this.tokenId = sessionStorage.tokenId;
    // this.IP = 'http://112.124.15.205:8090';
     this.IP = this.requestService.IP;
     let that = this;

    this.requestService.getAllCommunity(this.tokenId).subscribe(res=>{
      if(res.json().code==0){
        this.communitys = res.json().target;
      }else if(res.json().code==13){
       layer.msg('登录超时，请重新登录');
       that.router.navigate(['/login']);
     }
      $('#loading_con').fadeOut();
    })
    // 获取所有社区

    this.requestService.getArea('',this.tokenId).subscribe(res=>{
      this.areas = res.json().target.provinces;
      this.cities = res.json().target.cities;
    })
    // 获取默认地址


   this.shouldHide=() => {
      $('#myModal-morecommunityInfo .glyphicon-edit.text-danger').removeClass('glyphicon-edit text-danger').addClass('glyphicon-pencil');
     $('#myModal-morecommunityInfo #cancel').text('确定').addClass('btn-primary').removeClass('btn-danger');
    $('#myModal-morecommunityInfo #upload').addClass('hide').fadeOut();
    $('#myModal-morecommunityInfo input').each(function(){$(this).prop('disabled',true);})
     $('input').val('');
     $('#myModal-morecommunityInfo #address_choice').addClass('hide');
     $('#myModal-morecommunityInfo #address_con').removeClass('hide');
     $('input').parent().removeClass('has-error');
     $('input').siblings('.showRed').text(' ');
   }

  $('form input').blur(function(){
         var $parent = $(this).parent();
         //验证社区名
         if( $(this).is('#communityName') ){
            if( this.value=="" || this.value.length < 2 ){
              $(this).siblings('.showRed').text('用户名至少两个字符');
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
         //验证管理员名字
         if( $(this).is('#alias') ){
            if( this.value=="" || this.value.length < 2 ){
              $(this).siblings('.showRed').text('管理员名字至少两个字符');
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
         //验证账号
         if( $(this).is('#accountNo') ){
           if( this.value=="" || ( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
              $(this).siblings('.showRed').text('请输入正确的E-Mail地址');
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
          //验证密码
         if( $(this).is('#password') ){
            if( this.value=="" || this.value.length < 6 ){
              $(this).siblings('.showRed').text('密码至少六位数');
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
          //验证密码
         if( $(this).is('#rePassword') ){
           if( this.value=="" || this.value.length < 6 || this.value!=$('#password').val() ){
              $(this).siblings('.showRed').text('两次密码不一致');
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
         // 验证手机号
         if( $(this).is('#phoneNumber') ){
           if( this.value=="" || ( this.value!="" && !/^1[34578]\d{9}$/.test(this.value) ) ){
              $(this).siblings('.showRed').text('请输入正确手机号码');
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
         // 验证地址
         if( $(this).is('#address') ){
           if( this.value==""){
              $(this).siblings('.showRed').text('地址不能为空');
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
  }).keyup(function(){
     $(this).triggerHandler("blur");
  }).focus(function(){
       $(this).triggerHandler("blur");
  }).change(function(){
       $(this).triggerHandler("blur");
  });



  }


  newCommunity=()=>{
    this.shouldHide();
    $('#myModal-newCommunity').modal();
    let that = this;
    $('#myModal-newCommunity .modal-content #upload').click( ()=> {

       $('#myModal-newCommunity form input').trigger('blur');
       if($('body').attr('ver')){return false;}
        // let sentence = $('#newcommunityInfo').serialize();
        let communityName=$('#myModal-newCommunity #communityName').val();
        let city=$('#myModal-newCommunity #city option:selected').prop('id');
        let phoneNumber=$('#myModal-newCommunity #phoneNumber').val();
        let address=$('#myModal-newCommunity #address').val();
        let description=$('#myModal-newCommunity #description').val();
        let accountNo=$('#myModal-newCommunity #accountNo').val();
        let password=$('#myModal-newCommunity #password').val();
        let alias=$('#myModal-newCommunity #alias').val();
        let sex=$('#myModal-newCommunity input:radio:checked').val();
        that.requestService.addCommunity(communityName,city,address,phoneNumber,description,accountNo,password,alias,sex,that.tokenId).subscribe(res=>{
           if(res.json().code == 0){
             layer.msg('添加成功');
              $('#myModal-newCommunity').modal('hide');
              that.requestService.getAllCommunity(that.tokenId).subscribe(res=>{
                that.communitys = res.json().target;
              })
           }else if(res.json().code==3){
             layer.msg('登录超时，请重新登录');
             that.router.navigate(['/login']);
           }
           else{
             layer.msg(res.json().text);
           }
        })
    })
  }
  // 添加社区

  getCity=($event)=>{
    let province = $($event.target).find('option:selected').prop('id');
    this.requestService.getArea(province,this.tokenId).subscribe(res=>{
      if(res.json().code==0){
      this.cities = res.json().target.cities;
      }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
    })
  }

  morecommunityInfo=($event)=>{
        let Id=$($event.target).parent().prop('id');
        $('#myModal-morecommunityInfo').attr('communityId',Id);
        $('#myModal-morecommunityInfo #forBtn').text('管理员信息');
        // $('#edit span').removeClass('glyphicon-edit text-danger');
        $('#myModal-morecommunityInfo #upload').fadeOut().delay(4000);
        $('#myModal-morecommunityInfo input').each(function(){$(this).prop('disabled',true);})
         this.requestService.getSimpleCommunity(Id,this.tokenId).subscribe( res=>{
           if(res.json().code==0){
            let communityArry=res.json().target;
            $('#myModal-morecommunityInfo #communityName').val(communityArry.community.communityName);
            $('#myModal-morecommunityInfo #description').val(communityArry.community.description);
            // $('#myModal-morecommunityInfo #password').val(communityArry.password);
            $('#myModal-morecommunityInfo #address_con input').val(communityArry.areaFullName+""+communityArry.community.address);
            $('#myModal-morecommunityInfo #address').val(communityArry.community.address);
          }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
        })
          this.shouldHide();
          $('#myModal-morecommunityInfo').modal();
  }
  // 更多社区信息
  edit=($event)=>{
        let that = this;
        if(!$($event.target).hasClass('glyphicon-edit text-danger')){
          $($event.target).addClass('glyphicon-edit text-danger ').removeClass('glyphicon-pencil');
          $('#myModal-morecommunityInfo input').each(function(){$(this).prop('disabled',false);})
           $('#myModal-morecommunityInfo #upload').removeClass('hide').fadeIn();
          $('#myModal-morecommunityInfo #cancel').text('取消').removeClass('btn-primary').addClass('btn-danger');
          $('#myModal-morecommunityInfo .sexCon').addClass('hide');
          $('#myModal-morecommunityInfo .sexChoiceCon').removeClass('hide');
          $('#myModal-morecommunityInfo .rePassword').removeClass('hide');
          $('#myModal-morecommunityInfo #address_choice').removeClass('hide');
          $('#myModal-morecommunityInfo #address_con').addClass('hide');
        }else{
          $('#myModal-morecommunityInfo .glyphicon-edit.text-danger').removeClass('glyphicon-edit text-danger').addClass('glyphicon-pencil');
           $('#myModal-morecommunityInfo #cancel').text('确定').addClass('btn-primary').removeClass('btn-danger');
          $('#myModal-morecommunityInfo #upload').addClass('hide').fadeOut();
          $('#myModal-morecommunityInfo input').each(function(){$(this).prop('disabled',true);})
          $('#myModal-morecommunityInfo #address_choice').addClass('hide');
          $('#myModal-morecommunityInfo #address_con').removeClass('hide');
           $('input').parent().removeClass('has-error');
           $('input').siblings('.showRed').text(' ');

        }
  }

  changecommunityUpload=($event)=>{
    $('#myModal-morecommunityInfo form input').trigger('blur');
     if($('body').attr('ver')){return false;}
    let that = this;
    let communityId=$('#myModal-morecommunityInfo').attr('communityId');

    let communityName=$('#myModal-morecommunityInfo #communityName').val();
    let areaId=$('#myModal-morecommunityInfo #city option:selected').prop('id');
    let phoneNumber=$('#myModal-morecommunityInfo #phoneNumber').val();
    let address=$('#myModal-morecommunityInfo #address').val();
    let description=$('#myModal-morecommunityInfo #description').val();
    let accountNo=$('#myModal-morecommunityInfo #accountNo').val();
    let password=$('#myModal-morecommunityInfo #password').val();
    let alias=$('#myModal-morecommunityInfo #alias').val();
    let sex=$('#myModal-morecommunityInfo input:radio:checked').val();

    that.requestService.updateCommunity(communityName,communityId,description,areaId,address,that.tokenId).subscribe(res=>{
      if(res.json().code==0){
        $('#myModal-morecommunityInfo').modal('hide');
        $($event.target).removeClass('glyphicon-edit text-danger');
        layer.msg('修改成功');
        that.requestService.getAllCommunity(that.tokenId).subscribe(res=>{
             if(res.json().code==0){
             that.communitys = res.json().target;//.slice().reverse();
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
  // 修改社区

  goCommunity=($event)=>{
    $('#loading_con').fadeIn();
    let comId=$event.target.id;
    sessionStorage.type = "2";
    sessionStorage.communityId = comId;
    // this.router.navigate(["/home/haveResident", comId]);
    setTimeout(function(){ location.reload();},500);
  }
  // 进入社区;


  deleteCommunity=($event) => {
    $event.stopImmediatePropagation();
    let that = this;
    let deleteId = $($event.target).parent().prop('id');
    // console.log($($event.target));
    layer.confirm('该操作会将本社区下的所有数据删除，确定删除吗?', {icon: 7, title:'提示'}, function(index){
             layer.close(index);
             $.ajax({
               type : 'post',
               url : that.IP+'/web/deleteCommunity',
               data : {
                  communityId : deleteId,
                   tokenId : that.tokenId
               },
               success : function(data){
                 if(data.code==0){
                   let dele = '#'+deleteId+'Con';
                   $(dele).remove();
                 }else if(data.code==3){
                    layer.msg('登录超时，请重新登录');
                   this.router.navigate(['/login']);
                 }
               layer.msg(data.text);
               },
               error : function(){
                 layer.msg("网络出错");
               }
             })
           },function(index){
             layer.close(index);
             // layer.msg('操作取消');
         })
  }



}
