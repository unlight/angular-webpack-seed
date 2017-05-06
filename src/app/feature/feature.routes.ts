import { RouterModule } from '@angular/router';
import { FeatureComponent } from './feature.component';

export const MODULE_ROUTES = RouterModule.forChild([
    { path: '', component: FeatureComponent },
]);
