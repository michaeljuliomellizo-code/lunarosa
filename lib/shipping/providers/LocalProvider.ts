import { ShippingRepository } from "../ShippingRepository";
import {
  ShippingProvider,
  ShippingQuote,
} from "./ShippingProvider";

export class LocalProvider
  implements ShippingProvider
{
  async calculate(
    department: string,
    municipality: string,
    weight?: number,
    declaredValue?: number
  ): Promise<ShippingQuote> {

    const rate =
      await ShippingRepository.findRate(
        department,
        municipality
      );

    if (!rate) {

      return {
        available: false,
        price: 0,
        estimated_days: null,
      };

    }

    return {

      available: true,

      price: Number(rate.price),

      estimated_days:
        rate.estimated_days ?? null,

    };

  }
}