const obtenerRutasPermitidas = (isAuthenticated, role) => {
    // Asegúrate de que el rol no sea undefined o null
    role = role ?? "";

    // Definir las rutas para el rol "Asistente"
    const rutasAsistente = [
        { nombre: "Agenda", ruta: "/agenda", roles: ["Asistente"] },
        { nombre: "Proceso", ruta: "/proceso", roles: ["Asistente"] },
        { nombre: "Facturas", ruta: "/factura", roles: ["Asistente"] },
        { nombre: "Cliente", ruta: "/cliente", roles: ["Asistente"] },
        { nombre: "Usuario", ruta: "/usuario", roles: ["Asistente"] },
    ];

    // Definir las rutas para el rol "Abogado"
    const rutasAbogado = [
        { nombre: "Abogado", ruta: "/abogado", roles: ["Abogado"] },
    ];

    // Definir las rutas para el rol "Cliente"
    const rutasUsuario = [
        { nombre: "Usuario", ruta: "/usuario", roles: ["Cliente"] },
    ];

    // Combina las rutas basadas en el rol del usuario
    let rutasPermitidas = [];

    if (isAuthenticated) {
        if (role === "Asistente") {
            rutasPermitidas = rutasAsistente;
        } else if (role === "Abogado") {
            rutasPermitidas = rutasAbogado;
        } else if (role === "Cliente") {
            rutasPermitidas = rutasUsuario;
        }
    }

    return rutasPermitidas;
};

export default obtenerRutasPermitidas;
