import { useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../Interfaces/IEmpleado"
import { Container, Row, Col, Table, Button } from "reactstrap"

export default function Lista() {

    const [empoleados, setEmpleados] = useState<IEmpleado[]>([])

    const obtenerEmpleados = async() => {
        const reponse = await fetch(`${appsettings.apiurl}Empleado/Lista`)
        if(reponse.ok){
            const data = await reponse.json()
            setEmpleados(data)
        }
    }

    useEffect(() => {
        obtenerEmpleados()
    },[])

    const Eliminar = (id:number) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "Eliminar empleado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const reponse = await fetch(`${appsettings.apiurl}Empleado/Eliminar/${id}`,{method:"DELETE"})
                if(reponse.ok){
                    await obtenerEmpleados()
                }
            }
          });
    }

  return (
    <Container className="mt-5">
        <Row>
           <Col>
           <h4>Lista de Empleados</h4>
           <hr />
           <Link className="btn btn-success mb-3" to="/nuevoempleado">Nuevo Empleado</Link>

            <Table bordered>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Sueldo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empoleados.map((item) => 
                        (
                            <tr key={item.idEmpleado}>
                                <td>{item.nombre}</td>
                                <td>{item.correo}</td>
                                <td>{item.sueldo}</td>
                                <td>
                                    <Link className="btn btn-primary me-2" to={`/editarempleado/${item.idEmpleado}`}>Editar</Link>
                                    <Button color="danger" onClick={() => {Eliminar(item.idEmpleado!)}}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

           </Col>
        </Row>
    </Container>
  )
}
