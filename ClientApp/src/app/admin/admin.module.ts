import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../login/auth.guard';
import { ManageListComponent } from './manage-list/manage-list.component';
import { DxDataGridModule } from 'devextreme-angular';



@NgModule({
  declarations: [AdminMenuComponent, ManageListComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    RouterModule.forRoot([
      {
        path: 'admin',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
          { path: '', component: AdminMenuComponent },
          { path: 'manage-list/:objType', component: ManageListComponent }
        ]
      }
    ]),
  ]
})
export class AdminModule { }
