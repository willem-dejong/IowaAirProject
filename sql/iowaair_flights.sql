-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: iowaair
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flights` (
  `Flight_num` varchar(50) NOT NULL,
  `departue_time` datetime NOT NULL,
  `arrival_time` datetime NOT NULL,
  `seats_available` int(11) NOT NULL,
  `seats_booked` int(11) NOT NULL,
  `cost_per_seat` float NOT NULL,
  `plane_id` varchar(25) NOT NULL,
  `origin_port` varchar(25) NOT NULL,
  `destined_port` varchar(25) NOT NULL,
  `Gate` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`Flight_num`),
  KEY `plane_idx` (`plane_id`),
  KEY `orig_idx` (`origin_port`),
  KEY `dest_idx` (`destined_port`),
  CONSTRAINT `dest` FOREIGN KEY (`destined_port`) REFERENCES `airports` (`portid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `orig` FOREIGN KEY (`origin_port`) REFERENCES `airports` (`portid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `plane` FOREIGN KEY (`plane_id`) REFERENCES `planes` (`plane_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` VALUES ('3rddw','2017-07-12 06:45:00','2017-07-12 08:45:00',65,40,500,'d33sj','ORD','CID',NULL),('df4','2017-07-12 11:45:00','2017-07-12 13:45:00',45,60,412,'d343','CID','ORD',NULL),('dfee','2017-07-12 14:45:00','2017-07-12 16:45:00',33,77,245,'d343','ORD','OSS',NULL),('s4r','2017-07-12 03:45:00','2017-07-12 05:45:00',90,15,412,'d33sj','CID','ORD',NULL);
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-18 17:04:48
