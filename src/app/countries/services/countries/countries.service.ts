import { Country } from './../../interfaces/countries.interfacs';
import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../../interfaces/countries.interfacs';
import { Observable, of, tap, map, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'  //El servicio se provee en la ruta. 
})
export class CountriesService {

  private baseUrl: string = 'https://restcountries.com/v3.1'; //Ruta para traer desde la api los detalles de la region por pais. 

  private _regions: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ]; //Mandas a llamar la informacion de las regiones que se declaran en las interfaces

  constructor(
    private http: HttpClient
  ) { }

get regions(): Region[] {
  return[...this._regions];   //Se delcara un metodo para conseguir las regiones
}

  getCountriesByRegion( region: Region ): Observable<SmallCountry[]>{ //Servicio para que funcione el selector de paises por cambio de región.
    if(!region ) return of([]); //Si la region viene vacia, se regresa un arreglo vacio
  
    const url: string =`${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
  
    return this.http.get<Country[]>(url)
    .pipe(
      map( countries => countries.map( country => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? []  //si los borders son nulos se pueden regresar un arreglo vacio
      }))),
      tap(response => console.log({response})))  //tap sirve paa disparar efectos secundarios
  }


  getCountryByAlphaCode( alphaCode: string): Observable<SmallCountry>{
    const url=`${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url)
    .pipe(
      map( country => ({
      name: country.name.common,
      cca3: country.cca3,
      borders: country.borders ?? []  //si los borders son nulos se pueden regresar un arreglo vacio
    }))
    )
  } 

  getCountryBordersByCodes(borders: string[]): Observable<SmallCountry[]> {  //Se regresaran objetos que lucen como SmallCountrys. 
  
    if( !borders || borders.length === 0  ) return of([]); //Si los borders llegan vacios o la longitud de estos es estrictamente igual a 0 se hara un retorno de un arreglo vacio. 
    
    const countriesRequest: Observable<SmallCountry>[] = [];
    
    borders.forEach( code => {
      const request = this.getCountryByAlphaCode( code ); //si vienen 5 paises dentro del arreglo se crea el listadoo de observable con cada 1 de los 5 paises. 
      countriesRequest.push( request );
    });
    return combineLatest( countriesRequest );
  }


}



