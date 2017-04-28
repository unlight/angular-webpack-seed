import { AppComponent } from './app.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppModule } from './app.module';

describe('App component:', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(AppComponent);
                component = fixture.componentInstance;
            });
    }));

    it('smoke', () => {
        expect(AppComponent).toBeDefined();
    });

    it('instance', () => {
        expect(component.title).toBe('App');
    });
});
