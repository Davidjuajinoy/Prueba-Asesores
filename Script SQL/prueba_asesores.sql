-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-10-2020 a las 04:28:33
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_asesores`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asesores`
--

CREATE TABLE `asesores` (
  `ase_id` int(11) NOT NULL,
  `ase_nombre` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ase_numero_documento` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ase_experiencia` decimal(10,0) DEFAULT NULL,
  `ase_especialidad` varchar(160) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ase_hora_inicio` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ase_hora_fin` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fk_ase_tipo_documento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `asesores`
--

INSERT INTO `asesores` (`ase_id`, `ase_nombre`, `ase_numero_documento`, `ase_experiencia`, `ase_especialidad`, `ase_hora_inicio`, `ase_hora_fin`, `fk_ase_tipo_documento`) VALUES
(1, 'andres hernandez juajinoy', '10324871', '2', 'consejero amoroso', '10:28', '17:03', 2),
(4, 'dante zambrano pichin', '52478911', '9', 'perder el tiempo', '06:00', '18:01', 1),
(5, 'elkin dorado', '1234567891', '4', 'En relaciones familiares', '14:27', '19:26', 1),
(7, 'felipe rodriguez', '11111472', '2', 'Relaciones legales', '08:12', '18:12', 1),
(8, 'jorge mendoza chacon', '14785264', '1', 'No se que poner :D', '06:00', '17:00', 1),
(9, 'angie michel  zambrano', '14475420', '2', 'Asesoria Comercial', '18:00', '05:00', 1),
(10, 'juan diego cubides', '1012416069', '1', 'Asesoria Fiscal', '13:17', '17:00', 1),
(11, 'diego armando rojas', '14578126', '1', 'Procesos Fiscales', '20:00', '17:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id_citas` int(11) NOT NULL,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fecha` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hora_inicio` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hora_final` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fk_asesores` int(11) NOT NULL,
  `fk_clientes` int(11) NOT NULL,
  `fk_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id_citas`, `descripcion`, `fecha`, `hora_inicio`, `hora_final`, `fk_asesores`, `fk_clientes`, `fk_estado`) VALUES
(1, 'para cnada', '2020-10-20', '13:42', '16:42', 5, 18, 2),
(3, 'procesos fiscales', '2020-10-21', '13:46', '13:46', 7, 25, 1),
(4, 'relaciones publicas', '2020-10-30', '08:46', '14:46', 9, 20, 1),
(5, 'asesoria comercial\n', '2020-10-29', '14:50', '16:50', 11, 3, 2),
(6, 'para probar :d', '2020-10-22', '09:24', '15:24', 4, 26, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id_ciudad` int(11) NOT NULL,
  `nombre_ciudad` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fk_pais` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id_ciudad`, `nombre_ciudad`, `fk_pais`) VALUES
(1, 'Bogota', 1),
(2, 'Buenos Aires', 2),
(5, 'Barranquilla', 1),
(6, 'Santander', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `cli_id` int(11) NOT NULL,
  `cli_nombres` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cli_apellidos` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cli_numero_documento` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cli_fecha_creacion` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fk_cli_tipo_documento` int(11) NOT NULL,
  `fk_cli_ciudad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`cli_id`, `cli_nombres`, `cli_apellidos`, `cli_numero_documento`, `cli_fecha_creacion`, `fk_cli_tipo_documento`, `fk_cli_ciudad`) VALUES
(1, 'davincho', 'hernandez', '1000323929', '2020-10-19', 1, 1),
(2, 'yilton', 'gonzales', '78945134', '2020-10-19', 1, 2),
(3, 'daniel', 'legarda', '1000525828', '2020-10-19', 2, 2),
(4, 'alberto', 'fuentes', '75412221', '2020-10-19', 1, 1),
(5, 'kevin andres', 'quintero', '55647891', '2020-10-19', 1, 1),
(8, 'david', 'juajinoy', '11111111', '2020-10-19', 1, 1),
(9, 'sergio', 'garzon', '1000201456', '2020-10-19', 1, 1),
(10, 'nasly', 'mora', '1234567891', '2020-10-19', 1, 1),
(11, 'andres', 'gonzales', '12345789', '2020-10-19', 1, 1),
(13, 'alvaro ', 'pineda', '13792114', '2020-10-19', 1, 1),
(14, 'juliet', 'ortiz', '5478961242', '2020-10-19', 1, 2),
(15, 'jorge', 'morales', '14567892', '2020-10-19', 1, 2),
(16, 'andres', 'hernandez', '47894125', '2020-10-19', 1, 1),
(17, 'andres', 'chacon', '78945611', '2020-10-19', 1, 2),
(18, 'paula andrea ', 'camargo perez', '78945611', '2020-10-19', 1, 1),
(19, 'diego', 'lopez', '1012468025', '2020-10-19', 1, 1),
(20, 'elena', 'martinez juajinoy', '52336347', '2020-10-20', 2, 1),
(21, 'kevin alberto', 'sanchez pedraza', '1478569124', '2020-10-19', 1, 2),
(22, 'ezio sebastian', 'palermo fuentes', '14578992', '2020-10-19', 1, 1),
(23, 'alexander', 'carrero fuentes', '58794151', '2020-10-19', 1, 1),
(24, 'maria', 'quevedo', '52656841', '2020-10-19', 2, 1),
(25, 'pepito', 'perez', '1234567891', '2020-10-19', 1, 1),
(26, 'sandra elena', 'martinez', '1234567891', '2020-10-20', 2, 6),
(27, 'juanito', 'alcachofa riveros', '1000323828', '2020-10-20', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_cita`
--

CREATE TABLE `estado_cita` (
  `id_estado_cita` int(11) NOT NULL,
  `estado_cita` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `estado_cita`
--

INSERT INTO `estado_cita` (`id_estado_cita`, `estado_cita`) VALUES
(1, 'Confirmada'),
(2, 'Reservada'),
(3, 'Atendidada'),
(4, 'Cancelada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id_pais` int(11) NOT NULL,
  `nombre_pais` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id_pais`, `nombre_pais`) VALUES
(1, 'Colombia'),
(2, 'Argentina'),
(3, 'Venezuela'),
(4, 'Ecuador'),
(5, 'Bolivia'),
(6, 'Brasil');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `id_documento` int(11) NOT NULL,
  `nombre_documento` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`id_documento`, `nombre_documento`) VALUES
(1, 'Cedula de Ciudadania'),
(2, 'Tarjeta de Identidad');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asesores`
--
ALTER TABLE `asesores`
  ADD PRIMARY KEY (`ase_id`),
  ADD KEY `fk_asesores_tipo_documento_idx` (`fk_ase_tipo_documento`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id_citas`),
  ADD KEY `fk_citas_asesores1_idx` (`fk_asesores`),
  ADD KEY `fk_citas_clientes1_idx` (`fk_clientes`),
  ADD KEY `fk_citas_estado_idx` (`fk_estado`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id_ciudad`),
  ADD KEY `fk_ciudades_paises1_idx` (`fk_pais`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cli_id`),
  ADD KEY `fk_clientes_tipo_documento1_idx` (`fk_cli_tipo_documento`),
  ADD KEY `fk_clientes_ciudades1_idx` (`fk_cli_ciudad`);

--
-- Indices de la tabla `estado_cita`
--
ALTER TABLE `estado_cita`
  ADD PRIMARY KEY (`id_estado_cita`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id_pais`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`id_documento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asesores`
--
ALTER TABLE `asesores`
  MODIFY `ase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id_citas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id_ciudad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `cli_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `estado_cita`
--
ALTER TABLE `estado_cita`
  MODIFY `id_estado_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id_pais` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `id_documento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asesores`
--
ALTER TABLE `asesores`
  ADD CONSTRAINT `fk_asesores_tipo_documento` FOREIGN KEY (`fk_ase_tipo_documento`) REFERENCES `tipo_documento` (`id_documento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `fk_citas_asesores1` FOREIGN KEY (`fk_asesores`) REFERENCES `asesores` (`ase_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_citas_clientes1` FOREIGN KEY (`fk_clientes`) REFERENCES `clientes` (`cli_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_citas_estado` FOREIGN KEY (`fk_estado`) REFERENCES `estado_cita` (`id_estado_cita`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `fk_ciudades_paises1` FOREIGN KEY (`fk_pais`) REFERENCES `paises` (`id_pais`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `fk_clientes_ciudades1` FOREIGN KEY (`fk_cli_ciudad`) REFERENCES `ciudades` (`id_ciudad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_clientes_tipo_documento1` FOREIGN KEY (`fk_cli_tipo_documento`) REFERENCES `tipo_documento` (`id_documento`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
