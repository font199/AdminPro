import { Component, OnInit } from '@angular/core';

//Per cridar un script de javascript
declare function init_pluguins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_pluguins();
  }

}
