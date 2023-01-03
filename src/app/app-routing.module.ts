import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    redirectTo: environment.rootRedirectPath,
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./pages/todo/todo.module').then(mod => mod.TodoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
