import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuvexUi } from './nuvex-ui';

describe('NuvexUi', () => {
  let component: NuvexUi;
  let fixture: ComponentFixture<NuvexUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuvexUi],
    }).compileComponents();

    fixture = TestBed.createComponent(NuvexUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
