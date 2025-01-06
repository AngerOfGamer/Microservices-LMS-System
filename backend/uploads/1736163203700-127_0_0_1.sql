-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2025 at 06:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_test`
--
CREATE DATABASE IF NOT EXISTS `api_test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `api_test`;

-- --------------------------------------------------------

--
-- Table structure for table `programming_languages`
--

CREATE TABLE `programming_languages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `released_year` int(11) NOT NULL,
  `githut_rank` int(11) DEFAULT NULL,
  `pypl_rank` int(11) DEFAULT NULL,
  `tiobe_rank` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `programming_languages`
--

INSERT INTO `programming_languages` (`id`, `name`, `released_year`, `githut_rank`, `pypl_rank`, `tiobe_rank`, `created_at`, `updated_at`) VALUES
(1, 'JavaScript', 1995, 1, 3, 7, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(2, 'Python', 1991, 2, 1, 3, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(3, 'Java', 1995, 3, 2, 2, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(4, 'TypeScript', 2012, 7, 10, 42, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(5, 'C#', 2000, 9, 4, 5, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(6, 'PHP', 1995, 8, 6, 8, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(7, 'C++', 1985, 5, 5, 4, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(8, 'C', 1972, 10, 5, 1, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(9, 'Ruby', 1995, 6, 15, 15, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(10, 'R', 1993, 33, 7, 9, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(11, 'Objective-C', 1984, 18, 8, 18, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(12, 'Swift', 2015, 16, 9, 13, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(13, 'Kotlin', 2011, 15, 12, 40, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(14, 'Go', 2009, 4, 13, 14, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(15, 'Rust', 2010, 14, 16, 26, '2024-03-21 10:08:31', '2024-03-21 10:08:31'),
(16, 'Scala', 2004, 11, 17, 34, '2024-03-21 10:08:31', '2024-03-21 10:08:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `programming_languages`
--
ALTER TABLE `programming_languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_name_unique` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `programming_languages`
--
ALTER TABLE `programming_languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- Database: `hotel`
--
CREATE DATABASE IF NOT EXISTS `hotel` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `hotel`;

-- --------------------------------------------------------

--
-- Table structure for table `booking_room`
--

CREATE TABLE `booking_room` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `room_number` varchar(100) DEFAULT NULL,
  `check_in_date` date DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_room`
--

INSERT INTO `booking_room` (`id`, `customer_name`, `room_number`, `check_in_date`, `price`) VALUES
(1, 'vina', '2', '2024-04-10', 3.00),
(2, 'junia', '3', '2024-04-09', 40.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking_room`
--
ALTER TABLE `booking_room`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking_room`
--
ALTER TABLE `booking_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Database: `lms_database`
--
CREATE DATABASE IF NOT EXISTS `lms_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `lms_database`;

-- --------------------------------------------------------

--
-- Table structure for table `absensi`
--

CREATE TABLE `absensi` (
  `absensi_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `status` enum('hadir','tidak hadir') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `absensi`
--

INSERT INTO `absensi` (`absensi_id`, `class_id`, `user_id`, `date`, `status`, `created_at`) VALUES
(1, 1, 1, '2025-01-05', 'hadir', '2025-01-05 14:57:37'),
(2, 1, 4, '2025-01-05', 'hadir', '2025-01-05 14:57:37'),
(3, 1, 1, '2025-01-06', 'hadir', '2025-01-05 16:56:52');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `class_id` int(11) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`class_id`, `class_name`, `description`, `created_at`) VALUES
(1, 'matematika', NULL, '2025-01-05 06:44:00'),
(2, 'Database', 'database', '2025-01-05 08:24:02');

-- --------------------------------------------------------

--
-- Table structure for table `class_members`
--

CREATE TABLE `class_members` (
  `class_member_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `role` enum('dosen','mahasiswa') NOT NULL,
  `joined_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_members`
--

INSERT INTO `class_members` (`class_member_id`, `user_id`, `class_id`, `role`, `joined_at`) VALUES
(2, 1, 1, 'mahasiswa', '2025-01-05 06:44:26'),
(3, 3, 1, 'dosen', '2025-01-05 06:44:51'),
(4, 4, 1, 'mahasiswa', '2025-01-05 06:45:10'),
(5, 1, 2, 'mahasiswa', '2025-01-05 08:24:02'),
(6, 3, 2, 'dosen', '2025-01-05 08:24:02'),
(7, 4, 2, 'mahasiswa', '2025-01-05 08:24:02'),
(8, 20, 2, 'mahasiswa', '2025-01-05 08:24:02'),
(9, 21, 2, 'mahasiswa', '2025-01-05 08:24:02');

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `content_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `content_title` varchar(100) NOT NULL,
  `content_description` text DEFAULT NULL,
  `content_url` varchar(255) DEFAULT NULL,
  `category` enum('materi','tugas') NOT NULL DEFAULT 'materi',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`content_id`, `class_id`, `content_title`, `content_description`, `content_url`, `category`, `created_by`, `created_at`) VALUES
(1, 1, 'modul 1', 'modul 1', NULL, 'materi', 2, '2025-01-05 14:00:54'),
(2, 1, 'modul 1', 'modul 1', NULL, 'tugas', 2, '2025-01-05 14:01:06'),
(3, 1, 'Modul 3', 'tiga', '/uploads/1736086150697-#Paddy.jpg', 'tugas', 2, '2025-01-05 14:09:10'),
(4, 1, 'modul 4', 'empat', '/uploads/1736086411235-36-Article Text-121-1-10-20190408.pdf', 'materi', 2, '2025-01-05 14:13:31'),
(5, 1, 'modul 5', '', '/uploads/1736095879057-lms_database (1).sql', 'tugas', 2, '2025-01-05 16:51:19');

