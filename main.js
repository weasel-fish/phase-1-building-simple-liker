// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

//on load, add event listener to all like buttons by grabbing class, iterating through html collection
//if heart full change back to empty heart, remove class
//if heart empty:
//invoke mimicServerCall

function addEvents(event) {
  const buttons = Array.from(document.querySelectorAll('.like-glyph'))
  buttons.forEach(node => node.addEventListener('click', event))
}

function likeAction (event) {
  let button = event.target
  if(button.classList.contains('activated-heart')){
    button.textContent = EMPTY_HEART
    button.classList.remove('activated-heart')
  } else {
    mimicServerCall()
    .then(() => {
    button.textContent = FULL_HEART
    button.classList.add('activated-heart')
    })
    .catch(() => {
      let error = document.querySelector('#modal')
      error.classList.remove('hidden')
      setTimeout(() => error.classList.add('hidden'), 3000)
    })
  }
  
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

function init() {
  addEvents(likeAction)
}

document.addEventListener('DOMContentLoaded', init)