-- while running psql in the terminal, run '\i path/to/schema.sql' to generate db and tables locally

-- CREATE DATABASE yourdbname;
-- \connect yourdbname

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
--
-- ---

CREATE TABLE "users" (
  "id" SERIAL NOT NULL,
  "username" TEXT NOT NULL UNIQUE,
  "password" VARCHAR NOT NULL,
  "email" TEXT NULL DEFAULT NULL,
  "timestamp" TIMESTAMP NOT NULL DEFAULT current_timestamp ,
  "verification_hash" VARCHAR NULL,
  "verified" BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY ("id")
);

ALTER TABLE users ADD UNIQUE (username);
ALTER TABLE users ADD UNIQUE (email);

-- ---
-- Table 'events'
--
-- ---

CREATE TABLE "events" (
  "id" SERIAL NOT NULL,
  "event_info" TEXT NULL DEFAULT NULL,
  "event_title" TEXT NOT NULL,
  "event_category" TEXT NULL DEFAULT NULL,
  "event_link" TEXT NULL DEFAULT NULL,
  "event_image" TEXT NULL DEFAULT NULL,
  "no_of_subscriber" INTEGER DEFAULT 0,
  PRIMARY KEY ("id")
);

ALTER TABLE events ADD UNIQUE (event_title);

-- ---
-- Table 'users_events'
--
-- ---

CREATE TABLE "users_events" (
  "id" SERIAL NOT NULL,
  "user_id" INTEGER NULL DEFAULT NULL,
  "event_id" INTEGER NULL DEFAULT NULL,
  PRIMARY KEY ("id")
);

-- ---
-- Table 'notifications'
--
-- ---

CREATE TABLE "notifications" (
  "id" SERIAL NOT NULL,
  "event_id" INTEGER NULL DEFAULT NULL,
  "notification_date" TEXT NULL DEFAULT NULL,
  "notification_time" TEXT NULL DEFAULT NULL,
  "fired" BOOLEAN NULL DEFAULT NULL,
  PRIMARY KEY ("id")
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE "users_events" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "users_events" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");
ALTER TABLE "notifications" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");
