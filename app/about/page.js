import Socials from "@/components/Socials";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const page = () => {
  return (
    <div className="relative text-lg lg:text-2xl flex flex-col items-center p-8 mt-20 space-y-6 mx-auto max-w-3xl">
      <Link
        href="/"
        className="flex text-sm lg:text-base items-center space-x-1 absolute left-4 -top-4"
      >
        <IoIosArrowBack className="text-lg" />
        <span>Atpakaļ</span>
      </Link>
      <h2 className="font-thin">Čau! 👋🏼</h2>{" "}
      <p className="font-thin w-full text-center">
        <span className="italic font-extralight">
          Šī vietne radās divu pēcpusdienu laikā 2025. gada marta beigās
        </span>
        , kad atkal sastapos ar grūtībām pieņemt sarežģītus lēmumus.
      </p>{" "}
      <p className="font-thin w-full text-center">
        Atcerējos, ka grāmatā{" "}
        <span className="italic font-extralight">“Millionaire Fastlane”</span>{" "}
        M.J. DeMarco stāstīja, kā pats pieņem lēmumus, izmantojot{" "}
        <span className="italic font-extralight">
          vidējo svērto lēmumu matricu (weighted average decision matrix).
        </span>
      </p>{" "}
      <p className="font-thin w-full text-center">
        Tā ir{" "}
        <span className="italic font-extralight">
          vienkārša, bet efektīva metode
        </span>
        , lai racionalizētu izvēles, kas balstītas uz vairākiem pēc prioritātes
        sakārtotiem faktoriem.
      </p>
      <p className="font-thin w-full text-center">
        Negribēju katru reizi izmantot papīru un pildspalvu, jo mūsdienās
        tīmekļa vietne ir pieejamāka.{" "}
        <span className="italic font-extralight">
          Izveidoju šo rīku sev, taču padalos arī ar Tevi.
        </span>
      </p>
      <p className="font-thin w-full text-center">
        Ja šī vietne palīdzēja pieņemt kādu labu lēmumu,{" "}
        <span className="italic font-extralight">priecāšos par atsauksmi!</span>
      </p>
      <p className="font-thin w-full text-center">
        Veiksmīgus lēmumus vēlot, <br />
        <span className="font-extralight italic">Atis</span>
      </p>
      <Socials />
    </div>
  );
};

export default page;
