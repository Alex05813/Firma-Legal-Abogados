import express from 'express';
import { crearCliente, getCliente, updateCliente } from '../controllers/ClienteController.js';
import { createClienteSchema, updateClienteSchema, getClienteSchema } from '../validators/ClienteValidation.js';
import { validatorHandler } from '../middleware/validator.handler.js';

const ClienteRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operaciones sobre los clientes
 */

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     description: Crea un nuevo cliente y lo asocia a un usuario por su número de identificación.
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCliente'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error de validación o datos incompletos
 *       404:
 *         description: Usuario no encontrado para asociar el cliente
 *       500:
 *         description: Error interno al crear el cliente
 */
ClienteRouter.post('/', validatorHandler(createClienteSchema, 'body'), crearCliente);

/**
 * @swagger
 * /api/clientes/{numeroIdentificacion}:
 *   get:
 *     summary: Obtener un cliente por número de identificación
 *     description: Obtiene los detalles de un cliente mediante su número de identificación.
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado con ese número de identificación
 *       500:
 *         description: Error interno al obtener el cliente
 */
ClienteRouter.get('/:numeroIdentificacion', validatorHandler(getClienteSchema, 'params'), getCliente);

/**
 * @swagger
 * /api/clientes/{numeroIdentificacion}:
 *   put:
 *     summary: Actualizar un cliente
 *     description: Actualiza los detalles de un cliente. Solo se pueden modificar los campos proporcionados.
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       400:
 *         description: Error de validación o datos incompletos
 *       404:
 *         description: Cliente no encontrado con ese número de identificación
 *       500:
 *         description: Error interno al actualizar el cliente
 */
ClienteRouter.put('/:numeroIdentificacion', validatorHandler(updateClienteSchema, 'body'), updateCliente);

export default ClienteRouter;
