import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Button, Table, Form, Card } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs"; 
import { motion } from "framer-motion";
import Notification from "../../components/Notification/Notification.jsx"; 
import Delete from "../../components/Delete/Delete.jsx";  
import '../../style/tableStyle.css';

function Agenda() {
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAgenda, setNewAgenda] = useState({
    id_agenda: "",
    fecha: "",
    hora: "",
    descripcion: "",
    estado: "programada",
    id_proceso: "",
  });

  const [processes, setProcesses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [showModal, setShowModal] = useState(false); 
  const [agendaToDelete, setAgendaToDelete] = useState(null); 

  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/agendas");
        setAgendas(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar las agendas");
        setLoading(false);
      }
    };
    fetchAgendas();
  }, []);

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/procesos");
        setProcesses(response.data);
      } catch (err) {
        setError("Error al cargar los procesos");
      }
    };
    fetchProcesses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAgenda({ ...newAgenda, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`http://localhost:9000/api/agendas/${newAgenda.id_agenda}`, newAgenda);
        setToastMessage("Agenda actualizada con éxito");
        setToastType("success");
        setShowToast(true);
        setIsEditing(false);
        setNewAgenda({
          id_agenda: "",
          fecha: "",
          hora: "",
          descripcion: "",
          estado: "programada",
          id_proceso: "",
        });
        const response = await axios.get("http://localhost:9000/api/agendas");
        setAgendas(response.data);
      } catch (err) {
        setToastMessage("Error al actualizar la agenda");
        setToastType("danger");
        setShowToast(true);
      }
    } else {
      try {
        await axios.post("http://localhost:9000/api/agendas", newAgenda);
        setToastMessage("Agenda creada con éxito");
        setToastType("success");
        setShowToast(true);
        setNewAgenda({
          id_agenda: "",
          fecha: "",
          hora: "",
          descripcion: "",
          estado: "programada",
          id_proceso: "",
        });
        const response = await axios.get("http://localhost:9000/api/agendas");
        setAgendas(response.data);
      } catch (err) {
        setToastMessage("Error al crear agenda");
        setToastType("danger");
        setShowToast(true);
      }
    }
  };

  const handleDelete = (agenda) => {
    setAgendaToDelete(agenda);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/agendas/${agendaToDelete.id_agenda}`);
      setToastMessage("Agenda eliminada con éxito");
      setToastType("success");
      setShowToast(true);
      setAgendas(agendas.filter(agenda => agenda.id_agenda !== agendaToDelete.id_agenda));
      setShowModal(false); 
    } catch (err) {
      setToastMessage("Error al eliminar agenda");
      setToastType("danger");
      setShowToast(true);
      setShowModal(false);
    }
  };

  const handleEdit = (agenda) => {
    setIsEditing(true);
    setNewAgenda({
      id_agenda: agenda.id_agenda,
      fecha: agenda.fecha,
      hora: agenda.hora,
      descripcion: agenda.descripcion,
      estado: agenda.estado,
      id_proceso: agenda.id_proceso,
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
            <Card.Header as="h5" className="text-center">{isEditing ? "Editar Agenda" : "Registrar Agenda"}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="id_agenda" className="mb-3">
                  <Form.Label>ID Agenda</Form.Label>
                  <Form.Control
                    type="text"
                    name="id_agenda"
                    value={newAgenda.id_agenda}
                    onChange={handleChange}
                    placeholder="Ingrese el ID de la agenda"
                    required
                    disabled={isEditing}
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="fecha" className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={newAgenda.fecha}
                    onChange={handleChange}
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="hora" className="mb-3">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    name="hora"
                    value={newAgenda.hora}
                    onChange={handleChange}
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="descripcion" className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="descripcion"
                    value={newAgenda.descripcion}
                    onChange={handleChange}
                    placeholder="Ingrese la descripción"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="estado" className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    name="estado"
                    value={newAgenda.estado}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="programada">Programada</option>
                    <option value="en progreso">En progreso</option>
                    <option value="finalizada">Finalizada</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="id_proceso" className="mb-3">
                  <Form.Label>Proceso</Form.Label>
                  <Form.Select
                    name="id_proceso"
                    value={newAgenda.id_proceso}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    {processes.map((process) => (
                      <option key={process._id} value={process._id}>
                        {process.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" block>
                  {isEditing ? "Actualizar Agenda" : "Registrar Agenda"}
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
                    <th>ID Agenda</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Proceso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {agendas.map((agenda) => (
                    <tr key={agenda.id_agenda}>
                      <td>{agenda.id_agenda}</td>
                      <td>{agenda.fecha}</td>
                      <td>{agenda.hora}</td>
                      <td>{agenda.descripcion}</td>
                      <td>{agenda.estado}</td>
                      <td>{agenda.proceso?.nombre || "No asignado"}</td>
                      <td>
                        <Button variant="info" onClick={() => handleEdit(agenda)} className="me-2">
                          <BsFillPencilFill />
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(agenda)}>
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

export default Agenda;
