-- Job_Seeker database schema for the current Backend/Server.js
-- Run this file in MariaDB or MySQL.

CREATE DATABASE IF NOT EXISTS job_seeker
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE job_seeker;

CREATE TABLE IF NOT EXISTS Employee (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  First_Name VARCHAR(100) NOT NULL,
  Last_Name VARCHAR(100) NOT NULL,
  Age SMALLINT UNSIGNED NULL,
  Location VARCHAR(150) NULL,
  Sex VARCHAR(30) NULL,
  Experience DECIMAL(4,1) UNSIGNED NULL COMMENT 'Years of experience',
  email VARCHAR(254) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT uq_employee_email UNIQUE (email),
  CONSTRAINT chk_employee_age CHECK (Age IS NULL OR Age <= 130)
) ENGINE=InnoDB
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
