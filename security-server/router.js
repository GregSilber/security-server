const AuthenticationController = require('./controllers/authentication'),  
      express = require('express'),
      passportService = require('./config/passport');
     
module.exports = function(app) {  
    // Initializing route groups
    const apiRoutes = express.Router(),
            authRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);
    // /api/auth/register
    authRoutes.post('/register', AuthenticationController.register);
    // /api/auth/login
    authRoutes.post('/login', passportService.requireLogin, AuthenticationController.login);
    authRoutes.get('/validate',passportService.requireAuth,AuthenticationController.validate);
    authRoutes.get('/google-login', passportService.requireGoogleLogin);
    authRoutes.get('/google-callback',passportService.requireGoogleCallback,AuthenticationController.googleCallback);
    authRoutes.get('/google-validate',passportService.requireGoogleAuth,AuthenticationController.validate);
    authRoutes.post('/test',AuthenticationController.test);
    app.use('/api', apiRoutes);
};