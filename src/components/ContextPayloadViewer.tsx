import React, { useState } from 'react';
import type { Feature, FeatureSpecification } from '../types';

interface ContextPayloadViewerProps {
  feature: Feature;
  onUpdateFeature: (updatedFeature: Feature) => void;
}

const SPEC_FIELDS: {
  key: keyof FeatureSpecification;
  label: string;
  icon: string;
  placeholder: string;
  rows: number;
}[] = [
  {
    key: 'objective',
    label: '1. Objetivo de Negócio',
    icon: 'bi-bullseye',
    placeholder: 'Qual problema real essa feature resolve? Como sabemos que ela funciona?',
    rows: 3,
  },
  {
    key: 'businessRules',
    label: '2. Regras de Negócio',
    icon: 'bi-list-check',
    placeholder: '- Regra 1: ...\n- Regra 2: ...\n- Anti-Escopo: O que esta feature NÃO vai fazer.',
    rows: 4,
  },
  {
    key: 'apiContract',
    label: '3. Contrato da API (YAML / JSON)',
    icon: 'bi-file-code',
    placeholder: '# YAML\nPOST /api/v1/resource:\n  body:\n    field: string\n  response:\n    id: string',
    rows: 6,
  },
  {
    key: 'testCases',
    label: '4. Casos de Teste (BDD/Gherkin)',
    icon: 'bi-shield-check',
    placeholder: 'Dado que...\nQuando...\nEntão...',
    rows: 4,
  },
];

const emptySpec: FeatureSpecification = {
  objective: '',
  businessRules: '',
  apiContract: '',
  testCases: '',
};

function calcProgress(spec: FeatureSpecification, rules: string): number {
  const fields = [spec.objective, spec.businessRules, spec.apiContract, spec.testCases, rules];
  const filled = fields.filter(f => f.trim().length > 0).length;
  return Math.round((filled / fields.length) * 100);
}

const progressColor = (pct: number) => {
  if (pct < 40) return 'bg-danger';
  if (pct < 80) return 'bg-warning';
  return 'bg-success';
};

