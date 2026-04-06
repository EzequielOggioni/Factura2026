import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Principal } from "./componentes/principal/principal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Principal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('factura');
}
