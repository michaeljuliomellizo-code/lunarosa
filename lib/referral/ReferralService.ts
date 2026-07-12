import { ReferralRepository } from "./ReferralRepository";

export class ReferralService {
  static async registerReferral(
    code: string
  ) {
    const referral =
      await ReferralRepository.findByCode(
        code
      );

    if (!referral) {
      throw new Error(
        "Código de referido no encontrado."
      );
    }

    if (!referral.active) {
      throw new Error(
        "El código de referido está inactivo."
      );
    }

    return await ReferralRepository.registerUse(
      code
    );
  }

  static async registerReward(
    code: string,
    amount: number
  ) {
    const referral =
      await ReferralRepository.findByCode(
        code
      );

    if (!referral) {
      throw new Error(
        "Código de referido no encontrado."
      );
    }

    return await ReferralRepository.registerReward(
      code,
      amount
    );
  }

  static async getByCode(
    code: string
  ) {
    return await ReferralRepository.findByCode(
      code
    );
  }

  static async activate(
    id: string
  ) {
    return await ReferralRepository.activate(
      id
    );
  }

  static async deactivate(
    id: string
  ) {
    return await ReferralRepository.deactivate(
      id
    );
  }

  static async create(data: {
    code: string;
    customer_id?: string | null;
    customer_email?: string | null;
  }) {
    return await ReferralRepository.create(
      data
    );
  }

  static async list(
    limit = 100
  ) {
    return await ReferralRepository.list(
      limit
    );
  }

  static async delete(
    id: string
  ) {
    return await ReferralRepository.delete(
      id
    );
  }
    //--------------------------------------------------
  // Procesar compra (pendiente de implementación)
  //--------------------------------------------------

  static async processPurchase(
    customerEmail: string,
    total: number
  ) {
    // Sistema de referidos pendiente.
    // Se implementará cuando se active
    // el programa de recompensas.

    return true;
  }
}