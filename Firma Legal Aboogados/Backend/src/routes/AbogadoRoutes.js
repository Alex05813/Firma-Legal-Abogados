import express from 'express';
import { crearAbogado, getAbogado, updateAbogado } from '../controllers/AbogadoController.js';
import { createAbogadoSchema, updateAbogadoSchema, getAbogadoSchema } from '../validators/AbogadoValidation.js';
import { validatorHandler } from '../middleware/validator.handler.js'; 

const Abogadorouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Abogados
 *   description: Operaciones sobre los abogados
 */

/**
 * @swagger
 * /api/abogados:
 *   post:
 *     summary: Crear un nuevo abogado
 *     description: Crea un nuevo abogado y lo asocia a un usuario por su número de identificación.
 *     tags: [Abogados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Abogado'
 *     responses:
 *       201:
 *         description: Abogado creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
Abogadorouter.post('/', validatorHandler(createAbogadoSchema), crearAbogado);

/**
 * @swagger
 * /api/abogados/{numeroIdentificacion}:
 *   get:
 *     summary: Obtener un abogado por número de identificación
 *     description: Obtiene los detalles de un abogado mediante su número de identificación.
 *     tags: [Abogados]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         description: Número de identificación del abogado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Abogado encontrado
 *       404:
 *         description: Abogado no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
Abogadorouter.get('/:numeroIdentificacion', validatorHandler(getAbogadoSchema), getAbogado);

/**
 * @swagger
 * /api/abogados/{numeroIdentificacion}:
 *   put:
 *     summary: Actualizar un abogado
 *     description: Actualiza los detalles de un abogado. Solo se pueden modificar los campos proporcionados.
 *     tags: [Abogados]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         description: Número de identificación del abogado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Abogado'
 *     responses:
 *       200:
 *         description: Abogado actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Abogado no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
Abogadorouter.put('/:numeroIdentificacion', validatorHandler(updateAbogadoSchema), updateAbogado);

export default Abogadorouter;
