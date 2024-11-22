import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API con conexión a MongoDB',
      version: '1.0.0',
      description: 'Ejemplo de API con MongoDB para gestionar usuarios, abogados, asistentes, clientes, roles y facturas',
      contact: {
        name: 'API Support',
        url: '',
        email: 'supportADSO@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:9000',
        description: 'Documentación de mi API Rest',
      },
    ],
    components: {
      schemas: {
        // Esquema para Usuario
        Usuario: {
          type: 'object',
          properties: {
            username: { type: 'string', description: 'Nombre de usuario' },
            email: { type: 'string', description: 'Correo electrónico del usuario' },
            password: { type: 'string', description: 'Contraseña del usuario' },
          },
          required: ['username', 'email', 'password'],
        },

        // Esquema para Abogado
        Abogado: {
          type: 'object',
          properties: {
            nombre: { type: 'string', description: 'Nombre del abogado' },
            apellido: { type: 'string', description: 'Apellido del abogado' },
            email: { type: 'string', description: 'Correo electrónico del abogado' },
            telefono: { type: 'string', description: 'Teléfono del abogado' },
          },
          required: ['nombre', 'apellido', 'email'],
        },

        // Esquema para Proceso
        Proceso: {
          type: 'object',
          properties: {
            id_proceso: { type: 'number', description: 'Número único que identifica el proceso' },
            descripcion: { type: 'string', description: 'Descripción detallada del proceso' },
            fecha_inicio: { type: 'string', format: 'date-time', description: 'Fecha de inicio del proceso (ISO 8601)' },
            estado: {
              type: 'string',
              enum: ['activo', 'inactivo'],
              description: 'Estado actual del proceso (activo/inactivo)',
            },
            numeroIdentificacionCliente: { type: 'string', description: 'Número de identificación del cliente asociado al proceso' },
            numeroIdentificacionAbogado: { type: 'string', description: 'Número de identificación del abogado asignado al proceso' },
            id_tipo: { type: 'number', description: 'Tipo de proceso (por ejemplo: penal, civil, laboral)' },
          },
          required: ['id_proceso', 'descripcion', 'fecha_inicio', 'estado', 'numeroIdentificacionCliente', 'numeroIdentificacionAbogado', 'id_tipo'],
        },

        // Esquema para Tipo de Proceso
        TipoProcess: {
          type: 'object',
          properties: {
            id_tipo: { type: 'number', description: 'Número único que identifica el tipo de proceso' },
            nombre: { type: 'string', description: 'Nombre del tipo de proceso (por ejemplo: "Notariales", "Juzgados", "Curadurías")' },
          },
          required: ['id_tipo', 'nombre'],
        },
      },
    },
  },
  apis: [
    './src/routes/UsersRoutes.js',
    './src/routes/AbogadoRoutes.js',
    './src/routes/AsistenteRoutes.js',
    './src/routes/ClienteRoutes.js',
    './src/routes/RoleRoutes.js',
    './src/routes/ProcessRoutes.js',
    './src/routes/TipoprocessRoutes.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerJSDocs = (app, port) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(
    `Versión No 1 de la documentación estará disponible en http://localhost:${port}/api-docs`
  );
};

export { swaggerJSDocs };
