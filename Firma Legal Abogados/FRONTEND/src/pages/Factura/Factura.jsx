import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Button, Table, Form, Card, Toast, Modal } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import Notification from "../../components/Notification/Notification.jsx"; 
import Delete from "../../components/Delete/Delete.jsx"; 
import '../../style/tableStyle.css';


function Factura() {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newFactura, setNewFactura] = useState({
    id_factura: "",
    monto: "",
    fecha_emision: "",
    fecha_vencimiento: "",
    estado: "",
    metodo_pago: "",
    id_proceso: "",
  });

  const [procesos, setProcesos] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [showModal, setShowModal] = useState(false); // Modal state for confirmation
  const [facturaToDelete, setFacturaToDelete] = useState(null); // Store the factura to delete

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/facturas");
        setFacturas(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar las facturas");
        setLoading(false);
      }
    };
    fetchFacturas();
  }, []);

  useEffect(() => {
    const fetchProcesos = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/procesos");
        setProcesos(response.data);
      } catch (err) {
        setError("Error al cargar los procesos");
      }
    };
    fetchProcesos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFactura({ ...newFactura, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`http://localhost:9000/api/facturas/${newFactura.id_factura}`, newFactura);
        setToastMessage("Factura actualizada con éxito");
        setToastType("success");
        setShowToast(true);
        setIsEditing(false);
        setNewFactura({
          id_factura: "",
          monto: "",
          fecha_emision: "",
          fecha_vencimiento: "",
          estado: "",
          metodo_pago: "",
          id_proceso: "",
        });
        const response = await axios.get("http://localhost:9000/api/facturas");
        setFacturas(response.data.data);
      } catch (err) {
        setToastMessage("Error al actualizar la factura");
        setToastType("danger");
        setShowToast(true);
      }
    } else {
      try {
        await axios.post("http://localhost:9000/api/facturas", newFactura);
        setToastMessage("Factura creada con éxito");
        setToastType("success");
        setShowToast(true);
        setNewFactura({
          id_factura: "",
          monto: "",
          fecha_emision: "",
          fecha_vencimiento: "",
          estado: "",
          metodo_pago: "",
          id_proceso: "",
        });
        const response = await axios.get("http://localhost:9000/api/facturas");
        setFacturas(response.data.data);
      } catch (err) {
        setToastMessage("Error al crear factura");
        setToastType("danger");
        setShowToast(true);
      }
    }
  };

  const handleDelete = (factura) => {
    setFacturaToDelete(factura);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/facturas/${facturaToDelete.id_factura}`);
      setToastMessage("Factura eliminada con éxito");
      setToastType("success");
      setShowToast(true);
      setFacturas(facturas.filter(factura => factura.id_factura !== facturaToDelete.id_factura));
      setShowModal(false); // Close the modal
    } catch (err) {
      setToastMessage("Error al eliminar factura");
      setToastType("danger");
      setShowToast(true);
      setShowModal(false); // Close the modal
    }
  };

  const handleEdit = (factura) => {
    setIsEditing(true);
    setNewFactura({
      id_factura: factura.id_factura,
      monto: factura.monto,
      fecha_emision: factura.fecha_emision,
      fecha_vencimiento: factura.fecha_vencimiento,
      estado: factura.estado,
      metodo_pago: factura.metodo_pago,
      id_proceso: factura.id_proceso,
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
            <Card.Header as="h5" className="text-center">{isEditing ? "Editar Factura" : "Registrar Factura"}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="id_factura" className="mb-3">
                  <Form.Label>ID Factura</Form.Label>
                  <Form.Control
                    type="number"
                    name="id_factura"
                    value={newFactura.id_factura}
                    onChange={handleChange}
                    placeholder="Ingrese el ID de la factura"
                    required
                    disabled={isEditing}
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="monto" className="mb-3">
                  <Form.Label>Monto</Form.Label>
                  <Form.Control
                    type="text"
                    name="monto"
                    value={newFactura.monto}
                    onChange={handleChange}
                    placeholder="Ingrese el monto"
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="fecha_emision" className="mb-3">
                  <Form.Label>Fecha de Emisión</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_emision"
                    value={newFactura.fecha_emision}
                    onChange={handleChange}
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="fecha_vencimiento" className="mb-3">
                  <Form.Label>Fecha de Vencimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_vencimiento"
                    value={newFactura.fecha_vencimiento}
                    onChange={handleChange}
                    required
                    className="line-input"
                  />
                </Form.Group>

                <Form.Group controlId="estado" className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    name="estado"
                    value={newFactura.estado}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagada">Pagada</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="metodo_pago" className="mb-3">
                  <Form.Label>Método de Pago</Form.Label>
                  <Form.Control
                    as="select"
                    name="metodo_pago"
                    value={newFactura.metodo_pago}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta">Tarjeta</option>
                    <option value="Transferencia">Transferencia</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="id_proceso" className="mb-3">
                  <Form.Label>Proceso Asociado</Form.Label>
                  <Form.Control
                    as="select"
                    name="id_proceso"
                    value={newFactura.id_proceso}
                    onChange={handleChange}
                    required
                    className="line-input"
                  >
                    {procesos.map((proceso) => (
                      <option key={proceso.id_proceso} value={proceso.id_proceso}>
                        {proceso.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    {isEditing ? "Actualizar Factura" : "Crear Factura"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-8">
          <Table responsive bordered hover className="mt-4">
            <thead>
              <tr>
                <th>ID Factura</th>
                <th>Monto</th>
                <th>Fecha Emisión</th>
                <th>Fecha Vencimiento</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura) => (
                <tr key={factura.id_factura}>
                  <td>{factura.id_factura}</td>
                  <td>{factura.monto}</td>
                  <td>{factura.fecha_emision}</td>
                  <td>{factura.fecha_vencimiento}</td>
                  <td>{factura.estado}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(factura)} className="me-2">
                      <BsFillPencilFill size={18} />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(factura)}>
                      <BsFillTrashFill size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Factura;
