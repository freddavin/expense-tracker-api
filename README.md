# Expense Tracker API

Expense Tracker API é um serviço de backend desenvolvido em Node.js, com a finalidade de gerenciamento de despesas pessoais. A API possibilita que os usuários se cadastrem e façam login e permite a criação, leitura, atualização e exclusão de despesas. As autenticações são realizadas utilizando JWT (JSON Web Token).

## Funcionalidades

- Cadastro de usuários.
- Login de usuários.
- Tokens JWT para validação e criação de contexto.
- Filtro de despesas por:
  - Semana anterior
  - Mês anterior
  - Últimos 3 meses
  - Intervalo personalizado (especificando a data de início e fim)
- Inclusão de novas despesas.
- Atualização de despesas.
- Exclusão de despesas.

## Tecnologias utilizadas

- **Backend:** Node
- **Linguagem:** Typescript
- **Banco de Dados:** Postgres
- **ORM:** Prisma
- **Autenticação:** JWT
- **Infraestrutura:** Docker


## Instruções de Configuração

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/freddavin/expense-tracker-api.git
    ```

2. **Acesso o diretório:**
    ```bash
    cd expense-tracker-api
    ```
   
3. **Configure o arquivo .env:**
  - Garanta que dentro da raiz do seu projeto tenha o arquivo de variáveis de ambiente **.env**.
  - Basta renomear o arquivo **.env.example** e alterar com os dados desejados:

    **.env.example**
    ```dosini
    DATABASE_URL="postgresql://user:password@postgres:5432/db?schema=public"
    PORT=3000
    SECRET_KEY="secret"
    POSTGRES_USER="user"
    POSTGRES_PASSWORD="password"
    POSTGRES_DB="db"
    ```

4. **Execute o Docker Compose:**
- Execute o seguinte comando com docker compose para criar as imagens do postgres e da api:
  ```bash
  docker compose up -d
  ```
- Para encerrar basta executar o comando:
  ```bash
  docker compose down
  ```

## API Endpoints

- Instale a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).
- Abra o arquivo **http.rest** na raiz do projeto para enviar as requisições.
- Ou utilize o programa de sua preferência.

### Rotas

- **Auth:**
    - `POST /auth/signup`
    - `POST /auth/login`

- **Expenses:**
    - `POST /expenses`
    - `GET /expenses`
    - `GET /expenses?filter={period}`
    - `PUT /expenses/{id}`
    - `DELETE /expenses/{id}`

As categorias de despesas suportadas são:

- Groceries
- Leisure
- Electronics
- Utilities
- Clothing
- Health
- Food
- Others

## Considerações

Este projeto é inspirado pelo roadmap de backend do projeto [Expense Tracker API](https://roadmap.sh/projects/expense-tracker-api).