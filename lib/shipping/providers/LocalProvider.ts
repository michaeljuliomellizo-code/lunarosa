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

    const city =
      municipality
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const isBogota =
      city === "bogota" ||
      city === "bogota d.c." ||
      city === "bogota dc";

    if (isBogota) {
      return {
        available: true,
        price: 12000,
        estimated_days: 3,
      };
    }

    return {
      available: true,
      price: 0,
      estimated_days: 6,
    };
  }
}