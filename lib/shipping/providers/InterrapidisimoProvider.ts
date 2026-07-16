import {
  ShippingProvider,
  ShippingQuote,
} from "./ShippingProvider";

export class InterrapidisimoProvider
  implements ShippingProvider
{
  async calculate(
    department: string,
    municipality: string,
    weight?: number,
    declaredValue?: number
  ): Promise<ShippingQuote> {

    // TODO:
    // Aquí se conectará la API oficial
    // de Interrapidísimo.

    throw new Error(
      "Interrapidísimo Provider aún no implementado."
    );

  }
}