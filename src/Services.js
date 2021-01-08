import axios from 'axios';

export const onAuthenticate = () => {
  const URL = `https://api.tvmaze.com/search/shows?q=walking`;
  return axios(URL, {
    method: 'GET',
  })
    .then(response =>response.data)
    .catch(error => {
      throw error;
    });

    
};