-- crear database
create database if not exists firma_legal_abogados;

-- Usar database
use firma_legal_abogados;

-- crear tabla de roles
create table rol (
    id_rol int auto_increment not null,
    nombre varchar(45) not null,
    primary key (id_rol)
);

-- insertar roles
insert into rol (nombre) values ('abogado'), ('asistente'), ('cliente');

-- crear tabla de usuarios
create table usuario (
    identificacion int auto_increment not null,
    nombres varchar(50) not null,
    apellidos varchar(50) not null,
    telefono varchar(11) not null,
    email varchar(85) not null,
    passsword varchar(255) not null,
    id_rol int not null,
    primary key (identificacion),
    foreign key (id_rol) references rol(id_rol)
);

-- crear tabla de abogados
create table abogado (
    id_abogado int auto_increment not null,
    especialidad varchar(50) not null,
    area_juridica varchar(50) not null,
    experiencia varchar(45) not null,
    identificacion int not null,
    primary key (id_abogado),
    foreign key (identificacion) references usuario(identificacion)
);

-- crear tabla de asistentes
create table asistente (
    id_asistente int auto_increment not null,
    identificacion int not null,
    primary key (id_asistente),
    foreign key (identificacion) references usuario(identificacion)
);

-- crear tabla de clientes
CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT NOT NULL,
    direccion VARCHAR(75) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    identificacion INT NOT NULL,
    estado_cliente ENUM('potencial', 'cliente') DEFAULT 'potencial',
    PRIMARY KEY (id_cliente),
    FOREIGN KEY (identificacion) REFERENCES usuario(identificacion)
);

-- crear tabla TipoP
create table if not exists tipop (
    id_tipo int auto_increment not null,
    nombre varchar(45) not null,
    primary key (id_tipo)
);

-- insertar datos en TipoP
insert into tipop (nombre) values ('notariales'), ('juzgados'), ('curadurias');

-- crear tabla SubProceso
create table if not exists subproceso (
    id_subproceso int auto_increment not null,
    id_tipo int not null,
    nombre varchar(100) not null,
    primary key (id_subproceso),
    foreign key (id_tipo) references tipop(id_tipo)
);

-- Insertar subprocesos para Notariales
INSERT INTO subproceso (id_tipo, nombre) VALUES
(1, 'compraventas'),
(1, 'sucesiones'),
(1, 'divorcios'),
(1, 'liquidaciones patrimoniales'),
(1, 'hipotecas'),
(1, 'poderes'),
(1, 'salidas del país'),
(1, 'matrimonios extranjeros'),
(1, 'cancelaciones de patrimonio y afectaciones a vivienda familiar');

-- Insertar subprocesos para Juzgados
INSERT INTO subproceso (id_tipo, nombre) VALUES
(2, 'pertenencias'),
(2, 'declaraciones de unión marital'),
(2, 'sucesiones'),
(2, 'cobros jurídicos');

-- Insertar subprocesos para Curadurías
INSERT INTO subproceso (id_tipo, nombre) VALUES
(3, 'reglamentos de propiedad horizontal'),
(3, 'divisorios'),
(3, 'declaraciones de construcción'),
(3, 'reconocimientos de construcción'),
(3, 'licencias de construcción');

-- crear tabla de procesos generales
create table if not exists proceso (
    id_proceso int auto_increment not null,
    descripcion varchar(255) not null,
    fecha_inicio date not null,
    estado enum('activo', 'inactivo') default 'activo',
    id_cliente int not null,
    id_abogado int not null,
    id_tipo int not null,
    id_subproceso int not null,
    primary key (id_proceso),
    foreign key (id_cliente) references cliente(id_cliente),
    foreign key (id_abogado) references abogado(id_abogado),
    foreign key (id_tipo) references tipop(id_tipo)
);

CREATE TABLE IF NOT EXISTS proceso_abogado (
    id_proceso INT NOT NULL,
    id_abogado INT NOT NULL,
    PRIMARY KEY (id_proceso, id_abogado),
    FOREIGN KEY (id_proceso) REFERENCES proceso(id_proceso) ON DELETE CASCADE,
    FOREIGN KEY (id_abogado) REFERENCES abogado(id_abogado) ON DELETE CASCADE
);


-- crear tabla DocEsp
create table if not exists docesp (
    id_doc_especial int auto_increment not null,
    id_subproceso int not null,
    nombre_documento varchar(255) not null,
    primary key (id_doc_especial),
    foreign key (id_subproceso) references subproceso(id_subproceso)
);

