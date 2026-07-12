import {
  ReportFilters,
  ReportsRepository,
} from "./ReportsRepository";

export class ReportsService {
  static async getSummary(
    filters?: ReportFilters
  ) {
    const orders =
      await ReportsRepository.getOrders(
        filters
      );

    const totalOrders =
      orders.length;

    const totalSales =
      orders.reduce(
        (sum, order) =>
          sum +
          Number(
            order.total ?? 0
          ),
        0
      );

    const averageTicket =
      totalOrders === 0
        ? 0
        : totalSales /
          totalOrders;

    const shippingTotal =
      orders.reduce(
        (sum, order) =>
          sum +
          Number(
            order.shipping ??
              0
          ),
        0
      );

    const subtotal =
      orders.reduce(
        (sum, order) =>
          sum +
          Number(
            order.subtotal ??
              0
          ),
        0
      );

    return {
      totalOrders,

      totalSales,

      subtotal,

      shippingTotal,

      averageTicket,
    };
  }

  static async salesByDay(
    filters?: ReportFilters
  ) {
    const orders =
      await ReportsRepository.getOrders(
        filters
      );

    const grouped:
      Record<
        string,
        {
          date: string;
          orders: number;
          sales: number;
        }
      > = {};

    for (const order of orders) {
      const date =
        new Date(
          order.created_at
        )
          .toISOString()
          .substring(0, 10);

      if (!grouped[date]) {
        grouped[date] = {
          date,
          orders: 0,
          sales: 0,
        };
      }

      grouped[date]
        .orders++;

      grouped[date]
        .sales += Number(
        order.total ?? 0
      );
    }

    return Object.values(
      grouped
    );
  }

  static async salesByProduct(
    filters?: ReportFilters
  ) {
    const items =
      await ReportsRepository.getOrderItems(
        filters
      );

    const grouped:
      Record<
        string,
        any
      > = {};

    for (const item of items) {
      const product =
        item.products;

      if (!product) {
        continue;
      }

      if (
        !grouped[
          product.id
        ]
      ) {
        grouped[
          product.id
        ] = {
          productId:
            product.id,

          name:
            product.name,

          slug:
            product.slug,

          quantity: 0,

          revenue: 0,
        };
      }

      grouped[
        product.id
      ].quantity +=
        Number(
          item.quantity
        );

      grouped[
        product.id
      ].revenue +=
        Number(
          item.quantity
        ) *
        Number(
          item.unit_price
        );
    }

    return Object.values(
      grouped
    ).sort(
      (
        a,
        b
      ) =>
        b.revenue -
        a.revenue
    );
  }

  static async salesByCategory(
    filters?: ReportFilters
  ) {
    const items =
      await ReportsRepository.getOrderItems(
        filters
      );

    const categories =
      await ReportsRepository.getCategories();

    const grouped:
      Record<
        string,
        any
      > = {};

    for (const item of items) {
      const product =
        item.products;

      if (!product) {
        continue;
      }

      const category =
        categories.find(
          (
            c
          ) =>
            c.id ===
            product.category_id
        );

      const key =
        category?.name ??
        "Sin categoría";

      if (
        !grouped[key]
      ) {
        grouped[key] = {
          category:
            key,

          quantity: 0,

          revenue: 0,
        };
      }

      grouped[
        key
      ].quantity +=
        Number(
          item.quantity
        );

      grouped[
        key
      ].revenue +=
        Number(
          item.quantity
        ) *
        Number(
          item.unit_price
        );
    }

    return Object.values(
      grouped
    ).sort(
      (
        a,
        b
      ) =>
        b.revenue -
        a.revenue
    );
  }

  static async salesByCustomer(
    filters?: ReportFilters
  ) {
    const orders =
      await ReportsRepository.getOrders(
        filters
      );

    const grouped:
      Record<
        string,
        any
      > = {};

    for (const order of orders) {
      const email =
        order.customer_email;

      if (
        !grouped[
          email
        ]
      ) {
        grouped[
          email
        ] = {
          email,

          customer:
            order.customer_name,

          orders: 0,

          total: 0,
        };
      }

      grouped[
        email
      ].orders++;

      grouped[
        email
      ].total +=
        Number(
          order.total
        );
    }

    return Object.values(
      grouped
    ).sort(
      (
        a,
        b
      ) =>
        b.total -
        a.total
    );
  }
  static async completeReport(
    filters?: ReportFilters
  ) {
    const [
      summary,
      salesByDay,
      salesByProduct,
      salesByCategory,
      salesByCustomer,
    ] = await Promise.all([
      this.getSummary(filters),
      this.salesByDay(filters),
      this.salesByProduct(filters),
      this.salesByCategory(filters),
      this.salesByCustomer(filters),
    ]);

    return {
      summary,
      salesByDay,
      salesByProduct,
      salesByCategory,
      salesByCustomer,
      generatedAt: new Date().toISOString(),
    };
  }
}