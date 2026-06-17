# Context Flow — Gerenciador de Contexto Orientado a Funcionalidades

> **Frontend de apresentação** — Esta aplicação é uma demonstração de interface (UI Prototype) e não possui integração com nenhuma API ou banco de dados. Todos os dados são gerenciados em memória (estado React) e são perdidos ao recarregar a página. A integração com backend está planejada para uma versão futura.

---

## 📌 Sobre o Projeto

O **Context Flow** é uma ferramenta de apoio à engenharia de software projetada para a era da IA. Seu objetivo é organizar a documentação técnica de um projeto de forma hierárquica e modular, garantindo que cada funcionalidade tenha sua especificação consolidada **antes** de qualquer linha de código ser gerada.

O fluxo de trabalho segue a metodologia *Feature-Driven Specification*: o desenvolvedor cria um **Projeto**, dentro dele cadastra as **Funcionalidades**, e para cada funcionalidade preenche cinco camadas de documentação — Objetivo de Negócio, Regras de Negócio, Contrato de API, Casos de Teste e Regras do Framework. Somente após a aprovação formal de cada funcionalidade, o sistema libera a geração de um pacote `.zip` contendo artefatos Markdown estruturados e prontos para serem injetados em agentes de IA, que atuam como "digitadores especializados" sob controle total do desenvolvedor.

---

## 🚀 Como Iniciar o Projeto

### Pré-requisitos

- **Node.js** v18 ou superior
- **npm** v9 ou superior

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/pos-web-mobile/atv_2_tf
cd atv_2_tf
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador: [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── Banner.tsx               # Cabeçalho hero da aplicação
│   ├── About.tsx                # Seção "Sobre o Processo"
│   ├── ProjectForm.tsx          # Formulário de criação de projetos
│   ├── ProjectList.tsx          # Listagem de cards de projetos
│   ├── FeatureForm.tsx          # Formulário de cadastro de funcionalidades
│   └── ContextPayloadViewer.tsx # Card de visualização/edição da documentação técnica
├── types.ts                     # Interfaces TypeScript (Project, Feature, FeatureSpecification)
├── App.tsx                      # Componente raiz e gerenciamento de estado
└── main.tsx                     # Ponto de entrada
```

---

## 🔄 Fluxo de Uso

1. **Crie um Projeto** na tela inicial, informando nome e descrição.
2. **Acesse o Projeto** clicando no card. Você será redirecionado para a tela de funcionalidades.
3. **Cadastre uma Funcionalidade** preenchendo apenas o nome e a descrição brevemente.
4. **Preencha a Documentação Técnica** clicando em "Preencher Documentação" no card da funcionalidade. O editor apresenta os 5 campos estruturados da metodologia Context Flow.
5. **Salve** o rascunho quando quiser ou clique em **Aprovar** para liberar a funcionalidade.
6. **Exporte o Contexto** clicando em "Exportar Projeto (.zip)". O pacote conterá um `README.md` e um arquivo `.md` isolado por funcionalidade aprovada, prontos para uso em agentes de IA.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React | 19 | Framework de UI |
| TypeScript | 6 | Tipagem estática |
| Vite | 8 | Build tool e dev server |
| Bootstrap 5 | 5 | Estilização e componentes |
| Bootstrap Icons | — | Ícones da interface |
| JSZip | — | Geração do arquivo `.zip` |
| file-saver | — | Download do arquivo no navegador |