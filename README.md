# YaYa WalletDashboard

## Overview

This React dashboard component interacts with the YaYa Wallet API, providing a user-friendly interface to view transaction data. The dashboard allows users to search for transactions, navigate through pages, and presents transaction details in a tabular format.

## Prerequisites

Before using this dashboard, ensure you have the following:

- YaYa Wallet API Key: Obtain your API Key from the YaYa Wallet website.
- YaYa Wallet API Secret: Generate the API Secret from your YaYa Wallet profile.
- React: Ensure that you have React installed in your project.

## Installation

1. Install dependencies:

   ```bash
   -npm install axios crypto-js
## Import the DashBoard component:


- import React from 'react';
- import DashBoard from './DashBoard'; // Update with the correct path

## Usage
- Rendering the Dashboard:


const App = () => {
  return (
    <div>
      <DashBoard />
    </div>
  );
};

export default App;