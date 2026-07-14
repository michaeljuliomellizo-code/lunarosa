export default function TopBar() {
  return (
    <div className="bg-pink-400 text-white text-sm py-2">

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          flex
          flex-col
          sm:flex-row
          justify-between
          items-center
          gap-1
          text-center
        "
      >

        <p>
          Envíos nacionales
        </p>

        <p>
          WhatsApp: 3123851338
        </p>
      </div>
    </div>
  );
}