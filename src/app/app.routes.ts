import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES = RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'feature', loadChildren: './feature/feature.module#FeatureModule' }
]);
