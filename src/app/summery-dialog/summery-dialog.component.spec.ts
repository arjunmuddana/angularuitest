import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummeryDialogComponent } from './summery-dialog.component';

describe('SummeryDialogComponent', () => {
  let component: SummeryDialogComponent;
  let fixture: ComponentFixture<SummeryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummeryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummeryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
