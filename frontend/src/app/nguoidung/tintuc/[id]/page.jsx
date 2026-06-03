'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Helmet } from "react-helmet";
import styles from "@/styles/tintuc.module.css";

export default function ChiTietTinTuc() {
    const params = useParams();
    const newsId = params.id;

    // Data mẫu cứng cho tất cả tin tức
    const allNewsData = {
        1: {
            id: 1,
            title: "iPhone 16 Pro Max - Siêu phẩm mới nhất từ Apple",
            summary: "Apple vừa công bố iPhone 16 Pro Max với nhiều cải tiến vượt trội về camera, hiệu năng và pin. Thiết bị hứa hẹn sẽ là flagship đáng mong đợi nhất năm 2024.",
            content: "iPhone 16 Pro Max đã chính thức ra mắt với nhiều cải tiến đáng chú ý. Sản phẩm được trang bị chip A18 Pro mới nhất, mang lại hiệu năng vượt trội so với thế hệ trước.",
            image_path: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200",
            created_at: "2024-05-20",
            details: [
                {
                    id: 1,
                    title_news: "Thiết kế sang trọng và bền bỉ",
                    content_news: "iPhone 16 Pro Max sở hữu thiết kế khung titan cao cấp, mặt lưng kính nhám chống bám vân tay. Màn hình Super Retina XDR 6.9 inch với tần số quét 120Hz mang đến trải nghiệm mượt mà."
                },
                {
                    id: 2,
                    title_news: "Camera chuyên nghiệp",
                    content_news: "Hệ thống camera sau 3 ống kính với cảm biến chính 48MP, telephoto 12MP zoom quang 5x, và ultra-wide 48MP. Công nghệ AI giúp chụp ảnh đêm và quay video ProRes tuyệt vời."
                },
                {
                    id: 3,
                    title_news: "Hiệu năng đỉnh cao",
                    content_news: "Chip A18 Pro với CPU 6 nhân và GPU 6 nhân, RAM 8GB giúp xử lý mọi tác vụ nhanh chóng. Pin 4852mAh hỗ trợ sử dụng cả ngày dài và sạc nhanh 30W."
                }
            ]
        },
        2: {
            id: 2,
            title: "Samsung Galaxy S24 Ultra giảm giá sốc 30%",
            summary: "Chương trình khuyến mãi lớn nhất trong năm cho Galaxy S24 Ultra. Cơ hội sở hữu siêu phẩm với giá không thể tốt hơn.",
            content: "Samsung Galaxy S24 Ultra đang có chương trình giảm giá đặc biệt lên đến 30% trong tháng này. Đây là cơ hội tuyệt vời để sở hữu flagship cao cấp với mức giá hấp dẫn.",
            image_path: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200",
            created_at: "2024-05-18",
            details: [
                {
                    id: 1,
                    title_news: "Ưu đãi hấp dẫn",
                    content_news: "Giảm ngay 30% giá trị sản phẩm, tương đương 9 triệu đồng. Áp dụng cho tất cả các phiên bản bộ nhớ. Tặng kèm ốp lưng chính hãng trị giá 500.000đ."
                },
                {
                    id: 2,
                    title_news: "Cấu hình mạnh mẽ",
                    content_news: "Snapdragon 8 Gen 3, RAM 12GB, bộ nhớ từ 256GB đến 1TB. Màn hình Dynamic AMOLED 6.8 inch QHD+. Camera 200MP với zoom quang 10x và AI xử lý ảnh thông minh."
                }
            ]
        },
        3: {
            id: 3,
            title: "Xiaomi 15 Series ra mắt tại Việt Nam",
            summary: "Xiaomi chính thức giới thiệu dòng Xiaomi 15 Series với giá cực kỳ cạnh tranh và nhiều công nghệ mới.",
            content: "Xiaomi 15 Series là dòng flagship mới nhất của Xiaomi, được trang bị chip Snapdragon 8 Gen 3 và hệ thống camera Leica cao cấp.",
            image_path: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200",
            created_at: "2024-05-15",
            details: [
                {
                    id: 1,
                    title_news: "Giá bán cạnh tranh",
                    content_news: "Xiaomi 15 có giá từ 16.9 triệu, Xiaomi 15 Pro từ 21.9 triệu. Đặt trước nhận quà tặng trị giá 2 triệu đồng bao gồm tai nghe Buds 5 và sạc nhanh 120W."
                },
                {
                    id: 2,
                    title_news: "Công nghệ camera Leica",
                    content_news: "Hợp tác với Leica mang đến chất lượng ảnh chuyên nghiệp. Camera chính 50MP với OIS, telephoto 50MP zoom 5x, và ultra-wide 50MP. Hỗ trợ quay video 8K."
                }
            ]
        },
        4: {
            id: 4,
            title: "5 mẹo kéo dài thời lượng pin điện thoại",
            summary: "Hướng dẫn chi tiết các cách giúp bạn tối ưu hóa thời lượng pin và kéo dài tuổi thọ pin cho điện thoại của mình.",
            content: "Pin là một trong những yếu tố quan trọng nhất của smartphone. Dưới đây là 5 mẹo hiệu quả giúp bạn kéo dài thời lượng pin.",
            image_path: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200",
            created_at: "2024-05-12",
            details: [
                {
                    id: 1,
                    title_news: "1. Điều chỉnh độ sáng màn hình",
                    content_news: "Giảm độ sáng màn hình xuống mức vừa đủ sử dụng. Bật chế độ tự động điều chỉnh độ sáng theo môi trường. Tắt màn hình khi không sử dụng."
                },
                {
                    id: 2,
                    title_news: "2. Quản lý ứng dụng chạy nền",
                    content_news: "Tắt các ứng dụng không cần thiết chạy nền. Hạn chế refresh tự động của ứng dụng. Kiểm tra và xóa các ứng dụng ngốn pin."
                },
                {
                    id: 3,
                    title_news: "3. Sử dụng chế độ tiết kiệm pin",
                    content_news: "Bật chế độ tiết kiệm pin khi pin dưới 20%. Giảm hiệu ứng hình ảnh và animation. Tắt các tính năng không cần thiết như GPS, Bluetooth."
                },
                {
                    id: 4,
                    title_news: "4. Tối ưu kết nối mạng",
                    content_news: "Tắt WiFi và dữ liệu di động khi không dùng. Chuyển sang chế độ máy bay ở vùng sóng yếu. Sử dụng WiFi thay vì 4G/5G khi có thể."
                },
                {
                    id: 5,
                    title_news: "5. Sạc pin đúng cách",
                    content_news: "Không để pin xuống 0% thường xuyên. Sạc pin ở mức 20-80% là tốt nhất. Tránh sạc qua đêm và sử dụng sạc chính hãng."
                }
            ]
        },
        5: {
            id: 5,
            title: "So sánh iPhone 15 Pro vs Samsung S24",
            summary: "Đánh giá chi tiết hai flagship đình đám của Apple và Samsung để giúp bạn có lựa chọn phù hợp nhất.",
            content: "iPhone 15 Pro và Samsung S24 đều là những flagship xuất sắc. Cùng so sánh chi tiết để tìm ra lựa chọn phù hợp.",
            image_path: "https://images.unsplash.com/photo-1592286927505-2fd7c3b16a9e?w=1200",
            created_at: "2024-05-10",
            details: [
                {
                    id: 1,
                    title_news: "Thiết kế và màn hình",
                    content_news: "iPhone 15 Pro: Khung titan, Dynamic Island, màn hình 6.1 inch ProMotion 120Hz. Samsung S24: Khung nhôm, màn hình 6.2 inch Dynamic AMOLED 120Hz phẳng. Cả hai đều cao cấp và bền bỉ."
                },
                {
                    id: 2,
                    title_news: "Hiệu năng",
                    content_news: "iPhone 15 Pro dùng chip A17 Pro 3nm, Samsung S24 dùng Snapdragon 8 Gen 3. Cả hai đều mạnh mẽ, xử lý tốt mọi tác vụ và game nặng."
                },
                {
                    id: 3,
                    title_news: "Camera",
                    content_news: "iPhone 15 Pro: Camera chính 48MP, telephoto 12MP zoom 3x, ultra-wide 12MP. Samsung S24: Camera chính 50MP, telephoto 10MP zoom 3x, ultra-wide 12MP. iPhone tốt hơn về video, Samsung tốt hơn về zoom."
                }
            ]
        },
        6: {
            id: 6,
            title: "Công nghệ camera điện thoại 2024",
            summary: "Những xu hướng và công nghệ camera mới nhất trên thị trường điện thoại thông minh năm 2024.",
            content: "Camera điện thoại đã có những bước tiến vượt bậc trong năm 2024 với nhiều công nghệ mới.",
            image_path: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=1200",
            created_at: "2024-05-08",
            details: [
                {
                    id: 1,
                    title_news: "AI xử lý ảnh",
                    content_news: "Trí tuệ nhân tạo giúp tự động nhận diện cảnh, tối ưu hóa ảnh chân dung, xóa phông thông minh và nâng cao chất lượng ảnh đêm."
                },
                {
                    id: 2,
                    title_news: "Cảm biến lớn hơn",
                    content_news: "Cảm biến 1/1.3 inch trở lên cho phép thu nhiều ánh sáng hơn, giảm nhiễu và tăng độ chi tiết ảnh."
                }
            ]
        },
        7: {
            id: 7,
            title: "Mở bán OPPO Find X7 tại QuangHuyMobile",
            summary: "OPPO Find X7 chính thức có mặt tại hệ thống QuangHuyMobile với nhiều ưu đãi hấp dẫn cho khách hàng đặt trước.",
            content: "OPPO Find X7 là flagship mới nhất của OPPO với thiết kế cao cấp và hiệu năng mạnh mẽ.",
            image_path: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200",
            created_at: "2024-05-05",
            details: [
                {
                    id: 1,
                    title_news: "Ưu đãi đặt trước",
                    content_news: "Giảm 3 triệu cho 100 khách hàng đầu tiên. Tặng kèm OPPO Enco Air3 trị giá 1.5 triệu. Bảo hành mở rộng 18 tháng."
                }
            ]
        },
        8: {
            id: 8,
            title: "Tư vấn chọn điện thoại gaming tốt nhất",
            summary: "Hướng dẫn lựa chọn điện thoại gaming phù hợp với nhu cầu và ngân sách của bạn trong năm 2024.",
            content: "Điện thoại gaming cần đáp ứng nhiều tiêu chí về hiệu năng, màn hình, pin và tản nhiệt.",
            image_path: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1200",
            created_at: "2024-05-03",
            details: [
                {
                    id: 1,
                    title_news: "Chip và RAM",
                    content_news: "Chip Snapdragon 8 Gen 3 hoặc A17 Pro, RAM tối thiểu 12GB để đảm bảo chơi game mượt mà."
                }
            ]
        },
        9: {
            id: 9,
            title: "Chương trình thu cũ đổi mới lên đời smartphone",
            summary: "QuangHuyMobile triển khai chương trình thu cũ đổi mới với giá trị thu cao nhất thị trường.",
            content: "Chương trình thu cũ đổi mới smartphone giúp bạn tiết kiệm chi phí khi lên đời máy mới.",
            image_path: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200",
            created_at: "2024-05-01",
            details: [
                {
                    id: 1,
                    title_news: "Điều kiện tham gia",
                    content_news: "Máy cũ còn nguyên bản, không cong vênh, màn hình không vỡ. Máy hoạt động tốt, không dính iCloud hay tài khoản."
                }
            ]
        }
    };

    const [newsItem, setNewsItem] = useState(null);
    const [detailNews, setDetailNews] = useState([]);
    const [relatedNews, setRelatedNews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (newsId) {
            const currentNews = allNewsData[newsId];
            if (currentNews) {
                setNewsItem(currentNews);
                setDetailNews(currentNews.details || []);
                
                // Lấy 3 tin liên quan
                const related = Object.values(allNewsData)
                    .filter(n => n.id !== parseInt(newsId))
                    .slice(0, 3);
                setRelatedNews(related);
            }
        }
    }, [newsId]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatShortDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>⏳</div>
                <h3 className={styles.emptyTitle}>Đang tải...</h3>
            </div>
        );
    }

    if (!newsItem) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>😕</div>
                <h3 className={styles.emptyTitle}>Không tìm thấy bài viết</h3>
                <p className={styles.emptyDesc}>Bài viết bạn tìm không tồn tại hoặc đã bị xóa.</p>
                <Link href="/nguoidung/tintuc" className={`${styles.backBtn} mt-6 inline-flex`}>
                    ← Quay lại trang tin tức
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{newsItem.title} - QuangHuyMobile</title>
                <meta name="description" content={newsItem.summary || newsItem.content || "Chi tiết tin tức QuangHuyMobile"} />
            </Helmet>

            {/* ===== HERO IMAGE ===== */}
            <div className={styles.detailHero}>
                <img
                    src={newsItem.image_path
                        ? (newsItem.image_path.startsWith('http')
                            ? newsItem.image_path
                            : `http://localhost:3000${newsItem.image_path}`)
                        : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200'
                    }
                    alt={newsItem.title}
                />
                <div className={styles.detailHeroContent}>
                    <div className={styles.fadeInUp}>
                        <Link href="/nguoidung/tintuc" className="inline-flex items-center gap-2 text-orange-300 hover:text-orange-400 transition-colors mb-6 text-sm font-medium">
                            <span>←</span> Quay lại tin tức
                        </Link>
                        <h1 className={styles.detailTitle}>{newsItem.title}</h1>
                        <div className={styles.detailMeta}>
                            <span className={styles.detailMetaItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                {formatDate(newsItem.created_at)}
                            </span>
                            <span className={styles.detailMetaItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                5 phút đọc
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== ARTICLE CONTENT ===== */}
            <div className={styles.detailContent}>
                {/* Summary */}
                {newsItem.summary && (
                    <div className={`${styles.fadeInUp} bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-10`}>
                        <p style={{ fontSize: '18px', lineHeight: '30px', color: '#92400e', fontStyle: 'italic', fontWeight: 500, margin: 0 }}>
                            {newsItem.summary}
                        </p>
                    </div>
                )}

                {/* Content from news table */}
                {newsItem.content && (
                    <div className={styles.fadeInUp}>
                        <p>{newsItem.content}</p>
                    </div>
                )}

                {/* Detail news content */}
                {detailNews.length > 0 && (
                    <div className={styles.fadeInUp}>
                        {detailNews.map((detail, index) => (
                            <div key={detail.id || index} className="mb-8">
                                {detail.title_news && (
                                    <h2 style={{
                                        fontSize: '24px',
                                        fontWeight: 700,
                                        color: '#111827',
                                        marginBottom: '16px',
                                        marginTop: index > 0 ? '40px' : '20px',
                                        paddingLeft: '16px',
                                        borderLeft: '4px solid #f97316'
                                    }}>
                                        {detail.title_news}
                                    </h2>
                                )}
                                {detail.content_news && (
                                    <p style={{
                                        fontSize: '17px',
                                        lineHeight: '30px',
                                        color: '#374151'
                                    }}>
                                        {detail.content_news}
                                    </p>
                                )}
                                {detail.content && !detail.content_news && (
                                    <p style={{
                                        fontSize: '17px',
                                        lineHeight: '30px',
                                        color: '#374151'
                                    }}>
                                        {detail.content}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Share & Back */}
                <div className="flex items-center justify-between mt-16 pt-8 border-t-2 border-gray-100">
                    <Link href="/nguoidung/tintuc" className={styles.backBtn}>
                        ← Quay lại tin tức
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 font-medium">Chia sẻ:</span>
                        <button
                            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-lg shadow-blue-200"
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({ title: newsItem.title, url: window.location.href });
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert("Đã copy link bài viết!");
                                }
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== RELATED NEWS ===== */}
            {relatedNews.length > 0 && (
                <div className={styles.relatedSection}>
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className={styles.relatedTitle}>Bài Viết Liên Quan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                            {relatedNews.map((item, index) => (
                                <Link href={`/nguoidung/tintuc/${item.id}`} key={item.id}>
                                    <div className={`${styles.newsCard} ${styles.fadeInUp} ${styles[`stagger${index + 1}`]}`}>
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
                                                {formatShortDate(item.created_at)}
                                            </span>
                                        </div>
                                        <div className={styles.newsCardBody}>
                                            <h3 className={styles.newsCardTitle}>{item.title}</h3>
                                            <p className={styles.newsCardSummary}>
                                                {item.summary || item.content || "Xem chi tiết..."}
                                            </p>
                                            <div className={styles.newsCardFooter}>
                                                <span className={styles.readMoreBtn}>
                                                    Đọc tiếp <span className={styles.readMoreArrow}>→</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
