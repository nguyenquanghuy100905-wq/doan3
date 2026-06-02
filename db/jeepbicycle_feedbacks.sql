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
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `star` int DEFAULT NULL,
  `content` text,
  `image_path` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (1,2,1,3,'hàng siêu xịn',NULL,'2025-04-26 18:44:05','2025-04-26 18:44:05'),(5,2,1,5,'hhhhh','/public/images/1745693684646-86544548.png','2025-04-26 19:02:41','2025-04-26 19:02:41'),(6,2,1,5,'âsdadasd','/public/images/1745693684646-86544548.png','2025-04-26 19:04:17','2025-04-26 19:04:17'),(7,2,1,5,'zxcxzxc','/public/images/1745693684646-86544548.png','2025-04-26 19:09:59','2025-04-26 19:09:59'),(8,2,1,3,'hàng siêu xịn','/public/images/1745694887617-311963084.png','2025-04-26 19:14:47','2025-04-26 19:14:47'),(9,2,1,5,'âdsadsad','/public/images/1745694887617-311963084.png','2025-04-26 19:16:11','2025-04-26 19:16:11'),(10,2,1,5,'áda','','2025-04-26 19:18:54','2025-04-26 19:18:54'),(11,2,1,5,'áda','','2025-04-26 19:19:58','2025-04-26 19:19:58'),(12,2,1,3,'sdas','','2025-04-26 19:21:06','2025-04-26 19:21:06'),(13,2,1,3,'hàng siêu xịn','/public/images/1745695313033-187703265.png','2025-04-26 19:21:53','2025-04-26 19:21:53'),(14,2,10,4,'sadasd','','2025-05-02 17:53:48','2025-05-02 17:53:48'),(15,2,1,5,'sadasdsad','','2025-05-05 06:14:54','2025-05-05 06:14:54'),(16,2,3,5,'fsfssdfsdfsdf','','2025-05-05 06:17:44','2025-05-05 06:17:44'),(17,2,3,3,'hàng siêu xịn','/public/images/1746425949446-37000376.png','2025-05-05 06:19:09','2025-05-05 06:19:09'),(23,8,1,5,'quá xịn sò','/public/images/1747035520954-800845057.jpg','2025-05-12 07:38:40','2025-05-12 07:38:40');
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
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
