import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion : Subscription;

  constructor() { 
 
    // .pipe(
    //   retry(4) //li diem que si falla ho torni a provar 4 cops mes avans de ensenyar l'error
    // )

    this.subscripcion = this.regresaObservable()
    .subscribe(  //L'observador ens pot d'onar 3 respostes
      numero => console.log('Subs ',numero), //en el moment que fa el obs.next(contador)
      error => console.log('Error en el obs ',error), //si hi ha algun error
      () => console.log('El observador Termino') //en el moment que es fa el obs.complete() indicant que ja ha acavat
    );

  }

  ngOnInit() {
  }

  ngOnDestroy(){ // En el moment que fem un canvi de pagina es crida el destroy 
    //i ens desubscribim perque ja no volem continuar observant
    this.subscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any>{ //podem indicar el que retorna l'observable

    return new Observable( observer => {

      let contador = 0;

      let intervalo = setInterval( () => {
        contador++;

        let salida = {
          valor: contador
        };

        observer.next(salida); 

        // if(contador === 3){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if(contador === 2){
        //   //clearInterval(intervalo); 
        //   observer.error('Auxilio');
        // }

      }, 1000);

    }).pipe(
      map( (resp: any) => resp.valor),
      filter( (valor , index) => {
        if((valor % 2) === 1){//impar
          return true;
        }else{
          return false;
        }
      })
      
    );

  }

}
