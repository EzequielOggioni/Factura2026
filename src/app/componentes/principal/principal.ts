import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  imports: [CommonModule,FormsModule],
  templateUrl: './principal.html',
  styleUrl: './principal.scss',
})
export class Principal {
  public valor: string = 'text';
}
