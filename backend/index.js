require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});