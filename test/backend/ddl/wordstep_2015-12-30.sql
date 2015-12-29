# ************************************************************
# Sequel Pro SQL dump
# Версия 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Адрес: 127.0.0.1 (MySQL 5.6.22)
# Схема: wordstep
# Время создания: 2015-12-29 20:36:28 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Дамп таблицы lines
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lines`;

CREATE TABLE `lines` (
  `id` bigint(11) unsigned NOT NULL,
  `en` bigint(11) unsigned DEFAULT NULL,
  `ru` bigint(11) unsigned DEFAULT NULL,
  `postId` bigint(11) unsigned DEFAULT NULL,
  `seq` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Дамп таблицы mediaFiles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mediaFiles`;

CREATE TABLE `mediaFiles` (
  `id` bigint(32) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `uploadId` bigint(32) NOT NULL,
  `filename` varchar(255) NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `info` text NOT NULL,
  `startTime` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `videoFile` bigint(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Дамп таблицы posts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` bigint(11) unsigned NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `ruAudio` bigint(11) DEFAULT NULL,
  `enAudio` bigint(11) DEFAULT NULL,
  `ruSub` bigint(11) DEFAULT NULL,
  `enSub` bigint(11) DEFAULT NULL,
  `video` bigint(11) DEFAULT NULL,
  `thumbs` bigint(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Дамп таблицы textLines
# ------------------------------------------------------------

DROP TABLE IF EXISTS `textLines`;

CREATE TABLE `textLines` (
  `id` bigint(11) unsigned NOT NULL,
  `lang` tinyint(4) DEFAULT NULL,
  `start` int(11) unsigned DEFAULT NULL,
  `dur` int(11) unsigned DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `lineId` bigint(11) DEFAULT NULL,
  `postId` bigint(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Дамп таблицы uploads
# ------------------------------------------------------------

DROP TABLE IF EXISTS `uploads`;

CREATE TABLE `uploads` (
  `id` bigint(32) NOT NULL,
  `info` text,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Дамп таблицы userTexts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userTexts`;

CREATE TABLE `userTexts` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
