/**
 * Sample JavaScript code for youtube.search.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

//probably gonna have to unorder the search and then do another query that takes the 25 and finds the one with the most likes
//look at the youtube api under videos to accomplish this

const { google } = require("https://apis.google.com/js/api.js");

function authenticate() {
  return gapi.auth2
    .getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
    .then(
      function () {
        console.log("Sign-in successful");
      },
      function (err) {
        console.error("Error signing in", err);
      }
    );
}
function loadClient() {
  gapi.client.setApiKey();
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  let search = document.getElementById("status").value + "tutorial";
  return gapi.client.youtube.search
    .list({
      part: "snippet",
      type: "video",
      maxResults: 10,
      order: "relevance",
      q: search,
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        let ids = {};
        for (i = 0; i < response.result.items.length; i++) {
          ids[response.result.items[i].id.videoId] = 0;
        }
        organize(ids);
        /*
        let arr = Object.keys(ids)
        let largest = parseInt(ids[arr[0]])
        console.log(arr[0])
        let s_key = arr[0]
        for(i=1; i<arr.length; i++) {
          if(parseInt(ids[arr[i]]) > largest) {
            s_key = arr[i]
            largest = parseInt(ids[s_key])
          }
        }
        console.log(s_key)
        console.log(largest)*/
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

function organize(ids) {
  var list = Object.keys(ids);
  return gapi.client.youtube.videos
    .list({
      part: ["statistics"],
      id: [list.toString()],
    })
    .then(
      function (response) {
        for (let i = 0; i < list.length; i++) {
          ids[list[i]] = response.result.items[i].statistics.likeCount;
        }
        let largest = parseInt(ids[list[0]]);
        let s_key = list[0];
        for (i = 1; i < list.length; i++) {
          if (parseInt(ids[list[i]]) > largest) {
            s_key = arr[i];
            largest = parseInt(ids[s_key]);
          }
        }
        var div = document.getElementById("here");
        div.innerHTML += "youtube.com/watch?v=" + s_key + "<br>";
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
});
