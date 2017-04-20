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
  PRIMARY KEY (`portid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airports`
--

LOCK TABLES `airports` WRITE;
/*!40000 ALTER TABLE `airports` DISABLE KEYS */;
INSERT INTO `airports` VALUES ('CID','Cedar Rapids Airpot','Cedar Rapids, IA'),('ORD','Some port','Some where'),('OSS','Some port 2','somewhere 3');
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
  PRIMARY KEY (`flightID`),
  KEY `plane_idx` (`plane_id`),
  KEY `orig_idx` (`origin_port`),
  KEY `dest_idx` (`destined_port`),
  CONSTRAINT `dest` FOREIGN KEY (`destined_port`) REFERENCES `airports` (`portid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `orig` FOREIGN KEY (`origin_port`) REFERENCES `airports` (`portid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `plane` FOREIGN KEY (`plane_id`) REFERENCES `planes` (`plane_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` VALUES (1,'3rdd','2017-07-12 07:45:00','2017-07-12 08:45:00',100,71,500,25,34,1000,1,'ORD','CID',NULL),(2,'df4','2017-07-12 11:45:00','2017-07-12 13:45:00',75,91,412,10,2,1000,2,'CID','ORD',NULL),(3,'dfee','2017-07-12 14:45:00','2017-07-12 16:45:00',33,22,245,10,0,1000,2,'ORD','OSS',NULL),(4,'s4r','2017-07-12 03:45:00','2017-07-12 05:46:00',90,15,412,10,0,1011,1,'CID','ORD',NULL),(5,'sffaf','2017-07-12 23:45:00','2017-07-13 00:40:00',100,90,111,10,0,1233,1,'ORD','CID',NULL),(6,'e43','2017-07-12 20:45:00','2017-07-12 21:45:00',12,6,111,11,5,1222,3,'CID','OSS',NULL),(13,'3r43r','2017-06-06 04:00:00','2017-06-06 06:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL),(14,'3r43r','2017-07-06 07:00:00','2017-07-06 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL),(15,'3r43r','2017-07-07 07:00:00','2017-07-07 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL),(16,'3r43r','2017-07-08 07:00:00','2017-07-08 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL),(17,'3r43r','2017-07-09 07:00:00','2017-07-09 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL),(18,'3r43r','2017-07-18 07:00:00','2017-07-18 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL),(19,'3r43r','2017-07-19 07:00:00','2017-07-19 08:00:00',10,10,10,10,10,10,1,'CID','ORD',NULL),(23,'dwq','2017-04-27 01:00:00','2017-04-27 02:00:00',11,11,11,11,11,11,1,'CID','ORD',NULL),(26,'adwa','2017-04-26 01:00:00','2017-04-26 02:00:00',11,11,11,11,11,11,1,'CID','ORD',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planes`
--

LOCK TABLES `planes` WRITE;
/*!40000 ALTER TABLE `planes` DISABLE KEYS */;
INSERT INTO `planes` VALUES (1,'boeing 474',122,122),(2,'boeing 747',100,211),(3,'boeing 456',100,122),(4,'boeing 456',100,100),(5,'xdgs',100,100),(6,'boeing 747',25,100),(7,'boeing 747',25,100),(8,'boeing 747',25,100);
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
  PRIMARY KEY (`res_num`),
  KEY `account_idx` (`account_ID`),
  KEY `flight_idx` (`flightID`),
  CONSTRAINT `account` FOREIGN KEY (`account_ID`) REFERENCES `account` (`idaccount`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `flight` FOREIGN KEY (`flightID`) REFERENCES `flights` (`flightID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,'Wil','dej','1990-07-12','M',3,1,'ec',1),(2,'sas','dej','1991-04-02','F',3,2,'ec',1),(3,'bob','saget','1960-01-01','F',14,1,'ec',1),(4,'bob','saget','1960-01-01','F',14,1,'ec',1),(37,'bob','dear','1990-01-01','M',2,2,'ec',1),(38,'bob','dear','1990-01-01','M',2,2,'ec',1),(39,'bob','dear','1990-01-01','M',2,1,'ec',1),(40,'bob','dear','1990-01-01','M',2,1,'ec',1),(41,'bob','dear','1990-01-01','M',2,2,'fc',1),(42,'bob','dear','1990-01-01','M',2,2,'fc',1),(43,'bob','dear','1990-01-01','M',2,1,'fc',1),(44,'bob','dear','1990-01-01','M',2,1,'fc',1),(45,'dfs','sfdsdf','2017-04-04','0',1,1,'fc',1),(46,'asda','asd','2017-04-04','m',1,1,'fc',1),(47,'asda','asd','2017-04-04','m',1,1,'fc',1),(48,'asda','asd','2017-04-04','m',1,1,'fc',1),(49,'sdfs','sdfs','2017-04-04','M',1,1,'fc',9),(50,'sdfs','sdfs','2017-04-04','M',1,1,'fc',10),(51,'sdfs','sdfs','2017-04-04','M',1,1,'fc',11),(52,'sdfs','sdfs','2017-04-04','M',1,1,'fc',11),(53,'bob','dear','1990-01-01','M',2,2,'ec',12),(54,'bob','dear','1990-01-01','M',2,2,'ec',12),(55,'bob','dear','1990-01-01','M',2,1,'ec',12),(56,'bob','dear','1990-01-01','M',2,1,'ec',12),(57,'bob','dear','1990-01-01','M',2,2,'ec',13),(58,'bob','dear','1990-01-01','M',2,2,'ec',13),(59,'bob','dear','1990-01-01','M',2,1,'ec',13),(60,'bob','dear','1990-01-01','M',2,1,'ec',13),(61,'bob','dear','1990-01-01','M',2,2,'ec',14),(62,'bob','dear','1990-01-01','M',2,2,'ec',14),(63,'bob','dear','1990-01-01','M',2,1,'ec',14),(64,'bob','dear','1990-01-01','M',2,1,'ec',14),(65,'bob','dear','1990-01-01','M',2,2,'ec',15),(66,'bob','dear','1990-01-01','M',2,2,'ec',15),(67,'bob','dear','1990-01-01','M',2,1,'ec',15),(68,'bob','dear','1990-01-01','M',2,1,'ec',15),(69,'bob','dear','1990-01-01','M',15,2,'ec',16),(70,'bob','dear','1990-01-01','M',15,2,'ec',16),(71,'bob','dear','1990-01-01','M',15,1,'ec',16),(72,'bob','dear','1990-01-01','M',15,1,'ec',16),(73,'bob','dear','1990-01-01','M',14,2,'ec',17),(74,'bob','dear','1990-01-01','M',14,2,'ec',17),(75,'bob','dear','1990-01-01','M',14,1,'ec',17),(76,'bob','dear','1990-01-01','M',14,1,'ec',17),(77,'bob','dear','1990-01-01','M',2,2,'ec',18),(78,'bob','dear','1990-01-01','M',2,2,'ec',18),(79,'bob','dear','1990-01-01','M',2,1,'ec',18),(80,'bob','dear','1990-01-01','M',2,1,'ec',18),(81,'bob','dear','1990-01-01','M',2,2,'ec',19),(82,'bob','dear','1990-01-01','M',2,2,'ec',19),(83,'bob','dear','1990-01-01','M',2,1,'ec',19),(84,'bob','dear','1990-01-01','M',2,1,'ec',19),(85,'bob','dear','1990-01-01','M',2,2,'ec',20),(86,'bob','dear','1990-01-01','M',2,2,'ec',20),(87,'bob','dear','1990-01-01','M',2,1,'ec',20),(88,'bob','dear','1990-01-01','M',2,1,'ec',20),(89,'bob','dear','1990-01-01','M',2,2,'ec',21),(90,'bob','dear','1990-01-01','M',2,2,'ec',21),(91,'bob','dear','1990-01-01','M',2,1,'ec',21),(92,'bob','dear','1990-01-01','M',2,1,'ec',21),(93,'bob','dear','1990-01-01','M',2,2,'ec',22),(94,'bob','dear','1990-01-01','M',2,2,'ec',22),(95,'bob','dear','1990-01-01','M',2,1,'ec',22),(96,'bob','dear','1990-01-01','M',2,1,'ec',22),(97,'bob','dear','1990-01-01','M',2,2,'ec',23),(98,'bob','dear','1990-01-01','M',2,2,'ec',23),(99,'bob','dear','1990-01-01','M',2,1,'ec',23),(100,'bob','dear','1990-01-01','M',2,1,'ec',23),(101,'bob','dear','1990-01-01','M',17,2,'ec',24),(102,'bob','dear','1990-01-01','M',17,2,'ec',24),(103,'bob','dear','1990-01-01','M',17,1,'ec',24),(104,'bob','dear','1990-01-01','M',17,1,'ec',24),(105,'bob','dear','1990-01-01','M',15,2,'ec',25),(106,'bob','dear','1990-01-01','M',15,2,'ec',25),(107,'bob','dear','1990-01-01','M',15,1,'ec',25),(108,'bob','dear','1990-01-01','M',15,1,'ec',25),(109,'we','wd','2017-04-19','M',2,2,'ec',26),(110,'we','wd','2017-04-19','M',2,1,'ec',26);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `data` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (1,'sdfsd'),(2,'sdfsd'),(3,'sgdd');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transact`
--

LOCK TABLES `transact` WRITE;
/*!40000 ALTER TABLE `transact` DISABLE KEYS */;
INSERT INTO `transact` VALUES (1,1),(2,1),(3,1),(4,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(26,1);
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
DECLARE oop CONDITION FOR SQLSTATE '45000';
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
		SIGNAL oop;
    END;
START TRANSACTION;


set @pid=(select plane_id from iowaair.planes as f where f.plane_id not in (SELECT distinct plane_id FROM iowaair.flights where departure_time<=arv+interval 5 hour and arrival_time>=dep-interval 5 hour) and model=am limit 1);
insert into iowaair.flights(Flight_num,departure_time,arrival_time,ec_seats_available,ec_seats_booked,ec_cost_per_seat,fc_seats_available,fc_seats_booked,fc_cost_per_seat,plane_id,origin_port,destined_port,gate)
values (fnum,dep,arv,ecsa,ecsb,eccps,fcsa,fcsb,fccps,@pid,org,dest,g);
set @i=0;
WHILE @i<numTime DO
if interType="minutes" then
set @pid=(select plane_id from iowaair.planes as f where f.plane_id not in (SELECT distinct plane_id FROM iowaair.flights where departure_time<=arv+interval inter minute+interval 5 hour and arrival_time>=dep+interval inter minute-interval 5 hour) and model=am limit 1);
insert into iowaair.flights(Flight_num,departure_time,arrival_time,ec_seats_available,ec_seats_booked,ec_cost_per_seat,fc_seats_available,fc_seats_booked,fc_cost_per_seat,plane_id,origin_port,destined_port,gate)
values (fnum,dep+interval inter minute,arv+interval inter minute,ecsa,ecsb,eccps,fcsa,fcsb,fccps,@pid,org,dest,g);
elseif interType="hours" then
set @pid=(select plane_id from iowaair.planes as f where f.plane_id not in (SELECT distinct plane_id FROM iowaair.flights where departure_time<=arv+interval inter hour+interval 5 hour and arrival_time>=dep+interval inter hour-interval 5 hour) and model=am limit 1);
insert into iowaair.flights(Flight_num,departure_time,arrival_time,ec_seats_available,ec_seats_booked,ec_cost_per_seat,fc_seats_available,fc_seats_booked,fc_cost_per_seat,plane_id,origin_port,destined_port,gate)
values (fnum,dep+interval inter hour,arv+interval inter hour,ecsa,ecsb,eccps,fcsa,fcsb,fccps,@pid,org,dest,g);
elseif interType="days" then
set @pid=(select plane_id from iowaair.planes as f where f.plane_id not in (SELECT distinct plane_id FROM iowaair.flights where departure_time<=arv+interval inter day+interval 5 hour and arrival_time>=dep+interval inter day-interval 5 hour) and model=am limit 1);
insert into iowaair.flights(Flight_num,departure_time,arrival_time,ec_seats_available,ec_seats_booked,ec_cost_per_seat,fc_seats_available,fc_seats_booked,fc_cost_per_seat,plane_id,origin_port,destined_port,gate)
values (fnum,dep+interval inter day,arv+interval inter day,ecsa,ecsb,eccps,fcsa,fcsb,fccps,@pid,org,dest,g);
elseif interType="months" then
set @pid=(select plane_id from iowaair.planes as f where f.plane_id not in (SELECT distinct plane_id FROM iowaair.flights where departure_time<=arv+interval inter month+interval 5 hour and arrival_time>=dep+interval inter month-interval 5 hour) and model=am limit 1);
insert into iowaair.flights(Flight_num,departure_time,arrival_time,ec_seats_available,ec_seats_booked,ec_cost_per_seat,fc_seats_available,fc_seats_booked,fc_cost_per_seat,plane_id,origin_port,destined_port,gate)
values (fnum,dep+interval inter month,arv+interval inter month,ecsa,ecsb,eccps,fcsa,fcsb,fccps,@pid,org,dest,g);
else
ROLLBACK;
SIGNAL oop;
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
SELECT 
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
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
f.departure_time<=ddate+ interval 1.5 day and
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
SELECT 
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
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
f.departure_time<=ddate+ interval 1.5 day and
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
SELECT 
f.Flight_num as Flight_num1,
f.Gate as gate1,
f.origin_port as opID1,
f.destined_port as dpID1,
ap1.airport as porta1,
ap2.airport as portb1,
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
f.departure_time<=ddate+ interval 1.5 day and
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

-- Dump completed on 2017-04-19 22:24:16
