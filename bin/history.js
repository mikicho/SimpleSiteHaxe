window.onload = function() {
  
  // Content for the pages.
  // Note: You would probably want to load the page content using AJAX in a 
  // real application.
  var pages = {
    index: {
      title: "Home Page",
      url: "index",
      content: ""
    },
    register: {
      title: "Register",
      url: "register",
      content: ""
    },
    ask: {
      title: "Ask Question",
      url: "ask",
      content: ""
    }
  }


  // Get references to the page elements.
  var navLinks = document.querySelectorAll('.load-content');
  var contentElement = document.getElementsByClassName('content');


  // Update the page content.
  var updateContent = function(stateObj) {
    // Check to make sure that this state object is not null.
    if (stateObj){
		$(".content").html(stateObj.content);
    }
  };


  // Load the page content via AJAX.
  var loadContent = function(url, callback) {
	$.ajax({
		url: url,
		async: true,
		success:function(data){
			pages[url].content = data;
			var pageData = pages[url];
			updateContent(pageData);
			callback();
		}
	});
  };


  // Attach click listeners for each of the nav links.
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function(e) {
      e.preventDefault();

      // Fetch the page data using the URL in the link.
      var pageURL = this.attributes['href'].value;

      loadContent(pageURL, function() {
        var pageData = pages[pageURL];
        // Create a new history item.
        history.pushState(pageData, pageData.title, pageURL);
      });
    });
  }
  

  // Update the page content when the popstate event is called.
  window.addEventListener('popstate', function(event) {
    updateContent(event.state);
  });


  // Load initial content.
  loadContent('index', function() {
    // Update this history event so that the state object contains the data
    // for the homepage.
    history.replaceState(pages.index, pages.index.title, '');
  });
  
};