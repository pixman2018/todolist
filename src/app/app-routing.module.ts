import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'task/:page',
    loadChildren: './pages/tasks/tasks.module#TasksModule'
  }, 
  {
    path: '',
    redirectTo: 'task/:page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

