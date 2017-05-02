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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `idaccount` bigint(100) NOT NULL AUTO_INCREMENT,
  `account_type` varchar(25) NOT NULL,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `forcePass` tinyint(4) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `gender` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idaccount`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'M','man','maning','iowaairman@gmail.com','f3c2f0a0c08e2f7a82c92ae64a836cf5',0,'319-721-4254',NULL),(2,'U','test','test','cswdejong@gmail.com','ceb177c70acef2f0f6ab4c93582127b2',0,'319-721-4254',NULL),(3,'A','Admin','Admin','iowaairad@gmail.com','f3c2f0a0c08e2f7a82c92ae64a836cf5',0,'319-721-4254',NULL),(11,'U','d','w','thecrimsonbloodmoon@gmail.com','59af13a86105b26373626f8cd7fe4686',1,'111-1111',NULL),(12,'U','Peggy','DeJong','ariepeggy@mchsi.com','89562d44bd1b9bf15129770a957e55c9',0,'1-319-294-8934',NULL),(13,'U','papa','dejong','pdejong@kirkwood.edu','53e906d178ab6d4654e23da86dcc4517',0,'319-551-7321',NULL),(14,'U','Matthew','Heim','heimburger13@gmail.com','f3c2f0a0c08e2f7a82c92ae64a836cf5',0,'563-340-4320',NULL),(15,'U','Chris','Chekal','chrischekal@gmail.com','f3c2f0a0c08e2f7a82c92ae64a836cf5',0,'402-881-6340',NULL),(16,'M','Aniket','Chitale','aniket-chitale@uiowa.edu','88ca80df2d72dbebcef83a756c323da1',0,'319-551-7321',NULL),(17,'U','Will','DeJ','willem-dejong@uiowa.edu','ceb177c70acef2f0f6ab4c93582127b2',0,'319-551-7321',NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airports`
--

