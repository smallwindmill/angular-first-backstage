import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { HomeRouter } from './home.routes';

import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { NewsTemplateComponent } from './news-template/news-template.component';
import { MessageComponent } from './message/message.component';
import { HeaderComponent } from './header/header.component';
import { GoverInfoComponent } from './gover-manage/gover-info.component';
import { GoverDealComponent } from './gover-manage/gover-deal.component';
import { GoverWaitComponent } from './gover-manage/gover-wait.component';
import { HaveResidentComponent } from './area-manage/have-resident/have-resident.component';
import { NoResidentComponent } from './area-manage/no-resident/no-resident.component';
import { MenuAsideComponent } from './menu-aside/menu-aside.component';
import { ElectronicBoardComponent } from './system-configuration/electronic-board/electronic-board.component';
import { EquipmentManageComponent } from './system-configuration/equipment-manage/equipment-manage.component';
import { CommunityManageComponent } from './community-manage/community-manage.component';
import { ManagerComponent } from './manager/manager.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRouter,
    // InforMationModule,
    FormsModule,
    ReactiveFormsModule,
    // NewsModule
  ],
  declarations: [
	  HomeComponent,
	  IndexComponent,
	  MessageComponent,
	  HeaderComponent,
	  GoverInfoComponent,
	  GoverDealComponent,
	  GoverWaitComponent,
    NewsTemplateComponent,
	  HaveResidentComponent,
	  NoResidentComponent,
    MenuAsideComponent,
    ElectronicBoardComponent,
    EquipmentManageComponent,
    CommunityManageComponent,
    ManagerComponent,
  ],
  providers: []
})
export class HomeModule { }
