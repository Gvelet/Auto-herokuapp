import {basic} from '../data/credentials/login'

async function basiсAuth(page) {
  const { login, pass } = basic;

  const auth = 'Basic ' + Buffer.from(login + ':' + pass).toString('base64');

  await page.setExtraHTTPHeaders({
    'Authorization': auth 
  });
}

export{basiсAuth};