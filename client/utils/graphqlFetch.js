import isomorphicFetch from 'isomorphic-unfetch';
import routeConfig from '../config/routeConfig';

const graphqlFetch = async (query, isClient = false) => {
  let thisFetch = isomorphicFetch;
  if (isClient) {
    thisFetch = fetch;
  }
  const res = await thisFetch(`${routeConfig.root}/graphql`, {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { data } = await res.json();
  return data;
};
export default graphqlFetch;
