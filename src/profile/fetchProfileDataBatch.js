export const fetchProfileDataBatch = (urls, setter, fieldName) => {
  let tmpDataBatch = [];
  urls.map((url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        tmpDataBatch = [...tmpDataBatch, data[fieldName]];
        setter(tmpDataBatch);
        console.log("tmp data batch:", tmpDataBatch);
      })
      .catch((error) => {
        console.error("Error fetching batch data: ", error);
      });
  });
};
