let thumbUp = function (e) {
    let postId = e.target.dataset.id;
    //console.log(postId);
    let action = e.target.getAttribute('data-like');
    //console.log(action);
    toggleButtonText[action](e.target);
    updatePostStats[action](postId);
    axios.post('/posts/' + postId + '/act', { action: action });
};

let updatePostStats = {
    Like: function (postId) {
        document.querySelector('#likes-count-' + postId).textContent++;
    },
    Unlike: function(postId) {
        document.querySelector('#likes-count-' + postId).textContent--;
    }
};

let toggleButtonText = {
    Like: function(i) {
        i.setAttribute("data-like", "Unlike");
        i.classList.add("red");
    },
    Unlike: function(i) {
        i.setAttribute("data-like", "Like");
        i.classList.remove("red");
    }
};

/******************/
