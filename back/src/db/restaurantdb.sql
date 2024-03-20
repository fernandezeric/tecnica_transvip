-- creación de la base de datos para restauranes
DROP DATABASE IF EXISTS restaurantsdb;
CREATE DATABASE restaurantsdb;

use restaurantsdb;

-- crear tabla para los restauranes
CREATE TABLE restaurant (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    rate DECIMAL(3,1) UNSIGNED NOT NULL
);

-- crear tabla para menus
CREATE TABLE menu (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);
-- crear tabla para platos
CREATE TABLE dish (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL
);

CREATE TABLE restaurant_menu (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
	restaurant_id BINARY(16),
	menu_id BINARY(16),
	FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
	FOREIGN KEY (menu_id) REFERENCES menu(id)
);

CREATE TABLE menu_dish (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
	menu_id BINARY(16),
    dish_id BINARY(16),
	FOREIGN KEY (menu_id) REFERENCES menu(id),
    FOREIGN KEY (dish_id) REFERENCES dish(id)
);

INSERT INTO restaurant (name, description, phone, open_time, close_time, rate) VALUES
('El Parrón Chileno', 'Especialidades en comida típica chilena', '+56212345678', '12:00:00', '22:00:00', 4.3),
('Sabores de Chile', 'Experiencia gastronómica gourmet con ingredientes chilenos', '+56 2 8765 4321', '11:00:00', '23:00:00', 6.6),
('Mariscos del Pacífico', 'Especialidades en mariscos frescos del Océano Pacífico', '+56 2 3456 7890', '10:00:00', '21:00:00', 8.1);

INSERT INTO menu (name, description) VALUES
('Menú Tradicional', 'Platos clásicos de la gastronomía chilena'),
('Menú de Parrilladas', 'Selección de carnes a la parrilla con acompañamientos chilenos'),
('Menú Degustación', 'Experiencia gastronómica exclusiva con sabores chilenos'),
('Menú de Temporada', 'Platos gourmet elaborados con ingredientes frescos de temporada'),
('Menú de Mariscos Frescos', 'Selección diaria de mariscos frescos del Pacífico'),
('Menú del Chef', 'Platos especiales creados por nuestro chef con productos del mar chileno');

INSERT INTO dish (name, price) VALUES
('Empanadas de Pino', 2500),
('Pastel de Choclo', 3500),
('Cazuela de Vacuno', 4000),
('Asado de Tira', 6000),
('Choripán', 3500),
('Costillar de Cerdo', 8000),
('Ceviche de Reineta', 7000),
('Risotto de Mariscos', 8500),
('Lomo de Cordero al Merlot', 12000),
('Ensalada de Quínoa y Palta', 5500),
('Salmón a la Mantequilla de Limón', 9000),
('Tartaleta de Frutos Rojos', 6500),
('Paila Marina', 8500),
('Pescado a lo Macho', 7800),
('Arroz Caldoso de Mariscos', 9200),
('Camarones al Ajillo', 9500),
('Pulpo a la Parrilla', 11000),
('Róbalo en Salsa de Mariscos', 10500);

INSERT INTO restaurant_menu (restaurant_id, menu_id) VALUES
((SELECT id FROM restaurant WHERE name = 'El Parrón Chileno'), (SELECT id FROM menu WHERE name = 'Menú Tradicional')),
((SELECT id FROM restaurant WHERE name = 'El Parrón Chileno'), (SELECT id FROM menu WHERE name = 'Menú de Parrilladas')),
((SELECT id FROM restaurant WHERE name = 'Sabores de Chile'), (SELECT id FROM menu WHERE name = 'Menú Degustación')),
((SELECT id FROM restaurant WHERE name = 'Sabores de Chile'), (SELECT id FROM menu WHERE name = 'Menú de Temporada')),
((SELECT id FROM restaurant WHERE name = 'Mariscos del Pacífico'), (SELECT id FROM menu WHERE name = 'Menú de Mariscos Frescos')),
((SELECT id FROM restaurant WHERE name = 'Mariscos del Pacífico'), (SELECT id FROM menu WHERE name = 'Menú del Chef'));

INSERT INTO menu_dish (menu_id, dish_id) VALUES
((SELECT id FROM menu WHERE name = 'Menú Tradicional'), (SELECT id FROM dish WHERE name = 'Empanadas de Pino')),
((SELECT id FROM menu WHERE name = 'Menú Tradicional'), (SELECT id FROM dish WHERE name = 'Pastel de Choclo')),
((SELECT id FROM menu WHERE name = 'Menú Tradicional'), (SELECT id FROM dish WHERE name = 'Cazuela de Vacuno')),
((SELECT id FROM menu WHERE name = 'Menú de Parrilladas'), (SELECT id FROM dish WHERE name = 'Asado de Tira')),
((SELECT id FROM menu WHERE name = 'Menú de Parrilladas'), (SELECT id FROM dish WHERE name = 'Choripán')),
((SELECT id FROM menu WHERE name = 'Menú de Parrilladas'), (SELECT id FROM dish WHERE name = 'Costillar de Cerdo')),
((SELECT id FROM menu WHERE name = 'Menú Degustación'), (SELECT id FROM dish WHERE name = 'Camarones al Ajillo')),
((SELECT id FROM menu WHERE name = 'Menú Degustación'), (SELECT id FROM dish WHERE name = 'Pulpo a la Parrilla')),
((SELECT id FROM menu WHERE name = 'Menú Degustación'), (SELECT id FROM dish WHERE name = 'Róbalo en Salsa de Mariscos')),
((SELECT id FROM menu WHERE name = 'Menú de Temporada'), (SELECT id FROM dish WHERE name = 'Ceviche de Reineta')),
((SELECT id FROM menu WHERE name = 'Menú de Temporada'), (SELECT id FROM dish WHERE name = 'Risotto de Mariscos')),
((SELECT id FROM menu WHERE name = 'Menú de Temporada'), (SELECT id FROM dish WHERE name = 'Lomo de Cordero al Merlot')),
((SELECT id FROM menu WHERE name = 'Menú de Mariscos Frescos'), (SELECT id FROM dish WHERE name = 'Ensalada de Quínoa y Palta')),
((SELECT id FROM menu WHERE name = 'Menú de Mariscos Frescos'), (SELECT id FROM dish WHERE name = 'Salmón a la Mantequilla de Limón')),
((SELECT id FROM menu WHERE name = 'Menú de Mariscos Frescos'), (SELECT id FROM dish WHERE name = 'Tartaleta de Frutos Rojos')),
((SELECT id FROM menu WHERE name = 'Menú del Chef'), (SELECT id FROM dish WHERE name = 'Paila Marina')),
((SELECT id FROM menu WHERE name = 'Menú del Chef'), (SELECT id FROM dish WHERE name = 'Pescado a lo Macho')),
((SELECT id FROM menu WHERE name = 'Menú del Chef'), (SELECT id FROM dish WHERE name = 'Arroz Caldoso de Mariscos'));

SELECT *, BIN_TO_UUID(menu_id) menu_id FROM restaurant_menu