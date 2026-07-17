import CartHeader from "@/components/cart/CartHeader";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import CartCoupon from "@/components/cart/CartCoupon";
import CartShipping from "@/components/cart/CartShipping";
import CartActions from "@/components/cart/CartActions";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function CartPage() {
  

  return (
    <main
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-6
          sm:py-10
          lg:py-16
        "
      >

      <CartHeader />

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
          lg:gap-10
          items-start
        "
      >

        {/* LEFT */}
        <div
          className="
            lg:col-span-2
            space-y-6
            sm:space-y-8
          "
        >

          <CartList />

          <CartCoupon />

          <CartActions />
        </div>

        {/* RIGHT */}
        <div className="lg:sticky lg:top-24">
          <CartSummary />
        </div>
      </div>
    </main>
  );
}