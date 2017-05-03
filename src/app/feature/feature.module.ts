import { NgModule } from '@angular/core';
import { FeatureComponent } from './feature.component';
import { MODULE_ROUTES } from './feature.routes';

@NgModule({
    imports: [
        MODULE_ROUTES,
    ],
    declarations: [
        FeatureComponent,
    ]
})
export class FeatureModule { }
