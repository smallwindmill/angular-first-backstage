import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, HttpModule } from '@angular/http';

import { RequestService } from '../../services/request.service';

 declare var $:any;
 declare var layer:any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  admin : any;
  userShow : any;
  communityShow : any;
  communityShowRep : any;
  sex:number;

  tokenId : string;
  IP :string;
  constructor(private router:Router,private requestService:RequestService ) { }

  ngOnInit() {

    this.userShow = sessionStorage.accountNo;
    this.tokenId = sessionStorage.tokenId;

    // this.IP = 'http://112.124.15.205:8090';
     this.IP = this.requestService.IP;

    this.communityShow = sessionStorage.type;
    this.communityShowRep = sessionStorage.superCheck;
    this.sex = sessionStorage.sex;

    /*let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "assets/js/new.js";
     $('body').append(script);*/

    if(sessionStorage.alias){
      this.admin = sessionStorage.alias;
    }else{
      this.admin = '临时身份';
      /*layer.confirm('以游客身份登录吗？',{icon: 3, title:'提示'},function(index){

        },function(index){
           layer.msg("身份信息过时,请重新登录");
           this.router.navigation(['/login']);
        }
      )*/
      // layer.msg("身份信息过时,请重新登录");
       // layer.confirm('确定全部删除?', {icon:7, title:'提示'}, function(index){})
    }

  }

  loginOut=()=>{
    this.requestService.exitLand(this.tokenId).subscribe(res=>{

    })
  }
  //退出登录

  goBackSuper=($event)=>{
    $('#loading_con').fadeIn();
    sessionStorage.type = sessionStorage.superCheck;
    this.communityShowRep = sessionStorage.type;
    setTimeout(function(){ location.reload();},500);
    $('#loading_con').fadeOut();
  }
  // 退出当前小区






}


