import React, { useEffect, useState } from 'react';
import PubCard from './PubCard';
import Row from 'react-bootstrap/Row';
import NavBarMisPublicaciones from './NavBarMisPublicaciones';
import PubEditorModal from './PubEditorModal';

export default function PubsList(props) {
  const [publicaciones, setPublicaciones] = useState([]);

  const [showPubEditorModal, setShowPubEditorModal] = useState(false);

  useEffect(getPubs, [props.type]);

  async function getPubs() {
    let url = 'http://localhost:8000/publicaciones';

    if (props.type === 'mispublicaciones') {
      url += '/userpubs';
    } else if (props.type === 'favoritos') {
      url += '/favoritos';
    }

    const response = await fetch(url, { credentials: 'include' });
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
          id={publicacion.id}
          type={props.type}
        />
      );
    });

    return cards;
  }

  const handleShowPubEditorModal = () => {
    setShowPubEditorModal(true);
  };

  const handleHidePubEditorModal = () => {
    setShowPubEditorModal(false);
  };

  return (
    <>
      {props.type === 'mispublicaciones' && (
        <NavBarMisPublicaciones onNewPubClick={handleShowPubEditorModal} />
      )}

      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6">
        {getCards()}
      </Row>

      <PubEditorModal
        show={showPubEditorModal}
        handleHide={handleHidePubEditorModal}
      />
    </>
  );
}
