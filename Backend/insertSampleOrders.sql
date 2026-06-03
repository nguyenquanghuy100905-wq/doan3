-- Insert dữ liệu đơn hàng mẫu đồng bộ với orderdetails (năm 2026)
-- Giả sử user_id = 1, payment_method_id = 1 đã tồn tại

-- Tháng 1/2026
-- Đơn hàng 1: iPhone 15 Pro Max x2 = 59,980,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', 'Giao hàng nhanh', '123 Nguyễn Huệ, Q1, HCM', 59980000, '2026-01-05 10:30:00');
SET @order1 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order1, 1, 2, 59980000);

-- Đơn hàng 2: iPhone 14 Pro x1 = 24,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', 'Giao giờ hành chính', '456 Lê Lợi, Q1, HCM', 24990000, '2026-01-12 14:20:00');
SET @order2 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order2, 2, 1, 24990000);

-- Đơn hàng 3: Samsung Galaxy A55 x1 = 9,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '789 Trần Hưng Đạo, Q5, HCM', 9990000, '2026-01-18 09:15:00');
SET @order3 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order3, 4, 1, 9990000);

-- Đơn hàng 4: Samsung Galaxy S24 Ultra x1 = 26,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '321 Võ Văn Tần, Q3, HCM', 26990000, '2026-01-25 16:45:00');
SET @order4 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order4, 3, 1, 26990000);

-- Tháng 2/2026
-- Đơn hàng 5: iPhone 15 Pro Max x1 = 29,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '111 Cách Mạng Tháng 8, Q10, HCM', 29990000, '2026-02-03 11:00:00');
SET @order5 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order5, 1, 1, 29990000);

-- Đơn hàng 6: OPPO Reno11 x1 = 9,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', 'Giao buổi chiều', '222 Lý Thường Kiệt, Q11, HCM', 9990000, '2026-02-14 13:30:00');
SET @order6 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order6, 8, 1, 9990000);

-- Đơn hàng 7: Xiaomi 14 Ultra x1 = 24,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '333 Nguyễn Thị Minh Khai, Q3, HCM', 24990000, '2026-02-20 10:00:00');
SET @order7 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order7, 5, 1, 24990000);

-- Tháng 3/2026
-- Đơn hàng 8: Vivo V30 Pro x1 = 12,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '444 Hai Bà Trưng, Q1, HCM', 12990000, '2026-03-05 09:20:00');
SET @order8 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order8, 9, 1, 12990000);

-- Đơn hàng 9: Samsung Galaxy A55 x2 = 19,980,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', 'Giao ngoài giờ', '555 Điện Biên Phủ, Q3, HCM', 19980000, '2026-03-12 15:40:00');
SET @order9 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order9, 4, 2, 19980000);

-- Đơn hàng 10: OPPO Find X7 Ultra x1 = 22,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '666 Pasteur, Q1, HCM', 22990000, '2026-03-19 08:30:00');
SET @order10 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order10, 7, 1, 22990000);

-- Đơn hàng 11: Samsung Galaxy S24 Ultra x1 = 26,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '777 Cộng Hòa, Q.Tân Bình, HCM', 26990000, '2026-03-28 14:15:00');
SET @order11 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order11, 3, 1, 26990000);

-- Tháng 4/2026
-- Đơn hàng 12: iPhone 15 Pro Max x1 = 29,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '888 Trường Chinh, Q.Tân Bình, HCM', 29990000, '2026-04-04 10:45:00');
SET @order12 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order12, 1, 1, 29990000);

-- Đơn hàng 13: Xiaomi Redmi Note 13 Pro x2 = 14,980,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', 'Giao cuối tuần', '999 Lạc Long Quân, Q11, HCM', 14980000, '2026-04-15 16:20:00');
SET @order13 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order13, 6, 2, 14980000);

-- Đơn hàng 14: Samsung Galaxy S24 Ultra x1, OPPO Reno11 x1 = 36,980,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '101 Hoàng Văn Thụ, Q.Tân Bình, HCM', 36980000, '2026-04-22 11:30:00');
SET @order14 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES 
(@order14, 3, 1, 26990000),
(@order14, 8, 1, 9990000);

-- Đơn hàng 15: Vivo V30 Pro x1 = 12,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '202 Nguyễn Văn Trỗi, Q.Phú Nhuận, HCM', 12990000, '2026-04-29 09:00:00');
SET @order15 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order15, 9, 1, 12990000);

-- Tháng 5/2026
-- Đơn hàng 16: iPhone 15 Pro Max x1, Samsung Galaxy A55 x1 = 39,980,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '303 CMT8, Q10, HCM', 39980000, '2026-05-08 14:00:00');
SET @order16 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES 
(@order16, 1, 1, 29990000),
(@order16, 4, 1, 9990000);

-- Đơn hàng 17: Samsung Galaxy S24 Ultra x1 = 26,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', 'Giao sau 15h', '404 Xô Viết Nghệ Tĩnh, Q.Bình Thạnh, HCM', 26990000, '2026-05-15 10:30:00');
SET @order17 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order17, 3, 1, 26990000);

-- Đơn hàng 18: Xiaomi 14 Ultra x1, OPPO Reno11 x1 = 34,980,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', NULL, '505 Phan Xích Long, Q.Phú Nhuận, HCM', 34980000, '2026-05-20 13:45:00');
SET @order18 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES 
(@order18, 5, 1, 24990000),
(@order18, 8, 1, 9990000);

-- Đơn hàng 19: iPhone 15 Pro Max x1 = 29,990,000
INSERT INTO orders (user_id, payment_method_id, promotion_id, status, note, address, total, created_at) VALUES
(2, 1, NULL, 'Đã giao', 'Giao tận tay', '606 Nguyễn Đình Chiểu, Q3, HCM', 29990000, '2026-05-28 11:15:00');
SET @order19 = LAST_INSERT_ID();
INSERT INTO orderdetails (order_id, product_id, quantity, subtotal) VALUES (@order19, 1, 1, 29990000);

-- Tổng kết: Top sản phẩm bán chạy sẽ là:
-- 1. iPhone 15 Pro Max: 6 đơn (7 chiếc)
-- 2. Samsung Galaxy S24 Ultra: 5 đơn (5 chiếc)
-- 3. OPPO Reno11: 3 đơn (3 chiếc)
-- 4. Samsung Galaxy A55: 3 đơn (4 chiếc)
-- 5. Xiaomi 14 Ultra: 2 đơn (2 chiếc)
