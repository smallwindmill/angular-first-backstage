import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service';


declare var $ : any;
declare var layer : any;
declare var layui : any;
declare var appkit : any;
declare var editor2 : any;

@Component({
  selector: 'app-infor-mation',
  templateUrl: './infor-mation.component.html',
  styleUrls: ['./infor-mation.component.css']
})
export class InforMationComponent implements OnInit {
  actId : any;
  communityId : any;
  url : any;
  pid : any;
  picId : any;
  simple : any;


  tokenId : string;
  IP : string;

  upLoadArc : any;
  btnChoice : any;

  constructor(private router:Router,private activeRouter:ActivatedRoute,private requestService : RequestService) { }

  ngOnInit() {

    $('#loading_con').fadeOut();

    this.tokenId = sessionStorage.tokenId;

    // this.IP = 'http://112.124.15.205:8090';
     this.IP = this.requestService.IP;

    /*var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.src = 'assets/js/new.js';     //填自己的js路径
    $('body').append(script);*/

   /* var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.src = 'assets/js/appkit.js';     //填自己的js路径
    $('body').append(script);*/

    var script1 = document.createElement('script');
    script1.type = 'text/javascript-lazy';
    script1.src = "assets/plug/wangEditor.min.js";
    $('body').append(script1);

    var script2 = document.createElement('script');
    script2.type = 'text/javascript-lazy';
    script2.src = "assets/js/edit.js";
    $('body').append(script2);


    var script3 = document.createElement('script');
    script3.type = 'text/javascript-lazy';
    script3.src = "assets/plug/btsp-fileinput/js/fileinput.min.js";
    $('body').append(script3);


    this.activeRouter.params.subscribe(params => {
      // 读取url信息
      this.actId = params.id;
    })

    this.communityId = sessionStorage.communityId;
    this.picId = sessionStorage.picId;

    let that = this;
      // console.log(this);


    that.btnChoice=()=>{
      $('.type .btn').on('click',function(){
        $(this).addClass('btn-info').siblings().removeClass('btn-info');
      })
    }
    // 分类选择(选择一个)

    this.simple=$.ajax({
     type : 'get',
     url : that.IP+'/getSimplePublish',
     async : false,
     data : {
       publishId : that.actId,
       tokenId : that.tokenId
     },
     success:function(data){
      if(data.code==0){
        that.pid = data.target.pid;
        let btnCon=data.target.id;
        let businessName="";
        let businessId=data.target.businessId;
         $('.media-body #title').append(data.target.title);
         $('.write-post-container #title').val(data.target.title);
         $('#createtime').append(data.target.createTime);
         $('#creator').append(data.target.creatorName);

         that.requestService.getParentClassification(that.tokenId).subscribe(res=>{
           if(res.json().code==0){
             for (var i = 0; i <res.json().target.length; i++) {
               if(res.json().target[i].id==that.pid){
                  document.title='社区/'+res.json().target[i].name+'/文章详情';
               }
             }
           }else if(res.json().code==3){
            layer.msg('登录超时，请重新登录');
            that.router.navigate(['/login']);
           }
         })
      // 获取大分类


         $('.media-body #content').append(data.target.content);
         editor2.txt.html(data.target.content);
         $.ajax({
            type : 'get',
            url : that.IP+'/web/getClassification',
            data : {
              pid : that.pid,
              communityId : that.communityId,
              tokenId : that.tokenId
            },
            success:function(data){
              if(data.code==0){
                var color=['label label-default','label label-primary','label label-info','label label-success','label label-warning','label label-danger'];
                for(let i=0;i<data.target.length;i++){
                  let ch=Math.random()*(color.length);
                  let x=Math.ceil(ch);
                  if(data.target[i]==""){return;}
                  if(data.target[i].id == businessId){
                    let Con='<div class="'+color[x-1]+'"><span>'+ data.target[i].name+'</span></div>';
                     $('.media-body .type').append(Con);
                  }
                }
                // 详情页展示对应分类
                var btnCon=data.target;
                for(var x=0;x<btnCon.length;x++){
                  if(btnCon[x].id==businessId){
                    var typeCon='<div class="btn btn-info"  id="'+btnCon[x].id+'">'+btnCon[x].name+'</div>';
                    $('.write-post-container .type').append(typeCon);
                  }else{
                    var typeCon='<div class="btn"  id="'+btnCon[x].id+'">'+btnCon[x].name+'</div>';
                    $('.write-post-container .type').append(typeCon);
                  }
                  // console.log(businessId)
                  if($('.write-post-container .type .btn.btn-info').length<1){
                    $('.write-post-container .type .btn').eq(0).addClass('btn-info');
                  }
                }
                that.btnChoice();
                // 编辑页显示所有分类
              }
            }
         })
      }else if(data.code==3){
          layer.msg('登录超时，请重新登录');
          this.router.navigate(['/login']);
       }
     }
    })
      // $('#loading_con').fadeOut();


  }

