import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function NavBarMisPublicaciones(props) {
  return (
    <Row className="my-3 ml-2">
      <Col>
        <Button onClick={props.onNewPubClick}>Nueva publicación</Button>
      </Col>
    </Row>
  );
}
