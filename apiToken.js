import fs from 'fs'
import getToken from './refreshToken.js';


// Caminho do arquivo JSON
const filePath = './db.json';

// Função para ler os dados do JSON
function readData() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Função para salvar os dados no arquivo JSON
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Função para criar e adicionar uma nova resposta do Refresh Token no arquivo JSON
export async function addToken() {
  const data = readData();
  const lastRefreshToken = data.tokens[data.tokens.length - 1].refresh_token
  const newToken = await getToken(lastRefreshToken)
  data.tokens.push(newToken)
  writeData(data)

  return newToken
}