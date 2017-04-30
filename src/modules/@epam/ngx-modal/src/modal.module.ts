import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalContentComponent } from './modal-content.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalOptions, defaultOptions, OPTIONS } from './constants';
import { ModalConfirmComponent } from './modal-confirm.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ModalComponent,
        ModalContentComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
        ModalConfirmComponent,
    ],
    exports: [
        ModalComponent,
        ModalContentComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
        ModalConfirmComponent,
    ],
    providers: [
        { provide: OPTIONS, useValue: defaultOptions }
    ]
})
export class ModalModule {

    static forRoot(options: ModalOptions = defaultOptions): ModuleWithProviders {
        return {
            ngModule: ModalModule,
            providers: [
                { provide: OPTIONS, useValue: options }
            ]
        };
    }
}
