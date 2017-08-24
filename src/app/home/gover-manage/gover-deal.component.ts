import { Component, OnInit } from '@angular/core';
import { Http,HttpModule }    from '@angular/http';
import { Router } from '@angular/router';

import { RequestService }    from '../../services/request.service';

declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-gover-deal',
  templateUrl: './gover-deal.component.html',
  styleUrls: ['./gover-deal.component.css','./gover-info.component.css']
})
export class GoverDealComponent implements OnInit {
  list : any ;pages : any;
  userShow : boolean;

  communityId:any;
  tokenId : string;
  IP : string;
  constructor( private http: Http , private requestService : RequestService,private router : Router) { }

  ngOnInit() {

     this.userShow = sessionStorage.accountNo;
     this.communityId = sessionStorage.communityId;

     this.tokenId = sessionStorage.tokenId;
     // this.IP = 'http://112.124.15.205:8090';
     this.IP = this.requestService.IP;


    $('#just_js').remove();
    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.id = "just_js";
    script.src = '/assets/js/new.js';     //填自己的js路径
    $('body').append(script);


    this.requestService.getPublishByClassification(this.communityId,0,'','',this.tokenId).subscribe( res => {
      this.pages=[];//清空页码；
      this.list = res.json().target.beanList.slice().reverse();
      let pages_copy=res.json().target.totalPage;
      let pages_copy1=new Array();
      for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
      if(res.status==200){
        // layer.msg('数据获取成功');
      }else{
        // layer.msg('数据获取错误');
      }
    }/*,
    err =>{
      console.log(err);
    }*/
    );
    // 获取文章内容


    this.requestService.getGoverDealClass(this.communityId,this.tokenId).subscribe(res =>{
      let btnCon=res.json().target;
        for(var x=0;x<btnCon.length;x++){
           var typeCon='<div class="btn" id="'+btnCon[x].id+'"><span>'+btnCon[x].name+'</span></div>';
          $('.type').append(typeCon);}
    })
    //获取分类

  }


    addClass=()=>{
      let that = this;
      $('#forBtn').text('政务告知添加分类');
      $('#myModal').modal();
        // 添加分类模态框
      $('.modal .modal-content #upload').click(function(){
          let title=$('.modal-content #title').val();
          let parId=3;
          that.requestService.addGoverDealClass(title,that.communityId,that.tokenId).subscribe(res=>{
             $('#myModal').modal('hide');
               let btnCon=res.json().target;
               for(var x=0;x<btnCon.length;x++){
                  var typeCon='<div class="btn"  id="'+btnCon[x].id+'"><span>'+btnCon[x].name+'</span></div>';
                 $('.type').append(typeCon);
                 layer.msg('添加成功');
                }
             // 添加之后刷新页面数据
        })
      })
    }
    // 添加分类

    manageClass=($event)=>{
      $('.type .btn').each(function(){
          let has=$(this).children().is($('.panel-tools'));//判断是否包含关闭按钮
          if(!has){
            $(this).prepend('<div class="panel-tools"><a href="javascript:void(0);" class="editbox"><i class="fa fa-edit"></i></a><a href="javascript:void(0);" class="closebox"><i class="fa fa-times"></i></a></div>');
            // console.log($(this).children().html());
          }
          else{
            $(this).children('.panel-tools').remove();
            // console.log($(this).children().html());
          }
      })
      // 管理分类时，添加修改和删除按钮

      $('.btn .closebox').click( function(){
        let that = this;
         let deleteId=$(this).parent().parent().prop('id');
         // console.log(deleteId);
         layer.confirm('确定删除分类吗?', {icon: 3, title:'提示'}, function(index){
             layer.close(index);
             $.ajax({
               type : 'post',
               url : that.IP+'/web/deleteMatter',
               data : {
                  matterId : deleteId,
               },
               success : function(){
                 let dele = '#'+deleteId;
                 $(dele).remove();
               }
             })
             layer.msg('操作成功');
           },function(index){
             layer.close(index);
             layer.msg('操作取消');
         })
         // 自动平移补位，功能效果待补全;
       })
      // 删除分类（在each中循环click事件会使节点遍历更加复杂）

      $('.btn .editbox').click( function(){
        let that = this;
         let changeId=$(this).parent().parent().prop('id');
          $('#forBtn').text('修改分类');
          $('#myModal').modal();
         $('.modal .modal-content #upload').click(function(){
           let typeName=$('.modal-content #title').val();
             $.ajax({
               type : 'post',
               url : that.IP+'/web/updateMatter',
               data : {
                  matterId : changeId,
                  name : typeName,
                  tokenId : that.tokenId
               },
               success : function(){
                 $('#myModal').modal('hide');
                 let change = '#'+changeId;
                 $(change).children('span').text(typeName);
                 layer.msg('修改成功');
                 return;
               },erro:function(){
                 layer.msg('修改出错');
               }
             })
           })
       })
      //修改分类名字

    }
    // 分类管理

    moreArcticInfo=($event)=>{
     let ArcticId=$($event.target).parent().parent().prop('id');
     // console.log(ArcticId);
     this.router.navigate(['/home/info',ArcticId]);
    }
  //查看文章详情


    deleteArctic=($event)=>{
      let that = this;
      let deleteArcticId=$($event.target).parent().parent().prop('id');
      let cancel='';
      let pageId = $('.pagination li.active a').prop('id');
      let businessId=$('.hpanel .type .btn.btn-info span').prop('id');
      console.log(deleteArcticId);
      // this.requestService.pop(cancel);
      layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
           layer.close(index);
           $.ajax({
            type : 'post',
            url : that.IP+"/web/deletePublish",
            data : {
              publishId:deleteArcticId,
              tokenId : that.tokenId
            },
            success:function(){
              that.requestService.getPublishByClassification(this.communityId,this.pid,'','',that.tokenId).subscribe( res => {
                that.pages=[];//清空页码；
                that.list=res.json().target.beanList.slice().reverse();
                let pages_copy=res.json().target.totalPage;
                let pages_copy1=new Array();
                for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
              });
              // 删除过后刷新文章内容
              layer.msg('删除成功');
             }
            })
          },function(index){
            layer.close(index);
            layer.msg('操作取消');
          })
    }
    //删除文章

    changePage=($event)=>{
      let that = this;
      let pageId=$($event.target).text();
       $($event.target).parent().addClass('active').siblings().removeClass('active');
        this.requestService.getPublishByClassification(this.communityId,0,pageId,'',that.tokenId).subscribe( res=>{
        this.list = res.json().target.beanList;//.slice().reverse();
        this.pages=[];//清空页码；
        let pages_copy=res.json().target.totalPage;
        let pages_copy1=new Array();
        for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
        console.log( this.list );
      })
    }
    // 分页更改显示内容


}
