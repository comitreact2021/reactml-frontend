import React, { useEffect, useState } from 'react';
import PubCard from './PubCard';
import Row from 'react-bootstrap/Row';

export default function PubsList() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(getPubs, []);

  async function getPubs() {
    const url = 'http://localhost:8000/publicaciones';

    const response = await fetch(url);
    const data = await response.json();

    setPublicaciones(data);
  }

  function getCards() {
    const cards = publicaciones.map((publicacion) => {
      return (
        <PubCard
          titulo={publicacion.titulo}
          precio={publicacion.precio}
          imagen={publicacion.imagen}
        />
      );
    });

    return cards;
  }

  return (
    <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6">
      {getCards()}
    </Row>
  );
}
