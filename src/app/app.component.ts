import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
    <div>
        <a [routerLink]="['/']">Home</a>
        <a [routerLink]="['welcome']">Welcome</a>
    </div>
    <router-outlet></router-outlet>`,
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    title = 'App';
}
