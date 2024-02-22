export const fetchProfileDataBatch = (urls, setter, fieldName) => {
  return Promise.all(urls.map(url =>
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        return data[fieldName]; // only fetch the specific field value
      })
      .catch(error => {
        console.error("Error fetching batch data: ", error);
        return { error: `Failed to fetch data for URL: ${url}`, details: error.message };
      })
  ))
  .then(allResults => {
    setter(allResults);
    return allResults;
  });
};