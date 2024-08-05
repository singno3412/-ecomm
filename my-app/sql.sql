-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for next-js-registration-login-example
CREATE DATABASE IF NOT EXISTS `next-js-registration-login-example` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `next-js-registration-login-example`;

-- Dumping structure for table next-js-registration-login-example.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chatId` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table next-js-registration-login-example.messages: ~28 rows (approximately)
INSERT INTO `messages` (`id`, `chatId`, `username`, `message`, `timestamp`) VALUES
	(13, '2d35a562-c69d-4ba2-bc82-366369471198', 'User-6b420015', 'asd', '2024-07-30 15:50:37'),
	(14, '2d35a562-c69d-4ba2-bc82-366369471198', 'User-b03917db', 'asd', '2024-07-30 15:51:31'),
	(15, '2d35a562-c69d-4ba2-bc82-366369471198', 'User-b03917db', 'dsa', '2024-07-30 15:51:32'),
	(16, '2d35a562-c69d-4ba2-bc82-366369471198', 'User-b03917db', 'asd', '2024-07-30 15:51:33'),
	(17, '2d35a562-c69d-4ba2-bc82-366369471198', 'User-e49a2095', 'asdsad', '2024-07-30 15:51:49'),
	(18, '2d35a562-c69d-4ba2-bc82-366369471198', 'User-90776c44', 'aedea', '2024-07-30 15:51:59'),
	(19, 'c798cdf0-9c9c-4a09-8d9a-055b5739d1c4', 'User-d53e0d91', 'asd', '2024-07-30 15:59:47'),
	(20, 'c798cdf0-9c9c-4a09-8d9a-055b5739d1c4', 'User-7b5998bc', 'asd', '2024-07-30 16:00:23'),
	(21, 'c798cdf0-9c9c-4a09-8d9a-055b5739d1c4', 'User-7b5998bc', 'dsa', '2024-07-30 16:00:24'),
	(22, 'c798cdf0-9c9c-4a09-8d9a-055b5739d1c4', 'User-1f16df4a', 'dsa', '2024-07-30 16:00:40'),
	(23, 'c798cdf0-9c9c-4a09-8d9a-055b5739d1c4', 'User-14501a5c', 'asd', '2024-07-30 16:03:29'),
	(24, 'c798cdf0-9c9c-4a09-8d9a-055b5739d1c4', 'rattanan2006s@gmail.com', 'dsa', '2024-07-30 16:08:08'),
	(25, 'c798cdf0-9c9c-4a09-8d9a-055b5739d1c4', 'rattanan2006s@gmail.com', 'asd', '2024-07-30 16:08:09'),
	(26, 'c798cdf0-9c9c-4a09-8d9a-055b5739d1c4', 'rattanan2006s@gmail.com', 'asd', '2024-07-30 16:08:33'),
	(27, 'e75c94d2-a2c9-4b19-ae70-e0e09be39174', 'rattanan2006s@gmail.com', 'asd', '2024-08-02 17:02:20'),
	(28, 'e75c94d2-a2c9-4b19-ae70-e0e09be39174', 'rattanan2006s@gmail.com', 'asd', '2024-08-02 17:04:09'),
	(29, 'e75c94d2-a2c9-4b19-ae70-e0e09be39174', 'rattanan2006s@gmail.com', 'Hello', '2024-08-02 17:04:11'),
	(30, 'e75c94d2-a2c9-4b19-ae70-e0e09be39174', 'rattanan2006s@gmail.com', 'asd', '2024-08-02 17:04:42'),
	(31, 'e75c94d2-a2c9-4b19-ae70-e0e09be39174', 'rattanan2006s@gmail.com', 'asd', '2024-08-02 17:04:56'),
	(32, 'e75c94d2-a2c9-4b19-ae70-e0e09be39174', 'rattanan2006s@gmail.com', 'dsa', '2024-08-02 17:04:57'),
	(33, '03fda603-eaaf-4c40-8575-2b19bd4372d8', 'rattanan2006s@gmail.com', 'dsa', '2024-08-02 17:17:40'),
	(34, '03fda603-eaaf-4c40-8575-2b19bd4372d8', 'rattanan2006s@gmail.com', 'hello', '2024-08-02 17:17:43'),
	(35, '03fda603-eaaf-4c40-8575-2b19bd4372d8', 'rattanan2006s@gmail.com', 'Hi', '2024-08-02 17:17:44'),
	(36, 'c36dcfe9-4c43-4fc2-81e8-a8adcdb1a8af', 'rattanan2006s@gmail.com', 'Hello', '2024-08-02 17:20:01'),
	(37, 'c36dcfe9-4c43-4fc2-81e8-a8adcdb1a8af', 'rattanan2006s@gmail.com', 'Hi', '2024-08-02 17:20:03'),
	(38, '64ddc49e-98f3-421a-8c40-461bebc7a9e1', 'rattanan2006s@gmail.com', 'das', '2024-08-03 07:25:11'),
	(39, '64ddc49e-98f3-421a-8c40-461bebc7a9e1', 'rattanan2006s@gmail.com', 'hge', '2024-08-03 07:25:12'),
	(40, 'c0aded64-1d7d-4a5a-9218-174c1bdac66b', 'rattanan2006s@gmail.com', 'Hello', '2024-08-03 13:10:44');

-- Dumping structure for table next-js-registration-login-example.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `image` text NOT NULL,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table next-js-registration-login-example.posts: ~5 rows (approximately)
INSERT INTO `posts` (`id`, `user_id`, `title`, `content`, `image`, `type`) VALUES
	(50, 'rattanan2006s@gmail.com', 'dsa2asd2', 'Csa2awe2', 'https://utfs.io/f/a29a79b4-e3a2-439a-a976-a65c846d6d0d-xl3rkp.jpg', 'Buyer'),
	(51, 'rattanan2006s@gmail.com', 'dsa2asd2', 'Csa2awe2', 'https://utfs.io/f/a29a79b4-e3a2-439a-a976-a65c846d6d0d-xl3rkp.jpg', 'Buyer'),
	(52, 'rattanan2006s@gmail.com', 'dsa2asd2', 'Csa2awe2', 'https://utfs.io/f/a29a79b4-e3a2-439a-a976-a65c846d6d0d-xl3rkp.jpg', 'Seller'),
	(53, 'rattanan2006s@gmail.com', 'dsacv2', '12c4e1231', 'https://utfs.io/f/ad6e301e-f7bb-4269-ab61-c3c8a014c63e-m4v0xo.jpg', 'Buyer'),
	(54, 'rattanan2006s@gmail.com', 'cda21xc', '3e12cx3e21ceszc2ac', 'https://utfs.io/f/c8832219-eef0-4dbe-a131-e79da1dbc9f0-cmnnru.png', 'Seller');

-- Dumping structure for table next-js-registration-login-example.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `sessionToken` varchar(255) NOT NULL,
  `expires` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sessionToken` (`sessionToken`),
  KEY `userId` (`userId`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table next-js-registration-login-example.sessions: ~0 rows (approximately)

-- Dumping structure for table next-js-registration-login-example.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table next-js-registration-login-example.users: ~4 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`) VALUES
	(1, 'kenkenedy', 'rattanan2006s@gmail.com'),
	(2, 'Anonymous', 'karn.yong@melivecode.com'),
	(3, 'Asdasd', 'Dasdasd'),
	(4, 'abc', 'def');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
