import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastComponent } from './toast.component';
import { ToastItem } from './toast.types';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [ToastService],
    });
    service = TestBed.inject(ToastService);
    service.clearAll();
  });

  it('should initialize with empty toasts', () => {
    expect(service.toasts().length).toBe(0);
    expect(service.position()).toBe('top-right');
  });

  it('should add success toast and auto-dismiss', () => {
    vi.useFakeTimers();

    const id = service.success('Cita agendada con éxito', 'Agendamiento');
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].id).toBe(id);
    expect(service.toasts()[0].type).toBe('success');
    expect(service.toasts()[0].message).toBe('Cita agendada con éxito');

    // Fast forward timer
    vi.advanceTimersByTime(4100);
    expect(service.toasts().length).toBe(0);

    vi.useRealTimers();
  });

  it('should add error, warning, info toasts', () => {
    service.error('Error al guardar', 'Error');
    service.warning('Faltan datos por completar', 'Advertencia');
    service.info('Turno iniciado', 'Información');

    expect(service.toasts().length).toBe(3);
  });

  it('should dismiss a specific toast by id', () => {
    const id1 = service.show({ message: 'Toast 1', duration: 0 });
    const id2 = service.show({ message: 'Toast 2', duration: 0 });

    expect(service.toasts().length).toBe(2);

    service.dismiss(id1);
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].id).toBe(id2);
  });

  it('should clear all toasts', () => {
    service.show({ message: 'Toast 1' });
    service.show({ message: 'Toast 2' });
    expect(service.toasts().length).toBe(2);

    service.clearAll();
    expect(service.toasts().length).toBe(0);
  });

  it('should update position', () => {
    service.setPosition('bottom-center');
    expect(service.position()).toBe('bottom-center');
  });
});

describe('ToastComponent', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let component: ToastComponent;

  const mockToast: ToastItem = {
    id: 'test-1',
    title: 'Título de prueba',
    message: 'Mensaje de prueba',
    type: 'success',
    duration: 3000,
    dismissible: true,
    createdAt: Date.now(),
  };

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should render toast details and emit dismiss on close', () => {
    fixture.componentRef.setInput('toast', mockToast);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.nuvex-toast__title')?.textContent?.trim()).toBe('Título de prueba');
    expect(compiled.querySelector('.nuvex-toast__message')?.textContent?.trim()).toBe('Mensaje de prueba');

    let dismissedId = '';
    component.dismiss.subscribe((id) => {
      dismissedId = id;
    });

    const closeBtn = compiled.querySelector('.nuvex-toast__close-btn') as HTMLButtonElement;
    closeBtn.click();

    expect(dismissedId).toBe('test-1');
  });

  it('should trigger action onClick when action button is present', () => {
    let actionCalled = false;
    const toastWithAction: ToastItem = {
      ...mockToast,
      action: {
        label: 'Deshacer',
        onClick: () => {
          actionCalled = true;
        },
      },
    };

    fixture.componentRef.setInput('toast', toastWithAction);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const actionBtn = compiled.querySelector('.nuvex-toast__action-btn') as HTMLButtonElement;
    expect(actionBtn).toBeTruthy();
    expect(actionBtn.textContent?.trim()).toBe('Deshacer');

    actionBtn.click();
    expect(actionCalled).toBe(true);
  });
});
