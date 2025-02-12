import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',  // Keycloak server address
  realm: 'WEHI',             // Your Realm name
  clientId: 'fastapi-client',   // Your client ID
});

keycloak.init({
  onLoad: 'check-sso',   // Set to 'check-sso' to prevent automatic redirection to the login page on page load
  checkLoginIframe: false,  // Disable iframe check to avoid unnecessary verifications
}).then(authenticated => {
  console.log(authenticated ? 'Authenticated' : 'Not authenticated');
}).catch(err => {
  console.error('Keycloak initialization failed', err);
});

export default keycloak;
