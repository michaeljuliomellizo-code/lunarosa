import PublicOrderDetail from "@/components/orders/PublicOrderDetail";

export default async function PaymentPage({
    params,
}:{
    params:Promise<{id:string}>
}){

    const {id}=await params;

    return(

        <div className="max-w-7xl mx-auto px-6 py-10">

            <div className="mb-8 text-center">

                <h1 className="text-4xl font-bold">

                    Pedido recibido

                </h1>

                <p className="text-gray-500 mt-2">

                    Gracias por comprar en Luna Rosa.

                </p>

            </div>

            <PublicOrderDetail
                orderId={id}
            />

        </div>

    );

}