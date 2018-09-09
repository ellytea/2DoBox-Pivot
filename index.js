$('.save-btn').on('click', createCard);

callIdeas();

 function IdeaObject(title, body){
    this.id = $.now();
    this.title = title;
    this.body = body;
    this.quality = 'swill';
 }

 function createIdea(title, body) {
    var ideaObject = new IdeaObject(title, body);
    localStoreCard(ideaObject.id, ideaObject);
    return ideaObject;
 }

 function localStoreCard(id, cardData){
    localStorage.setItem(id, JSON.stringify(cardData));
 }

function callIdeas() {
    for (var i = 0; i < localStorage.length; i++) {
    var cardData = JSON.parse(localStorage.getItem(localStorage.key(i)));
    $( ".bottom-box" ).prepend(newCard(cardData.id, cardData.title, cardData.body, cardData.quality));
    }
}

function createCard(event){
    event.preventDefault();
    var title = $('#title-input').val();
    var body = $('#body-input').val();
    var newIdea = createIdea(title, body);
    $( ".bottom-box" ).prepend(newCard(newIdea.id, title, body, newIdea.quality));
    // clearInputs();
}

function newCard(id , title , body , quality) {
    return `<div id="${id}" class="card-container"> 
            <h2 class="title-of-card">${title}</h2>
            <button class="delete-button"></button>
            <p class="body-of-card">
             ${body}</p>
             <button class="upvote"></button> 
             <button class="downvote"></button> 
             <p class="quality">quality:${quality}</p>
             </div>`;
}


function saveBtn(){
    if ($('#title-input').val() === "" || $('#body-input').val() === "") {
       $('.save-btn').prop('disabled', true);
    } else {
        $('.save-btn').prop('disabled', false);
    }
}

// function clearInputs(){
//     $('#title-input').val('');
//     $('#body-input').val('');
//     $('.save-btn').prop('disabled', true);
// }


$(".bottom-box").on('click', function(event){
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            qualityVariable = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityVariable = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityVariable = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityVariable = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityVariable = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityVariable = "genius";
        }

    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].id;
    var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);

    cardObjectInJS.quality = qualityVariable;

    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTMLId, newCardJSON);
    }
   
    else if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
});


      










