import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http,HttpModule} from '@angular/http';
import { RequestService } from '../../services/request.service';

import { LoginComponent } from '../login/login.component';

declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.css']
})
export class ForgetPwdComponent implements OnInit {
   code_1: any;

  constructor(private http:Http,private requestService : RequestService,private router : Router) { }

  ngOnInit() {
    $('#loading_con').fadeOut();

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.src = 'assets/js/new.js';     //填自己的js路径
    $('body').append(script);


  this.code_1=()=>{
    let account = $('#account').val();
    let code_1=$('#code').val();
    if(code_1==""||code_1==" "||code_1==undefined||code_1.length!=6){
      $('.two').hide();
      return;
    }else{
      this.requestService.verificationCode(account,code_1).subscribe(res=>{
          if(res.json().code!=0){
              layer.msg('验证码错误');
              $('.two').hide();
              return;
          }else{
            layer.msg('验证通过');
            $('.two').show();
            $('#certain').val('确定');
          }
      },error=>{
         layer.msg('网络错误');return;
          })
    }
  }

  }

  code=($event)=> {
    this.code_1();
  }

  getVerifi=($event)=>{
    let account =  $("#account").val();
      if(account==""||account==" "||account==undefined){
        layer.msg('邮箱不能为空！');return;
        // $("#account").addClass('')
      }
      else{
        this.requestService.getCode(account).subscribe(res=>{
          if(res.status==200){
            let i = 60;
            layer.msg('验证码已发送');
            let clearInter = setInterval ( ()=>{
              if(i>=0){
                let sen = i+"秒后重试";
                $($event.target).text(sen);
                $($event.target).prop('disabled',true);
                i--;
              }else{
                clearInterval(clearInter);
                $($event.target).text('重新发送');$($event.target).prop('disabled',false);
              }
            },1000);
          }
        },error=>{
          layer.msg('网络错误，请稍后再试');
          })
      }
  }
  // 验证码定时

  verificationCode=($event)=>{
    let account = $('#account').val();
    let code = $('#code').val();
    var password = $('#password').val();
    var rePassword = $('#re-password').val();
    if(account==""||account==" "||account==undefined){
      layer.msg('邮箱不能为空');return;
    }
    if(code==""||code==" "||code==undefined||code.length!=6){
      layer.msg('验证码不是六位数');return;
    }

    if(!this.code_1()){return;};

    if(password==""||password==" "||password==undefined){
      layer.msg('新密码不能为空');return;
    }else if(password!=rePassword){
      layer.msg('两次输入密码不一致');return;}
    this.requestService.forgetPassword(account,code,password).subscribe(res=>{
      if(res.json().code==0){
        layer.msg('密码修改成功');
        this.router.navigate(['/home']);
      }
        layer.msg(res.json().text);
    })
  }

}
