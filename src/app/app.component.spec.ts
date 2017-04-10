import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppModule } from './app.module';

describe('App component:', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    let component: AppComponent;

    it('smoke', () => {
        expect(AppComponent).toBeDefined();
    });

    it('instance', () => {
        component = new AppComponent();
        expect(component.title).toBe('App');
    });
});
