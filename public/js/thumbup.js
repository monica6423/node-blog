
let thumbUp = function(e){
    let postId = e.target.dataset.id;
    console.log(postId);
    let action = e.target.getAttribute('data-like');
    console.log(action);
    function toggleButtonText(action){
        switch (action){
            case "Like":
            function Like(){
                e.target.setAttribute("data-like", "Unlike");
                e.target.classList.add("red");
            }
            Like();
            break;
    
            case "Unlike": 
            function Unlike(){
                e.target.setAttribute("data-like", "Like");
                e.target.classList.remove("red");
            }
            Unlike();
            break;

        }
    }
    function updatePostStats(action, postId){
        switch (action){
            case "Like":
            function Like(){
                document.querySelector('#likes-count-' + postId).textContent++;
            }
            Like();
            break;
    
            case "Unlike": 
            function Unlike(){
                document.querySelector('#likes-count-' + postId).textContent--;
            }
            Unlike();
            break;
        }
    }
    toggleButtonText(action);
    updatePostStats(action, postId);
    axios.post('/posts/' + postId + '/act', { action: action });
}
  