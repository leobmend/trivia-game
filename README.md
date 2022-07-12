# **Trivia Game** :thinking: :brain: :hourglass:

A aplicação Trivia Game nasceu a partir de um projeto realizado durante o curso de [Desenvolvimento Web da Trybe](https://www.betrybe.com/). Na oportunidade, o projeto foi realizado em conjunto com os colegas e amigos [Higor Anjos](https://github.com/HigorAnjos) e [Gabriel Julio](https://github.com/GJTrybe).

A partir daí, desenvolvi individualmente para exercício de novas habilidades e tecnologias.

## **Back-end** :card_file_box:

A aplicação consome informações de uma API própria. Construída com Express e Node.js, ela permite criação, edição e login de usuários. Conforme os usuários jogam no ambiente front-end, as suas pontuações são armazenadas no banco de dados. Além disso, o esqueleto básico para novas features já existe, como a possibilidade de armazenar configurações pré-estabelecidas para os usuários.

### **Tecnologias e Características**

- Construído no ambiente [Node.js](https://nodejs.org/en/) com o framework [Express](https://expressjs.com/pt-br/);
- Segue a arquitetura MSC - Model/Service/Controller;
- Acessa um banco de dados relacional PostgreSQL (com opção de alteração conforme necessidade);
- Realiza operações no banco de dados por meio do ORM [Sequelize](https://sequelize.org/);
- Utiliza autenticação [jwt](https://jwt.io/introduction) para validação e manutenção de usuários logados;
- Utiliza criptografia [bcript](https://en.wikipedia.org/wiki/Bcrypt) para proteção de dados sensíveis dos usuários;
- Desenvolvimento utilizando a ferramenta [Eslint](https://eslint.org/) para análise, organização e melhoria contínua do código;
- Desenvolvimento e deploy conteinerizado utilizando [Docker](https://www.docker.com/);
- Online utilizando a plataforma de deploy [Heroku](https://devcenter.heroku.com/start), disponível [aqui](https://trivia-game-back.herokuapp.com/).

## **Front-end** :desktop_computer:

A aplicação consome informações da [Open Trivia DataBase](https://opentdb.com/), uma API pública que fornece uma variada gama de questões para o tradicional jogo de perguntas e respostas sobre conhecimentos gerais (também conhecido como quiz). Além de fornecer a possibilidade do usuário jogar o jogo, a aplicação permite configurar alguns parâmetros como dificuldade, categoria e tipo de pergunta. Realizando o consumo das informações da API a depender desses parâmetros, de maneira dinâmica e automática. Por fim, ao finalizar uma partida, a aplicação salva as informações e produz um ranking dos jogadores que utilizaram a aplicação.

Todas as informações relacionadas aos usuários são consumidas utilizando a API construída no back-end deste mesmo repositório, apresentada anteriormente.

A aplicação possui as páginas de *Login*, *Lobby*, *Profile*, *Settings*, *Trivia* e *Ranking*. Desse modo, permite toda a jornada do usuário a partir do *signup* / *login*, passando pela configuração do jogo ou edição do perfil, jogando o jogo de fato e, finalmente, fechando o ciclo na visualização da sua pontuação no ranking dos jogadores. Design responsivo foi aplicado à todas as páginas!

* Observação: Toda a aplicação foi construída utilizando os frameworks [React](https://pt-br.reactjs.org/) e [Redux](https://redux.js.org/), inicialmente sendo utilizado componentes de classe. Após extensa refatoração, foram aplicados componentes funcionais na totalidade do projeto e todo o gerenciamento de estado global foi atualizado para o [Redux Toolkit](https://redux-toolkit.js.org/).

### **Tecnologias e Características**

- Construído com o framwork [React](https://pt-br.reactjs.org/) e componentes funcionais;
- Gerencia o estado global com o framwork [Redux Toolkit](https://redux-toolkit.js.org/);
- Utiliza a biblioteca [Axios](https://axios-http.com/ptbr/docs/intro) para realização de requisições às APIs;
- Desenvolvimento utilizando as ferramentas [Eslint](https://eslint.org/) e [Stylelint](https://stylelint.io/) para análise, organização e melhoria contínua do código;
- Estilização em CSS puro, com design responsivo;
- Testes construídos com os frameworks [Jest](https://jestjs.io/pt-BR/) e [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) (verificar próxima seção);
- Online utilizando a plataforma de deploy [Heroku](https://devcenter.heroku.com/start), disponível [aqui](https://game-trivia.herokuapp.com/).

## **Testes automatizados** :mechanical_arm:

A aplicação front-end foi desenvolvida com testes de integração com cobertura de 95% de todo o código. Para tal, foram utilizados os frameworks *Jest* e *React Testing Library*. **No entanto**, após a refatoração mencionada acima, este ponto ficou à ser implementado novamente como melhoria futura.

Além disso, testes para a aplicação back-end também precisam ser implementados.

* Você pode acessar a aplicação front-end anterior à refatoração [aqui](https://leobmend.github.io/trivia-game/), e seu código fonte [aqui](https://github.com/leobmend/trivia-game/tree/8cb9e0b8d6aaa84e4ede86a7d7899ce59f93c7e3).

## **Teste você mesmo!** :muscle:

A aplicação está em produção [aqui](https://game-trivia.herokuapp.com/)! Qualquer dúvida, sugestão ou bug encontrado, por favor entre em contato! :smile:

Caso se interesse, meus outros projetos estão disponíveis em meu [portfolio](https://leobmend.github.io).
