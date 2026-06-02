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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `name` varchar(300) DEFAULT NULL,
  `newprice` decimal(20,2) DEFAULT NULL,
  `oldprice` decimal(20,2) DEFAULT NULL,
  `payload` varchar(30) DEFAULT NULL,
  `material` text,
  `gear_shifter` varchar(300) DEFAULT NULL,
  `tire_size` varchar(300) DEFAULT NULL,
  `size` varchar(200) DEFAULT NULL,
  `weight` varchar(200) DEFAULT NULL,
  `fit` varchar(300) DEFAULT NULL,
  `color` varchar(200) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,2,1,'Xe đạp địa hình JEEP METEOR – Phanh đĩa cơ, Bánh 26 inch – 2024',7190000.00,8290000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ','26 inch','M/L','14 kg','từ 1m4-1m8','Ghi',87,'2025-04-22 14:57:09','2025-04-23 02:36:24'),(2,2,1,'Xe đạp địa hình JEEP METEOR – Phanh đĩa cơ, Bánh 26 inch – 2024',7190000.00,8290000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ','26 inches','M/L','14 kg','phù hợp từ 1m4-1m75','Trắng',100,'2025-04-22 21:15:29','2025-04-22 21:15:29'),(3,2,1,'Xe đạp địa hình JEEP METEOR – Phanh đĩa cơ, Bánh 26 inch – 2024',7190000.00,8290000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ','26 inches','M/L','14.6 kg','phù hợp từ 1m4-1m75','Xanh lá cây',100,'2025-04-22 21:17:05','2025-04-22 21:17:05'),(4,2,2,'Xe đạp địa hình JEEP MTB PS-41 – Phanh đĩa cơ, Bánh 26 inch – 2024',8990000.00,10990000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ','26 inches','M/L','14 kg','phù hợp từ 1m4-1m75','Vàng Chanh',100,'2025-04-22 21:23:55','2025-04-22 21:23:55'),(5,2,2,'Xe đạp địa hình JEEP MTB PS-41 – Phanh đĩa cơ, Bánh 26 inch – 2024',8990000.00,10990000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ','26 inch','M/L','14 kg','phù hợp từ 1m4-1m75','Xanh Biển',100,'2025-04-22 21:25:44','2025-04-22 21:25:44'),(6,2,2,'Xe đạp địa hình JEEP MTB PS-41 – Phanh đĩa cơ, Bánh 26 inch – 2024',8990000.00,10990000.00,'150 kg','Hợp kim Magie cao cấp','24 tốc độ','26 inch','M/L','13 kg','từ 1m4-1m8','Xanh lá cây',100,'2025-04-22 21:27:01','2025-04-22 21:27:01'),(7,3,5,'Xe đạp đường phố JEEP C200 – Phanh đĩa, Bánh 700C – 2024',6600000.00,4990000.00,'150 kg','Hợp kim nhôm cao cấp','24 tốc độ. (Bộ đề CHÍNH HÃNG SHIMANO)','700C','M/L','14.6 kg',' từ 1m45-1m85','',100,'2025-04-22 21:43:17','2025-04-22 21:43:17'),(8,2,3,'Xe đạp địa hình JEEP MTB PS-88 – Phanh đĩa cơ, Bánh 26 inch – 2024',8000000.00,6990000.00,'150 kg','Hợp kim Magie cao cấp','24 tốc độ','26 inch','S/M ','15kg','phù hợp từ 1m4-1m75','Trắng',100,'2025-04-23 01:55:49','2025-04-23 01:55:49'),(9,5,4,'Xe đạp địa hình, trẻ em JEEP J10 – Phanh đĩa cơ, Bánh 20 inch – 2024',3990000.00,4950000.00,'150 kg','Hợp kim Nhôm','7 tốc độ. (Bộ đề CHÍNH HÃNG JEEP)','20 inch','XS','12kg','1m2-1m4','Cam',98,'2025-04-23 01:58:55','2025-04-23 02:36:24'),(10,3,6,'Xe đạp địa hình JEEP METEOR – Phanh đĩa cơ, Bánh 26 inch – 2024',12312321.00,12312330.00,'15kg','Hợp kim nhôm','24 tốc độ','26 inch','S/M ','15kg','phù hợp từ 1m4-1m75','Đen',100,'2025-04-23 02:38:20','2025-04-23 02:38:20');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-12 21:21:32
