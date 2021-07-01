import React, { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function PubEditorModal(props) {
  const [categorias, setCategorias] = useState([]);

  const [pubTitulo, setPubTitulo] = useState('');
  const [pubPrice, setPubPrice] = useState('');

  const [pubImage, setPubImage] = useState('');
  const [previewPubImage, setPreviewPubImage] = useState('');

  const [pubCategory, setPubCategory] = useState('');

  useEffect(() => {
    const url = 'http://localhost:8000/categorias';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
      });
  }, []);

  function getCategoriesOptions() {
    return categorias.map((categoria) => (
      <option value={categoria.id}>{categoria.nombre}</option>
    ));
  }

  const handlePubTituloChange = (event) => {
    setPubTitulo(event.target.value);
  };

  const handlePubPriceChange = (event) => {
    setPubPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setPubCategory(event.target.value);
  };

  const handlePubImageChange = (event) => {
    setPubImage(event.target.files[0]);

    setPreviewPubImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSave = () => {
    const formData = new FormData();

    formData.append('pubTitulo', pubTitulo);
    formData.append('pubPrice', pubPrice);
    formData.append('pubImage', pubImage);
    formData.append('pubCategory', pubCategory);

    let url, method;

    if (props.idPub) {
      //Modo edicion
      url = `http://localhost:8000/publicaciones/${props.idPub}`;
      method = 'PUT';
    } else {
      //Modo nuevo
      url = `http://localhost:8000/publicaciones`;
      method = 'POST';
    }

    fetch(url, {
      method: method,
      body: formData,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        props.onPubSaved(data.message);
      });
  };

  useEffect(() => {
    if (props.idPub) {
      const url = `http://localhost:8000/publicaciones/${props.idPub}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setPubTitulo(data.titulo);
          setPubPrice(data.precio);
          setPubImage('');
          setPreviewPubImage(`http://localhost:8000/images/${data.imagen}`);
          setPubCategory(data.cat_id);
        });
    } else {
      setPubTitulo('');
      setPubPrice('');
      setPubImage('');
      setPreviewPubImage('');
      setPubCategory('');
    }
  }, [props.idPub]);

  return (
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>Publicacion</Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              value={pubTitulo}
              onChange={handlePubTituloChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              value={pubPrice}
              onChange={handlePubPriceChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              as="select"
              value={pubCategory}
              onChange={handleCategoryChange}
            >
              {getCategoriesOptions()}
            </Form.Control>
          </Form.Group>

          <Form.Group className="d-flex justify-content-center">
            {previewPubImage && (
              <img style={{ height: '25vh' }} src={previewPubImage} />
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" onChange={handlePubImageChange} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleHide}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}
