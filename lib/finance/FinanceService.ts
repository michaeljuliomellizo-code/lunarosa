import { FinanceRepository } from "./FinanceRepository";

interface FinanceFilters {
  startDate?: string;
  endDate?: string;
  status?: string;
}

export class FinanceService {
  static async dashboard(
    filters: FinanceFilters = {}
  ) {
    return await FinanceRepository.getDashboard(
      filters
    );
  }

  static async cashFlow(
    filters: FinanceFilters = {}
  ) {
    const cashFlow =
      await FinanceRepository.getCashFlow(
        filters
      );

    return cashFlow.sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );
  }

  static async paymentMethods(
    filters: FinanceFilters = {}
  ) {
    const methods =
      await FinanceRepository.getPaymentMethods(
        filters
      );

    const total = methods.reduce(
      (sum, item) =>
        sum + Number(item.total),
      0
    );

    return methods
      .map((item) => ({
        ...item,
        percentage:
          total === 0
            ? 0
            : Number(
                (
                  (Number(item.total) /
                    total) *
                  100
                ).toFixed(2)
              ),
      }))
      .sort(
        (a, b) =>
          Number(b.total) -
          Number(a.total)
      );
  }

  static async accountsReceivable() {
    const accounts =
      await FinanceRepository.getAccountsReceivable();

    return accounts
      .map((account) => ({
        ...account,
        daysPending: Math.floor(
          (Date.now() -
            new Date(
              account.createdAt
            ).getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      }))
      .sort(
        (a, b) =>
          b.daysPending -
          a.daysPending
      );
  }

  static async financialStatement(
    filters: FinanceFilters = {}
  ) {
    const statement =
      await FinanceRepository.getFinancialStatement(
        filters
      );

    const grossSales =
      Number(statement.sales);

    const shipping =
      Number(statement.shipping);

    const subtotal =
      Number(statement.subtotal);

    const netSales =
      grossSales - shipping;

    const shippingPercentage =
      grossSales === 0
        ? 0
        : Number(
            (
              (shipping /
                grossSales) *
              100
            ).toFixed(2)
          );

    return {
      subtotal,
      shipping,
      grossSales,
      netSales,
      averageTicket:
        Number(
          statement.averageTicket
        ),
      completedOrders:
        statement.completed,
      cancelledOrders:
        statement.cancelled,
      shippingPercentage,
    };
  }

  static async executiveDashboard(
    filters: FinanceFilters = {}
  ) {
    const [
      dashboard,
      cashFlow,
      paymentMethods,
      accountsReceivable,
      financialStatement,
    ] = await Promise.all([
      this.dashboard(filters),
      this.cashFlow(filters),
      this.paymentMethods(filters),
      this.accountsReceivable(),
      this.financialStatement(
        filters
      ),
    ]);

    return {
      dashboard,
      cashFlow,
      paymentMethods,
      accountsReceivable,
      financialStatement,
      generatedAt:
        new Date().toISOString(),
    };
  }
}