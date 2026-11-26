import { TestBed } from '@angular/core/testing';
import { ResumenApi } from './resumen-api';

describe('ResumenApi', () => {
  let service: ResumenApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumenApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
