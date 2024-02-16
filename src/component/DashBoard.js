import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const API_KEY = process.env.REACT_APP_API_KEY
const API_SECRET= process.env.REACT_APP_API_SECRET
const API_BASE_URL = process.env.API_BASE_URL;

const DashBoard = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
//         const serverTimeResponse = await fetch(`${API_BASE_URL}/api/en/time`);
//         console.log('Server time response:', serverTimeResponse);
// const serverTime =parseInt(serverTimeResponse.data);
// console.log('Server time:', serverTime);
// const timeDiff = Date.now() - serverTime;
// console.log('Time difference:', timeDiff);
        const timestamp = Date.now();
        console.log(timestamp)
        const method = 'GET';
        const endpoint = 'transaction/find-by-user';
        const body = ''; // Empty for GET requests
        const signature = generateSignature(timestamp, method, endpoint, body);
console.log('Timestamp:', timestamp);
console.log('Method:', method);
console.log('Endpoint:', endpoint);
console.log('Body:', body);
console.log('Signature:', signature);
        
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            'YAYA-API-KEY': API_KEY,
            'YAYA-API-TIMESTAMP': timestamp,
            'YAYA-API-SIGN': signature,
          },
          mode: 'cors', // Add this line
          params: { p: page, search: search },
        });
        console.log(response)

        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [page, search]);

  const generateSignature = (timestamp, method, endpoint, body) => {
    const preHashString = `${timestamp}${method.toUpperCase()}${endpoint}${body}`;
    const hmac = CryptoJS.HmacSHA256(preHashString, API_SECRET);
    console.log(CryptoJS.enc.Base64.stringify(hmac))
    return CryptoJS.enc.Base64.stringify(hmac);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Transaction Dashboard</h1>

      <form>
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" value={search} onChange={handleSearchChange} />
        <button type="button" onClick={() => setPage(1)}>Search</button>
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Cause</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id} style={{ backgroundColor: transaction.cause.includes('outgoing') ? '#FFD3D3' : '' }}>
              <td>{transaction.id}</td>
              <td>{transaction.sender}</td>
              <td>{transaction.receiver}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
              <td>{transaction.cause}</td>
              <td>{transaction.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>Page: {page}</p>
        <button type="button" onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Previous Page</button>
        {' '}
        <button type="button" onClick={() => setPage(prevPage => prevPage + 1)}>Next Page</button>
      </div>
    </div>
  );

}

export default DashBoard