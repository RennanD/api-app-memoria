# API (USER) - APP MEMÓRIA

Funcionalidades para os usuários comuns do sistema.

### RF

- [x] Permitir que o usuário se cadastre ou seja cadastrado;
- [x] Permitir que o usuário seja autenticado na aplicação;
- [x] Permitir que o usuário cadastre uma data importante referêciando uma pessoa(contato);
- [x] CRUD de datas importantes e contatos;
- [ ]  Adicionar nivel de relacionamento (Pai, mãe e etc).
  Adicionar lembrete da datas (periodo escolhido pelo usuário);

### RNF

- [x] Utilizar typescript para desenvolver a api;
- [x] Utilizar PostgresSQL;
- [x] Utilizar TypeORM;
- [x] Utilizar padronização de código;


## MEU CADASTRO

Cadastro de usuário na aplicação

### RF

- [x] Permitir que o usuário se cadastre ou seja cadastrado com os seguintes campos:

	```js
  interface User {
    name: string;
    birthday: Date;
    email: string;
    cpf: string;
    gender: 'masculino' | 'feminino';
    zipcode: string;
    address: string;
    role: 'user' | 'admin'
  }
	```


### RN

- [x] O usuário deve receber um SMS com um código para verificação de seu telefone;
- [x] O usuário deve verificar seu telefone antes de concluir o cadastro;
- [x] Com o telefone verificado o usuário deve poder prosseguir com cadastro para criação da conta no aplicativo;

## SESSÕES NA APLICAÇÃO

### RF

- [x] permitir que o usuário seja autenticado para uso do aplicativo, com os seguintes dados:
  ```js
  interface Request {
    email: string;
    password: string;
  }
  ```

- [x] Permitir que o usuário possa encerrar sua sessão na aplicação;

### RNF

- [x] Usar autenticação via JSON Web Token (JWT);


### RN

- [x] Ao iniciar uma sessão deve ser retornado um token para o usuário para que ele possa ter acesso à aplicação;

  ```js
  interface Session {
    token: string;
    user: Account;
  }
  ```

- [x] O usuário só pode acessar a aplicação se estiver verificado;

- [x] Ao encerrar uma sessão o usuário deve ter o telefone "desverificado", para que na próxima sessão ele precise verificar novamente seu telefone;


## CADASTRO DE PREFERÊNCIAS DO USUÁRIO OU CONTATO

### RF

- [ ] As preferências devem seguir a seguinte estrutura:

  ```js
  interface UserPreferences {
    id: string;
    person_id: string;
    category: string;
    subcategories_title: string[];
  }
  ```

### RN

- [ ] O ID do `User`/`Contact` que selecionou aquela categoria deve relacionado a preferencia, assim como o ID da `Category`;

- [ ] As `subcategorias` escolhidas devem existir dentro de `Category`, e devem ser adicionados à `subcategories_title`;


## CRUD DE DATAS

Cadastro de datas importantes.

### RF

- [x] Adicionar um "contato" para ser relacionado à data que o usuário cadastrar;

- [x] O "Contato" deve seguir o seguinte formato:
  ```js
  interface Contact {
    id: string;
    name: string;
    phone_number: string;
    avatar?: string;
  }
  ```

- [x] Cadastrar uma data importante, a data deve serguir a seguinte estrutura:

  ```js
  interface ImportantDate {
    id: string;
    contact_id: string;
    user_id: string;
    date: Date;
    description: string;
  }
  ```

- [x] Listar Datas cadastradas por um usuário, as datas devem seguir o seguinte formato:

  ```js
  interface Date {
    id: string;
    date: Date;
    create_at: Date;
    updated_at: Date;
    contact: {
      id: string;
      name: string;
      avatar?: string;
    };
  }
  ```

- [x] Detalhar uma data específica, a data deve serguir o seguinte formato:

  ```js
  interface Date {
    id: string;
    date: Date;
    description: string;
    create_at: Date;
    updated_at: Date;
    contact: {
      id: string;
      phone_number: string;
      name: string;
      avatar?: string;
    };
  }
  ```

- [x] Listar datas de um contato específico, as datas devem seguir o seguinte formato:

  ```js
  interface Date {
    id: string;
    date: Date;
    create_at: Date;
    updated_at: Date;
    contact: {
      id: string;
      name: string;
      avatar?: string;
    };
  }
  ```

- [x] Editar um contato;

- [x] Editar uma data;

- [x] Excluir um contato;

- [x] Excluir uma data;


### RN

- [x] Ao criar uma data, a mesma deve ser relacionada a um contato cadastrado pelo usuário e possuir uma descrição de que data se trata aquele cadastro;


# API (ADMIN) - APP MEMÓRIA

Funcionalidades para o Admin do sistema.

### RN

- [ ] Somente o ADMIN pode realizar as seguintes operações

## CADASTRO DE PREFERÊNCIAS (Catgorias e subcategorias)

Cadastrar novas preferências no sistema.

### RF

- [x] As categorias devem seguir a seguinte estrutura:

  ```js
  interface Preference {
    id: string;
    category_name: string;
    subcategories: string[];
  }
  ```

### RNF

- [x] Usar mongodb para estrutura de preferências.



## CRUD DE GRAU DE RELACIONAMENTO

Criar grau de relacionamento para os contatos e datas do usuário

### RF

- [ ] Cadastrar tipos de relacionamento, o grau de relacionamento deve seguir a seguinte estrutura:
  ```js
  interface Relation {
    id: string;
    relation_type: string;
  }
  ```

- [ ] Listar graus de relacionamento;

## CRUD DE DATAS GENÉRICAS

Criar datas não seram específicas para um usuário.

### RF

- [ ] Cadastrar uma data genérica, a data deve serguir a seguinte estrutura:

  ```js
  interface ImportantDate {
    id: string;
    date: Date;
    description: string;
  }
  ```

- [ ] Listar Datas genérias, as datas devem seguir o seguinte formato:

  ```js
  interface Date {
    id: string;
    date: Date;
    create_at: Date;
    updated_at: Date;
  }
  ```
### RN

- [ ] Deve ser possível o Administrador criar datas que seram visíveis para todos os usuários da aplicação;
