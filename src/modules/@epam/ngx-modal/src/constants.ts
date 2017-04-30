import { InjectionToken } from '@angular/core';

const focusable = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'button:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable=true]',
];

export const focusableSelector = focusable.join(',');

export type ModalOptions = {
    popupOpenedClass: string;
    isOpenClass: string;
    isNotificationClass: string;
    popupClass: string;
    bodyClass: string;
    headerClass: string;
    footerClass: string;
    contentClass: string;
    /**
     * Class for close button in modal-header component.
     */
    buttonCloseClass: string;
    /**
     * Content in close button tag.
     */
    buttonCloseContent: string;
    /**
     * Navigate back when modal close (useful for route modals)
     */
    routeOnClose: boolean;
    /**
     * Aux routes for routeOnClose setting.
     */
    routeOutlets: string[];
};

export const defaultOptions: ModalOptions = {
    popupOpenedClass: 'ngx-modal-popup-opened',
    isOpenClass: 'ngx-modal-open',
    isNotificationClass: 'ngx-modal-notification',
    popupClass: 'ngx-modal-popup',
    bodyClass: 'ngx-modal-body',
    headerClass: 'ngx-modal-header',
    footerClass: 'ngx-modal-footer',
    contentClass: 'ngx-modal-content',
    buttonCloseClass: 'ngx-modal-button-close',
    buttonCloseContent: '&times;',
    routeOnClose: true,
    routeOutlets: ['modal'],
};

export const OPTIONS = new InjectionToken<ModalOptions>('ModalOptions');
