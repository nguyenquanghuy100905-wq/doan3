import styleFooter from "@/styles/footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTiktok,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import congchung from "@/ImageJeepBicycle/CongChung.png";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 pt-30">
      <div className="container mx-auto px-6 pb-30 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h1 className="font-bold text-4xl">QUANGHUY MOBILE</h1>
          <p className={`mt-5 ${styleFooter.styleContent}`}>
            QUANGHUY MOBILE VIETNAM giữ đúng tinh thần chung của Thương hiệu Điện
            thoại với những Giá trị Cốt lõi không thay đổi.
          </p>
          <p className={`mt-2 ${styleFooter.styleContent}`}>
            {" "}
            Đề cao sự Khoẻ Khoắn – Trẻ Trung tràn đầy Năng lượng Tích cực – Cá
            tính riêng
          </p>
          <div className="mt-5">
            <strong className={styleFooter.styleTitle}>
              CÔNG TY CỔ PHẦN THƯƠNG MẠI XUẤT NHẬP KHẨU QUANGHUY MOBILE
            </strong>
            <p className={`mt-5 ${styleFooter.styleContent}`}>
              ĐKKD/MST: 0110740818 do sở KH&ĐT TP. Hà Nội cấp ngày 07/06/2024
            </p>
            <p className={`mt-5 ${styleFooter.styleContent}`}>
              Trụ sở: Số 105 Nguyễn Bá Khoản, P.Trung Hòa, Q.Cầu Giấy, TP.Hà
              Nội, Việt Nam
            </p>
          </div>
        </div>
        <div>
          <h5 className={styleFooter.styleTitle}>Về chúng tôi</h5>
          <ul className="mt-5 space-y-2 ">
            <li>
              <a href="#" className={styleFooter.content}>
                Giới thiệu chung
              </a>
            </li>
            <li>
              <a href="#" className={styleFooter.content}>
                Liên hệ với chúng tôi
              </a>
            </li>
            <li>
              <a href="#" className={styleFooter.content}>
                Sản phẩm
              </a>
            </li>
            <li>
              <a href="#" className={styleFooter.content}>
                Tin tức
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className={styleFooter.styleTitle}>Hỗ trợ khách hàng</h5>
          <ul className="mt-5 space-y-2 ">
            <li>
              <a href="#" className={styleFooter.content}>
                Chính sách thanh toán
              </a>
            </li>
            <li>
              <a href="#" className={styleFooter.content}>
                Chính sách bảo hành
              </a>
            </li>
            <li>
              <a href="#" className={styleFooter.content}>
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="#" className={styleFooter.content}>
                Chính sách vận chuyển
              </a>
            </li>
            <li>
              <a href="#" className={styleFooter.content}>
                Chính sách đổi trả
              </a>
            </li>
            <li>
              <a href="#" className={styleFooter.content}>
                Chính sách giải quyết khiếu nại
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className={styleFooter.styleTitle}>Thông tin liên hệ</h5>
          <p className={`mt-5 ${styleFooter.styleContent}`}>
            Địa chỉ:
            <span className={styleFooter.content}>
              {" "}
              Tòa nhà VinaHud - 105 Nguyễn Bá Khoản - Phường Trung Hòa - Quận
              Cầu Giấy - T.P Hà Nội
            </span>
          </p>
          <p className={`mt-5 ${styleFooter.styleContent}`}>
            Hotline/Zalo:{" "}
            <span className={styleFooter.content}>0983862222</span>
          </p>
          <p className={`mt-5 ${styleFooter.styleContent}`}>
            Email:{" "}
            <span className={styleFooter.content}>quanghuymobile@gmail.com</span>
          </p>
          <div className="flex space-x-2 mt-5">
            <a
              href="#"
              className="w-9 h-9 p-2 flex items-center justify-center rounded-full bg-white  hover:bg-black hover:border-1 transition"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-black hover:text-white"
              />
            </a>
            <a
              href="#"
              className="w-9 h-9 p-2 flex items-center justify-center rounded-full bg-white  hover:bg-black hover:border-1 transition"
            >
              <FontAwesomeIcon
                icon={faTiktok}
                className="text-black hover:text-white"
              />
            </a>
            <a
              href="#"
              className="w-9 h-9 p-2 flex items-center justify-center rounded-full bg-white  hover:bg-black hover:border-1 transition"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-black hover:text-white"
              />
            </a>
            <a
              href="#"
              className="w-9 h-9 p-2 flex items-center justify-center rounded-full bg-white  hover:bg-black hover:border-1 transition"
            >
              <FontAwesomeIcon
                icon={faYoutube}
                className="text-black hover:text-white"
              />
            </a>
          </div>
          <div className="mt-5">
            <Image src={congchung} width={300} alt="Logo" />
          </div>
        </div>
      </div>
      <div className="flex justify-center border-t-2 items-center  text-gray-500 py-4">
        <p>
          &copy; TRANG WEB NÀY ĐƯỢC THIẾT KẾ BỞI QUANG HUY
          MOBILE!
        </p>
      </div>
    </footer>
  );
}
