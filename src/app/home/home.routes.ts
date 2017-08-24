import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../user/login/login.component';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { MessageComponent } from './message/message.component';
import { NewsTemplateComponent } from './news-template/news-template.component';
import { GoverInfoComponent } from './gover-manage/gover-info.component';
import { GoverDealComponent } from './gover-manage/gover-deal.component';
import { GoverWaitComponent } from './gover-manage/gover-wait.component';
import { HaveResidentComponent } from './area-manage/have-resident/have-resident.component';
import { NoResidentComponent } from './area-manage/no-resident/no-resident.component';
import { ElectronicBoardComponent } from './system-configuration/electronic-board/electronic-board.component';
import { EquipmentManageComponent } from './system-configuration/equipment-manage/equipment-manage.component';
import { CommunityManageComponent } from './community-manage/community-manage.component';
import { ManagerComponent } from './manager/manager.component';


const HomeRoutes : Routes = <Routes> [
	{
		path : 'home',
		component : HomeComponent,

		children : [
			{
				path : 'index',
				component : IndexComponent
			},{
				path : 'message',
				component : MessageComponent
			},{
				path : 'newinfo/:pid',
				component : NewsTemplateComponent
			},{
				path : 'goverInfo',
				component : GoverInfoComponent
			},{
				path : 'goverInfo/:id',
				component : GoverInfoComponent
			},{
				path : 'goverDeal',
				component : GoverDealComponent
			},{
				path : 'goverWait',
				component : GoverWaitComponent
			},{
				path : 'goverBuild/:id',
				component : GoverInfoComponent//GoverBuildComponent
			},{
				path : 'convenientAdvice/:id',
				component : GoverInfoComponent//ConvenientAdviceComponent
			},{
				path : 'convenientLife/:id',
				component : GoverInfoComponent//ConvenientLifeComponent
			},{
				path : 'eHome/:id',
				component : GoverInfoComponent//EHomeComponent
			},{
				path : 'haveResident',
				component : HaveResidentComponent
			},{
				path : 'haveResident/:id',
				component : HaveResidentComponent
			},{
				path : 'noResident',
				component : NoResidentComponent
			},{
				path : 'eleBoard',
				component : ElectronicBoardComponent
			},{
				path : 'equipmentManage',
				component : EquipmentManageComponent
			},{
				path : 'communityManage',
				component : CommunityManageComponent
			},{
				path : 'manager',
				component : ManagerComponent
			}

		]
	}

]

@NgModule({
	imports : [RouterModule.forChild(HomeRoutes)],
	exports: [ RouterModule ]
})

export class HomeRouter{ }
