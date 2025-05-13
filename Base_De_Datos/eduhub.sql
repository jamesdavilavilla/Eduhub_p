-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-05-2025 a las 20:13:20
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eduhub`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrativos`
--

CREATE TABLE `administrativos` (
  `id_Administrativo` int(11) NOT NULL,
  `id_Rol` int(11) DEFAULT NULL,
  `Cargo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrativos`
--

INSERT INTO `administrativos` (`id_Administrativo`, `id_Rol`, `Cargo`) VALUES
(1, 4, 'Secretario'),
(2, 4, 'Técnico'),
(3, 4, 'Coordinador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones_administrativos`
--

CREATE TABLE `asignaciones_administrativos` (
  `ID_Asignacion` int(11) NOT NULL,
  `ID_Administrativo` int(11) DEFAULT NULL,
  `ID_Grupo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignaciones_administrativos`
--

INSERT INTO `asignaciones_administrativos` (`ID_Asignacion`, `ID_Administrativo`, `ID_Grupo`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones_profesores`
--

CREATE TABLE `asignaciones_profesores` (
  `ID_Asignacion` int(11) NOT NULL,
  `ID_Profesor` int(11) DEFAULT NULL,
  `ID_Curso` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignaciones_profesores`
--

INSERT INTO `asignaciones_profesores` (`ID_Asignacion`, `ID_Profesor`, `ID_Curso`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `ID_Calificacion` int(11) NOT NULL,
  `ID_Estudiante` int(11) DEFAULT NULL,
  `ID_Grupo` int(11) DEFAULT NULL,
  `Nota` decimal(5,2) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Tipo_Evaluacion` enum('Parcial','Final','Otro') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`ID_Calificacion`, `ID_Estudiante`, `ID_Grupo`, `Nota`, `Fecha`, `Tipo_Evaluacion`) VALUES
(1, 1, 1, 8.50, '2024-10-01', 'Parcial'),
(2, 2, 2, 9.00, '2024-10-02', 'Final'),
(3, 1, 3, 7.00, '2024-11-15', 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `ID_Curso` int(11) NOT NULL,
  `Nombre_Curso` varchar(100) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`ID_Curso`, `Nombre_Curso`, `Descripcion`) VALUES
(1, 'Matemáticas I', 'Curso de introducción a las matemáticas'),
(2, 'Física I', 'Curso de física básica para ingenieros'),
(3, 'Historia Universal', 'Historia general de las civilizaciones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id_Estudiante` int(11) NOT NULL,
  `id_Rol` int(11) DEFAULT NULL,
  `Apellidos` varchar(50) DEFAULT NULL,
  `Fecha_Nacimiento` date DEFAULT NULL,
  `Estado_Inscripcion` enum('Activo','Inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id_Estudiante`, `id_Rol`, `Apellidos`, `Fecha_Nacimiento`, `Estado_Inscripcion`) VALUES
(1, 3, 'López', '2000-03-15', 'Activo'),
(2, 3, 'Martínez', '2001-08-22', 'Activo'),
(3, 3, 'Sánchez', '1999-11-10', 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `ID_Grupo` int(11) NOT NULL,
  `Nombre_Grupo` varchar(50) DEFAULT NULL,
  `Anio_Academico` year(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `grupos`
--

INSERT INTO `grupos` (`ID_Grupo`, `Nombre_Grupo`, `Anio_Academico`) VALUES
(1, 'Grupo A', '2024'),
(2, 'Grupo B', '2024'),
(3, 'Grupo C', '2024');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `ID_Horario` int(11) NOT NULL,
  `Dia_Semana` enum('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') DEFAULT NULL,
  `Hora_Inicio` time DEFAULT NULL,
  `Hora_Fin` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`ID_Horario`, `Dia_Semana`, `Hora_Inicio`, `Hora_Fin`) VALUES
(1, 'Lunes', '08:00:00', '10:00:00'),
(2, 'Martes', '10:30:00', '12:30:00'),
(3, 'Miércoles', '14:00:00', '16:00:00'),
(4, 'Lunes', '08:00:00', '10:00:00'),
(5, 'Martes', '10:30:00', '12:30:00'),
(6, 'Miércoles', '14:00:00', '16:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `ID_Profesor` int(11) NOT NULL,
  `ID_Rol` int(11) DEFAULT NULL,
  `Apellidos` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`ID_Profesor`, `ID_Rol`, `Apellidos`) VALUES
(1, 2, 'González'),
(2, 2, 'Pérez'),
(3, 2, 'Rodríguez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_Rol` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Correo_Electronico` varchar(100) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_Rol`, `Nombre`, `Correo_Electronico`, `Direccion`) VALUES
(1, 'Administrador', 'admin@universidad.com', 'Av. Principal 123'),
(2, 'Profesor', 'profesor@universidad.com', 'Calle Secundaria 456'),
(3, 'Estudiante', 'estudiante@universidad.com', 'Calle Universitaria 789'),
(4, 'Administrativo', 'adminstrativo@universidad.com', 'Av. Trabajo 101');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `verificacion_horarios`
--

CREATE TABLE `verificacion_horarios` (
  `ID_Verificacion` int(11) NOT NULL,
  `ID_Administrativo` int(11) DEFAULT NULL,
  `ID_Horario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `verificacion_horarios`
--

INSERT INTO `verificacion_horarios` (`ID_Verificacion`, `ID_Administrativo`, `ID_Horario`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrativos`
--
ALTER TABLE `administrativos`
  ADD PRIMARY KEY (`id_Administrativo`),
  ADD KEY `id_Rol` (`id_Rol`);

--
-- Indices de la tabla `asignaciones_administrativos`
--
ALTER TABLE `asignaciones_administrativos`
  ADD PRIMARY KEY (`ID_Asignacion`),
  ADD KEY `ID_Administrativo` (`ID_Administrativo`),
  ADD KEY `ID_Grupo` (`ID_Grupo`);

--
-- Indices de la tabla `asignaciones_profesores`
--
ALTER TABLE `asignaciones_profesores`
  ADD PRIMARY KEY (`ID_Asignacion`),
  ADD KEY `ID_Profesor` (`ID_Profesor`),
  ADD KEY `ID_Curso` (`ID_Curso`);

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`ID_Calificacion`),
  ADD KEY `ID_Estudiante` (`ID_Estudiante`),
  ADD KEY `ID_Grupo` (`ID_Grupo`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`ID_Curso`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id_Estudiante`),
  ADD KEY `id_Rol` (`id_Rol`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`ID_Grupo`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`ID_Horario`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`ID_Profesor`),
  ADD KEY `ID_Rol` (`ID_Rol`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_Rol`);

--
-- Indices de la tabla `verificacion_horarios`
--
ALTER TABLE `verificacion_horarios`
  ADD PRIMARY KEY (`ID_Verificacion`),
  ADD KEY `ID_Administrativo` (`ID_Administrativo`),
  ADD KEY `ID_Horario` (`ID_Horario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrativos`
--
ALTER TABLE `administrativos`
  MODIFY `id_Administrativo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `asignaciones_administrativos`
--
ALTER TABLE `asignaciones_administrativos`
  MODIFY `ID_Asignacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `asignaciones_profesores`
--
ALTER TABLE `asignaciones_profesores`
  MODIFY `ID_Asignacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `ID_Calificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `ID_Curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id_Estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `grupos`
--
ALTER TABLE `grupos`
  MODIFY `ID_Grupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `ID_Horario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `ID_Profesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_Rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `verificacion_horarios`
--
ALTER TABLE `verificacion_horarios`
  MODIFY `ID_Verificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrativos`
--
ALTER TABLE `administrativos`
  ADD CONSTRAINT `administrativos_ibfk_1` FOREIGN KEY (`id_Rol`) REFERENCES `roles` (`id_Rol`);

--
-- Filtros para la tabla `asignaciones_administrativos`
--
ALTER TABLE `asignaciones_administrativos`
  ADD CONSTRAINT `asignaciones_administrativos_ibfk_1` FOREIGN KEY (`ID_Administrativo`) REFERENCES `administrativos` (`id_Administrativo`),
  ADD CONSTRAINT `asignaciones_administrativos_ibfk_2` FOREIGN KEY (`ID_Grupo`) REFERENCES `grupos` (`ID_Grupo`);

--
-- Filtros para la tabla `asignaciones_profesores`
--
ALTER TABLE `asignaciones_profesores`
  ADD CONSTRAINT `asignaciones_profesores_ibfk_1` FOREIGN KEY (`ID_Profesor`) REFERENCES `profesores` (`ID_Profesor`),
  ADD CONSTRAINT `asignaciones_profesores_ibfk_2` FOREIGN KEY (`ID_Curso`) REFERENCES `cursos` (`ID_Curso`);

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`ID_Estudiante`) REFERENCES `estudiantes` (`id_Estudiante`),
  ADD CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`ID_Grupo`) REFERENCES `grupos` (`ID_Grupo`);

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`id_Rol`) REFERENCES `roles` (`id_Rol`);

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`ID_Rol`) REFERENCES `roles` (`id_Rol`);

--
-- Filtros para la tabla `verificacion_horarios`
--
ALTER TABLE `verificacion_horarios`
  ADD CONSTRAINT `verificacion_horarios_ibfk_1` FOREIGN KEY (`ID_Administrativo`) REFERENCES `administrativos` (`id_Administrativo`),
  ADD CONSTRAINT `verificacion_horarios_ibfk_2` FOREIGN KEY (`ID_Horario`) REFERENCES `horarios` (`ID_Horario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
