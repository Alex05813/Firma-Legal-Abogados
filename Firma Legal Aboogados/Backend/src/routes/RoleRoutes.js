import express from 'express';
import { validatorHandler } from '../middleware/validator.handler.js';
import { rolValidation } from '../validators/RoleValidations.js';
import RoleController from '../controllers/RoleController.js';

const roleRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Operaciones relacionadas con los roles.
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     description: Crea un nuevo rol en el sistema.
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre del rol.
 *             required:
 *               - nombre
 *     responses:
 *       201:
 *         description: Rol creado exitosamente.
 *       400:
 *         description: Error de validación o datos incompletos.
 *       500:
 *         description: Error al crear el rol.
 */
roleRoutes.post('/', validatorHandler(rolValidation), RoleController.createRole);  // Validación + Crear

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtener todos los roles
 *     description: Obtiene una lista de todos los roles disponibles en el sistema.
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: Lista de roles.
 *       500:
 *         description: Error al obtener los roles.
 */
roleRoutes.get('/', RoleController.getAllRoles);  // Obtener todos los roles

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtener un rol por su ID
 *     description: Obtiene los detalles de un rol utilizando su ID único.
 *     tags: [Role]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del rol
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rol encontrado.
 *       404:
 *         description: Rol no encontrado con ese ID.
 *       500:
 *         description: Error al obtener el rol.
 */
roleRoutes.get('/:id', RoleController.getRoleById);  // Obtener rol por ID

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar un rol
 *     description: Actualiza un rol existente en el sistema.
 *     tags: [Role]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del rol
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nuevo nombre del rol.
 *             required:
 *               - nombre
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente.
 *       400:
 *         description: Error de validación o datos incompletos.
 *       404:
 *         description: Rol no encontrado con ese ID.
 *       500:
 *         description: Error al actualizar el rol.
 */
roleRoutes.put('/:id', validatorHandler(rolValidation), RoleController.updateRole);  // Validación + Actualizar

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     description: Elimina un rol del sistema utilizando su ID único.
 *     tags: [Role]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del rol
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente.
 *       404:
 *         description: Rol no encontrado con ese ID.
 *       500:
 *         description: Error al eliminar el rol.
 */
roleRoutes.delete('/:id', RoleController.deleteRole);  // Eliminar rol por ID

export default roleRoutes;
