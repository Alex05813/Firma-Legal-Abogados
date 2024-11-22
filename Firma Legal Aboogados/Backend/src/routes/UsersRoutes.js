import express from 'express';
import { 
  createUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  loginUser 
} from '../controllers/UsersController.js';
import { validatorHandler } from '../middleware/validator.handler.js';
import { createUserSchema, updateUserSchema } from '../validators/UsersValidation.js';

const usersRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /api/usuarios/create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Registra un nuevo usuario en la base de datos.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroIdentificacion:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *             required:
 *               - numeroIdentificacion
 *               - nombres
 *               - apellidos
 *               - telefono
 *               - email
 *               - password
 *               - rol
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Correo o teléfono ya registrados
 *       500:
 *         description: Error interno en el servidor
 */
usersRoutes.post('/create', validatorHandler(createUserSchema, 'body'), createUser);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene una lista de todos los usuarios registrados.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error interno en el servidor
 */
usersRoutes.get('/', getAllUsers);

/**
 * @swagger
 * /api/usuarios/{numeroIdentificacion}:
 *   get:
 *     summary: Obtener un usuario por número de identificación
 *     description: Obtiene un usuario específico mediante su número de identificación.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: numeroIdentificacion
 *         in: path
 *         required: true
 *         description: Número de identificación del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
usersRoutes.get('/:numeroIdentificacion', getUserById);

/**
 * @swagger
 * /api/usuarios/{numeroIdentificacion}:
 *   put:
 *     summary: Actualizar un usuario por número de identificación
 *     description: Actualiza los detalles de un usuario existente mediante su número de identificación.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: numeroIdentificacion
 *         in: path
 *         required: true
 *         description: Número de identificación del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *             required:
 *               - nombres
 *               - apellidos
 *               - telefono
 *               - email
 *               - password
 *               - rol
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
usersRoutes.put('/:numeroIdentificacion', validatorHandler(updateUserSchema, 'body'), updateUser);

/**
 * @swagger
 * /api/usuarios/{numeroIdentificacion}:
 *   delete:
 *     summary: Eliminar un usuario por número de identificación
 *     description: Elimina un usuario de la base de datos utilizando su número de identificación.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: numeroIdentificacion
 *         in: path
 *         required: true
 *         description: Número de identificación del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
usersRoutes.delete('/:numeroIdentificacion', deleteUser);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Login de un usuario
 *     description: Realiza el login de un usuario utilizando su correo y contraseña.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
usersRoutes.post('/login', loginUser);

export default usersRoutes;
