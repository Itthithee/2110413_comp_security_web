CREATE DATABASE IF NOT EXISTS comsecure;

USE comsecure;
DROP USER IF EXISTS 'appuser'@'%';
FLUSH PRIVILEGES;
CREATE USER 'appuser'@'%' IDENTIFIED BY 'testdb';
GRANT ALL PRIVILEGES ON comsecure.* TO 'appuser'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS user(
	userId INT NOT NULL,
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	isAdmin TINYINT NOT NULL,
	PRIMARY KEY (userId)
);

CREATE TABLE IF NOT EXISTS post(
	postId INT NOT NULL,
	text VARCHAR(255),
	ownerId INT NOt NULL,
	PRIMARY KEY (postId),
	FOREIGN KEY (ownerId) REFERENCES user(userId)
);

CREATE TABLE IF NOT EXISTS comment(
	commentId INT NOT NULL,
	text VARCHAR(255),
	ownerId INT NOT NULL,
	postId INT NOT NULL,
	PRIMARY KEY (commentId),
	FOREIGN KEY (ownerId) REFERENCES user(userId),
	FOREIGN KEY (postId) REFERENCES post(postId)
);

INSERT INTO user (userId, username, password, isAdmin);
VALUES (DEFAULT, 'Team', 'mypassword', 0), (DEFAULT, 'It', 'whosepassword', 0),(DEFAULT, 'Smooth', 'whatspassword', 1);