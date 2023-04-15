import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Purchase } from '../models/purchase';
import { PurchasesService } from 'src/services/purchases.service';
import { Product } from '../models/product';
import { ProductsService } from 'src/services/products.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input-';
import { CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productService: ProductsService,
    private customerService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: any,
  ) {
    let customer = await this.customerService.getCustomerByAuthUserId(
      user.req.auth.sub,
    );

    if (!customer) {
      customer = await this.customerService.createCustomer({
        authUserId: user.req.auth.sub,
      });
    }

    return this.purchasesService.createPurchase({
      customerId: customer.id,
      productId: data.productId,
    });
  }
}
