import React from 'react';
import Card from 'react-bootstrap/Card';

export default function PubCard(props) {
  const imageUrl = `http://localhost:8000/images/${props.imagen}`;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />

      <Card.Body>
        <Card.Title>{props.titulo}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>

      <Card.Footer className="text-muted">$ {props.precio}</Card.Footer>
    </Card>
  );
}
