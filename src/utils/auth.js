import Cookies from "js-cookie";
import { getSessionStorage, setSessionStorage } from "@/utils";

// import { useUserStore } from '@/store/user'

export const sessionKeyBase = "user-info";
export const TokenKeyBase = "authorized-token";

/** 获取`token` */
export function getToken(role = "") {
  const TokenKey = role ? `${role}-${TokenKeyBase}` : TokenKeyBase;
  const sessionKey = role ? `${role}-${sessionKeyBase}` : sessionKeyBase;
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : getSessionStorage(sessionKey);
}

/** 设置`token`以及key值为`user-info`的session信息 */
export function setToken(data = {}, role = "") {
  const TokenKey = role ? `${role}-${TokenKeyBase}` : TokenKeyBase;
  console.log("setToken", data);
  const { access_token, refresh_token, expires_in } = data || {};
  // const expires = expires_in ? new Date().getTime() + expires_in * 1000 : 0
  const expires = expires_in ? expires_in * 1000 : 0;
  console.log("expires", expires);
  const cookieString = JSON.stringify({ access_token, expires });
  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: expires / 86400000,
      })
    : Cookies.set(TokenKey, cookieString);
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken(role = "") {
  const TokenKey = role ? `${role}-${TokenKeyBase}` : TokenKeyBase;
  Cookies.remove(TokenKey);
  sessionStorage.clear();
}

/** 格式化token（jwt格式） */
export const formatToken = (token) => {
  return "Bearer " + token;
};

/** 获取诸暨中台登录地址 */
export const getAuthUrl = (token) => {

  let client_id = process.env.VUE_DSL_CLIENTID ? process.env.VUE_DSL_CLIENTID : "1686712036882";
  let account_center_url = process.env.VUE_DSL_ACCOUNT_CENTER_URL ? process.env.VUE_DSL_ACCOUNT_CENTER_URL : "https://account-center-test.readboy.com";
  let redirect_uri = `${window.location.origin}${window.location.pathname}#/auth`;
  redirect_uri = encodeURIComponent(redirect_uri);
  let url = `${account_center_url}/v1/oauth2/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}`;

  return url;
};
/**
 * 获取退出登录地址
 */
export const getLogoutUrl = () => {
  let account_center_url = process.env.VUE_DSL_ACCOUNT_CENTER_URL ? process.env.VUE_DSL_ACCOUNT_CENTER_URL : "https://account-center-test.readboy.com";
  let redirect_uri = `${window.location.origin}${window.location.pathname}#/auth`;
  redirect_uri = encodeURIComponent(redirect_uri);
  let url = `${account_center_url}/v1/sso/logout?redirect_uri=${redirect_uri}`;

  return url;
};