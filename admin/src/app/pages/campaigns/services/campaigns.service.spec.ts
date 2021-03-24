import { TestBed } from '@angular/core/testing';

import { CampaignsService } from './campaigns.service';

describe('CampaignsService', () => {
  let service: CampaignsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
