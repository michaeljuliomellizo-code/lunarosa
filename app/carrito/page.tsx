import CartHeader from "@/components/cart/CartHeader";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import CartCoupon from "@/components/cart/CartCoupon";
import CartShipping from "@/components/cart/CartShipping";
import CartActions from "@/components/cart/CartActions";

export default function CartPage() {

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">

      <CartHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          <CartList />

          <CartCoupon />

          <CartActions />
        </div>

        {/* RIGHT */}
        <div>
          <CartSummary />
        </div>
      </div>
    </main>
  );
}