import express from 'express';
import { crearProceso, getProceso, getAllProcesos, eliminarProceso } from '../controllers/ProcessController.js';
import { createProcesoSchema, getAllProcesosSchema, getProcesoByIdSchema, deleteProcesoSchema } from '../validators/ProcessValidation.js';
import { validatorHandler } from '../middleware/validator.handler.js';

const ProcessRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Procesos
 *   description: Operaciones sobre los procesos
 */

/**
 * @swagger
 * /api/procesos:
 *   post:
 *     summary: Crear un nuevo proceso
 *     description: Crea un nuevo proceso asociando un cliente y un abogado mediante sus números de identificación.
 *     tags: [Procesos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proceso'
 *     responses:
 *       201:
 *         description: Proceso creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
ProcessRouter.post('/', validatorHandler(createProcesoSchema), crearProceso);

/**
 * @swagger
 * /api/procesos/{id_proceso}:
 *   get:
 *     summary: Obtener un proceso por ID
 *     description: Obtiene los detalles de un proceso mediante su ID.
 *     tags: [Procesos]
 *     parameters:
 *       - in: path
 *         name: id_proceso
 *         required: true
 *         description: ID del proceso
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Proceso encontrado
 *       404:
 *         description: Proceso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
ProcessRouter.get('/:id_proceso', validatorHandler(getAllProcesosSchema), getProceso);

/**
 * @swagger
 * /api/procesos:
 *   get:
 *     summary: Obtener todos los procesos
 *     description: Obtiene todos los procesos registrados.
 *     tags: [Procesos]
 *     responses:
 *       200:
 *         description: Procesos encontrados
 *       500:
 *         description: Error interno en el servidor
 */
ProcessRouter.get('/', validatorHandler(getAllProcesosSchema), getAllProcesos);

/**
 * @swagger
 * /api/procesos/{id_proceso}:
 *   delete:
 *     summary: Eliminar un proceso por ID
 *     description: Elimina un proceso mediante su ID.
 *     tags: [Procesos]
 *     parameters:
 *       - in: path
 *         name: id_proceso
 *         required: true
 *         description: ID del proceso
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Proceso eliminado con éxito
 *       404:
 *         description: Proceso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
ProcessRouter.delete('/:id_proceso', eliminarProceso);

export default ProcessRouter;
