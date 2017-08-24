import { Component, OnInit } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { RequestService } from '../../../services/request.service';

  declare var $:any;
  declare var layer:any;

@Component({
  selector: 'app-electronic-board',
  templateUrl: './electronic-board.component.html',
  styleUrls: ['./electronic-board.component.css']
})
export class ElectronicBoardComponent implements OnInit {
  communityId : any;
  pids : any;

  picId : any;
  templateIdCon : any;

  devices : any;videoName : any;videoId : any;
  business : any;

  userShow : any;

  tokenId : string;
  IP : string;
  wechat : any;

  UpLoadImg : any;
  shouldHide : any;
  constructor(private http:Http,private requestService:RequestService, private router:Router) { }



  ngOnInit() {

    $('#loading_con').fadeIn();
    document.title='社区/电子屏管理';


    this.communityId = sessionStorage.communityId;
    this.userShow = sessionStorage.accountNo;
    this.tokenId = sessionStorage.tokenId;

    this.templateIdCon = 1;
    // this.IP = 'http://112.124.15.205:8090';
    this.IP = this.requestService.IP;

    this.wechat=['',''];

    $('#just_js').remove();

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    // script.src = "assets/plug/jquery.form.min.js";
    script.src = "assets/js/new.js";
    script.id = "just_js";
    $('body').append(script);

     var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    // script.src = "assets/plug/jquery.form.min.js";
    script.src = "assets/plug/btsp-fileinput/js/fileinput.min.js"
    $('body').append(script);


    this.requestService.getContent(this.communityId,this.tokenId).subscribe(res=>{
      if(res.json().code==0){
        this.devices = res.json().target;
      }else if(res.json().code==3){
       layer.msg('登录超时，请重新登录');
       this.router.navigate(['/login']);
     }
    $('#loading_con').fadeOut();
    },error=>{
      if(error.type==3){
        // layer.msg('登录超时，请重新登录');
        alert('登录超时，请重新登录');
        // layer.confirm('登录超时，请重新登录',{title:'提示'},function(index){
          this.router.navigate(['/login']);
        // })

      }
    })
    // 获取所有电子屏内容

     this.requestService.getWebAddress(this.communityId,this.tokenId).subscribe(res=>{
       if(res.json().code==0){
        this.wechat = res.json().target;
       }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
    })
    // 获取公众号配置地址

    let that = this;

   $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })


    this.requestService.getVideo(this.communityId,this.tokenId).subscribe(res=>{
      this.videoName = res.json().target.name;
      this.videoId = res.json().target.id;
      // console.log(this.videoId)
    })
    // 获取视频

    this.UpLoadImg=()=>{
       let that = this;
       var formData = new FormData();
       var name = $("#addfile").val();
       formData.append("file",$("#icon")[0].files[0]);
       formData.append("name",name);
       $.ajax({
         url : that.IP+'/upload.do',
         type : 'POST',
         data : formData,
         async : false,
         processData : false,
         contentType : false,
         beforeSend:function(){
         // console.log("正在进行，请稍候");
        },
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
           layer.msg('网络错误');
         }
       })
    }
    //上传图片



    this.shouldHide=() => {
        $('#myModal-moreEleInfo .glyphicon-edit.text-danger').removeClass('glyphicon-edit text-danger').addClass('glyphicon-pencil');
        $('#myModal-moreEleInfo #cancel').text('确定').addClass('btn-primary').removeClass('btn-danger');
        $('#myModal-moreEleInfo #upload').addClass('hide').fadeOut();
        $('#myModal-moreEleInfo input').each(function(){$(this).prop('disabled',true);})
        $('#myModal-moreEleInfo #pid').removeClass('hide');
        $('#myModal-moreEleInfo #businessId').removeClass('hide');
        $('#myModal-moreEleInfo #pid_choice').addClass('hide');
        $('#myModal-moreEleInfo #businessId_choice').addClass('hide');
        $('#myModal-moreEleInfo .icon_img').removeClass('hide');
        $('#myModal-moreEleInfo .icon_img_1').addClass('hide');
        $('#myModal-moreEleInfo .template_choice').addClass('hide');
        $('#myModal-moreEleInfo .template').removeClass('hide');
       $('#myModal-moreEleInfo #pidCon').addClass('hide');
       $('#myModal-moreEleInfo #businessIdCon').addClass('hide');
       $('#myModal-moreEleInfo #classificationNameCon').removeClass('hide');
       $('input').val('');
       $('.file-preview .file-preview-thumbnails>div').remove();
       $('input').siblings('.showRed').text('');
        $('input').parent().removeClass('has-error');
        $('body').attr('ver','');
    }
    // 编辑切换更多详情显示


    $('form input').blur(function(){
           var $parent = $(this).parent();
           //验证社区名
           if( $(this).is('#name') ){
              if( this.value==""){
                $(this).siblings('.showRed').text('显示名称不能为空');
                $(this).parent().addClass('has-error');
                $('#upload').prop('disabled',true);
                $('body').attr('ver',1);
              }else{
                $(this).siblings('.showRed').text('');
                $(this).parent().removeClass('has-error');
                $('#upload').prop('disabled',false);
                $('body').attr('ver','');
              }
           }
           //验证管理员名字
           if( $(this).is('#icon') ){
              if( this.value==""){
                $(this).siblings('.showRed').text('图片不能为空');
                $(this).parent().addClass('has-error');
                $('#upload').prop('disabled',true);
                $('body').attr('ver',1);
              }else{
                $(this).siblings('.showRed').text('');
                $(this).parent().removeClass('has-error');
                $('#upload').prop('disabled',false);
                $('body').attr('ver','');
              }
           }
           //验证账号
           if( $(this).is('#accountNo') ){
             if( this.value=="" || ( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
                $(this).siblings('.showRed').text('请输入正确的E-Mail地址');
                $(this).parent().addClass('has-error');
                $('#upload').prop('disabled',true);
                $('body').attr('ver',1);
              }else{
                $(this).siblings('.showRed').text('');
                $(this).parent().removeClass('has-error');
                $('#upload').prop('disabled',false);
                $('body').attr('ver','');
              }
           }
            //验证密码
           if( $(this).is('#password') ){
              if( this.value=="" || this.value.length < 6 ){
                $(this).siblings('.showRed').text('密码至少六位数');
                $(this).parent().addClass('has-error');
                $('#upload').prop('disabled',true);
                $('body').attr('ver',1);
              }else{
                $(this).siblings('.showRed').text('');
                $(this).parent().removeClass('has-error');
                $('#upload').prop('disabled',false);
                $('body').attr('ver','');
              }
           }
            //验证密码
           if( $(this).is('#rePassword') ){
             if( this.value=="" || this.value.length < 6 || this.value!=$('#password').val() ){
                $(this).siblings('.showRed').text('两次密码不一致');
                $(this).parent().addClass('has-error');
                $('#upload').prop('disabled',true);
                $('body').attr('ver',1);
              }else{
                $(this).siblings('.showRed').text('');
                $(this).parent().removeClass('has-error');
                $('#upload').prop('disabled',false);
                $('body').attr('ver','');
              }
           }
           // 验证手机号
           if( $(this).is('#phoneNumber') ){
             if( this.value=="" || ( this.value!="" && !/^1[34578]\d{9}$/.test(this.value) ) ){
                $(this).siblings('.showRed').text('请输入正确手机号码');
                $(this).parent().addClass('has-error');
                $('#upload').prop('disabled',true);
                $('body').attr('ver',1);
              }else{
                $(this).siblings('.showRed').text('');
                $(this).parent().removeClass('has-error');
                $('#upload').prop('disabled',false);
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



  }


    deleteContent=($event)=>{
      let that = this;//console.log($event.target.id)
      layer.confirm('确定删除吗?', {icon: 7, title:'提示'}, function(index){
        that.requestService.deleteContent($event.target.id,that.tokenId).subscribe(res=>{
            if(res.json().code==0){
              layer.close(index);
              layer.msg("删除成功!");
              that.requestService.getContent(that.communityId,that.tokenId).subscribe(res=>{
                  if(res.json().code==0){
                    that.devices = res.json().target;
                  }else if(res.json().code==3){
                   layer.msg('登录超时，请重新登录');
                   this.router.navigate(['/login']);
                 }
              })
              // 删除后刷新数据
            }else if(res.json().code==3){
             layer.msg('登录超时，请重新登录');
             this.router.navigate(['/login']);
           }
        })
      })
    }
    // 删除电子屏内容

    moreEleContent=($event)=>{
        let Id=$event.target.id;
        $('#myModal-moreEleInfo').modal();
        $('#myModal-moreEleInfo').attr('eleId',Id);
        $('#myModal-moreEleInfo #forBtn').text('电子屏内容');
        // $('#edit span').removeClass('glyphicon-edit text-danger');
        $('#myModal-moreEleInfo #upload').fadeOut().delay(4000);
        $('#myModal-moreEleInfo input').each(function(){$(this).prop('disabled',true);})
         this.requestService.getSimpleElectronicScreen(Id,this.tokenId).subscribe( res=>{
           if(res.json().code==0){
              let eleArry=res.json().target;
              $('#myModal-moreEleInfo #name').val(eleArry.name);
              $('.icon_img img').prop('src',eleArry.picUrl);
              $('#myModal-moreEleInfo #introduce').val(eleArry.introduce);
              $('#myModal-moreEleInfo #pid').val(eleArry.pid);
              $('#myModal-moreEleInfo #businessId').val(eleArry.businessId);
              $('#myModal-moreEleInfo #classificationName').val(eleArry.classificationName);
              this.templateIdCon = eleArry.templateId;
           }else if(res.json().code==3){
             layer.msg('登录超时，请重新登录');
             this.router.navigate(['/login']);
           }
        })
            $('#myModal-moreEleInfo').modal();
    }
    // 更多电子屏内容

    edit=($event)=>{
     let that = this;
      if(!$($event.target).hasClass('glyphicon-edit text-danger')){
        $($event.target).addClass('glyphicon-edit text-danger ').removeClass('glyphicon-pencil');
         $('#myModal-moreEleInfo input').each(function(){$(this).prop('disabled',false);})
         $('#myModal-moreEleInfo #upload').removeClass('hide').fadeIn();
         $('#myModal-moreEleInfo #cancel').text('取消').removeClass('btn-primary').addClass('btn-danger');
          $('#myModal-moreEleInfo #pid').addClass('hide');
         $('#myModal-moreEleInfo #businessId').addClass('hide');
         $('#myModal-moreEleInfo #pid_choice').removeClass('hide');
         $('#myModal-moreEleInfo #businessId_choice').removeClass('hide');
         $('#myModal-moreEleInfo .icon_img').addClass('hide');
         $('#myModal-moreEleInfo .icon_img_1').removeClass('hide');
         $('#myModal-moreEleInfo .template').addClass('hide');
         $('#myModal-moreEleInfo .template_choice').removeClass('hide');
         $('#myModal-moreEleInfo #pidCon').removeClass('hide');
         $('#myModal-moreEleInfo #businessIdCon').removeClass('hide');
         $('#myModal-moreEleInfo #classificationNameCon').addClass('hide');
         that.requestService.getParentClassification(that.tokenId).subscribe(res=>{
           if(res.json().code==0){
             that.pids = res.json().target;
           }else if(res.json().code==3){
             layer.msg('登录超时，请重新登录');
             this.router.navigate(['/login']);
           }
         })
         that.requestService.getClassification(that.communityId,3,that.tokenId).subscribe(res=>{
           if(res.json().code==0){
             that.business = res.json().target;
           }else if(res.json().code==3){
             layer.msg('登录超时，请重新登录');
             this.router.navigate(['/login']);
           }
         })
      }else{
        $('#myModal-moreEleInfo .glyphicon-edit.text-danger').removeClass('glyphicon-edit text-danger').addClass('glyphicon-pencil');
        $('#myModal-moreEleInfo #cancel').text('确定').addClass('btn-primary').removeClass('btn-danger');
        $('#myModal-moreEleInfo #upload').addClass('hide').fadeOut();
        $('#myModal-moreEleInfo input').each(function(){$(this).prop('disabled',true);})
        $('#myModal-moreEleInfo #pid').removeClass('hide');
        $('#myModal-moreEleInfo #businessId').removeClass('hide');
        $('#myModal-moreEleInfo #pid_choice').addClass('hide');
        $('#myModal-moreEleInfo #businessId_choice').addClass('hide');
        $('#myModal-moreEleInfo .icon_img').removeClass('hide');
        $('#myModal-moreEleInfo .icon_img_1').addClass('hide');
        $('#myModal-moreEleInfo .template_choice').addClass('hide');
        $('#myModal-moreEleInfo .template').removeClass('hide');
       $('#myModal-moreEleInfo #pidCon').addClass('hide');
       $('#myModal-moreEleInfo #businessIdCon').addClass('hide');
       $('#myModal-moreEleInfo #classificationNameCon').removeClass('hide');
      }
    }

    changeEleUpload=($event)=>{

      $('#myModal-moreEleInfo form input').trigger('blur');
      if($('body').attr('ver')){return false;}

      let UpLoadContent=()=>{
       let that = this;
       var formData = new FormData();
       var name = $("#myModal-moreEleInfo #icon").val();
       formData.append("file",$("#myModal-moreEleInfo #icon")[0].files[0]);
       formData.append("name",name);
       $.ajax({
         url : that.IP+'/upload.do',
         type : 'POST',
         async : false,
         data : formData,
         processData : false,
         contentType : false,
         beforeSend:function(){
         // console.log("正在进行，请稍候");
        },
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
           layer.msg('网络错误');
         }
       })
      }
      UpLoadContent();
      let page="";
      let eleId=$('#myModal-moreEleInfo').attr('eleId');
      let name=$('#myModal-moreEleInfo #name').val();
      let introduce=$('#myModal-moreEleInfo #introduce').val();
      let pid= $('#myModal-moreEleInfo #pid_choice option:selected').prop('id');
      let pidName=$('#myModal-moreEleInfo #pid_choice option:selected').text();
      let businessId=$('#myModal-moreEleInfo #businessId_choice option:selected').prop('id');
      let businessName=$('#myModal-moreEleInfo #businessId_choice option:selected').text();
      this.picId = (this.picId==undefined)?"":this.picId;
      let templateId=$('#myModal-moreEleInfo .template_choice input:radio:checked').prop('id');
      let classificationName=(businessId=='zero')?(pidName):(businessName);
      businessId = (businessId=='zero')?(""):(businessId);
      this.requestService.updateContent(eleId,name,this.picId,businessId,pid,introduce,templateId,classificationName,this.tokenId).subscribe(res=>{
        // console.log(res.json().target);
        if(res.json().code==0){
          $('#myModal-moreEleInfo').modal('hide');
          this.shouldHide();
          this.requestService.getContent(this.communityId,this.tokenId).subscribe(res=>{
            this.devices = res.json().target;
          })
         }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
         layer.msg(res.json().text);
      // 刷新电子屏内容
      })
    }
    // 修改电子屏内容

    addContent=($event)=>{
       let that = this;
       if($('table#example1 tbody tr').length>=9){
         layer.msg('最多只能添加九条，请删除后再操作');
         return;
       }

        let len=$(this).text();
        $('#myModal-addContent #forBtn').text('新增内容');
        //通过点击的按钮获取进行的操作;
        that.requestService.getParentClassification(that.tokenId).subscribe(res=>{
          if(res.json().code==0){
            that.pids = res.json().target;
          }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
        })
        that.requestService.getClassification(that.communityId,3,that.tokenId).subscribe(res=>{
          if(res.json().code==0){
            that.business = res.json().target;
          }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
        })
        // 最初获取分类模块显示内容
        $('#myModal-addContent').modal();
    }
    // 新增电子屏内容
    UpLoadContent=($event)=>{
      $('#myModal-addContent form input').trigger('blur');
      if($('body').attr('ver')){return false;}
      this.UpLoadImg();
      let name=$('#myModal-addContent #name').val();
      let introduce=$('#myModal-addContent #introduce').val();
      let pid=$('#myModal-addContent #pid option:selected').prop('id');
      let pidName=$('#myModal-addContent #pid option:selected').text();
      let businessId=$('#myModal-addContent #businessId option:selected').prop('id');
      let businessName=$('#myModal-addContent #businessId option:selected').text();
      // 三元表达式的执行顺序
      this.picId = (this.picId==undefined)?"":this.picId;
      let templateId=$('#myModal-addContent .template_choice input:radio:checked').prop('id');
      let classificationName=(businessId=='zero')?(pidName):(businessName);
      businessId = (businessId=='zero')?(""):(businessId);
      // 此处由于businessId发生变化，所以两者前后顺序至关重要;
      this.requestService.addContent(name,this.picId,introduce,pid,businessId,templateId,this.communityId,classificationName,this.tokenId).subscribe(res=>{
          if(res.json().code==0){
            $('#myModal-addContent').modal('hide');
            this.requestService.getContent(this.communityId,this.tokenId).subscribe(res=>{
                    this.devices = res.json().target;
            })
            layer.msg(res.json().text);
          }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
      },erro=>{
            layer.msg('网络错误');
          })
    }
    // 新增

    findBusiness=($event)=>{
      var pid_1=$($event.target).find("option:selected").prop('id');
      if(pid_1==8){
        this.requestService.getGoverDealClass(this.communityId,this.tokenId).subscribe(res=>{
          this.business = res.json().target;
        })
      }else{
        this.requestService.getClassification(this.communityId,pid_1,this.tokenId).subscribe(res=>{
          this.business = res.json().target;
        })
      }
    }
    // 父类模块和子类模块查询

    upLoadVideoOne=($event)=>{
      if($('#tableVideo tbody tr a').prop('id')){
        layer.msg('只能添加一个视频，请删除后重试');
      }else{
        $('.video #video-input').trigger('click');
      }
    }

    upLoadVideo=()=>{
     let that = this;
     var formData = new FormData();
     var name = $("#video-input").val();
     // if(name.indexOf('.mp4')==-1){layer.msg('视频格式不正确，请检查后重试');return;}
     formData.append("file",$("#video-input")[0].files[0]);
     formData.append("name",name);
     $.ajax({
       url : that.IP+'/upload.do',
       type : 'POST',
       data : formData,
       async: false,
       processData: false,
       contentType: false,
       beforeSend:function(){
         $('body #loading_con').show();
         $('body #loading_con #msg').text('上传中...');
      },
       success : function(data) {
         if(data.code==0){
           let videoId_2 = data.target.fid;
           that.requestService.addVideo(that.communityId,videoId_2,that.tokenId).subscribe(res=>{
             if(res.json().code==0){
              layer.msg('视频上传成功');
              that.requestService.getVideo(that.communityId,that.tokenId).subscribe(res=>{
                  if(res.json().code==0){
                    that.videoName = res.json().target.name;
                    that.videoId = res.json().target.id;
                  }else if(res.json().code==3){
                   layer.msg('登录超时，请重新登录');
                   this.router.navigate(['/login']);
                 }
                // console.log(this.videoId)
              })
              // 获取视频
            }
           })
         }else if(data.code==3){
           layer.msg('仅支持mp4文件');
         }
         layer.msg(data.text);
         $('#loading_con').fadeOut();
       },
         error : function(data) {
         layer.msg('网络错误');
         $('#loading_con').fadeOut();
         $('body #loading_con #msg').text('加载中...');
       }
     })
    }
    // 上传视频

    deleteVideo=($event)=>{
      let that = this;//console.log($event.target.id)
      layer.confirm('确定删除该视频吗?', {icon: 7, title:'提示'}, function(index){
        that.requestService.deleteVideo($event.target.id,that.tokenId).subscribe(res=>{
          if(res.json().code==0){
            layer.close(index);
            layer.msg("删除成功");
            that.requestService.getVideo(that.communityId,that.tokenId).subscribe(res=>{
                that.videoId = res.json().target.id;
                that.videoName = res.json().target.name;
            })
            // 删除后刷新数据
          }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
          }else{
           layer.msg("删除出错");}
        })
      })
    }
    // 删除电子屏内容





}
