const API_KEY = process.env.CAT_API_KEY;

function getRandomCat() {
  fetch("https://api.thecatapi.com/v1/images/search", {
    headers: { "x-api-key": API_KEY },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        console.log(data[0].url);
        document.querySelector("#cat-image").src = data[0].url;
      }
    })
    .catch((error) => console.error("Error fetching random cat image:", error));
}

function getSpecificCat() {
  let breed = document.querySelector("#breed").value.trim().toLowerCase();

  fetch("https://api.thecatapi.com/v1/breeds", {
    headers: { "x-api-key": API_KEY },
  })
    .then((res) => res.json())
    .then((breeds) => {
      const breedData = breeds.find((b) => b.name.toLowerCase() === breed);
      if (!breedData) {
        alert(`Meow! We couldn't find that cat breed :( Please try again!`);
        return;
      }

      fetch(
        `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${breedData.id}&api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            console.log(data[0].url);
            document.querySelector("#cat-image").src = data[0].url;
          }
        })
        .catch((error) =>
          console.error("Error fetching specific cat image:", error)
        );
    })
    .catch((error) => console.error("Error fetching breed list:", error));
}
