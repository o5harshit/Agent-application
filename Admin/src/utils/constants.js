export const HOST = import.meta.env.VITE_SERVER_URL;

//AUTH ROUTES
export const AUTH_ROUTES = `${HOST}/api/auth`
export const ADMIN_LOGIN_ROUTE = `${AUTH_ROUTES}/admin-Login`
export const ADMIN_SIGNUP_ROUTE = `${AUTH_ROUTES}/admin-signup`
export const GET_USER_INFO = `${AUTH_ROUTES}/Admin-info`
export const LOGOUT_USER  = `${AUTH_ROUTES}/logout`

// Agent Create Route
export const CREATE_AGENT = `${AUTH_ROUTES}/create-Agent`


//UPLOAD CSV ROUTES

export const UPLOAD_CSV = `${AUTH_ROUTES}/upload-csv`
export const LEADER_BOARD = `${AUTH_ROUTES}/with-leads`