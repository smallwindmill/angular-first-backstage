import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';

declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
	public imgUrl = [
		"../../../assets/img/1.jpg",
		"../../../assets/img/2.jpeg",
		"../../../assets/img/3.jpg",
		"../../../assets/img/4.jpg",
		"../../../assets/img/5.jpg"
	]
  constructor(private router:Router) { }

  ngOnInit() {
    this.judge();
  }
   judge(){
      let that = this;
      // window.onload=function()
      if(sessionStorage.accountNo==''||sessionStorage.accountNo==undefined){
          layer.alert('无账号信息，请登录',{icon: 3, title:'提示'},function(index){
              layer.close(index);
              that.router.navigate(['/login']);
            }
          )
       }
    }
}
