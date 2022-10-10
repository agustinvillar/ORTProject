import { TestBed } from '@angular/core/testing';

import { NewPlayerService } from './new-player.service';

describe('NewPlayerService', () => {
  let service: NewPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
