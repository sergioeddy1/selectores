import { Region, SmallCountry } from './../../interfaces/countries.interfacs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CountriesService } from '../../services/countries/countries.service';
import { switchMap } from 'rxjs';

@Component({
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit{

public countriesByRegion: SmallCountry[] = [];  // Almacenamos los countries que se estan mandando a llamar desde el servicio.

public myForm: FormGroup = this.fb.group({
  region: ['', Validators.required],
  country: ['', Validators.required],
  borders: ['', Validators.required],
})

  constructor(
    private fb: FormBuilder, // Inyección del formulario con FormBuilder
    private countriesServices: CountriesService,
  ){}

  ngOnInit(): void {      //El OnInit se ejecutara cuando se inicialice el componente
   this.onRegionChange();
  }

  get regions(): Region[]{
    return this.countriesServices.regions; //Regresa por referencia el arreglo de regiones que se esta declarando desde el servicio.
  }

  onRegionChange(): void {
    this.myForm.get('region')!.valueChanges 
    .pipe(
      switchMap(region => this.countriesServices.getCountriesByRegion(region))                      //Con este se disparar la region para que pueda efecutarse el cambio de region por pais
    )
    .subscribe ( countries => {                //Este OnInit hace referencia a el cambio de selector dependiendo de la condicion que se mencione en el selector de regiones.
      this.countriesByRegion = countries;  // Desde aqui se mutesran los countries que fueron almacenados desde el servicio y se mandan a llamar desde la API
    });
  }

}
