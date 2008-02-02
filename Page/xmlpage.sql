DROP TABLE XMLPAGE;

CREATE TABLE XMLPAGE (
ID int NOT NULL default '0',
XML varchar(1024) NOT NULL default '',
USERNAME varchar(64) NOT NULL default '',
TIME date,
EDIT int,
PRIMARY KEY (ID)
);
