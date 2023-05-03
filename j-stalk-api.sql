-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 03 mai 2023 à 17:36
-- Version du serveur : 10.4.20-MariaDB
-- Version de PHP : 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `j-stalk-api`
--

-- --------------------------------------------------------

--
-- Structure de la table `adresses`
--

CREATE TABLE `adresses` (
  `adressID` int(11) NOT NULL,
  `adress` varchar(250) NOT NULL,
  `city` varchar(50) NOT NULL,
  `postalCode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

CREATE TABLE `companies` (
  `companyID` int(11) NOT NULL,
  `adressID` int(11) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `documents`
--

CREATE TABLE `documents` (
  `documentID` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `typeDoc` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `joboffers`
--

CREATE TABLE `joboffers` (
  `jobOfferID` int(11) NOT NULL,
  `jobTitle` varchar(50) NOT NULL,
  `city` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `datePost` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `jobType` varchar(100) NOT NULL,
  `contractType` varchar(100) DEFAULT NULL,
  `contractLength` varchar(50) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `tempSalary` varchar(50) DEFAULT NULL,
  `description` varchar(10000) NOT NULL,
  `favorite` tinyint(1) NOT NULL,
  `company` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `joboffers`
--

INSERT INTO `joboffers` (`jobOfferID`, `jobTitle`, `city`, `department`, `datePost`, `jobType`, `contractType`, `contractLength`, `salary`, `tempSalary`, `description`, `favorite`, `company`) VALUES
(1, 'Developpeur front', 'Aix-en-Provence', 'Bouches du Rhône', '2023-05-02 09:39:38', 'alternance', 'apprentissage', '1 an', 1000, 'par mois', 'Acteur majeur et indépendant dans la profession et fort de 40 ans d\'expérience, ACD propose des logiciels toujours plus performants et innovants afin d’accompagner les cabinets actuellement en pleine transition numérique.\r\n\r\nCertifié Qualiopi, ACD est un centre de formation où la qualité est la priorité pour nos équipes.\r\n\r\nEn constante croissance, le groupe réalise à ce jour plus de 29 M€ de chiffre d’affaires et emploie 250 collaborateurs répartis sur deux sites majeurs en France, Tours et Aix-en-Provence. ACD Groupe ouvre ses candidatures à l’ensemble de ses agences partout en France.\r\n\r\nConvaincus que le partage, la coopération et l’esprit d’équipe sont essentiels au bien-être de chacun, nous attendons des futurs candidats qu’ils partagent ces mêmes valeurs, afin de relever de nouveaux défis et grandir ensemble.', 1, NULL),
(2, 'Devloppeur back', 'Pertuis', 'Vaucluse', '2023-05-02 20:39:55', 'alternance', 'professionalisation', '2 ans', 800, 'par mois', 'Vous intervenez au sein d\'un des programmes clé d\'un constructeur aéronautique. Ces programmes visent à innover et à revisiter l\'expérience utilisateur en opérant la transformation digitale de la société. Vous vous intégrez dans nos équipes qui travaillent en étroite collaboration avec les équipes client. Vous pourrez intervenir sur des projets agiles, en méthode traditionnelle ou en assistance technique', 0, NULL),
(3, 'Community manager', 'Aix-en-Provence', 'bouches-du-rhônes', '2023-05-03 07:18:48', 'Alternance', 'appretissage', '3 ans', 2000, 'par mois', 'Ceci est une description pour un super test', 0, NULL),
(4, 'eeee', 'Manosque', 'Ain', '2023-05-03 14:04:27', 'Alternance', 'Professionalisation', '1 an', 3, 'par mois', '<p>eeee</p>', 0, NULL),
(5, 'Community Manager', 'Aix-en-Provence', 'Alpes-de-Haute-Provence', '2023-05-03 14:29:24', 'Alternance', 'Apprentissage', '2 ans', 14, 'par mois', '<p><strong><em><u>Je vais enfin pouvoir</u></em></strong> <u>tester ma base de </u><em>données correctement yessss</em></p><p><br></p><p><strong>une petite liste à puce maintenant </strong>:</p><ul><li>crit 1</li><li>crit 2</li><li>crit 3</li><li>crit 4</li></ul>', 0, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `schools`
--

CREATE TABLE `schools` (
  `schoolID` int(11) NOT NULL,
  `schoolName` varchar(100) NOT NULL,
  `studentID` int(11) NOT NULL,
  `teacherID` int(11) NOT NULL,
  `adressID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `students`
--

CREATE TABLE `students` (
  `studentID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `contratType` varchar(45) NOT NULL,
  `postType` varchar(45) NOT NULL,
  `yearSchool` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `teachers`
--

CREATE TABLE `teachers` (
  `teacherID` int(11) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(45) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `phoneNumber` int(11) NOT NULL,
  `pictures` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `adresses`
--
ALTER TABLE `adresses`
  ADD PRIMARY KEY (`adressID`);

--
-- Index pour la table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`companyID`),
  ADD KEY `FK_2` (`adressID`),
  ADD KEY `FK_3` (`userID`);

--
-- Index pour la table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`documentID`);

--
-- Index pour la table `joboffers`
--
ALTER TABLE `joboffers`
  ADD PRIMARY KEY (`jobOfferID`),
  ADD KEY `companyID` (`company`);

--
-- Index pour la table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`schoolID`),
  ADD KEY `FK_2` (`adressID`),
  ADD KEY `FK_3` (`teacherID`),
  ADD KEY `FK_4` (`studentID`);

--
-- Index pour la table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`studentID`),
  ADD KEY `FK_3` (`userID`);

--
-- Index pour la table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacherID`),
  ADD KEY `FK_2` (`userID`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `adresses`
--
ALTER TABLE `adresses`
  MODIFY `adressID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `companies`
--
ALTER TABLE `companies`
  MODIFY `companyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `documents`
--
ALTER TABLE `documents`
  MODIFY `documentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `joboffers`
--
ALTER TABLE `joboffers`
  MODIFY `jobOfferID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `schools`
--
ALTER TABLE `schools`
  MODIFY `schoolID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `students`
--
ALTER TABLE `students`
  MODIFY `studentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacherID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `FK_2` FOREIGN KEY (`adressID`) REFERENCES `adresses` (`adressID`),
  ADD CONSTRAINT `FK_5` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);

--
-- Contraintes pour la table `joboffers`
--
ALTER TABLE `joboffers`
  ADD CONSTRAINT `companyID` FOREIGN KEY (`company`) REFERENCES `companies` (`companyID`);

--
-- Contraintes pour la table `schools`
--
ALTER TABLE `schools`
  ADD CONSTRAINT `FK_7` FOREIGN KEY (`adressID`) REFERENCES `adresses` (`adressID`),
  ADD CONSTRAINT `FK_8` FOREIGN KEY (`teacherID`) REFERENCES `teachers` (`teacherID`),
  ADD CONSTRAINT `FK_9` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`);

--
-- Contraintes pour la table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `FK_3` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);

--
-- Contraintes pour la table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `FK_4` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
