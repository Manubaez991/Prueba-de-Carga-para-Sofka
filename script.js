import http from 'k6/http';
import { check } from 'k6';

const csvPath = "C:\\k6-project\\users.csv";
const csvContent = open(csvPath, 'r');
const csvLines = csvContent.split(/\r?\n/).filter(line => line.trim() !== '');
const users = csvLines.slice(1).map(line => {
  const [user, passwd] = line.split(',');
  return { user, passwd };
});

export let options = {
  vus: 50, // Para 20+ TPS
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(95)<1500'], // <1.5s
    http_req_failed: ['rate<0.03'],    // <3% errores
  },
};

export default function () {
  const index = __VU % users.length;
  const { user, passwd } = users[index];

  const payload = JSON.stringify({ 
    username: user, 
    password: passwd 
  });
  
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://fakestoreapi.com/auth/login', payload, { headers });

  check(res, {
    'Login exitoso': (r) => r.status === 200,
    'Tiempo < 1.5s': (r) => r.timings.duration < 1500
  });

}
