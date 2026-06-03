'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import styles from "@/styles/tintuc.module.css";

export default function TinTuc() {
    // Data mẫu cứng
    const sampleNews = [
        {
            id: 1,
            title: "iPhone 16 Pro Max - Siêu phẩm mới nhất từ Apple",
            summary: "Apple vừa công bố iPhone 16 Pro Max với nhiều cải tiến vượt trội về camera, hiệu năng và pin. Thiết bị hứa hẹn sẽ là flagship đáng mong đợi nhất năm 2024.",
            content: "iPhone 16 Pro Max đã chính thức ra mắt với chip A18 Pro mạnh mẽ...",
            image_path: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
            created_at: "2024-05-20"
        },
        {
            id: 2,
            title: "Samsung Galaxy S24 Ultra giảm giá sốc 30%",
            summary: "Chương trình khuyến mãi lớn nhất trong năm cho Galaxy S24 Ultra. Cơ hội sở hữu siêu phẩm với giá không thể tốt hơn.",
            content: "Samsung Galaxy S24 Ultra đang có chương trình giảm giá đặc biệt...",
            image_path: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
            created_at: "2024-05-18"
        },
        {
            id: 3,
            title: "Xiaomi 15 Series ra mắt tại Việt Nam",
            summary: "Xiaomi chính thức giới thiệu dòng Xiaomi 15 Series với giá cực kỳ cạnh tranh và nhiều công nghệ mới.",
            content: "Xiaomi 15 Series là dòng flagship mới nhất của Xiaomi...",
            image_path: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800",
            created_at: "2024-05-15"
        },
        {
            id: 4,
            title: "5 mẹo kéo dài thời lượng pin điện thoại",
            summary: "Hướng dẫn chi tiết các cách giúp bạn tối ưu hóa thời lượng pin và kéo dài tuổi thọ pin cho điện thoại của mình.",
            content: "Pin là một trong những yếu tố quan trọng nhất...",
            image_path: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800",
            created_at: "2024-05-12"
        },
        {
            id: 5,
            title: "So sánh iPhone 15 Pro vs Samsung S24",
            summary: "Đánh giá chi tiết hai flagship đình đám của Apple và Samsung để giúp bạn có lựa chọn phù hợp nhất.",
            content: "iPhone 15 Pro và Samsung S24 đều là những flagship xuất sắc...",
            image_path: "https://images.unsplash.com/photo-1592286927505-2fd7c3b16a9e?w=800",
            created_at: "2024-05-10"
        },
        {
            id: 6,
            title: "Công nghệ camera điện thoại 2024",
            summary: "Những xu hướng và công nghệ camera mới nhất trên thị trường điện thoại thông minh năm 2024.",
            content: "Camera điện thoại đã có những bước tiến vượt bậc...",
            image_path: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800",
            created_at: "2024-05-08"
        },
        {
            id: 7,
            title: "Mở bán OPPO Find X7 tại QuangHuyMobile",
            summary: "OPPO Find X7 chính thức có mặt tại hệ thống QuangHuyMobile với nhiều ưu đãi hấp dẫn cho khách hàng đặt trước.",
            content: "OPPO Find X7 là flagship mới nhất của OPPO...",
            image_path: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
            created_at: "2024-05-05"
        },
        {
            id: 8,
            title: "Tư vấn chọn điện thoại gaming tốt nhất",
            summary: "Hướng dẫn lựa chọn điện thoại gaming phù hợp với nhu cầu và ngân sách của bạn trong năm 2024.",
            content: "Điện thoại gaming cần đáp ứng nhiều tiêu chí...",
            image_path: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800",
            created_at: "2024-05-03"
        },
        {
            id: 9,
            title: "Chương trình thu cũ đổi mới lên đời smartphone",
            summary: "QuangHuyMobile triển khai chương trình thu cũ đổi mới với giá trị thu cao nhất thị trường.",
            content: "Chương trình thu cũ đổi mới smartphone...",
            image_path: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800",
            created_at: "2024-05-01"
        }
    ];

    const [news, setNews] = useState(sampleNews);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("http://localhost:3000/news/getAllNews");
                if (response.data && response.data.length > 0) {
                    setNews(response.data);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
                // Giữ data mẫu nếu API lỗi
            }
        };
        fetchNews();
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const totalPages = Math.ceil(news.length / itemsPerPage);
    const currentNews = news.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const featuredNews = news.length > 0 ? news[0] : null;
    const sideNews = news.length > 1 ? news.slice(1, 3) : [];

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Tin Tức - QuangHuyMobile</title>
                <meta name="description" content="Cập nhật tin tức mới nhất về điện thoại, công nghệ, khuyến mãi tại QuangHuyMobile" />
            </Helmet>

            {/* ===== HERO BANNER ===== */}
            <div className={`${styles.heroBanner} w-full flex items-center justify-center`}>
                <div className="text-center z-10">
                    <h1 className={styles.heroTitle}>Tin Tức & Sự Kiện</h1>
                    <p className={styles.heroBreadcrumb}>
                        <Link href="/nguoidung/trangchu">Trang Chủ</Link>
                        <span className="mx-2">»</span>
                        Tin tức mới nhất về QuangHuyMobile
                    </p>
                </div>
            </div>

            {/* ===== FEATURED SECTION ===== */}
            {featuredNews && (
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="mb-12">
                        <h2 className={styles.sectionTitle}>Tin Nổi Bật</h2>
                        <p className={styles.sectionSubtitle}>
                            Những tin tức và sự kiện đáng chú ý nhất
                        </p>
                    </div>

                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${styles.fadeInUp}`}>
                        {/* Main Featured */}
                        <Link href={`/nguoidung/tintuc/${featuredNews.id}`}>
                            <div className={styles.featuredCard}>
                                <img
                                    src={featuredNews.image_path
                                        ? (featuredNews.image_path.startsWith('http')
                                            ? featuredNews.image_path
                                            : `http://localhost:3000${featuredNews.image_path}`)
                                        : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
                                    }
                                    alt={featuredNews.title}
                                />
                                <div className={styles.featuredCardContent}>
                                    <span className={styles.featuredBadge}>🔥 Nổi bật</span>
                                    <h3 className={styles.featuredTitle}>{featuredNews.title}</h3>
                                    <p className={styles.featuredSummary}>
                                        {featuredNews.summary || featuredNews.content || "Xem chi tiết bài viết..."}
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Side Featured */}
                        <div className="flex flex-col gap-6">
                            {sideNews.map((item, index) => (
                                <Link href={`/nguoidung/tintuc/${item.id}`} key={item.id}>
                                    <div className={`${styles.featuredCard} ${styles.fadeInUp} ${index === 0 ? styles.stagger1 : styles.stagger2}`} style={{ minHeight: '228px' }}>
                                        <img
                                            src={item.image_path
                                                ? (item.image_path.startsWith('http')
                                                    ? item.image_path
                                                    : `http://localhost:3000${item.image_path}`)
                                                : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
                                            }
                                            alt={item.title}
                                        />
                                        <div className={styles.featuredCardContent}>
                                            <span className={styles.featuredBadge}>
                                                {index === 0 ? "📱 Mới nhất" : "⚡ Hot"}
                                            </span>
                                            <h3 className={styles.featuredTitle} style={{ fontSize: '22px' }}>{item.title}</h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== ALL NEWS GRID ===== */}
            <div className="bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="mb-12 text-center">
                        <h2 className={`${styles.sectionTitle} mx-auto`} style={{ textAlign: 'center' }}>
                            Tất Cả Bài Viết
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Khám phá thêm nhiều tin tức thú vị về công nghệ và điện thoại
                        </p>
                    </div>

                    {loading ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>⏳</div>
                            <h3 className={styles.emptyTitle}>Đang tải...</h3>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {currentNews.map((item, index) => (
                                    <Link href={`/nguoidung/tintuc/${item.id}`} key={item.id}>
                                        <div className={`${styles.newsCard} ${styles.fadeInUp} ${styles[`stagger${(index % 6) + 1}`]}`}>
                                            <div className={styles.newsCardImage}>
                                                <img
                                                    src={item.image_path
                                                        ? (item.image_path.startsWith('http')
                                                            ? item.image_path
                                                            : `http://localhost:3000${item.image_path}`)
                                                        : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
                                                    }
                                                    alt={item.title}
                                                />
                                                <div className={styles.newsCardOverlay}></div>
                                                <span className={styles.newsCardDate}>
                                                    {formatDate(item.created_at)}
                                                </span>
                                            </div>
                                            <div className={styles.newsCardBody}>
                                                <h3 className={styles.newsCardTitle}>
                                                    {item.title}
                                                </h3>
                                                <p className={styles.newsCardSummary}>
                                                    {item.summary || item.content || "Xem chi tiết bài viết để biết thêm thông tin..."}
                                                </p>
                                                <div className={styles.newsCardFooter}>
                                                    <span className={styles.readMoreBtn}>
                                                        Đọc tiếp
                                                        <span className={styles.readMoreArrow}>→</span>
                                                    </span>
                                                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                                                        {formatDate(item.created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className={styles.pagination}>
                                    <button
                                        className={styles.pageBtn}
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        style={{ opacity: currentPage === 1 ? 0.4 : 1 }}
                                    >
                                        ‹
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
                                            onClick={() => {
                                                setCurrentPage(page);
                                                window.scrollTo({ top: 600, behavior: 'smooth' });
                                            }}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        className={styles.pageBtn}
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        style={{ opacity: currentPage === totalPages ? 0.4 : 1 }}
                                    >
                                        ›
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
