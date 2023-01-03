import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { AngularMaterialSharedModule } from 'src/app/angular-material-shared.module';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent
  }
];

@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    AngularMaterialSharedModule
  ]
})
export class TodoModule { }
