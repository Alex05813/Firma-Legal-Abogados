import Abogado from '../models/AbogadoModel.js';
import Usuario from '../models/UsersModel.js';

// Controlador para crear un abogado
export const crearAbogado = async (req, res) => {
  try {
    const { numeroIdentificacion, especialidad, area_juridica, experiencia } = req.body;

    // Verificar si el número de identificación está presente
    if (!numeroIdentificacion) {
      return res.status(400).json({ mensaje: 'El número de identificación es obligatorio' });
    }
    
    // Verificar si el usuario con ese número de identificación existe
    const usuarioExistente = await Usuario.findOne({ numeroIdentificacion });
    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado con ese número de identificación' });
    }

    // Verificar si ya existe un abogado con ese número de identificación
    const abogadoExistente = await Abogado.findOne({ numeroIdentificacion });
    if (abogadoExistente) {
      return res.status(400).json({ mensaje: 'Este usuario ya está registrado como abogado con ese número de identificación' });
    }

    // Crear el nuevo abogado
    const nuevoAbogado = new Abogado({
      numeroIdentificacion,
      especialidad,
      area_juridica,
      experiencia,
      usuario: usuarioExistente._id  // Asociar el usuario con el ObjectId del usuario existente
    });

    // Guardar el abogado en la base de datos
    await nuevoAbogado.save();
    res.status(201).json(nuevoAbogado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el abogado' });
  }
};

// Controlador para obtener un abogado
export const getAbogado = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.params;
    const abogado = await Abogado.findOne({ numeroIdentificacion }).populate('usuario', 'nombres apellidos');

    if (!abogado) {
      return res.status(404).json({ mensaje: 'Abogado no encontrado' });
    }

    res.status(200).json(abogado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el abogado' });
  }
};

// Controlador para actualizar un abogado
export const updateAbogado = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.params;
    const { especialidad, area_juridica, experiencia, usuario } = req.body;

    // Buscar el abogado por número de identificación
    const abogado = await Abogado.findOne({ numeroIdentificacion });
    if (!abogado) {
      return res.status(404).json({ mensaje: 'Abogado no encontrado' });
    }

    // Actualizar el abogado con los nuevos datos
    abogado.especialidad = especialidad || abogado.especialidad;
    abogado.area_juridica = area_juridica || abogado.area_juridica;
    abogado.experiencia = experiencia || abogado.experiencia;
    abogado.usuario = usuario || abogado.usuario;

    await abogado.save();
    res.status(200).json(abogado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el abogado' });
  }
};
