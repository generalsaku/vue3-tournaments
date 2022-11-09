export const requestGet = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: headers(),
  });

  return read(response);
};

export const requestPost = async (url: string, body: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });

  return read(response);
};

export const requestForm = async (url: string, formData: FormData) => {
  const response = await fetch(url, {
    method: "POST",
    headers: headers({
      Accept: "application/json",
      "Content-Type": 'multipart/form-data; boundary="yet another boundary',
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }),
    body: formData,
  });

  return read(response);
};

export const requestDelete = async (url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: headers(),
  });

  return response.status;
};

export const requestPatch = async (url: string, body: any = {}) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(body),
  });

  return response.status;
};

export const requestPut = async (url: string) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: headers(),
  });

  return response.status;
};

const headers = (headers = {}) => {
  const token = localStorage.getItem("access_token");

  return Object.assign(
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    headers
  );
};

const read = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return await response.json();
  } else {
    return await response.text();
  }
};
