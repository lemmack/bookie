// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName,siteUrl)) {
    document.getElementById('myForm').reset();
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Local Storage Test
  // localStorage.setItem('test', 'Hello World');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

  // If no bookmarks
  if (!localStorage.getItem('bookmarks')) {
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Add array to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  // If bookmarks
  else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Resend array to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Delete bookmarks
function deleteBookmark(i){
  // Get bookmark array
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Remove bookmark from array
  bookmarks.splice(i, 1);
  // Resend array to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body mt-3">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a>'+
                                  ' <a onclick="deleteBookmark(\''+i+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                  '</h3>'+
                                  '</div>';
  }
}

// Validate form
function validateForm(siteName,siteUrl){
  if (!siteName || !siteUrl) {
    alert('One or more fields are blank.');
    return false;
  }

  // Check if URL is valid
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  // If not valid, give error.
  if (!siteUrl.match(regex)){
    alert('Please use a valid URL.');
    return false;
  }

  // If valid, proceed.
  return true;
}
