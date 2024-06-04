-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 15, 2024 at 12:53 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mart_ultimate`
--

-- --------------------------------------------------------

--
-- Table structure for table `business`
--

DROP TABLE IF EXISTS `business`;
CREATE TABLE IF NOT EXISTS `business` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `location` int(11) NOT NULL,
  `profile` int(11) NOT NULL,
  `year_established` int(11) NOT NULL,
  `phone` varchar(40) NOT NULL,
  `email` varchar(80) NOT NULL,
  `web_url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `business`
--

INSERT INTO `business` (`id`, `name`, `location`, `profile`, `year_established`, `phone`, `email`, `web_url`) VALUES
(1, 'Cloudsync Enterprise', 1, 1, 2015, '07069483199', 'info@cloudsync.com.ng', 'www.cloudsync.com.ng'),
(2, 'Martultimate', 2, 1, 2024, '08069453435', 'mail.martultimate@gmail.com', 'martultimate.com'),
(3, 'Eva\'s Ville', 2, 2, 2019, '07089584635', 'eva@gmail.com', 'ww.evavee.com');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `description`) VALUES
(1, 'Automobiles', 'Cars, Tricycles, Bicycle'),
(2, 'Fashion', 'Expressive, stylish, evolving, diverse, innovative, personal, cultural, transformative, trendy, timeless.'),
(3, 'Manufacturing', 'Machinery, raw materials, tools, safety gear, automation software, spare parts, maintenance services, and equipment.'),
(4, 'Computers and IT', ' Laptops, desktops, servers, software, peripherals, networking gear, storage devices, and accessories.'),
(5, 'Agro-products', 'Seeds, fertilizers, pesticides, farming tools, irrigation systems, livestock feed, organic produce, and equipment'),
(6, 'Real Estate', 'Property listings, rental services, virtual tours, mortgage calculators, realty consultations, legal services, and investment opportunities'),
(7, 'Building Materials', 'Lumber, cement, steel, insulation, roofing, drywall, plumbing supplies, electrical components, flooring, and tools.'),
(8, 'Electrical Electronics', 'Circuit components, cables, connectors, batteries, appliances, gadgets, home automation systems, lighting fixtures, and electronic devices'),
(9, 'Tourism and Events', 'Flight tickets, hotel bookings, tour packages, event tickets, travel insurance, car rentals, excursions, and activity bookings.'),
(10, 'Education and Books', 'Textbooks, e-books, online courses, educational software, tutoring services, stationary, school supplies, and academic resources.'),
(11, 'Sports', 'Athletic apparel, equipment, footwear, accessories, gym memberships, fitness trackers, sports nutrition supplements, and online coaching services');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `phone` varchar(40) NOT NULL,
  `location` int(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `email`, `phone`, `location`, `gender`, `age`) VALUES
(1, 'Bethany Mani', 'betty123@gmail.com', '070342534253', 2, '2', 2),
(2, 'Adele Mani', 'yeinaan@gmail.com', '08036181253', 2, '2', 3);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `name`) VALUES
(1, 'Lagos'),
(2, 'Jos, Nigeria'),
(3, 'Kano');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subcategory` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` text NOT NULL,
  `business` int(11) NOT NULL,
  `price` double NOT NULL,
  `product_type` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `subcategory`, `name`, `description`, `business`, `price`, `product_type`) VALUES
(1, 2, 'NPK', 'Good for you', 1, 35000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
CREATE TABLE IF NOT EXISTS `product_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_type`
--

INSERT INTO `product_type` (`id`, `name`) VALUES
(1, 'Product'),
(2, 'Services');

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
CREATE TABLE IF NOT EXISTS `subcategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`id`, `category`, `name`, `description`) VALUES
(1, 5, 'Seeds', 'Varied selection of plant seeds for agricultural purposes, including vegetables, fruits, grains, and flowers, enabling farmers to cultivate diverse crops'),
(2, 5, 'Fertilizers', 'Nutrient-rich substances applied to soil or plants to enhance growth and yield, providing essential elements such as nitrogen, phosphorus, and potassium for healthy crop development.'),
(3, 5, 'Pesticides', 'Chemical or biological agents used to control pests, weeds, and diseases in crops, safeguarding agricultural productivity and ensuring high-quality yields.'),
(4, 1, 'Automobiles', 'Passenger vehicles designed for personal transportation, ranging from compact cars to SUVs and luxury sedans, offering convenience and mobility for individuals and families'),
(5, 1, 'Car Care Products', 'Cleaning and maintenance supplies for automobiles, such as car wax, polish, interior cleaners, tire shine, and detailing tools, preserving the appearance and longevity of vehicles while enhancing their aesthetic appeal'),
(6, 7, 'Lumber', 'Various types of wood used in construction projects, including framing lumber, plywood, and hardwoods, providing structural support and aesthetic appeal for buildings and structures'),
(7, 7, 'Concrete', 'Versatile building material composed of cement, aggregate, and water, used in foundations, walls, floors, and sidewalks, offering durability, strength, and versatility in construction applications');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
