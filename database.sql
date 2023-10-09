drop database if exists canteen;

create database canteen;

drop user 'canteen'@'localhost';

create user 'canteen'@'localhost' identified by 'canteen';

grant all privileges on canteen.* to 'canteen'@'localhost';

use canteen;

create table User (
    id integer auto_increment primary key,
    email varchar(50) unique not null,
    passw varchar(15) unique not null,
    phone varchar(11) unique not null    
);