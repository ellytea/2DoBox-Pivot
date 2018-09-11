$('.save-btn').on('click', createCard);
$('form').on('keyup', saveBtn);
$('.bottom-box').on('click', upDownVoting)
$('.bottom-box').on('click', deleteCard)
$('#search-input').on('keydown', searchBar);


callIdeas();

 function IdeaObject(title, body) {
    this.id = $.now();
    this.title = title;
    this.body = body;
    this.quality = 0;
 }

 function createIdea(title, body) {
    var ideaObject = new IdeaObject(title, body);
    localStoreCard(ideaObject.id, ideaObject);
    return ideaObject;
 }

 function localStoreCard(id, cardData) {
    localStorage.setItem(id, JSON.stringify(cardData));
 }

function callIdeas() {
    for (var i = 0; i < localStorage.length; i++) {
    var cardData = JSON.parse(localStorage.getItem(localStorage.key(i)));
    $( ".bottom-box" ).prepend(newCard(cardData.id, cardData.title, cardData.body, cardData.quality));
    }
}

function createCard(e) {
    e.preventDefault();
    var title = $('#title-input').val();
    var body = $('#body-input').val();
    var newIdea = createIdea(title, body);
    $( ".bottom-box" ).prepend(newCard(newIdea.id, title, body, newIdea.quality));
    clearInputs();
}

function newCard(id , title , body, quality) {
    var qualityOptions = ['swill','plausible','genius'];
    return `<div id="${id}" class="card-container"> 
            <h2 class="title-of-card">${title}</h2>
            <button class="delete-button card-Btn"></button>
            <p class="body-of-card">
             ${body}</p>
             <button class="upvote card-Btn"></button> 
             <button class="downvote card-Btn"></button> 
             <p class="quality" data-number="0">quality: ${qualityOptions[quality]}</p>
             </div>`;
}

function saveBtn(e) {
    e.preventDefault();
    if ($(e.target).has('#title-input') || $(e.target).has('#body-input')) {
       checkInputs();
    }
}

function checkInputs() {
    if ($('#title-input').val() === '' || $('#body-input').val() === '') {
        $('.save-btn').attr('disabled', true);
       } else {
        $('.save-btn').attr('disabled', false);
       }
}

function upDownVoting() {
    var cardObject = JSON.parse(localStorage.getItem($(event.target).parent().prop('id')));
    if ($(event.target).hasClass('upvote') && cardObject.quality < 2) {
       cardObject.quality++; 
    } else if ($(event.target).hasClass('downvote') && cardObject.quality > 0) {
        cardObject.quality--;
    }
    $( ".bottom-box" ).prepend(newCard(cardObject.id, cardObject.title, cardObject.body, cardObject.quality));
    localStoreCard(cardObject.id, cardObject); 
    $(event.target).parent().remove();  
}

function deleteCard() {
    if ($(event.target).hasClass('delete-button')) {
    var id = $(event.target).parent().prop('id');
        localStorage.removeItem(id);
    var cardList = $(event.target).closest('.card-container').remove();
        // $(event.target).parent().remove();
    }
}

// function deleteCard() {
//     var id = $(event.target).parent().prop('id');
//     var cardList = $('.card-container')
//     if ($(event.target).hasClass('delete-button')) {
//         $(event.target).parent().remove();
//         // cardList.addClass('hidden');
//         localStorage.removeItem(id);
//     }
// }


function clearInputs() {
    $('#title-input').val('');
    $('#body-input').val('');
    $('.save-btn').attr('disabled', true);
}

function searchBar() {
    var cardList = $('.card-container')
    var searchFilter = $('#search-input').val().toLowerCase();
    for(var i = 0; i < cardList.length; i++) {
        var title = $(cardList[i]).children('.title-of-card')[0].text();
        var body = $(cardList[i]).children('.title-of-card')[0].text();;
    if(title.toLowerCase().includes(searchFilter) || body.toLowerCase().includes(searchFilter)) {
        cardList.removeClass('hide-card');
    } else {
        cardList.addClass('hide-card');
    }
    }
}

        // if (event.target.className === "upvote" && currentQuality === "plausible"){
        //     qualityVariable = "genius";
        //     $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        // } else if (event.target.className === "upvote" && currentQuality === "swill") {
        //     qualityVariable = "plausible";
        //     $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        // } else if (event.target.className === "downvote" && currentQuality === "plausible") {
        //     qualityVariable = "swill"
        //     $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        // } else if (event.target.className === "downvote" && currentQuality === "genius") {
        //     qualityVariable = "plausible"
        //     $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        // } else if (event.target.className === "downvote" && currentQuality === "swill") {
        //     qualityVariable = "swill";
        
        // } else if (event.target.className === "upvote" && currentQuality === "genius") {
        //     qualityVariable = "genius";
        // }

    // var cardHTML = $(event.target).closest('.card-container');
    // var cardHTMLId = cardHTML[0].id;
    // var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    // var cardObjectInJS = JSON.parse(cardObjectInJSON);

    // cardObjectInJS.quality = qualityVariable;

    // var newCardJSON = JSON.stringify(cardObjectInJS);
    // localStorage.setItem(cardHTMLId, newCardJSON);
    // }
   
    // else if (event.target.className === "delete-button") {
    //     var cardHTML = $(event.target).closest('.card-container').remove();
    //     var cardHTMLId = cardHTML[0].id;
    //     localStorage.removeItem(cardHTMLId);
    // }
// });


      










