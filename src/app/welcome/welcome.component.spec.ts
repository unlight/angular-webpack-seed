import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { AppModule } from '../app.module';

describe('Welcome component:', () => {

    let component: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [AppModule],
                schemas: [NO_ERRORS_SCHEMA]
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(WelcomeComponent);
                component = fixture.componentInstance;
            });
    }));

    it('smoke', () => {
        expect(component).toBeTruthy();
    });

});