-- --------------------------------------------------------

--
-- Table structure for table `nilai`
--

CREATE TABLE `nilai` (
  `nilai_id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `grade` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nilai`
--

INSERT INTO `nilai` (`nilai_id`, `submission_id`, `grade`, `created_at`) VALUES
(1, 3, 80.00, '2025-01-05 16:11:12');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `submission_id` int(11) NOT NULL,
  `task_title` varchar(100) NOT NULL,
  `class_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `submission_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`submission_id`, `task_title`, `class_id`, `user_id`, `submission_date`, `submission_url`) VALUES
(3, 'task', 1, 1, '2025-01-05 15:57:52', '/uploads/1736092672646-9.+Desmawan+et+al.pdf'),
(4, 'task', 1, 1, '2025-01-05 16:10:39', '/uploads/1736093439763-9.+Desmawan+et+al.pdf'),
(5, 'task', 1, 1, '2025-01-05 16:15:27', '/uploads/1736093727539-1058-Article Text-2987-1-10-20221109.pdf'),
(6, 'tugas 1', 1, 1, '2025-01-05 16:51:52', '/uploads/1736095912668-lms_database (1).sql'),
(7, 'task', 1, 1, '2025-01-05 17:25:50', '/uploads/1736097950827-9.+Desmawan+et+al.pdf'),
(8, 'task', 1, 1, '2025-01-05 17:25:52', '/uploads/1736097952708-9.+Desmawan+et+al.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `nip_nim` varchar(255) NOT NULL,
  `role` enum('admin','dosen','mahasiswa') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `nip_nim`, `role`, `created_at`) VALUES
