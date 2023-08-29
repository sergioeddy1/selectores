import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
 path: 'selector',
 loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule) // Desde aqui se realiza la carga perezosa del modulo para que este pueda ser cargado en la pagina. 
},
{
  path: '**',
  redirectTo: 'selector'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
