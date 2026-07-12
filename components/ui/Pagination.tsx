interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: Props) {

  return (
    <div className="flex justify-center gap-3 mt-10">

      {Array.from({
        length: totalPages,
      }).map((_, index) => (

        <button
          key={index}
          className={`
            w-12 h-12 rounded-full
            ${
              currentPage === index + 1
                ? "bg-pink-400 text-white"
                : "border"
            }
          `}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}