-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 12 mai 2025 à 14:19
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `django_db`
--
CREATE DATABASE IF NOT EXISTS django_db;
-- --------------------------------------------------------

--
-- Structure de la table `authentication_absencerequest`
--

CREATE TABLE `authentication_absencerequest` (
  `id` bigint(20) NOT NULL,
  `type` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `starts_afternoon` tinyint(1) NOT NULL,
  `ends_afternoon` tinyint(1) NOT NULL,
  `comment` longtext NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `authentication_absencerequest`
--

INSERT INTO `authentication_absencerequest` (`id`, `type`, `start_date`, `end_date`, `starts_afternoon`, `ends_afternoon`, `comment`, `status`, `created_at`, `user_id`) VALUES
(1, 'Congé payé', '2025-02-22', '2025-02-23', 0, 0, 'raison personnelle', 'pending', '2025-05-07 20:42:44.340477', 3);

-- --------------------------------------------------------

--
-- Structure de la table `authentication_catalogueformation`
--

CREATE TABLE `authentication_catalogueformation` (
  `id` bigint(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `category` varchar(50) NOT NULL,
  `duration` int(10) UNSIGNED NOT NULL CHECK (`duration` >= 0),
  `start_date` date NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `trainer` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `authentication_catalogueformation`
--

INSERT INTO `authentication_catalogueformation` (`id`, `title`, `description`, `category`, `duration`, `start_date`, `price`, `trainer`, `created_at`, `updated_at`) VALUES
(1, 'react', 'react avancé', 'informatique', 24, '2025-07-17', 900.00, 'John Doe', '2025-05-07 20:44:35.608026', '2025-05-07 20:44:35.608026');

-- --------------------------------------------------------

--
-- Structure de la table `authentication_documentrequest`
--

CREATE TABLE `authentication_documentrequest` (
  `id` bigint(20) NOT NULL,
  `document_type` varchar(100) NOT NULL,
  `comment` longtext NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `authentication_documentrequest`
--

INSERT INTO `authentication_documentrequest` (`id`, `document_type`, `comment`, `status`, `created_at`, `user_id`) VALUES
(1, 'Attestation de salaire', 'urgent', 'pending', '2025-05-07 20:42:04.123229', 3);

-- --------------------------------------------------------

--
-- Structure de la table `authentication_hrannouncement`
--

CREATE TABLE `authentication_hrannouncement` (
  `id` bigint(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` longtext NOT NULL,
  `date` date NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `author_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `authentication_inscription`
--

CREATE TABLE `authentication_inscription` (
  `id` bigint(20) NOT NULL,
  `date_inscription` datetime(6) NOT NULL,
  `formation_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `authentication_reclamation`
--

CREATE TABLE `authentication_reclamation` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `complaint_type` varchar(20) NOT NULL,
  `details` longtext NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `authentication_reclamation`
--

INSERT INTO `authentication_reclamation` (`id`, `name`, `email`, `phone`, `complaint_type`, `details`, `file`, `created_at`, `user_id`) VALUES
(1, 'awatef', 'awatef@example.com', '12345678', 'retard', 'retard', '', '2025-05-07 20:46:00.627769', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `authentication_trainingcourse`
--

CREATE TABLE `authentication_trainingcourse` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `course_id` varchar(50) NOT NULL,
  `duration` double NOT NULL,
  `unit` varchar(50) NOT NULL,
  `e_learning` tinyint(1) NOT NULL,
  `domain` varchar(100) NOT NULL,
  `theme` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `authentication_userinquiry`
--

CREATE TABLE `authentication_userinquiry` (
  `id` bigint(20) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add user', 6, 'add_user'),
(22, 'Can change user', 6, 'change_user'),
(23, 'Can delete user', 6, 'delete_user'),
(24, 'Can view user', 6, 'view_user'),
(25, 'Can add Formation catalogue', 7, 'add_catalogueformation'),
(26, 'Can change Formation catalogue', 7, 'change_catalogueformation'),
(27, 'Can delete Formation catalogue', 7, 'delete_catalogueformation'),
(28, 'Can view Formation catalogue', 7, 'view_catalogueformation'),
(29, 'Can add training course', 8, 'add_trainingcourse'),
(30, 'Can change training course', 8, 'change_trainingcourse'),
(31, 'Can delete training course', 8, 'delete_trainingcourse'),
(32, 'Can view training course', 8, 'view_trainingcourse'),
(33, 'Can add user inquiry', 9, 'add_userinquiry'),
(34, 'Can change user inquiry', 9, 'change_userinquiry'),
(35, 'Can delete user inquiry', 9, 'delete_userinquiry'),
(36, 'Can view user inquiry', 9, 'view_userinquiry'),
(37, 'Can add reclamation', 10, 'add_reclamation'),
(38, 'Can change reclamation', 10, 'change_reclamation'),
(39, 'Can delete reclamation', 10, 'delete_reclamation'),
(40, 'Can view reclamation', 10, 'view_reclamation'),
(41, 'Can add hr announcement', 11, 'add_hrannouncement'),
(42, 'Can change hr announcement', 11, 'change_hrannouncement'),
(43, 'Can delete hr announcement', 11, 'delete_hrannouncement'),
(44, 'Can view hr announcement', 11, 'view_hrannouncement'),
(45, 'Can add document request', 12, 'add_documentrequest'),
(46, 'Can change document request', 12, 'change_documentrequest'),
(47, 'Can delete document request', 12, 'delete_documentrequest'),
(48, 'Can view document request', 12, 'view_documentrequest'),
(49, 'Can add absence request', 13, 'add_absencerequest'),
(50, 'Can change absence request', 13, 'change_absencerequest'),
(51, 'Can delete absence request', 13, 'delete_absencerequest'),
(52, 'Can view absence request', 13, 'view_absencerequest'),
(53, 'Can add Inscription', 14, 'add_inscription'),
(54, 'Can change Inscription', 14, 'change_inscription'),
(55, 'Can delete Inscription', 14, 'delete_inscription'),
(56, 'Can view Inscription', 14, 'view_inscription'),
(57, 'Can add blacklisted token', 15, 'add_blacklistedtoken'),
(58, 'Can change blacklisted token', 15, 'change_blacklistedtoken'),
(59, 'Can delete blacklisted token', 15, 'delete_blacklistedtoken'),
(60, 'Can view blacklisted token', 15, 'view_blacklistedtoken'),
(61, 'Can add outstanding token', 16, 'add_outstandingtoken'),
(62, 'Can change outstanding token', 16, 'change_outstandingtoken'),
(63, 'Can delete outstanding token', 16, 'delete_outstandingtoken'),
(64, 'Can view outstanding token', 16, 'view_outstandingtoken');

-- --------------------------------------------------------

--
-- Structure de la table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` bigint(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `login` varchar(200) NOT NULL,
  `date_creation` datetime(6) NOT NULL,
  `identifier` varchar(200) DEFAULT NULL,
  `department` varchar(200) DEFAULT NULL,
  `contract_type` varchar(200) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `fax` varchar(200) DEFAULT NULL,
  `position` varchar(200) DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `email`, `phone`, `login`, `date_creation`, `identifier`, `department`, `contract_type`, `start_date`, `salary`, `address`, `fax`, `position`, `photo`, `is_staff`, `is_superuser`) VALUES
(3, 'pbkdf2_sha256$600000$VaSVBybmjXgModmDlVazeC$21iGZEMowSWAQnylM+FRybGPlqdBtvP0Zz/pFS+wVAg=', NULL, 'tabbabiawatef@gmail.com', '27036364', 'TabbabiAwatef', '2025-05-07 20:31:38.638980', '3265', 'IT', 'CDI', '2022-01-07', 3999.97, 'Tunis', '71000000', 'Manager', 'users/photos/WhatsApp_Image_2024-11-27_at_15.41.03.jpeg', 0, 0),
(4, 'pbkdf2_sha256$600000$YIhnvLChchv9L59ROsDdd6$bDmc7dzE95W/FXT136MOjOoXuFQ46Upv5BdC2DDCCZk=', NULL, 'admin@example.com', '12345678', 'admin', '2025-05-07 20:40:29.091329', '98745', 'IT', 'CDI', '2020-07-07', 5000.00, 'Tunis', '71000000', 'Manager', '', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(13, 'authentication', 'absencerequest'),
(7, 'authentication', 'catalogueformation'),
(12, 'authentication', 'documentrequest'),
(11, 'authentication', 'hrannouncement'),
(14, 'authentication', 'inscription'),
(10, 'authentication', 'reclamation'),
(8, 'authentication', 'trainingcourse'),
(6, 'authentication', 'user'),
(9, 'authentication', 'userinquiry'),
(4, 'contenttypes', 'contenttype'),
(5, 'sessions', 'session'),
(15, 'token_blacklist', 'blacklistedtoken'),
(16, 'token_blacklist', 'outstandingtoken');

-- --------------------------------------------------------

--
-- Structure de la table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-04-24 21:02:07.315108'),
(2, 'authentication', '0001_initial', '2025-04-24 21:02:07.706781'),
(3, 'admin', '0001_initial', '2025-04-24 21:02:07.802044'),
(4, 'admin', '0002_logentry_remove_auto_add', '2025-04-24 21:02:07.810042'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-04-24 21:02:07.819041'),
(6, 'contenttypes', '0002_remove_content_type_name', '2025-04-24 21:02:07.870678'),
(7, 'auth', '0001_initial', '2025-04-24 21:02:08.060534'),
(8, 'auth', '0002_alter_permission_name_max_length', '2025-04-24 21:02:08.118617'),
(9, 'auth', '0003_alter_user_email_max_length', '2025-04-24 21:02:08.126616'),
(10, 'auth', '0004_alter_user_username_opts', '2025-04-24 21:02:08.134613'),
(11, 'auth', '0005_alter_user_last_login_null', '2025-04-24 21:02:08.142615'),
(12, 'auth', '0006_require_contenttypes_0002', '2025-04-24 21:02:08.145477'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2025-04-24 21:02:08.157548'),
(14, 'auth', '0008_alter_user_username_max_length', '2025-04-24 21:02:08.164469'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2025-04-24 21:02:08.173469'),
(16, 'auth', '0010_alter_group_name_max_length', '2025-04-24 21:02:08.189898'),
(17, 'auth', '0011_update_proxy_permissions', '2025-04-24 21:02:08.221779'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2025-04-24 21:02:08.243787'),
(19, 'sessions', '0001_initial', '2025-04-24 21:02:08.289794'),
(20, 'token_blacklist', '0001_initial', '2025-04-24 21:02:08.475353'),
(21, 'token_blacklist', '0002_outstandingtoken_jti_hex', '2025-04-24 21:02:08.501453'),
(22, 'token_blacklist', '0003_auto_20171017_2007', '2025-04-24 21:02:08.531443'),
(23, 'token_blacklist', '0004_auto_20171017_2013', '2025-04-24 21:02:08.627541'),
(24, 'token_blacklist', '0005_remove_outstandingtoken_jti', '2025-04-24 21:02:08.664536'),
(25, 'token_blacklist', '0006_auto_20171017_2113', '2025-04-24 21:02:08.698622'),
(26, 'token_blacklist', '0007_auto_20171017_2214', '2025-04-24 21:02:09.763553'),
(27, 'token_blacklist', '0008_migrate_to_bigautofield', '2025-04-24 21:02:10.089545'),
(28, 'token_blacklist', '0010_fix_migrate_to_bigautofield', '2025-04-24 21:02:10.102609'),
(29, 'token_blacklist', '0011_linearizes_history', '2025-04-24 21:02:10.105999'),
(30, 'token_blacklist', '0012_alter_outstandingtoken_user', '2025-04-24 21:02:10.117693');

-- --------------------------------------------------------

--
-- Structure de la table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `token_blacklist_blacklistedtoken`
--

CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint(20) NOT NULL,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `token_blacklist_outstandingtoken`
--

CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint(20) NOT NULL,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `jti` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `token_blacklist_outstandingtoken`
--

INSERT INTO `token_blacklist_outstandingtoken` (`id`, `token`, `created_at`, `expires_at`, `user_id`, `jti`) VALUES
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjczNjMyMSwiaWF0IjoxNzQ2NjQ5OTIxLCJqdGkiOiI0NmIzMjhmOTJiNDQ0YjA0OGM2NWUyMWViOTAyMWE2MyIsInVzZXJfaWQiOjN9.OTIVTRgALHbjSeV4X2geJvdY96Eu8BiuduvzYnO-6aQ', '2025-05-07 20:32:01.837875', '2025-05-08 20:32:01.000000', 3, '46b328f92b444b048c65e21eb9021a63'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjczNjg0MywiaWF0IjoxNzQ2NjUwNDQzLCJqdGkiOiJjNmNlYmUxMDU2ODQ0ZWM4OTFkZGI3MjlhZDdkNzljMCIsInVzZXJfaWQiOjR9.Qkgt7o4BZ5GIMN58xT9cLQLKey8ZHkU8LHzvP5SmIZ0', '2025-05-07 20:40:43.053051', '2025-05-08 20:40:43.000000', 4, 'c6cebe1056844ec891ddb729ad7d79c0'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjczNjg3MSwiaWF0IjoxNzQ2NjUwNDcxLCJqdGkiOiJiODZhZjFlYzZiNjc0MDA5OGRmZjQ2NWU1YTg5ZGVmZSIsInVzZXJfaWQiOjN9.pCfFIklRiQW2tpdH7aT1VUdjkKMS4ienqafuh72jKAw', '2025-05-07 20:41:11.847254', '2025-05-08 20:41:11.000000', 3, 'b86af1ec6b6740098dff465e5a89defe'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjczNjk5OCwiaWF0IjoxNzQ2NjUwNTk4LCJqdGkiOiIxODU5YTdlZDk1NGU0OTlmYmNjM2EyMTAxMmM4ODZmNSIsInVzZXJfaWQiOjR9.b0K8Sdx-IN5aU4BUCPXf4Zu4yr276dEpTY1ztaK9CNo', '2025-05-07 20:43:18.368495', '2025-05-08 20:43:18.000000', 4, '1859a7ed954e499fbcc3a21012c886f5'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjczNzA5NywiaWF0IjoxNzQ2NjUwNjk3LCJqdGkiOiI1YTZiZDBhMzU2Y2U0NjQyODkwM2QwNDU2ZjEzNzExZCIsInVzZXJfaWQiOjN9.Cuft2umuX2uUb1ospd9qCs-c3IK-KV-iXNWENfLUhJM', '2025-05-07 20:44:57.186958', '2025-05-08 20:44:57.000000', 3, '5a6bd0a356ce46428903d0456f13711d'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjczNzEyNCwiaWF0IjoxNzQ2NjUwNzI0LCJqdGkiOiJkNDNjZjU3YzJkMzY0NTlkOWEzZGI2MTZjZDYxMzUxMCIsInVzZXJfaWQiOjR9.ibbFfDVVYUpi2pfbADPna-EIYRSVn_HNtPwdDluLe7I', '2025-05-07 20:45:24.155624', '2025-05-08 20:45:24.000000', 4, 'd43cf57c2d36459d9a3db616cd613510'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjczNzIwMiwiaWF0IjoxNzQ2NjUwODAyLCJqdGkiOiI2YzM4MDgwOGQ1YTc0NmRiOTRhNmY1NmI1NDJiNjM5ZiIsInVzZXJfaWQiOjR9.0bVK2lmzTnA4zDqYjEw5aN3MKBpZFj_z7mSJwszqaMA', '2025-05-07 20:46:42.256341', '2025-05-08 20:46:42.000000', 4, '6c380808d5a746db94a6f56b542b639f'),
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjczNzMzOSwiaWF0IjoxNzQ2NjUwOTM5LCJqdGkiOiJmZTUwNTAzZDU4ZmU0YWZjYTIxMTExZWZjZmFiZjhiZSIsInVzZXJfaWQiOjR9.-ygESXf039d1xSzmUlktzoZyML7WeAi0maaU5YM628Y', '2025-05-07 20:48:59.303550', '2025-05-08 20:48:59.000000', 4, 'fe50503d58fe4afca21111efcfabf8be'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjczNzM4MywiaWF0IjoxNzQ2NjUwOTgzLCJqdGkiOiIwOGQzZDY1NGIyMDI0NmU1OWZhNmNkZTI2NDBkZjRjYiIsInVzZXJfaWQiOjN9.9D8s5wwDiby3bvekwXJ1sphmPd7jC-cEPErbx4kJkLw', '2025-05-07 20:49:43.157017', '2025-05-08 20:49:43.000000', 3, '08d3d654b20246e59fa6cde2640df4cb'),
(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjczNzQxMCwiaWF0IjoxNzQ2NjUxMDEwLCJqdGkiOiJiOGU3ZDljOWM3MTI0ZmU5OTY4NzdiNjI3YWIwZjg0YSIsInVzZXJfaWQiOjR9.jarhdXDhKY6eoIvI3i0_IZWWTohR7QJTyMiFGAWRU7w', '2025-05-07 20:50:10.999538', '2025-05-08 20:50:10.000000', 4, 'b8e7d9c9c7124fe996877b627ab0f84a'),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Njc4MjU5MCwiaWF0IjoxNzQ2Njk2MTkwLCJqdGkiOiJlYmM0MDhhY2MyNWI0ZmM2YTdlYjQ4YTExMjk4YzQ0MSIsInVzZXJfaWQiOjN9.vcWfdqdlgVuNTM8ib21mrZvgMzfRVEuitNPOANAdyaM', '2025-05-08 09:23:10.439267', '2025-05-09 09:23:10.000000', 3, 'ebc408acc25b4fc6a7eb48a11298c441'),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Njc4MjY1OSwiaWF0IjoxNzQ2Njk2MjU5LCJqdGkiOiI2OWNhNmRmNzU1NDE0MjUwOTBhZGUzYThjZTJjNjUzMCIsInVzZXJfaWQiOjR9.BKAZdGTS5gnAOi7JVfJfRC56Vq4SGI2Ls8VMfGHapts', '2025-05-08 09:24:19.681503', '2025-05-09 09:24:19.000000', 4, '69ca6df75541425090ade3a8ce2c6530'),
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Njc4NTA3OSwiaWF0IjoxNzQ2Njk4Njc5LCJqdGkiOiI4MjFlYWEwMjhmNjA0ZWI4YWZlMmU1MTMwOTUzYmMzOCIsInVzZXJfaWQiOjN9.mfIOgVZFKmLWxXvwI__fuShFk4_R8_3_DzKoU7qbSbw', '2025-05-08 10:04:39.752062', '2025-05-09 10:04:39.000000', 3, '821eaa028f604eb8afe2e5130953bc38'),
(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Njc4NTA5MywiaWF0IjoxNzQ2Njk4NjkzLCJqdGkiOiI4M2RhODFjOTM0ODg0ZmMxOWFmMjhkMDEzM2RhZmIxNCIsInVzZXJfaWQiOjR9.Fa9-NgTEgGEM_0W2PsXK4nTm1fUdm3eUltJAGeMC4CM', '2025-05-08 10:04:53.655681', '2025-05-09 10:04:53.000000', 4, '83da81c934884fc19af28d0133dafb14');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `authentication_absencerequest`
--
ALTER TABLE `authentication_absencerequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authentication_absencerequest_user_id_86508643_fk_auth_user_id` (`user_id`);

--
-- Index pour la table `authentication_catalogueformation`
--
ALTER TABLE `authentication_catalogueformation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `authentication_documentrequest`
--
ALTER TABLE `authentication_documentrequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authentication_documentrequest_user_id_824d95f0_fk_auth_user_id` (`user_id`);

--
-- Index pour la table `authentication_hrannouncement`
--
ALTER TABLE `authentication_hrannouncement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authentication_hrannouncement_author_id_ba3fcb03_fk_auth_user_id` (`author_id`);

--
-- Index pour la table `authentication_inscription`
--
ALTER TABLE `authentication_inscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `authentication_inscription_user_id_formation_id_9b72eba9_uniq` (`user_id`,`formation_id`),
  ADD KEY `authentication_inscr_formation_id_d8c2eca5_fk_authentic` (`formation_id`);

--
-- Index pour la table `authentication_reclamation`
--
ALTER TABLE `authentication_reclamation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authentication_reclamation_user_id_70441093_fk_auth_user_id` (`user_id`);

--
-- Index pour la table `authentication_trainingcourse`
--
ALTER TABLE `authentication_trainingcourse`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `authentication_userinquiry`
--
ALTER TABLE `authentication_userinquiry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authentication_userinquiry_user_id_1ef3f15d_fk_auth_user_id` (`user_id`);

--
-- Index pour la table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Index pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Index pour la table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Index pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Index pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Index pour la table `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_id` (`token_id`);

--
-- Index pour la table `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  ADD KEY `token_blacklist_outs_user_id_83bc629a_fk_auth_user` (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `authentication_absencerequest`
--
ALTER TABLE `authentication_absencerequest`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `authentication_catalogueformation`
--
ALTER TABLE `authentication_catalogueformation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `authentication_documentrequest`
--
ALTER TABLE `authentication_documentrequest`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `authentication_hrannouncement`
--
ALTER TABLE `authentication_hrannouncement`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `authentication_inscription`
--
ALTER TABLE `authentication_inscription`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `authentication_reclamation`
--
ALTER TABLE `authentication_reclamation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `authentication_trainingcourse`
--
ALTER TABLE `authentication_trainingcourse`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `authentication_userinquiry`
--
ALTER TABLE `authentication_userinquiry`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `authentication_absencerequest`
--
ALTER TABLE `authentication_absencerequest`
  ADD CONSTRAINT `authentication_absencerequest_user_id_86508643_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `authentication_documentrequest`
--
ALTER TABLE `authentication_documentrequest`
  ADD CONSTRAINT `authentication_documentrequest_user_id_824d95f0_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `authentication_hrannouncement`
--
ALTER TABLE `authentication_hrannouncement`
  ADD CONSTRAINT `authentication_hrannouncement_author_id_ba3fcb03_fk_auth_user_id` FOREIGN KEY (`author_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `authentication_inscription`
--
ALTER TABLE `authentication_inscription`
  ADD CONSTRAINT `authentication_inscr_formation_id_d8c2eca5_fk_authentic` FOREIGN KEY (`formation_id`) REFERENCES `authentication_catalogueformation` (`id`),
  ADD CONSTRAINT `authentication_inscription_user_id_dd848c6d_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `authentication_reclamation`
--
ALTER TABLE `authentication_reclamation`
  ADD CONSTRAINT `authentication_reclamation_user_id_70441093_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `authentication_userinquiry`
--
ALTER TABLE `authentication_userinquiry`
  ADD CONSTRAINT `authentication_userinquiry_user_id_1ef3f15d_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Contraintes pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Contraintes pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  ADD CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`);

--
-- Contraintes pour la table `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  ADD CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
