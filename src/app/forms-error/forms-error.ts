import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-forms-error',
  imports: [CommonModule],
  templateUrl: './forms-error.html',
  styleUrl: './forms-error.scss',
})
export class FormsError {
  @Input() public errorControl: AbstractControl | null = null;
}
