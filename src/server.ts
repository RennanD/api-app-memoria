import http from 'http';

import app from './app';

const server = new http.Server(app);

server.listen(3333, () => {
  console.log('Server runing');
});

export default server;
