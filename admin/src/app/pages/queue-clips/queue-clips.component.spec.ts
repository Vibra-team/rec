import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueClipsComponent } from './queue-clips.component';

describe('QueueClipsComponent', () => {
  let component: QueueClipsComponent;
  let fixture: ComponentFixture<QueueClipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueClipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueClipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
