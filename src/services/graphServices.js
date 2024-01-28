export async function getGraph() {
  const response = await fetch("http://localhost:3001/charts");
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
  return await response.json();
}

// export async function createGraph(charts) {
//   const response = await fetch("http://localhost:3001/charts", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(charts),
//   });
//   return await response.json();
// }
