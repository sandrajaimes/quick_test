drop database fazt_testing;

create database fazt_testing;
use fazt_testing;

create table if not exists users(
  id int auto_increment not null unique,
  username varchar(100),
  password varchar(100),
  role varchar(100),
  active boolean
);

create table if not exists test_case (
  id int auto_increment not null unique,
  title varchar(200) not null,
  description text not null,
  author varchar(100),
  executortc varchar(100),
  state enum ('draft', 'final'),
  notas text,
  primary key (id)
);

create table if not exists pre_condition(
  id int auto_increment not null unique,
  description text not null,
  primary key (id)
);

create table if not exists pre_condition_test_case (
  id int auto_increment unique,
  id_test_case int not null,
  id_pre_condition int not null,
  primary key (id),
  foreign key (id_test_case) references test_case(id),
  foreign key (id_pre_condition) references pre_condition(id)
);

create table if not exists type_of_testing(
  id int auto_increment not null unique,
  name varchar(100) not null,
  primary key (id)
);

create table if not exists type_of_testing_test_case (
  id int auto_increment unique,
  id_test_case int not null,
  id_type_of_testing int not null,
  primary key (id),
  foreign key (id_test_case) references test_case(id),
  foreign key (id_type_of_testing) references type_of_testing(id)
);

create table if not exists feature (
  id int auto_increment not null unique,
  name varchar(200) not null,
  primary key (id)
);

create table if not exists feature_test_case (
  id int auto_increment unique,
  id_test_case int not null,
  id_feature int not null,
  primary key (id),
  foreign key (id_test_case) references test_case(id),
  foreign key (id_feature) references feature(id)
);

create table if not exists environment(
  id int auto_increment not null unique,
  name varchar(100) not null,
  primary key (id)
);

create table if not exists environment_test_case (
  id int auto_increment unique,
  id_test_case int not null,
  id_environment int not null,
  primary key (id),
  foreign key (id_test_case) references test_case(id),
  foreign key (id_environment) references environment(id)
);

create table if not exists post_condition(
  id int auto_increment not null unique,
  name varchar(100) not null,
  primary key (id)
);

create table if not exists post_condition_test_case (
  id int auto_increment unique,
  id_test_case int not null,
  id_post_condition int not null unique,
  primary key (id),
  foreign key (id_test_case) references test_case(id),
  foreign key (id_post_condition) references post_condition(id)
);

create table if not exists step(
  id int auto_increment not null unique,
  description text not null,
  expected_result text,
  primary key (id)
);

create table if not exists step_test_case (
  id int auto_increment unique,
  id_test_case int not null,
  id_step int not null unique,
  primary key (id),
  foreign key (id_test_case) references test_case(id),
  foreign key (id_step) references step(id)
);

create table if not exists acceptance_requirements(
  id int auto_increment not null unique,
  description text not null,
  primary key (id)
);

create table if not exists acceptance_requirements_test_case (
  id int auto_increment unique,
  id_test_case int not null,
  id_acceptance_requirements int not null,
  primary key (id),
  foreign key (id_test_case) references test_case(id),
  foreign key (id_acceptance_requirements) references acceptance_requirements(id)
);

-- Datos Base

INSERT INTO users (username, password, role, active) VALUES ('admin','admin','admin',1);

INSERT INTO test_case (title, description, author, executortc, state, notas) values ('CP1','CPD1','San San','San','draft','Sin notas');
INSERT INTO test_case (title, description, author, executortc, state, notas) values ('CP2','CPD2','San San','San','draft','Sin notas');
INSERT INTO test_case (title, description, author, executortc, state, notas) values ('CP3','CPD3','San San','San','draft','Sin notas');

INSERT INTO pre_condition (description) value ('Pre-Cond1');
INSERT INTO pre_condition (description) value ('Pre-Cond2');
INSERT INTO pre_condition (description) value ('Pre-Cond3');
INSERT INTO pre_condition (description) value ('Pre-Cond4');
INSERT INTO pre_condition_test_case (id_test_case, id_pre_condition) value (1,1);
INSERT INTO pre_condition_test_case (id_test_case, id_pre_condition) value (1,2);
INSERT INTO pre_condition_test_case (id_test_case, id_pre_condition) value (3,3);
INSERT INTO pre_condition_test_case (id_test_case, id_pre_condition) value (3,4);

INSERT INTO feature (name) value ('HU01');
INSERT INTO feature (name) value ('HU02');
INSERT INTO feature (name) value ('HU03');
INSERT INTO feature (name) value ('HU04');
INSERT INTO feature_test_case (id_test_case,id_feature) value (1,1);
INSERT INTO feature_test_case (id_test_case,id_feature) value (1,2);
INSERT INTO feature_test_case (id_test_case,id_feature) value (3,3);
INSERT INTO feature_test_case (id_test_case,id_feature) value (3,4);

