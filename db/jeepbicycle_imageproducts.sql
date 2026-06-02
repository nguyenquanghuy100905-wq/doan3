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
-- Table structure for table `imageproducts`
--

DROP TABLE IF EXISTS `imageproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imageproducts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `image_path` text,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `imageproducts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imageproducts`
--

LOCK TABLES `imageproducts` WRITE;
/*!40000 ALTER TABLE `imageproducts` DISABLE KEYS */;
INSERT INTO `imageproducts` VALUES (1,1,'/public/images/1745333829442-915580070.png'),(2,1,'/public/images/1745333829445-540511613.png'),(3,1,'/public/images/1745333829450-496935382.jpg'),(4,1,'/public/images/1745333829450-560376343.png'),(5,2,'/public/images/1745356529377-124004640.png'),(6,2,'/public/images/1745356529370-753425978.png'),(7,2,'/public/images/1745356529380-686719708.png'),(8,2,'/public/images/1745356529394-736795.png'),(9,3,'/public/images/1745356625769-275842892.png'),(10,3,'/public/images/1745356625761-634726292.png'),(11,3,'/public/images/1745356625773-526754187.png'),(12,4,'/public/images/1745357035964-171695819.png'),(13,4,'/public/images/1745357035969-287511813.png'),(14,4,'/public/images/1745357035975-137254745.png'),(15,5,'/public/images/1745357144022-380892878.png'),(16,5,'/public/images/1745357144027-841689418.png'),(17,5,'/public/images/1745357144029-44447033.png'),(18,6,'/public/images/1745357221344-828945760.png'),(19,6,'/public/images/1745357221349-234597074.png'),(20,6,'/public/images/1745357221360-900793678.png'),(21,7,'/public/images/1745358197728-867985472.png'),(22,7,'/public/images/1745358197732-647787882.png'),(23,7,'/public/images/1745358197741-278194098.png'),(24,7,'/public/images/1745358197743-464122126.png'),(25,8,'/public/images/1745373349081-917683844.png'),(26,8,'/public/images/1745373349087-205154223.png'),(27,8,'/public/images/1745373349084-509134765.png'),(28,8,'/public/images/1745373349090-105636439.png'),(29,8,'/public/images/1745373349098-508919201.png'),(30,9,'/public/images/1745373535844-573504096.jpg'),(31,9,'/public/images/1745373535844-303604408.png'),(32,9,'/public/images/1745373535846-815931208.png'),(33,10,'/public/images/1745375900598-577777750.png'),(34,10,'/public/images/1745375900608-641753900.png'),(35,10,'/public/images/1745375900615-920341237.png'),(36,10,'/public/images/1745375900622-444129854.png');
/*!40000 ALTER TABLE `imageproducts` ENABLE KEYS */;
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
