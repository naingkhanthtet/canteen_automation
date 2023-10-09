drop database if exists canteen;

create database canteen;

drop user 'canteen'@'localhost';

create user 'canteen'@'localhost' identified by 'canteen';

grant all privileges on canteen.* to 'canteen'@'localhost';

use canteen;

create table User (
    id INT AUTO_INCREMENT primary key,
    email varchar(50) unique not null,
    passw varchar(15) unique not null,
    phone varchar(11) unique not null,
    role ENUM('Client', 'Admin')  
);

create table foods (
    fid INT AUTO_INCREMENT primary key,
    food varchar(255) unique not null,
    price INT not null,
    role ENUM('Curry', 'Drink', 'Fries', 'Salad', 'Fast', 'Soup')
);