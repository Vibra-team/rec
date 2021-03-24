import { TestBed } from '@angular/core/testing';

import { QueueClipService } from './queue-clip.service';

describe('QueueClipService', () => {
  let service: QueueClipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueueClipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
