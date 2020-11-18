CREATE DATABASE IF NOT EXISTS comsecure;
USE comsecure;
CREATE USER 'appuser'@'%' IDENTIFIED BY 'testdb';
GRANT ALL PRIVILEGES ON comsecure.* TO 'appuser'@'%';
FLUSH PRIVILEGES

CREATE TABLE IF NOT EXISTS user(
	userId INT,
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	isAdmin TINYINT NOT NULL,
	PRIMARY KEY (userId),
);

CREATE TABLE IF NOT EXISTS post(
	postId INT,
	text VARCHAR(255),
	ownerId INT,
	PRIMARY KEY (postId),
	FOREIGN KEY (ownerId) REFERENCES user(userId)
);

CREATE TABLE IF NOT EXISTS comment(
	commentId INT,
	text VARCHAR(255),
	ownerId INT,
	postId INT,
	PRIMARY KEY (commentId),
	FOREIGN KEY (ownerId) REFERENCES user(userId),
	FOREIGN KEY (postId) REFERENCES post(postId)
);
/*
CREATE TRIGGER AddUser BEFORE INSERT ON User
FOR EACH ROW BEGIN
	DECLARE usernameLength INT;
	SET usernameLength = (SELECT LENGTH(new.username));
	DECLARE passwordLength INT;
	SET passwordLength = (SELECT LENGTH(new.password));
	IF (usernameLength < 8) THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'Username is less than 8 characters long.';
	ELSE (passwordLength < 8) THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'Password is less than 8 characters long.';
	END IF;
END
*/

INSERT INTO user (userId, username, password, isAdmin);
VALUES (839403, 'Team', 'mypassword', 0), (903820, 'It', 'whosepassword', 0),(573920, 'Smooth', 'whatspassword', 1);