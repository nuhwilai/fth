import { TestBed, inject } from '@angular/core/testing'

import { AuthGuardService } from './auth-guard.service'
import { AuthService } from './auth.service'
import { intersection } from 'lodash'
import { RouterTestingModule } from '@angular/router/testing'

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuardService],
    })
  })

  it('should be created', inject(
    [AuthGuardService],
    (service: AuthGuardService) => {
      expect(service).toBeTruthy()
    },
  ))
})
