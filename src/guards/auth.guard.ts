import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers['authorization'];

    if (!authToken || !this.validateToken(authToken)) {
      throw new UnauthorizedException(
        'Invalid or missing authentication token',
      );
    }

    return true;
  }

  private validateToken(token: string): boolean {
    // ROP: For simplicity, we just check if the token is equal to a static valid token
    // Replace this logic with a JWT check using a secret or a library such as `jsonwebtoken` in production.
    return token === 'Bearer my-valid-token';
  }
}