DROP TABLE IF EXISTS `airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `airports` (
  `portid` varchar(25) NOT NULL,
  `airport` varchar(45) NOT NULL,
  `location` varchar(50) NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  PRIMARY KEY (`portid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airports`
--

LOCK TABLES `airports` WRITE;
/*!40000 ALTER TABLE `airports` DISABLE KEYS */;
INSERT INTO `airports` VALUES ('ASE','Aspen–Pitkin County Airport','Aspen, Colorado',39.2208,-106.867),('ATL','Hartsfield–Jackson Atlanta Int. Airport','Atlanta, Geogia',33.6407,-84.4277),('CID','Cedar Rapids Airpot','Cedar Rapids, IA',41.8864,-91.707),('DEN','Denver International Airport','Denver, Colorado',39.8561,-104.674),('ORD','O\'Heir','Chicago, IL',41.9742,-87.9073),('OSS','Aircraft Carrier fantasy port','somewhere in the pacific',41.9742,-127.907),('SEA','Seattle–Tacoma International Airport','	SeaTac, WA',47.4489,-122.309),('STT','Cyril E. King Airport','St. Thomas, Virgin Islands',18.3361,-64.9723);
/*!40000 ALTER TABLE `airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flights` (
  `flightID` int(11) NOT NULL AUTO_INCREMENT,
  `Flight_num` varchar(50) NOT NULL,
  `departure_time` datetime NOT NULL,
  `arrival_time` datetime NOT NULL,
  `ec_seats_available` int(11) NOT NULL,
  `ec_seats_booked` int(11) NOT NULL,
  `ec_cost_per_seat` float NOT NULL,
  `fc_seats_available` int(11) NOT NULL,
  `fc_seats_booked` int(11) NOT NULL,
  `fc_cost_per_seat` float NOT NULL,
  `plane_id` int(11) NOT NULL,
  `origin_port` varchar(25) NOT NULL,
  `destined_port` varchar(25) NOT NULL,
  `Gate` varchar(25) DEFAULT NULL,
  `ec_checked_in` int(11) NOT NULL DEFAULT '0',
  `fc_checked_in` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`flightID`),
  KEY `plane_idx` (`plane_id`),
  KEY `orig_idx` (`origin_port`),
  KEY `dest_idx` (`destined_port`),
  CONSTRAINT `dest` FOREIGN KEY (`destined_port`) REFERENCES `airports` (`portid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `orig` FOREIGN KEY (`origin_port`) REFERENCES `airports` (`portid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `plane` FOREIGN KEY (`plane_id`) REFERENCES `planes` (`plane_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` VALUES (1,'3rdd','2017-07-12 07:45:00','2017-07-12 08:45:00',100,71,500,25,34,1000,1,'ORD','CID',NULL,3,0),(2,'df4','2017-07-12 11:45:00','2017-07-12 13:45:00',75,91,412,10,4,1000,2,'CID','ORD',NULL,3,0),(3,'dfee','2017-07-12 14:45:00','2017-07-12 16:45:00',33,22,245,10,0,1000,2,'ORD','OSS',NULL,0,0),(4,'s4r','2017-07-12 03:45:00','2017-07-12 05:46:00',90,16,412,10,1,1011,1,'CID','ORD',NULL,0,0),(5,'sffaf','2017-07-12 23:45:00','2017-07-13 00:40:00',100,90,111,10,0,1233,1,'ORD','CID',NULL,0,0),(6,'e43','2017-07-12 20:45:00','2017-07-12 21:45:00',12,6,111,11,5,1222,3,'CID','OSS',NULL,0,0),(13,'3r43r','2017-06-06 04:00:00','2017-06-06 06:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL,0,0),(14,'3r43r','2017-07-06 07:00:00','2017-07-06 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL,0,0),(15,'3r43r','2017-07-07 07:00:00','2017-07-07 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL,0,0),(16,'3r43r','2017-07-08 07:00:00','2017-07-08 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL,0,0),(17,'3r43r','2017-07-09 07:00:00','2017-07-09 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL,0,0),(18,'3r43r','2017-07-18 07:00:00','2017-07-18 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL,0,0),(19,'3r43r','2017-07-19 07:00:00','2017-07-19 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL,0,0),(23,'dwq','2017-04-27 01:00:00','2017-04-27 02:00:00',11,11,11,11,11,11,1,'CID','ORD',NULL,0,0),(26,'adwa','2017-04-26 01:00:00','2017-04-26 02:00:00',11,11,11,11,11,11,1,'CID','ORD',NULL,0,0),(47,'afaf','2017-05-25 08:30:00','2017-05-25 09:20:00',75,20,200,20,3,550,2,'CID','ORD','A5',0,0),(48,'afaf','2017-05-26 08:30:00','2017-05-26 09:20:00',75,21,200,20,3,550,2,'CID','ORD','A5',0,0),(49,'afaf','2017-05-27 08:30:00','2017-05-27 09:20:00',75,20,200,20,3,550,2,'CID','ORD','A5',0,0),(50,'afaf','2017-05-28 08:30:00','2017-05-28 09:20:00',75,20,200,20,3,550,2,'CID','ORD','A5',0,0),(51,'afaf','2017-05-29 08:30:00','2017-05-29 09:20:00',75,20,200,20,3,550,2,'CID','ORD','A5',0,0),(52,'afaf','2017-05-30 08:30:00','2017-05-30 09:20:00',75,20,200,20,3,550,2,'CID','ORD','A5',0,0),(53,'ssdd','2017-05-25 11:30:00','2017-05-25 14:45:00',75,20,900,20,3,2550,6,'CID','OSS','A6',0,0),(54,'ssdd','2017-05-26 11:30:00','2017-05-26 14:45:00',75,20,900,20,3,2550,6,'CID','OSS','A6',0,0),(55,'ssdd','2017-05-27 11:30:00','2017-05-27 14:45:00',75,20,900,20,3,2550,6,'CID','OSS','A6',0,0),(56,'ssdd','2017-05-28 11:30:00','2017-05-28 14:45:00',75,20,900,20,3,2550,6,'CID','OSS','A6',0,0),(57,'ssdd','2017-05-29 11:30:00','2017-05-29 14:45:00',75,20,900,20,3,2550,6,'CID','OSS','A6',0,0),(58,'ssdd','2017-05-30 11:30:00','2017-05-30 14:45:00',75,20,900,20,3,2550,6,'CID','OSS','A6',0,0),(59,'rfrf','2017-05-25 10:15:00','2017-05-25 13:45:00',75,20,800,20,3,1550,7,'ORD','SEA','A9',0,0),(60,'rfrf','2017-05-26 10:15:00','2017-05-26 13:45:00',75,21,800,20,3,1550,7,'ORD','SEA','A9',0,0),(61,'rfrf','2017-05-27 10:15:00','2017-05-27 13:45:00',75,20,800,20,3,1550,7,'ORD','SEA','A9',0,0),(62,'rfrf','2017-05-28 10:15:00','2017-05-28 13:45:00',75,20,800,20,3,1550,7,'ORD','SEA','A9',0,0),(63,'rfrf','2017-05-29 10:15:00','2017-05-29 13:45:00',75,20,800,20,3,1550,7,'ORD','SEA','A9',0,0),(64,'rfrf','2017-05-30 10:15:00','2017-05-30 13:45:00',75,20,800,20,3,1550,7,'ORD','SEA','A9',0,0),(65,'stst','2017-05-25 14:15:00','2017-05-25 14:45:00',75,20,200,20,3,550,8,'SEA','OSS','A9',0,0),(66,'stst','2017-05-26 14:15:00','2017-05-26 14:45:00',75,21,200,20,3,550,8,'SEA','OSS','A9',0,0),(67,'stst','2017-05-27 14:15:00','2017-05-27 14:45:00',75,20,200,20,3,550,8,'SEA','OSS','A9',0,0),(68,'stst','2017-05-28 14:15:00','2017-05-28 14:45:00',75,20,200,20,3,550,8,'SEA','OSS','A9',0,0),(69,'stst','2017-05-29 14:15:00','2017-05-29 14:45:00',75,20,200,20,3,550,8,'SEA','OSS','A9',0,0),(70,'stst','2017-05-30 14:15:00','2017-05-30 14:45:00',75,20,200,20,3,550,8,'SEA','OSS','A9',0,0),(71,'rtgf','2017-05-25 12:00:00','2017-05-25 14:45:00',75,20,850,20,3,1850,10,'ORD','OSS','A9',0,0),(72,'rtgf','2017-05-26 12:00:00','2017-05-26 14:45:00',75,20,850,20,3,1850,10,'ORD','OSS','A9',0,0),(73,'rtgf','2017-05-27 12:00:00','2017-05-27 14:45:00',75,20,850,20,3,1850,10,'ORD','OSS','A9',0,0),(74,'rtgf','2017-05-28 12:00:00','2017-05-28 14:45:00',75,20,850,20,3,1850,10,'ORD','OSS','A9',0,0),(75,'rtgf','2017-05-29 12:00:00','2017-05-29 14:45:00',75,20,850,20,3,1850,10,'ORD','OSS','A9',0,0),(76,'rtgf','2017-05-30 12:00:00','2017-05-30 14:45:00',75,20,850,20,3,1850,10,'ORD','OSS','A9',0,0),(77,'rgdc','2017-05-25 11:00:00','2017-05-25 13:45:00',75,20,750,20,3,1550,11,'CID','SEA','A9',0,0),(78,'rgdc','2017-05-26 11:00:00','2017-05-26 13:45:00',75,20,750,20,3,1550,11,'CID','SEA','A9',0,0),(79,'rgdc','2017-05-27 11:00:00','2017-05-27 13:45:00',75,20,750,20,3,1550,11,'CID','SEA','A9',0,0),(80,'rgdc','2017-05-28 11:00:00','2017-05-28 13:45:00',75,20,750,20,3,1550,11,'CID','SEA','A9',0,0),(81,'rgdc','2017-05-29 11:00:00','2017-05-29 13:45:00',75,20,750,20,3,1550,11,'CID','SEA','A9',0,0),(82,'rgdc','2017-05-30 11:00:00','2017-05-30 13:45:00',75,20,750,20,3,1550,11,'CID','SEA','A9',0,0),(83,'tgaw','2017-05-25 08:00:00','2017-05-25 13:45:00',75,20,950,20,3,2550,12,'OSS','CID','A9',0,0),(84,'tgaw','2017-05-26 08:00:00','2017-05-26 13:45:00',75,20,950,20,3,2550,12,'OSS','CID','A9',0,0),(85,'tgaw','2017-05-27 08:00:00','2017-05-27 13:45:00',75,20,950,20,3,2550,12,'OSS','CID','A9',0,0),(86,'tgaw','2017-05-28 08:00:00','2017-05-28 13:45:00',75,20,950,20,3,2550,12,'OSS','CID','A9',0,0),(87,'tgaw','2017-05-29 08:00:00','2017-05-29 13:45:00',75,20,950,20,3,2550,12,'OSS','CID','A9',0,0),(88,'tgaw','2017-05-30 08:00:00','2017-05-30 13:45:00',75,20,950,20,3,2550,12,'OSS','CID','A9',0,0),(89,'fdds','2017-05-01 08:00:00','2017-05-01 09:00:00',77,7,777,77,7,777,1,'CID','ORD',NULL,0,0),(90,'g32u','2017-05-17 08:00:00','2017-05-17 09:05:00',13,5,120,10,2,200,1,'CID','ORD',NULL,0,0),(91,'f876d','2017-05-17 09:45:00','2017-05-17 11:45:00',30,8,250,20,6,325,1,'ORD','ATL',NULL,0,0),(92,'r345h','2017-05-17 12:30:00','2017-05-17 16:15:00',15,3,350,10,2,400,1,'ATL','STT',NULL,0,0);
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planes`
--

DROP TABLE IF EXISTS `planes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `planes` (
  `plane_id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(50) NOT NULL,
  `fc_num_seats` int(11) NOT NULL,
  `ec_num_seats` int(11) NOT NULL,
  PRIMARY KEY (`plane_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planes`
--

LOCK TABLES `planes` WRITE;
/*!40000 ALTER TABLE `planes` DISABLE KEYS */;
INSERT INTO `planes` VALUES (1,'boeing 474',122,110),(2,'boeing 747',100,211),(3,'boeing 456',100,122),(4,'boeing 456',100,100),(5,'xdgs',100,100),(6,'boeing 747',25,100),(7,'boeing 747',25,100),(8,'boeing 747',25,100),(9,'Boeing 727',0,100),(10,'boeing 747',25,100),(11,'boeing 747',25,100),(12,'boeing 747',25,100);
/*!40000 ALTER TABLE `planes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservations` (
  `res_num` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `DOB` date NOT NULL,
  `gender` varchar(1) NOT NULL,
  `account_ID` bigint(100) NOT NULL,
  `flightID` int(11) NOT NULL,
  `class` varchar(45) NOT NULL,
  `transactID` int(11) NOT NULL,
  `seatnum` varchar(45) DEFAULT NULL,
  `numbags` int(11) DEFAULT NULL,
  PRIMARY KEY (`res_num`),
  KEY `account_idx` (`account_ID`),
  KEY `flight_idx` (`flightID`),
  KEY `trans_idx` (`transactID`),
  CONSTRAINT `account` FOREIGN KEY (`account_ID`) REFERENCES `account` (`idaccount`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `flight` FOREIGN KEY (`flightID`) REFERENCES `flights` (`flightID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `trans` FOREIGN KEY (`transactID`) REFERENCES `transact` (`transID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,'ss','ss','1991-01-01','m',2,89,'ec',1,NULL,NULL),(2,'willem','DeJong','2017-03-08','M',2,48,'ec',2,NULL,NULL),(3,'willem','DeJong','2017-03-08','M',2,60,'ec',2,NULL,NULL);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transact`
--

DROP TABLE IF EXISTS `transact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transact` (
  `transID` int(11) NOT NULL AUTO_INCREMENT,
  `accountid` int(11) NOT NULL,
  PRIMARY KEY (`transID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transact`
--

LOCK TABLES `transact` WRITE;
/*!40000 ALTER TABLE `transact` DISABLE KEYS */;
INSERT INTO `transact` VALUES (1,2),(2,1);
/*!40000 ALTER TABLE `transact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'iowaair'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `delete_event` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`admin`@`localhost`*/ /*!50106 EVENT `delete_event` ON SCHEDULE EVERY 1 DAY STARTS '2017-02-17 09:51:53' ON COMPLETION PRESERVE ENABLE DO DELETE from session WHERE date < DATE_SUB(NOW(), INTERVAL 1 DAY) */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'iowaair'
--
/*!50003 DROP FUNCTION IF EXISTS `intoRes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` FUNCTION `intoRes`(tran int,fnam varchar(45),lnam varchar(45),d date,g varchar(1),aid int,fid int,cls varchar(45)) RETURNS int(11)
BEGIN
insert into iowaair.reservations (fname,lname,DOB,gender,account_ID,flightID,class,transactID) value(fnam,lnam,d,g,aid,fid,cls,tran);
call iowaair.incbook(fid,1,cls);
return (select tran);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `intoTran` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` FUNCTION `intoTran`(id int) RETURNS int(11)
BEGIN
insert into iowaair.transact(accountid) value(id);
RETURN (select LAST_INSERT_ID() limit 1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addFlight` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `addFlight`(fnum varchar(50),dep datetime,arv datetime,ecsa int,ecsb int,eccps float,fcsa int,fcsb int,fccps float,am varchar(50),org varchar(25),dest varchar(25),g varchar(25),inter int,interType varchar(25),numTime int)
BEGIN
DECLARE oops CONDITION FOR SQLSTATE '45000';

START TRANSACTION;
set @pid=(select plane_id from iowaair.planes as f where f.plane_id not in (SELECT distinct plane_id FROM iowaair.flights where departure_time<=arv+interval 5 hour and arrival_time>=dep-interval 5 hour) and model=am limit 1);
insert into iowaair.flights(Flight_num,departure_time,arrival_time,ec_seats_available,ec_seats_booked,ec_cost_per_seat,fc_seats_available,fc_seats_booked,fc_cost_per_seat,plane_id,origin_port,destined_port,gate) values (fnum,dep,arv,ecsa,ecsb,eccps,fcsa,fcsb,fccps,@pid,org,dest,g);
set @i=1;
WHILE @i<=numTime DO
if interType="minutes" then
set @pid=(select plane_id from iowaair.planes as f where f.plane_id not in (SELECT distinct plane_id FROM iowaair.flights where departure_time<=arv+interval inter*@i minute+interval 5 hour and arrival_time>=dep+interval inter*@i minute-interval 5 hour) and model=am limit 1);
insert into iowaair.flights(Flight_num,departure_time,arrival_time,ec_seats_available,ec_seats_booked,ec_cost_per_seat,fc_seats_available,fc_seats_booked,fc_cost_per_seat,plane_id,origin_port,destined_port,gate) values (fnum,dep+interval inter*@i minute,arv+interval inter*@i minute,ecsa,ecsb,eccps,fcsa,fcsb,fccps,@pid,org,dest,g);
elseif interType="hours" then
set @pid=(select plane_id from iowaair.planes as f where f.plane_id not in (SELECT distinct plane_id FROM iowaair.flights where departure_time<=arv+interval inter*@i hour+interval 5 hour and arrival_time>=dep+interval inter*@i hour-interval 5 hour) and model=am limit 1);
insert into iowaair.flights(Flight_num,departure_time,arrival_time,ec_seats_available,ec_seats_booked,ec_cost_per_seat,fc_seats_available,fc_seats_booked,fc_cost_per_seat,plane_id,origin_port,destined_port,gate) values (fnum,dep+interval inter*@i hour,arv+interval inter*@i hour,ecsa,ecsb,eccps,fcsa,fcsb,fccps,@pid,org,dest,g);
elseif interType="days" then
set @pid=(select plane_id from iowaair.planes as f where f.plane_id not in (SELECT distinct plane_id FROM iowaair.flights where departure_time<=arv+interval inter*@i day+interval 5 hour and arrival_time>=dep+interval inter*@i day-interval 5 hour) and model=am limit 1);
insert into iowaair.flights(Flight_num,departure_time,arrival_time,ec_seats_available,ec_seats_booked,ec_cost_per_seat,fc_seats_available,fc_seats_booked,fc_cost_per_seat,plane_id,origin_port,destined_port,gate) values (fnum,dep+interval inter*@i day,arv+interval inter*@i day,ecsa,ecsb,eccps,fcsa,fcsb,fccps,@pid,org,dest,g);
elseif interType="months" then
set @pid=(select plane_id from iowaair.planes as f where f.plane_id not in (SELECT distinct plane_id FROM iowaair.flights where departure_time<=arv+interval inter*@i month+interval 5 hour and arrival_time>=dep+interval inter*@i month-interval 5 hour) and model=am limit 1);
insert into iowaair.flights(Flight_num,departure_time,arrival_time,ec_seats_available,ec_seats_booked,ec_cost_per_seat,fc_seats_available,fc_seats_booked,fc_cost_per_seat,plane_id,origin_port,destined_port,gate) values (fnum,dep+interval inter*@i month,arv+interval inter*@i month,ecsa,ecsb,eccps,fcsa,fcsb,fccps,@pid,org,dest,g);
else
ROLLBACK;
SIGNAL oops;
end if;
set @i=@i+1;
END WHILE;
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cancel2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `cancel2`(resID int, email varchar(45),pass varchar(45))
BEGIN
DECLARE oops CONDITION FOR SQLSTATE '45000';
START TRANSACTION;
set @dd=(select f.departure_time from iowaair.flights as f,iowaair.reservations as r,iowaair.account as a where f.flightID=r.flightID and r.res_num=resID and a.idaccount=r.account_ID and a.email=email and a.password=pass limit 1);
if @dd is null or @dd-interval 1 day<=NOW() then
rollback;
signal oops;
end if;
DELETE FROM iowaair.reservations WHERE res_num=resID;
commit;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `checkin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `checkin`(resID int,bags int)
BEGIN
DECLARE oops CONDITION FOR SQLSTATE '45000';
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
		SIGNAL oops;
    END;
START TRANSACTION;
set @cls=(select class from reservations where res_num=resID limit 1);
set @fid=(select flightID from reservations where res_num=resID limit 1);
if @cls="fc" then
set @seatnum=(select fc_checked_in from flights where flightID=@fid limit 1)+1;
update iowaair.flights set fc_checked_in=@seatnum where flightID=@fid;
else
set @seatnum=(select ec_checked_in from flights where flightID=@fid limit 1)+1;
update iowaair.flights set ec_checked_in=@seatnum where flightID=@fid;
end if;
set @seat=Concat(@cls,@seatnum);
update iowaair.reservations set seatnum=@seat, numbags=bags where res_num=resID;
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFlights1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getFlights1`(pass int,org varchar(25),dest varchar(25),ddate datetime)
BEGIN
SELECT distinct 
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
ap1.lat as lat1,
ap1.lon as lon1,
ap2.lat as lat2,
ap2.lon as lon2,
f.departure_time as depTime1,
f.arrival_time as arrTime1,
f.fc_cost_per_seat*pass as fc_price1,
f.ec_cost_per_seat*pass as ec_price1,
p.model as model1,
f.flightID as flightID1,
0 as num_stops,
timediff(f.arrival_time,f.departure_time) as tot_time,
f.fc_cost_per_seat*pass as tot_fc_price,
f.ec_cost_per_seat*pass as tot_ec_price,
f.fc_seats_available>(f.fc_seats_booked+pass) as has_fc,
f.ec_seats_available>(f.ec_seats_booked+pass) as has_ec
from
iowaair.flights as f,
iowaair.airports as ap1,
iowaair.airports as ap2,
iowaair.planes as p
where
f.plane_id=p.plane_id and
f.origin_port=ap1.portid and
f.destined_port=ap2.portid and
f.origin_port=org and
f.destined_port=dest and
f.departure_time<=Date(ddate)+ interval 1 day and
f.departure_time>=ddate and
f.departure_time>=now()+interval 1 hour and
((f.fc_seats_available>(f.fc_seats_booked+pass)) or (f.ec_seats_available>(f.ec_seats_booked+pass)));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFlights2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getFlights2`(pass int,org varchar(25),dest varchar(25),ddate datetime)
BEGIN
SELECT distinct 
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
ap1.lat as lat1,
ap1.lon as lon1,
f.departure_time as depTime1,
f.arrival_time as arrTime1,
f.fc_cost_per_seat*pass as fc_price1,
f.ec_cost_per_seat*pass as ec_price1,
p.model as model1,
f.flightID as flightID1,
f2.Flight_num as Flight_num2,
f2.Gate as gate2,
f2.origin_port as opID2,
f2.destined_port as dpID2,
ap12.airport as porta2,
ap22.airport as portb2,
ap12.lat as lat2,
ap12.lon as lon2,
ap22.lat as lat3,
ap22.lon as lon3,
f2.departure_time as depTime2,
f2.arrival_time as arrTime2,
f2.fc_cost_per_seat*pass as fc_price2,
f2.ec_cost_per_seat*pass as ec_price2,
p2.model as model2,
f2.flightID as flightID2,
1 as num_stops,
timediff(f2.arrival_time,f.departure_time) as tot_time,
(f.fc_cost_per_seat+f2.fc_cost_per_seat)*pass as tot_fc_price,
(f.ec_cost_per_seat+f2.ec_cost_per_seat)*pass as tot_ec_price,
((f.fc_seats_available>(f.fc_seats_booked+pass)) and (f2.fc_seats_available>(f2.fc_seats_booked+pass))) as has_fc,
((f.ec_seats_available>(f.ec_seats_booked+pass)) and (f2.ec_seats_available>(f2.ec_seats_booked+pass))) as has_ec
from
iowaair.flights as f,
iowaair.airports as ap1,
iowaair.airports as ap2,
iowaair.planes as p,
iowaair.flights as f2,
iowaair.airports as ap12,
iowaair.airports as ap22,
iowaair.planes as p2
where
f.plane_id=p.plane_id and
f.origin_port=ap1.portid and
f.destined_port=ap2.portid and
f2.plane_id=p2.plane_id and
f2.origin_port=ap12.portid and
f2.destined_port=ap22.portid and
f.origin_port=org and
f.destined_port!=dest and
f.destined_port=f2.origin_port and
f2.destined_port=dest and
f.departure_time<=Date(ddate)+ interval 1 day and
f.departure_time>=ddate and
f.departure_time>=now()+interval 1 hour and
f2.departure_time>=DATE_ADD(f.arrival_time, INTERVAL 30 MINUTE) and
f2.departure_time<=DATE_ADD(f.arrival_time, INTERVAL 1 DAY) and
((f.fc_seats_available>(f.fc_seats_booked+pass) and f2.fc_seats_available>(f2.fc_seats_booked+pass)) or (f.ec_seats_available>(f.ec_seats_booked+pass) and f2.ec_seats_available>(f2.ec_seats_booked+pass)));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFlights3` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getFlights3`(pass int,org varchar(25),dest varchar(25),ddate datetime)
BEGIN
SELECT distinct 
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
ap1.lat as lat1,
ap1.lon as lon1,
f.departure_time as depTime1,
f.arrival_time as arrTime1,
f.fc_cost_per_seat*pass as fc_price1,
f.ec_cost_per_seat*pass as ec_price1,
p.model as model1,
f.flightID as flightID1,
f2.Flight_num as Flight_num2,
f2.Gate as gate2,
f2.origin_port as opID2,
f2.destined_port as dpID2,
ap12.airport as porta2,
ap22.airport as portb2,
ap12.lat as lat2,
ap12.lon as lon2,
f2.departure_time as depTime2,
f2.arrival_time as arrTime2,
f2.fc_cost_per_seat*pass as fc_price2,
f2.ec_cost_per_seat*pass as ec_price2,
p2.model as model2,
f2.flightID as flightID2,
f3.Flight_num as Flight_num3,
f3.Gate as gate3,
f3.origin_port as opID3,
f3.destined_port as dpID3,
ap13.airport as porta3,
ap23.airport as portb3,
ap13.lat as lat3,
ap13.lon as lon3,
ap23.lat as lat4,
ap23.lon as lon4,
f3.departure_time as depTime3,
f3.arrival_time as arrTime3,
f3.fc_cost_per_seat*pass as fc_price3,
f3.ec_cost_per_seat*pass as ec_price3,
p3.model as model3,
f3.flightID as flightID3,
2 as num_stops,
timediff(f3.arrival_time,f.departure_time) as tot_time,
(f.fc_cost_per_seat+f2.fc_cost_per_seat+f3.fc_cost_per_seat)*pass as tot_fc_price,
(f.ec_cost_per_seat+f2.ec_cost_per_seat+f3.ec_cost_per_seat)*pass as tot_ec_price,
((f.fc_seats_available>(f.fc_seats_booked+pass)) and (f2.fc_seats_available>(f2.fc_seats_booked+pass)) and (f3.fc_seats_available>(f3.fc_seats_booked+pass))) as has_fc,
((f.ec_seats_available>(f.ec_seats_booked+pass)) and (f2.ec_seats_available>(f2.ec_seats_booked+pass)) and (f3.ec_seats_available>(f3.ec_seats_booked+pass))) as has_ec
from
iowaair.flights as f,
iowaair.airports as ap1,
iowaair.airports as ap2,
iowaair.planes as p,
iowaair.flights as f2,
iowaair.airports as ap12,
iowaair.airports as ap22,
iowaair.planes as p2,
iowaair.flights as f3,
iowaair.airports as ap13,
iowaair.airports as ap23,
iowaair.planes as p3
where
f.plane_id=p.plane_id and
f.origin_port=ap1.portid and
f.destined_port=ap2.portid and
f2.plane_id=p2.plane_id and
f2.origin_port=ap12.portid and
f2.destined_port=ap22.portid and
f3.plane_id=p3.plane_id and
f3.origin_port=ap13.portid and
f3.destined_port=ap23.portid and
f.origin_port=org and
f.destined_port!=dest and
f.destined_port=f2.origin_port and
f2.destined_port!=dest and
f2.destined_port!=f.origin_port and
f2.destined_port=f3.origin_port and
f3.destined_port=dest and
f.departure_time<=Date(ddate)+ interval 1 day and
f.departure_time>=ddate and
f.departure_time>=now()+interval 1 hour and
f2.departure_time>=DATE_ADD(f.arrival_time, INTERVAL 30 MINUTE) and
f3.departure_time>=DATE_ADD(f2.arrival_time, INTERVAL 30 MINUTE) and
f3.departure_time<=DATE_ADD(f.arrival_time, INTERVAL 1 DAY) and
((f.fc_seats_available>(f.fc_seats_booked+pass) and f2.fc_seats_available>(f2.fc_seats_booked+pass) and f3.fc_seats_available>(f3.fc_seats_booked+pass)) or (f.ec_seats_available>(f.ec_seats_booked+pass) and f2.ec_seats_available>(f2.ec_seats_booked+pass) and f3.ec_seats_available>(f3.ec_seats_booked+pass)));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getMapFlights1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getMapFlights1`(pass int,port1 varchar(25),port2 varchar(25),ddate datetime)
BEGIN
SELECT  distinct 
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
ap1.lat as lat1,
ap1.lon as lon1,
ap2.lat as lat2,
ap2.lon as lon2,
f.departure_time as depTime1,
f.arrival_time as arrTime1,
f.fc_cost_per_seat*pass as fc_price1,
f.ec_cost_per_seat*pass as ec_price1,
p.model as model1,
f.flightID as flightID1,
0 as num_stops,
timediff(f.arrival_time,f.departure_time) as tot_time,
f.fc_cost_per_seat*pass as tot_fc_price,
f.ec_cost_per_seat*pass as tot_ec_price,
f.fc_seats_available>(f.fc_seats_booked+pass) as has_fc,
f.ec_seats_available>(f.ec_seats_booked+pass) as has_ec
from
iowaair.flights as f,
iowaair.airports as ap1,
iowaair.airports as ap2,
iowaair.planes as p
where
f.plane_id=p.plane_id and
f.origin_port=ap1.portid and
f.destined_port=ap2.portid and
f.origin_port=port1 and
f.destined_port=port2 and
f.departure_time<=Date(ddate)+ interval 1 day and
f.departure_time>=ddate and
f.departure_time>=now()+interval 1 hour and
((f.fc_seats_available>(f.fc_seats_booked+pass)) or (f.ec_seats_available>(f.ec_seats_booked+pass)));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getMapFlights2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getMapFlights2`(pass int,port1 varchar(25),port2 varchar(25),port3 varchar(25),ddate datetime)
BEGIN
SELECT  distinct 
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
ap1.lat as lat1,
ap1.lon as lon1,
f.departure_time as depTime1,
f.arrival_time as arrTime1,
f.fc_cost_per_seat*pass as fc_price1,
f.ec_cost_per_seat*pass as ec_price1,
p.model as model1,
f.flightID as flightID1,
f2.Flight_num as Flight_num2,
f2.Gate as gate2,
f2.origin_port as opID2,
f2.destined_port as dpID2,
ap12.airport as porta2,
ap22.airport as portb2,
ap12.lat as lat2,
ap12.lon as lon2,
ap22.lat as lat3,
ap22.lon as lon3,
f2.departure_time as depTime2,
f2.arrival_time as arrTime2,
f2.fc_cost_per_seat*pass as fc_price2,
f2.ec_cost_per_seat*pass as ec_price2,
p2.model as model2,
f2.flightID as flightID2,
1 as num_stops,
timediff(f2.arrival_time,f.departure_time) as tot_time,
(f.fc_cost_per_seat+f2.fc_cost_per_seat)*pass as tot_fc_price,
(f.ec_cost_per_seat+f2.ec_cost_per_seat)*pass as tot_ec_price,
((f.fc_seats_available>(f.fc_seats_booked+pass)) and (f2.fc_seats_available>(f2.fc_seats_booked+pass))) as has_fc,
((f.ec_seats_available>(f.ec_seats_booked+pass)) and (f2.ec_seats_available>(f2.ec_seats_booked+pass))) as has_ec
from
iowaair.flights as f,
iowaair.airports as ap1,
iowaair.airports as ap2,
iowaair.planes as p,
iowaair.flights as f2,
iowaair.airports as ap12,
iowaair.airports as ap22,
iowaair.planes as p2
where
f.plane_id=p.plane_id and
f.origin_port=ap1.portid and
f.destined_port=ap2.portid and
f2.plane_id=p2.plane_id and
f2.origin_port=ap12.portid and
f2.destined_port=ap22.portid and
f.origin_port=port1 and
f.destined_port=port2 and
f.destined_port=f2.origin_port and
f2.destined_port=port3 and
f.departure_time<=Date(ddate)+ interval 1 day and
f.departure_time>=ddate and
f.departure_time>=now()+interval 1 hour and
f2.departure_time>=DATE_ADD(f.arrival_time, INTERVAL 30 MINUTE) and
f2.departure_time<=DATE_ADD(f.arrival_time, INTERVAL 1 DAY) and
((f.fc_seats_available>(f.fc_seats_booked+pass) and f2.fc_seats_available>(f2.fc_seats_booked+pass)) or (f.ec_seats_available>(f.ec_seats_booked+pass) and f2.ec_seats_available>(f2.ec_seats_booked+pass)));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getMapFlights3` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getMapFlights3`(pass int,port1 varchar(25),port2 varchar(25),port3 varchar(25),port4 varchar(25),ddate datetime)
BEGIN
SELECT  distinct 
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
ap1.lat as lat1,
ap1.lon as lon1,
f.departure_time as depTime1,
f.arrival_time as arrTime1,
f.fc_cost_per_seat*pass as fc_price1,
f.ec_cost_per_seat*pass as ec_price1,
p.model as model1,
f.flightID as flightID1,
f2.Flight_num as Flight_num2,
f2.Gate as gate2,
f2.origin_port as opID2,
f2.destined_port as dpID2,
ap12.airport as porta2,
ap22.airport as portb2,
ap12.lat as lat2,
ap12.lon as lon2,
f2.departure_time as depTime2,
f2.arrival_time as arrTime2,
f2.fc_cost_per_seat*pass as fc_price2,
f2.ec_cost_per_seat*pass as ec_price2,
p2.model as model2,
f2.flightID as flightID2,
f3.Flight_num as Flight_num3,
f3.Gate as gate3,
f3.origin_port as opID3,
f3.destined_port as dpID3,
ap13.airport as porta3,
ap23.airport as portb3,
ap13.lat as lat3,
ap13.lon as lon3,
ap23.lat as lat4,
ap23.lon as lon4,
f3.departure_time as depTime3,
f3.arrival_time as arrTime3,
f3.fc_cost_per_seat*pass as fc_price3,
f3.ec_cost_per_seat*pass as ec_price3,
p3.model as model3,
f3.flightID as flightID3,
2 as num_stops,
timediff(f3.arrival_time,f.departure_time) as tot_time,
(f.fc_cost_per_seat+f2.fc_cost_per_seat+f3.fc_cost_per_seat)*pass as tot_fc_price,
(f.ec_cost_per_seat+f2.ec_cost_per_seat+f3.ec_cost_per_seat)*pass as tot_ec_price,
((f.fc_seats_available>(f.fc_seats_booked+pass)) and (f2.fc_seats_available>(f2.fc_seats_booked+pass)) and (f3.fc_seats_available>(f3.fc_seats_booked+pass))) as has_fc,
((f.ec_seats_available>(f.ec_seats_booked+pass)) and (f2.ec_seats_available>(f2.ec_seats_booked+pass)) and (f3.ec_seats_available>(f3.ec_seats_booked+pass))) as has_ec
from
iowaair.flights as f,
iowaair.airports as ap1,
iowaair.airports as ap2,
iowaair.planes as p,
iowaair.flights as f2,
iowaair.airports as ap12,
iowaair.airports as ap22,
iowaair.planes as p2,
iowaair.flights as f3,
iowaair.airports as ap13,
iowaair.airports as ap23,
iowaair.planes as p3
where
f.plane_id=p.plane_id and
f.origin_port=ap1.portid and
f.destined_port=ap2.portid and
f2.plane_id=p2.plane_id and
f2.origin_port=ap12.portid and
f2.destined_port=ap22.portid and
f3.plane_id=p3.plane_id and
f3.origin_port=ap13.portid and
f3.destined_port=ap23.portid and
f.origin_port=port1 and
f.destined_port=port2 and
f.destined_port=f2.origin_port and
f2.destined_port=port3 and
f2.destined_port=f3.origin_port and
f3.destined_port=port4 and
f.departure_time<=Date(ddate)+ interval 1 day and
f.departure_time>=ddate and
f.departure_time>=now()+interval 1 hour and
f2.departure_time>=DATE_ADD(f.arrival_time, INTERVAL 30 MINUTE) and
f3.departure_time>=DATE_ADD(f2.arrival_time, INTERVAL 30 MINUTE) and
f3.departure_time<=DATE_ADD(f.arrival_time, INTERVAL 1 DAY) and
((f.fc_seats_available>(f.fc_seats_booked+pass) and f2.fc_seats_available>(f2.fc_seats_booked+pass) and f3.fc_seats_available>(f3.fc_seats_booked+pass)) or (f.ec_seats_available>(f.ec_seats_booked+pass) and f2.ec_seats_available>(f2.ec_seats_booked+pass) and f3.ec_seats_available>(f3.ec_seats_booked+pass)));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPassenger` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getPassenger`(resID int)
BEGIN
select r.res_num as resid,r.class as class,r.fname as fname,r.lname as lname,r.DOB as dob,r.gender as gender, r.flightID as flightID,f.Flight_num as Flight_num,f.Gate as Gate,p.model as model, f.departure_time as departure_time, f.origin_port as origin_port,f.arrival_time as arrival_time, f.destined_port as destined_port, r.seatnum as seatnum, r.numbags as bags from iowaair.reservations as r, iowaair.flights as f, iowaair.planes as p where r.flightID=f.flightID and f.plane_id=p.plane_id and r.res_num=resID limit 1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPassengers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getPassengers`(transid int)
BEGIN
select r.transactID as transID, r.res_num as resid,r.fname as fname,r.lname as lname,r.DOB as dob,r.gender as gender, r.flightID as flightID,f.Flight_num as Flight_num,f.Gate as Gate,p.model as model, f.departure_time as departure_time, f.origin_port as origin_port,f.arrival_time as arrival_time, f.destined_port as destined_port, r.seatnum as seatnum, r.numbags as bags from iowaair.reservations as r, iowaair.flights as f, iowaair.planes as p where r.flightID=f.flightID and f.plane_id=p.plane_id and r.transactID=transid;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPassengers2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getPassengers2`(email varchar(45),pass varchar(45))
BEGIN
select r.transactID as transID, r.res_num as resid,r.fname as fname,r.lname as lname,r.DOB as dob,r.gender as gender, r.flightID as flightID,f.Flight_num as Flight_num,f.Gate as Gate,p.model as model, f.departure_time as departure_time, f.origin_port as origin_port,f.arrival_time as arrival_time, f.destined_port as destined_port, r.seatnum as seatnum, r.numbags as bags from iowaair.reservations as r, iowaair.flights as f, iowaair.planes as p, iowaair.account as a where r.flightID=f.flightID and f.plane_id=p.plane_id and a.idaccount=r.account_ID and a.email=email and a.password=pass order by f.departure_time desc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTrip1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getTrip1`(fnum int,pass int)
BEGIN
SELECT 
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
ap1.lat as lat1,
ap1.lon as lon1,
ap2.lat as lat2,
ap2.lon as lon2,
f.departure_time as depTime1,
f.arrival_time as arrTime1,
f.fc_cost_per_seat*pass as fc_price1,
f.ec_cost_per_seat*pass as ec_price1,
p.model as model1,
f.flightID as flightID1,
0 as num_stops,
timediff(f.arrival_time,f.departure_time) as tot_time,
f.fc_cost_per_seat*pass as tot_fc_price,
f.ec_cost_per_seat*pass as tot_ec_price,
f.fc_seats_available>(f.fc_seats_booked+pass) as has_fc,
f.ec_seats_available>(f.ec_seats_booked+pass) as has_ec
from
iowaair.flights as f,
iowaair.airports as ap1,
iowaair.airports as ap2,
iowaair.planes as p
where
f.plane_id=p.plane_id and
f.origin_port=ap1.portid and
f.destined_port=ap2.portid and
f.flightID=fnum;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTrip2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getTrip2`(fnum int,fnum2 int,pass int)
BEGIN
select
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
ap1.lat as lat1,
ap1.lon as lon1,
ap2.lat as lat2,
ap2.lon as lon2,
f.departure_time as depTime1,
f.arrival_time as arrTime1,
f.fc_cost_per_seat*pass as fc_price1,
f.ec_cost_per_seat*pass as ec_price1,
p.model as model1,
f.flightID as flightID1,
f2.Flight_num as Flight_num2,
f2.Gate as gate2,
f2.origin_port as opID2,
f2.destined_port as dpID2,
ap12.airport as porta2,
ap22.airport as portb2,
ap12.lat as lat2,
ap12.lon as lon2,
ap22.lat as lat3,
ap22.lon as lon3,
f2.departure_time as depTime2,
f2.arrival_time as arrTime2,
f2.fc_cost_per_seat*pass as fc_price2,
f2.ec_cost_per_seat*pass as ec_price2,
p2.model as model2,
f2.flightID as flightID2,
1 as num_stops,
timediff(f2.arrival_time,f.departure_time) as tot_time,
(f.fc_cost_per_seat+f2.fc_cost_per_seat)*pass as tot_fc_price,
(f.ec_cost_per_seat+f2.ec_cost_per_seat)*pass as tot_ec_price,
((f.fc_seats_available>(f.fc_seats_booked+pass)) and (f2.fc_seats_available>(f2.fc_seats_booked+pass))) as has_fc,
((f.ec_seats_available>(f.ec_seats_booked+pass)) and (f2.ec_seats_available>(f2.ec_seats_booked+pass))) as has_ec
from
iowaair.flights as f,
iowaair.airports as ap1,
iowaair.airports as ap2,
iowaair.planes as p,
iowaair.flights as f2,
iowaair.airports as ap12,
iowaair.airports as ap22,
iowaair.planes as p2
where
f.plane_id=p.plane_id and
f.origin_port=ap1.portid and
f.destined_port=ap2.portid and
f2.plane_id=p2.plane_id and
f2.origin_port=ap12.portid and
f2.destined_port=ap22.portid and
f.destined_port=f2.origin_port and
f.flightID=fnum and
f2.flightID=fnum2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTrip3` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `getTrip3`(fnum int,fnum2 int,fnum3 int,pass int)
BEGIN
SELECT 
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
ap1.lat as lat1,
ap1.lon as lon1,
f.departure_time as depTime1,
f.arrival_time as arrTime1,
f.fc_cost_per_seat*pass as fc_price1,
f.ec_cost_per_seat*pass as ec_price1,
p.model as model1,
f.flightID as flightID1,
f2.Flight_num as Flight_num2,
f2.Gate as gate2,
f2.origin_port as opID2,
f2.destined_port as dpID2,
ap12.airport as porta2,
ap22.airport as portb2,
ap12.lat as lat2,
ap12.lon as lon2,
f2.departure_time as depTime2,
f2.arrival_time as arrTime2,
f2.fc_cost_per_seat*pass as fc_price2,
f2.ec_cost_per_seat*pass as ec_price2,
p2.model as model2,
f2.flightID as flightID2,
f3.Flight_num as Flight_num3,
f3.Gate as gate3,
f3.origin_port as opID3,
f3.destined_port as dpID3,
ap13.airport as porta3,
ap23.airport as portb3,
ap13.lat as lat3,
ap13.lon as lon3,
ap23.lat as lat4,
ap23.lon as lon4,
f3.departure_time as depTime3,
f3.arrival_time as arrTime3,
f3.fc_cost_per_seat*pass as fc_price3,
f3.ec_cost_per_seat*pass as ec_price3,
p3.model as model3,
f3.flightID as flightID3,
2 as num_stops,
timediff(f3.arrival_time,f.departure_time) as tot_time,
(f.fc_cost_per_seat+f2.fc_cost_per_seat+f3.fc_cost_per_seat)*pass as tot_fc_price,
(f.ec_cost_per_seat+f2.ec_cost_per_seat+f3.ec_cost_per_seat)*pass as tot_ec_price,
((f.fc_seats_available>(f.fc_seats_booked+pass)) and (f2.fc_seats_available>(f2.fc_seats_booked+pass)) and (f3.fc_seats_available>(f3.fc_seats_booked+pass))) as has_fc,
((f.ec_seats_available>(f.ec_seats_booked+pass)) and (f2.ec_seats_available>(f2.ec_seats_booked+pass)) and (f3.ec_seats_available>(f3.ec_seats_booked+pass))) as has_ec
from
iowaair.flights as f,
iowaair.airports as ap1,
iowaair.airports as ap2,
iowaair.planes as p,
iowaair.flights as f2,
iowaair.airports as ap12,
iowaair.airports as ap22,
iowaair.planes as p2,
iowaair.flights as f3,
iowaair.airports as ap13,
iowaair.airports as ap23,
iowaair.planes as p3
where
f.plane_id=p.plane_id and
f.origin_port=ap1.portid and
f.destined_port=ap2.portid and
f2.plane_id=p2.plane_id and
f2.origin_port=ap12.portid and
f2.destined_port=ap22.portid and
f3.plane_id=p3.plane_id and
f3.origin_port=ap13.portid and
f3.destined_port=ap23.portid and
f.destined_port=f2.origin_port and
f2.destined_port=f3.origin_port and
f2.destined_port!=f.origin_port and
f.flightID=fnum and
f2.flightID=fnum2 and
f3.flightID=fnum3;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `incbook` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `incbook`(id int, inc int,cls varchar(25))
BEGIN
if cls="ec" then
set @bb=(select ec_seats_booked from iowaair.flights where flightID=id limit 1);
update iowaair.flights set ec_seats_booked=@bb+inc where flightID=id;
elseif cls="fc" then
set @bb=(select fc_seats_booked from iowaair.flights where flightID=id limit 1);
update iowaair.flights set fc_seats_booked=@bb+inc where flightID=id;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateFlight` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`localhost` PROCEDURE `updateFlight`(id int,fnum varchar(50),dep datetime,arv datetime,ecsa int,ecsb int,eccps float,fcsa int,fcsb int,fccps float,am varchar(50),org varchar(25),dest varchar(25),g varchar(25))
BEGIN
set @cmod=(select p.model from iowaair.planes as p, iowaair.flights as f where f.flightID=id and f.plane_id=p.plane_id);
if @cmod!=am then
set @pid=(select plane_id from iowaair.planes as f where f.plane_id not in (SELECT distinct plane_id FROM iowaair.flights where departure_time<=arv+interval 5 hour and arrival_time>=dep-interval 5 hour) and model=am limit 1);
update iowaair.flights 
set 
Flight_num=fnum,
departure_time=dep,
arrival_time=arv, 
ec_seats_available=ecsa,
ec_seats_booked=ecsb,
ec_cost_per_seat=eccps, 
fc_seats_available=fcsa,
fc_seats_booked=fcsb,
fc_cost_per_seat=fccps,
plane_id=@pid,
origin_port=org,
destined_port=dest,
gate=g 
where flightID=id;
else
update iowaair.flights 
set 
Flight_num=fnum,
departure_time=dep,
arrival_time=arv, 
ec_seats_available=ecsa,
ec_seats_booked=ecsb,
ec_cost_per_seat=eccps, 
fc_seats_available=fcsa,
fc_seats_booked=fcsb,
fc_cost_per_seat=fccps,
origin_port=org,
destined_port=dest,
gate=g 
where flightID=id;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-01 21:19:02
