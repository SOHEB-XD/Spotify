
console.log("lets Start JavaScript");
let currentSong = new Audio();

async function getSongs() {

    let a = await fetch("Songs");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");

    let songs = [];

    for (let index = 0; index < as.length; index++) {

        if (as[index].href.endsWith(".mp3")) {
            songs.push(as[index].href.split("/Songs/")[1]);
        }
    }

    return songs;

}



const playMusic = (track)=>{
     
    // let audio = new Audio("/Songs/" + track);

    currentSong.src = "/Songs/" + track;
    currentSong.play();
}




async function main() {

    let songs = await getSongs();

    // show all the songs in playlist
    let songUL = document.querySelector(".library-list").getElementsByTagName("ul")[0];

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                                                    <div class="info">
                                                        <img src="music.svg" alt="">
                                                        <p>${song.replaceAll("%20", " ").replaceAll("%20", " ")}</p>
                                                        
                                                    </div>

                                                    <div>
                                                        Play Now
                                                        <span> <img src="platBtn.svg" alt=""></span>
                                                    </div>

                                                </li>`
    }

    Array.from(document.querySelector(".library-list").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element=>{

            console.log(e.querySelector(".info").lastElementChild.innerHTML);
            playMusic(e.querySelector(".info").lastElementChild.innerHTML.trim());

        })
    });

    let pauseBtn = document.getElementById("pause");

    pauseBtn.addEventListener("click", ()=>{

        if (currentSong.paused) {
            currentSong.play();
            pauseBtn.src = "play.svg";

        }
        else{
            currentSong.pause();
            pauseBtn.src = "pause.svg";
        }
    })


    

}

main();
