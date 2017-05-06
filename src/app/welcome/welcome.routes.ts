import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

export const MODULE_ROUTES = RouterModule.forChild([
    {
        path: 'welcome', children: [
            { path: '', component: WelcomeComponent },
        ]
    },
]);
