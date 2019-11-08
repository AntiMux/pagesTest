const videos_number = 50;

function update_local_storage(number) {
    let local_data = JSON.parse(localStorage.getItem("random_videos"));
    if (local_data == null) {
        get_random_videos(number);
        set_firebase_data_all()
    } else if (Object.entries(local_data).length <= 1) {
        get_random_videos(number);
        set_firebase_data_all()
    }
}

function getFirstItemFromLS() {
    let lSData = JSON.parse(localStorage.getItem("random_videos"));
    let first = lSData[0];
    return first;
    // let key = Object.keys(first)[0];
    // let value = first[key];
}

function removeFirstItemFromLS() {
    let first = getFirstItemFromLS();
    let lSData = JSON.parse(localStorage.getItem("random_videos"));
    lSData.shift();
    localStorage.setItem('random_videos', JSON.stringify(lSData));

}

function updateVideoAndTitle() {
    update_local_storage(videos_number);
    let video = getFirstItemFromLS();
    let key = Object.keys(video)[0];
    let value = video[key];
    let clean_value = value.replace(/&#39;/g, "'")
    let final_value = clean_value.replace(/&quot;/g, "\"")
    let super_final_value = final_value.replace(/&amp;/g, "&")
    videoLink.src = "https://www.youtube.com/embed/" + key + "?&autoplay=1";
    videoTitle.textContent = super_final_value;
    localStorage.setItem('current_video', JSON.stringify(key));
    document.getElementById("shareLink").value = "https://www.randomtubes.net?link=" + key;
    removeFirstItemFromLS()
}

function start_random() {
    // videoLink.src ="https://www.youtube.com/embed/"+ getVideoId()+"?&autoplay=1";
    updateVideoAndTitle();
}

var link = getParameterByName('link');
if (link == null) {
    start_random();
} else {
    videoLink.src = "https://www.youtube.com/embed/" + link + "?&autoplay=1";
}


update_local_storage(videos_number);