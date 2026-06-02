CREATE database Jeepbicycle;
use JeepBicycle;
CREATE TABLE banners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(300),
    password VARCHAR(300),
    name VARCHAR(300),
    birthday DATETIME,
    sex VARCHAR(100),
    address VARCHAR(500),
    email VARCHAR(500),
    phone VARCHAR(10),
    image TEXT,
    role_user INT,
    ban TINYINT(1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    type_id INT,
    name VARCHAR(300),
    newprice DECIMAL(20,2),
    oldprice DECIMAL(20,2),
    payload VARCHAR(30),
    material TEXT,
    gear_shifter VARCHAR(300),
    tire_size VARCHAR(300),
    size VARCHAR(200),
    weight VARCHAR(200),
    fit VARCHAR(300),
    color VARCHAR(200),
    quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (type_id) REFERENCES types(id)
);

CREATE TABLE imageproducts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    image_path TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE feedbacks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    star INT,
    content TEXT,
    image_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total DECIMAL(20,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cartdetails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT,
    product_id INT,
    quantity INT,
    subtotal DECIMAL(10,2),
    FOREIGN KEY (cart_id) REFERENCES cart(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE paymentmethods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200),
    img_payment VARCHAR(255),
    description TEXT
);

CREATE TABLE promotions (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(300),
    description TEXT,
    discount_percentage INT,
    start_date DATETIME,
    end_date DATETIME,
    quantity_promotion INT,
    is_active TINYINT(1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    payment_method_id INT,
    promotion_id VARCHAR(100),
    status VARCHAR(100),
    note TEXT,
    address TEXT,
    total DECIMAL(20,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (payment_method_id) REFERENCES paymentmethods(id),
    FOREIGN KEY (promotion_id) REFERENCES promotions(id)
);

CREATE TABLE orderdetails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    subtotal DECIMAL(20,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orderinvoices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total_amount DECIMAL(20,2),
    pay VARCHAR(100),
    status VARCHAR(100),
    note TEXT,
    payment_method_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (payment_method_id) REFERENCES paymentmethods(id)
);

CREATE TABLE orderinvoicedetails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_invoice_id INT,
    order_id INT,
    subtotal DECIMAL(20,2),
    FOREIGN KEY (order_invoice_id) REFERENCES orderinvoices(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE importinvoices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_name VARCHAR(300),
    total_amount DECIMAL(20,2),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE importinvoicedetails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    import_invoice_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(20,2),
    subtotal DECIMAL(20,2),
    FOREIGN KEY (import_invoice_id) REFERENCES importinvoices(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE news (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(300),
    content TEXT,
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE detailnews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    news_id INT,
    title_news TEXT,
    content_news TEXT,
    FOREIGN KEY (news_id) REFERENCES news(id)
);

CREATE TABLE contenttypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type_id INT,
    title TEXT,
    content TEXT,
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES types(id)
);

CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(15),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Xóa các bảng không có khóa ngoại hoặc ít phụ thuộc
DROP TABLE IF EXISTS cartdetails;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS imageproducts;
DROP TABLE IF EXISTS feedbacks;
DROP TABLE IF EXISTS detailnews;
DROP TABLE IF EXISTS contenttypes;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS banners;

-- Bảng liên quan đến đơn hàng
DROP TABLE IF EXISTS orderinvoicedetails;
DROP TABLE IF EXISTS orderinvoices;
DROP TABLE IF EXISTS orderdetails;
DROP TABLE IF EXISTS orders;

-- Bảng liên quan đến nhập hàng
DROP TABLE IF EXISTS importinvoicedetails;
DROP TABLE IF EXISTS importinvoices;

-- Các bảng còn lại
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS promotions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS types;
DROP TABLE IF EXISTS paymentmethods;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS users;



