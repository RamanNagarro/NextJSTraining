const fetcher = (...args: [RequestInfo, RequestInit?]) => {
  return fetch(...args).then((res) => res.json());
};

export default fetcher;
