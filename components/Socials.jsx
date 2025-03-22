import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
const Socials = () => {
  return (
    <div className="w-full max-w-sm mx-auto flex items-center justify-center gap-8">
      <a href="https://x.com/atis_ozols">
        <FaXTwitter className="text-lg" />
      </a>
      <a href="https://youtube.com/@atisozols">
        <FaYoutube className="text-xl" />
      </a>
      <a href="https://instagram.com/atisozols">
        <FaInstagram className="text-lg" />
      </a>
    </div>
  );
};

export default Socials;
