import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',  // Keycloak 服务器地址
  realm: 'WEHI',             // 你的 Realm 名称
  clientId: 'fastapi-client',   // 你的客户端 ID
});

keycloak.init({
  onLoad: 'check-sso',   // 设置为 'check-sso'，防止页面加载时自动跳转到登录页
  checkLoginIframe: false,  // 禁用 iframe 检查，避免不必要的检查
}).then(authenticated => {
  console.log(authenticated ? 'Authenticated' : 'Not authenticated');
}).catch(err => {
  console.error('Keycloak 初始化失败', err);
});

export default keycloak;
