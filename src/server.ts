import http from 'http';

import app from './app';

const server = new http.Server(app);

server.listen(process.env.PORT, () => {
  console.log('Server runing');
});

export default server;
