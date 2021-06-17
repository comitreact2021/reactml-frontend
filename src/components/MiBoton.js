import React from 'react';

export default function MiBoton(props) {
  return (
    <button type="button" className={`btn btn-${props.estilo}`}>
      {props.children}
    </button>
  );
}
