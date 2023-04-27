import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; // el ViewChild es para asignar una referenciaa local (#)para poderla usar en el TS

constructor(private GifsService: GifsService){}

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0){
    return;
    }
    this.GifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = "";
  }

}
