import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let fixture: ComponentFixture<DrawerComponent>;
  let component: DrawerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
  });

  it('should not render drawer panel when isOpen is false', () => {
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('.nuvex-drawer__panel');
    expect(panel).toBeNull();
  });

  it('should render drawer panel when isOpen is true', () => {
    fixture.componentRef.setInput('title', 'Ficha Técnica');
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.nuvex-drawer__panel');
    expect(panel).toBeTruthy();
    expect(panel.textContent).toContain('Ficha Técnica');
  });

  it('should close drawer and emit onClose when backdrop is clicked', () => {
    let closeEmitted = false;
    component.onClose.subscribe(() => {
      closeEmitted = true;
    });

    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    const backdrop = fixture.nativeElement.querySelector('.nuvex-drawer__backdrop');
    expect(backdrop).toBeTruthy();

    backdrop.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
    expect(closeEmitted).toBe(true);
  });
});
