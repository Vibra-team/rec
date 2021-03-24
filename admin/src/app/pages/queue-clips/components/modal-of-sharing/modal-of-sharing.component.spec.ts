import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOfSharingComponent } from './modal-of-sharing.component';

describe('ModalOfSharingComponent', () => {
  let component: ModalOfSharingComponent;
  let fixture: ComponentFixture<ModalOfSharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOfSharingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOfSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
