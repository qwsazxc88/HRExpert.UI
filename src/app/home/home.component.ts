import {Component} from 'angular2/core';
import {AppState} from '../app.service';

@Component({
  selector: 'home',  
  
  pipes: [ ],
  styles: [ require('./home.css') ],
  template: require('./home.html')
})
export class Home {
  constructor(public appState: AppState) {

  }

  ngOnInit() {    
  } 

}
