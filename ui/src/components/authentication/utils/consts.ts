export enum PagesURL {
  DASHBOARD = "/dashboard",
  CLIENTS = "/clients",
  REPORTS = "/reports",
  DOCUMENTS = "/documents",
  SETTINGS = "/settings",
  AUTHENTICATION = "/",
  OAUTH2_REDIRECT = "/oauth/callback",
  INITIAL_SETTINGS = "/initial-settings",
  ORGANIZATION_SELECTION = "/organization-selection",
  OTP = "/otp",
}

function dec2hex(dec: any) {
  return ("0" + dec.toString(16)).substr(-2);
}

export function generateCodeVerifier() {
  var array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

function sha256(plain: any) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a: any) {
  var str = "";
  var bytes = new Uint8Array(a);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function generateCodeChallengeFromVerifier(v: any) {
  var hashed = await sha256(v);
  var base64encoded = base64urlencode(hashed);
  return base64encoded;
}
