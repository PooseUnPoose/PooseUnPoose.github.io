const API_KEY = 'AIzaSyDiDKImHuDaRI2CftpUq1LxU0B3Y3_AjyE';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

document.getElementById('searchButton').addEventListener('click', searchYouTube);
//document.getElementById('AddButton').addEventListener('click', AddtoQueue);
document.getElementById('NextButton').addEventListener('click', playNextVideo);


function searchYouTube() {
    const query = document.getElementById('searchInput').value;
    const maxResults = 5; // You can adjust this as needed
    const url = `${BASE_URL}?part=snippet&key=${API_KEY}&q=${query}&maxResults=${maxResults}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data.items))
        .catch(error => console.error('Error:', error));
}
function displayResults(videos) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';
    videos.forEach(video => {
        const videoLink = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.default.url;
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <a href="${videoLink}" target="_blank">
                <img src="${videoThumbnail}" alt="Video Thumbnail" style="width: 120px; height: 90px;"><br>
                ${videoTitle}
            </a>
            <p></p>`;
        resultsDiv.appendChild(videoElement);
    });
}
                
let VideoQueue = [];
let TitleQueue = [];
let VideoLink;
let VideoSource = "";
let Arrayindex = 1;
            
function AddtoQueue(){
    VideoQueue.push(document.getElementById("SearchBar").value);
    console.log(VideoQueue);
    document.getElementById("SearchBar").value = "";
}

function playNextVideo() {
    if (VideoQueue.length > 0) {
        VideoLink = GetCodeFromLink(VideoQueue.shift());
        VideoSource = "https://www.youtube.com/embed/" + VideoLink;
        document.getElementById("VideoPlayer").src = VideoSource;
        let QueueList = document.getElementById("QueueList");
        QueueList.removeChild(QueueList.firstChild);
    }
}

function GetCodeFromLink(link){
    let videoID = link.match(/(?<=v=)[^&]+/)[0];
    return videoID;
}

document.getElementById('searchResults').addEventListener('click', function(event) {
    if(event.target.tagName === 'A') {
        var url = event.target.href;
        document.getElementById('SearchBar').value = url;
        event.preventDefault();
        getVideoNameFromLink(url);
        document.getElementById("searchResults").innerHTML = "";
        AddtoQueue();
        displayQueue();

    }
});

let VideoNames = [];
function getVideoNameFromLink(link) {
    const videoID = link.match(/(?<=v=)[^&]+/)[0];
    const videoInfoURL = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=snippet&key=${API_KEY}`;
    fetch(videoInfoURL)
        .then(response => response.json())
        .then(data => {
            const videoTitle = data.items[0].snippet.title;
            console.log(videoTitle);
            VideoNames.push(videoTitle);
            console.log(VideoNames);
            displayQueue(); 
        })
        .catch(error => console.error('Error:', error));
}

function displayQueue() {
    const QueueList = document.getElementById('QueueList');
    QueueList.innerHTML = '';
    VideoNames.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <p>${video}</p>
            <p></p>`;
        QueueList.appendChild(videoElement);
    });
}

var form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    searchYouTube();
});