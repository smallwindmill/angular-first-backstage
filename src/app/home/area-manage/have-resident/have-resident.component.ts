import { Component, OnInit } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { RequestService } from '../../../services/request.service';
import { ActivatedRoute,Router } from '@angular/router';

declare var $: any;
declare var layer: any;
// declare var showLists: any;

@Component({
  selector: 'app-have-resident',
  templateUrl: './have-resident.component.html',
  styleUrls: ['./have-resident.component.css']
})

export class HaveResidentComponent implements OnInit {
   members : any;
   // showLists : any;
   departments : any;
   departmentsOne : any;
   departmentsTwo : any;
   departmentsThree : any;
   departmentsFour : any;
   departmentsFive : any;
   departmentsSix : any;
   departmentsSeven : any;
   departmentsEight : any;
   pages : any;departmentId : any;

   level : any;
   communityId :any;

   tokenId : string;
   IP :string;
   userShow :any;

   deleteMembers:any;
   shouldHide : any;
   formVer : any;

   oldId : any;

  constructor(private http:Http,private requestService:RequestService,private activeRouter:ActivatedRoute,private router:Router) {
    }


  ngOnInit() {

    $('#loading_con').fadeIn();
    document.title='社区/辖区管理';

    $('#just_js').remove();

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.src = "assets/js/new.js";
    script.id = "just_js";
    $('body').append(script);

    this.userShow = sessionStorage.accountNo;
    this.communityId = sessionStorage.communityId;
    this.tokenId = sessionStorage.tokenId;

    this.IP = this.requestService.IP;

   this.activeRouter.params.subscribe(params => {
     if( params.id ){
       this.communityId =  params.id;
     }
   })


    this.pages =new Array();
    let that=this;


    let departmentsBasic= this.requestService.getAllDeparent(this.communityId,'','',this.tokenId).subscribe( res=>{
      if(res.json().code==0){
        if(res.json().target==""){layer.msg('此部门无数据');return;}
        this.departments = res.json().target;
         $('#partName').text( this.departments[0].name );
        this.oldId = this.departments[0].id;
        $('#partName').attr('depart-id',this.oldId);
        if( $('#partName').attr('depart-id')!=undefined){

        }else{
          alert("请选择子部门");
        }
      }else if(res.json().code==3){
       layer.msg('登录超时，请重新登录');
       this.router.navigate(['/login']);
      }
      // console.log(this.oldId);

      this.requestService.getMembers(this.communityId,this.oldId,1,this.tokenId).subscribe( res=>{
        if(res.json().code==0){
          this.members = res.json().target.users;//.slice().reverse();
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
          $('.place-background').eq(0).addClass('active');
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
      })
      $('#loading_con').fadeOut();
      // 获取成员
    })
    // 获取初级部门


    this.deleteMembers=$('#deleteMembers').click(function($event){
      let pageId='';let that = this;
      that.departmentId = $('#partName').attr('depart-id');
      $('table#example1 tfoot td li').each(function(){
        if($(this).hasClass('active')){
          pageId=$(this).children().text();
        }
      })
        let arrDeleteId=new Array();
        $('table#example1 tbody input').each(function(i){
          if($(this).prop('checked')){
             arrDeleteId.push($(this).prop('id'));
          }
        })
        if(!arrDeleteId.length){
          layer.msg('选中零个，操作退出');
          $('#action').delay(4000).val('操作');
          return;
        }
        layer.confirm('确定全部删除?', {icon:7, title:'提示'}, function(index){
        //do something
        let arrDelete=arrDeleteId.join();
        // 将勾选项目加入一个数组
        console.log(arrDelete);
          $.ajax({
            type : 'post',
            url : that.IP+'/web/deleteMember',
            data : {
              member : arrDelete,
              tokenId : that.tokenId
            },
            success:function(data){
              if(data.code==0){
               that.requestService.getMembers(that.communityId,that.departmentId,pageId).subscribe( res=>{
                that.pages=[];
                that.members = res.json().target.users;
                let pages_copy=res.json().target.totalPage;
                for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
                layer.msg(res.json().text);
              })
              }else if(data.code==3){
                layer.msg('登录超时，请重新登录');
                this.router.navigate(['/login']);
              }
            }
          })
        layer.close(index);
        });
      $('#action').val('操作');
    })
    // 批量删除小区成员

    var script = document.createElement('script');
    script.type = 'text/javascript-lazy';
    script.src = 'assets/js/new.js';     //填自己的js路径
    $('body').append(script);



    $('table#example1 #all').click(function(){
        let count = 0;
        $('table#example1 tbody input[type="checkbox"]').each(function(){
         if($('table#example1 #all').prop('checked')){
           $(this).prop('checked',true);
           count++;
           // $('table#example1 #all').parent().find('span').text('全不选');
         }else{
           $(this).prop('checked',false);
           // $('table#example1 #all').parent().find('span').text('全选');
         }
       })
        $('#countCon').text(count);
    })// 全选与全不选

    $('table#example1').change(function(){
      var i=0;
      $('table#example1 tbody input[type="checkbox"]').each(function(){
       if(!$(this).prop('checked')){
         // console.log($(this).parent().parent().html());
         i++;
       }
      })
      if(i>0){
       // $('table#example1 #all').parent().find('span').text('全不选');
       $('table#example1 #all').prop('checked',false);}else{
         // $('table#example1 #all').parent().find('span').text('全选');
         $('table#example1 #all').prop('checked',true);}
    })

   /* $('table#example1 #other').click(function(){
      $('table#example1 tbody input[type="checkbox"]').each(function(){
        console.log($(this).prop("checked"));
         if($(this).prop('checked')){
           $(this).prop('checked',false);
         }else{
           $(this).prop('checked',true);
         }
      })
    })//表格操作 反选*/

   /* $('.side-user li').each(function(){
      var icon='<span class="fa fa-folder"></span>';
        // console.log($(this).find('ul').css('display')+','+$(this).find('span').is('.fa'));
      // $(this).find('li').height(0);
      if($(this).find('ul').css('display')!=undefined&&$(this).find('span').is('.fa')==false){
         $(this).children('a').prepend(icon);
      }
      else{
        $(this).children('a .fa.fa-icon').remove();
      }
    })*/

    this.shouldHide=() => {
      $('#myModal-moreMemberInfo .glyphicon-edit.text-danger').removeClass('glyphicon-edit text-danger').addClass('glyphicon-pencil');
      $('#myModal-moreMemberInfo #cancel').text('确定').addClass('btn-primary').removeClass('btn-danger');
      $('#myModal-moreMemberInfo #sex').show();
      $('#myModal-moreMemberInfo #sex-choice').hide();
      $('#myModal-moreMemberInfo #upload').addClass('hide').fadeOut();
      $('#myModal-moreMemberInfo .rePassword').addClass('hide').fadeOut();
      $('#myModal-moreMemberInfo input').each(function(){$(this).prop('disabled',true);})
      $('input').val('');
       $('input').siblings('.showRed').text('').addClass('showRed');
       $('input').parent().removeClass('has-error');
       $('div #upload').prop('disabled',false);
    }

     $('form input').blur(function(){
         var $parent = $(this).parent();
         //验证社区名
         if( $(this).is('#name') ){
            if( this.value=="" || this.value.length < 2 ){
              $(this).siblings('.showRed').text('用户名至少两个字符');
              $(this).parent().addClass('has-error');
              $('div #upload').prop('disabled',true);
              $('body').attr('ver',1);
            }else{
              $(this).siblings('.showRed').text('').addClass('showRed');
              $(this).parent().removeClass('has-error');
              $('div #upload').prop('disabled',false);
              $('body').attr('ver','');
            }
         }
         //验证账号
         if( $(this).is('#account') ){
           if( this.value=="" || ( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
              $(this).siblings('.showRed').text('请输入正确的E-Mail地址');
              $(this).parent().addClass('has-error');
              $('div #upload').prop('disabled',true);
              $('body').attr('ver',1);
            }else{
              $(this).siblings('.showRed').text('').addClass('showRed');
              $(this).parent().removeClass('has-error');
              $('div #upload').prop('disabled',false);
              $('body').attr('ver','');
            }
         }
          //验证密码
         if( $(this).is('#password') ){
            if( this.value=="" || this.value.length < 6 ){
              $(this).siblings('.showRed').text('密码至少六位数');
              $(this).parent().addClass('has-error');
              $('div #upload').prop('disabled',true);
              $('body').attr('ver',1);
            }else{
              $(this).siblings('.showRed').text('').addClass('showRed');
              $(this).parent().removeClass('has-error');
              $('div #upload').prop('disabled',false);
              $('body').attr('ver','');
            }
         }
          //验证密码
         if( $(this).is('#rePassword') ){
           if( this.value=="" || this.value.length < 6 || this.value!=$(this).parent().parent().find('#password').val() ){
              $(this).siblings('.showRed').text('两次密码不一致');
              $(this).parent().addClass('has-error');
              $('div #upload').prop('disabled',true);
              $('body').attr('ver',1);
            }else{
              $(this).siblings('.showRed').text('').addClass('showRed');
              $(this).parent().removeClass('has-error');
              $('div #upload').prop('disabled',false);
              $('body').attr('ver','');
            }
         }
         // 验证手机号
         if( $(this).is('#phoneNumber') ){
           if( this.value=="" || ( this.value!="" && !/^1[34578]\d{9}$/.test(this.value) ) ){
              $(this).siblings('.showRed').text('请输入正确手机号码');
              $(this).parent().addClass('has-error');
              $('div #upload').prop('disabled',true);
              $('body').attr('ver',1);
            }else{
              $(this).siblings('.showRed').text('').addClass('showRed');
              $(this).parent().removeClass('has-error');
              $('div #upload').prop('disabled',false);
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

    showLists=($event)=>{
      if($($event.target).parent().hasClass('deploy')){
        $($event.target).parent().removeClass('deploy');
      }
      else
      {
        $($event.target).parent().addClass('deploy');
      }
      if($($event.target).hasClass('active')){
      }
      else
      {
        $('.place-background').removeClass('active');
        $($event.target).parent().children('.place-background').addClass('active');
      }
        let node = $($event.target).parent();
    }
    // 住户管理界面多级菜单动画

    departmentsBasic=()=>{
      $('#loading_con').fadeIn();
       this.requestService.getAllDeparent(this.communityId,'','',this.tokenId).subscribe( res=>{
         if(res.json().code==0){
            if(res.json().target==""){layer.msg('此部门无数据');return;}
            this.departments = res.json().target;
            $('#partName').text( this.departments[0].name );
            this.oldId = this.departments[0].id;
            $('#partName').attr('depart-id',this.oldId);
            if( $('#partName').attr('depart-id')!=undefined){

            }else{
              alert("请选择子部门");
            }
            this.requestService.getMembers(this.communityId,this.oldId,1,this.tokenId).subscribe( res=>{
              if(res.json().code==0){
                this.members = res.json().target.users;//.slice().reverse();
                let pages_copy=res.json().target.totalPage;
                this.pages=[];
                for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
                $('.place-background').eq(0).addClass('active');
              }else if(res.json().code==3){
               layer.msg('登录超时，请重新登录');
               this.router.navigate(['/login']);
             }
            })
            // 获取成员
         }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
      })
      $('#loading_con').fadeOut();
    }
    // 获取初级部门

    getBasicId=($event)=>{
      this.departmentId = $($event.target).parent().prop('id');
      this.level = $($event.target).parent().prop('title');
      // console.log(this.departmentId+','+this.level);
      this.departmentId =(this.departmentId == null)?'':this.departmentId;
      this.level=(this.level == null)?'':this.level;
      // console.log(this.departmentId+','+this.level);
     }

    getId=($event)=>{
      $event.stopPropagation();
      this.departmentId = $($event.target).parent().prop('id');
      this.level = $($event.target).parent().prop('title');

      this.departmentId =(this.departmentId == null)?"":this.departmentId;
      this.level=(this.level == null)?"":this.level;
      // console.log(this.departmentId+','+this.level);
      $('#loading_con').fadeIn();

      let departId = $($event.target).parent().prop('id');
      $('#partName').text($($event.target).text());
      $('#partName').attr('depart-id',departId);

      this.requestService.getMembers(this.communityId,this.departmentId,1,this.tokenId).subscribe( res=>{
        if(res.json().code==0){
          this.pages = [];
          this.members = res.json().target.users;//.slice().reverse();
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
      $('#loading_con').fadeOut();
      })
    }
    //通过部门切换人员显示

    addBasicDepar=()=>{
      let that = this;
      $('#myModal #forBtn').text('新建底部门');
      $('#myModal').modal();
      $('#myModal input').val('');
      $('.modal .modal-content #upload').off('click').on('click', ()=> {
        let name=$('#changeBtn').val();
        if(!name){layer.msg('部门名不能为空');return;}
        let nextLevel = this.level+1;
          $.ajax({
            type : 'post',
            url : that.IP+'/web/addDepartment',
            data : {
              name : name,
              level : 1,
              parentId : this.departmentId,
              parentLevel : '',
              communityId : this.communityId,
              tokenId : that.tokenId
            },
            success:function(data){
              if(data.code==0){
                that.departmentsBasic();
                $('#myModal').modal('hide');
                // 新建子部门成功后隐藏模态框
                this.departmentsBasic();
              }else if(data.code==3){
                layer.msg('登录超时，请重新登录');
                this.router.navigate(['/login']);
              }
            }
          })
      })
    }
    // 新建初级子部门

    addDepartment=($event)=>{
      // $('a.square').click(function(){
      let len=$($event.target).text();let that = this;
      $('#myModal #forBtn').text(len);
      $('#myModal input').val('');
      $('#myModal').modal();
      $('.modal .modal-content #upload').off('click').on('click', ()=> {
        let name=$('#changeBtn').val();
        if(!name){layer.msg('部门名不能为空');return;}
        let nextLevel = this.level+1;
        nextLevel=(isNaN(nextLevel))?1:nextLevel;
        // console.log(this.departmentId+','+nextLevel);
        if($($event.target).prop('id') == "newClass"){
          $.ajax({
            type : 'post',
            url : that.IP+'/web/addDepartment',
            data : {
              name : name,
              level : nextLevel,
              parentId : this.departmentId,
              parentLevel : this.level,
              communityId : this.communityId,
              tokenId : that.tokenId
            },
            success:function(data){
              if(data.code==0){
                that.departmentsBasic();
                $('#myModal').modal('hide');
                // 新建子部门成功后隐藏模态框
                // console.log(data);
              }else if(data.code==3){
                layer.msg('登录超时，请重新登录');
                this.router.navigate(['/login']);
              }
            }
          })
        }
      })
      // })
    }
    // 新建子部门

    updateDepartment=($event)=>{
      let that = this;
      let len = $('#partName').text();
      $('#myModal #changeBtn').val(len).select().focus();
      $('#myModal').modal();
      $('#myModal #forBtn').text('修改部门名字');
      // let uploadDepart=(event)=>{
      $('#myModal #upload').off('click').click(function(){
        let departmentId = $('#partName').attr('depart-id');
        let name = $('#myModal #changeBtn').val();
           that.requestService.updateDepartment(departmentId,name,that.tokenId).subscribe(res=>{
             if(res.json().code==0){
               that.departmentsBasic();
               $('#myModal').modal('hide');
             }else if(res.json().code==3){
               layer.msg('登录超时，请重新登录');
               this.router.navigate(['/login']);
             }
           })
        })
    }
    // 修改子部门

    deleteDepartment=($event)=>{
      let that = this;
      layer.confirm('删除后无法恢复，确定删除该部门及其子部门吗?', {icon: 7, title:'提示'}, function(index){
        let departmentId = $('#partName').attr('depart-id');
        let name = $('#myModal #changeBtn').val();
         that.requestService.deleteDepartment(that.communityId,departmentId,that.tokenId).subscribe(res=>{
           if(res.json().code==0){
            layer.msg(res.json().text);layer.close(index);
            that.departmentsBasic();
          }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
          }
         }),function(index){layer.msg('删除出错');}
        })
    }
    // 删除子部门

    newAdd=($event)=>{
      let that = this;
        $('#myModal-member #forBtn').text('新增成员');
        //通过点击的按钮获取进行的操作;
        this.shouldHide();
        $('#myModal-member').modal();
        $('#myModal-member .modal-content #upload').click( ()=> {
          $('#myModal-member form input').trigger('blur');
         if($('body').attr('ver')){return false;}
          let page='';
          $('table#example1 tfoot td li').each(function(){if($(this).hasClass('active')){
            page=$(this).children().text();
            // console.log(page);
          }})
            let account_email = $('#account').val();
            let password = $('#password').val();
            let name = $('#name').val();
            let sex = $('input:radio:checked').val();
            this.departmentId = $('#partName').attr('depart-id');
            $.ajax({
              type : 'post',
              url : that.IP+'/web/addMember',
              data : {
                alias : name,
                sex : sex,
                accountNo : account_email,
                password : password,
                communityId : this.communityId,
                departmentId : this.departmentId,
                tokenId : that.tokenId
              },
              success : function(data){
                $('#myModal-member').modal('hide');
              // 添加人员成功后隐藏模态框
               layer.msg(data.text);
               that.requestService.getMembers(that.communityId,that.departmentId, page,that.tokenId).subscribe( res=>{
                   if(res.json().code!=0){
                     layer.msg(res.json().text);
                   }
                    that.pages=[];
                    that.members = res.json().target.users;
                    let pages_copy=res.json().target.totalPage;
                    for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
               })
              }
            })
        })
    }
    // 新增成员

    moreMemberInfo=($event)=>{
      $('#loading_con').fadeIn();
      let changeMemberId=$event.target.id;
        $('#myModal-moreMemberInfo #sex-choice').hide();

        $('#myModal-moreMemberInfo #forBtn').text('成员信息');
        $('#edit span').removeClass('glyphicon-edit text-danger');
        $('#myModal-moreMemberInfo #upload').fadeOut().delay(4000);
        $('#myModal-moreMemberInfo input').each(function(){$(this).prop('disabled',true);})
       this.requestService.getSimpleMember(changeMemberId,this.tokenId).subscribe( res=>{
         if(res.json().code==0){
          let memberArry=res.json().target;
          $('#myModal-moreMemberInfo #name').val(memberArry.alias);
          // $('#myModal-moreMemberInfo #man').prop('checked',true);
          (memberArry.sex==0)?$('#myModal-moreMemberInfo #sex input').val('女'):$('#myModal-moreMemberInfo #sex input').val('男');
          $('#myModal-moreMemberInfo #account').val(memberArry.accountNo);
          $('#myModal-moreMemberInfo #password').val('Hdgrth');
          $('#myModal-moreMemberInfo #rePassword').val('Hdgrth');
          $('#myModal-moreMemberInfo').attr('memberId',memberArry.accountid);
        }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
        $('#loading_con').fadeOut();
      })
         this.shouldHide();
        $('#myModal-moreMemberInfo').modal();
    }
    // 更多成员信息

    moveMember=($event)=>{
      let that = this;
      $('#myModal-moveMember').modal();
    }
    moveMemberUpload=($event)=>{
      let movePartArr= new Array(); let that = this;
      let moveMemberArr=new Array();
      $('table#example1 tbody input').each(function(i){
        if($(this).prop('checked')){
           moveMemberArr.push($(this).prop('id'));
        }
      })
      $('#myModal-moveMember input').each(function(i){
         if($(this).prop('checked')){
           movePartArr.push($(this).prop('id'));
         }
      })
      if(!moveMemberArr.length){
          layer.msg('请至少选择一个成员');
          return;
       }
       if(!movePartArr.length){
          layer.msg('请至少选择一个部门');
          return;
       }
       let moveParts=movePartArr.join();
       let moveMembers=moveMemberArr.join();
       // console.log(moveParts+','+moveMembers);
       that.requestService.copyMemberToOtherDepartment(moveParts,moveMembers,that.communityId,this.tokenId).subscribe(res=>{
         console.log(res.json().code);
         if(res.json().code==0){
            layer.confirm('是否在原部门删除该'+moveMemberArr.length+'名人员？', {icon: 7}, function(index){
               this.deleteMembers();
               layer.close(index);
                },function(index){
                  layer.close(index);
                  })
            $('#myModal-moveMember').modal('hide');
          }else if(res.json().code==3){
           layer.msg('登录超时，请重新登录');
           this.router.navigate(['/login']);
         }
          layer.msg(res.json().text);
          },erro=>{layer.msg('异常错误');
        })
    }
    // 移动成员


    showListsOne=($event)=>{
      let parentId = $($event.target).parent().prop('id');
      this.requestService.getAllDeparent(this.communityId,1,parentId,this.tokenId).subscribe( res=>{
        if(res.json().code==0){
          this.departmentsOne = res.json().target;
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
      })
    }
    // 获取一级部门

    showListsTwo=($event)=>{
      // console.log($($event.target).html());
      let parentId = $($event.target).parent().prop('id');
      this.requestService.getAllDeparent(this.communityId,2,parentId,this.tokenId).subscribe( res=>{
      this.departmentsTwo = res.json().target;
      })
    }
    // 获取二级部门

    showListsThree=($event)=>{
      // console.log($($event.target).html());
      let parentId = $($event.target).parent().prop('id');
      this.requestService.getAllDeparent(this.communityId,3,parentId,this.tokenId).subscribe( res=>{
      this.departmentsThree = res.json().target;
      })
    }
    // 获取三级部门

    showListsFour=($event)=>{
      // console.log($($event.target).html());
      let parentId = $($event.target).parent().prop('id');
      this.requestService.getAllDeparent(this.communityId,4,parentId,this.tokenId).subscribe( res=>{
      this.departmentsFour = res.json().target;
      })
    }
    // 获取四级部门

    showListsFive=($event)=>{
      // console.log($($event.target).html());
      let parentId = $($event.target).parent().prop('id');
      this.requestService.getAllDeparent(this.communityId,5,parentId,this.tokenId).subscribe( res=>{
      this.departmentsFive = res.json().target;
      })
    }
    // 获取五级部门


    deleteMember=($event)=>{
      let that=this;
        let deleteMemberId=$($event.target).prop('id');
        this.departmentId = $('#partName').attr('depart-id');
            layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
                layer.close(index);
                  $.ajax({
                    type : 'post',
                    url : that.IP+'/web/deleteMember',
                    data : {
                      member : deleteMemberId,
                      tokenId : that.tokenId
                    },
                    success:function(data){
                      if(data.code==0){
                        let page='';
                        $('table#example1 tfoot td li').each(function(){
                          if($(this).hasClass('active')){
                          page=$(this).children().text();
                          }
                        })
                       that.requestService.getMembers(that.communityId,that.departmentId,page,this.tokenId).subscribe( res=>{
                          that.pages=[];
                          that.members = res.json().target.users;
                          let pages_copy=res.json().target.totalPage;
                          for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
                       })
                       layer.msg('删除成功');
                    }else if(data.code==3){
                     layer.msg('登录超时，请重新登录');
                     this.router.navigate(['/login']);
                   }
                  }
                })
             },function(index){
               layer.close(index);
               layer.msg('操作取消');
        })
    }
    // 删除单个小区成员

    edit=($event)=>{
      // console.log($($event.target).hasClass('glyphicon-edit text-danger'));
      if(!$($event.target).hasClass('glyphicon-edit text-danger')){
        $($event.target).addClass('glyphicon-edit text-danger').removeClass('glyphicon-pencil');
         $('#myModal-moreMemberInfo input').each(function(){$(this).prop('disabled',false);})
         $('#myModal-moreMemberInfo #upload').removeClass('hide').fadeIn();
         $('#myModal-moreMemberInfo #sex').hide();
         $('#myModal-moreMemberInfo #sex-choice').show();
        $('#myModal-moreMemberInfo #cancel').text('取消').removeClass('btn-primary').addClass('btn-danger');
        $('#myModal-moreMemberInfo .rePassword').removeClass('hide');
      }else{
        $('#myModal-moreMemberInfo .glyphicon-edit.text-danger').removeClass('glyphicon-edit text-danger').addClass('glyphicon-pencil');
        $('#myModal-moreMemberInfo #cancel').text('确定').addClass('btn-primary').removeClass('btn-danger');
        $('#myModal-moreMemberInfo #sex').show();
        $('#myModal-moreMemberInfo #sex-choice').hide();
        $('#myModal-moreMemberInfo #upload').addClass('hide').fadeOut();
        $('#myModal-moreMemberInfo .rePassword').addClass('hide').fadeOut();
        $('#myModal-moreMemberInfo input').each(function(){$(this).prop('disabled',true);})
        $('input').parent().removeClass('has-error');
        $('div #upload').prop('disabled',false);
      }
    }

    changeMemberUpload=($event)=>{
      $('#myModal-moreMemberInfo form input').trigger('blur');
      if($('body').attr('ver')){return false;}
      let page="";
      let accountid=$('#myModal-moreMemberInfo').attr('memberId');
      let alias=$('#myModal-moreMemberInfo #name').val();
      let sex=$('#myModal-moreMemberInfo input:radio:checked').val();
      let accountNo=$('#myModal-moreMemberInfo #account').val();
      this.departmentId = $('#partName').attr('depart-id');
      $('table#example1 tfoot td li').each(function(){if($(this).hasClass('active')){
            page=$(this).children().text();
            // console.log(page);
          }})
      // 获取当前页码
     $('#loading_con').fadeIn();
      this.requestService.changeMembersInfo(accountid,alias,sex,accountNo,this.tokenId).subscribe(res=>{
        if(res.json().code==0){
          $('#myModal-moreMemberInfo').modal('hide');
          $($event.target).removeClass('glyphicon-edit text-danger');
          layer.msg('修改成功');
          this.shouldHide();
          this.requestService.getMembers(this.communityId,this.departmentId, page,this.tokenId).subscribe( res=>{
             this.pages=[];
              this.members = res.json().target.users;
              let pages_copy=res.json().target.totalPage;
              for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
           })
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
       $('#loading_con').fadeOut();
      })
    }
    // 修改成员


    changePage=($event)=>{
      $('#loading_con').fadeIn();
      let pageId=$($event.target).text();
      this.departmentId = $('#partName').attr('depart-id');
       $($event.target).parent().addClass('active').siblings().removeClass('active');
       this.requestService.getMembers(this.communityId,this.departmentId,pageId,this.tokenId).subscribe( res=>{
           if(res.json().cpde==0){
          this.pages=[];
          this.members = res.json().target.users;
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
        $('#loading_con').fadeOut();
      })
    }
    // 分页更改显示人员

    firstPage=($event)=>{
      this.departmentId = $('#partName').attr('depart-id');
      if($($event.target).parent().parent().children().eq(2).hasClass('active')){
        layer.msg('当前已经是第一页！');return;
      }
       $('#loading_con').fadeIn();
       $($event.target).parent().parent().children().eq(2).addClass('active').siblings().removeClass('active');
       // $($event.target).prop('disabled',true).nextSibling().prop('disabled',true);
       this.requestService.getMembers(this.communityId,this.departmentId,1,this.tokenId).subscribe( res=>{
         if(res.json().code==0){
          this.pages=[];
          this.members = res.json().target.users;
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
       $('#loading_con').fadeOut();
      })
    }
    // 第一页
    prevPage=($event)=>{
      this.departmentId = $('#partName').attr('depart-id');
      let pageId=0;let that=this;
      $('.pagination li').each(function(i){//console.log(i);
        if($(this).hasClass('active')){
           pageId=i-2;return;//console.log(i);
         }
      })
      if(pageId>0){
        $('#loading_con').fadeIn();
        this.departmentId = $('#partName').attr('depart-id');
        $('.pagination li').eq(pageId+1).addClass('active').siblings().removeClass('active');
         that.requestService.getMembers(this.communityId,this.departmentId,pageId,this.tokenId).subscribe( res=>{
           if(res.json().code==0){
             that.pages=[];
             that.members = res.json().target.users;
              let pages_copy=res.json().target.totalPage;
              for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
            }else if(res.json().code==3){
             layer.msg('登录超时，请重新登录');
             this.router.navigate(['/login']);
           }
          })
        }else{layer.msg('当前已经是第一页！');}
        $('#loading_con').fadeOut();
    }
    // 上一页
    nextPage=($event)=>{
      this.departmentId = $('#partName').attr('depart-id');
      let pageId=0;let that=this;let len=$('.pagination li').length-4;
      $('.pagination li').each(function(i){
        if($(this).hasClass('active')){
          pageId=i;return;
        }
       })
          if(pageId<=len){
            $('#loading_con').fadeIn();
            $('.pagination li').eq(pageId+1).addClass('active').siblings().removeClass('active');
             that.requestService.getMembers(this.communityId,this.departmentId,pageId,this.tokenId).subscribe( res=>{
               if(res.json().code==0){
                 that.pages=[];
                 that.members = res.json().target.users;
                  let pages_copy=res.json().target.totalPage;
                  for(let i=0;i<pages_copy;i++){that.pages.push(i+1);}
                }else if(res.json().code==3){
                 layer.msg('登录超时，请重新登录');
                 this.router.navigate(['/login']);
               }
              })
            }else{layer.msg('当前已经是最后一页！');}
            $('#loading_con').fadeOut();
    }
    //下一页

    lastPage=($event)=>{
      this.departmentId = $('#partName').attr('depart-id');
      let pageId=0;let that=this;let len=$('.pagination li').length-4;
      if($($event.target).parent().parent().children().eq(len+1).hasClass('active')){
        layer.msg('当前已经是最后一页！');return;
      }
      $('#loading_con').fadeIn();
       $($event.target).parent().parent().children().eq(len+1).addClass('active').siblings().removeClass('active');
       this.requestService.getMembers(this.communityId,this.departmentId,len,this.tokenId).subscribe( res=>{
         if(res.json().code==0){
          this.pages=[];
          this.members = res.json().target.users;
          let pages_copy=res.json().target.totalPage;
          for(let i=0;i<pages_copy;i++){this.pages.push(i+1);}
        }else if(res.json().code==3){
         layer.msg('登录超时，请重新登录');
         this.router.navigate(['/login']);
       }
        $('#loading_con').fadeOut();
      })
    }
    //最后一页


}
