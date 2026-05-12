import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsError } from "../../forms-error/forms-error";

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule, FormsError],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  public activeLogin: boolean = true;
  public registroForm!: FormGroup;
  /**
   *
   */
  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      username: ['',[Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    })
  }
  onSubmit(){
    if(this.registroForm.value.username === 'admin'){
    this.registroForm.get('username')?.setErrors({customError: 'Error personalizado'});
    }
    console.log(this.registroForm.value);
   
  }

  limpiar(){
    this.registroForm.reset();

  }

  
}
