# Projeto - Trybe Futebol Clube

## 🔨 Desenvolvimento

O aplicativo TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

A proposta deste projeto era a de arquitetar e desenvolver uma API RESTfull integrada a um banco de dados MySQL por meio do ORM Sequelize, em que fosse possível utilizar endpoints para criar, exibir e atualizar resultado de partidas de futebol, classificação de times, lista de times, placar etc. A API está totalmente integrada ao Front-End.

-- Sem sombra de dúvidas o projeto mais empolgante e desafiador do módulo de back-end até o momento.

## 💻 Tecnologias e Metodologias utilizadas

* T.D.D
* P.O.O
* S.O.L.I.D
* TypeScript
* NodeJS
* Express
* Sequelize
* Docker
* chai
* sinon
* mocha

## Lições aprendidas e/ou reforçadas
* Reforçar os aprendizados de TypeScript;
* Reforçar os conceitos de P.O.O;
* Reforçar os conceitos de S.O.L.I.D;
* Escrever o código utilizando o padrão <em>M.S.C.</em> de arquitetura de software por camadas;
* Utilizar o Sequelize para as operações C.R.U.D;
* Escrever API's RESTfull utilizando Node e Express;
* Escrever testes assíncronos utilizando o <em>chai</em>, <em>sinon</em> e <em>mocha</em>;


## 🛠 Instalação local

Clone o projeto:

```bash
  git clone git@github.com:jjgouveia/project-trybe-futebol-clube.git
```

Vá até a pasta do projeto:

```bash
  cd project-trybe-futebol-clube.git
```

Instale as dependências:
1. Na pasta raiz:
```bash
    npm run postinstall
```
2. Na pasta app/backend

```bash
    npm run build
```

Inicie a aplicação:

1. app/backend
```bash
  npm run dev
```

2. app/frontend
```bash
  npm run start
```

## 🛠 Instalação no Docker
Após clonar o repositório e acessar a pasta raiz do projeto:

Na pasta raiz do projeto, execute o comando <code>npm run postinstall</code>.

O passo seguinte é acessar a pasta <code>app/backend</code> e executar o comando <code>npm run build</code>.

Por último, retorne à pasta raiz do projeto e faça a <code>orquestração dos containers</code> através do comando <code>npm run compose:up</code>.

Esse serviço irá inicializar os containers do banco de dados, do back-end e do front-end.
A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
Instale as dependências com o comando <code>npm install</code>.

Execute a aplicação com <code>npm start</code> ou <code>npm run dev</code>.
