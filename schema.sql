-- while running psql in the terminal, run '\i path/to/schema.sql' to generate db and tables locally

-- CREATE DATABASE polartiger;
-- \connect polartiger

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
  "username" TEXT NOT NULL,
  "password" VARCHAR NOT NULL,
  "email" TEXT NULL DEFAULT NULL,
  "timestamp" TIMESTAMP NOT NULL DEFAULT current_timestamp ,
  PRIMARY KEY ("id")
);

-- ---
-- Table 'events'
--
-- ---

CREATE TABLE "events" (
  "id" SERIAL NOT NULL,
  "event_info" TEXT NULL DEFAULT NULL,
  "event_title" TEXT NOT NULL,
  "event_category" TEXT NULL DEFAULT NULL,
  "event_date" DATE NULL DEFAULT NULL,
  "event_time" TIME NULL DEFAULT NULL,
  "event_link" TEXT NULL DEFAULT NULL,
  "event_image" TEXT NULL DEFAULT NULL,
  PRIMARY KEY ("id")
);

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
  "notification_info" TEXT NULL DEFAULT NULL,
  "notification_date" DATE NULL DEFAULT NULL,
  "notification_time" TIME NULL DEFAULT NULL,
  "fired" BOOLEAN NULL DEFAULT NULL,
  PRIMARY KEY ("id")
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE "users_events" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "users_events" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");
ALTER TABLE "notifications" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

INSERT INTO users (username, password, email) values ('John', '1234', 'tryfomo@gmail.com');
INSERT INTO events (event_info, event_title, event_category) values ('test event info', 'event1', 'concert');
INSERT INTO users_events (user_id, event_id) values (1, 1);

INSERT INTO users (username, password, email) values ('Jane', '4567', 'tryfomo@gmail.com');
INSERT INTO events (event_info, event_title, event_category) values ('test event info 2', 'event2', 'music');
INSERT INTO users_events (user_id, event_id) values (2, 2);

INSERT INTO users (username, password, email) values ('Bob', '9999', 'tryfomo@gmail.com');
INSERT INTO events (event_info, event_title, event_category) values ('test event info 3', 'event3', 'album');
INSERT INTO users_events (user_id, event_id) values (3, 3);
