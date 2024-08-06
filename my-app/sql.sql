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
  `owner` varchar(255) NOT NULL,
  `contacter` varchar(255) NOT NULL,
  `blogId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table next-js-registration-login-example.messages: ~0 rows (approximately)
INSERT INTO `messages` (`id`, `chatId`, `owner`, `contacter`, `blogId`, `username`, `message`, `timestamp`) VALUES
	(72, '1a4cb098-0bb4-442e-8bf5-108a49512dfd', 'rattanan2006s@gmail.com', 'dkzkai12@gmail.com', 56, 'dkzkai12@gmail.com', 'ทักครับสนใจครับ', '2024-08-06 15:07:05'),
	(73, '1a4cb098-0bb4-442e-8bf5-108a49512dfd', 'rattanan2006s@gmail.com', 'rattanan2006s@gmail.com', 56, 'rattanan2006s@gmail.com', 'Hello', '2024-08-06 15:46:22'),
	(74, '1a4cb098-0bb4-442e-8bf5-108a49512dfd', 'rattanan2006s@gmail.com', 'rattanan2006s@gmail.com', 56, 'rattanan2006s@gmail.com', 'ฉันต้องการคุณ', '2024-08-06 15:46:29'),
	(75, '1a4cb098-0bb4-442e-8bf5-108a49512dfd', 'rattanan2006s@gmail.com', 'rattanan2006s@gmail.com', 56, 'rattanan2006s@gmail.com', 'ปีศาจ', '2024-08-06 15:46:34'),
	(76, '1a4cb098-0bb4-442e-8bf5-108a49512dfd', 'rattanan2006s@gmail.com', 'rattanan2006s@gmail.com', 56, 'rattanan2006s@gmail.com', 'dog', '2024-08-06 15:46:47'),
	(77, '1a4cb098-0bb4-442e-8bf5-108a49512dfd', 'rattanan2006s@gmail.com', 'rattanan2006s@gmail.com', 56, 'rattanan2006s@gmail.com', 'โลก', '2024-08-06 15:46:56'),
	(78, '576920c4-196d-4762-aef9-8e6b35890948', 'rattanan2006s@gmail.com', 'rattanan2006s@gmail.com', 56, 'rattanan2006s@gmail.com', 'Helloasdasdas', '2024-08-06 16:07:55'),
	(79, '576920c4-196d-4762-aef9-8e6b35890948', 'rattanan2006s@gmail.com', 'rattanan2006s@gmail.com', 56, 'rattanan2006s@gmail.com', 'dasdasdasdsad', '2024-08-06 16:07:56'),
	(80, '576920c4-196d-4762-aef9-8e6b35890948', 'rattanan2006s@gmail.com', 'rattanan2006s@gmail.com', 56, 'rattanan2006s@gmail.com', 'sadas', '2024-08-06 16:07:57');

-- Dumping structure for table next-js-registration-login-example.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `image` text NOT NULL,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table next-js-registration-login-example.posts: ~2 rows (approximately)
INSERT INTO `posts` (`id`, `user_id`, `title`, `content`, `image`, `type`) VALUES
	(55, 'dkzkai12@gmail.com', 'รับตอกโหดๆปลาหมอคางดำยังกลัวเพราะพี่มาราคา 50 ทรู', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus id voluptates atque, magni cum saepe possimus! Cupiditate quos magnam, dicta, accusamus nisi vitae sunt rem amet quam optio sint beatae!', 'https://utfs.io/f/aa7d671e-f1cd-48e5-aeda-f6ed50ac3257-rvb169.png', 'Seller'),
	(56, 'rattanan2006s@gmail.com', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus id voluptates atque, magni cum saepe possimus! Cupiditate quos magnam, dicta, accusamus nisi vitae sunt rem amet quam optio sint beatae!', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus id voluptates atque, magni cum saepe possimus! Cupiditate quos magnam, dicta, accusamus nisi vitae sunt rem amet quam optio sint beatae!', 'https://utfs.io/f/21da8765-821a-40dd-924b-40140524fd4d-2uska6.jpg', 'Buyer');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table next-js-registration-login-example.users: ~5 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`) VALUES
	(1, 'kenkenedy', 'rattanan2006s@gmail.com'),
	(2, 'Anonymous', 'karn.yong@melivecode.com'),
	(3, 'Asdasd', 'Dasdasd'),
	(4, 'abc', 'def'),
	(5, 'kenniethedestroyer', 'dkzkai12@gmail.com');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
