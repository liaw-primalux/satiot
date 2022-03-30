import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FrontpageComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FrontpageComponent
  ]
})
export class SharedModule { }
