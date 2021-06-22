import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export default function PubCard(props) {
  const imageUrl = `http://localhost:8000/images/${props.imagen}`;

  const cardImageStyle = {
    height: '40vh',
    objectFit: 'contain',
  };

  return (
    <Col className="my-4">
      <Card className="h-100">
        <Card.Img style={cardImageStyle} variant="top" src={imageUrl} />

        <Card.Body>
          <Card.Title>{props.titulo}</Card.Title>
        </Card.Body>

        <Card.Footer className="text-muted">$ {props.precio}</Card.Footer>
      </Card>
    </Col>
  );
}
