/**
 * External links to the Reluxio app. Override per environment with
 * NEXT_PUBLIC_APP_URL (e.g. staging vs production).
 */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://reluxio.binhnt.tech";

export const SIGNUP_URL = `${APP_URL}/signup`;
export const LOGIN_URL = `${APP_URL}/login`;

/** Contact for the "Talk to us" CTA — swap for a proper address when ready. */
export const CONTACT_EMAIL = "binhnt.010896@gmail.com";
