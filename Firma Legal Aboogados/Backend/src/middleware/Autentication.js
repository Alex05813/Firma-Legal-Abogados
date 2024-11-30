import jwt from 'jsonwebtoken';

// Middleware para verificar el token de autenticación
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }

    try {
        const bearerToken = token.split(' ')[1];
        const decoded = jwt.verify(bearerToken, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token de autenticación no válido' });
    }
};

// Middleware para verificar el rol del usuario
const verifyRole = (rolesPermitidos) => (req, res, next) => {
    const userRole = req.user.id_rol;

    if (Array.isArray(userRole)) {
        const hasRole = userRole.some(role => rolesPermitidos.includes(role));
        if (!hasRole) {
            return res.status(403).json({ message: 'Acceso Denegado: Rol no permitido' });
        }
    } else {
        if (!rolesPermitidos.includes(userRole)) {
            return res.status(403).json({ message: 'Acceso Denegado: Rol no permitido' });
        }
    }

    next();
};

// Exportando las funciones
export { verifyToken, verifyRole };
