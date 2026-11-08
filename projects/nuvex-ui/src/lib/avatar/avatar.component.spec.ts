import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';
import { AvatarGroupComponent } from './avatar-group.component';

describe('AvatarComponent', () => {
  let fixture: ComponentFixture<AvatarComponent>;
  let component: AvatarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
  });

  it('should render avatar with default classes', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('nuvex-avatar')).toBe(true);
    expect(el.classList.contains('nuvex-avatar--md')).toBe(true);
    expect(el.classList.contains('nuvex-avatar--circle')).toBe(true);
  });

  it('should compute initials accurately from label', () => {
    fixture.componentRef.setInput('label', 'Camila Restrepo');
    fixture.detectChanges();
    expect(component.computedInitials()).toBe('CR');

    const labelEl = fixture.nativeElement.querySelector('.nuvex-avatar__label');
    expect(labelEl?.textContent?.trim()).toBe('CR');

    fixture.componentRef.setInput('label', 'VIP');
    fixture.detectChanges();
    expect(component.computedInitials()).toBe('VIP');

    fixture.componentRef.setInput('label', 'Admin');
    fixture.detectChanges();
    expect(component.computedInitials()).toBe('AD');
  });

  it('should apply size and shape classes', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('shape', 'rounded');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('nuvex-avatar--lg')).toBe(true);
    expect(el.classList.contains('nuvex-avatar--rounded')).toBe(true);
  });

  it('should render presence status dot', () => {
    fixture.componentRef.setInput('status', 'online');
    fixture.componentRef.setInput('statusPosition', 'bottom-right');
    fixture.detectChanges();

    const statusEl = fixture.nativeElement.querySelector('.nuvex-avatar__status');
    expect(statusEl).not.toBeNull();
    expect(statusEl.classList.contains('nuvex-avatar__status--online')).toBe(true);
    expect(statusEl.classList.contains('nuvex-avatar__status--bottom-right')).toBe(true);
  });

  it('should render notification badge', () => {
    fixture.componentRef.setInput('badge', '3');
    fixture.detectChanges();

    const badgeEl = fixture.nativeElement.querySelector('.nuvex-avatar__badge');
    expect(badgeEl).not.toBeNull();
    expect(badgeEl.textContent?.trim()).toBe('3');
  });

  it('should emit click event when clickable is true', () => {
    let clicked = false;
    component.clicked.subscribe(() => (clicked = true));

    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();

    fixture.nativeElement.click();
    expect(clicked).toBe(true);
  });

  it('should fallback to initials if image fails to load', () => {
    fixture.componentRef.setInput('image', 'https://invalid-domain.com/photo.jpg');
    fixture.componentRef.setInput('label', 'Paola Aguilera');
    fixture.detectChanges();

    expect(component.showImage()).toBe(true);

    const img = fixture.nativeElement.querySelector('img');
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(component.hasImageFailed()).toBe(true);
    expect(component.showImage()).toBe(false);
    expect(fixture.nativeElement.querySelector('.nuvex-avatar__label')?.textContent?.trim()).toBe('PA');
  });
});

describe('AvatarGroupComponent', () => {
  let fixture: ComponentFixture<AvatarGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarGroupComponent);
  });

  it('should render avatar group with spacing classes', () => {
    fixture.componentRef.setInput('spacing', 'lg');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.classList.contains('nuvex-avatar-group')).toBe(true);
    expect(el.classList.contains('nuvex-avatar-group--lg')).toBe(true);
  });
});
