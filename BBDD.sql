


CREATE DATABASE nextaxi_DB;
CREATE USER 'nextaxiuser'@'localhost' IDENTIFIED BY 'Nextaxi.pass';
GRANT ALL PRIVILEGES ON nextaxi_DB.* TO 'nextaxiuser'@'localhost';
FLUSH PRIVILEGES;



-- TABLAS DEL SISTEMA
/*

– 1. usuarios

– Usuarios del sistema: clientes, conductores, supervisores y administradores.
*/
CREATE TABLE usuarios (
    id_usuario BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    rol ENUM('cliente', 'conductor', 'supervisor', 'administrador') NOT NULL,
    idioma VARCHAR(5) DEFAULT 'es',
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);


/*
– 2. cooperativas

– Agrupación opcional de taxis.
*/
CREATE TABLE cooperativas (
    id_cooperativa BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);


/*
– 3. vehiculos

– Vehículos registrados en el sistema.
*/

CREATE TABLE vehiculos (
    id_vehiculo BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    plazas INT DEFAULT 4,
    id_cooperativa BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_vehiculo_cooperativa
        FOREIGN KEY (id_cooperativa)
        REFERENCES cooperativas(id_cooperativa)
        ON DELETE SET NULL
);


---
/*
– 4. conductores

– Datos específicos del taxista.
*/

CREATE TABLE conductores (
    id_conductor BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT UNSIGNED NOT NULL,
    numero_licencia VARCHAR(50) UNIQUE NOT NULL,
    id_vehiculo BIGINT UNSIGNED NOT NULL,
    estado ENUM('disponible', 'ocupado', 'fuera_servicio') DEFAULT 'fuera_servicio',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_conductor_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,
    CONSTRAINT fk_conductor_vehiculo
        FOREIGN KEY (id_vehiculo)
        REFERENCES vehiculos(id_vehiculo)
        ON DELETE RESTRICT
);


/*

– 5. ubicaciones_conductor

– Última ubicación GPS del conductor (se actualiza constantemente).
*/

CREATE TABLE ubicaciones_conductor (
    id_ubicacion BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_conductor BIGINT UNSIGNED NOT NULL,
    latitud DECIMAL(10,8) NOT NULL,
    longitud DECIMAL(11,8) NOT NULL,
    fecha_registro DATETIME NOT NULL,
    CONSTRAINT fk_ubicacion_conductor
        FOREIGN KEY (id_conductor)
        REFERENCES conductores(id_conductor)
        ON DELETE CASCADE
);


---
/*
– 6. solicitudes_taxi

– Solicitud inicial del cliente.
*/

CREATE TABLE solicitudes_taxi (
    id_solicitud BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_cliente BIGINT UNSIGNED NOT NULL,
    recogida_lat DECIMAL(10,8) NOT NULL,
    recogida_lng DECIMAL(11,8) NOT NULL,
    recogida_direccion VARCHAR(255) NOT NULL,
    destino_lat DECIMAL(10,8) NULL,
    destino_lng DECIMAL(11,8) NULL,
    destino_direccion VARCHAR(255) NULL,
    estado ENUM('pendiente', 'asignada', 'cancelada', 'expirada') DEFAULT 'pendiente',
    fecha_solicitud DATETIME NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_solicitud_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);


---
/*
– 7. ofertas_pendientes

– Gestiona qué conductores reciben la solicitud.
*/

CREATE TABLE ofertas_pendientes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_solicitud BIGINT UNSIGNED NOT NULL,
    id_conductor BIGINT UNSIGNED NOT NULL,
    estado ENUM('enviada', 'vista', 'rechazada') DEFAULT 'enviada',
    vence_at DATETIME NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_oferta_solicitud
        FOREIGN KEY (id_solicitud)
        REFERENCES solicitudes_taxi(id_solicitud)
        ON DELETE CASCADE,
    CONSTRAINT fk_oferta_conductor
        FOREIGN KEY (id_conductor)
        REFERENCES conductores(id_conductor)
        ON DELETE CASCADE
);


---
/*
– 8. viajes

– Viaje ya asignado a un conductor.
*/
CREATE TABLE viajes (
    id_viaje BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_solicitud BIGINT UNSIGNED NOT NULL,
    id_conductor BIGINT UNSIGNED NOT NULL,
    id_asignado_por BIGINT UNSIGNED NULL,
    estado ENUM('asignado', 'en_camino', 'recogido', 'completado', 'cancelado') DEFAULT 'asignado',
    inicio_viaje DATETIME NULL,
    fin_viaje DATETIME NULL,
    precio_estimado DECIMAL(8,2) NULL,
    precio_final DECIMAL(8,2) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_viaje_solicitud
        FOREIGN KEY (id_solicitud)
        REFERENCES solicitudes_taxi(id_solicitud)
        ON DELETE RESTRICT,
    CONSTRAINT fk_viaje_conductor
        FOREIGN KEY (id_conductor)
        REFERENCES conductores(id_conductor)
        ON DELETE RESTRICT,
    CONSTRAINT fk_viaje_asignador
        FOREIGN KEY (id_asignado_por)
        REFERENCES usuarios(id_usuario)
        ON DELETE SET NULL
);


/*

– 9. eventos_viaje

– Historial de estados del viaje.
*/

CREATE TABLE eventos_viaje (
    id_evento BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_viaje BIGINT UNSIGNED NOT NULL,
    tipo_evento ENUM('asignado', 'conductor_en_camino', 'recogido', 'completado', 'cancelado') NOT NULL,
    id_usuario BIGINT UNSIGNED NULL,
    datos_extra JSON NULL,
    fecha_evento DATETIME NOT NULL,
    CONSTRAINT fk_evento_viaje
        FOREIGN KEY (id_viaje)
        REFERENCES viajes(id_viaje)
        ON DELETE CASCADE,
    CONSTRAINT fk_evento_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE SET NULL
);


---
/*
– 10. ubicaciones_viaje (opcional)

– Ruta completa del viaje.
*/


CREATE TABLE ubicaciones_viaje (
    id_ubicacion BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_viaje BIGINT UNSIGNED NOT NULL,
    latitud DECIMAL(10,8) NOT NULL,
    longitud DECIMAL(11,8) NOT NULL,
    fecha_registro DATETIME NOT NULL,
    CONSTRAINT fk_ubicacion_viaje
        FOREIGN KEY (id_viaje)
        REFERENCES viajes(id_viaje)
        ON DELETE CASCADE
);


---

/* RESUMEN DE RELACIONES 

usuarios 1 — 1 conductores

cooperativas 1 — N vehiculos

vehiculos 1 — 1 conductores

usuarios (cliente) 1 — N solicitudes_taxi

solicitudes_taxi 1 — 1 viajes

conductores 1 — N viajes

solicitudes_taxi 1 — N ofertas_pendientes

viajes 1 — N eventos_viaje

conductores 1 — N ubicaciones_conductor

viajes 1 — N ubicaciones_viaje
*/

