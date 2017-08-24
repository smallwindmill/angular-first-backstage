import { Component, OnInit ,AfterContentChecked, OnDestroy ,AfterViewChecked} from '@angular/core';
import { HttpModule, Http} from '@angular/http';
import { RequestService} from '../../services/request.service';
import { Router,ActivatedRoute} from '@angular/router';

declare var $  : any;
declare var layui  : any;
declare var layer  : any;
declare var E  : any;
declare var editor2  : any;


@Component({
  selector: 'app-news-template',
  templateUrl: './news-template.component.html',
  styleUrls: ['./news-template.component.css']
})

export class NewsTemplateComponent implements OnInit,AfterViewChecked{
    picture : object;imglist : any;
    communityId : any;
    pid : any;
    url : any;
    picId : any;

    tokenId : any;
    IP : string;


    upLoadArc:any;

    constructor(private http:Http,private requestService:RequestService,private activatedRoute:ActivatedRoute,private router :Router) { }


    ngOnInit() {

      let that = this;
      this.tokenId = sessionStorage.tokenId;


      this.IP = this.requestService.IP;


      let content='';let index='';
      this.communityId = sessionStorage.communityId;

      this.activatedRoute.params.subscribe(params=>{
        this.pid = params.pid;
        if(this.pid==8){
          this.url=this.IP+'/web/getMatter';
        }else{
          this.url=this.IP+'/web/getClassification';
        }
      })

      this.requestService.getParentClassification(this.tokenId).subscribe(res=>{
        if(res.json().code==0){
          for (var i = 0; i <res.json().target.length; i++) {
            if(res.json().target[i].id==this.pid){
             document.title="社区/" + res.json().target[i].name+'/发布文章';
            }
          }
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         that.router.navigate(['/login']);
        }
      })
      // 获取大分类


      $('#just_js').remove();

      var script = document.createElement('script');
      script.type = 'text/javascript-lazy';
      script.src = "assets/js/new.js";
      script.id = "just_js";
      $('body').append(script);

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

      $.ajax({
       type : 'get',
       url : that.url,
       data : {
         pid : that.pid,
         communityId : that.communityId,
         tokenId : that.tokenId
       },
       success:function(data){
          var btnCon=data.target;
          for(var x=0;x<btnCon.length;x++){
            var typeCon='<div class="btn"  id="'+btnCon[x].id+'">'+btnCon[x].name+'</div>';
            $('.type').append(typeCon);
          }
           $('.type .btn').eq(0).addClass('btn-info');
          btnChoice();
          $("#loading_con").fadeOut();
        }
      })//获取分类

      let btnChoice=()=>{
        $('.type .btn').on('click',function(){
          $(this).addClass('btn-info').siblings().removeClass('btn-info');
        })
      }
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })


     this.upLoadArc=()=>{
        let title = $('#title').val();
        let content = editor2.txt.html();
        /*layui.use('layedit', function(){
          var layedit = layui.layedit;
          content=layedit.getContent(index);
        });*/
        let typeId_arr = new Array();
        let typeId = '';
        typeId_arr.push($('.type .btn.btn-info').prop('id'));
        typeId=typeId_arr.join();
        $.ajax({
          type : 'post',
          url : that.IP+'/web/newPublish',
          data : {
            communityId : that.communityId,
            title : title,
            content : content,
            picId : that.picId,
            creatorId : sessionStorage.accountid,
            businessId : typeId,
            pid : that.pid,
            tokenId : that.tokenId
          },
          success : function(data){
            if(data.code==0){
              $('#title').val('');
              editor2.txt.html(' ');
              $('.file-preview-frame.krajee-default.kv-preview-thumb').remove();
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

    }

    UpLoad=()=>{
     if($('#title').val().length==0||$('#title').val()==''){
       layer.msg('标题不能为空');return;
     }
     if($('#title').val().length>6){
       layer.msg('标题不能超过六个字');return;
     }
     if(editor2.txt.html().length==''||editor2.txt.html().length==undefined){
       layer.msg('文章内容不能为空');return;
     }
     if(!$("#addfile").val()){
       layer.msg('图片不能为空');return;
     }
     let that = this;
     var formData = new FormData();
     var name = $("#addfile").val();
     formData.append("file",$("#addfile")[0].files[0]);
     formData.append("name",name);
     console.log(that.IP)
     $.ajax({
       url : that.IP+'/upload.do',
       type : 'POST',
       data : formData,
       processData : false,
       contentType : false,
       beforeSend:function(){
       // console.log("正在进行，请稍候");
      },
       success : function(data) {
         if(data.code==0){
          that.picId = data.target.fid;
          that.upLoadArc();
         }else if(data.code==3){
          layer.msg('登录超时，请重新登录');
          this.router.navigate(['/login']);
        }
         layer.msg(data.text);
       },
         error : function(data) {
         layer.msg('网络错误');
       }
     })
    }
     // 发布文章



   ngAfterViewChecked(){

   }

}


