# Shop-Now_Back-end

- [x] Criar uma rota para o endpoint `/sign-up`, que recebe uma requisição `POST` para o registro de um novo usuário.
- [x] Verificar se o e-mail fornecido já está cadastrado no banco de dados.
- [x] Criar um hash da senha fornecida antes de armazená-la no banco de dados.
- [x] Inserir os dados do novo usuário no banco de dados, incluindo nome, e-mail, senha e imagem.
- [x] Retornar um status `201` em caso de sucesso.
- [x] Criar uma rota para o endpoint `/login`, que recebe uma requisição `POST` para autenticar um usuário.
- [x] Verificar se o e-mail fornecido está cadastrado no banco de dados.
- [x] Comparar a senha fornecida com o hash armazenado no banco de dados.
- [x] Gerar um token de sessão único para o usuário autenticado.
- [x] Armazenar o token de sessão no banco de dados.
- [x] Retornar o token de sessão e o nome do usuário autenticado.
- [x] Criar uma rota para o endpoint `/logout`, que recebe uma requisição `POST` para encerrar a sessão do usuário.
- [x] Obter o token de sessão a partir do objeto `res.locals.session`.
- [x] Remover o token de sessão do banco de dados.
- [x] Retornar um status `200` em caso de sucesso.
