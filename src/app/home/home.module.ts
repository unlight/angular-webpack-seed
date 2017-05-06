import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        FormsModule,
        RouterModule,
    ],
    declarations: [
        HomeComponent,
    ],
})
export class HomeModule { }
