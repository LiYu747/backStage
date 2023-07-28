/**
 * 接口域名的管理
 * @param {String} baseServer [api服务器]
 * @param {String} otherServer [其他服务器]
 * @param {String} eduAdminServer [教务系统服务器]
 */
const domainLsit = [
  // 开发环境
  {
    // apiServer: 'http://10.0.30.150:8420', //开发服务 0  wu
    apiServer: 'http://10.0.30.109:8420', //开发服务 0 qi
    // apiServer: 'http://10.0.30.183:8420', //开发服务 0 lihm
    otherServer: 'https://api.ebag-test.readboy.com/education-cube', //开发服务器 1
    eduAdminServer: 'http://edu-admin-api-test.c0c444e4b485b4c7f9e690726e810a8b9.cn-shenzhen.alicontainer.com',
    accountCenterServer: 'https://account-center-test.readboy.com'
  },
  // 测试环境
  {
    apiServer: 'https://tss.styduinxx.boran-tech.com', //开发服务 0
    otherServer: 'https://api.ebag-test.readboy.com/education-cube', //开发服务器 1
    eduAdminServer: 'http://edu-admin-api-test.c0c444e4b485b4c7f9e690726e810a8b9.cn-shenzhen.alicontainer.com',
    accountCenterServer: 'https://account-center-test.readboy.com'
  },
];

// vue
const ServerNumber = process.env.VUE_APP_SERVER_ID
  ? process.env.VUE_APP_SERVER_ID
  : 0;
// 地址对象
export const baseUrl = domainLsit[ServerNumber];

// api接口
export const apiServer = baseUrl;
export default baseUrl;
