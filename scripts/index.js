const axios = require("axios");

const get_data = async (skip, limit, value = 0) => {
  // const url = `https://api.beta.dofusdb.fr/items?$sort=-level&level[$gte]=0&level[$lte]=200&$skip=${skip}&lang=fr&$limit=${limit}`;
  // const url = `https://api.dofusdb.fr/characteristics?$skip=${skip}&visible=true&$limit=${limit}&categoryId[$in][]=2&categoryId[$in][]=3&categoryId[$in][]=4&categoryId[$in][]=5&$sort[categoryId]=1&$sort[order]=1&lang=fr`;
  const url = `https://api.dofusdb.fr/items?typeId[$in]=${value}&lang=fr&$limit=${limit}`;
  try {
    const response = await axios.get(url);
    const items = response.data;
    console.log(items);

    if (items.data.length >= 1) {
      items.data.forEach((item) => {
        axios
          .post("http://localhost:3000/itemType", item.type)
          .catch((error) => {
            if (error.status === 409) {
              console.log("Item already exist");
            } else {
              console.error("Error posting data:", error);
            }
          });
      });
    } else {
      console.log("No more items to fetch");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const pause = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const fetchData = async () => {
  const total = 2;
  const step = 1;
  const timeOut = 1000;
  for (let index = 0; index < total; index += step) {
    await get_data(0, step, index);
    console.log(`still ${total - index} items to fetch`);
    console.log(`Total :(${(index / total) * 100}/100 %)`);
    //api.dofusdb.fr/items?typeId[$in]=&lang=fr
    await pause(timeOut);
  }
};

fetchData();
