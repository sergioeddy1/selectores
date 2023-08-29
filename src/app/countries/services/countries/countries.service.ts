import { Injectable } from '@angular/core';
import { Region } from '../../interfaces/countries.interfacs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ]; //Mandas a llamar la informacion de las regiones que se declaran en las interfaces

  constructor() { }

get regions(): Region[] {
  return[...this._regions];   //Se delcara un metodo para conseguir las regiones
}

}
