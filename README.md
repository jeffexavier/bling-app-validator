
# BLING-APP-VALIDATOR

BLING-APP-VALIDATOR é uma aplicação criada para facilitar a homologação de aplicativos na plataforma Bling, um ERP online amplamente utilizado pelo varejo brasileiro. O processo de homologação pode ser longo e complicado, e essa ferramenta ajuda a automatizar e validar os passos necessários, tornando o processo mais simples e eficiente.

## Repositório

O projeto está hospedado no GitHub e pode ser acessado [aqui](https://github.com/jeffexavier/bling-app-validator).

## Requisitos

- **Linguagem**: JavaScript (Node.js)
- **Dependências**:
  - dotenv ^16.4.5
  - fs ^0.0.1-security
- **Sistema Operacional**: Qualquer sistema com suporte a Node.js

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/jeffexavier/bling-app-validator.git
cd bling-app-validator
npm install
```

## Configuração

Antes de rodar o projeto, é necessário configurar o arquivo `.env`:

1. **Arquivo `.env`**
   
   Crie um arquivo `.env` na raiz do projeto e adicione a seguinte variável de ambiente:

   ```bash
   BASIC_AUTH='Basic BASE64(client_id:client_secret)'
   ```

   O valor de `BASIC_AUTH` deve ser a palavra "Basic" seguida do código codificado em Base64 das suas credenciais no formato `client_id:client_secret`.

   Exemplo:
   
   ```bash
   BASIC_AUTH='Basic ZWRkNTE4NjQzNDYxNzdiMTE5NzFlNmY0YTUyMmM5ZmYxZGZjNjNkZjo2OGViODVkY2FkOTY3Mzk2ZDA1ZmVjZGQwMDgwMjExN2Q3NTE1MjY0YjUyMGMzNjJlN2Y0NjYxOWFhMDk='
   ```

   Para mais detalhes sobre o fluxo de autorização, consulte a [documentação oficial do Bling](https://developer.bling.com.br/aplicativos#fluxo-de-autoriza%C3%A7%C3%A3o).

2. **Arquivo `db.json`**

   Crie um arquivo chamado `db.json` na raiz do projeto. Este arquivo deve conter uma estrutura para armazenar as respostas das autorizações, incluindo `refresh_tokens` e `access_tokens`, como mostrado no exemplo abaixo:

   ```json
   {
     "tokens": [
       {
         "access_token": "4a9de71b8aaf91c8ebbf830888354d5479e83a01",
         "expires_in": 21600,
         "token_type": "Bearer",
         "scope": "98309 318257570 5862218180",
         "refresh_token": "e4d61baafd951bbbdec0a92cf9700a49b4cbc005"
       }
     ]
   }
   ```

O primeiro objeto deve ser a resposta da autorização realizada no fluxo de autorização do aplicativo, conforme a documentação oficial do Bling.

## Execução do Código

Após configurar corretamente o arquivo `.env` e o `db.json`, para executar o código de forma simples, basta rodar o comando:

```bash
npm start
```

Se tudo estiver configurado corretamente, você deverá ver as seguintes mensagens no terminal conforme cada etapa do processo for concluída:

```
- 1ª etapa concluída!
- 2ª etapa concluída!
- 3ª etapa concluída!
- 4ª etapa concluída!
- 5ª e última etapa concluída!
Todas as etapas da homologação foram concluídas com sucesso!
```

## Licença

Este projeto está licenciado sob os termos da [Licença MIT](https://opensource.org/licenses/MIT).
