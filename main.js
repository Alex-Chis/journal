const loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", getResponse);

async function getResponse() {
  const response = await fetch("https://amxdev.eu/api/items", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json(); // Extracting data as a JSON Object from the response
  const dataArray = Array.isArray(data) ? data : [data];
  const names = [dataArray[0].name, dataArray[1].name];
  const passwords = [dataArray[0].description, dataArray[1].description];

  check(names, passwords);
}

function check(names, passwords) {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  if (names.includes(name) && passwords.includes(password)) {
    const pageUrl = "journal/app/index.html";
    const params = new URLSearchParams({
      param1: name,
    });
    const fullUrl = `${pageUrl}?${params.toString()}`;
    window.location.href = fullUrl;
  } else {
    alert("Wrong name or password");
  }
}
