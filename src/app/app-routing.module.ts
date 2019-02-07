import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistoComponent } from './registo/registo.component';
import { ListaSubscritoresComponent } from './lista-subscritores/lista-subscritores.component';
import { InscricaoComponent } from './inscricao/inscricao.component';
const routes: Routes = [
	{
	    path: '',
	    redirectTo: '/registo',
	    pathMatch: 'full',
	},
	{
        path: 'registo',
        component: RegistoComponent,
        //canActivate:[GuardGuard,AdminGuard],
        data: {
          title: 'Registo de Subscritor'
        }
  },
  {
        path: 'inscricao',
        component: InscricaoComponent,
        data: {
          title: 'Inscrição concurso'
        }
  },
	/*{
        path: 'subscritores',
        component: ListaSubscritoresComponent,
        data: {
          title: 'Lista de Subscritores'
        }
    },*/
    { path: '**', redirectTo: '/registo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
