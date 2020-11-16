CREATE DATABASE IF NOT EXISTS tmp
USE tmp
CREATE TABLE IF NOT EXISTS User(
	userId int,
	PRIMARY KEY (userId),
	username varchar(50) NOT NULL UNIQUE,
	password varchar(100) NOT NULL,
	isAdmin boolean NOT NULL
)
CREATE TABLE IF NOT EXISTS Post(
	postId int,
	PRIMARY KEY (postId),
	text varchar,
	FOREIGN KEY ownerId REFERENCES User(userId)
)
CREATE TABLE IF NOT EXISTS Comment(
	commentId int,
	PRIMARY KEY (commentId),
	FOREIGN KEY ownerId REFERENCES User(userId)
	FOREIGN KEY postId REFERENCES Post(postId)
)

CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'password'
GRANT ALL PRIVILEGES ON * . * TO 'appuser'@'localhost'
FLUSH PRIVILEGES

INSERT INTO User (userId, username, password, isAdmin)
VALUES ('839403', 'Team', 'mypassword', 'FALSE'),('903820', 'It', 'whosepassword', 'FALSE'),('573920', 'Smooth', 'whatspassword', 'TRUE') 
