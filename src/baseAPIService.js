import axios from "axios";

const baseUrl = "https://localhost:7120/api/";

export const getHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");
  let headers = {
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": "*"
  };
  return headers; 
}

export const getApi = async urlPath => {
  let apiURL = `${baseUrl}${urlPath}`;
  const response = await axios.get(apiURL, {
   // headers: getHeaders()
  });
  return response;
}

export const putApi = async (urlPath, data) => {
  let apiURL = `${baseUrl}${urlPath}`;
  const response = await axios.put(apiURL, data, {
    headers: getHeaders()
  });
  return response;
}

export const patchApi = async (urlPath, data) => {
  let apiURL = `${baseUrl}${urlPath}`;
  const response = await axios.patch(apiURL, data, {
    headers: getHeaders()
  });
  return response;
}

export const delApi = async urlPath => {
  let apiURL = `${baseUrl}${urlPath}`;
  const response = await axios.delete(apiURL, {
    headers: getHeaders()
  });
  return response;
}

export const postApi = async (urlPath, data) => {
  let apiURL = `${baseUrl}${urlPath}`;
  const response = axios.post(apiURL, data, {
    headers: getHeaders()
  });
  return response;
}

const getFormDataHeader = () => {
  const accessToken = localStorage.getItem("accessToken");
  let headers = {
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data"
  };
  return headers;
}

export const postFormDataApi = async (urlPath, data) => {
  let apiURL = `${baseUrl}${urlPath}`;
  const response = await axios.post(apiURL, data, {
    headers: getFormDataHeader()
  });
  return response;
}