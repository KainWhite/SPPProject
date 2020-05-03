-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pacer_database` DEFAULT CHARACTER SET utf8 ;
USE `pacer_database` ;

-- -----------------------------------------------------
-- Table `pacer_database`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pacer_database`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pacer_database`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pacer_database`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(128) NOT NULL,
  `password_hash` VARCHAR(512) NOT NULL,
  `salt` VARCHAR(256) NOT NULL,
  `nickname` VARCHAR(64) NOT NULL,
  `age` INT NOT NULL,
  `about` VARCHAR(2048) NULL,
  `image_url` VARCHAR(512) NULL,
  `is_online` BIT(1) NOT NULL DEFAULT 1,
  `latitude` DOUBLE NOT NULL,
  `longitude` DOUBLE NOT NULL,
  `role_id` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `user_ix_role_id` (`role_id` ASC) VISIBLE,
  UNIQUE INDEX `user_ux_email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `user_ux_nickname` (`nickname` ASC) VISIBLE,
  CONSTRAINT `role_id`
    FOREIGN KEY (`role_id`)
    REFERENCES `pacer_database`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pacer_database`.`user_settings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pacer_database`.`user_settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `search_radius` INT NOT NULL DEFAULT 10,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `pacer_database`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pacer_database`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pacer_database`.`chat` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user1_id` INT NOT NULL,
  `user2_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `chat_ix_user1_id` (`user1_id` ASC) VISIBLE,
  INDEX `chat_ix_user2_id` (`user2_id` ASC) VISIBLE,
  CONSTRAINT `user1_id`
    FOREIGN KEY (`user1_id`)
    REFERENCES `pacer_database`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user2_id`
    FOREIGN KEY (`user2_id`)
    REFERENCES `pacer_database`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pacer_database`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pacer_database`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `chat_id` INT NOT NULL,
  `user_sender_id` INT NOT NULL,
  `Text` VARCHAR(4096) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `message_ix_chat_id` (`chat_id` ASC) VISIBLE,
  INDEX `message_ix_user_sender_id` (`user_sender_id` ASC) VISIBLE,
  CONSTRAINT `chat_id`
    FOREIGN KEY (`chat_id`)
    REFERENCES `pacer_database`.`chat` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_sender_id`
    FOREIGN KEY (`user_sender_id`)
    REFERENCES `pacer_database`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Add default values
-- -----------------------------------------------------
INSERT INTO `pacer_database`.`role` (`id`, `name`) VALUES ('1', 'user');
INSERT INTO `pacer_database`.`user` (
  `id`,
  `email`,
  `password_hash`,
  `salt`,
  `nickname`,
  `age`,
  `about`,
  `image_url`,
  `is_online`,
  `latitude`,
  `longitude`,
  `role_id`)
VALUES (
  '1',
  'a@a.com',
  '7bc4b6722ad8ff9bda38491382c446a28fa081723c8b36f38e45fd38eb912c4503af1ced92159e930fd24a61d543d5ef1cd5dec4021883f5b336ec46c199f328',
  'b77f0140cab9be25cfcc2e9b2a1aa272e81eec50befe556092af39f6cd6bf8bbd001491cf87ebee2e72a4d862f8c621c2d97051d178b802c5938d9e6c310a89921cf5f134e5e9006b1305e363fae4acafd28570149a2ff3edad06fc860cbd1d8e1be8cae23707c8fb223096c5b38592913a4b6899acde4208b49cc561617bba9',
  'User',
  '54',
  'I\'m too old for this',
  'http://localhost:3000/images/notFound.jpg',
  false,
  '53.91',
  '27.56',
  '1');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
