interface Props {
  headers: string[];
  children: React.ReactNode;
}

export default function Table({
  headers,
  children,
}: Props) {

  return (
    <div className="overflow-x-auto bg-white border rounded-3xl">

      <table className="w-full">

        <thead className="bg-pink-50">

          <tr>

            {headers.map((header) => (
              <th
                key={header}
                className="text-left p-5"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}