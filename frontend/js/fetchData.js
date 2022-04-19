let fetchData = async (url) => {
  let response = await fetch(url);
  let json = await response.json();
  return json.data;
};