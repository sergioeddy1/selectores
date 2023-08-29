import { Region } from './../../interfaces/countries.interfacs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CountriesService } from '../../services/countries/countries.service';

@Component({
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit{

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
    .subscribe ( region => {                //Este OnInit hace referencia a el cambio de selector dependiendo de la condicion que se mencione en el selector de regiones.
     console.log({region})
    });
  }

}
