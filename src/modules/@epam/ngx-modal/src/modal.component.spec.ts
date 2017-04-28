import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalModule } from './modal.module';

@Component({
    template: `<modal>
    <modal-header [title]="'Example Title'"></modal-header>
    <modal-content></modal-content>
</modal>`
})
export class TestComponent {
    @ViewChild(ModalComponent) modal: ModalComponent;
}

describe('ModalComponent:', () => {

    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    ModalModule
                ],
                declarations: [
                    TestComponent
                ],
                schemas: [],
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ModalComponent);
                component = fixture.componentInstance;
            });
    }));

    it('smoke', () => {
        expect(component).toBeTruthy();
    });

});
