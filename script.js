const API_URL = 'https://api.green-api.com';

function getCredentials() {
  const idInstance = document.getElementById('idInstance').value.trim();
  const apiToken = document.getElementById('apiToken').value.trim();

  if (!idInstance || !apiToken) {
    alert('Введите idInstance и ApiTokenInstance');
    throw new Error('Credentials missing');
  }

  return { idInstance, apiToken };
}

function showResponse(data) {
  document.getElementById('response').value =
    JSON.stringify(data, null, 2);
}

async function callApi(url, method = 'GET', body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(url, options);
  return await res.json();
}

async function getSettings() {
  const { idInstance, apiToken } = getCredentials();
  const url = `${API_URL}/waInstance${idInstance}/getSettings/${apiToken}`;
  const result = await callApi(url);
  showResponse(result);
}

async function getState() {
  const { idInstance, apiToken } = getCredentials();
  const url = `${API_URL}/waInstance${idInstance}/getStateInstance/${apiToken}`;
  const result = await callApi(url);
  showResponse(result);
}

async function sendMessage() {
  const { idInstance, apiToken } = getCredentials();
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  const url = `${API_URL}/waInstance${idInstance}/sendMessage/${apiToken}`;
  const payload = {
    chatId: `${phone}@c.us`,
    message
  };

  const result = await callApi(url, 'POST', payload);
  showResponse(result);
}

async function sendFile() {
  const { idInstance, apiToken } = getCredentials();
  const phone = document.getElementById('phone').value;
  const fileUrl = document.getElementById('fileUrl').value;

  const url = `${API_URL}/waInstance${idInstance}/sendFileByUrl/${apiToken}`;
  const payload = {
    chatId: `${phone}@c.us`,
    urlFile: fileUrl,
    fileName: 'file'
  };

  const result = await callApi(url, 'POST', payload);
  showResponse(result);
}
