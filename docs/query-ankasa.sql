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
    password varchar(128) not null,
);

create table credit_card(
    id varchar(36) not null primary key,
    id_user varchar(36) references users on update cascade on delete cascade,
    foreign key (id_user) references users(id),
    fullname varchar(40) not null,
    credit_number int(16) not null,
    expire date not null,
    cvv int(3) not null,
    balance numeric not null
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

create table portfolios(
    id varchar(36) not null primary key,
    id_worker varchar(36) references workers on update cascade on delete cascade,
    foreign key (id_worker) references workers(id),
    name varchar(40) not null,
    repo_link varchar not null,
    portfolio_type portfolio_type not null,
    image varchar not null
);

create table work_experiences(
    id varchar(36) not null primary key,
    id_worker varchar(36) references workers on update cascade on delete cascade,
    foreign key (id_worker) references workers(id),
    jobdesk varchar(40) not null,
    company_name varchar(40) not null,
    date_start varchar not null,
    date_end varchar,
    description text not null,
    image varchar default('company.png')
);

create table recruiters(
    id varchar(36) not null primary key,
    name varchar(40) not null,
    email varchar(60) not null unique,
    company_name varchar(40) not null,
    jobdesk varchar(40) not null,
    phone_number varchar(16) not null,
    password varchar(128) not null,
    image varchar default('recruiter.png'),
    company_field varchar(40),
    workplace varchar(40),
    description text,
    instagram varchar(40),
    linkedin varchar(40),
    banner_image varchar default('banner.png')
);

create table hire(
    id varchar(36) not null primary key,
    id_worker varchar(36) references workers on update cascade on delete cascade,
    foreign key (id_worker) references workers(id),
    id_recruiter varchar(36) references recruiters on update cascade on delete cascade,
    foreign key (id_recruiter) references recruiters(id),
    reason reason not null,
    name varchar(40) not null,
    email varchar(60) not null,
    phone_number varchar(16) not null,
    description text,
    read_status boolean not null,
    created_at varchar not null,
    updated_at varchar not null
);