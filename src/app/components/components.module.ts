import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

import { AngularMaterialSharedModule } from '../angular-material-shared.module';
import { TaskComponent } from './task/task.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';


@NgModule({
  declarations: [
    HeaderComponent,
    TaskComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialSharedModule
  ],
  exports: [
    HeaderComponent,
    TaskComponent
  ]
})
export class ComponentsModule { }
