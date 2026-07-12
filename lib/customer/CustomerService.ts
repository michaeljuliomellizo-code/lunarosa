import {
  CustomerRepository,
} from "./CustomerRepository";

interface CustomerData {
  name: string;
  email: string;
  phone?: string;
  total: number;
}

export class CustomerService {
  static async registerPurchase(
    customer: CustomerData
  ) {
    const existingCustomer =
      await CustomerRepository.findByEmail(
        customer.email
      );

    //--------------------------------------------------
    // Cliente existente
    //--------------------------------------------------

    if (existingCustomer) {
      const updated =
        await CustomerRepository.update(
          existingCustomer.id,
          {
            name: customer.name,

            phone:
              customer.phone ?? null,

            total_spent:
              Number(
                existingCustomer.total_spent
              ) +
              Number(customer.total),

            total_orders:
              Number(
                existingCustomer.total_orders
              ) + 1,

            last_order_at:
              new Date().toISOString(),
          }
        );

      return updated.id;
    }

    //--------------------------------------------------
    // Cliente nuevo
    //--------------------------------------------------

    const created =
      await CustomerRepository.create({
        name: customer.name,

        email: customer.email,

        phone:
          customer.phone ?? null,

        total_spent:
          Number(customer.total),

        total_orders: 1,

        last_order_at:
          new Date().toISOString(),
      });

    return created.id;
  }

  static async getByEmail(
    email: string
  ) {
    return CustomerRepository.findByEmail(
      email
    );
  }

  static async updateBasicInfo(
    customerId: string,
    data: {
      name?: string;
      phone?: string;
    }
  ) {
    return CustomerRepository.update(
      customerId,
      data
    );
  }

  static async list(
    limit = 100
  ) {
    return CustomerRepository.list(limit);
  }

  static async delete(
    id: string
  ) {
    return CustomerRepository.delete(id);
  }
}