     editArc=($event)=>{
       let that = this;let index="";let content = "";
       $('.write-post-container').removeClass('hide');
       $('.moreArcInfo').addClass('hide');
          $.ajax({
           type : 'get',
           url : that.url,
           data : {
             pid : that.pid,
             communityId : that.communityId,
             tokenId : that.tokenId
           },
           success:function(data){
             if(data.code==3){
              layer.msg('登录超时，请重新登录');
              this.router.navigate(['/login']);
             }

            // 避免函数内调用angular的this时与jQuery混杂
            // location.reload();
            }
          })//获取分类

        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })
     }
     // 修改文章

     returnArc=()=>{
       $('.write-post-container').addClass('hide');
       $('.moreArcInfo').removeClass('hide');
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })
     }
     // 退出修改文章


    upLoad=()=>{
     if($('.write-post-container #title').val().length==0||$('.write-post-container #title').val()==''){
       layer.msg('标题不能为空');return;
     }
     if($('.write-post-container #title').val().length>6){
       layer.msg('标题不能超过六个字');return;
     }
     if(editor2.txt.html().length==''||editor2.txt.html().length==undefined){
       layer.msg('文章内容不能为空');return;
     }

     let that = this;
     var formData = new FormData();
     var name = $(".write-post-container #addfile").val();
     formData.append("file",$(".write-post-container #addfile")[0].files[0]);
     formData.append("name",name);
     $.ajax({
       url : that.IP+'/upload.do',
       type : 'POST',
       data : formData,
       async: false,
       processData : false,
       contentType : false,
       success : function(data) {
         if(data.code==0){
           that.picId = data.target.fid;
         }else if(data.code==3){
            layer.msg('登录超时，请重新登录');
            this.router.navigate(['/login']);
           }
         // layer.msg(data.text);
       },
         error : function(data) {
         // layer.msg('网络错误');
       }
     })

     that.upLoadArc=()=>{
       let title = $('.write-post-container #title').val();
       let content = editor2.txt.html();
       let typeId_arr = new Array();
       let typeId = '';
       typeId_arr.push($('.write-post-container .type .btn.btn-info').prop('id'));
       typeId=typeId_arr.join();
       $.ajax({
         type : 'post',
         url : that.IP+'/web/updatePublish',
         data : {
           communityId : that.communityId,
           title : title,
           content : content,
           picId : that.picId,
           creatorId : sessionStorage.accountid,
           businessId : typeId,
           pid : that.pid,
           publishId : that.actId,
           tokenId : that.tokenId
         },
         success : function(data){
           if(data.code==0){
             $('#title').val('');
             editor2.txt.html(' ');
             $('.file-preview').remove();
             that.router.navigate(['/home/goverInfo',that.pid]);
           }else if(data.code==3){
            layer.msg('登录超时，请重新登录');
            this.router.navigate(['/login']);
           }
             layer.msg(data.text);
         }
       })
     }
     // 上传文章

     that.upLoadArc();

    }
    //上传图片+发布文章


    goBack=($event)=>{
      window.history.go(-1);
    }



}
