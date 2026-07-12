import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573123851338"
      target="_blank"
      className="fixed bottom-5 right-5 bg-green-500 p-4 rounded-full text-white"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}