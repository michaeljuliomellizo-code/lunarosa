import { LoyaltyRepository } from "./LoyaltyRepository";

interface LoyaltyPurchase {
  email: string;
  orderId: string;
  total: number;
}

export class LoyaltyService {
  static async processPurchase(
    purchase: LoyaltyPurchase
  ) {
    // Funcionalidad pendiente de implementación completa.
    // Por ahora no realiza ninguna acción para permitir
    // que el proyecto compile correctamente.

    return true;
  }
}