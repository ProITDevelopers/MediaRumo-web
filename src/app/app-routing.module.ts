import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistoComponent } from './registo/registo.component';
const routes: Routes = [
	/*{
    path: '',
    redirectTo: '/inscricao',
    pathMatch: 'full',
	},
	{
    path: 'inscricao',
    component: RegistoComponent,
    //canActivate:[GuardGuard,AdminGuard],
    data: {
      title: 'Inscrição concurso'
    }
  },
  { path: '**', redirectTo: '/inscricao' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
