require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const { connectDatabase } = require('./configs/db');
const bouquetRoutes = require('./routes/bouquetRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (_req, res) => {
  res.json({
    message: 'Flora API is running',
    docs: '/api-docs',
    bouquets: '/api/bouquets',
  });
});

app.use('/api/bouquets', bouquetRoutes);
app.use(errorHandler);

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
  });
}

startServer();
