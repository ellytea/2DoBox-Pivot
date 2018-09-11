$('.save-btn').on('click', createCard);
$('form').on('keyup', saveBtn);
$('.bottom-box').on('click', upVoting);
$('.bottom-box').on('click', downVoting);
$('.bottom-box').on('click', deleteCard);
$('#search-input').on('keyup', searchBar);
$('.bottom-box').on('keyup', makeEditsTitle);
$('.bottom-box').on('keyup', makeEditsBody);

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
            <h2 class="title-of-card" contenteditable="true">${title}</h2>
            <button class="delete-button card-Btn"></button>
            <p class="body-of-card" contenteditable="true">
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

function upVoting() {
    if ($(event.target).hasClass('upvote')) {
    var cardObject = JSON.parse(localStorage.getItem($(event.target).parent().prop('id')));
    if ($(event.target).hasClass('upvote') && cardObject.quality < 2) {
       cardObject.quality++; 
    } 
    $( ".bottom-box" ).prepend(newCard(cardObject.id, cardObject.title, cardObject.body, cardObject.quality));
    localStoreCard(cardObject.id, cardObject); 
    $(event.target).parent().remove();  
    }
}

function downVoting(){
    if ($(event.target).hasClass('downvote')) {
    var cardObject = JSON.parse(localStorage.getItem($(event.target).parent().prop('id')));
    if ($(event.target).hasClass('downvote') && cardObject.quality > 0) {
        cardObject.quality--;
    }
    $( ".bottom-box" ).prepend(newCard(cardObject.id, cardObject.title, cardObject.body, cardObject.quality));
    localStoreCard(cardObject.id, cardObject); 
    $(event.target).parent().remove();  
    }
}

function deleteCard(event) {
    if ($(event.target).hasClass('delete-button')) {
    var id = $(event.target).parent().attr('id');
    $(event.target).parents('.card-container').remove()
    localStorage.removeItem(id);
    }
}

function clearInputs() {
    $('#title-input').val('');
    $('#body-input').val('');
    $('.save-btn').attr('disabled', true);
}

function makeEditsTitle(event) {
    if ($(event.target).hasClass('title-of-card')) {
    var id = $(event.target).parent().attr('id');
    var cardData = JSON.parse(localStorage.getItem(id));
    var changeTitle = $(event.target).text();
    cardData.title = changeTitle;
    localStoreCard(id, cardData);
    }
}

function makeEditsBody(event) {
    if ($(event.target).hasClass('body-of-card')) {
    var id = $(event.target).parent().attr('id');
    var cardData = JSON.parse(localStorage.getItem(id));
    var changeBody = $(event.target).text();
    console.log(changeBody)
    cardData.body = changeBody;
    localStoreCard(id, cardData);
    }
}

function searchBar() {
 var searchValue = $(this).val().toLowerCase();
 $('.card-container').filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
 });
}
