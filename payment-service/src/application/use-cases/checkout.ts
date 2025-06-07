import {
  CheckoutDto,
  CustomError,
  Order,
  OrderRepository,
  StripeService,
} from '../../domain';

interface CheckoutResponse {
  url: string;
  order: Order;
}

export interface CheckoutUseCase {
  execute(checkoutDto: CheckoutDto): Promise<CheckoutResponse>;
}

export class Checkout implements CheckoutUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly stripeService: StripeService,
  ) {}

  async execute(checkoutDto: CheckoutDto): Promise<CheckoutResponse> {
    const response = await this.orderRepository.createOrder(checkoutDto);

    if (!response.ok) {
      const { error } = await response.json();
      throw CustomError.badRequest(error);
    }

    const order = await response.json();

    const url = await this.stripeService.createCheckoutSession(
      checkoutDto.items,
      order.id,
    );

    if (!url) {
      throw CustomError.internalServer('Error creating payment session');
    }

    return {
      url,
      order,
    };
  }
}
