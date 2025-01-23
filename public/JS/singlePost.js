document.addEventListener("DOMContentLoaded", async () => {
  // Extract the post ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    alert("Invalid post ID");
    return;
  }

  try {
    // Fetch the blog post using the ID
    const response = await fetch(`http://localhost:5000/api/blog/${postId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch the blog post");
    }

    const post = await response.json();
    const postContainer = document.getElementById("postContainer");

    // Dynamically display the post details
    postContainer.innerHTML = `
        <h1>${post.title}</h1>
        <img src="${post.coverImage}" alt="${post.title}">
        <p>${post.content}</p>
        <button id="goBack">Back to Posts</button>
      `;

    // Add "Back" button functionality
    document.getElementById("goBack").addEventListener("click", () => {
      window.location.href =
        "http://127.0.0.1:5500/backend/public/HTML/index.html "; // Adjust path to the main blog posts page
    });
  } catch (err) {
    alert(err.message);
  }
});
