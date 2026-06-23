const fetch = require("node-fetch");

async function test() {

  const requests = [];

  for (let i = 0; i < 10; i++) {

    requests.push(
      fetch(
        "http://localhost:5000/seats/1/book",
        {
          method: "POST"
        }
      )
    );

  }

  const responses =
    await Promise.all(requests);

  const results =
    await Promise.all(
      responses.map(r => r.json())
    );

  console.log(results);
}

test();