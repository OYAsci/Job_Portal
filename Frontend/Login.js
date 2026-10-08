const API = "http://localhost:3000/api/login";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    // Optional: store userId for later use
    if (data.userId !== undefined) {
      localStorage.setItem("userId", String(data.userId));
    }

    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Network error. Is the backend running?");
  }
});
