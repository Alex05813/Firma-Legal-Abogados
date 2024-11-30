import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from '../models/UsersModel.js';
import dotenv from 'dotenv';

dotenv.config();

const Login = async (req, res) => {
    const { email, password } = req.body;

    // Verificar que JWT_SECRET está correctamente configurado
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET no está definido en el archivo .env');
        return res.status(500).json({ message: 'Error en el servidor: JWT_SECRET no definido' });
    }

    try {
        const user = await Usuario.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Usamos directamente el id_rol que está en el modelo Usuario
        const id_rol = user.id_rol;

        try {
            // Generamos el token usando el id_rol directamente
            const token = jwt.sign(
                { id: user._id, email: user.email, id_rol },  // Añadimos el id_rol directamente en el JWT
                process.env.JWT_SECRET,  // Cambié SECRET por JWT_SECRET
                { expiresIn: '1h' }
            );
            console.log('Token generado:', token);
            return res.json({ token });
        } catch (error) {
            console.error('Error al generar el JWT:', error);
            return res.status(500).json({ message: 'Error al generar el token' });
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export default Login;
