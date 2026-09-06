// Vite inlines env vars verbatim — unlike a .env parser, it won't strip
// surrounding quotes if someone pastes VITE_SERVER_HOST as "https://...".
// Guard against that here so a misconfigured host var fails loudly via a
// real network error instead of silently resolving as a relative path.
const rawServerHost = import.meta.env.VITE_SERVER_HOST ?? "";
export const server_host = rawServerHost.trim().replace(/^["']|["']$/g, "");
export const registerUser = server_host + "/register";
export const loginUser = server_host + "/login";
export const meUser = server_host + "/me";
export const logoutUser = server_host + "/logout";
export const pagesEndpoint = server_host + "/pages";
export const blocksEndpoint = server_host + "/blocks";
