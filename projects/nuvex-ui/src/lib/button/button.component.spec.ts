import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should render host with default primary variant', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement;
    expect(el.classList.contains('nuvex-button--primary')).toBe(true);
    expect(el.classList.contains('nuvex-button--sm')).toBe(false);
  });

  it('should update classes when variant and size change', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const el = fixture.nativeElement;
    expect(el.classList.contains('nuvex-button--danger')).toBe(true);
    expect(el.classList.contains('nuvex-button--lg')).toBe(true);
    expect(el.classList.contains('nuvex-button--primary')).toBe(false);
  });

  it('should emit onClick event when clicked while enabled', () => {
    let clicked = false;
    component.onClick.subscribe(() => {
      clicked = true;
    });

    fixture.detectChanges();
    fixture.nativeElement.click();
    expect(clicked).toBe(true);
  });

  it('should not emit onClick event when disabled', () => {
    let clicked = false;
    component.onClick.subscribe(() => {
      clicked = true;
    });

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.nativeElement.click();
    expect(clicked).toBe(false);
  });

  it('should not emit onClick event when loading', () => {
    let clicked = false;
    component.onClick.subscribe(() => {
      clicked = true;
    });

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    fixture.nativeElement.click();
    expect(clicked).toBe(false);
  });
});