(1, 'vinagunawan', '42130102', 'mahasiswa', '2025-01-04 13:32:33'),
(2, 'indra', '12345678', 'admin', '2025-01-05 06:04:04'),
(3, 'Ary', '34562782', 'dosen', '2025-01-05 06:39:35'),
(4, 'Melsy', '421313246', 'mahasiswa', '2025-01-05 06:39:56'),
(20, 'Roger', '420568373', 'mahasiswa', '2025-01-05 06:42:43'),
(21, 'Rafael', '421345352', 'mahasiswa', '2025-01-05 06:43:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absensi`
--
ALTER TABLE `absensi`
  ADD PRIMARY KEY (`absensi_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `class_members`
--
ALTER TABLE `class_members`
  ADD PRIMARY KEY (`class_member_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`content_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `nilai`
--
ALTER TABLE `nilai`
  ADD PRIMARY KEY (`nilai_id`),
  ADD KEY `submission_id` (`submission_id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`submission_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `nip_nim` (`nip_nim`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absensi`
--
ALTER TABLE `absensi`
  MODIFY `absensi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `class_members`
--
ALTER TABLE `class_members`
  MODIFY `class_member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `content_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `nilai`
--
ALTER TABLE `nilai`
  MODIFY `nilai_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absensi`
--
ALTER TABLE `absensi`
  ADD CONSTRAINT `absensi_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `absensi_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `class_members`
--
ALTER TABLE `class_members`
  ADD CONSTRAINT `class_members_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_members_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE;

--
-- Constraints for table `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `content_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `content_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `nilai`
--
ALTER TABLE `nilai`
  ADD CONSTRAINT `nilai_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`submission_id`) ON DELETE CASCADE;

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
--
-- Database: `penyakit-padi`
--
CREATE DATABASE IF NOT EXISTS `penyakit-padi` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `penyakit-padi`;

-- --------------------------------------------------------

--
-- Table structure for table `penyakit_padi`
--

CREATE TABLE `penyakit_padi` (
  `id_penyakit` int(11) NOT NULL,
  `nama_penyakit` varchar(100) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `penanganan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penyakit_padi`
--

INSERT INTO `penyakit_padi` (`id_penyakit`, `nama_penyakit`, `deskripsi`, `penanganan`, `created_at`, `updated_at`) VALUES
(1, 'Blight', 'Blight pada tanaman padi adalah penyakit yang disebabkan oleh beberapa jenis jamur patogen, terutama dari kelompok Pyricularia oryzae, yang sering dikenal dengan nama rice blast. Penyakit ini sangat berbahaya bagi tanaman padi karena dapat menyebabkan kerusakan parah pada daun, batang, dan butir padi. ', 'Penggunaan Varietas Padi Tahan Penyakit:\r\n\r\nMenanam varietas padi yang tahan terhadap Pyricularia oryzae dapat mengurangi risiko terjadinya penyakit blight. Pilihlah varietas padi yang telah teruji ketahanannya terhadap serangan penyakit ini.\r\nPengelolaan Irigasi:\r\n\r\nPengelolaan irigasi yang baik dapat membantu mencegah perkembangan penyakit blight. Hindari penggenangan air berlebihan pada lahan padi, karena kondisi lembap mendukung pertumbuhan jamur penyebab blight.\r\nRotasi Tanaman:\r\n\r\nMelakukan rotasi tanaman dengan tanaman non-padi yang tidak menjadi inang jamur Pyricularia oryzae bisa mengurangi keberadaan jamur di tanah. Hal ini dapat membantu mengurangi infeksi pada musim tanam berikutnya.\r\nPenggunaan Fungisida:\r\n\r\nMenggunakan fungisida yang efektif terhadap jamur penyebab blight, seperti fungisida berbasis propiconazole atau azoxystrobin, dapat membantu mengendalikan infeksi. Namun, penting untuk mengikuti aturan aplikasi yang benar dan tidak mengandalkan penggunaan fungisida secara berlebihan.\r\nPemangkasan Daun Terinfeksi:\r\n\r\nJika tanaman padi sudah terinfeksi, segera pangkas dan buang daun atau batang yang terinfeksi untuk mengurangi penyebaran penyakit.\r\nPembersihan Alat dan Perlengkapan:\r\n\r\nPastikan alat pertanian seperti cangkul, parang, atau mesin pemanen selalu dibersihkan setelah digunakan, untuk mencegah penyebaran spora jamur ke tanaman lain.\r\nPengelolaan Sampah Organik:\r\n\r\nHancurkan atau buang sampah tanaman padi yang sudah terinfeksi agar tidak menjadi sumber infeksi pada musim tanam berikutnya.', '2024-12-06 10:07:56', '2024-12-06 10:08:30'),
(2, 'Blast', 'Penyakit Blast pada Padi disebabkan oleh jamur Pyricularia oryzae, yang sering disebut sebagai penyebab utama penyakit Rice Blast. Penyakit ini merupakan salah satu penyakit paling merusak pada tanaman padi, dapat menyerang seluruh bagian tanaman mulai dari daun, batang, hingga bulir padi.', 'Pemilihan Varietas Tahan:\r\n\r\nSalah satu cara pencegahan yang efektif adalah menanam varietas padi yang tahan terhadap penyakit blast. Varietas padi seperti IR64 dan Japonica diketahui lebih tahan terhadap serangan Pyricularia oryzae.\r\nPenggunaan Benih yang Sehat:\r\n\r\nGunakan benih padi yang bebas dari penyakit dan spora jamur untuk mencegah penyebaran penyakit pada tanaman baru.\r\nPengelolaan Irigasi yang Baik:\r\n\r\nMenghindari penggenangan air yang berlebihan dapat mengurangi kelembapan tanah dan udara di sekitar tanaman, yang dapat menghambat pertumbuhan spora jamur. Pengelolaan irigasi yang baik sangat penting untuk mencegah infeksi.\r\nPenyemprotan Fungisida:\r\n\r\nFungisida yang berbahan aktif seperti Tricyclazole, Azoxystrobin, atau Mancozeb bisa efektif dalam mengendalikan penyakit blast. Penyemprotan fungisida dilakukan pada fase kritis tanaman (seperti fase pembentukan malai dan pembungaan) untuk mencegah infeksi lebih lanjut.\r\nPemangkasan Daun dan Batang yang Terinfeksi:\r\n\r\nSegera pangkas dan buang bagian tanaman yang sudah terinfeksi untuk mencegah penyebaran penyakit ke tanaman sehat lainnya.\r\nRotasi Tanaman:\r\n\r\nRotasi tanaman dengan tanaman selain padi (misalnya jagung atau kedelai) dapat mengurangi akumulasi patogen di dalam tanah dan menghambat siklus hidup jamur penyebab blast.\r\nPengendalian Gulma:\r\n\r\nGulma yang tumbuh di sekitar tanaman padi juga dapat menjadi sumber penyakit. Oleh karena itu, pengendalian gulma yang baik dapat mengurangi kemungkinan penyebaran penyakit.\r\nPengelolaan Sampah Tanaman:\r\n\r\nPastikan untuk membersihkan sisa-sisa tanaman padi yang terinfeksi dan tidak membiarkan sisa tanaman tergeletak di ladang karena dapat menjadi sumber spora jamur yang menginfeksi tanaman padi pada musim berikutnya.', '2024-12-06 10:09:06', '2024-12-06 10:10:03'),
(3, 'Tungro', 'Penyakit Tungro pada Padi adalah penyakit yang disebabkan oleh dua virus utama, yaitu Rice Tungro Bacilliform Virus (RTBV) dan Rice Tungro Spherical Virus (RTSV). Penyakit ini sering menyerang tanaman padi pada berbagai tahap pertumbuhan, terutama pada saat tanaman masih muda. Tungro dapat mengurangi hasil panen secara signifikan dan menyebar dengan cepat, terutama melalui vektor berupa serangga penghisap seperti Bemisia tabaci (kutu putih) dan Nephotettix virescens (kutu daun).', 'Pengendalian Vektor (Serangga):\r\n\r\nSalah satu cara terbaik untuk mengendalikan penyakit tungro adalah dengan mengendalikan serangga vektor yang menyebarkan virus. Gunakan insektisida berbahan aktif seperti Imidacloprid atau Thiamethoxam untuk membunuh kutu daun dan kutu putih.\r\nLakukan penyemprotan insektisida pada waktu yang tepat, terutama pada musim hujan, untuk mencegah penyebaran virus.\r\nPenggunaan Varietas Tahan Tungro:\r\n\r\nMenanam varietas padi yang tahan terhadap virus tungro sangat efektif dalam mencegah infeksi. Varietas-varietas ini memiliki ketahanan alami terhadap kedua jenis virus yang menyebabkan penyakit tungro.\r\nBeberapa varietas yang tahan terhadap tungro antara lain IR64 dan IR72, yang dapat mengurangi kerusakan akibat infeksi virus.\r\nPengendalian Gulma:\r\n\r\nGulma sering menjadi tempat berkembang biak bagi serangga vektor yang membawa virus. Pengendalian gulma yang efektif akan mengurangi tempat persembunyian bagi serangga penghisap, yang mengurangi kemungkinan penyebaran virus.\r\nPengaturan Waktu Tanam yang Tepat:\r\n\r\nTanam padi pada waktu yang tepat, sehingga tanaman tidak berada pada fase rentan selama musim hujan, ketika kutu daun lebih aktif. Mengatur waktu tanam bisa membantu menghindari serangan besar dari serangga vektor.\r\nPenyemprotan Insektisida:\r\n\r\nPenyemprotan insektisida berbasis sistemik dapat membantu mengurangi jumlah kutu yang menghisap cairan tanaman. Penggunaan insektisida berbahan aktif seperti Imidacloprid, Dimethoate, atau Thiamethoxam efektif dalam mengendalikan kutu daun dan kutu putih.\r\nRotasi Tanaman:\r\n\r\nMenggunakan rotasi tanaman dengan tanaman yang bukan inang virus (seperti jagung atau kedelai) dapat mengurangi keberadaan virus di lahan dan menurunkan kemungkinan infeksi pada tanaman padi.\r\nPemusnahan Tanaman Terinfeksi:\r\n\r\nTanaman yang sudah terinfeksi penyakit tungro harus segera dimusnahkan untuk mencegah penyebaran virus lebih lanjut ke tanaman lain. Jangan biarkan tanaman yang terinfeksi berada di lahan terlalu lama.\r\nMenjaga Kebersihan Alat Pertanian:\r\n\r\nPastikan alat pertanian yang digunakan (seperti mesin pemotong padi atau cangkul) selalu dibersihkan untuk mencegah penyebaran virus dari tanaman terinfeksi ke tanaman sehat.', '2024-12-06 10:10:18', '2024-12-06 10:10:41');

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_prediksi`
--

CREATE TABLE `riwayat_prediksi` (
  `id_prediksi` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_penyakit` int(11) DEFAULT NULL,
  `image_path` varchar(255) NOT NULL,
  `hasil_prediksi` varchar(255) NOT NULL,
  `penanganan` text DEFAULT NULL,
  `tanggal_prediksi` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `riwayat_prediksi`
--

INSERT INTO `riwayat_prediksi` (`id_prediksi`, `id_user`, `id_penyakit`, `image_path`, `hasil_prediksi`, `penanganan`, `tanggal_prediksi`) VALUES
(1, NULL, NULL, 'uploads\\1734449342655.jpg', 'blight', 'Penggunaan Varietas Padi Tahan Penyakit:\r\n\r\nMenanam varietas padi yang tahan terhadap Pyricularia oryzae dapat mengurangi risiko terjadinya penyakit blight. Pilihlah varietas padi yang telah teruji ketahanannya terhadap serangan penyakit ini.\r\nPengelolaan Irigasi:\r\n\r\nPengelolaan irigasi yang baik dapat membantu mencegah perkembangan penyakit blight. Hindari penggenangan air berlebihan pada lahan padi, karena kondisi lembap mendukung pertumbuhan jamur penyebab blight.\r\nRotasi Tanaman:\r\n\r\nMelakukan rotasi tanaman dengan tanaman non-padi yang tidak menjadi inang jamur Pyricularia oryzae bisa mengurangi keberadaan jamur di tanah. Hal ini dapat membantu mengurangi infeksi pada musim tanam berikutnya.\r\nPenggunaan Fungisida:\r\n\r\nMenggunakan fungisida yang efektif terhadap jamur penyebab blight, seperti fungisida berbasis propiconazole atau azoxystrobin, dapat membantu mengendalikan infeksi. Namun, penting untuk mengikuti aturan aplikasi yang benar dan tidak mengandalkan penggunaan fungisida secara berlebihan.\r\nPemangkasan Daun Terinfeksi:\r\n\r\nJika tanaman padi sudah terinfeksi, segera pangkas dan buang daun atau batang yang terinfeksi untuk mengurangi penyebaran penyakit.\r\nPembersihan Alat dan Perlengkapan:\r\n\r\nPastikan alat pertanian seperti cangkul, parang, atau mesin pemanen selalu dibersihkan setelah digunakan, untuk mencegah penyebaran spora jamur ke tanaman lain.\r\nPengelolaan Sampah Organik:\r\n\r\nHancurkan atau buang sampah tanaman padi yang sudah terinfeksi agar tidak menjadi sumber infeksi pada musim tanam berikutnya.', '2024-12-17 15:29:02'),
(4, 5, NULL, 'uploads\\1735186434029.jpg', 'blight', 'Penggunaan Varietas Padi Tahan Penyakit:\r\n\r\nMenanam varietas padi yang tahan terhadap Pyricularia oryzae dapat mengurangi risiko terjadinya penyakit blight. Pilihlah varietas padi yang telah teruji ketahanannya terhadap serangan penyakit ini.\r\nPengelolaan Irigasi:\r\n\r\nPengelolaan irigasi yang baik dapat membantu mencegah perkembangan penyakit blight. Hindari penggenangan air berlebihan pada lahan padi, karena kondisi lembap mendukung pertumbuhan jamur penyebab blight.\r\nRotasi Tanaman:\r\n\r\nMelakukan rotasi tanaman dengan tanaman non-padi yang tidak menjadi inang jamur Pyricularia oryzae bisa mengurangi keberadaan jamur di tanah. Hal ini dapat membantu mengurangi infeksi pada musim tanam berikutnya.\r\nPenggunaan Fungisida:\r\n\r\nMenggunakan fungisida yang efektif terhadap jamur penyebab blight, seperti fungisida berbasis propiconazole atau azoxystrobin, dapat membantu mengendalikan infeksi. Namun, penting untuk mengikuti aturan aplikasi yang benar dan tidak mengandalkan penggunaan fungisida secara berlebihan.\r\nPemangkasan Daun Terinfeksi:\r\n\r\nJika tanaman padi sudah terinfeksi, segera pangkas dan buang daun atau batang yang terinfeksi untuk mengurangi penyebaran penyakit.\r\nPembersihan Alat dan Perlengkapan:\r\n\r\nPastikan alat pertanian seperti cangkul, parang, atau mesin pemanen selalu dibersihkan setelah digunakan, untuk mencegah penyebaran spora jamur ke tanaman lain.\r\nPengelolaan Sampah Organik:\r\n\r\nHancurkan atau buang sampah tanaman padi yang sudah terinfeksi agar tidak menjadi sumber infeksi pada musim tanam berikutnya.', '2024-12-26 04:13:54'),
(5, 5, 1, 'uploads\\1735191551792.jpg', 'blight', 'Penggunaan Varietas Padi Tahan Penyakit:\r\n\r\nMenanam varietas padi yang tahan terhadap Pyricularia oryzae dapat mengurangi risiko terjadinya penyakit blight. Pilihlah varietas padi yang telah teruji ketahanannya terhadap serangan penyakit ini.\r\nPengelolaan Irigasi:\r\n\r\nPengelolaan irigasi yang baik dapat membantu mencegah perkembangan penyakit blight. Hindari penggenangan air berlebihan pada lahan padi, karena kondisi lembap mendukung pertumbuhan jamur penyebab blight.\r\nRotasi Tanaman:\r\n\r\nMelakukan rotasi tanaman dengan tanaman non-padi yang tidak menjadi inang jamur Pyricularia oryzae bisa mengurangi keberadaan jamur di tanah. Hal ini dapat membantu mengurangi infeksi pada musim tanam berikutnya.\r\nPenggunaan Fungisida:\r\n\r\nMenggunakan fungisida yang efektif terhadap jamur penyebab blight, seperti fungisida berbasis propiconazole atau azoxystrobin, dapat membantu mengendalikan infeksi. Namun, penting untuk mengikuti aturan aplikasi yang benar dan tidak mengandalkan penggunaan fungisida secara berlebihan.\r\nPemangkasan Daun Terinfeksi:\r\n\r\nJika tanaman padi sudah terinfeksi, segera pangkas dan buang daun atau batang yang terinfeksi untuk mengurangi penyebaran penyakit.\r\nPembersihan Alat dan Perlengkapan:\r\n\r\nPastikan alat pertanian seperti cangkul, parang, atau mesin pemanen selalu dibersihkan setelah digunakan, untuk mencegah penyebaran spora jamur ke tanaman lain.\r\nPengelolaan Sampah Organik:\r\n\r\nHancurkan atau buang sampah tanaman padi yang sudah terinfeksi agar tidak menjadi sumber infeksi pada musim tanam berikutnya.', '2024-12-26 05:39:12'),
(6, 2, 3, 'uploads\\1735216215038.jpg', 'tungro', 'Pengendalian Vektor (Serangga):\r\n\r\nSalah satu cara terbaik untuk mengendalikan penyakit tungro adalah dengan mengendalikan serangga vektor yang menyebarkan virus. Gunakan insektisida berbahan aktif seperti Imidacloprid atau Thiamethoxam untuk membunuh kutu daun dan kutu putih.\r\nLakukan penyemprotan insektisida pada waktu yang tepat, terutama pada musim hujan, untuk mencegah penyebaran virus.\r\nPenggunaan Varietas Tahan Tungro:\r\n\r\nMenanam varietas padi yang tahan terhadap virus tungro sangat efektif dalam mencegah infeksi. Varietas-varietas ini memiliki ketahanan alami terhadap kedua jenis virus yang menyebabkan penyakit tungro.\r\nBeberapa varietas yang tahan terhadap tungro antara lain IR64 dan IR72, yang dapat mengurangi kerusakan akibat infeksi virus.\r\nPengendalian Gulma:\r\n\r\nGulma sering menjadi tempat berkembang biak bagi serangga vektor yang membawa virus. Pengendalian gulma yang efektif akan mengurangi tempat persembunyian bagi serangga penghisap, yang mengurangi kemungkinan penyebaran virus.\r\nPengaturan Waktu Tanam yang Tepat:\r\n\r\nTanam padi pada waktu yang tepat, sehingga tanaman tidak berada pada fase rentan selama musim hujan, ketika kutu daun lebih aktif. Mengatur waktu tanam bisa membantu menghindari serangan besar dari serangga vektor.\r\nPenyemprotan Insektisida:\r\n\r\nPenyemprotan insektisida berbasis sistemik dapat membantu mengurangi jumlah kutu yang menghisap cairan tanaman. Penggunaan insektisida berbahan aktif seperti Imidacloprid, Dimethoate, atau Thiamethoxam efektif dalam mengendalikan kutu daun dan kutu putih.\r\nRotasi Tanaman:\r\n\r\nMenggunakan rotasi tanaman dengan tanaman yang bukan inang virus (seperti jagung atau kedelai) dapat mengurangi keberadaan virus di lahan dan menurunkan kemungkinan infeksi pada tanaman padi.\r\nPemusnahan Tanaman Terinfeksi:\r\n\r\nTanaman yang sudah terinfeksi penyakit tungro harus segera dimusnahkan untuk mencegah penyebaran virus lebih lanjut ke tanaman lain. Jangan biarkan tanaman yang terinfeksi berada di lahan terlalu lama.\r\nMenjaga Kebersihan Alat Pertanian:\r\n\r\nPastikan alat pertanian yang digunakan (seperti mesin pemotong padi atau cangkul) selalu dibersihkan untuk mencegah penyebaran virus dari tanaman terinfeksi ke tanaman sehat.', '2024-12-26 12:30:15'),
(7, 10, 1, 'uploads\\1735291619263.jpg', 'blight', 'Penggunaan Varietas Padi Tahan Penyakit:\r\n\r\nMenanam varietas padi yang tahan terhadap Pyricularia oryzae dapat mengurangi risiko terjadinya penyakit blight. Pilihlah varietas padi yang telah teruji ketahanannya terhadap serangan penyakit ini.\r\nPengelolaan Irigasi:\r\n\r\nPengelolaan irigasi yang baik dapat membantu mencegah perkembangan penyakit blight. Hindari penggenangan air berlebihan pada lahan padi, karena kondisi lembap mendukung pertumbuhan jamur penyebab blight.\r\nRotasi Tanaman:\r\n\r\nMelakukan rotasi tanaman dengan tanaman non-padi yang tidak menjadi inang jamur Pyricularia oryzae bisa mengurangi keberadaan jamur di tanah. Hal ini dapat membantu mengurangi infeksi pada musim tanam berikutnya.\r\nPenggunaan Fungisida:\r\n\r\nMenggunakan fungisida yang efektif terhadap jamur penyebab blight, seperti fungisida berbasis propiconazole atau azoxystrobin, dapat membantu mengendalikan infeksi. Namun, penting untuk mengikuti aturan aplikasi yang benar dan tidak mengandalkan penggunaan fungisida secara berlebihan.\r\nPemangkasan Daun Terinfeksi:\r\n\r\nJika tanaman padi sudah terinfeksi, segera pangkas dan buang daun atau batang yang terinfeksi untuk mengurangi penyebaran penyakit.\r\nPembersihan Alat dan Perlengkapan:\r\n\r\nPastikan alat pertanian seperti cangkul, parang, atau mesin pemanen selalu dibersihkan setelah digunakan, untuk mencegah penyebaran spora jamur ke tanaman lain.\r\nPengelolaan Sampah Organik:\r\n\r\nHancurkan atau buang sampah tanaman padi yang sudah terinfeksi agar tidak menjadi sumber infeksi pada musim tanam berikutnya.', '2024-12-27 09:26:59'),
(8, 10, 3, 'uploads\\1735291684778.jpg', 'tungro', 'Pengendalian Vektor (Serangga):\r\n\r\nSalah satu cara terbaik untuk mengendalikan penyakit tungro adalah dengan mengendalikan serangga vektor yang menyebarkan virus. Gunakan insektisida berbahan aktif seperti Imidacloprid atau Thiamethoxam untuk membunuh kutu daun dan kutu putih.\r\nLakukan penyemprotan insektisida pada waktu yang tepat, terutama pada musim hujan, untuk mencegah penyebaran virus.\r\nPenggunaan Varietas Tahan Tungro:\r\n\r\nMenanam varietas padi yang tahan terhadap virus tungro sangat efektif dalam mencegah infeksi. Varietas-varietas ini memiliki ketahanan alami terhadap kedua jenis virus yang menyebabkan penyakit tungro.\r\nBeberapa varietas yang tahan terhadap tungro antara lain IR64 dan IR72, yang dapat mengurangi kerusakan akibat infeksi virus.\r\nPengendalian Gulma:\r\n\r\nGulma sering menjadi tempat berkembang biak bagi serangga vektor yang membawa virus. Pengendalian gulma yang efektif akan mengurangi tempat persembunyian bagi serangga penghisap, yang mengurangi kemungkinan penyebaran virus.\r\nPengaturan Waktu Tanam yang Tepat:\r\n\r\nTanam padi pada waktu yang tepat, sehingga tanaman tidak berada pada fase rentan selama musim hujan, ketika kutu daun lebih aktif. Mengatur waktu tanam bisa membantu menghindari serangan besar dari serangga vektor.\r\nPenyemprotan Insektisida:\r\n\r\nPenyemprotan insektisida berbasis sistemik dapat membantu mengurangi jumlah kutu yang menghisap cairan tanaman. Penggunaan insektisida berbahan aktif seperti Imidacloprid, Dimethoate, atau Thiamethoxam efektif dalam mengendalikan kutu daun dan kutu putih.\r\nRotasi Tanaman:\r\n\r\nMenggunakan rotasi tanaman dengan tanaman yang bukan inang virus (seperti jagung atau kedelai) dapat mengurangi keberadaan virus di lahan dan menurunkan kemungkinan infeksi pada tanaman padi.\r\nPemusnahan Tanaman Terinfeksi:\r\n\r\nTanaman yang sudah terinfeksi penyakit tungro harus segera dimusnahkan untuk mencegah penyebaran virus lebih lanjut ke tanaman lain. Jangan biarkan tanaman yang terinfeksi berada di lahan terlalu lama.\r\nMenjaga Kebersihan Alat Pertanian:\r\n\r\nPastikan alat pertanian yang digunakan (seperti mesin pemotong padi atau cangkul) selalu dibersihkan untuk mencegah penyebaran virus dari tanaman terinfeksi ke tanaman sehat.', '2024-12-27 09:28:04'),
(9, 10, 2, 'uploads\\1735291711874.jpg', 'blast', 'Pemilihan Varietas Tahan:\r\n\r\nSalah satu cara pencegahan yang efektif adalah menanam varietas padi yang tahan terhadap penyakit blast. Varietas padi seperti IR64 dan Japonica diketahui lebih tahan terhadap serangan Pyricularia oryzae.\r\nPenggunaan Benih yang Sehat:\r\n\r\nGunakan benih padi yang bebas dari penyakit dan spora jamur untuk mencegah penyebaran penyakit pada tanaman baru.\r\nPengelolaan Irigasi yang Baik:\r\n\r\nMenghindari penggenangan air yang berlebihan dapat mengurangi kelembapan tanah dan udara di sekitar tanaman, yang dapat menghambat pertumbuhan spora jamur. Pengelolaan irigasi yang baik sangat penting untuk mencegah infeksi.\r\nPenyemprotan Fungisida:\r\n\r\nFungisida yang berbahan aktif seperti Tricyclazole, Azoxystrobin, atau Mancozeb bisa efektif dalam mengendalikan penyakit blast. Penyemprotan fungisida dilakukan pada fase kritis tanaman (seperti fase pembentukan malai dan pembungaan) untuk mencegah infeksi lebih lanjut.\r\nPemangkasan Daun dan Batang yang Terinfeksi:\r\n\r\nSegera pangkas dan buang bagian tanaman yang sudah terinfeksi untuk mencegah penyebaran penyakit ke tanaman sehat lainnya.\r\nRotasi Tanaman:\r\n\r\nRotasi tanaman dengan tanaman selain padi (misalnya jagung atau kedelai) dapat mengurangi akumulasi patogen di dalam tanah dan menghambat siklus hidup jamur penyebab blast.\r\nPengendalian Gulma:\r\n\r\nGulma yang tumbuh di sekitar tanaman padi juga dapat menjadi sumber penyakit. Oleh karena itu, pengendalian gulma yang baik dapat mengurangi kemungkinan penyebaran penyakit.\r\nPengelolaan Sampah Tanaman:\r\n\r\nPastikan untuk membersihkan sisa-sisa tanaman padi yang terinfeksi dan tidak membiarkan sisa tanaman tergeletak di ladang karena dapat menjadi sumber spora jamur yang menginfeksi tanaman padi pada musim berikutnya.', '2024-12-27 09:28:31'),
(10, 10, 1, 'uploads\\1735291729838.png', 'blight', 'Penggunaan Varietas Padi Tahan Penyakit:\r\n\r\nMenanam varietas padi yang tahan terhadap Pyricularia oryzae dapat mengurangi risiko terjadinya penyakit blight. Pilihlah varietas padi yang telah teruji ketahanannya terhadap serangan penyakit ini.\r\nPengelolaan Irigasi:\r\n\r\nPengelolaan irigasi yang baik dapat membantu mencegah perkembangan penyakit blight. Hindari penggenangan air berlebihan pada lahan padi, karena kondisi lembap mendukung pertumbuhan jamur penyebab blight.\r\nRotasi Tanaman:\r\n\r\nMelakukan rotasi tanaman dengan tanaman non-padi yang tidak menjadi inang jamur Pyricularia oryzae bisa mengurangi keberadaan jamur di tanah. Hal ini dapat membantu mengurangi infeksi pada musim tanam berikutnya.\r\nPenggunaan Fungisida:\r\n\r\nMenggunakan fungisida yang efektif terhadap jamur penyebab blight, seperti fungisida berbasis propiconazole atau azoxystrobin, dapat membantu mengendalikan infeksi. Namun, penting untuk mengikuti aturan aplikasi yang benar dan tidak mengandalkan penggunaan fungisida secara berlebihan.\r\nPemangkasan Daun Terinfeksi:\r\n\r\nJika tanaman padi sudah terinfeksi, segera pangkas dan buang daun atau batang yang terinfeksi untuk mengurangi penyebaran penyakit.\r\nPembersihan Alat dan Perlengkapan:\r\n\r\nPastikan alat pertanian seperti cangkul, parang, atau mesin pemanen selalu dibersihkan setelah digunakan, untuk mencegah penyebaran spora jamur ke tanaman lain.\r\nPengelolaan Sampah Organik:\r\n\r\nHancurkan atau buang sampah tanaman padi yang sudah terinfeksi agar tidak menjadi sumber infeksi pada musim tanam berikutnya.', '2024-12-27 09:28:49'),
(11, 10, 3, 'uploads\\1735292786909.jpg', 'tungro', 'Pengendalian Vektor (Serangga):\r\n\r\nSalah satu cara terbaik untuk mengendalikan penyakit tungro adalah dengan mengendalikan serangga vektor yang menyebarkan virus. Gunakan insektisida berbahan aktif seperti Imidacloprid atau Thiamethoxam untuk membunuh kutu daun dan kutu putih.\r\nLakukan penyemprotan insektisida pada waktu yang tepat, terutama pada musim hujan, untuk mencegah penyebaran virus.\r\nPenggunaan Varietas Tahan Tungro:\r\n\r\nMenanam varietas padi yang tahan terhadap virus tungro sangat efektif dalam mencegah infeksi. Varietas-varietas ini memiliki ketahanan alami terhadap kedua jenis virus yang menyebabkan penyakit tungro.\r\nBeberapa varietas yang tahan terhadap tungro antara lain IR64 dan IR72, yang dapat mengurangi kerusakan akibat infeksi virus.\r\nPengendalian Gulma:\r\n\r\nGulma sering menjadi tempat berkembang biak bagi serangga vektor yang membawa virus. Pengendalian gulma yang efektif akan mengurangi tempat persembunyian bagi serangga penghisap, yang mengurangi kemungkinan penyebaran virus.\r\nPengaturan Waktu Tanam yang Tepat:\r\n\r\nTanam padi pada waktu yang tepat, sehingga tanaman tidak berada pada fase rentan selama musim hujan, ketika kutu daun lebih aktif. Mengatur waktu tanam bisa membantu menghindari serangan besar dari serangga vektor.\r\nPenyemprotan Insektisida:\r\n\r\nPenyemprotan insektisida berbasis sistemik dapat membantu mengurangi jumlah kutu yang menghisap cairan tanaman. Penggunaan insektisida berbahan aktif seperti Imidacloprid, Dimethoate, atau Thiamethoxam efektif dalam mengendalikan kutu daun dan kutu putih.\r\nRotasi Tanaman:\r\n\r\nMenggunakan rotasi tanaman dengan tanaman yang bukan inang virus (seperti jagung atau kedelai) dapat mengurangi keberadaan virus di lahan dan menurunkan kemungkinan infeksi pada tanaman padi.\r\nPemusnahan Tanaman Terinfeksi:\r\n\r\nTanaman yang sudah terinfeksi penyakit tungro harus segera dimusnahkan untuk mencegah penyebaran virus lebih lanjut ke tanaman lain. Jangan biarkan tanaman yang terinfeksi berada di lahan terlalu lama.\r\nMenjaga Kebersihan Alat Pertanian:\r\n\r\nPastikan alat pertanian yang digunakan (seperti mesin pemotong padi atau cangkul) selalu dibersihkan untuk mencegah penyebaran virus dari tanaman terinfeksi ke tanaman sehat.', '2024-12-27 09:46:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `created_at`, `update_at`) VALUES
(1, 'newuser', 'newuser@example.com', '$2b$10$vpO5tS0KmX1YJkqwLRk.OOvxYdQCA6zCBYH1egXOJD37WehBddcda', '2024-12-07 05:02:36', '2024-12-07 05:02:36'),
(2, 'vina', 'vina@gmail.com', '$2b$10$MX1eMK8M3s0sLha4Om5ztu.3Y0M1Gz8MzXNf3bRBWtB5kcmNPGFUi', '2024-12-12 14:07:59', '2024-12-12 14:07:59'),
(3, 'vinajunia', 'vinajunia@gmail.com', '$2b$10$FsUd0GXyq86TpRiL9TB.gOA0T5ikIUzPh9LQCw.gVCFDm4m7lnlcy', '2024-12-17 15:51:46', '2024-12-17 15:51:46'),
(4, 'vinaa', 'vina1@gmail.com', '$2b$10$LYCCd0ngnL.N0OhL8KuEzu9kBtATvVPZJpTF6jCDJvvDfwz2UcgyS', '2024-12-25 05:32:18', '2024-12-25 05:32:18'),
(5, 'pina', 'pina@gmail.com', '$2b$10$FjekMkUCc6iKMoXviD6F5eGwczpmgcQGHE9yqMWMFtae4UmxS6Cg.', '2024-12-26 03:53:09', '2024-12-26 03:53:09'),
(6, 'vinagunawan', 'vinagunawan@gmail.com', '$2b$10$f4sRA2vT5sd7tcwQ23Xu9Oq/bXyilaZlHs0.x13z13QxKk3.5l/BO', '2024-12-26 13:52:15', '2024-12-26 13:52:15'),
(8, 'melania', 'melania@gmail.com', '$2b$10$CnTQRy1O6Z0OdsDWy0MAeeqsA73GKt5CCNjhQsDhcMKB6H0hIFBa2', '2024-12-26 14:02:00', '2024-12-26 14:02:00'),
(10, 'melania1', 'melania1@gmail.com', '$2b$10$xwDd7Ciz60v7Q3rO6VNewe1PypGk6OpAX/aO/1jwqV6DwNzBdiwxe', '2024-12-27 09:26:23', '2024-12-27 09:26:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `penyakit_padi`
--
ALTER TABLE `penyakit_padi`
  ADD PRIMARY KEY (`id_penyakit`);

--
-- Indexes for table `riwayat_prediksi`
--
ALTER TABLE `riwayat_prediksi`
  ADD PRIMARY KEY (`id_prediksi`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_penyakit` (`id_penyakit`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `penyakit_padi`
--
ALTER TABLE `penyakit_padi`
  MODIFY `id_penyakit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `riwayat_prediksi`
--
ALTER TABLE `riwayat_prediksi`
  MODIFY `id_prediksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `riwayat_prediksi`
--
ALTER TABLE `riwayat_prediksi`
  ADD CONSTRAINT `riwayat_penyakit_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `riwayat_penyakit_ibfk_2` FOREIGN KEY (`id_penyakit`) REFERENCES `penyakit_padi` (`id_penyakit`) ON DELETE CASCADE;
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"water_reminder\",\"table\":\"users\"},{\"db\":\"water_reminder\",\"table\":\"waterintake\"},{\"db\":\"water_reminder\",\"table\":\"WaterIntake\"},{\"db\":\"water_reminder\",\"table\":\"Users\"},{\"db\":\"hotel\",\"table\":\"booking_room\"},{\"db\":\"hotel\",\"table\":\"kamar_hotel\"},{\"db\":\"api_test\",\"table\":\"programming_languages\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2025-01-05 09:59:28', '{\"Console\\/Mode\":\"collapse\"}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `skabilitas_data`
--
CREATE DATABASE IF NOT EXISTS `skabilitas_data` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `skabilitas_data`;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
--
-- Database: `todo_app`
--
CREATE DATABASE IF NOT EXISTS `todo_app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `todo_app`;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_completed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `is_completed`) VALUES
(5, 'vina', 'junia', 0),
(6, 'vina', 'gunawan', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Database: `water_reminder`
--
CREATE DATABASE IF NOT EXISTS `water_reminder` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `water_reminder`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `weight` double NOT NULL,
  `height` double NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `weight`, `height`, `age`) VALUES
(1, 'user1', 'password1', 70.5, 175.3, 28),
(2, 'user2', 'password2', 65, 160, 22);

-- --------------------------------------------------------

--
-- Table structure for table `waterintake`
--

CREATE TABLE `waterintake` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `amount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `waterintake`
--
ALTER TABLE `waterintake`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `waterintake`
--
ALTER TABLE `waterintake`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `waterintake`
--
ALTER TABLE `waterintake`
  ADD CONSTRAINT `waterintake_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
