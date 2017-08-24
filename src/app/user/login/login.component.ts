import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http,HttpModule} from '@angular/http';
import { RequestService } from '../../services/request.service';

declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:Http,private requestService : RequestService,private router : Router) { }

  ngOnInit() {
     sessionStorage.communityId = '';
     sessionStorage.communityName = '';
     sessionStorage.position = '';
     sessionStorage.alias = '';
     sessionStorage.accountNo = '';
     sessionStorage.accountid = '';
     sessionStorage.tele = '';
     sessionStorage.type = '';
     sessionStorage.superCheck = '';
     sessionStorage.tokenId = '';

    $('#loading_con').fadeOut();

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.src = 'assets/js/new.js';     //填自己的js路径
    $('body').append(script);
	}



  login=()=>{
      $('#loading_con').fadeIn();
      if($('#account').val()==''||$('#account').val()==" "){
        $(this).addClass('text-danger');
        layer.msg('账号不能为空');$('#loading_con').fadeOut();
        return;
      }
      if($('#password').val()==''||$('#account').val()==" "){
        $(this).addClass('text-danger');
        layer.msg('密码不能为空');$('#loading_con').fadeOut();
        return;
      }
      let account=$('#account').val();
      let password=$('#password').val();
       this.requestService.login(account,password).subscribe(res=>{
         // console.log(res.json().code);
       res.json().code==''?(layer.msg('服务器连接失败，请稍后尝试'),$('#loading_con').fadeOut()):(this.router.navigate(['/login']));
       if(res.json().code!=0){
         layer.msg('账号或密码错误');
       }
        else{
          // console.log(sessionStorage.type);
         if(res.json().target.user.type=='1'){
           // this.router.navigate(['/home/goverInfo',3]);
           this.router.navigate(['/home/communityManage']);
         }
         else{
           this.router.navigate(['/home/goverInfo',3]);
           // this.router.navigate(['/home/goverInfo']);
         }
          layer.msg('登陆成功');
       // $('#loading_con').fadeOut();
       }
        $('#loading_con').fadeOut();
         sessionStorage.communityId = res.json().target.user.communityId;
         sessionStorage.communityName = res.json().target.user.communityName;
         sessionStorage.alias = res.json().target.user.alias;
         sessionStorage.accountNo = res.json().target.user.accountNo;
         sessionStorage.accountid = res.json().target.user.accountid;
         sessionStorage.tele = res.json().target.user.telephone;
         sessionStorage.position = res.json().target.user.position;
         sessionStorage.type = res.json().target.user.type;
         sessionStorage.superCheck = res.json().target.user.type;
         sessionStorage.sex = res.json().target.user.sex;
         sessionStorage.tokenId = res.json().target.tokenId;
         // sessionStorage.communityName = res.json().target.communityName;
         /*console.log(sessionStorage.communityId);
         console.log(sessionStorage.position);
         console.log(sessionStorage.tokenId);
         console.log(sessionStorage.type);*/
     },erro=>{
       layer.msg('服务器连接失败，请稍后尝试');
       $('#loading_con').fadeOut();//this.router.navigate(['/home']);
     })
  }

  onKeyLogin=()=>{
    this.login();
  }


}
