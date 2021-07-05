const express = require('express');

import IndexRoutes from './lib/routes/index';

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/', IndexRoutes);

app.listen(PORT, () => {
  console.log(`> App started at: http://localhost:${PORT}`);
})
