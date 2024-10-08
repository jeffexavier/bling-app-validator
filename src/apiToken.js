import fs from 'fs'
import getToken from './refreshToken.js';


// Arquivo onde os tokens são registrados.
const filePath = './src/db.json';

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
  let data = readData();
  const lastRefreshToken = data.refresh_token
  const newToken = await getToken(lastRefreshToken)
  data = newToken
  writeData(data)

  return newToken
}