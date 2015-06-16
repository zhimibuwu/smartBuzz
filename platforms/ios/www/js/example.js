/**
 * For debug purpose, catch JavaScript errors.
 */
window.onerror = function(message, file, line) {
  var error = [];
  error.push('---[error]');
  if (typeof message == "object") {
    var keys = Object.keys(message);
    keys.forEach(function(key) {
      error.push('[' + key + '] ' + message[key]);
    });
  } else {
    error.push(line + ' at ' + file);
    error.push(message);
  }
  alert(error.join("\n"));
};

/**
 * Start from here
 */
$(document).on("deviceready", function() {
  var map = plugin.google.maps.Map.getMap();
  
  $("li[action]").click(function() {
    $("#menulist").panel("close");
    
    // Map.clear() method removes all mark-ups, such as marker.
    map.clear();
    
    // Map.off() method removes all event listeners.
    map.off();
    
    var action = $(this).attr("action");
    loadPage(map, action);
  });
  
  /**
   * The side menu overlays above the map, but it's not the children of the map div.
   * In this case, you must call map.setClickable(false) to be able to click the side menu.
   */
  function onSideMenuClose() {
    map.setClickable(true);
  }
  
  function onSideMenuOpen() {
    map.setClickable(false);
  }
  
  $("#menulist").panel({
    "close": onSideMenuClose,
    "open": onSideMenuOpen
  });
  
  loadPage(map, "whereAreYou");
});

/**
 * Change the embed page view.
 * @param {Object} map
 * @param {String} pageName
 */
function loadPage(map, pageName) {
  $(document).trigger("pageLeave", map);
  $.get("./pages/" + pageName + ".html", function(html) {
    $("#container").html(html);
    $.mobile.activePage.trigger("create");
    
    // PrettyPrint
    // @refer https://code.google.com/p/google-code-prettify/
    if (typeof prettyPrint === "function") {
      prettyPrint();
    }
    
    map.clear();
    map.off();
    
    // Embed a map into the div tag.
    var div = $("#map_canvas")[0];
    if (div) {
      map.setDiv(div);
    }
    
    // Execute the code
    setTimeout(function() {
      $(document).trigger("pageLoad", map);
    }, 1000);
  });
}

//Added By Yuan From "index.js"
/*
var googleapi = {
    authorize: function(options) {
        var deferred = $.Deferred();

        //Build the OAuth consent page URL
        var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
            client_id: options.client_id,
            redirect_uri: options.redirect_uri,
            response_type: 'code',
            scope: options.scope
        });

        //Open the OAuth consent page in the InAppBrowser
        var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

        //The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
        //which sets the authorization code in the browser's title. However, we can't
        //access the title of the InAppBrowser.
        //
        //Instead, we pass a bogus redirect_uri of "http://localhost", which means the
        //authorization code will get set in the url. We can access the url in the
        //loadstart and loadstop events. So if we bind the loadstart event, we can
        //find the authorization code and close the InAppBrowser after the user
        //has granted us access to their data.
        $(authWindow).on('loadstart', function(e) {
            var url = e.originalEvent.url;
            var code = /\?code=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                //Always close the browser when match is found
                authWindow.close();
            }

            if (code) {
                //Exchange the authorization code for an access token
                $.post('https://accounts.google.com/o/oauth2/token', {
                    code: code[1],
                    client_id: options.client_id,
                    client_secret: options.client_secret,
                    redirect_uri: options.redirect_uri,
                    grant_type: 'authorization_code'
                }).done(function(data) {
                    deferred.resolve(data);
                }).fail(function(response) {
                    deferred.reject(response.responseJSON);
                });
            } else if (error) {
                //The user denied access to the app
                deferred.reject({
                    error: error[1]
                });
            }
        });

        return deferred.promise();
    }
};

$(document).on('deviceready', function() {
    var $loginButton = $('#login a');
    var $loginStatus = $('#login p');

    $loginButton.on('click', function() {
        googleapi.authorize({
            client_id: '789580882093-si8dnk3hvrfc55a8kmljcgc3tcujtikm.apps.googleusercontent.com',
            client_secret: 'Bc2U86IzKbZrw4cVhj3kB1Hf',
            redirect_uri: 'http://localhost',
            scope: 'https://www.googleapis.com/auth/analytics.readonly'
        }).done(function(data) {
            $loginStatus.html('Access Token: ' + data.access_token);
        }).fail(function(data) {
            $loginStatus.html(data.error);
        });
    });
});*/
