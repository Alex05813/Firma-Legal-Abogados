import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Button, Table, Form, Card, Toast, Modal } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import Notification from "../../components/Notification/Notification.jsx";  // Importamos Notification
import Delete from "../../components/Delete/Delete.jsx";  // Importamos Delete
import '../../style/tableStyle.css';

function Cliente() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newClient, setNewClient] = useState({
    numeroIdentificacion: "",
    direccion: "",
    estado: "activo",
    estado_cliente: "potencial",
  });

  const [alert, setAlert] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/clientes");
        setClients(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los clientes");
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`http://localhost:9000/api/clientes/${newClient.numeroIdentificacion}`, newClient);
        setToastMessage("Cliente actualizado con éxito");
        setToastType("success");
        setShowToast(true);
        setIsEditing(false);
        setNewClient({
          numeroIdentificacion: "",
          direccion: "",
          estado: "activo",
          estado_cliente: "potencial",
        });
        const response = await axios.get("http://localhost:9000/api/clientes");
        setClients(response.data.data);
      } catch (err) {
        setToastMessage("Error al actualizar el cliente");
        setToastType("danger");
        setShowToast(true);
      }
    } else {
      try {
        await axios.post("http://localhost:9000/api/clientes", newClient);
        setToastMessage("Cliente creado con éxito");
        setToastType("success");
        setShowToast(true);
        setNewClient({
          numeroIdentificacion: "",
          direccion: "",
          estado: "",
          estado_cliente: "",
        });
        const response = await axios.get("http://localhost:9000/api/clientes");
        setClients(response.data.data);
      } catch (err) {
        setToastMessage("Error al crear cliente");
        setToastType("danger");
        setShowToast(true);
      }
    }
  };

  const handleDelete = (client) => {
    setClientToDelete(client);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/clientes/${clientToDelete.numeroIdentificacion}`);
      setToastMessage("Cliente eliminado con éxito");
      setToastType("success");
      setShowToast(true);
      setClients(clients.filter(client => client.numeroIdentificacion !== clientToDelete.numeroIdentificacion));
      setShowModal(false);
    } catch (err) {
      setToastMessage("Error al eliminar cliente");
      setToastType("danger");
      setShowToast(true);
      setShowModal(false);
    }
  };

  const handleEdit = (client) => {
    setIsEditing(true);
    setNewClient({
      numeroIdentificacion: client.numeroIdentificacion,
      direccion: client.direccion,
      estado: client.estado,
      estado_cliente: client.estado_cliente,
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
      {/* Toast Notification */}
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
            <Card.Header as="h5" className="text-center">{isEditing ? "Editar Cliente" : "Registrar Cliente"}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="numeroIdentificacion" className="mb-3">
                  <Form.Label>Número de Identificación</Form.Label>
                  <Form.Control
                    type="text"
                    name="numeroIdentificacion"
                    value={newClient.numeroIdentificacion}
                    onChange={handleChange}
                    placeholder="Ingrese el número de identificación"
                    disabled={isEditing}
                    required
                    className="line-input"
                  />
                </Form.Group>
                <Form.Group controlId="direccion" className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={newClient.direccion}
                    onChange={handleChange}
                    placeholder="Ingrese la direccion"
                    disabled={isEditing}
                    required
                    className="line-input"
                  />
                </Form.Group>
                <Form.Group controlId="estado" className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    name="estado"
                    value={newClient.estado}
                    onChange={handleChange}
                    placeholder="Ingrese el estado del cliente"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="estado_cliente" className="mb-3">
                  <Form.Label>Estado del Cliente</Form.Label>
                  <Form.Control
                    as="select"
                    name="estado_cliente"
                    value={newClient.estado_cliente}
                    onChange={handleChange}
                    placeholder="Ingrese el estado del cliente"
                  >
                    <option value="potencial">Potencial</option>
                    <option value="cliente">Cliente</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" block>
                  {isEditing ? "Actualizar Cliente" : "Registrar Cliente"}
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
                    <th>Dirección</th>
                    <th>Estado</th>
                    <th>Estado del Cliente</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(client => (
                    <tr key={client.numeroIdentificacion}>
                      <td>{client.numeroIdentificacion}</td>
                      <td>{client.direccion}</td>
                      <td>{client.estado}</td>
                      <td>{client.estado_cliente}</td>
                      <td>
                        <Button variant="info" onClick={() => handleEdit(client)}><BsFillPencilFill /></Button>
                        <Button variant="danger" onClick={() => handleDelete(client)}><BsFillTrashFill /></Button>
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

export default Cliente;
