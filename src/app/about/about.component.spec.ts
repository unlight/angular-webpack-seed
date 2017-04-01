/// <reference path="../../typings.d.ts" />
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AboutModule } from './about.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AboutComponent } from './about.component';

describe('About component', () => {

    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [AboutModule],
                schemas: [NO_ERRORS_SCHEMA]
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(AboutComponent);
                component = fixture.componentInstance;
            });
    }));

    it('smoke', () => {
        expect(component).toBeTruthy();
    });

});
