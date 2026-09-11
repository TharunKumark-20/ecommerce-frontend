import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090",
});


/*
 * Add the access token to every request.
 */
api.interceptors.request.use(
  (config) => {

    const accessToken =
      localStorage.getItem("accessToken");


    if (accessToken) {

      config.headers.Authorization =
        `Bearer ${accessToken}`;

    }


    return config;
  },

  (error) => {

    return Promise.reject(error);

  }
);


/*
 * Handle expired access tokens.
 */
api.interceptors.response.use(

  (response) => {

    return response;

  },

  async (error) => {

    const originalRequest =
      error.config;


    /*
     * Only try to refresh when:
     * 1. Backend returned 403
     * 2. This request has not already been retried
     * 3. The failed request is not the refresh endpoint itself
     */
    if (
      error.response?.status === 403 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {

      originalRequest._retry = true;


      const refreshToken =
        localStorage.getItem("refreshToken");


      /*
       * No refresh token means the user
       * must log in again.
       */
      if (!refreshToken) {

        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");

        localStorage.removeItem("userId");

        localStorage.removeItem("role");

        window.location.href = "/login";

        return Promise.reject(error);
      }


      try {

        /*
         * Use axios directly here instead of "api"
         * so the refresh request doesn't trigger
         * this interceptor again.
         */
        const response =
          await axios.post(
            "http://localhost:9090/auth/refresh",
            {
              refreshToken: refreshToken
            }
          );


        const newAccessToken =
          response.data.accessToken;


        const newRefreshToken =
          response.data.refreshToken;


        /*
         * Save the new tokens.
         */
        localStorage.setItem(
          "accessToken",
          newAccessToken
        );


        if (newRefreshToken) {

          localStorage.setItem(
            "refreshToken",
            newRefreshToken
          );

        }


        /*
         * Retry the original request
         * with the new access token.
         */
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;


        return api(
          originalRequest
        );


      } catch (refreshError) {

        console.error(
          "Token refresh failed:",
          refreshError
        );


        /*
         * Refresh token is no longer usable.
         * Clear the session and send the user
         * back to login.
         */
        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");

        localStorage.removeItem("userId");

        localStorage.removeItem("role");


        window.location.href = "/login";


        return Promise.reject(
          refreshError
        );
      }
    }


    return Promise.reject(error);

  }
);


export default api;