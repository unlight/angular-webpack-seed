import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalModule } from './modal.module';

@Component({
    template: `<modal>
    <modal-header></modal-header>
    <modal-content></modal-content>
</modal>`
})
export class TestComponent {
    @ViewChild(ModalComponent) modal: ModalComponent;
}

describe('TestComponent:', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    function createComponent() {
        return TestBed.compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TestComponent);
                component = fixture.componentInstance;
                return { fixture, component };
            });
    }

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
            });
    }));

    // it('overrideTemplate', async (done) => {
    //     await TestBed.overrideTemplate(TestComponent, `<modal>
    //             <modal-header title="'Heading'"></modal-header>
    //             </modal>`
    //     ).compileComponents();
    //     let createResult = await createComponent();
    //     fixture = createResult.fixture;
    //     component = createResult.component;
    //     debugger;
    // });

});
