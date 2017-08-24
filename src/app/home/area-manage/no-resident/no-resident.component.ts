import { Component, OnInit } from '@angular/core';

 declare var $:any;

@Component({
  selector: 'app-no-resident',
  templateUrl: './no-resident.component.html',
  styleUrls: ['./no-resident.component.css']
})
export class NoResidentComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var script = document.createElement('script');
    script.type = 'text/jacascript';
    script.src = 'assets/js/new.js';     //填自己的js路径
    $('body').append(script);

    $('button').click(function(){
      console.log(0);
    $('#myModal').modal();
    })
  }

}
