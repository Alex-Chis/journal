const queryString = window.location.search;
const addNote = document.getElementById("addNote");
const title = document.getElementById("title");
const description = document.getElementById("description");
const urlParams = new URLSearchParams(queryString);

const nameA = urlParams.get("param1");
async function getData() {
  const response = await fetch("https://amxdev.eu/api/items", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json(); // Extracting data as a JSON Object from the response
  const dataArray = Array.isArray(data) ? data : [data];

  dataArray.forEach((item) => {
    if (item.name == nameA) {
      displayNote(item.date, item.title, item.description);
    }
  });
}

getData();

function displayNote(date, title, description) {
  const div = document.createElement("div");
  const p1 = document.createElement("p");
  p1.textContent = date;
  const p2 = document.createElement("p");
  p2.textContent = title;
  const p3 = document.createElement("p");
  p3.textContent = description;
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);
  document.querySelector(".notes").appendChild(div);
}

addNote.addEventListener("click", add);

function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = today.getDate(); // No padding for single-digit days

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

async function add() {
  if (nameA == null) {
    window.location.href = "/journal/index.html";
  }

  const titleA = title.value;
  const descriptionA = description.value;
  const response = await fetch("https://amxdev.eu/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameA,
      date: getDate(),
      title: title.value,
      description: description.value,
    }),
  });
  const data = await response.json();
  console.log(data);
}
