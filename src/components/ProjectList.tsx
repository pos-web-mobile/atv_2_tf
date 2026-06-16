import React from 'react';
import type { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject }) => {
  if (projects.length === 0) {
    return (
      <div className="alert alert-info text-center">
        <i className="bi bi-info-circle me-2"></i>
        Nenhum projeto cadastrado. Crie o primeiro projeto acima.
      </div>
    );
  }

  return (
    <div className="row g-4">
      {projects.map(project => (
        <div className="col-12 col-md-6" key={project.id}>
          <div className="card border-0 shadow-sm h-100 project-card" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => onSelectProject(project.id)}>
            <div className="card-body d-flex flex-column">
              <h4 className="card-title text-dark">
                <i className="bi bi-folder2-open text-primary me-2"></i>
                {project.name}
              </h4>
              <p className="card-text text-muted mb-4">{project.description || 'Sem descrição.'}</p>
              
              <div className="mt-auto d-flex justify-content-between align-items-center border-top pt-3">
                <span className="badge bg-light text-dark border">
                  {project.features.length} Funcionalidades
                </span>
                <button className="btn btn-sm btn-outline-primary">
                  Acessar <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
