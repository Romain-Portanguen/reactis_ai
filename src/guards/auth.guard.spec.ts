import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('The AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should allow access if token is valid', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer my-valid-token',
          },
        }),
      }),
    };

    expect(authGuard.canActivate(mockContext as ExecutionContext)).toBe(true);
  });

  it('should deny access if token is missing', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    };

    expect(() =>
      authGuard.canActivate(mockContext as ExecutionContext),
    ).toThrow(UnauthorizedException);
  });

  it('should deny access if token is invalid', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer invalid-token',
          },
        }),
      }),
    };

    expect(() =>
      authGuard.canActivate(mockContext as ExecutionContext),
    ).toThrow(UnauthorizedException);
  });
});
