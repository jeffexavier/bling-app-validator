
# BLING-APP-VALIDATOR

### Descrição

BLING-APP-VALIDATOR é uma aplicação criada para facilitar a homologação de aplicativos na plataforma Bling, um ERP online amplamente utilizado pelo varejo brasileiro. O processo de homologação pode ser longo e complicado, e essa ferramenta ajuda a automatizar e validar os passos necessários, tornando o processo mais simples e eficiente.

### Requisitos

- Node.js (v16 ou superior)
- npm (Node Package Manager)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/jeffexavier/bling-app-validator.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd bling-app-validator
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

### Configuração

#### 1. Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```bash
BASIC_AUTH="Basic [client_id:client_secret codificado em base64]"
```

Substitua `[client_id:client_secret codificado em base64]` pelo valor correto.

Exemplo oficial da documentação Bling:

```bash
BASIC_AUTH='Basic ZWRkNTE4NjQzNDYxNzdiMTE5NzFlNmY0YTUyMmM5ZmYxZGZjNjNkZjo2OGViODVkY2FkOTY3Mzk2ZDA1ZmVjZGQwMDgwMjExN2Q3NTE1MjY0YjUyMGMzNjJlN2Y0NjYxOWFhMDk='
```

> Consulte a [documentação oficial do fluxo de autorização da Bling](https://developer.bling.com.br/aplicativos#fluxo-de-autoriza%C3%A7%C3%A3o) para detalhes sobre como obter essas credenciais.

#### 2. Arquivo `db.json`

O arquivo `db.json` precisa ser criado na pasta `src` e deve conter a seguinte estrutura, que será preenchida com o objeto retornado após a autorização via Bling:

Exemplo oficial:

```json
{
    "access_token": "4a9de71b8aaf91c8ebbf830888354d5479e83a01",
    "expires_in": 21600,
    "token_type": "Bearer",
    "scope": "98309 318257570 5862218180",
    "refresh_token": "e4d61baafd951bbbdec0a92cf9700a49b4cbc005"
}
```

O objeto deve ser a resposta da autorização realizada no fluxo de autorização do aplicativo, conforme a [documentação oficial da Bling](https://developer.bling.com.br/aplicativos#authorization-code).

### Execução

Após configurar o `.env` e o `db.json`, execute o código com o comando:

```bash
npm start
```

Se tudo estiver configurado corretamente, você verá as seguintes mensagens no terminal:

```
- 1ª etapa concluída!
- 2ª etapa concluída!
- 3ª etapa concluída!
- 4ª etapa concluída!
- 5ª e última etapa concluída!
Todas as etapas da homologação foram concluídas com sucesso!
```

### Licença

Este projeto está licenciado sob os termos da [Licença MIT](https://opensource.org/licenses/MIT).
