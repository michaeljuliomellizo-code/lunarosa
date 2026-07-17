import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function CheckoutPage() {
  
  return (
    <div
      className="
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-10
        lg:py-12
      "
    >
    
      <CheckoutForm />
    </div>
  );
}