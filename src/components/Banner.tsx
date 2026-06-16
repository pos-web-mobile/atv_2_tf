import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="bg-primary text-white text-center py-5 mb-4 shadow-sm">
      <div className="container">
        <h1 className="display-4 fw-bold">Gerenciador de Contexto Orientado a Funcionalidades</h1>
        <p className="lead mt-3">
          Orquestre a documentação de requisitos e gere payloads de IA acoplados a funcionalidades bem definidas.
        </p>
      </div>
    </div>
  );
};

export default Banner;
