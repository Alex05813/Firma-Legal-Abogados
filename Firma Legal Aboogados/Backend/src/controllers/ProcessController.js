import Proceso from '../models/ProcessModel.js';
import Cliente from '../models/ClienteModel.js';
import Abogado from '../models/AbogadoModel.js';
import TipoProcess from '../models/TipoProcessModel.js';

// Controlador para crear un proceso
export const crearProceso = async (req, res) => {
  try {

    const { id_proceso, descripcion, fecha_inicio, estado, numeroIdentificacionCliente, numeroIdentificacionAbogado, id_tipo } = req.body;

    // Verificar si el cliente con ese número de identificación existe
    const clienteExistente = await Cliente.findOne({ numeroIdentificacion: numeroIdentificacionCliente });
    if (!clienteExistente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado con ese número de identificación' });
    }

    // Verificar si el abogado con ese número de identificación existe
    const abogadoExistente = await Abogado.findOne({ numeroIdentificacion: numeroIdentificacionAbogado });
    if (!abogadoExistente) {
      return res.status(404).json({ mensaje: 'Abogado no encontrado con ese número de identificación' });
    }

    // Verificamos si el rol existe en la base de datos usando el id_rol como número
    const tipoprocesos = await TipoProcess.findOne({ id_tipo }); // Buscar el rol por ID (usando el número)
    if (!tipoprocesos) {
      return res.status(400).json({ message: 'Tipo no encontrado' });
    }

    // Verificar si ya existe un proceso con ese id_proceso
    const procesoExistente = await Proceso.findOne({ id_proceso });
    if (procesoExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un proceso con ese ID' });
    }

    // Crear el nuevo proceso
    const nuevoProceso = new Proceso({
      id_proceso,
      descripcion,
      fecha_inicio,
      estado,
      numeroIdentificacionCliente,
      numeroIdentificacionAbogado,
      id_tipo,
    });

    // Guardar el proceso en la base de datos
    await nuevoProceso.save();
    res.status(201).json(nuevoProceso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el proceso' });
  }
};

// Controlador para obtener un proceso por ID
export const getProceso = async (req, res) => {
  try {
    const { id_proceso } = req.params;

    // Buscar el proceso y poblar los campos de cliente y abogado
    const proceso = await Proceso.findOne({ id_proceso })
      .populate('numeroIdentificacionCliente', 'nombre apellido')  // Poblar cliente
      .populate('numeroIdentificacionAbogado', 'nombre apellido');  // Poblar abogado

    if (!proceso) {
      return res.status(404).json({ mensaje: 'Proceso no encontrado' });
    }

    // Obtener el tipo de proceso correspondiente
    const tipo = await TipoProcess.findOne({ id_tipo: proceso.id_tipo });

    // Responder con el proceso y su tipo
    res.status(200).json({
      ...proceso.toObject(),
      tipo: tipo ? tipo.nombre : null  // Agregar el nombre del tipo de proceso
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el proceso' });
  }
};


// Controlador para obtener todos los procesos
export const getAllProcesos = async (req, res) => {
  try {
    // Obtener los filtros de la consulta
    const { estado, id_tipo } = req.query;
    let query = {};  // Criterios de búsqueda por defecto

    // Si se proporciona un estado, se agrega al query
    if (estado) query.estado = estado;

    // Si se proporciona un tipo, se agrega al query
    if (id_tipo) query.id_tipo = id_tipo;

    // Obtener los procesos con los filtros
    const procesos = await Proceso.find(query)
      .populate('numeroIdentificacionCliente', 'nombre apellido')  // Poblar cliente
      .populate('numeroIdentificacionAbogado', 'nombre apellido');  // Poblar abogado

    // Obtener todos los tipos de proceso
    const tipos = await TipoProcess.find();  // Obtener todos los tipos de proceso disponibles

    // Asociar el nombre del tipo de proceso con cada proceso
    const procesosConTipo = procesos.map(proceso => {
      const tipo = tipos.find(t => t.id_tipo === proceso.id_tipo);  // Buscar el tipo de proceso por id_tipo
      return {
        ...proceso.toObject(),
        tipo: tipo ? tipo.nombre : null  // Si se encuentra, asignar el nombre del tipo, si no, null
      };
    });

    res.status(200).json(procesosConTipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los procesos' });
  }
};

// Controlador para eliminar un proceso
export const eliminarProceso = async (req, res) => {
  try {
    const { id_proceso } = req.params;

    // Verificar si el proceso existe
    const procesoExistente = await Proceso.findOne({ id_proceso });
    if (!procesoExistente) {
      return res.status(404).json({ mensaje: 'Proceso no encontrado' });
    }

    // Eliminar el proceso
    await Proceso.deleteOne({ id_proceso });
    res.status(200).json({ mensaje: 'Proceso eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el proceso' });
  }
};
