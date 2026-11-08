import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotlightCardComponent } from './spotlight-card.component';

describe('SpotlightCardComponent', () => {
  let fixture: ComponentFixture<SpotlightCardComponent>;
  let component: SpotlightCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotlightCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpotlightCardComponent);
    component = fixture.componentInstance;
  });

  it('should render spotlight card with default variant', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('nuvex-spotlight-card')).toBe(true);
    expect(el.classList.contains('nuvex-spotlight-card--default')).toBe(true);
  });

  it('should render profile name, role and availability', () => {
    fixture.componentRef.setInput('name', 'Dra. Paola Aguilera');
    fixture.componentRef.setInput('role', 'Estilista Master');
    fixture.componentRef.setInput('availability', '08:00 AM - 05:00 PM');
    fixture.detectChanges();

    const nameEl = fixture.nativeElement.querySelector('.nuvex-spotlight-card__name');
    const roleEl = fixture.nativeElement.querySelector('.nuvex-spotlight-card__role');
    const availEl = fixture.nativeElement.querySelector('.nuvex-spotlight-card__availability');

    expect(nameEl?.textContent?.trim()).toBe('Dra. Paola Aguilera');
    expect(roleEl?.textContent?.trim()).toBe('Estilista Master');
    expect(availEl?.textContent).toContain('08:00 AM - 05:00 PM');
  });

  it('should render stats items accurately', () => {
    fixture.componentRef.setInput('stats', [
      { label: 'Rating', value: '4.9 ★' },
      { label: 'Citas', value: 142 },
    ]);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.nuvex-spotlight-card__stat-item');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('4.9 ★');
    expect(items[0].textContent).toContain('Rating');
    expect(items[1].textContent).toContain('142');
  });

  it('should emit prev and next events from carousel controls', () => {
    let prevEmitted = false;
    let nextEmitted = false;

    component.prev.subscribe(() => (prevEmitted = true));
    component.next.subscribe(() => (nextEmitted = true));

    fixture.detectChanges();

    const navBtns = fixture.nativeElement.querySelectorAll('.nuvex-spotlight-card__nav-btn');
    expect(navBtns.length).toBe(2);

    navBtns[0].click();
    expect(prevEmitted).toBe(true);

    navBtns[1].click();
    expect(nextEmitted).toBe(true);
  });

  it('should emit actionClick when action button is pressed', () => {
    let actionEmitted = false;
    component.actionClick.subscribe(() => (actionEmitted = true));

    fixture.componentRef.setInput('actionLabel', 'Agendar Cita');
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('.nuvex-spotlight-card__action-btn');
    expect(btn).not.toBeNull();
    btn.click();
    expect(actionEmitted).toBe(true);
  });

  it('should support hero and emerald visual variants', () => {
    fixture.componentRef.setInput('variant', 'hero');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('nuvex-spotlight-card--hero')).toBe(true);

    fixture.componentRef.setInput('variant', 'emerald');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('nuvex-spotlight-card--emerald')).toBe(true);
  });
});
