interface Props {
  rating: number;
}

export default function RatingStars({
  rating,
}: Props) {

  return (
    <div className="flex gap-1 text-yellow-400">

      {Array.from({ length: 5 }).map(
        (_, index) => (
          <span key={index}>
            {index < rating ? "★" : "☆"}
          </span>
        )
      )}
    </div>
  );
}