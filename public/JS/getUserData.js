document.addEventListener("DOMContentLoaded", async () => {
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
      row.setAttribute("data-id", user._id);
      row.innerHTML = `
        <td>${user._id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td class="admin-status">${user.isAdmin ? "Admin" : "Not Admin"}</td>
        <td>${user.role}</td>
        <td id="btns">
          <div class="toggle-switch" data-id="${user._id}" data-admin="${
        user.isAdmin
      }">
            <div class="toggle-circle ${user.isAdmin ? "active" : ""}"></div>
          </div>
          <button class="update-role">Update Role</button>
          <button class="delete-user">Delete User</button>
        </td>
      `;
      usersTable.appendChild(row);
    });

    // Add event listeners to all delete buttons
    const deleteButtons = document.querySelectorAll(".delete-user");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const userId = event.target.closest("tr").getAttribute("data-id");

        const confirmDelete = confirm(
          "Are you sure you want to delete this user?"
        );
        if (!confirmDelete) return;

        try {
          // Send DELETE request to the backend
          const response = await fetch(
            `http://localhost:5000/api/updates/user/${userId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to delete user");
          }

          // Remove the user's row from the table
          const userRow = event.target.closest("tr");
          if (userRow) userRow.remove();

          alert("User deleted successfully!");
        } catch (err) {
          alert(err.message);
        }
      });
    });

    // Add event listeners to all toggle switches
    const adminToggles = document.querySelectorAll(".toggle-switch");
    adminToggles.forEach((toggle) => {
      toggle.addEventListener("click", async (event) => {
        const userId = toggle.dataset.id;
        const isAdmin = toggle.dataset.admin === "true";

        try {
          // Toggle isAdmin status in the backend
          const response = await fetch(
            `http://localhost:5000/api/update/users/${userId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ isAdmin: !isAdmin }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to update admin status");
          }

          const updatedUser = await response.json();

          // Update the toggle visual state
          toggle.dataset.admin = updatedUser.isAdmin; // Update data-admin attribute
          const toggleCircle = toggle.querySelector(".toggle-circle");
          toggleCircle.classList.toggle("active", updatedUser.isAdmin);

          // Update the displayed admin status
          const adminStatusCell = toggle
            .closest("tr")
            .querySelector(".admin-status");
          adminStatusCell.textContent = updatedUser.isAdmin
            ? "Admin"
            : "Not Admin";
        } catch (err) {
          alert(err.message);
        }
      });
    });
  } catch (err) {
    alert(err.message);
  }
});
