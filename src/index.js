


document.addEventListener('DOMContentLoaded', function() {

  const imageId = 24 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage()
})

function getImage() {
  fetch('https://randopic.herokuapp.com/images/24')
  .then(res => res.json())
  .then(image => renderImageInfo(image))
}

function renderImageInfo(data) {
  console.log(data)
  let divImageCard = document.querySelector('#image_card');
  let image = document.querySelector('#image');
  let imageName = document.querySelector('#name')
  let span = document.querySelector('span');
  let imageLikes = document.querySelector('#likes');
  let likeBtn = document.querySelector('#like_button')
  let ulCommentSection = document.querySelector('#comments')
  let imageComments = document.createElement('li')
  let commentArray = []
  let commentList = data.comments.forEach(function(comment) {
    commentArray.push(comment.content)
  })

  image.src = data.url;
  imageName.innerText = data.name;
  imageLikes.innerText = data.like_count;
  imageComments.innerText = commentArray;
  likeBtn.addEventListener('click', function(event) {
    event.preventDefault();
    increaseLikes(event.path[1].children[3].innerText.split(': ')[1])
  })

  ulCommentSection.appendChild(imageComments),
  divImageCard.appendChild(ulCommentSection),
  span.appendChild(imageLikes);
  divImageCard.appendChild(span);
  divImageCard.appendChild(imageName);
  divImageCard.appendChild(image)
}

function increaseLikes(num) {
  console.log('You are in the increaseLikes function');

  let imageLikes = document.querySelector('#likes');

  imageLikes.innerText = parseInt(num) + 1;
}

function updateLikes(id) {
  fetch (`https://randopic.herokuapp.com/likes/${id}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
      'Accept': 'application/json'
    },
    body: JSON.stringify({})
  })
}
