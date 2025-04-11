document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Initially, add a loading row with ID "loading" for Cypress test compatibility
  output.innerHTML = `
    <tr id="loading">
      <td colspan="2" class="text-center">Loading...</td>
    </tr>
  `;

  // Function to generate a promise with a random delay between 1 and 3 seconds
  function createPromise(index) {
    const delay = Math.random() * 2 + 1; // Random delay between 1 and 3 seconds
    return new Promise((resolve) => {
      setTimeout(() => resolve({ index, time: delay.toFixed(3) }), delay * 1000);
    });
  }

  // Create and track promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  // Wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Remove loading row
    const loadingRow = document.getElementById("loading");
    if (loadingRow) loadingRow.remove(); // Ensure Cypress test passes

    // Get the max time for total duration
    const totalTime = Math.max(...results.map((p) => parseFloat(p.time))).toFixed(3);

    // Populate table with resolved times
    results.forEach(({ index, time }) => {
      output.innerHTML += `
        <tr>
          <td>Promise ${index}</td>
          <td>${time}</td>
        </tr>
      `;
    });

    // Add total time row
    output.innerHTML += `
      <tr>
        <td><strong>Total</strong></td>
        <td><strong>${totalTime}</strong></td>
      </tr>
    `;
  });
});
