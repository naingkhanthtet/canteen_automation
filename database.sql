drop database if exists canteen;

create database canteen;

drop user 'canteen'@'localhost';

create user 'canteen'@'localhost' identified by 'canteen';

grant all privileges on canteen.* to 'canteen'@'localhost';

use canteen;

create table Users (
    uid INT AUTO_INCREMENT primary key,
    email varchar(50) unique not null,
    passwd varchar(15) unique not null,
    phone varchar(11) unique not null,
    batch INT not null,
    urole ENUM('Client', 'Admin')  
);

create table Menus (
    mid INT AUTO_INCREMENT primary key,
    mname varchar(255) unique not null,
    quantity INT not null,
    price INT not null,
    mrole ENUM('Curry', 'Drink', 'Fries', 'Salad', 'Fast', 'Soup')
);

insert into Users(email, passwd, phone, batch, urole) values ('naing@gmail.com', 'Naing15!', '09123456789', 10, 'Client');

create table Orders (
    oid INT AUTO_INCREMENT primary key,
    uid INT not null,
    odate DATETIME not null, 
    mid INT not null,
    quantity INT not null,
    price INT not null
)