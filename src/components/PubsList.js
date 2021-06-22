import React from 'react';
import PubCard from './PubCard';

export default function PubsList() {
  return (
    <>
      <PubCard titulo="Heladera" precio={200} imagen="heladera.webp" />
      <PubCard titulo="RAM" precio={300} imagen="ram.webp" />
      <PubCard titulo="Go Pro" precio={400} imagen="gopro.webp" />
      <PubCard titulo="Micro" precio={500} imagen="micro.webp" />
      <PubCard titulo="Parlantes" precio={600} imagen="parlantes.webp" />
    </>
  );
}
