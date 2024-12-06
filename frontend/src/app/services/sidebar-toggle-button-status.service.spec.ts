import { TestBed } from '@angular/core/testing';

import { SidebarToggleButtonStatusService } from './sidebar-toggle-button-status.service';

describe('SidebarToggleButtonStatusService', () => {
  let service: SidebarToggleButtonStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarToggleButtonStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
