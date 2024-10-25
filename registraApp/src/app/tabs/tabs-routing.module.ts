import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profe',
        loadChildren: () => import('../tabs/profe/profe.module').then( m => m.ProfePageModule)
      },
      {
        path: 'alumno',
        loadChildren: () => import('../tabs/alumno/alumno.module').then( m => m.AlumnoPageModule)
      },
      {
        path: 'ajustes',
        loadChildren: () => import('../tabs/ajustes/ajustes.module').then( m => m.AjustesPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../tabs/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
