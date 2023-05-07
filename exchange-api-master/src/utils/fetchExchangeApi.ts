import 'dotenv/config';

const API_KEY = process.env.API_KEY;

const myHeaders = new Headers();
myHeaders.append("apikey", String(API_KEY));

const requestOptions = {
  method: 'GET',
  redirect: 'follow' as RequestRedirect | undefined,
  headers: myHeaders
};

const fetchSymbols = async () => {
  const url = 'https://api.apilayer.com/exchangerates_data/symbols'
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
}

let SYMBOLS = '';
// const SYMBOLS = 'BRL,USD,EUR,JPY';
const BASE = 'EUR';

const getSymbols = async () => {
  const { symbols } = await fetchSymbols();
  const response = Object.keys(symbols).join();
  SYMBOLS = response;
}

const fetchExchangeApi = async () => {
  await getSymbols();
  const url = `https://api.apilayer.com/exchangerates_data/latest?symbols=${SYMBOLS}&base=${BASE}`
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
}

export default fetchExchangeApi;
