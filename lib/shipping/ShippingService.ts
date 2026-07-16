import { LocalProvider } from "./providers/LocalProvider";
import { InterrapidisimoProvider } from "./providers/InterrapidisimoProvider";
import { ShippingProvider } from "./providers/ShippingProvider";
import { SHIPPING_PROVIDER } from "./config";

export class ShippingService {

  //----------------------------------------------------------
  // Obtener Provider
  //----------------------------------------------------------

  private static getProvider(): ShippingProvider {

    const provider =
        SHIPPING_PROVIDER;    
    
    switch (provider) {

      case "interrapidisimo":

        return new InterrapidisimoProvider();

      case "local":

      default:

        return new LocalProvider();

    }

  }

  //----------------------------------------------------------
  // Calcular envío
  //----------------------------------------------------------

  static async calculate(
    department: string,
    municipality: string,
    weight?: number,
    declaredValue?: number
  ) {

    const provider =
      this.getProvider();

    return provider.calculate(
      department,
      municipality,
      weight,
      declaredValue
    );

  }

}