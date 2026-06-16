export interface FeatureSpecification {
  objective: string;           // 1. Objetivo de Negócio
  businessRules: string;       // 2. Regras de Negócio
  apiContract: string;         // 3. YAML / JSON da API
  testCases: string;           // 4. Casos de Teste (BDD/Gherkin)
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  specification: FeatureSpecification;
  frameworkRules: string[];
  isFormallyApproved: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  features: Feature[];
}
