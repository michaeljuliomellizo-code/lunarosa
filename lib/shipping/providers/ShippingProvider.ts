export interface ShippingQuote {

  available: boolean;

  price: number;

  estimated_days: number | null;

}

export interface ShippingProvider {

  calculate(
    department: string,
    municipality: string,
    weight?: number,
    declaredValue?: number
  ): Promise<ShippingQuote>;

}