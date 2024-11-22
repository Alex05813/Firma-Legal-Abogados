import express from 'express';
import { createAsistente, getAsistente, updateAsistente } from '../controllers/AsistenteController.js';
import { createAsistenteSchema, updateAsistenteSchema, getAsistenteSchema } from '../validators/AsistenteValidation.js';
import { validatorHandler } from '../middleware/validator.handler.js';

const AsistenteRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Asistentes
 *   description: Operaciones sobre los asistentes
 */

/**
 * @swagger
 * /api/asistentes:
 *   post:
 *     summary: Crear un nuevo asistente
 *     description: Crea un nuevo asistente y lo asocia a un usuario por su número de identificación.
 *     tags: [Asistentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asistente'
 *     responses:
 *       201:
 *         description: Asistente creado exitosamente
 *       400:
 *         description: El usuario ya está registrado como asistente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
AsistenteRouter.post('/', validatorHandler(createAsistenteSchema, 'body'),createAsistente);

/**
 * @swagger
 * /api/asistentes/{numeroIdentificacion}:
 *   get:
 *     summary: Obtener un asistente por número de identificación
 *     description: Obtiene los detalles de un asistente mediante su número de identificación.
 *     tags: [Asistentes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación del asistente
 *     responses:
 *       200:
 *         description: Asistente encontrado
 *       404:
 *         description: Asistente no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
AsistenteRouter.get('/:numeroIdentificacion', validatorHandler(getAsistenteSchema, 'params'),getAsistente);

/**
 * @swagger
 * /api/asistentes/{numeroIdentificacion}:
 *   put:
 *     summary: Actualizar un asistente
 *     description: Actualiza los detalles de un asistente. Solo se pueden modificar los campos proporcionados.
 *     tags: [Asistentes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación del asistente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asistente'
 *     responses:
 *       200:
 *         description: Asistente actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Asistente no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
AsistenteRouter.put('/:numeroIdentificacion',validatorHandler(updateAsistenteSchema, 'body'),updateAsistente);

export default AsistenteRouter;
