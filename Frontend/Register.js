const API = "http://localhost:3000/api/register";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const first_name = document.getElementById("first_name").value.trim();
  const last_name = document.getElementById("last_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name, last_name, email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      alert(data.error || "Registration failed");
      return;
    }

    alert("Registration successful. You can now log in.");
    window.location.href = "Login.html";
  } catch (err) {
    console.error(err);
    alert("Network error. Is the backend running?");
  }
});
