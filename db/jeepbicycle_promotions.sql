-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: jeepbicycle
-- ------------------------------------------------------
-- Server version	8.4.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `id` varchar(100) NOT NULL,
  `title` varchar(300) DEFAULT NULL,
  `description` text,
  `discount_percentage` int DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `quantity_promotion` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES ('KM001','Giảm giá 10% dịp lễ 30/4','Áp dụng cho tất cả sản phẩm xe đạp từ 28/4 đến 2/5',10,'2025-04-28 00:00:00','2025-05-02 23:59:59',100,1,'2025-04-22 05:49:27','2025-04-22 05:49:27'),('KM002','Khuyến mãi hè sôi động','Giảm 15% cho dòng xe thể thao từ 1/6 đến 30/6',15,'2025-06-01 00:00:00','2025-06-30 23:59:59',200,1,'2025-04-22 05:49:27','2025-04-22 05:49:27'),('KM003','Mua 2 tặng 1 phụ kiện','Khi mua 2 xe bất kỳ, được tặng 1 nón bảo hiểm chính hãng',0,'2025-05-15 00:00:00','2025-06-15 23:59:59',50,1,'2025-04-22 05:49:27','2025-04-22 05:49:27'),('KM004','Giảm 5% cho khách hàng mới','Áp dụng tự động cho khách hàng đăng ký mới',5,'2025-01-01 00:00:00','2025-12-31 23:59:59',500,1,'2025-04-22 05:49:27','2025-04-22 05:49:27'),('KM005','Ưu đãi sinh nhật','Tặng mã giảm 20% cho khách hàng có sinh nhật trong tháng',20,'2025-01-01 00:00:00','2025-12-31 23:59:59',300,1,'2025-04-22 05:49:27','2025-04-22 05:49:27');
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-12 21:21:33
