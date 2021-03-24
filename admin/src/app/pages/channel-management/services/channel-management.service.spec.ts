import { TestBed } from '@angular/core/testing';

import { ChannelManagementService } from './channel-management.service';

describe('ChannelManagementService', () => {
  let service: ChannelManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
