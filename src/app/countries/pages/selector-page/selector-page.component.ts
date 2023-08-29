import { Region } from './../../interfaces/countries.interfacs';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CountriesService } from '../../services/countries/countries.service';

@Component({
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent {

public myForm: FormGroup = this.fb.group({
  region: ['', Validators.required],
  country: ['', Validators.required],
  borders: ['', Validators.required],
})

  constructor(
    private fb: FormBuilder, // Inyección del formulario con FormBuilder
    private countriesServices: CountriesService,
  ){}

  get regions(): Region[]{
    return this.countriesServices.regions; //Regresa por referencia el arreglo de regiones que se esta declarando desde el servicio.
  }
}
