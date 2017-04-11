import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions): AuthHttp {
    return new AuthHttp(new AuthConfig({
        // tokenName: 'id_token',
        // tokenGetter: (() => String(sessionStorage.getItem('token'))),
        globalHeaders: [
            { 'Content-Type': 'application/json' }
        ],
    }), http, options);
}

@NgModule({
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ]
})
export class AuthModule { }
