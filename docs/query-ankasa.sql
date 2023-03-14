-- CREATE DATABASE

create database ankasa;
\l
\c ankasa

-- CREATE TABLE

create table users(
    id varchar(36) not null primary key,
    fullname varchar(40) not null,
    email varchar(60) not null unique,
    password varchar(128) not null,
    image varchar default('user.png'),
    phone_number varchar(16),
    city varchar(40),
    address varchar(60),
    zipcode varchar(6)
);

create table admin(
    id varchar(36) not null primary key,
    email varchar(60) not null unique,
    password varchar(128) not null
);

create table credit_card(
    id varchar(36) not null primary key,
    id_user varchar(36) references users on update cascade on delete cascade,
    foreign key (id_user) references users(id),
    fullname varchar(40) not null,
    credit_number varchar(16) not null,
    expire date not null,
    cvv int not null,
    balance numeric not null,
    preffered boolean default('true')
);

create table chat(
    id varchar(36) not null primary key,
    sender varchar(36) references users on update cascade on delete cascade,
    foreign key (sender) references users(id),
    receiver varchar(36) references admin on update cascade on delete cascade,
    foreign key (receiver) references admin(id),
    message text,
    date_time date
);

create table city(
    id varchar(36) not null primary key,
    name varchar(20) not null,
    country varchar(20) not null,
    image varchar default('city.png')
);

create table airlines(
    id varchar(36) not null primary key,
    name varchar(20) not null,
    image varchar not null,
    website varchar,
    email varchar(60),
    phone_number varchar(16),
    availability varchar(5) default('true')
);

create table flights(
    id varchar(36) not null primary key,
    id_airline varchar(36) references airlines on update cascade on delete cascade,
    foreign key (id_airline) references airlines(id),
    city_departure varchar(40) not null,
    city_departure_code varchar(4) not null,
    city_destination varchar(40) not null,
    city_destination_code varchar(4) not null,
    date_departure date,
    time_departure time,
    date_arrival date,
    time_arrival time,
    transit_count int not null,
    flight_trip int not null,
    flight_class int not null,
    capacity int not null,
    price numeric not null,
    luggage boolean not null,
    inflight_meal boolean not null,
    wifi boolean not null,
    refundable boolean not null,
    reschedule boolean not null,
    code varchar(6) not null,
    terminal varchar(2) not null,
    gate varchar(3) not null,
    created_at timestamp,
    updated_at timestamp
);

create table reviews(
    id varchar(36) not null primary key,
    id_user varchar(36) references users on update cascade on delete cascade,
    foreign key (id_user) references users(id),
    id_flight varchar(36) references flights on update cascade on delete cascade,
    foreign key (id_flight) references flights(id),
    rating int not null,
    title varchar(30) not null,
    description text
);

create table booking(
    id varchar(36) not null primary key,
    id_user varchar(36) references users on update cascade on delete cascade,
    foreign key (id_user) references users(id),
    id_flight varchar(36) references flights on update cascade on delete cascade,
    foreign key (id_flight) references flights(id),
    id_credit_card varchar(36) references credit_card on update cascade on delete cascade,
    foreign key (id_credit_card) references credit_card(id),
    insurance boolean default('true'),
    status int not null,
    created_at timestamp
);

create table passengers(
    id varchar(36) not null primary key,
    id_booking varchar(36) references booking on update cascade on delete cascade,
    foreign key (id_booking) references booking(id),
    title int not null,
    fullname varchar(40) not null,
    nationality int not null,
    passenger_type int not null,
    seat varchar(6)
);

create table notifications(
    id varchar(36) not null primary key,
    id_user varchar(36) references users on update cascade on delete cascade,
    foreign key (id_user) references users(id),
    title varchar(20) not null,
    description text not null,
    read_status boolean default(false),
    created_at timestamp
);