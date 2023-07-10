console.log("Welcome to spotify clone")

//Initialzie the variables
let songIndex = 1;
let audioElement = new Audio('songs/1.mp3');
// audioElement.play();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById("masterSongName");

let songs = [
    {songName: "Baarishein  by Anuv Jain", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    {songName: "2002 Song | Anne-Marie", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    {songName: "Faasle by Shrey Singhal", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    {songName: "Sham by Amit Trivedi", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    {songName: "Darasal by Atif Aslim", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    {songName: "Jab koi baat bigad jaye", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    {songName: "Raanjhana ve", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" }
]

songItems.forEach((element,i) => {
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//Listen to events
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})


audioElement.addEventListener('timeupdate',()=>{
    // console.log("Timeupdate");
    // update seeker
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        makeAllPlays();
        
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex - 1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
});

document.getElementById("next").addEventListener("click", () => {
    if(songIndex>6){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
document.getElementById("previos").addEventListener("click", () => {
    if(songIndex<=1){
        songIndex = 7;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});