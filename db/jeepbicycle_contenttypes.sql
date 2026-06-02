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
-- Table structure for table `contenttypes`
--

DROP TABLE IF EXISTS `contenttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenttypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int DEFAULT NULL,
  `title` text,
  `content` text,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `contenttypes_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenttypes`
--

LOCK TABLES `contenttypes` WRITE;
/*!40000 ALTER TABLE `contenttypes` DISABLE KEYS */;
INSERT INTO `contenttypes` VALUES (1,2,'Biểu tượng cho sự hoàn hảo trong làng xe đạp leo núi','MTB PS-41, một tuyệt tác công nghệ đến từ thương hiệu nổi tiếng, đã vượt qua mọi giới hạn và trở thành biểu tượng cho sự hoàn hảo trong làng xe đạp leo núi. Với thiết kế đầy cá tính, phối hợp giữa màu đen huyền bí, xám thanh lịch và vàng đồng táo bạo, MTB PS-41 tạo nên một dấu ấn khó phai trong lòng những người yêu thích đạp xe leo núi. Mỗi đường nét trên chiếc xe này đều được chau chuốt tỉ mỉ, tạo nên vẻ đẹp thu hút từ cái nhìn đầu tiên. Các chi tiết được thiết kế tinh tế, phản ánh sự chuyên nghiệp và tỉ mỉ trong quá trình sản xuất, mang đến cho người sử dụng một trải nghiệm thị giác đầy mê hoặc.','/public/images/1745357257752-344600500.png','2025-04-22 21:27:37','2025-04-22 21:27:37'),(2,2,'Thông số kỹ thuật vượt trội đáp ứng mọi nhu cầu người lái','Kích thước 26 inch vừa đủ để mang lại cảm giác vận hành linh hoạt nhưng cũng đảm bảo sự ổn định trên những đoạn đường gập ghềnh. Với 24 tốc độ, MTB PS-41 có khả năng đáp ứng mọi nhu cầu của người lái, từ việc chinh phục những đoạn đường dốc cao đến những cung đường êm ái. Không chỉ vậy, thiết kế của chiếc xe này còn được tính toán kỹ lưỡng để tối đa hóa hiệu suất và trải nghiệm lái. Từng chi tiết nhỏ đều được chú trọng, đảm bảo rằng người sử dụng sẽ có cảm giác thoải mái và an toàn trong suốt hành trình của mình.','/public/images/1745357273976-379131779.png','2025-04-22 21:27:53','2025-04-22 21:27:53'),(3,2,'Khung xe cứng cáp, hệ thống giảm xóc và dẫn truyền hiệu quả','Không chỉ mang lại sự linh hoạt khi di chuyển, khung xe còn đảm bảo độ bền tối ưu để chịu được những va đập mạnh mẽ trên những cung đường hiểm trở. Phuộc trước giảm xóc dày 38 cùng hệ thống dẫn truyền EF500 hiệu quả giúp MTB PS-41 hoạt động trơn tru trong mọi tình huống. Những cú rung lắc mạnh mẽ trên địa hình khó khăn sẽ được hấp thụ hoàn toàn, mang đến cho người lái một trải nghiệm lái xe đạp thực sự thoải mái và êm ái. Hệ thống dẫn truyền tiên tiến cũng đảm bảo rằng mọi chuyển động của người lái sẽ được truyền đạt đầy đủ đến bánh xe, tối ưu hóa sức mạnh và hiệu quả của mỗi cú đạp.','/public/images/1745357307032-651661470.jpg','2025-04-22 21:28:27','2025-04-22 21:28:27'),(4,2,'Hệ thống phanh đĩa và trục trung tâm đảm bảo kiểm soát tốc độ','Với khả năng phanh gấp, người lái có thể kiểm soát tốc độ một cách an toàn và chính xác, ngay cả khi đối mặt với những đoạn đường dốc nguy hiểm. Hệ thống phanh này được thiết kế đặc biệt để tăng cường khả năng kiểm soát, đảm bảo rằng người lái luôn nắm quyền kiểm soát trên bất kỳ địa hình nào. Trục xe đạp trung tâm mang màu đen cùng trục kín tích hợp ổ trục và ổ bi tạo nên sự liền mạch, vận hành mượt mà trong suốt hành trình. Mỗi chi tiết được sản xuất từ những vật liệu chất lượng cao, đảm bảo độ bền lâu dài và hiệu suất vận hành ổn định trong điều kiện khắc nghiệt nhất','/public/images/1745357323249-494281140.jpg','2025-04-22 21:28:43','2025-04-22 21:28:43'),(5,2,'Vành xe Nhôm, lốp bám đường tối ưu trên mọi địa hình','Vành xe được chế tạo từ hợp kim nhôm cao cấp, tạo nên sự cân bằng hoàn hảo giữa độ nhẹ và sức bền. Lốp bên mềm 50TPI với kết cấu đặc biệt mang lại độ bám đường vượt trội, cho phép người lái dễ dàng vượt qua những chướng ngại vật trên đường đi. Bàn đạp 67X có hạt giúp tăng thêm sự thoải mái và kiểm soát cho người lái, đảm bảo rằng họ luôn có cảm giác tự tin và thoải mái trong suốt hành trình. Sự kết hợp độc đáo giữa các tính năng này tạo nên một chiếc xe đạp leo núi đáng tin cậy, sẵn sàng đương đầu với mọi thách thức trên đường đi. Với sự kết hợp hoàn hảo giữa công nghệ và thiết kế, MTB đã trở thành mẫu xe đạp leo núi đáng mơ ước của mọi tín đồ đam mê môn thể thao mạo hiểm này.','/public/images/1745357360006-813573722.jpg','2025-04-22 21:29:20','2025-04-22 21:29:20'),(6,1,'Biểu tượng cho sự hoàn hảo trong làng xe đạp leo núi','METEOR, một tuyệt tác công nghệ đến từ thương hiệu nổi tiếng, đã vượt qua mọi giới hạn và trở thành biểu tượng cho sự hoàn hảo trong làng xe đạp leo núi. Với thiết kế đầy cá tính, phối hợp giữa màu đen huyền bí, xám thanh lịch và vàng đồng táo bạo, METEOR tạo nên một dấu ấn khó phai trong lòng những người yêu thích đạp xe leo núi. Mỗi đường nét trên chiếc xe này đều được chau chuốt tỉ mỉ, tạo nên vẻ đẹp thu hút từ cái nhìn đầu tiên. Các chi tiết được thiết kế tinh tế, phản ánh sự chuyên nghiệp và tỉ mỉ trong quá trình sản xuất, mang đến cho người sử dụng một trải nghiệm thị giác đầy mê hoặc.','/public/images/1745357409777-351023551.jpg','2025-04-22 21:30:09','2025-04-22 21:30:09'),(7,1,'Thông số kỹ thuật vượt trội đáp ứng mọi nhu cầu người lái','Kích thước 26 inch vừa đủ để mang lại cảm giác vận hành linh hoạt nhưng cũng đảm bảo sự ổn định trên những đoạn đường gập ghềnh. Với 24 tốc độ, METEOR có khả năng đáp ứng mọi nhu cầu của người lái, từ việc chinh phục những đoạn đường dốc cao đến những cung đường êm ái. Không chỉ vậy, thiết kế của chiếc xe này còn được tính toán kỹ lưỡng để tối đa hóa hiệu suất và trải nghiệm lái. Từng chi tiết nhỏ đều được chú trọng, đảm bảo rằng người sử dụng sẽ có cảm giác thoải mái và an toàn trong suốt hành trình của mình.','/public/images/1745357409777-351023551.jpg','2025-04-22 21:30:21','2025-04-22 21:30:21'),(8,1,'Khung xe cứng cáp, hệ thống giảm xóc và dẫn truyền hiệu quả','Không chỉ mang lại sự linh hoạt khi di chuyển, khung xe còn đảm bảo độ bền tối ưu để chịu được những va đập mạnh mẽ trên những cung đường hiểm trở. Phuộc trước giảm xóc dày 38 cùng hệ thống dẫn truyền EF500 hiệu quả giúp METEOR hoạt động trơn tru trong mọi tình huống. Những cú rung lắc mạnh mẽ trên địa hình khó khăn sẽ được hấp thụ hoàn toàn, mang đến cho người lái một trải nghiệm lái xe đạp thực sự thoải mái và êm ái. Hệ thống dẫn truyền tiên tiến cũng đảm bảo rằng mọi chuyển động của người lái sẽ được truyền đạt đầy đủ đến bánh xe, tối ưu hóa sức mạnh và hiệu quả của mỗi cú đạp.','/public/images/1745357460254-734053874.jpg','2025-04-22 21:31:00','2025-04-22 21:31:00'),(9,1,'Hệ thống phanh đĩa và trục trung tâm đảm bảo kiểm soát tốc độ','Với khả năng phanh gấp, người lái có thể kiểm soát tốc độ một cách an toàn và chính xác, ngay cả khi đối mặt với những đoạn đường dốc nguy hiểm. Hệ thống phanh này được thiết kế đặc biệt để tăng cường khả năng kiểm soát, đảm bảo rằng người lái luôn nắm quyền kiểm soát trên bất kỳ địa hình nào. Trục xe đạp trung tâm mang màu đen cùng trục kín tích hợp ổ trục và ổ bi tạo nên sự liền mạch, vận hành mượt mà trong suốt hành trình. Mỗi chi tiết được sản xuất từ những vật liệu chất lượng cao, đảm bảo độ bền lâu dài và hiệu suất vận hành ổn định trong điều kiện khắc nghiệt nhất.','/public/images/1745357479935-253956636.jpg','2025-04-22 21:31:19','2025-04-22 21:31:19'),(10,1,'Vành xe Nhôm, lốp bám đường tối ưu trên mọi địa hình','Vành xe được chế tạo từ hợp kim nhôm cao cấp, tạo nên sự cân bằng hoàn hảo giữa độ nhẹ và sức bền. Lốp bên mềm 50TPI với kết cấu đặc biệt mang lại độ bám đường vượt trội, cho phép người lái dễ dàng vượt qua những chướng ngại vật trên đường đi. Bàn đạp 67X có hạt giúp tăng thêm sự thoải mái và kiểm soát cho người lái, đảm bảo rằng họ luôn có cảm giác tự tin và thoải mái trong suốt hành trình. Sự kết hợp độc đáo giữa các tính năng này tạo nên một chiếc xe đạp leo núi đáng tin cậy, sẵn sàng đương đầu với mọi thách thức trên đường đi. Với sự kết hợp hoàn hảo giữa công nghệ và thiết kế, MTB đã trở thành mẫu xe đạp leo núi đáng mơ ước của mọi tín đồ đam mê môn thể thao mạo hiểm này.','/public/images/1745357499318-878073348.jpg','2025-04-22 21:31:39','2025-04-22 21:31:39');
/*!40000 ALTER TABLE `contenttypes` ENABLE KEYS */;
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
