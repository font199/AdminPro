import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number  = 50;
  @Input() leyenda: string = 'leyenda';
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  @ViewChild('txtProgress') txtPr: ElementRef; 
  


  constructor() { }

  ngOnInit() {
  }

  onChange(newValue : number){

    //let elemHTML: any = document.getElementsByName('progreso')[0];

 
    if( newValue >= 100){
      this.progreso = 100;
    }else if( newValue <= 0){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }

    //elemHTML.value = this.progreso;
    this.txtPr.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);

  
  }

  cambiarValor(valor : number){
      if((this.progreso + valor) <= 100 && (this.progreso + valor) >= 0){
        this.progreso += valor;
      }

      this.cambioValor.emit(this.progreso);

      this.txtPr.nativeElement.focus();
  }

}
