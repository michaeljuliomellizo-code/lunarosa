import Image from "next/image";
import {
  ShieldCheck,
  RefreshCcw,
  Mail,
  MessageCircle,
  Clock3,
  BadgeCheck,
} from "lucide-react";

export default function PoliticasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100">

      <section
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-8
          sm:py-12
          lg:py-20
        "
      >

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            lg:gap-16
            items-center
          "
        >

          <div>

            <div className="inline-flex items-center gap-3 bg-pink-100 px-6 py-3 rounded-full">

              <ShieldCheck
                className="text-pink-600"
                size={22}
              />

              <span className="font-semibold text-pink-700">
                Políticas Luna Rosa
              </span>

            </div>

            <h1
              className="
                text-2xl sm:text-3xl
                sm:text-4xl
                lg:text-6xl
                font-black
                mt-6
                sm:mt-8
                leading-tight
              "
            >

              Política de
              <span className="text-pink-600">
                {" "}Devoluciones
              </span>

              <br />

              y Garantías

            </h1>

            <p
              className="
                text-base
                sm:text-lg
                text-gray-600
                mt-6
                sm:mt-8
                leading-7
                sm:leading-8
              "
            >

              En Luna Rosa trabajamos para ofrecer productos de excelente
              calidad. Si tu compra presenta algún inconveniente, aquí
              encontrarás toda la información relacionada con garantías,
              devoluciones y reclamaciones.

            </p>

          </div>

          <div>

            <Image
              src="/Politicas.png"
              alt="Políticas Luna Rosa"
              width={700}
              height={700}
              priority
              className="
                w-full
                h-auto
                rounded-3xl
                shadow-2xl
              "
            />

          </div>

        </div>

      </section>

      <section
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          pb-12
          sm:pb-20
          lg:pb-24
          space-y-6
          sm:space-y-10
        "
      >

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10">

          <div className="flex items-center gap-4">

            <MessageCircle
              className="text-pink-600"
              size={32}
            />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Reclamaciones
            </h2>

          </div>

          <div className="mt-8 space-y-5 text-gray-700 leading-8">

            <p>

              Para cualquier consulta o reclamación puedes comunicarte con nosotros a:

            </p>

            <div className="bg-pink-50 rounded-2xl p-6">

              <p>

                <strong>Correo:</strong>

                <br />

                lunarosa.mujer10@gmail.com

              </p>

              <p className="mt-4">

                <strong>WhatsApp:</strong>

                <br />

                +57 312 385 1338

              </p>

              <p className="mt-4">

                <strong>Horario de atención</strong>

                <br />

                Lunes a Viernes
                8:00 a.m. - 5:00 p.m.

                <br />

                Sábados
                8:00 a.m. - 12:00 m.

              </p>

            </div>

            <p>

              Damos respuesta a todas las solicitudes en un plazo máximo de
              <strong> 72 horas hábiles.</strong>

            </p>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10">

          <div className="flex items-center gap-4">

            <RefreshCcw
              className="text-pink-600"
              size={32}
            />

            <h2 className="text-2xl sm:text-3xl font-bold">

              Procedimiento para Solicitar Cambios

            </h2>

          </div>

          <div className="mt-8 text-gray-700 leading-8">

            <p>

              Para solicitar un cambio debes enviar un correo electrónico
              adjuntando:

            </p>

            <ul className="list-disc ml-8 mt-6 space-y-3">

              <li>Soporte de pago.</li>

              <li>Registro fotográfico del producto.</li>

              <li>Descripción del inconveniente.</li>

            </ul>

            <p className="mt-8">

              La solicitud será revisada por nuestro departamento de servicio
              al cliente y, si cumple con las condiciones establecidas,
              se aprobará el proceso de garantía.

            </p>

            <p className="mt-6">

              Una vez aprobada, la coordinación del cambio se realizará por
              WhatsApp.

            </p>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10">

          <div className="flex items-center gap-4">

            <BadgeCheck
              className="text-pink-600"
              size={32}
            />

            <h2 className="text-2xl sm:text-3xl font-bold">

              Garantía

            </h2>

          </div>

          <div className="mt-8">

            <ol className="list-decimal ml-8 space-y-4 text-gray-700 leading-8">

              <li>El producto debe haber recibido un uso adecuado.</li>

              <li>Debe encontrarse dentro del período de garantía.</li>

              <li>Es obligatorio presentar el soporte de pago.</li>

              <li>

                El reclamo debe realizarse máximo dentro de los
                <strong> 4 días </strong>
                posteriores a la compra.

              </li>

            </ol>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10">

          <div className="flex items-center gap-4">

            <Clock3
              className="text-pink-600"
              size={32}
            />

            <h2 className="text-2xl sm:text-3xl font-bold">

              Trámite de Garantía

            </h2>

          </div>

          <div className="mt-8 space-y-6 text-gray-700 leading-8">

            <p>

              Solo se aceptan devoluciones cuando el producto presente
              defectos de fábrica.

            </p>

            <p>

              El plazo máximo para reportar el inconveniente es de
              <strong> 4 días hábiles </strong>
              contados desde la fecha de entrega.

            </p>

            <p>

              Debes enviar al correo:

            </p>

            <div className="bg-pink-50 rounded-2xl p-5 font-semibold">

              lunarosa.mujer10@gmail.com

            </div>

            <p>

              Adjuntando:

            </p>

            <ul className="list-disc ml-8 space-y-3">

              <li>Soporte de pago.</li>

              <li>Registro fotográfico del producto.</li>

            </ul>

            <p>

              Recibirás respuesta escrita en un máximo de
              <strong> 72 horas hábiles.</strong>

            </p>

          </div>

        </div>

        <div className="
          bg-gradient-to-r
          from-pink-500
          to-pink-600
          rounded-3xl
          text-white
          p-6
          sm:p-10
          lg:p-12
          ">

          <h2
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-black
            "
          >

            Si la garantía es aprobada

          </h2>

          <p className="mt-6 text-pink-100 text-lg">

            Se realizará la devolución total del dinero mediante efectivo
            o transferencia bancaria indicada por el cliente.

          </p>

          <a
            href="https://wa.me/573123851338"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-10 bg-white text-pink-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:scale-105 transition"
          >

            <MessageCircle size={22} />

            Contactar por WhatsApp

          </a>

        </div>

      </section>

    </main>
  );
}