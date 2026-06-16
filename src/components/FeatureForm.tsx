import React, { useState } from 'react';
import type { Feature, FeatureSpecification } from '../types';

interface FeatureFormProps {
  onAddFeature: (feature: Feature) => void;
}

const emptySpec = {
  objective: '',
  businessRules: '',
  apiContract: '',
  testCases: '',
};

const FeatureForm: React.FC<FeatureFormProps> = ({ onAddFeature }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newFeature: Feature = {
      id: `F${Date.now().toString(36).toUpperCase()}`,
      name,
      description,
      specification: emptySpec,
      frameworkRules: [],
      isFormallyApproved: false,
    };

    onAddFeature(newFeature);

    // Reset form
    setName('');
    setDescription('');
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-white">
        <h3 className="h5 mb-0 text-primary">
          <i className="bi bi-plus-circle me-2"></i>Cadastrar Nova Funcionalidade
        </h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-12">
              <label htmlFor="featureName" className="form-label fw-bold">Nome da Funcionalidade</label>
              <input type="text" className="form-control" id="featureName" placeholder="Ex: Integração PIX" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            
            <div className="col-12">
              <label htmlFor="featureDesc" className="form-label fw-bold">Descrição Breve</label>
              <input type="text" className="form-control" id="featureDesc" placeholder="Ex: Implementar geração de QRCode PIX." value={description} onChange={e => setDescription(e.target.value)} />
            </div>

            <div className="col-12 text-end mt-4">
              <button type="submit" className="btn btn-success px-4 shadow-sm">
                <i className="bi bi-save me-2"></i>Salvar Funcionalidade
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeatureForm;
