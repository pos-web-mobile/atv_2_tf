import React, { useState } from 'react';
import type { Project } from '../types';

interface ProjectFormProps {
  onAddProject: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProject: Project = {
      id: `P${Date.now().toString(36).toUpperCase()}`,
      name,
      description,
      features: [],
    };

    onAddProject(newProject);
    setName('');
    setDescription('');
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-white">
        <h3 className="h5 mb-0 text-primary">
          <i className="bi bi-folder-plus me-2"></i>Criar Novo Projeto
        </h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="projectName" className="form-label fw-bold">Nome do Projeto</label>
              <input type="text" className="form-control" id="projectName" placeholder="Ex: Sistema de Gestão" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="col-md-8">
              <label htmlFor="projectDesc" className="form-label fw-bold">Descrição</label>
              <input type="text" className="form-control" id="projectDesc" placeholder="Breve resumo sobre o objetivo do projeto..." value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="col-12 text-end mt-3">
              <button type="submit" className="btn btn-success px-4 shadow-sm">
                <i className="bi bi-save me-2"></i>Salvar Projeto
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
