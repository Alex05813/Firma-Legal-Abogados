import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Button, Table, Form, Card, Toast, Modal } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import Notification from "../../components/Notification/Notification.jsx"; 
import Delete from "../../components/Delete/Delete.jsx";  
import '../../style/tableStyle.css';



function Proceso() {
  const [process, setProcess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProcess, setNewProcess] = useState({
    id_proceso: "",
    descripcion: "",
    fecha_inicio: "",
    estado: "",
    numeroIdentificacionCliente: "",
    numeroIdentificacionAbogado: "",
    id_tipo: "",
  });

  const [tipos, setTipos] = useState([]);
  const [alert, setAlert] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [processToDelete, setProcessToDelete] = useState(null);

  useEffect(() => {
    const fetchProcess = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/procesos");
        setProcess(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los procesos");
      }
    };
    fetchProcess();
  }, []);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/tipoprocesos");
        setTipos(response.data);
      } catch (err) {
        console.error("Error al cargar los tipos");
      }
    };
    fetchTipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProcess({ ...newProcess, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (isEditing) {
        try {
        await axios.put(`http://localhost:9000/api/procesos/${newProcess.id_proceso}`, newProcess);
        setToastMessage("Proceso actualizado con éxito");
        setToastType("success");
        setShowToast(true);
        setIsEditing(false);
        setNewProcess({
            id_proceso: "",
            descripcion: "",
            fecha_inicio: "",
            estado: "",
            numeroIdentificacionCliente: "",
            numeroIdentificacionAbogado: "",
            id_tipo: "",
        });
        const response = await axios.get("http://localhost:9000/api/procesos");
        setProcess(response.data.data);
        } catch (err) {
        setToastMessage("Error al actualizar el proceso");
        setToastType("danger");
        setShowToast(true);
        }
      } else {
        try {
            await axios.post("http://localhost:9000/api/procesos", newProcess);
            setToastMessage("Proceso creado con éxito");
            setToastType("success");
            setShowToast(true);
            setNewProcess({
                id_proceso: "",
                descripcion: "",
                fecha_inicio: "",
                estado: "",
                numeroIdentificacionCliente: "",
                numeroIdentificacionAbogado: "",
                id_tipo: "",
            });
            const response = await axios.get("http://localhost:9000/api/procesos");
            setProcess(response.data.data);
        } catch (err) {
            setToastMessage("Error al crear proceso");
            setToastType("danger");
            setShowToast(true);
        }
    }
};

  const handleDelete = (process) => {
    setProcessToDelete(process);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/procesos/${processToDelete.id_proceso}`);
      setToastMessage("Proceso eliminado con éxito");
      setToastType("success");
      setShowToast(true);
      setProcess(process.filter(p => p.id_proceso !== processToDelete.id_proceso));
      setShowModal(false);
    } catch (err) {
      setToastMessage("Error al eliminar el proceso");
      setToastType("danger");
      setShowToast(true);
      setShowModal(false);
    }
    
  };

  const handleEdit = (process) => {
    setIsEditing(true);
    setNewProcess({ 
        id_proceso: process.id_proceso,
        descripcion: process.descripcion,
        fecha_inicio: process.fecha_inicio,
        estado: process.estado,
        numeroIdentificacionCliente: process.numeroIdentificacionCliente,
        numeroIdentificacionAbogado: process.numeroIdentificacionAbogado,
        id_tipo: process.id_tipo,
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
            <Card.Header as="h5" className="text-center">{isEditing ? "Editar Proceso" : "Registrar Proceso"}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="id_proceso" className="mb-3">
                  <Form.Label>Id del proceso</Form.Label>
                  <Form.Control
                    type="number"
                    name="id_proceso"
                    value={newProcess.id_proceso}
                    onChange={handleChange}
                    placeholder="Ingrese el id del proceso"
                    required
                    disabled={isEditing}
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="descripcion" className="mb-3">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    type="string"
                    name="descripcion"
                    value={newProcess.descripcion}
                    onChange={handleChange}
                    placeholder="Ingrese la descripcion del proceso"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="fecha_inicio" className="mb-3">
                  <Form.Label>Fecha de Inicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_inicio"
                    value={newProcess.fecha_inicio}
                    onChange={handleChange}
                    placeholder="Ingrese la fecha de inicio del proceso"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="estado" className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    type="string"
                    name="estado"
                    value={newProcess.estado}
                    onChange={handleChange}
                    placeholder="Ingrese el estado del proceso"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="numeroIdentificacionCliente" className="mb-3">
                  <Form.Label>Numero de identificacion del cliente</Form.Label>
                  <Form.Control
                    type="string"
                    name="numeroIdentificacionCliente"
                    value={newProcess.numeroIdentificacionCliente}
                    onChange={handleChange}
                    placeholder="Ingrese el Numero de identificacion del cliente"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="numeroIdentificacionAbogado" className="mb-3">
                  <Form.Label>Numero de identificacion del abogado</Form.Label>
                  <Form.Control
                    type="string"
                    name="numeroIdentificacionAbogado"
                    value={newProcess.numeroIdentificacionAbogado}
                    onChange={handleChange}
                    placeholder="Ingrese el Numero de identificacion del abogado"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="id_tipo" className="mb-3">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control
                    as="select"
                    name="id_tipo"
                    value={newProcess.id_tipo}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="">Seleccione un tipo</option>
                    {tipos.map((tipo) => (
                      <option key={tipo.id_tipo} value={tipo.id_tipo}>
                        {tipo.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" block>
                  {isEditing ? "Actualizar Proceso" : "Crear Proceso"}
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
                    <th>ID Proceso</th>
                    <th>Descripcion</th>
                    <th>Fecha Inicio</th>
                    <th>Estado</th>
                    <th>Cliente</th>
                    <th>Abogado</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {process.map((process) => (
                    <tr key={process.id_proceso}>
                    <td>{process.id_proceso}</td> 
                    <td>{process.descripcion}</td>
                    <td>{process.fecha_inicio}</td>
                    <td>{process.estado}</td>
                    <td>{process.numeroIdentificacionCliente}</td>
                    <td>{process.numeroIdentificacionAbogado}</td>
                    <td>{process.tipo?.nombre}</td>
                    <td>
                        <Button variant="info" onClick={() => handleEdit(process)} className="me-2">
                          <BsFillPencilFill />
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(process)}>
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

export default Proceso;