import express from 'express';
import { crearDocEsp, obtenerDocEsp, obtenerDocEspId, eliminarDocEsp } from '../controllers/DocEspController.js';
import { validatorHandler } from '../middleware/validator.handler.js';
import { createDocEspSchema, getDocEspByIdSchema, deleteDocEspSchema } from '../validators/DocEspValidation.js';
import { verifyToken, verifyRole } from '../middleware/Autentication.js';  

const DocEspRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: DocEsp
 *   description: Operaciones relacionadas con documentos específicos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DocEsp:
 *       type: object
 *       properties:
 *         id_DocEsp:
 *           type: number
 *           description: ID único para el Documento Específico
 *         id_subproceso:
 *           type: number
 *           description: ID del subproceso asociado
 *         nombre:
 *           type: string
 *           description: Nombre del Documento Específico
 *       required:
 *         - id_DocEsp
 *         - id_subproceso
 *         - nombre
 */

/**
 * @swagger
 * /api/docesp:
 *   post:
 *     summary: Crear un nuevo Documento Especifico
 *     tags: [DocEsp]
 *     security:
 *       - bearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DocEsp'
 *     responses:
 *       201:
 *         description: Documento Especifico creado exitosamente
 *       400:
 *         description: El Documento Especifico ya existe para este subproceso o el Subproceso no existe
 *       500:
 *         description: Error al crear el Documento Especifico
 */
DocEspRouter.post('/', verifyToken, verifyRole(['asistente']), validatorHandler(createDocEspSchema, 'body'), crearDocEsp);

/**
 * @swagger
 * /api/docesp:
 *   get:
 *     summary: Obtener todos los Documentos Específicos
 *     tags: [DocEsp]
 *     responses:
 *       200:
 *         description: Lista de Documentos Específicos
 *       500:
 *         description: Error al obtener los Documentos Específicos
 */
DocEspRouter.get('/', verifyToken, verifyRole(['asistente']), obtenerDocEsp);

/**
 * @swagger
 * /api/docesp/{id_DocEsp}:
 *   get:
 *     summary: Obtener un Documento Especifico por su ID
 *     tags: [DocEsp]
 *     parameters:
 *       - in: path
 *         name: id_DocEsp
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del Documento Especifico
 *     responses:
 *       200:
 *         description: Documento Especifico encontrado
 *       404:
 *         description: Documento Especifico no encontrado
 *       500:
 *         description: Error al obtener el Documento Especifico
 */
DocEspRouter.get('/:id_DocEsp', verifyToken, verifyRole(['asistente']), validatorHandler(getDocEspByIdSchema, 'params'), obtenerDocEspId);

/**
 * @swagger
 * /api/docesp/{id_DocEsp}:
 *   delete:
 *     summary: Eliminar un Documento Especifico por su ID
 *     tags: [DocEsp]
 *     parameters:
 *       - in: path
 *         name: id_DocEsp
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del Documento Especifico
 *     responses:
 *       200:
 *         description: Documento Especifico eliminado correctamente
 *       404:
 *         description: Documento Especifico no encontrado
 *       500:
 *         description: Error al eliminar el Documento Especifico
 */
DocEspRouter.delete('/:id_DocEsp', verifyToken, verifyRole(['asistente']), validatorHandler(deleteDocEspSchema, 'params'), eliminarDocEsp);

export default DocEspRouter;
