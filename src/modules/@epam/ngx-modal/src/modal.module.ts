import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalContentComponent } from './modal-content.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalOptions } from './types';
import { defaultOptions, OPTIONS } from './constants';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ModalComponent,
        ModalContentComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
    ],
    exports: [
        ModalComponent,
        ModalContentComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
    ],
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
