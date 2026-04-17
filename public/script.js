const form = document.getElementById("coverForm");
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const outputBox = document.getElementById("outputBox");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    company: document.getElementById("company").value,
    skills: document.getElementById("skills").value
  };

  loading.classList.remove("hidden");
  outputBox.classList.add("hidden");

  try {
    const res = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    output.innerText = result.letter;
    outputBox.classList.remove("hidden");

  } catch (err) {
    output.innerText = "Error generating letter";
    outputBox.classList.remove("hidden");
  }

  loading.classList.add("hidden");
});

// Copy Button
function copyText() {
  navigator.clipboard.writeText(output.innerText);
  alert("Copied to clipboard!");
}