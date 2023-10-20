CREATE DATABASE facturacion;

USE facturacion;

CREATE TABLE clientes (
  id_cliente INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  nit VARCHAR(11) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  ciudad VARCHAR(255) NOT NULL,
  telefono VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_cliente)
);

CREATE TABLE productos (
  id_producto INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id_producto)
);

CREATE TABLE facturas (
  id_factura INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_cliente INT UNSIGNED NOT NULL,
  fecha DATE NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id_factura),
  FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
);

CREATE TABLE items_factura (
  id_item INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_factura INT UNSIGNED NOT NULL,
  id_producto INT UNSIGNED NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id_item),
  FOREIGN KEY (id_factura) REFERENCES facturas (id_factura),
  FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
);

ALTER TABLE clientes
  ADD COLUMN nit_verificado BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE facturas
  ADD COLUMN serie VARCHAR(255) NOT NULL,
  ADD COLUMN numero VARCHAR(255) NOT NULL,
  ADD COLUMN tipo_factura VARCHAR(255) NOT NULL,
  ADD COLUMN regimen_tributario VARCHAR(255) NOT NULL,
  ADD COLUMN fecha_hora_autorizacion DATETIME NOT NULL,
  ADD COLUMN numero_autorizacion VARCHAR(255) NOT NULL,
  ADD COLUMN url_factura_electronica VARCHAR(255) NOT NULL;

