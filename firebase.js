// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyBOR-HQ1kSKPMo0rfUoiU55nMW2pJlzYY0',
    authDomain: 'randomtubes-167720.firebaseapp.com',
    projectId: 'randomtubes-167720'
  });
  
var db = firebase.firestore();

function get_firebase_data_promise(collection_name,document_name){
    let firebase_doc = db.collection(collection_name).doc(document_name);
    return firebase_doc.get()
};

function set_firebase_data_all(){
    let array = get_all_ids_and_names()
    let to_update = {};
    for (video in array){
        to_update[array[video]["id"]] = array[video]["name"];
    }
    db.collection("all").doc("all").set(to_update,{merge:true})
};

function get_random_videos(number){
    
    get_firebase_data_promise("all","all").then(function(data){
        video_list = data.data();
        list_size = Object.keys(video_list).length;
        random_numbers = [];
        random_videos = [];
        while(random_numbers.length < number){
            num = Math.floor(Math.random() * list_size)
            if (random_numbers.includes(num) == false){
                random_numbers.push(num);
            };
        };
        for (i in random_numbers){
            let key = Object.keys(video_list)[random_numbers[i]];
            let value = Object.values(video_list)[random_numbers[i]];
            key_value = {[key] : value};
            random_videos.push(key_value);

        };
        localStorage.setItem('random_videos', JSON.stringify(random_videos));
    })
};

