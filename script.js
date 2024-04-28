// Links for the videos
const intro = 'LFVo3sFJ3yA';
const cupcakes = 'PhCO_uJ_pz4';
const yellow_frosting = 'GKFAQTHhAsY';
const red_frosting = 'fl6M1oSj9y8'
const yellow_frosting_sprinkles = 'D8yT0BGv-xQ';
const yellow_frosting_no_sprinkles = 'aYYrNmGvHEA';
const red_frosting_sprinkles = 'q0Wq1eIRlg8';
const red_frosting_no_sprinkles = 'QbvtpwSjTGE';
const cookies='lkhv42bjcbM';
const cookies_white_chocolate='GmsgtTyM9mc';
const cookies_milk_chocolate='yC5jYEbNQeY';
const bloopers='FlmrPmoHRxE';

let frostingChoice;
let checkPopupsInterval;
// Select all popups and hide them initially
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => popup.classList.add('hidden'));

const popupSchedules = {
    'LFVo3sFJ3yA': [{time: 18, popupIndex: 2}],
    'PhCO_uJ_pz4': [{time: 81, popupIndex: 0}, {time: 168, popupIndex: 3}],
    'lkhv42bjcbM': [{time: 152, popupIndex: 5}],
    'GKFAQTHhAsY': [{time: 34, popupIndex: 4}],
    'fl6M1oSj9y8': [{time: 28, popupIndex: 4}],
    'GmsgtTyM9mc': [{time: 41, popupIndex: 1}],
    'yC5jYEbNQeY': [{time: 41, popupIndex: 1}]
};


// This will be filled with the current video's popup events
let popupEvents = [];

let player; // This will be the YouTube player object
let currentVideoId; // The current video ID from the YouTube URL

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        height: '1080',  
        width: '1920',  
        videoId: 'ECf85Vdf-a8',  
        playerVars: {
            'autoplay': 1,
            'enablejsapi': 1,
            'modestbranding': 1,
            'autohide': 1,
            'iv_load_policy':3,
            'rel':0,
            'showinfo':0,
            'controls':0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    loadVideoSegment(intro);  
}

function onPlayerStateChange(event) {
    console.log('Player state:', event.data);
    if (event.data == YT.PlayerState.PLAYING) {
        checkPopupsInterval = setInterval(checkPopups, 1000); // Check every second
    } else {
        clearInterval(checkPopupsInterval);
    }
}

// Replaces the handleTimeUpdate function
function checkPopups() {
    const currentTime = player.getCurrentTime();

    if (popupEvents.length > 0 && currentTime >= popupEvents[0].time) {
        showPopup(popups[popupEvents[0].popupIndex]);
        popupEvents.shift();
    }
}

// Update to use YouTube API
function showPopup(popup) {
    popup.classList.remove('hidden');
    popup.classList.add('visible');
    document.getElementById('youtubePlayer').classList.add('blurred');
    player.pauseVideo();
}

// Update to use YouTube API
function hidePopup(popup) {
    popup.classList.add('hidden');
    popup.classList.remove('visible');
    document.getElementById('youtubePlayer').classList.remove('blurred');
    player.playVideo();
}

function loadVideoSegment(videoId) {
    console.log('Loading video:', videoId);
    currentVideoId = videoId;
    player.loadVideoById(videoId); // Cue the video by ID
    popupEvents = popupSchedules[videoId] || [];
    console.log('Popup events:', popupEvents);

    player.playVideo();
}

function handleQuiz(answer) {
    hidePopup(document.querySelector('.visible'));
}

function handleChoice(choice) {
    let videoId;
    // Map the choice to a video ID
    switch (choice) {
        case 'Cupcakes':
            videoId = cupcakes; 
            break;
        case 'Cookies':
            videoId = cookies; 
            break;
        case 'Yellow':
            videoId = yellow_frosting; 
            frostingChoice = 'yellow_frosting';
            break;
        case 'Red':
            videoId = red_frosting; 
            frostingChoice = 'red_frosting';
            break;
        case 'With Sprinkles':
            if (frostingChoice === 'yellow_frosting') {
                videoId = yellow_frosting_sprinkles;
            } else {
                videoId = red_frosting_sprinkles;
            };
            break;
        case 'No Sprinkles':
            if (frostingChoice === 'yellow_frosting') {
                videoId = yellow_frosting_no_sprinkles;
            } else {
                videoId = red_frosting_no_sprinkles;
            };
            break;
        case 'White Chocolate':
            videoId = cookies_white_chocolate; 
            break;
        case 'Milk Chocolate':
            videoId = cookies_milk_chocolate; 
            break;
        default:
            videoId = intro; 
            break;
    }
    hidePopup(document.querySelector('.visible'));
    loadVideoSegment(videoId);
}



