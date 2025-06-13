const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Tables synchronisées.');
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch(err => console.error('Erreur synchronisation:', err));