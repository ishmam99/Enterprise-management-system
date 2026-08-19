// src/composables/useHRM.js
import { ref, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/AuthStore";

const HRM_BASE_URL = import.meta.env.VITE_HRM_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_HRM_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_HRM_CLIENT_SECRET;

export function useHRM() {
  const authStore = useAuthStore();

  // Reactive token from store
  const token = computed(() => authStore.hrm_token);
  const user = ref(null);
  const loading = ref(false);

  // ----------------------
  // SSO Exchange Function
  // ----------------------
  async function exchange() {
    loading.value = true;

    const email = authStore.user?.email;
    if (!email) {
      Swal.fire("Error", "User email not found for HRM SSO", "error");
      loading.value = false;
      return;
    }

    try {
      const res = await axios.post(`${HRM_BASE_URL}/api/sso/exchange`, {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        email: email,
      },{
        headers: {
          Accept: "application/json"
          // no Content-Type here
        }
      });

      authStore.hrm_token = res.data.token; // Sanctum token
      user.value = {
        id: res.data.user_id,
        roles: res.data.roles
      };

      return user.value;
    } finally {
      loading.value = false;
    }
  }

  // ----------------------
  // HRM Axios Instance
  // ----------------------
  const hrmApi = axios.create({
    baseURL: HRM_BASE_URL + "/api",
    headers: { Accept: "application/json" }
  });

  hrmApi.interceptors.request.use(config => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });

  // Auto-refresh token on 401
  hrmApi.interceptors.response.use(
    response => response,
    async error => {
      const original = error.config;

      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;
        try {
          await exchange();
          original.headers.Authorization = `Bearer ${token.value}`;
          return hrmApi(original);
        } catch {
          logout();
        }
      }

      return Promise.reject(error);
    }
  );

  // ----------------------
  // Logout
  // ----------------------
  function logout() {
    authStore.hrm_token = null;
    user.value = null;
  }

  return {
    exchange,
    hrmApi,
    token,
    user,
    loading,
    logout
  };
}
