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
    mnote varchar(255) not null,
    quantity INT not null,
    price INT not null,
    mrole ENUM('Curry', 'Drink', 'Fries', 'Salad', 'Fast', 'Soup', 'Special') not null,
    imgUrl varchar(255) not null
);

insert into Menus(mname, mnote, quantity, price, mrole, imgUrl) values
    ('Chicken Noodle', 'Sweet flavor', 10, 2500, 'Special', '/images/special/Chicken noodle soup.jpeg'),
    ('Coca Cola', 'Tin, icy cola', 10, 1000, 'Special', '/images/special/Cola(tin).jpeg'),
    ('Kyay Oh', 'Chinese + Burmese + Delicious', 10, 4000, 'Special', '/images/special/Kyay Oh.jpeg'),
    ('Octopus Curry', 'Sour and Spicy Octopus', 10, 2500, 'Special', '/images/special/Octopus Curry.jpeg'),
    ('Quick Instant noodle', 'Fast & Delicious', 10, 1500, 'Special', '/images/special/quick noodle.webp'),
    ('Rice tea salad', 'Essential for students', 10, 1500, 'Special', '/images/special/Rice Tea Leaf salad.jpeg');

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