import { RouterModule, Routes } from '@angular/router';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
     path: '',
     children: [
        { path: 'selector', component: SelectorPageComponent},
        { path: '**', redirectTo: 'selector'}
     ]
    }
   ];

   @NgModule({
       imports: [ RouterModule.forChild(routes) ], //Se mandan a llamar las rutas desde aqui.
       exports: [ RouterModule ],
})

export class CountriesRoutingModule{}

