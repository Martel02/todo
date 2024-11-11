drop table if exists task;

create table task (
  id serial primary key,
  description varchar(255) not null
);

insert into task (description) values ('Buy milk');

insert into task (description) values ('Buy eggs');