drop database if exists canteen;

create database canteen;

drop user 'canteen'@'localhost';

create user 'canteen'@'localhost' identified by 'canteen';

grant all privileges on canteen.* to 'canteen'@'localhost';

use canteen;

create table Users (
    uid INT AUTO_INCREMENT primary key,
    username varchar(20) not null,
    email varchar(50) unique not null,
    passwd varchar(255) unique not null,
    phone varchar(11) unique not null,
    batch INT not null,
    urole ENUM('Client', 'Admin') default 'Client' not null
);

create table Menus (
    mid INT AUTO_INCREMENT primary key,
    mname varchar(255) unique not null,
    quantity INT not null,
    price INT not null,
    mrole ENUM('Curry', 'Drink', 'Fries', 'Salad', 'Fast', 'Soup') not null,
    imgUrl varchar(255) not null
);

insert into Users(username, email, passwd, phone, batch) values
    ('naing', 'naing@gmail.com', 'Naing%!', '09123456789', 10),
    ('may','may@email.com', 'May%!', '09234567890', 10),
    ('ye','ye@email.com', 'Ye%!', '09345678901', 10);

create table Orders (
    oid INT AUTO_INCREMENT primary key,
    uid INT not null,
    odate DATETIME not null, 
    mid INT not null,
    quantity INT not null,
    price INT not null,
    FOREIGN KEY (uid) REFERENCES Users(uid),
    FOREIGN KEY (mid) REFERENCES Menus(mid)
)