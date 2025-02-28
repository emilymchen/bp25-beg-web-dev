function getRandomDog() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message);
      document.querySelector("#dog-image").src = data.message;
    });
}
//https://dog.ceo/api/breed/hound/images/random Fetch!

function getSpecificDog() {
  let breed = document.querySelector("#breed").value;
  let errorMessage = document.querySelector("#error-message");
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then((res) => {
      if (!res.ok) {
        errorMessage.textContent = `Woof woof, we couldn't find that dog :( Please try again!`;
        document.querySelector("#error-message").style.visibility = "visible";
        return;
      }
      document.querySelector("#error-message").style.visibility = "hidden";
      return res.json();
    })
    .then((data) => {
      console.log(data.message);
      document.querySelector("#dog-image").src = data.message;
    });
}
