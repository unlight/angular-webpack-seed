import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const APP_ROUTES = RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'feature', loadChildren: './feature/feature.module#FeatureModule' }
]);
