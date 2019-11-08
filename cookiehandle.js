
const joinArray = () => {
    let joinArray = get_all_ids();
    return joinArray.join('|');
}
const joinArrayParam = (array) => {
    return array.join('|');
}

const addSplitCookie = () => {
    document.cookie = "ids = |" + joinArray();
}
const addSplitCookieParam = (array) => {
    document.cookie = "ids = |" + array;
}

const splitCookieToArray = () => {
    let cookie = document.cookie;
    let array = cookie.split('|');
    array.shift();
    return array;
}

function get_link_from_cookie() {
    let cookie_array = splitCookieToArray();
    let link = cookie_array[0];
    cookie_array.shift();
    addSplitCookieParam(joinArrayParam(cookie_array));

    return link;
}

function getVideoId() {
    if (splitCookieToArray().length == 1) {
        let link = get_link_from_cookie();
        addSplitCookie();
        return link;
    } else {
        return get_link_from_cookie();
    }
}


if (document.cookie.indexOf('ids=') == -1) {
    addSplitCookie();
};


