export function setAuthHeader() {
    var token = localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY) || sessionStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY);
    return { "Authorization": token };
};