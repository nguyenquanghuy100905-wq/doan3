import icon1 from "@/ImageJeepBicycle/facebook.png";
import icon2 from "@/ImageJeepBicycle/phone.png";
import icon3 from "@/ImageJeepBicycle/zalo.png";
import Image from "next/image";
import Link from "next/link";

export default function LienHe() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col space-y-4">
      <Link href="https://facebook.com">
        <div className="flex justify-center items-center w-16 h-16 bg-blue-500 text-white text-xl rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-300 transform hover:scale-110">
          <Image src={icon1} alt="facebook" width={40} height={40} />
        </div>
      </Link>
      <Link href="tel:0123456789">
        <div className="flex justify-center items-center w-16 h-16 bg-green-500 text-white text-xl rounded-full shadow-lg hover:bg-green-600 transition-transform duration-300 transform hover:scale-110">
          <Image src={icon2} alt="phone" width={40} height={40} />
        </div>
      </Link>
      <Link href="https://zalo.me">
        <div className="flex justify-center items-center w-16 h-16 bg-blue-400 text-white text-xl rounded-full shadow-lg hover:bg-blue-500 transition-transform duration-300 transform hover:scale-110">
          <Image src={icon3} alt="zalo" width={40} height={40} />
        </div>
      </Link>
    </div>
  );
}
