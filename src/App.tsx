import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Feature, Project } from './types';
import Banner from './components/Banner';
import About from './components/About';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import ContextPayloadViewer from './components/ContextPayloadViewer';
import FeatureForm from './components/FeatureForm';

const slugify = (text: string) => text.toString().toLowerCase()
  .replace(/\s+/g, '_')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '_')
  .replace(/^-+/, '')
  .replace(/-+$/, '');

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject = projects.find(p => p.id === activeProjectId);

  const handleAddProject = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
  };

  const handleAddFeature = (newFeature: Feature) => {
    if (!activeProjectId) return;
    setProjects(prev => prev.map(p => {
      if (p.id === activeProjectId) {
        return { ...p, features: [...p.features, newFeature] };
      }
      return p;
    }));
  };

  const handleUpdateFeature = (updatedFeature: Feature) => {
    if (!activeProjectId) return;
    setProjects(prev => prev.map(p => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          features: p.features.map(f => f.id === updatedFeature.id ? updatedFeature : f)
        };
      }
      return p;
    }));
  };

  const handleExportZip = async () => {
    if (!activeProject) return;

    const zip = new JSZip();

    zip.file('README.md', `# Projeto: ${activeProject.name}\n\n${activeProject.description}\n\nEste pacote contém as documentações técnicas estruturadas de todas as funcionalidades ativas preparadas sob a metodologia Context Flow.`);

    const approvedFeatures = activeProject.features.filter(f => f.isFormallyApproved);

    if (approvedFeatures.length === 0) {
      alert("Não há funcionalidades aprovadas neste projeto para exportar.");
      return;
    }

    approvedFeatures.forEach(feature => {
      const fileName = `${feature.id.toLowerCase()}_${slugify(feature.name)}.md`;
      
      const { specification: spec, frameworkRules } = feature;
      const markdownContent =
        `# ${feature.name} (${feature.id})\n\n` +
        `**Status:** Aprovado  \n` +
        `**Data:** ${new Date().toISOString().split('T')[0]}\n\n` +
        `## 1. Objetivo de Negócio\n\n${spec.objective || '_Não preenchido_'}\n\n` +
        `## 2. Regras de Negócio\n\n${spec.businessRules || '_Não preenchido_'}\n\n` +
        `## 3. Contrato da API (YAML / JSON)\n\n\`\`\`\n${spec.apiContract || ''}\n\`\`\`\n\n` +
        `## 4. Casos de Teste (BDD/Gherkin)\n\n${spec.testCases || '_Não preenchido_'}\n\n` +
        `## 5. Regras do Framework\n\n${frameworkRules.map(r => `* ${r}`).join('\n') || '_Não preenchido_'}\n`;

      zip.file(fileName, markdownContent);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `projeto_${slugify(activeProject.name)}_context_flow.zip`);
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <Banner />
      
      <main className="container">
        <About />
        
        {!activeProjectId ? (
          // --- TELA DE PROJETOS ---
          <>
            <ProjectForm onAddProject={handleAddProject} />
            <section className="mt-5 mb-3">
              <h2 className="h4 text-dark border-bottom pb-2">Meus Projetos</h2>
            </section>
            <ProjectList projects={projects} onSelectProject={setActiveProjectId} />
          </>
        ) : (
          // --- TELA DE FUNCIONALIDADES (PROJETO ATIVO) ---
          <>
            <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm border">
              <div>
                <button className="btn btn-sm btn-outline-secondary mb-2" onClick={() => setActiveProjectId(null)}>
                  <i className="bi bi-arrow-left me-1"></i> Voltar aos Projetos
                </button>
                <h2 className="h4 text-dark mb-0">Projeto: <span className="text-primary">{activeProject?.name}</span></h2>
                <p className="text-muted mb-0 small">{activeProject?.description}</p>
              </div>
              <button 
                className="btn btn-primary shadow-sm px-4"
                onClick={handleExportZip}
                disabled={activeProject?.features.filter(f => f.isFormallyApproved).length === 0}
              >
                <i className="bi bi-file-earmark-zip me-2"></i>
                Exportar Projeto (.zip)
              </button>
            </div>

            <FeatureForm onAddFeature={handleAddFeature} />
            
            <section className="mb-4 mt-5">
              <h3 className="h5 text-dark border-bottom pb-2 mb-4">Funcionalidades do Projeto</h3>
              
              {activeProject?.features.length === 0 ? (
                <div className="alert alert-warning text-center">
                  Nenhuma funcionalidade cadastrada neste projeto.
                </div>
              ) : (
                <div className="row g-4">
                  {activeProject?.features.map(feature => (
                    <div className="col-12 col-lg-6" key={feature.id}>
                      <ContextPayloadViewer 
                        feature={feature}
                        onUpdateFeature={handleUpdateFeature}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

      </main>
    </div>
  );
}

export default App;
