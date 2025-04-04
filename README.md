# PlaceToVisit

Aplicação web para gerenciar destinos de viagem, desenvolvida com React, TypeScript e Vite.

## 🚀 Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- Material-UI (MUI)
- Framer Motion
- Axios
- JSON Server
- React Hooks
- Cypress

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/PlaceToVisit.git
cd PlaceToVisit
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Instale o JSON Server globalmente (se ainda não tiver):
```bash
npm install -g json-server
# ou
yarn global add json-server
```

## 🏃‍♂️ Executando o Projeto

1. Inicie o JSON Server (em um terminal separado):
```bash
json-server --watch db.json --port 3001
```

2. Em outro terminal, inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

3. Acesse a aplicação em `http://localhost:5173`

## 🧪 Testes Automatizados

O projeto utiliza Cypress para testes automatizados. Para rodar os testes:

1. Instale o Cypress (caso ainda não tenha):
```bash
npm install -D cypress
```

2. Para abrir o Cypress em modo interativo:
```bash
npx cypress open
```

3. Para rodar os testes em modo headless:
```bash
npx cypress run
```

### Estrutura dos Testes

Os testes estão organizados em:
- `cypress/e2e/`: Testes de fluxos completos
- `cypress/fixtures/`: Dados estáticos para os testes
- `cypress/support/`: Configurações e comandos personalizados

### Testes Disponíveis

- Adição de nova meta
- Edição de meta existente
- Exclusão de meta
- Validação de formulários

## 📝 Funcionalidades

- Adicionar metas de viagem
- Editar metas existentes
- Excluir metas
- Visualizar lista de metas
- Validação de formulários
- Interface responsiva
- Notificações de feedback
- Animações suaves com Framer Motion
- Testes automatizados

## 🛠 Estrutura do Projeto

```
src/
├── assets/         # Imagens e recursos estáticos
├── components/     # Componentes React
│   ├── CardCountry/    # Componente de card de país
│   ├── CardsArea/      # Área de cards
│   ├── FormPlace/      # Formulário de lugares
│   ├── FormsComponent/ # Componente do formulário para evitar repetição de código
│   ├── Header/         # Cabeçalho
│   └── SnackBarAlert/  # Componente de alerta
├── pages/          # Páginas da aplicação
├── services/       # Serviços de API
│   └── api.ts      # Centralização de chamadas à API
├── types/          # Definições de tipos TypeScript
│   └── index.ts    # Interfaces centralizadas
└── App.tsx         # Componente principal
```

## 🔄 API (JSON Server)

O projeto utiliza o JSON Server para simular uma API REST. O arquivo `db.json` contém os dados iniciais:

```json
{
  "countries": [
    {
      "id": "8758",
      "nome": "Canadá",
      "flag": "https://flagcdn.com/w320/ca.png",
      "local": "Vancouver",
      "meta": "04/2026"
    }
    // ... mais países
  ]
}
```

Endpoints disponíveis:
- GET /countries - Lista todos os países
- POST /countries - Adiciona um novo país
- PATCH /countries/:id - Atualiza um país
- DELETE /countries/:id - Remove um país