-- insertar documentos para los subprocesos Notariales
insert into docesp (id_subproceso, nombre_documento) values
(1, 'escritura de compraventa'),
(1, 'certificado de tradición y libertad'),
(1, 'certificación de paz y salvo (impuestos y administración)'),
(1, 'cédulas de los intervinientes'),
(1, 'avalúo catastral o comercial'),
(2, 'inventario de bienes'),
(2, 'acta de partición'),
(2, 'registro civil de defunción'),
(2, 'certificados de libertad de los inmuebles'),
(2, 'testamento (si existe)'),
(3, 'escritura de liquidación de sociedad conyugal'),
(3, 'registro civil de matrimonio'),
(3, 'registro civil de nacimiento de hijos (si aplica)'),
(3, 'documento de identidad de los intervinientes'),
(4, 'acta de liquidación de sociedad patrimonial'),
(4, 'escritura pública de liquidación'),
(4, 'registro civil de matrimonio'),
(4, 'certificación de bienes y deudas conjuntas'),
(5, 'escritura de constitución de hipoteca'),
(5, 'certificado de libertad del bien hipotecado'),
(5, 'documento de identidad del deudor y acreedor'),
(5, 'pagaré (si aplica)'),
(6, 'carta de poder notariada'),
(6, 'documento de identidad del poderdante y apoderado'),
(6, 'certificación de existencia y representación legal (si aplica)'),
(7, 'carta de autorización notariada'),
(7, 'copia de registro civil de nacimiento del menor'),
(7, 'documento de identidad de los padres'),
(8, 'certificados de soltería o divorcio'),
(8, 'pasaportes y cédulas extranjeras'),
(8, 'registro civil de nacimiento apostillado y traducido'),
(9, 'escritura pública de cancelación de afectación'),
(9, 'certificado de libertad del bien'),
(9, 'documento de identidad de los intervinientes');

-- insertar documentos para los subprocesos de Juzgados
insert into docesp (id_subproceso, nombre_documento) values
(10, 'documento de posesión (constancia de posesión o testimonios)'),
(10, 'escrituras anteriores'),
(10, 'certificado de libertad'),
(10, 'documentos de identidad de los poseedores'),
(11, 'declaración extrajuicio de unión marital'),
(11, 'registro civil de nacimiento de ambos convivientes'),
(11, 'documentos de identidad de los convivientes'),
(12, 'documentos de identidad de los demandantes y demandados'),
(12, 'certificación de bienes en disputa'),
(12, 'pruebas documentales (si aplica)');

-- insertar documentos para los subprocesos de Curadurías
insert into docesp (id_subproceso, nombre_documento) values
(13, 'reglamento de propiedad horizontal'),
(13, 'acta de constitución de la propiedad horizontal'),
(14, 'resolución de la curaduría'),
(14, 'documentos de identidad de los interesados'),
(14, 'certificación de los planos');

-- tabla de facturas
create table factura (
    id_factura int auto_increment not null,
    monto varchar(45) not null,
    fecha_emision datetime not null,
    fecha_vencimiento datetime not null,
    estado enum('sin cancelar', 'cancelada') default 'sin cancelar',
    metodo_pago enum('efectivo', 'credito', 'transferencia') not null,
    id_proceso int not null,
    primary key (id_factura),
    foreign key (id_proceso) references proceso(id_proceso)
);

-- tabla de agenda
create table agenda (
    id_agenda int auto_increment not null,
    fecha_hora datetime not null,
    descripcion text,
    estado enum('programada', 'cancelada') default 'programada',
    id_proceso int not null,
    primary key (id_agenda),
    foreign key (id_proceso) references proceso(id_proceso)
);



-- Consulta para obtener procesos notariales con subprocesos y documentos
SELECT 
    p.id_proceso,
    p.descripcion AS descripcion_proceso,
    tp.nombre AS tipo_proceso,
    sp.nombre AS subproceso,
    d.nombre_documento
FROM 
    proceso p
JOIN 
    tipop tp ON p.id_tipo = tp.id_tipo
JOIN 
    subproceso sp ON p.id_subproceso = sp.id_subproceso
LEFT JOIN 
    docesp d ON sp.id_subproceso = d.id_subproceso
WHERE 
    tp.nombre = 'notariales'
ORDER BY 
    p.id_proceso, sp.id_subproceso, d.id_doc_especial;

-- Consulta para obtener procesos judiciales con subprocesos y documentos
SELECT 
    p.id_proceso,
    p.descripcion AS descripcion_proceso,
    tp.nombre AS tipo_proceso,
    sp.nombre AS subproceso,
    d.nombre_documento
FROM 
    proceso p
JOIN 
    tipop tp ON p.id_tipo = tp.id_tipo
JOIN 
    subproceso sp ON p.id_subproceso = sp.id_subproceso
LEFT JOIN 
    docesp d ON sp.id_subproceso = d.id_subproceso
WHERE 
    tp.nombre = 'juzgados'
ORDER BY 
    p.id_proceso, sp.id_subproceso, d.id_doc_especial;

-- Consulta para obtener procesos de curadurías con subprocesos y documentos
SELECT 
    p.id_proceso,
    p.descripcion AS descripcion_proceso,
    tp.nombre AS tipo_proceso,
    sp.nombre AS subproceso,
    d.nombre_documento
FROM 
    proceso p
JOIN 
    tipop tp ON p.id_tipo = tp.id_tipo
JOIN 
    subproceso sp ON p.id_subproceso = sp.id_subproceso
LEFT JOIN 
    docesp d ON sp.id_subproceso = d.id_subproceso
WHERE 
    tp.nombre = 'curadurias'
ORDER BY 
    p.id_proceso, sp.id_subproceso, d.id_doc_especial;



