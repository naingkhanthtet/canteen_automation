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
-- special
    ('Chicken Noodle', 'Sweet flavor', 10, 2500, 'Special', '/images/special/Chicken noodle soup.jpeg'),
    ('Coca Cola', 'Tin, icy cola', 10, 1000, 'Special', '/images/special/Cola(tin).jpeg'),
    ('Kyay Oh', 'Chinese + Burmese + Delicious', 10, 4000, 'Special', '/images/special/Kyay Oh.jpeg'),
    ('Octopus Curry', 'Sour and Spicy Octopus', 10, 2500, 'Special', '/images/special/Octopus Curry.jpeg'),
    ('Quick Instant noodle', 'Fast & Delicious', 10, 1500, 'Special', '/images/special/quick noodle.webp'),
    ('Rice tea salad', 'Essential for students', 10, 1500, 'Special', '/images/special/Rice Tea Leaf salad.jpeg'),
--     curry
    ('Beef Curry', 'Tasty and spicy beef', 10, 2500, 'Curry', '/images/curry/Beef Curry.jpeg'),
    ('Chicken Curry', 'for everyone! Sweet and sour', 10, 2500, 'Curry', '/images/curry/Chicken curry.jpeg'),
    ('Egg Curry', 'for everyone! Nutritious', 10, 2500, 'Curry', '/images/curry/Egg curry.jpeg'),
    ('Fish Curry', 'for soft meat lover', 10, 2500, 'Curry', '/images/curry/Fish curry.jpeg'),
    ('Goat Curry', 'Tasty and best aroma', 10, 2500, 'Curry', '/images/curry/Goat curry.jpeg'),
    ('Pork Curry', 'best pair with Rice', 10, 2500, 'Curry', '/images/curry/Pork curry.jpeg'),
    ('Rice', 'Essential for meal', 10, 500, 'Curry', '/images/curry/Rice.jpeg'),

--     drinks
    ('Americano', 'For black coffee lovers', 10, 1500, 'Drink', '/images/drinks/Americano.jpeg'),
    ('Cappuccino', 'Any foam lovers?', 10, 1500, 'Drink', '/images/drinks/Cappuccino.jpeg'),
    ('Cola (Plastic)', 'Fresh and recover', 10, 1000, 'Drink', '/images/drinks/Cola plastic.jpeg'),
    ('Espresso', 'Caffeine indeed', 10, 1500, 'Drink', '/images/drinks/Espresso.jpeg'),
    ('Honey Lemon', 'Change your mood with Honey', 10, 1000, 'Drink', '/images/drinks/Honey Lemon.jpeg'),
    ('Hot milk', 'Less carbohydrate, more protein', 10, 1000, 'Drink', '/images/drinks/Hot milk.jpeg'),
    ('Iced Mocha', 'Refresh your mood', 10, 2000, 'Drink', '/images/drinks/iced Mocha.jpeg'),
    ('Kiwi juice', 'Sweet and Sour', 10, 1500, 'Drink', '/images/drinks/Kiwi juice.jpeg'),
--     fast food
    ('Burger', 'All in one nutrient!', 10, 2000, 'Fast', '/images/fast/Burger.jpeg'),
    ('Cakes', 'Best pair with Coffee', 10, 1000, 'Fast', '/images/fast/Cakes.jpeg'),
    ('Chicken Tacos', 'Delicious and nutritious', 10, 2000, 'Fast', '/images/fast/Chicken Tacos.jpeg'),
    ('Cookies', 'Best pair with Coffee', 10, 1000, 'Fast', '/images/fast/Cookies.jpeg'),
    ('Corndog', 'Light food for study', 10, 2000, 'Fast', '/images/fast/Corndog.jpeg'),
    ('Croissant', 'Best pair with Coffee', 10, 1000, 'Fast', '/images/fast/Croissant.jpeg'),
--     fries
    ('French Fries', 'Best pair with Coke!', 10, 1000, 'Fries', '/images/fries/French Fried.jpeg'),
    ('Fried Egg', 'Rich protein', 10, 500, 'Fries', '/images/fries/Fried Egg.jpeg'),
    ('Fried Fish', 'Greater with sauce', 10, 1500, 'Fries', '/images/fries/Fried Fish.jpeg'),
    ('Fried Noodle', 'All in one nutrient', 10, 3000, 'Fries', '/images/fries/Fried Noodle.jpeg'),
    ('Fried Pork', 'Light food, great taste', 10, 1500, 'Fries', '/images/fries/Fried Pork.jpeg'),
    ('Fried Prawn', 'Luxurious taste', 10, 2000, 'Fries', '/images/fries/Fried Prawn.jpeg'),
--     salad
    ('Burmese rice salad', 'Rich nutrient for students', 10, 1500, 'Salad', '/images/salad/Burmese rice salad.jpeg'),
    ('Ginger salad', 'Sour but tasteful', 10, 1500, 'Salad', '/images/salad/Ginger salad.jpeg'),
    ('Pennywort salad', 'tasteful with rice', 10, 1500, 'Salad', '/images/salad/Pennywort salad.jpeg'),
    ('Tealeaf salad', 'Essential for Burmese', 10, 1500, 'Salad', '/images/salad/Tealeaf salad.jpeg'),
    ('Tofu salad', 'Best for Teachers', 10, 1500, 'Salad', '/images/salad/Tofu salad.jpeg'),
--     soup
    ('Healing Chicken Soup', 'Rich protein and fresh', 10, 2000, 'Soup', '/images/soup/Healing Chicken Soup.jpeg'),
    ('Mohinga', 'Essential for Burmese', 10, 1500, 'Soup', '/images/soup/Mohinga.jpeg'),
    ('Ohn no Khao swe', 'Best food when Starving', 10, 1500, 'Soup', '/images/soup/Ohn no Khao swe.jpeg'),
    ('Tomato soup', 'Best with Bread', 10, 1500, 'Soup', '/images/soup/Tomato soup.jpeg'),
    ('Tomyum', 'Essential soup for rice', 10, 1500, 'Soup', '/images/soup/Tom yum soup.jpeg')
    ;

insert into Users(username, email, passwd, phone, batch) values
    ('naing', 'naing@gmail.com', 'Naing%!', '09123456789', 10),
    ('may','may@email.com', 'May%!', '09234567890', 10),
    ('ye','ye@email.com', 'Ye%!', '09345678901', 10);

create table Orders (
    oid INT AUTO_INCREMENT primary key,
    uid INT not null,
    mname varchar(255) unique not null,
    mid INT not null,
    quantity INT not null,
    price INT not null,
    FOREIGN KEY (uid) REFERENCES Users(uid),
    FOREIGN KEY (mname) REFERENCES Menus(mname),
    FOREIGN KEY (mid) REFERENCES Menus(mid)
);