const ContextPayloadViewer: React.FC<ContextPayloadViewerProps> = ({ feature, onUpdateFeature }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSpec, setEditSpec] = useState<FeatureSpecification>({ ...feature.specification });
  const [editRules, setEditRules] = useState(feature.frameworkRules.join('\n'));

  const liveProgress = calcProgress(editSpec, editRules);
  const savedProgress = calcProgress(feature.specification, feature.frameworkRules.join('\n'));

  const handleSpecChange = (key: keyof FeatureSpecification, value: string) => {
    setEditSpec(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const rulesArray = editRules.split('\n').map(r => r.trim()).filter(r => r.length > 0);
    onUpdateFeature({ ...feature, specification: editSpec, frameworkRules: rulesArray, isFormallyApproved: feature.isFormallyApproved });
    setIsEditing(false);
  };

  const handleApprove = () => {
    const rulesArray = editRules.split('\n').map(r => r.trim()).filter(r => r.length > 0);
    onUpdateFeature({ ...feature, specification: editSpec, frameworkRules: rulesArray, isFormallyApproved: true });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditSpec({ ...feature.specification });
    setEditRules(feature.frameworkRules.join('\n'));
    setIsEditing(true);
  };

  // ─── EDITING MODE ────────────────────────────────────────────────────────────
  if (isEditing) {
    return (
      <div className="card border-0 shadow border-top border-primary border-3">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>
              <i className="bi bi-pencil-square me-2"></i>
              <strong>{feature.id}</strong> — {feature.name}
            </span>
            <small>{liveProgress}% preenchido</small>
          </div>
          <div className="progress" style={{ height: '6px' }}>
            <div
              className={`progress-bar ${progressColor(liveProgress)}`}
              role="progressbar"
              style={{ width: `${liveProgress}%`, transition: 'width 0.4s ease' }}
            ></div>
          </div>
        </div>

        <div className="card-body">
          {SPEC_FIELDS.map(field => (
            <div className="mb-3" key={field.key}>
              <label className="form-label fw-semibold text-dark small">
                <i className={`bi ${field.icon} me-1 text-primary`}></i>
                {field.label}
              </label>
              <textarea
                className="form-control font-monospace"
                style={{ fontSize: '0.85rem' }}
                rows={field.rows}
                placeholder={field.placeholder}
                value={editSpec[field.key]}
                onChange={e => handleSpecChange(field.key, e.target.value)}
              ></textarea>
            </div>
          ))}

          <div className="mb-1">
            <label className="form-label fw-semibold text-dark small">
              <i className="bi bi-gear me-1 text-primary"></i>
              5. Regras do Framework (uma por linha)
            </label>
            <textarea
              className="form-control font-monospace"
              style={{ fontSize: '0.85rem' }}
              rows={3}
              placeholder="Ex: Usar Axios&#10;Criar Services separados"
              value={editRules}
              onChange={e => setEditRules(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="card-footer bg-white d-flex justify-content-between align-items-center">
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-primary" onClick={handleSave}>
              <i className="bi bi-floppy me-1"></i>Salvar
            </button>
            <button className="btn btn-sm btn-success" onClick={handleApprove}>
              <i className="bi bi-check2-circle me-1"></i>Aprovar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── PENDING (not approved) ───────────────────────────────────────────────────
  if (!feature.isFormallyApproved) {
    return (
      <div className="card border-0 shadow-sm h-100 bg-light opacity-75">
        <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
          <span className="small"><strong>{feature.id}</strong> — {feature.name}</span>
          <span className="badge bg-danger rounded-pill"><i className="bi bi-lock-fill me-1"></i>Pendente</span>
        </div>
        <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-4">
          <i className="bi bi-file-earmark-lock text-secondary mb-3" style={{ fontSize: '2.5rem' }}></i>
          <p className="text-muted small mb-3">Preencha as 5 etapas de especificação para liberar esta funcionalidade.</p>
          <button className="btn btn-sm btn-primary" onClick={handleEdit}>
            <i className="bi bi-pencil me-1"></i>Preencher Documentação
          </button>
        </div>
      </div>
    );
  }

  // ─── APPROVED VIEW ────────────────────────────────────────────────────────────
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header bg-success text-white">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="small"><strong>{feature.id}</strong> — {feature.name}</span>
          <div>
            <span className="badge bg-light text-success rounded-pill me-2">
              <i className="bi bi-check-circle-fill me-1"></i>{savedProgress}% completo
            </span>
            <button className="btn btn-sm btn-outline-light border-0 p-0 px-1" title="Editar" onClick={handleEdit}>
              <i className="bi bi-pencil"></i>
            </button>
          </div>
        </div>
        <div className="progress" style={{ height: '5px' }}>
          <div className={`progress-bar bg-light`} role="progressbar" style={{ width: `${savedProgress}%` }}></div>
        </div>
      </div>

      <div className="card-body" style={{ fontSize: '0.88rem' }}>
        {SPEC_FIELDS.map(field =>
          feature.specification[field.key] ? (
            <div className="mb-3" key={field.key}>
              <h6 className="fw-semibold text-primary mb-1" style={{ fontSize: '0.8rem' }}>
                <i className={`bi ${field.icon} me-1`}></i>{field.label}
              </h6>
              <pre className="bg-light p-2 rounded mb-0 text-wrap" style={{ fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
                {feature.specification[field.key]}
              </pre>
            </div>
          ) : null
        )}

        {feature.frameworkRules.length > 0 && (
          <div className="mb-1">
            <h6 className="fw-semibold text-primary mb-1" style={{ fontSize: '0.8rem' }}>
              <i className="bi bi-gear me-1"></i>5. Regras do Framework
            </h6>
            <ul className="mb-0 ps-3" style={{ fontSize: '0.82rem' }}>
              {feature.frameworkRules.map((rule, idx) => <li key={idx}>{rule}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextPayloadViewer;
