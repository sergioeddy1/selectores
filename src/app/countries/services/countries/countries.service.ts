import { Injectable } from '@angular/core';
import { Region } from '../../interfaces/countries.interfacs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _region: Region[] = [];

  constructor() { }


}
