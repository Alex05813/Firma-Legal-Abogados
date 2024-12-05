import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Button, Table, Form, Card, Toast, Modal } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs"; 
import { FiCheckCircle, FiXCircle } from "react-icons/fi"; 
import { motion } from "framer-motion"; 
import '../../style/tableStyle.css';



function Usuario() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    numeroIdentificacion: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
    password: "",
    id_rol: "",
  });

  const [roles, setRoles] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [showModal, setShowModal] = useState(false); // Modal state for confirmation
  const [userToDelete, setUserToDelete] = useState(null); // Store the user to delete

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/usuarios");
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los usuarios");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/rols");
        setRoles(response.data);
      } catch (err) {
        setError("Error al cargar los roles");
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`http://localhost:9000/api/usuarios/${newUser.numeroIdentificacion}`, newUser);
        setToastMessage("Usuario actualizado con éxito");
        setToastType("success");
        setShowToast(true);
        setIsEditing(false);
        setNewUser({
          numeroIdentificacion: "",
          nombres: "",
          apellidos: "",
          telefono: "",
          email: "",
          password: "",
          id_rol: "",
        });
        const response = await axios.get("http://localhost:9000/api/usuarios");
        setUsers(response.data.data);
      } catch (err) {
        setToastMessage("Error al actualizar el usuario");
        setToastType("danger");
        setShowToast(true);
      }
    } else {
      try {
        await axios.post("http://localhost:9000/api/usuarios/create", newUser);
        setToastMessage("Usuario creado con éxito");
        setToastType("success");
        setShowToast(true);
        setNewUser({
          numeroIdentificacion: "",
          nombres: "",
          apellidos: "",
          telefono: "",
          email: "",
          password: "",
          id_rol: "",
        });
        const response = await axios.get("http://localhost:9000/api/usuarios");
        setUsers(response.data.data);
      } catch (err) {
        setToastMessage("Error al crear usuario");
        setToastType("danger");
        setShowToast(true);
      }
    }
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/usuarios/${userToDelete.numeroIdentificacion}`);
      setToastMessage("Usuario eliminado con éxito");
      setToastType("success");
      setShowToast(true);
      setUsers(users.filter(user => user.numeroIdentificacion !== userToDelete.numeroIdentificacion));
      setShowModal(false); // Close the modal
    } catch (err) {
      setToastMessage("Error al eliminar usuario");
      setToastType("danger");
      setShowToast(true);
      setShowModal(false); // Close the modal
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setNewUser({
      numeroIdentificacion: user.numeroIdentificacion,
      nombres: user.nombres,
      apellidos: user.apellidos,
      telefono: user.telefono,
      email: user.email,
      password: "",
      id_rol: user.id_rol,
    });
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="full-width">
      {/* Notification */}
      <Notification 
        showToast={showToast} 
        setShowToast={setShowToast} 
        toastMessage={toastMessage} 
        toastType={toastType} 
      />

      {/* Modal for Deletion Confirmation */}
      <Delete 
        showModal={showModal} 
        setShowModal={setShowModal} 
        confirmDelete={confirmDelete} 
      />

      <div className="row">
        <div className="col-md-4">
          <Card className="form-card">
            <Card.Header as="h5" className="text-center">{isEditing ? "Editar Usuario" : "Registrar Usuario"}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="numeroIdentificacion" className="mb-3">
                  <Form.Label>Número de Identificación</Form.Label>
                  <Form.Control
                    type="text"
                    name="numeroIdentificacion"
                    value={newUser.numeroIdentificacion}
                    onChange={handleChange}
                    placeholder="Ingrese el número de identificación"
                    required
                    disabled={isEditing}
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="nombres" className="mb-3">
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombres"
                    value={newUser.nombres}
                    onChange={handleChange}
                    placeholder="Ingrese los nombres"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="apellidos" className="mb-3">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={newUser.apellidos}
                    onChange={handleChange}
                    placeholder="Ingrese los apellidos"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="telefono" className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={newUser.telefono}
                    onChange={handleChange}
                    placeholder="Ingrese el teléfono"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    placeholder="Ingrese el email"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    placeholder="Ingrese la contraseña"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="id_rol" className="mb-3">
                  <Form.Label>Rol</Form.Label>
                  <Form.Control
                    as="select"
                    name="id_rol"
                    value={newUser.id_rol}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="">Seleccione un rol</option>
                    {roles.map((role) => (
                      <option key={role.id_rol} value={role.id_rol}>
                        {role.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" block>
                  {isEditing ? "Actualizar Usuario" : "Crear Usuario"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-8">
          <Card className="table-card">
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Número de Identificación</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.numeroIdentificacion}>
                      <td>{user.numeroIdentificacion}</td>
                      <td>{user.nombres} {user.apellidos}</td>
                      <td>{user.email}</td>
                      <td>{user.telefono}</td>
                      <td>{user.rol?.nombre}</td>
                      <td>
                        <Button variant="info" onClick={() => handleEdit(user)} className="me-2">
                          <BsFillPencilFill />
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(user)}>
                          <BsFillTrashFill />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Usuario;
