const recipeController = require('../controllers/recipeController');
const signinController = require('../controllers/signinController');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/recipe', recipeController.create);
  app.post('/api/signup', signinController.signup);
  app.post('/api/login', signinController.login);
};
