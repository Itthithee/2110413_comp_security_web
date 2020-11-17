CREATE DATABASE IF NOT EXISTS comsecure;
USE comsecure;
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'testdb';
GRANT ALL PRIVILEGES ON comsecure.* TO 'appuser'@'localhost';

CREATE TABLE IF NOT EXISTS User(
	userId INT,
	PRIMARY KEY (userId),
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	isAdmin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Post(
	postId INT,
	PRIMARY KEY (postId),
	text VARCHAR(255),
	ownerId INT,
	FOREIGN KEY (ownerId) REFERENCES User(userId)
);

CREATE TABLE IF NOT EXISTS Comment(
	commentId INT,
	PRIMARY KEY (commentId),
	ownerId INT,
	FOREIGN KEY (ownerId) REFERENCES User(userId)
	postId INT,
	FOREIGN KEY (postId) REFERENCES Post(postId)
);

INSERT INTO User (userId, username, password, isAdmin);
VALUES (839403, 'Team', 'mypassword', FALSE), (903820, 'It', 'whosepassword', FALSE),(573920, 'Smooth', 'whatspassword', TRUE);