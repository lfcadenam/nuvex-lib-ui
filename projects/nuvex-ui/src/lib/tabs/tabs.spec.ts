import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab.component';
import { TabItem } from './tabs.types';

const mockTabs: TabItem[] = [
  { id: 'tab-1', label: 'General', badge: 3 },
  { id: 'tab-2', label: 'Seguridad' },
  { id: 'tab-3', label: 'Facturación', disabled: true },
];

@Component({
  standalone: true,
  imports: [TabsComponent, TabComponent],
  template: `
    <nuvex-tabs [(value)]="selectedTab">
      <nuvex-tab id="general" label="General" badge="1">
        <p class="content-general">Contenido General</p>
      </nuvex-tab>
      <nuvex-tab id="profile" label="Perfil">
        <p class="content-profile">Contenido Perfil</p>
      </nuvex-tab>
    </nuvex-tabs>
  `,
})
class TestProjectedHostComponent {
  readonly selectedTab = signal('general');
}

describe('TabsComponent (Declarativo)', () => {
  let fixture: ComponentFixture<TabsComponent>;
  let component: TabsComponent;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [TabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockTabs);
    fixture.detectChanges();
  });

  it('should create tabs component with defaults', () => {
    expect(component).toBeTruthy();
    expect(component.variant()).toBe('pill');
    expect(component.size()).toBe('md');
    expect(component.headerItems().length).toBe(3);
  });

  it('should switch active tab and emit tabChange on click', () => {
    let emittedId = '';
    component.tabChange.subscribe((id) => {
      emittedId = id;
    });

    component.selectTab(mockTabs[1]); // tab-2
    fixture.detectChanges();

    expect(component.value()).toBe('tab-2');
    expect(emittedId).toBe('tab-2');
  });

  it('should not switch to a disabled tab', () => {
    component.selectTab(mockTabs[2]); // disabled
    fixture.detectChanges();

    expect(component.value()).not.toBe('tab-3');
  });

  it('should handle keyboard navigation with ArrowRight and ArrowLeft', () => {
    component.value.set('tab-1');
    fixture.detectChanges();

    const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    component.onKeyDown(eventRight, 0);
    fixture.detectChanges();

    expect(component.value()).toBe('tab-2');
  });
});

describe('TabsComponent (Content Projection con nuvex-tab)', () => {
  let fixture: ComponentFixture<TestProjectedHostComponent>;
  let host: TestProjectedHostComponent;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [TestProjectedHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestProjectedHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render active tab projected content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content-general')).toBeTruthy();
    expect(compiled.querySelector('.content-profile')).toBeFalsy();

    host.selectedTab.set('profile');
    fixture.detectChanges();

    expect(compiled.querySelector('.content-general')).toBeFalsy();
    expect(compiled.querySelector('.content-profile')).toBeTruthy();
  });
});
