interface Props {
  department?: string | null;
  municipality?: string | null;
  address?: string | null;
}

export default function OrderShipping({

  department,

  municipality,

  address,

}: Props) {

  return (

    <div className="bg-white rounded-3xl border p-6">

      <h2 className="font-semibold mb-4">

        Envío

      </h2>

      <p>

        {address}

      </p>

      <p>

        {municipality}

        {" - "}

        {department}

      </p>

    </div>

  );

}