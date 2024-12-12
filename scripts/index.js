const axios = require("axios");

const get_data = async (skip, limit) => {
  //   const url = `https://api.dofusdb.fr/item-types?$skip=${skip}&$limit=${limit}&lang=fr`;
  const url = `https://api.beta.dofusdb.fr/items?$sort=-level&level[$gte]=0&level[$lte]=200&$skip=${skip}&lang=fr&$limit=${limit}`;
  try {
    const response = await axios.get(url);
    const items = response.data;
    items.data.forEach((item) => {
      axios.post("http://localhost:3000/item", item).catch((error) => {
        if (error.status === 409) {
          console.log("Item already exist");
        } else {
          console.error("Error posting data:", error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const pause = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const fetchData = async () => {
  const total = 21000;
  const step = 20;
  const timeOut = 1000;
  for (let index = 1200; index < total; index += step) {
    await get_data(index, step);
    console.log(`still ${total - index} items to fetch`);
    console.log(`Total :(${(index / total) * 100}/100 %)`);

    await pause(timeOut);
  }
};

fetchData();
