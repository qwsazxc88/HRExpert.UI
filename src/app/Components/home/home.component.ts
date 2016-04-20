import {Component} from 'angular2/core';
import {AppState} from '../../Services';

@Component({
  selector: 'home',
  pipes: [ ],
  template: require('../../Views/home/home.html')
})
export class Home {
  constructor(public appState: AppState) {
  }

  ngOnInit() {
  }

}
