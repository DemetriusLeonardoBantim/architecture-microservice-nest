import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  sub: string;
}

export const CurrentUser = createParamDecorator((data: unknown, ctx: any) =>
  GqlExecutionContext.create(ctx).getContext(),
);
