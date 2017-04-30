import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { StudyConfirmationComponent } from './confirm.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalComponent } from './modal.component';

// describe('StudyConfirmationComponent', () => {

// 	beforeEach(() => {
// 		TestBed.configureTestingModule({
// 			schemas: [NO_ERRORS_SCHEMA],
// 			imports: [SharedModule],
// 			declarations: [StudyConfirmationComponent],
// 		});
// 	});

// 	let component: StudyConfirmationComponent;
// 	let fixture: ComponentFixture<StudyConfirmationComponent>;

// 	beforeEach(() => {
// 		fixture = TestBed.createComponent(StudyConfirmationComponent);
// 		component = fixture.componentInstance;
// 		(component as any).modal = new SpyObject(ModalComponent);
// 	});

// 	it('smoke test', () => {
// 		expect(StudyConfirmationComponent).toBeDefined();
// 		expect(fixture).toBeTruthy();
// 		expect(component).toBeTruthy();
// 	});

// 	it('ok should emit truthy value to okay', async(() => {
// 		component.okay.subscribe(value => {
// 			expect(value).toBeTruthy();
// 		});
// 		component.ok();
// 	}));

// 	it('ok should not emit when result falsy', async(() => {
// 		component.okay.subscribe(value => fail(`Shouldn't happen.`));
// 		component.result.next(false);
// 	}));

// 	it('open modal', () => {
// 		component.okay.subscribe(value => fail(`Shouldn't happen.`));
// 		component.open();
// 		expect((component as any).modal.open).toHaveBeenCalled();
// 	});

// 	it('close modal', () => {
// 		component.okay.subscribe(value => fail(`Shouldn't happen.`));
// 		component.close();
// 		expect((component as any).modal.close).toHaveBeenCalled();
// 	});

// 	it('open modal should focus okay button', fakeAsync(() => {
// 		const confirmOkButton = (component as any).confirmOk.nativeElement;
// 		expect(confirmOkButton).toBeDefined();
// 		(component as any).onOpen();
// 		tick();
// 		expect(document.activeElement).toBe(confirmOkButton);
// 	}));
// });
