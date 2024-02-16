// CONSTANTS
const express = require('express');
const app = express();
const port = 3000;

// ROUTES
const productRoutes = require('./routes/product.routes');

app.use(productRoutes);

// LISTEN
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})