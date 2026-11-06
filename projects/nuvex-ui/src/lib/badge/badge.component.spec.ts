import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let fixture: ComponentFixture<BadgeComponent>;
  let component: BadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
  });

  it('should render badge with default primary variant', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement;
    expect(el.classList.contains('nuvex-badge')).toBe(true);
    expect(el.classList.contains('nuvex-badge--primary')).toBe(true);
  });

  it('should update classes when variant changes to danger and size to lg', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const el = fixture.nativeElement;
    expect(el.classList.contains('nuvex-badge--danger')).toBe(true);
    expect(el.classList.contains('nuvex-badge--lg')).toBe(true);
    expect(el.classList.contains('nuvex-badge--primary')).toBe(false);
  });

  it('should support semantic variants', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('nuvex-badge--success')).toBe(true);

    fixture.componentRef.setInput('variant', 'warning');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('nuvex-badge--warning')).toBe(true);
  });
});
