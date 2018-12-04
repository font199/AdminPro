import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }

  guardarAjustes(){
    //console.log('Guardado en el localStrorage');
    //El localStorage nomes admet strings, i per tal de guardar els ajustes els tenim de passar a un sol string,
    // aixo ho fem amb JSON.stringify 
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    //si existeix un item que es diu ajustes..
    if(localStorage.getItem('ajustes')){
      //JSON.parse ens converteig el string a la interface Ajustes
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      //console.log('cargando del localStorage');
      this.aplicarTema(this.ajustes.tema);
    }else{  
      //console.log('usando valores por defecto');
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string){

    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

}

interface Ajustes{
  temaUrl: string;
  tema: string;
}
