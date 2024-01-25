export async function getGraph() {
  const response = await fetch("http://localhost:3001/charts");
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
  return await response.json();
}
