import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY, Role } from '@app/guards/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    if (!context.switchToHttp().getRequest().isAuthenticated()) {
      return false;
    }
    const { session } = context.switchToHttp().getRequest();
    // console.log(session.passport.user);
    return requiredRoles.some((role) => session.passport.user.role === role);
    // session.passport.user.roles?.includes(role);
  }
}
