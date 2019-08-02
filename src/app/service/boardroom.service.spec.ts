import { TestBed } from '@angular/core/testing';

import { BoardroomService } from './boardroom.service';

describe('BoardroomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardroomService = TestBed.get(BoardroomService);
    expect(service).toBeTruthy();
  });
});
