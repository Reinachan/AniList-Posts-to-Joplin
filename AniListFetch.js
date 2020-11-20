//Defining stuff for later to not clutter the code with long stuff
  // HTML styling of the username and link
let customStyleUsernamePart1 = '<div style="width:98%; background-color:#181A1D;border-bottom:4px solid #2E3138; height:68px;padding:5px;padding-left:8px;margin-bottom:20px;border-radius:2px;"><svg width=".85em" height=".85em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#E85D75" xmlns="http://www.w3.org/2000/svg" style="float:right; margin-right: 20px;margin-top:13px;"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg><p style="float:right; margin-right: 4px; transform: translateY(-2px);font-size:1em;color:#E85D75;"> <b>'
let customStyleUsernamePart2 = '</b></p><img src="'
let customStyleUsernamePart3 = '" style="float:left;margin-right:15px;height:67px;width:auto;"/> <p style="font-size:1.5em;line-height:4px;color:#F2F3F4;margin-top:25px;margin-bottom:9px;"><b>'
let customStyleUsernamePart4 = '</b></p><a href="https://anilist.co/activity/'
let customStyleUsernamePart5 = '" style="color:#E5F1FF;font-size:0.9em;">Link</a></div>'

  // HTML styling of the username for comments
let customStyleUsernameCommentsPart1 = '<div style="width:98%; background-color:#181A1D;border-bottom:4px solid #2E3138;  height:68px; padding:5px; padding-left:8px; margin-bottom:20px; border-radius:7px;"><svg width=".85em" height=".85em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#E85D75" xmlns="http://www.w3.org/2000/svg" style="float:right; margin-right: 20px;margin-top:13px;"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg><p style="float:right; margin-right: 4px; transform: translateY(-2px);font-size:1em;color:#E85D75;"> <b>'
let customStyleUsernameCommentsPart2 = '</b></p><img src="'
let customStyleUsernameCommentsPart3 = '" style="float:left;margin-right:15px;height:67px;width:67px;object-fit:cover;"/> <p style="font-size:1.5em;line-height:4px;color:#F2F3F4;margin-top:33px;margin-bottom:9px;"><b>'
let customStyleUsernameCommentsPart4 = '</b></p></div>'


  //Joplin Access Token
let joplinToken = "token"

// RegEx to convert AniList-flavoured Markdown to HTML
function aniListMarkdown(content) {
  content = content.replace(/img(\d{1,4})\((.{1,500}.{1,5})\)/g, '<img src="$2" width="$1"/>');
  content = content.replace(/~!([\s\S]{1,}?)!~/g, '<details><summary>Spoiler</summary>$1</details>');
  return content;
}

// var pages = [];
//
// function handlePage(page) {
//   // set the page number for options
//   let pageOptions = /*blah*/;
//   return fetch(urlForPage, pageOptions)
//        .then(handleResponse)
//        .then(function (data) {
//     pages[pageNum] = data;
//     if (data.pageInfo.HasNextPage)
//       return handlePage(page + 1);
//   });
// }

// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query ($id: Int, $type: ActivityType, $page: Int) {
  Page(page: $page) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    activities(userId: $id, type: $type, sort: ID_DESC) {
      ... on TextActivity {
        id
        type
        replyCount
        likeCount
        text(asHtml: false)
        createdAt
        user {
          id
          name
          avatar {
            large
          }
        }
        replies {
          likeCount
          user {
            name
            avatar {
              large
            }
          }
          text
        }
      }
    }
  }
}
`;

// Define our query variables and values that will be used in the query request
var variables = {
  id: 110292,
  page: 1,
  type: "TEXT"
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co'
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

function queryPage(page) {
  variables.page = page; // update page variable before adding to options
  // update options.body with the new variables (updated page)
  options.body = JSON.stringify({
            query: query,
            variables: variables
        });
  // Make the HTTP Api request
  return fetch(url, options)
                   .then(handleResponse)
                   .then(handleData)
                   .catch(handleError);
}

queryPage(1);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    data.data.Page.activities.forEach(activities => {

        // Get the posts themselves
        var activityPost = activities.text;

        // RegEx a title for the note
        var postTitle = activityPost.replace(/^#*\s*(~~~\s*)?(.*?)(\s*~~~)?\s*$/m, '$2');
        postTitle = postTitle.replace(/(.{1,75})[^]*/g, '$1');

        // Convert posts to common Markdown format/HTML
        activityPost = aniListMarkdown(activityPost);

        // Fetch some stuff from the API for use later
        let commentAmount = activities.replyCount;
        let usernamePoster = activities.user.name;
        let postLikeCount = activities.likeCount;
        let avatarPoster = activities.user.avatar.large;
        let postID = activities.id;
        var commentsOnPost = activities.replies;

        // Convert the object data of the comments and usernames to strings
        var jsonComments = JSON.stringify(commentsOnPost);

        // Format the strings to something human-readable after markdown before sending it to the new JSON
            // replaces username
        jsonComments = jsonComments.replace(/:(\d{1,}?),"user":\{"name":"(.{1,}?)","avatar":{"large":"(.{1,}?)"\}\},/g, "\n" + customStyleUsernameCommentsPart1 + '$1' + customStyleUsernameCommentsPart2 + '$3' + customStyleUsernameCommentsPart3 + '$2' + customStyleUsernameCommentsPart4 + "\n\n");
            // removes the first "user" and adds the "Comments" divider
        jsonComments = jsonComments.replace(/^\[\{"likeCount"/g, '\n<br>\n<br>\n\n- - -\n\n<p style="font-size:2em;margin-left:5px;"><b>Comments</b></p>\n\n- - -\n\n');
            // replaces body of text
        jsonComments = jsonComments.replace(/"text":"((.)*)("},\{"likeCount"|"\}\]$)/g, '$1\n\n<br>\n\n- - -\n\n');
            // changes new-lines to actual new lines.
        jsonComments = jsonComments.replace(/\\n/g, '\n');

        // Convert comments to common Markdown format/HTML
        jsonComments = aniListMarkdown(jsonComments);

        // Assemble the post along with the comments
        let postWithCommentsAndNames = customStyleUsernamePart1 + postLikeCount + customStyleUsernamePart2 + avatarPoster + customStyleUsernamePart3 + usernamePoster + customStyleUsernamePart4 + postID + customStyleUsernamePart5 + '\n\n' + activityPost + '\n\n' + jsonComments;

        // Notebook ID
        let parentID = "cb293e9d9d534b69b50f4f4d5562a4ae"

        // Post publish date
        var postCreated = activities.createdAt;

        // Converting PostID to to 32 characters
        postID = "414c5f414354" + postID.toString(16).padStart(32 - "414c5f414354".length, "0"); // 16 is optional. Changes it to hex

        let toJoplin = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "id": postID,
            "title": postTitle,
            "parent_id": parentID,
            "body": postWithCommentsAndNames,
            "created_time": postCreated,
            "user_created_time": postCreated
          })
        };

        //Sending the data to Joplin
        fetch("http://localhost:41184/notes?" + joplinToken, toJoplin)
        .then(res => {
          if (res.bodyUsed) {
            console.log("Request complete! response:", res);
          } else {
              fetch("http://localhost:41184/notes/:id?" + joplinToken, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "id": postID,
                "body": postWithCommentsAndNames
              })
            }).then(res => {
                console.log("Your note was updated! response:", res);
            })
          }
        });


    });
    if (data.data.Page.pageInfo.hasNextPage)
      return queryPage(variables.page + 1);
};

// Errorhandling
function handleError(error) {
    alert('Error, check console');
    console.error(error);
}
