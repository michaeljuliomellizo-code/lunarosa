import PublicOrderDetail from "@/components/orders/PublicOrderDetail";

export default async function PaymentPage({
    params,
}:{
    params:Promise<{id:string}>
}){

    const {id}=await params;

    return(

        <div
            className="
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
                py-6
                sm:py-8
                lg:py-10
            "
            >

            <div className="mb-8 text-center">

                <h1
                    className="
                        text-2xl
                        sm:text-3xl
                        lg:text-4xl
                        font-bold
                    "
                    >

                    Pedido recibido

                </h1>

                <p
                    className="
                        text-sm
                        sm:text-base
                        text-gray-600
                        mt-2
                    "
                    >

                    Gracias por comprar en Luna Rosa.

                </p>

            </div>

            <PublicOrderDetail
                orderId={id}
            />

        </div>

    );

}