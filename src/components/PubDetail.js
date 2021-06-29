import React, { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useParams } from 'react-router-dom';

export default function PubDetail() {
  const { id } = useParams();

  const [publicacion, setPublicacion] = useState(null);

  useEffect(cargarDetalle, []);

  async function cargarDetalle() {
    const url = 'http://localhost:8000/publicaciones/' + id;

    const response = await fetch(url);
    const data = await response.json();

    setPublicacion(data);
  }

  return (
    <Row className="d-flex justify-content-center">
      {publicacion && (
        <>
          <Col md={4} className="d-flex justify-content-center">
            <img
              src={`http://localhost:8000/images/${publicacion.imagen}`}
              className="img-fluid"
            ></img>
          </Col>
          <Col md={4}>
            <h2>{publicacion.titulo}</h2>
            <h3>${publicacion.precio}</h3>
          </Col>
        </>
      )}
    </Row>
  );
}
