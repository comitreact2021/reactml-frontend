import React, { useEffect, useState } from 'react';
import PubCard from './PubCard';
import Row from 'react-bootstrap/Row';
import NavBarMisPublicaciones from './NavBarMisPublicaciones';
import PubEditorModal from './PubEditorModal';

import Swal from 'sweetalert2';

export default function PubsList(props) {
  const [publicaciones, setPublicaciones] = useState([]);

  const [showPubEditorModal, setShowPubEditorModal] = useState(false);
  const [selectedPub, setSelectedPub] = useState(null);

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
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      );
    });

    return cards;
  }

  const handleShowPubEditorModal = () => {
    setSelectedPub(null);
    setShowPubEditorModal(true);
  };

  const handleHidePubEditorModal = () => {
    setShowPubEditorModal(false);
  };

  const handlePubSaved = (message) => {
    getPubs();
    handleHidePubEditorModal();

    Swal.fire({
      text: message,
      icon: 'success',
    });
  };

  const handleEditClick = (idPub) => {
    console.log('Cargar los datos de la publicacion ' + idPub);

    setSelectedPub(idPub);

    setShowPubEditorModal(true);
  };

  const handleDeleteClick = async (idPub) => {
    const confirm = await Swal.fire({
      title: '¿Confirma que desea eliminar la publicación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    });

    //El usuario pulso Aceptar
    if (confirm.value) {
      const url = `http://localhost:8000/publicaciones/${idPub}`;

      const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.status === 'ok') {
        getPubs();
        Swal.fire({ title: data.message, icon: 'success' });
      } else {
        Swal.fire({ title: data.message, icon: 'error' });
      }
    }
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
        onPubSaved={handlePubSaved}
        idPub={selectedPub}
      />
    </>
  );
}
