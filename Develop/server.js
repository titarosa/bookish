const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Adjust the path if needed

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Sync sequelize models to the database, then turn on the server
    sequelize.sync({ force: false })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`App listening on port ${PORT}!`);
        });
      });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
