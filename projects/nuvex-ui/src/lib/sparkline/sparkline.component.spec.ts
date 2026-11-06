import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SparklineComponent } from './sparkline.component';

describe('SparklineComponent', () => {
  let fixture: ComponentFixture<SparklineComponent>;
  let component: SparklineComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SparklineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SparklineComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should compute normalized points correctly', () => {
    fixture.componentRef.setInput('data', [10, 20, 30]);
    fixture.detectChanges();

    const pts = component.points();
    expect(pts.length).toBe(3);
    expect(pts[0].val).toBe(10);
    expect(pts[2].val).toBe(30);
    // Lower value should have higher y in SVG coordinate system
    expect(pts[0].y).toBeGreaterThan(pts[2].y);
  });

  it('should generate smooth Bézier curve command when curved is true', () => {
    fixture.componentRef.setInput('data', [10, 25, 15, 30]);
    fixture.componentRef.setInput('curved', true);
    fixture.detectChanges();

    const path = component.linePath();
    expect(path).toContain('M ');
    expect(path).toContain('C '); // Cubic Bézier command
  });

  it('should generate straight polyline when curved is false', () => {
    fixture.componentRef.setInput('data', [10, 25, 15, 30]);
    fixture.componentRef.setInput('curved', false);
    fixture.detectChanges();

    const path = component.linePath();
    expect(path).toContain('M ');
    expect(path).toContain('L ');
    expect(path).not.toContain('C ');
  });

  it('should generate closed area path when filled is true', () => {
    fixture.componentRef.setInput('data', [10, 25, 30]);
    fixture.componentRef.setInput('filled', true);
    fixture.detectChanges();

    const area = component.areaPath();
    expect(area).toContain('Z'); // Closed SVG path
  });

  it('should render SVG element in DOM', () => {
    fixture.componentRef.setInput('data', [10, 20, 30]);
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg.nuvex-sparkline-svg');
    expect(svg).toBeTruthy();
  });
});
