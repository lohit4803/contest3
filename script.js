// Fetch data from the API using .then
function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        renderTable(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  // Fetch data from the API using async/await
  async function fetchDataWithAsyncAwait() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      renderTable(data);
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  // Render the table with the fetched data
  function renderTable(data) {
    const tableBody = document.getElementById('coinTableBody');
    tableBody.innerHTML = '';
  
    data.forEach(coin => {
      const row = document.createElement('tr');
  
      const symbolCell = document.createElement('td');
      symbolCell.textContent = coin.symbol.toUpperCase();
  
      const nameCell = document.createElement('td');
      nameCell.textContent = coin.name;
  
      const priceCell = document.createElement('td');
      priceCell.textContent = coin.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  
      const volumeCell = document.createElement('td');
      volumeCell.textContent = coin.total_volume.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  
      const rankCell = document.createElement('td');
      rankCell.textContent = coin.market_cap_rank;
  
      const priceChangeCell = document.createElement('td');
      priceChangeCell.textContent = coin.price_change_percentage_24h.toFixed(2) + '%';
  
      row.appendChild(symbolCell);
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(volumeCell);
      row.appendChild(rankCell);
      row.appendChild(priceChangeCell);
  
      tableBody.appendChild(row);
    });
  }
  
  // Search functionality
  function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
  
    const tableRows = document.getElementById('coinTableBody').getElementsByTagName('tr');
    for (let i = 0; i < tableRows.length; i++) {
      const symbol = tableRows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
      const name = tableRows[i].getElementsByTagName('td')[1].textContent.toLowerCase();
  
      if (symbol.includes(searchTerm) || name.includes(searchTerm)) {
        tableRows[i].style.display = '';
      } else {
        tableRows[i].style.display = 'none';
      }
    }
  }
  
  // Sort functionality
  function handleSort() {
    const tableBody = document.getElementById('coinTableBody');
    const tableRows = Array.from(tableBody.getElementsByTagName('tr'));
  
    tableRows.sort((rowA, rowB) => {
      const marketCapA = parseInt(rowA.getElementsByTagName('td')[4].textContent);
      const marketCapB = parseInt(rowB.getElementsByTagName('td')[4].textContent);
      const changePercentageA = parseFloat(rowA.getElementsByTagName('td')[5].textContent);
      const changePercentageB = parseFloat(rowB.getElementsByTagName('td')[5].textContent);
  
      return marketCapA - marketCapB || changePercentageB - changePercentageA;
    });
  
    tableRows.forEach(row => {
      tableBody.appendChild(row);
    });
  }
  
  // Event listeners
  document.getElementById('searchButton').addEventListener('click', handleSearch);
  document.getElementById('sortButton').addEventListener('click', handleSort);
  
  // Fetch data using .then
  fetchDataWithThen();
  
  // Uncomment the line below and comment out the line above to fetch data using async/await
  //fetchDataWithAsyncAwait();
  