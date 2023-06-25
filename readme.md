# README - PEDE JÁ

Este é o **README** da minha aplicação **Node.js** com **TypeScript**. Aqui você encontrará informações sobre como iniciar a aplicação, o banco de dados utilizado e uma breve explicação das rotas disponíveis.

## Instruções de Execução

Certifique-se de ter o **Node.js** e o **Yarn** instalados em sua máquina antes de prosseguir com as etapas a seguir.

1. Clone este repositório para o seu ambiente local.
2. Navegue até o diretório raiz do projeto.
3. Execute o seguinte comando para instalar as dependências: `yarn install`
4. Antes de iniciar a aplicação, certifique-se de configurar corretamente o banco de dados **MongoDB**. Consulte a seção "Banco de Dados" abaixo para mais detalhes.
5. Para iniciar a aplicação em modo de desenvolvimento, utilize o seguinte comando: `yarn dev`


Isso iniciará o servidor e a aplicação estará disponível no endereço `http://localhost:3000`.

## Banco de Dados

Esta aplicação utiliza o banco de dados **MongoDB** com o auxílio da biblioteca **Mongoose** para mapeamento objeto-documento.

Certifique-se de ter o **MongoDB** instalado em sua máquina e que o serviço esteja em execução. Além disso, verifique se as configurações de conexão com o banco de dados estão corretamente definidas no arquivo `.env`.

## Rotas

A seguir, estão listadas as rotas disponíveis na aplicação, juntamente com uma breve explicação de suas funcionalidades.

### `/orders`

- `POST /orders`: Cria uma nova ordem. Os detalhes da ordem devem ser fornecidos no corpo da solicitação. O controlador responsável por essa rota é `orderCtrl.create`.
- `GET /orders`: Obtém todas as ordens existentes. O controlador responsável por essa rota é `orderCtrl.getAll`.
- `GET /orders/:id`: Obtém uma ordem específica com base no ID fornecido como parâmetro na URL. O controlador responsável por essa rota é `orderCtrl.getById`.
- `PUT /orders/:id/status/:status`: Altera o status de uma ordem específica com base no ID e no novo status fornecidos como parâmetros na URL. O controlador responsável por essa rota é `orderCtrl.changeStatus`.

### `/items`

- `POST /items`: Cria um novo item. Os detalhes do item devem ser fornecidos no corpo da solicitação. O controlador responsável por essa rota é `itemCtrl.create`.
- `GET /items`: Obtém todos os itens existentes. O controlador responsável por essa rota é `itemCtrl.getAll`.
- `GET /items/:id`: Obtém um item específico com base no ID fornecido como parâmetro na URL. O controlador responsável por essa rota é `itemCtrl.getById`.
- `PATCH /items/:id`: Altera o status de ativação de um item específico com base no ID fornecido como parâmetro na URL. O controlador responsável por essa rota é `itemCtrl.changeItemActive`.

Certifique-se de utilizar os métodos HTTP corretos e fornecer os dados necess




