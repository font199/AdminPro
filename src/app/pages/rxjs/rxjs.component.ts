import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() { 
 
    this.regresaObservable().pipe(
      retry(4) //li diem que si falla ho torni a provar 4 cops mes avans de ensenyar l'error
    )
    .subscribe(  //L'observador ens pot d'onar 3 respostes
      numero => console.log('Subs ',numero), //en el moment que fa el obs.next(contador)
      error => console.log('Error en el obs ',error), //si hi ha algun error
      () => console.log('El observador Termino') //en el moment que es fa el obs.complete() indicant que ja ha acavat
    );

  }

  ngOnInit() {
  }

  regresaObservable(): Observable<number>{ //podem indicar el que retorna l'observable

    return new Observable( observer => {

      let contador = 0;

      let intervalo = setInterval( () => {
        contador ++;
        observer.next(contador);

        if(contador === 3){
          clearInterval(intervalo);
          observer.complete();
        }

        if(contador === 2){
          //clearInterval(intervalo); 
          observer.error('Auxilio');
        }

      }, 1000);

    });

  }

}
