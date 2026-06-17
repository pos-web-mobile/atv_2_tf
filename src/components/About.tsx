import React from 'react';

const About: React.FC = () => {
  return (
    <section className="mb-5">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h2 className="card-title h4 mb-3 text-primary">
            <i className="bi bi-info-circle me-2"></i>Sobre o Processo
          </h2>
          <p className="card-text text-muted">
            Este sistema adota um modelo hierárquico rígido onde cada payload ou documentação deve estar atrelado a uma <strong>Funcionalidade</strong>.
          </p>
          <ol className="list-group list-group-numbered list-group-flush mt-3">
            <li className="list-group-item border-0"><strong>Cadastro:</strong> Uma nova funcionalidade é definida, possuindo um escopo técnico e um conjunto de regras de framework associadas.</li>
            <li className="list-group-item border-0"><strong>Governança:</strong> Um desenvolvedor deve analisar os requisitos e assinar a aprovação formal da funcionalidade.</li>
            <li className="list-group-item border-0"><strong>Exportação:</strong> Funcionalidades aprovadas podem ser exportadas em um pacote consolidado (`.zip`), onde cada funcionalidade vira um artefato isolado em `.md` pronto para alimentar agentes de IA.</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default About;
