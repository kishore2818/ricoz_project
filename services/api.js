const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

function getAuthHeaders() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  if (!token || token === 'undefined' || token === 'null') return {};
  return { Authorization: `Bearer ${token}` };
}

function handleUnauthorized(status) {
  if (status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (!['/login', '/register', '/'].includes(window.location.pathname)) {
      window.location.href = '/login';
    }
  }
}

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) {
    handleUnauthorized(res.status);
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function apiPost(path, body = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    handleUnauthorized(res.status);
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function apiPut(path, body = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    handleUnauthorized(res.status);
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) {
    handleUnauthorized(res.status);
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function apiUpload(path, formData, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}${path}`);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          resolve(xhr.responseText);
        }
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err.message || `Upload failed with status ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(formData);
  });
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'Login failed');
  }
  return res.json();
}

export async function register(userData) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'Registration failed');
  }
  return res.json();
}

export { API_URL };
