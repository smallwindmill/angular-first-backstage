import { Component, OnInit } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { Router } from '@angular/router';
 import {enableProdMode} from '@angular/core';
import { RequestService } from '../../services/request.service';

declare var $  : any;
declare var layer  : any;

@Component({
  selector: 'app-menu-aside',
  templateUrl: './menu-aside.component.html',
  styleUrls: ['./menu-aside.component.css']
})
export class MenuAsideComponent implements OnInit {
  userShow : any;
  communityShow : number;
  communityId : number;
  communityName : any;
  admin : string;
  imgSrc :any;
  accountNo : any;
  accountClass : any;
  tele : any;arry:any;
  tokenId : string;
  IP : string;

  formVer : any;
  shouldHide : any;

  three : any;four : any;five : any;six : any;seven : any;

  constructor(private http:Http,private requestService:RequestService,private router:Router) { }

  ngOnInit() {
    this.tokenId = sessionStorage.tokenId;

    this.userShow = sessionStorage.accountNo;

    this.communityShow = sessionStorage.type;

    this.communityId = sessionStorage.communityId;
    this.communityName = '';
    this.accountNo = sessionStorage.accountNo;
    this.accountClass = sessionStorage.telephone;

    // this.IP = 'http://112.124.15.205:8090';
     this.IP = this.requestService.IP;


    this.three = 3;this.four = 4;this.five = 5;this.six = 6;this.seven = 7;

    this.arry = ["../../../assets/img/index.ico","../../../assets/img/index1.ico","../../../assets/img/index2.ico","../../../assets/img/index3.ico","../../../assets/img/index4.ico","../../../assets/img/index5.ico"];


    $('#menu #side-menu').metisMenu();
    // 菜单手风琴效果

    let x=Math.floor(Math.random()*(this.arry.length));
    this.imgSrc = this.arry[x];

    if(sessionStorage.alias){
      this.admin = sessionStorage.alias;
    }
    else{
      this.admin = '灰太狼'
    }

    if(sessionStorage.superCheck==1){
      this.accountClass = '超级管理员';
    }
    else if(sessionStorage.superCheck==2){
      this.accountClass = '社区管理员';
    }else{
      this.accountClass = '无权限';
    }

    this.requestService.changeLand(this.communityId,this.tokenId).subscribe(res=>{
       this.communityName = res.json().target.communityName;
    })
    // 获取区名

   this.shouldHide=() =>{
     $('input').val('');
     $('input').siblings('.showRed').text('');
     $('input').parent().removeClass('has-error');
     $('div #upload').prop('disabled',false);
   }



   $('form input').blur(function(){
       var $parent = $(this).parent();
       //旧密码
       if( $(this).is('#oldPwd') ){
          if( this.value=="" || this.value.length < 6 ){
            $(this).siblings('.showRed').text('原密码至少六个字符');
            $(this).parent().addClass('has-error');
            $('div #upload').prop('disabled',true);
            $('body').attr('ver',1);
          }else{
            $(this).siblings('.showRed').text('');
            $(this).parent().removeClass('has-error');
            $('div #upload').prop('disabled',false);
            $('body').attr('ver','');
          }
       }
       //新密码
       if( $(this).is('#pwd') ){
          if( this.value=="" || this.value.length < 6 ){
            $(this).siblings('.showRed').text('新密码至少六个字符');
            $(this).parent().addClass('has-error');
            $('div #upload').prop('disabled',true);
            $('body').attr('ver',1);
          }else{
            $(this).siblings('.showRed').text('');
            $(this).parent().removeClass('has-error');
            $('div #upload').prop('disabled',false);
            $('body').attr('ver','');
          }
       }
       if( $(this).is('#rePwd') ){
           if( this.value=="" || this.value.length < 6 || this.value!=$('#password').val() ){
             $(this).siblings('.showRed').text('两次密码不一致');
             $(this).parent().addClass('has-error');
             $('div #upload').prop('disabled',true);
             $('body').attr('ver',1);
           }else{
             $(this).siblings('.showRed').text('');
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


   $('li').click(function(){
     $('li a').removeClass('active');
     $(this).children('a').addClass('active');
   })



  }

  changePwd=($event)=>{
    $('#myModal-changePwd').modal();
  }

  changePwdUpload=($event)=>{
    let old = $('#myModal-changePwd #oldPwd').val();
    let newPwd = $('#myModal-changePwd #pwd').val();
    let reNew = $('#myModal-changePwd #rePwd').val();
    if(newPwd!=reNew){
      layer.msg('两次密码不一致');return;
    }
    $('#myModal-changePwd form input').trigger('blur');
       if($('body').attr('ver')){return false;}
    this.requestService.updatePassword(sessionStorage.accountNo,old,newPwd,this.tokenId).subscribe(res=>{
      if(res.json().code==0){
        layer.msg('修改成功，请重新登录');
        $('#myModal-changePwd').modal('hide');
        this.router.navigate(['/login']);
      }else if(res.json().code==3){
        layer.msg('登录超时，请重新登录');
        this.router.navigate(['/login']);}
        layer.msg(res.json().text);return;
    },err0=>{
      layer.msg('网络错误，请稍后重试');
    })
  }

}
