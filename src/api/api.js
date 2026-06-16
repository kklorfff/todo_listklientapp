const BASE_URL = "https://demo2.z-bit.ee";

let token = null;

export function setToken(t) {
  token = t;
}

async function request(url, method = "GET", body) {
  const res = await fetch(BASE_URL + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}

// AUTH
export const register = (data) => request("/users", "POST", data);
export const login = (data) => request("/tokens", "POST", data);

// TASKS
export const getTasks = () => request("/tasks");
export const createTask = (data) => request("/tasks", "POST", data);
export const updateTask = (id, data) => request(`/tasks/${id}`, "PUT", data);
export const deleteTask = (id) => request(`/tasks/${id}`, "DELETE");