INSERT INTO type_of_testing (name) value ('Exploratory');
INSERT INTO type_of_testing (name) value ('Regresion');
INSERT INTO type_of_testing (name) value ('Performance');
INSERT INTO type_of_testing_test_case (id_test_case,id_type_of_testing) value (1,1);
INSERT INTO type_of_testing_test_case (id_test_case,id_type_of_testing) value (3,3);

INSERT INTO environment (name) value ('Dev');
INSERT INTO environment (name) value ('QA');
INSERT INTO environment (name) value ('Produccion');
INSERT INTO environment_test_case (id_test_case,id_environment) value (1,1);
INSERT INTO environment_test_case (id_test_case,id_environment) value (3,3);

INSERT INTO post_condition (name) value ('Pos-Cond1');
INSERT INTO post_condition (name) value ('Pos-Cond2');
INSERT INTO post_condition (name) value ('Pos-Cond3');
INSERT INTO post_condition (name) value ('Pos-Cond4');
INSERT INTO post_condition_test_case (id_test_case,id_post_condition) value (1,1);
INSERT INTO post_condition_test_case (id_test_case,id_post_condition) value (1,2);
INSERT INTO post_condition_test_case (id_test_case,id_post_condition) value (3,3);
INSERT INTO post_condition_test_case (id_test_case,id_post_condition) value (3,4);

INSERT INTO step (description, expected_result) value ('Step-1','View Ok');
INSERT INTO step (description, expected_result) value ('Step-2','View Ok');
INSERT INTO step (description, expected_result) value ('Step-3','View Ok');
INSERT INTO step (description, expected_result) value ('Step-4','View Ok');
INSERT INTO step_test_case (id_test_case,id_step) value (1,1);
INSERT INTO step_test_case (id_test_case,id_step) value (1,2);
INSERT INTO step_test_case (id_test_case,id_step) value (3,3);
INSERT INTO step_test_case (id_test_case,id_step) value (3,4);

INSERT INTO acceptance_requirements (description) value ('AcepCri-1');
INSERT INTO acceptance_requirements (description) value ('AcepCri-2');
INSERT INTO acceptance_requirements (description) value ('AcepCri-3');
INSERT INTO acceptance_requirements (description) value ('AcepCri-4');
INSERT INTO acceptance_requirements_test_case (id_test_case,id_acceptance_requirements) value (1,1);
INSERT INTO acceptance_requirements_test_case (id_test_case,id_acceptance_requirements) value (1,2);
INSERT INTO acceptance_requirements_test_case (id_test_case,id_acceptance_requirements) value (3,3);
INSERT INTO acceptance_requirements_test_case (id_test_case,id_acceptance_requirements) value (3,4);

-- INNERs Select Data

SELECT * FROM
              test_case tc
INNER JOIN pre_condition_test_case pctc
ON tc.id = pctc.id_test_case
INNER JOIN pre_condition pc
ON pc.id = pctc.id_pre_condition

INNER JOIN type_of_testing_test_case tottc
ON tc.id = tottc.id_test_case
INNER JOIN type_of_testing tot
ON tc.id = tot.id;


SELECT pc.description FROM
pre_condition_test_case pctc
INNER JOIN pre_condition pc
ON pc.id = pctc.id_pre_condition
AND pctc.id_test_case = 1;

SELECT tot.name FROM
type_of_testing_test_case tottc
INNER JOIN type_of_testing tot
ON tottc.id = tot.id
AND tottc.id_test_case = 1;

SELECT fe.name FROM
feature_test_case fetc
INNER JOIN feature fe
ON fetc.id = fe.id
AND fetc.id_test_case = 1;

SELECT env.name FROM
environment_test_case envtc
INNER JOIN environment env
ON envtc.id = env.id
AND envtc.id_test_case = 1;

SELECT pos.name FROM
post_condition_test_case postc
INNER JOIN post_condition pos
ON postc.id = pos.id
AND postc.id_test_case = 1;

SELECT st.description, st.expected_result FROM
step_test_case sttc
INNER JOIN step st
ON sttc.id = st.id
AND sttc.id_test_case = 1;

SELECT ac.description FROM
acceptance_requirements_test_case actc
INNER JOIN acceptance_requirements ac
ON actc.id = ac.id
AND actc.id_test_case = 1;

UPDATE test_case
SET title = 'title', description='', author='', executor='',state='',notas=''
WHERE id = 1;

UPDATE pre_condition
SET description = 'Description vvv1'
WHERE id in (
    SELECT id FROM pre_condition_test_case
    where id_test_case=1
    AND id_pre_condition=1
);

UPDATE type_of_testing
SET name = 'Exploratory v2.0'
WHERE id in (
    SELECT id_type_of_testing FROM type_of_testing_test_case
    where id_test_case=2
    AND id_type_of_testing=1
);

