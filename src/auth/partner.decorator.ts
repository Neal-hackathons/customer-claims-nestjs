import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthedPartner = createParamDecorator(
  (_, executionContext: ExecutionContext) => {
    // user is the partner
    // user is a hardcoded property of the request object
    return executionContext.switchToHttp().getRequest().user;
  },
);
