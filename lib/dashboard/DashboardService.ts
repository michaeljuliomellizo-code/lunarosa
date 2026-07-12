import { DashboardRepository } from "./DashboardRepository";

export interface DashboardOverview {
  todaySales: number;
  monthSales: number;

  orders: {
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };

  customers: number;

  averageTicket: number;

  recentOrders: any[];

  recentCustomers: any[];

  lowStock: any[];

  inventoryMovements: any[];
}

export class DashboardService {
  //---------------------------------------
  // Dashboard Comercial Completo
  //---------------------------------------

  static async overview(): Promise<DashboardOverview> {
    const [
      todaySales,
      monthSales,

      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,

      customers,

      averageTicket,

      recentOrders,
      recentCustomers,

      lowStock,

      inventoryMovements,
    ] = await Promise.all([
      DashboardRepository.getTodaySales(),

      DashboardRepository.getMonthSales(),

      DashboardRepository.getOrdersCount(),

      DashboardRepository.getOrdersByStatus(
        "pending"
      ),

      DashboardRepository.getOrdersByStatus(
        "processing"
      ),

      DashboardRepository.getOrdersByStatus(
        "shipped"
      ),

      DashboardRepository.getOrdersByStatus(
        "delivered"
      ),

      DashboardRepository.getOrdersByStatus(
        "cancelled"
      ),

      DashboardRepository.getCustomersCount(),

      DashboardRepository.getAverageTicket(),

      DashboardRepository.getRecentOrders(10),

      DashboardRepository.getRecentCustomers(10),

      DashboardRepository.getLowStockProducts(),

      DashboardRepository.getRecentInventoryMovements(
        10
      ),
    ]);

    return {
      todaySales,

      monthSales,

      customers,

      averageTicket,

      orders: {
        total: totalOrders,

        pending: pendingOrders,

        processing: processingOrders,

        shipped: shippedOrders,

        delivered: deliveredOrders,

        cancelled: cancelledOrders,
      },

      recentOrders,

      recentCustomers,

      lowStock,

      inventoryMovements,
    };
  }

  //---------------------------------------
  // KPIs solamente
  //---------------------------------------

  static async kpis() {
    const overview =
      await this.overview();

    return {
      todaySales:
        overview.todaySales,

      monthSales:
        overview.monthSales,

      customers:
        overview.customers,

      averageTicket:
        overview.averageTicket,

      orders:
        overview.orders,
    };
  }

  //---------------------------------------
  // Actividad reciente
  //---------------------------------------

  static async activity() {
    const overview =
      await this.overview();

    return {
      recentOrders:
        overview.recentOrders,

      recentCustomers:
        overview.recentCustomers,

      inventoryMovements:
        overview.inventoryMovements,
    };
  }

  //---------------------------------------
  // Productos con bajo stock
  //---------------------------------------

  static async lowStock() {
    return await DashboardRepository.getLowStockProducts();
  }
}