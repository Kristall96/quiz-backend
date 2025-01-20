document.addEventListener("DOMContentLoaded", async (req, res) => {
  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "GET",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch data");
    }

    const users = await response.json();
    const usersTable = document.getElementById("mainContent");
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${user._id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user._id}</td>
            <td>
                <button onClick="updateRole('${user._id}')"> Update Role </button>
                <button onClick="deleteUser('${user._id}')"> Delete User </button>
            </td>
            `;
      usersTable.appendChild(row);
    });
  } catch (err) {
    alert(err.message);
  }
});
