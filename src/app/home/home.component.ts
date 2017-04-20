import { Component } from '@angular/core';

@Component({
  templateUrl: 'home.component.html',
  // https://github.com/UltimateAngular/aot-loader/issues/12
  // styleUrls: ['home.component.css'],
})
export class HomeComponent {
    name = 'Angular';
}
