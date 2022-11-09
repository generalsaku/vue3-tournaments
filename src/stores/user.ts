import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    isAuthorized: false,
    name: "",
    image: "",
  });

  const accessTokenKey = "access_token";

  const authorize = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop as any),
    }) as any;

    if (params?.access_token?.length) {
      localStorage.setItem(accessTokenKey, params.access_token);
      window.location.href = window.location.href.split("?")[0];
    }

    const access_token = localStorage.getItem(accessTokenKey);
    if (access_token?.length) {
      const jwt = parseJwt(access_token ?? "");

      user.value.isAuthorized = !isTokenExpired(jwt.exp);
      user.value.name = jwt.name ?? "[no name]";
      user.value.image =
        jwt.image ??
        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="; // empty image

      return;
    }

    user.value.isAuthorized = false;
  };

  const deauthorize = () => {
    localStorage.removeItem(accessTokenKey);
    user.value.isAuthorized = false;
    user.value.name = "";
    user.value.image = "";
  };

  return { authorize, deauthorize, user };
});

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const isTokenExpired = (exp: number) => Date.now() >= exp * 1000;
