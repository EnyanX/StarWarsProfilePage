export const fetchProfileData = (url, setter, fieldName) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setter(data[fieldName]);
      // return(data[fieldName]);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
};
