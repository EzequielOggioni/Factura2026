import { Component, effect, Signal, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  public isloading: WritableSignal<boolean> = signal<boolean>(false);
  public contador: WritableSignal<number> = signal<number>(0);

  constructor(public router: Router) {
    this.isloading.set(false);
    effect(() => {

      //this.irA(this.isloading() ? "/administrar" : "/login");
    });
    effect(() => {
      console.log("contador", this.contador());
    });
  }

  public irA(seccion: string) {
    this.router.navigateByUrl(seccion);
  }

  cambiar() {
    this.isloading.set(!this.isloading());
  }

  public mostrarLogueo() {
    console.log("mostrarLogueo", this.isloading());
  }

  sumar() {
    this.contador.update((valor) => valor + 1);
  }

}
