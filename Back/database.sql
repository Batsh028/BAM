CREATE DATABASE IF NOT EXISTS `databaseBAM` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `databaseBAM`;
CREATE TABLE IF NOT EXISTS `databaseBAM`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))

CREATE TABLE IF NOT EXISTS `databaseBAM`.`projects` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `description` VARCHAR(45) NOT NULL,
    `id_image_1` INT NOT NULL,
    `id_image_2` INT,
    `id_image_3` INT,
    `id_image_4` INT,
    `id_image_5` INT,
    PRIMARY KEY (`id`))

CREATE TABLE IF NOT EXISTS `databaseBAM`.`images` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`))