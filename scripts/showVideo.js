const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyCKxFnTCJ6J22zzaUzJX2LxoqYxgzIpaSo";

const video_container = document.getElementById("yt-video");
const videoId = localStorage.getItem("videoId");
const commentsContainer = document.getElementById("comments");

video_container.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

async function getComments() {
  const url = `${BASE_URL}/commentThreads?key=${API_KEY}&videoId=${videoId}&maxResults=80&order=time&part=snippet`;
  const response = await fetch(url, {
    method: "get",
  });
  const data = await response.json();

  const comments = data.items;

  renderComments(comments);
}

function renderComments(comments) {
  commentsContainer.innerHTML = "";
  comments.forEach((comment) => {
    commentsContainer.innerHTML += `
        <p>${comment.snippet.topLevelComment.snippet.textDisplay}</p>
    `;
  });
}

getComments();
