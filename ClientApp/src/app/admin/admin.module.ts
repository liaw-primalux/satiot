import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../login/auth.guard';



@NgModule({
  declarations: [AdminMenuComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'admin',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
          { path: '', component: AdminMenuComponent }
        ]
      }
    ]),
  ]
})
export class AdminModule { }
