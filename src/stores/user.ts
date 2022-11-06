import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {

  const isLoggedIn = ref(false);
  const image = ref('');
  const name = ref('');
  
  const accessTokenKey = "access_token"

  const updateLoggedIn = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop as any),
    }) as any;
    
    if (params?.access_token?.length) {
      localStorage.setItem(accessTokenKey, params.access_token);
      window.location.href =  window.location.href.split("?")[0]
    }

    const access_token = localStorage.getItem(accessTokenKey)
    isLoggedIn.value = !!access_token?.length

    if (isLoggedIn.value) {
      const jwtPayload = parseJwt(access_token ?? '')
      name.value = jwtPayload.name ?? '[no name]'
      image.value = jwtPayload.image ?? 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=' // empty image
    }
  }

  const signOut = () => {
    localStorage.removeItem(accessTokenKey)
    isLoggedIn.value = false
    image.value = ''
    name.value = ''

    // TODO: go to / ?
  }

  const signIn = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/login?redirectUri=${window.location.href}`;
  }

  return { isLoggedIn, name, image, updateLoggedIn, signIn, signOut };
});


const parseJwt = (token: string) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}