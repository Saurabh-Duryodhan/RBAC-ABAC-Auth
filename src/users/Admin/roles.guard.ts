import { ROLES_KEY } from './roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';


import { Role } from './role.enum';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireRoles) {
      return true;
    }
    const user = {
      name: "Saurabh Duryodhan",
      roles: Role.USER,
    }
    return requireRoles.some((role) => user.roles?.includes(role));
  }
}
