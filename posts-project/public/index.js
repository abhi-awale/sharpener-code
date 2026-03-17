const form = document.getElementById("postForm")
const postsContainer = document.getElementById("postsContainer")

window.addEventListener("DOMContentLoaded", loadPosts)

const apiEndpoint = "http://localhost:4000/posts";

// CREATE POST
form.addEventListener("submit", async function (e) {

    e.preventDefault()

    const link = document.getElementById("imageUrl").value
    const description = document.getElementById("description").value

    await axios.post(apiEndpoint, {
        link,
        description
    })

    form.reset()

    loadPosts()

})



// GET POSTS
async function loadPosts() {

    const res = await axios.get(apiEndpoint)

    const posts = res.data.data;

    postsContainer.innerHTML = ""

    posts.forEach(post => {

        const div = document.createElement("div")

        div.className = "card mb-3"

        

        div.innerHTML = `

        <div class="card-body">

        <img src="${post.link}" class="img-fluid mb-2">

        <p>${post.description}</p>

        <a href="#" onclick="toggleComments(${post.id})">Comments</a>

        <div id="commentSection-${post.id}" style="display:none">

            <div id="commentList-${post.id}" class="mt-2"></div>

            <input
            type="text"
            id="commentInput-${post.id}"
            class="form-control mt-2"
            placeholder="Add comment">

            <button
            class="btn btn-sm btn-primary mt-2"
            onclick="addComment(${post.id})">

            Add

            </button>

        </div>

        </div>
        `

        postsContainer.appendChild(div)

        loadComments(post.id)

    })

}



// TOGGLE COMMENT BOX
function toggleComments(postId) {

    const section = document.getElementById(`commentSection-${postId}`)

    section.style.display =
        section.style.display === "none" ? "block" : "none"

}



// LOAD COMMENTS
async function loadComments(postId) {

    const res = await axios.get(`${apiEndpoint}/${postId}/comments`)

    const comments = res.data.data

    const container = document.getElementById(`commentList-${postId}`)

    if (!container) return

    container.innerHTML = ""

    comments.forEach(c => {

        const p = document.createElement("p")

        p.innerText = c.commentText

        container.appendChild(p)

    })

}



// ADD COMMENT
async function addComment(postId) {

    const input = document.getElementById(`commentInput-${postId}`)

    const text = input.value

    if (!text) return

    await axios.post(`${apiEndpoint}/${postId}/comments`, {
        commentText: text,
    })

    input.value = ""

    loadComments(postId)

}