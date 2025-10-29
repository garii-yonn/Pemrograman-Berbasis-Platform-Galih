const http = require('http');
const url = require('url');

const motoGP = [
  {
    circuit: 'Losail',
    location: 'Qatar',
    winner: {
      firstName: 'Andrea',
      lastName: 'Dovizioso',
      country: 'Italy'
    }
  },
  {
    circuit: 'Autodromo',
    location: 'Argentine',
    winner: {
      firstName: 'Cal',
      lastName: 'Crutchlow',
      country: 'UK'
    }
  },
  {
    circuit: 'De Jerez',
    location: 'Spain',
    winner: {
      firstName: 'Valentino',
      lastName: 'Rossi',
      country: 'Italy'
    }
  },
  {
    circuit: 'Mugello',
    location: 'Italy',
    winner: {
      firstName: 'Andrea',
      lastName: 'Dovizioso',
      country: 'Italy'
    }
  }
];

function groupByCountry(data) {
  const grouped = {};
  
  data.forEach(race => {
    const country = race.winner.country;
    if (!grouped[country]) {
      grouped[country] = [];
    }
    grouped[country].push({
      circuit: race.circuit,
      location: race.location,
      winner: race.winner
    });
  });
  
  return grouped;
}

function groupByName(data) {
  const grouped = {};
  
  data.forEach(race => {
    const fullName = `${race.winner.firstName} ${race.winner.lastName}`;
    if (!grouped[fullName]) {
      grouped[fullName] = [];
    }
    grouped[fullName].push({
      circuit: race.circuit,
      location: race.location,
      country: race.winner.country
    });
  });
  
  return grouped;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  res.setHeader('Content-Type', 'application/json');
  
  if (pathname === '/') {
    res.statusCode = 200;
    res.end(JSON.stringify(motoGP, null, 2));
    
  } else if (pathname === '/country') {
    const groupedByCountry = groupByCountry(motoGP);
    res.statusCode = 200;
    res.end(JSON.stringify(groupedByCountry, null, 2));
    
  } else if (pathname === '/name') {
    const groupedByName = groupByName(motoGP);
    res.statusCode = 200;
    res.end(JSON.stringify(groupedByName, null, 2));
    
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Bad Request' }));
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`\nEndpoint yang tersedia:`);
  console.log(`- http://localhost:${PORT}/ (tampilkan semua data)`);
  console.log(`- http://localhost:${PORT}/country (kelompokkan berdasarkan negara)`);
  console.log(`- http://localhost:${PORT}/name (kelompokkan berdasarkan nama pemenang)`);
});