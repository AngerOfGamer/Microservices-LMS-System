-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2025 at 10:25 AM
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
-- Database: `lms_database`
--

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
(2, 'Database', 'database', '2025-01-05 08:24:02'),
(3, 'Bahasa Inggris', 'Dilaksanakan setiap hari selasa', '2025-01-06 07:41:13'),
(4, 'Bahasa Inggris', 'Dilaksanakan setiap hari selasa', '2025-01-06 07:41:16'),
(5, 'Bahasa Inggris', 'Dilaksanakan setiap hari selasa', '2025-01-06 07:41:17'),
(6, 'Bahasa Inggris', 'Dilaksanakan setiap hari selasa', '2025-01-06 07:41:17'),
(7, 'Bahasa Inggris', 'Dilaksanakan setiap hari selasa', '2025-01-06 07:41:17'),
(8, 'Bahasa Inggris', 'Dilaksanakan setiap hari selasa', '2025-01-06 07:41:18');

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
(9, 21, 2, 'mahasiswa', '2025-01-05 08:24:02'),
(10, 4, 3, 'mahasiswa', '2025-01-06 07:41:13'),
(11, 23, 3, 'dosen', '2025-01-06 07:41:13'),
(12, 21, 3, 'mahasiswa', '2025-01-06 07:41:13'),
(13, 4, 4, 'mahasiswa', '2025-01-06 07:41:16'),
(14, 23, 4, 'dosen', '2025-01-06 07:41:16'),
(15, 21, 4, 'mahasiswa', '2025-01-06 07:41:16'),
(16, 4, 5, 'mahasiswa', '2025-01-06 07:41:17'),
(17, 23, 5, 'dosen', '2025-01-06 07:41:17'),
(18, 21, 5, 'mahasiswa', '2025-01-06 07:41:17'),
(19, 4, 6, 'mahasiswa', '2025-01-06 07:41:17'),
(20, 23, 6, 'dosen', '2025-01-06 07:41:17'),
(21, 21, 6, 'mahasiswa', '2025-01-06 07:41:17'),
(22, 4, 7, 'mahasiswa', '2025-01-06 07:41:17'),
(23, 23, 7, 'dosen', '2025-01-06 07:41:17'),
(24, 21, 7, 'mahasiswa', '2025-01-06 07:41:17'),
(25, 4, 8, 'mahasiswa', '2025-01-06 07:41:18'),
(26, 23, 8, 'dosen', '2025-01-06 07:41:18'),
(27, 21, 8, 'mahasiswa', '2025-01-06 07:41:18');

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
(5, 1, 'modul 5', '', '/uploads/1736095879057-lms_database (1).sql', 'tugas', 2, '2025-01-05 16:51:19'),
(6, 4, 'modul 1', 'satu', NULL, 'materi', 2, '2025-01-06 07:48:17');

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
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` enum('materi','tugas','penilaian','libur') NOT NULL,
  `role` enum('mahasiswa','dosen','admin','semua') NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `recipient_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`recipient_ids`)),
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(8, 'task', 1, 1, '2025-01-05 17:25:52', '/uploads/1736097952708-9.+Desmawan+et+al.pdf'),
(9, 'tugas 1', 1, 1, '2025-01-06 06:07:33', '/uploads/1736143653220-9.+Desmawan+et+al (1).pdf'),
(10, 'tugas 1', 1, 1, '2025-01-06 06:08:02', '/uploads/1736143682450-9.+Desmawan+et+al (1).pdf'),
(11, 'tugas 1', 1, 1, '2025-01-06 07:38:26', '/uploads/1736149106391-9.+Desmawan+et+al (1).pdf'),
(12, 'tugas 1', 1, 1, '2025-01-06 09:02:14', '/uploads/1736154134525-9.+Desmawan+et+al (1).pdf'),
(13, 'tugas 1', 1, 1, '2025-01-06 09:23:25', '/uploads/1736155405889-9.+Desmawan+et+al (1).pdf'),
(14, 'tugas 1', 1, 1, '2025-01-06 09:24:21', '/uploads/1736155461377-9.+Desmawan+et+al (1).pdf');

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
(21, 'Rafael', '421345352', 'mahasiswa', '2025-01-05 06:43:24'),
(22, 'admin', '11111111', 'admin', '2025-01-06 06:35:01'),
(23, 'dosen1', '1111', 'dosen', '2025-01-06 07:40:07'),
(24, 'mahasiswa3', '3333', 'mahasiswa', '2025-01-06 07:50:45'),
(25, 'admin2', '2222', 'admin', '2025-01-06 07:51:03');

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
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `class_id_idx` (`class_id`),
  ADD KEY `created_by_idx` (`created_by`);

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
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `class_members`
--
ALTER TABLE `class_members`
  MODIFY `class_member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `content_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `nilai`
--
ALTER TABLE `nilai`
  MODIFY `nilai_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
