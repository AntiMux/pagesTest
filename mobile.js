if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	
	let once = localStorage.getItem("random_videos");
	console.log(once)
	if (once == null){
		location.replace("https://www.randomtubes.net");
	};
	
    function addVideoToDom() {

        // adding elements to the dom
        let videoContainer = document.querySelector('.video');
        let videoDiv = document.createElement('div');
        let titltAndShareDiv = document.createElement('div');
        let videoElemnt = document.createElement('iframe');
        let videoTitleElemnt = document.createElement('h2');
        let shareDiv = document.createElement('div');
        let spanIcon = document.createElement('span');
        let shareLink = document.createElement('input');

        // adding classes names:
        videoDiv.className = 'video new';
        // videoDiv.id = "new";
        titltAndShareDiv.className = 'titltAndShare'
        videoElemnt.className = 'theVideo';
        videoTitleElemnt.className = 'videoTitle';
        shareDiv.className = 'share';
        spanIcon.className = 'shareIcon';
        shareLink.className = 'shareLink';
        shareLink.id = "shareLink";


        //video
        videoElemnt.setAttribute("src", "");

        //title
        videoTitleElemnt.textContent = "";

        // share
        const icon = "<i class='fas fa-share-alt'>";
        spanIcon.innerHTML = icon;
        shareLink.readOnly = true;


        //adding to HTML
        videoDiv.append(videoElemnt);
        videoDiv.append(titltAndShareDiv);
        titltAndShareDiv.append(videoTitleElemnt);
        shareDiv.append(spanIcon);
        shareDiv.append(shareLink);
        videoDiv.append(shareDiv);
        titltAndShareDiv.append(shareDiv);
        videoContainer.append(videoDiv);



        // get data from LS
        update_local_storage(videos_number);
        let video = getFirstItemFromLS();
        let key = Object.keys(video)[0];
        let value = video[key];
        let clean_value = value.replace(/&#39;/g, "'")
        let final_value = clean_value.replace(/&quot;/g, "\"")
        videoElemnt.src = "https://www.youtube.com/embed/" + key + "?&autoplay=1";
        videoTitleElemnt.textContent = final_value;
        shareLink.value = "https://www.randomtubes.net?link=" + key;
        removeFirstItemFromLS()


        spanIcon.addEventListener('click', function () {
            var copyText = shareLink;
            copyText.select();
            copyText.setSelectionRange(0, 99999)
            document.execCommand("copy");
        });


    }


    function addMultipleVideos(num) {
        for (let i = 0; i < num; i++) {
            addVideoToDom();
        }
    };

    addMultipleVideos(4);

    function removeVideo() {
        document.querySelectorAll('.new').forEach(el => el.remove());

    }


    // figure out if the user is scolling to the end of the page, and if they are then add more videos to the DOM.

    window.addEventListener('scroll', function () {
        //value of window.scrollY + window.innerHeight - the value of the current scroll or where are in the DOM at the moment
        if (window.scrollY + window.innerHeight + 350 >= document.documentElement.scrollHeight) {
            addMultipleVideos(5);
        }

        // //values of the actual height of the DOM
        // console.log(document.documentElement.scrollHeight);
        // console.log(window.scrollY + window.innerHeight);
    })


};