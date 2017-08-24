import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

  declare var $:any;
  declare var layer:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

userShow : any;superManager :any;

  constructor(private router:Router) { }

  ngOnInit() {
     // var that = this;
    // this.userShow = sessionStorage.accountNo;
    // setTimeout(function(){ this.superManager = sessionStorage.type;},1000);
    this.judge();

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.src = 'assets/js/new.js';     //填自己的js路径
    $('body').append(script);


  }

   judge(){
      let that = this;
      // window.onload=function()
      if(sessionStorage.accountNo==''||sessionStorage.accountNo==undefined){
          that.router.navigate(['/login']);
          layer.alert('无账号信息，请登录',{icon: 3, title:'提示'},function(index){
              layer.close(index);
              that.router.navigate(['/login']);
            }
          )
       }
    }




}
