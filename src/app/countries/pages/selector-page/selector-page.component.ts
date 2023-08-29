import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

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
  ){}
}
