import fetch from 'isomorphic-unfetch';

export const apiUrl = `${window.location.origin}/api`;

export const GET = (url, option = {}) => {
  return fetch(url, {
    method: 'GET',
    headers: option,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    console.log('Failed.');
    let error = new Error(res.statusText);
    error.res = res;
    return Promise.reject(error);
  });
};

export const POST = (url, data, option = {}) =>
  fetch(url, {
    method: 'POST',
    body: data,
    headers: option,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log('Failed.');
      let error = new Error(res.statusText);
      error.res = res;
      return Promise.reject(error);
    }
  });

export const PUT = (url, data, option = {}) =>
  fetch(url, {
    method: 'PUT',
    body: data,
    headers: option,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log('Failed.');
      let error = new Error(res.statusText);
      error.res = res;
      return Promise.reject(error);
    }
  });

export const DELETE = (url, data, option = {}) =>
  fetch(url, {
    method: 'DELETE',
    body: data,
    headers: option,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log('Failed.');
      let error = new Error(res.statusText);
      error.res = res;
      return Promise.reject(error);
    }
  });

// import axios from "axios";

// const client = (token = null) => {
//   const defaultOptions = {
//     headers: token
//       ? {
//           Authorization: `Bearer ${token}`
//         }
//       : {}
//   };

//   return {
//     get: (url, options = {}) =>
//       axios.get(url, { ...defaultOptions, ...options }),
//     post: (url, data, options = {}) =>
//       axios.post(url, data, { ...defaultOptions, ...options }),
//     put: (url, data, options = {}) =>
//       axios.put(url, data, { ...defaultOptions, ...options }),
//     delete: (url, options = {}) =>
//       axios.delete(url, { ...defaultOptions, ...options })
//   };
// };

// export default client;
