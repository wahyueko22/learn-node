import 'dotenv/config';
import app from './app';
import sequelize from './utils/sequelizeConfig';

const PORT = process.env.PORT || 3001;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log(`Error creating tables: ${err}`));
