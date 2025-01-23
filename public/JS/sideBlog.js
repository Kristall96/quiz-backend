document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:5000/api/blog", {
      method: "GET",
    });

    if (!response) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch");
    }
    const posts = await response.json();
    const asideRight = document.getElementById("asideRight");
    posts.forEach((post) => {
      const div = document.createElement("div");
      div.id = "rightDiv";
      div.setAttribute("data-id", post._id);
      div.innerHTML = `
      <ul id="rightUl">
        <li class="rightLi">${post.title}</li>
        <li class="rightLi"><img src="${post.coverImage}"></img></li>
      </ul>
        `;
      div.addEventListener("click", async () => {
        try {
          await fetch(`http://localhost:5000/api/blog/${post._id}/views`, {
            method: "PATCH",
          });
          window.location.href = `http://localhost:5000/html/singlePost.html?id=${post._id}`;
        } catch (err) {
          alert(err);
        }
      });

      asideRight.appendChild(div);
    });
  } catch (err) {
    alert(err.message);
  }
});
