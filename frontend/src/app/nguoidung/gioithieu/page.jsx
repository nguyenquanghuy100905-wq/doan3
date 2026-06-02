"use client";
import Link from "next/link";
import styleGioiThieu from "@/styles/gioithieu.module.css";
import Image from "next/image";
import img1 from "@/ImageJeepBicycle/GioiThieu/Music PSD, High Quality Free PSD Templates for Download _ Freepik.jpg";
import img2 from "@/ImageJeepBicycle/GioiThieu/Social Media Banner _ Webinar - Rifat Alam Rafi.jpg";
import img3 from "@/ImageJeepBicycle/GioiThieu/SOCIAL MEDIA LOJA DE CELULARES.jpg";
import { Helmet } from "react-helmet";

const Section = ({ title, content, image, reverse }) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center mb-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="md:w-1/2 px-4">
        <h2 className={styleGioiThieu.titleContent}>{title}</h2>
        {Array.isArray(content) ? (
          <ul className="list-none">
            {content.map((item, index) => (
              <li key={index} className={styleGioiThieu.contentTitle}>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styleGioiThieu.contentTitle}>{content}</p>
        )}
      </div>
      <div className="md:w-1/2 px-4">
        <Image src={image} alt={title} className="w-full rounded-4xl" />
      </div>
    </div>
  );
};
export default function GioiThieu() {
  function pageLienHe() {
    window.location.href = "/nguoidung/trangchu";
  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>GioiThieu</title>
      </Helmet>
      <div
        className={`${styleGioiThieu.background} w-full h-55 flex items-center justify-center`}
      >
        <div className="text-center">
          <h2 className={styleGioiThieu.title}>Về Chúng Tôi</h2>
          <p className={styleGioiThieu.content}>
            <Link href="/nguoidung/trangchu">Trang Chủ</Link> » Giới thiệu về
            Quang Huy Mobile
          </p>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl my-16 px-4">
        <Section
          title="Sứ mệnh"
          content="Sứ mệnh của Quang Huy MobileMobile là cung cấp các sản phẩm điện thoại chất lượng, đa dạng mẫu mã với giá cả hợp lý, cùng dịch vụ tư vấn và hỗ trợ khách hàng tận tâm, nhằm mang đến trải nghiệm mua sắm hài lòng và đáp ứng tốt nhất nhu cầu liên lạc, công nghệ của khách hàng."
          image={img1}
        />
        <Section
          title="Tầm nhìn"
          content="Tầm nhìn của chúng tôi là trở thành thương hiệu bán lẻ điện thoại uy tín hàng đầu, được khách hàng tin tưởng lựa chọn nhờ chất lượng sản phẩm, dịch vụ chuyên nghiệp và trải nghiệm mua sắm hiện đại, góp phần nâng cao cuộc sống số của cộng đồng. "
          image={img2}
          reverse
        />
        <Section
          title="Giá trị cốt lõi"
          content={[
            "Chất lượng sản phẩm chính hãng",
            "Uy tín và minh bạch",
            "Tận tâm phục vụ khách hàng.",
            "Giá cả hợp lý.",
          ]}
          image={img3}
        />
      </div>
      <div
        className={`${styleGioiThieu.footerbackground} w-full h-72 flex items-center justify-center`}
      >
        <div className="text-center">
          <h2 className={styleGioiThieu.footertitle}>Liên hệ với chúng tôi</h2>
          <p className={`${styleGioiThieu.footercontent} w-7xl`}>
            Chúng tôi xây dựng một đội ngũ chuyên viên và tư vấn viên chuyên
            nghiệp, giàu kinh nghiệm, có kiến thức chuyên môn sâu sắc và đam mê
            với lĩnh vực điện thoạithoại. Sứ mệnh của chúng tôi là luôn sẵn sàng hỗ trợ
            và giải đáp mọi thắc mắc của khách hàng về các loại máymáy, mẫu mã,
            chính sách và dịch vụ hậu đãi.
          </p>
          <button
            onClick={pageLienHe}
            className={`p-4 ${styleGioiThieu.footerbutton} w-2xs rounded-2xl`}
          >
            Liên hệ chúng tôi ngay &#62;
          </button>
        </div>
      </div>
    </div>
  );
}
