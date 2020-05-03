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
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`UserRoles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`UserRoles` (
  `ID_UserRole` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`ID_UserRole`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `ID_User` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(128) NOT NULL,
  `PasswordHash` VARCHAR(512) NOT NULL,
  `Salt` VARCHAR(256) NOT NULL,
  `Nickname` VARCHAR(64) NOT NULL,
  `Age` INT NOT NULL,
  `About` VARCHAR(2048) NULL,
  `ImageUrl` VARCHAR(512) NULL,
  `IsOnline` BIT(1) NOT NULL DEFAULT 1,
  `Latitude` DOUBLE NOT NULL,
  `Longitude` DOUBLE NOT NULL,
  `ID_UserRole` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`ID_User`),
  INDEX `ID_UserRole_idx` (`ID_UserRole` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `Nickname_UNIQUE` (`Nickname` ASC) VISIBLE,
  CONSTRAINT `ID_UserRole`
    FOREIGN KEY (`ID_UserRole`)
    REFERENCES `mydb`.`UserRoles` (`ID_UserRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`UserSettings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`UserSettings` (
  `ID_User` INT NOT NULL,
  `SearchRadius` INT NOT NULL DEFAULT 10,
  PRIMARY KEY (`ID_User`),
  CONSTRAINT `ID_User`
    FOREIGN KEY (`ID_User`)
    REFERENCES `mydb`.`Users` (`ID_User`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Chats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Chats` (
  `ID_Chat` INT NOT NULL AUTO_INCREMENT,
  `ID_User1` INT NOT NULL,
  `ID_User2` INT NOT NULL,
  PRIMARY KEY (`ID_Chat`),
  INDEX `ID_User1_idx` (`ID_User1` ASC) VISIBLE,
  INDEX `ID_User2_idx` (`ID_User2` ASC) VISIBLE,
  CONSTRAINT `ID_User1`
    FOREIGN KEY (`ID_User1`)
    REFERENCES `mydb`.`Users` (`ID_User`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `ID_User2`
    FOREIGN KEY (`ID_User2`)
    REFERENCES `mydb`.`Users` (`ID_User`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Messages` (
  `ID_Message` INT NOT NULL AUTO_INCREMENT,
  `ID_Chat` INT NOT NULL,
  `ID_Sender` INT NOT NULL,
  `Text` VARCHAR(4096) NOT NULL,
  PRIMARY KEY (`ID_Message`),
  INDEX `ID_Chat_idx` (`ID_Chat` ASC) VISIBLE,
  INDEX `ID_Sender_idx` (`ID_Sender` ASC) VISIBLE,
  CONSTRAINT `ID_Chat`
    FOREIGN KEY (`ID_Chat`)
    REFERENCES `mydb`.`Chats` (`ID_Chat`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `ID_Sender`
    FOREIGN KEY (`ID_Sender`)
    REFERENCES `mydb`.`Users` (`ID_User`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Add default values
-- -----------------------------------------------------
INSERT INTO `mydb`.`userroles` (`ID_UserRole`, `Name`) VALUES ('1', 'user');
INSERT INTO `mydb`.`Users` (
  `ID_User`,
  `Email`,
  `PasswordHash`,
  `Salt`,
  `Nickname`,
  `Age`,
  `About`,
  `ImageUrl`,
  `IsOnline`,
  `Latitude`,
  `Longitude`,
  `ID_UserRole`)
VALUES (
  '1',
  'a@a.com',
  'c230ca90b201a526ab2b93d0f5f4aa6bd9c6c7c47c2529c035678bc7d1b1cb86a616bfbef440f7fce091d8d849805d95873327d82823fded7ab19695abe8e361',
  '644f561b521af7bce3c99bbd56b2d04b168aa53e276685fe013c401ee9ba96257614e9e3e0c89c2e0db6cf8f08f87aee23cb240004dc29c2fde9dae17a3a4dcb92a56c57042867e535f793e68985192d91c09d63ba1e4ef25a982a85c1510cd054a54258767948c249f8b0965c315967f043f70645eba720703ad592ce77b8cf',
  'User',
  '54',
  'I\'m too old for this',
  'http://localhost:3001/images/notFound.jpg',
  '0',
  '53.91',
  '27.56',
  '1');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
