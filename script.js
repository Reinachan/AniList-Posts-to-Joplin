queryFetch (`
  query ($id: Int, $type: ActivityType, $page: Int) {
    Page(page: $page, perPage: 25) {
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
          text(asHtml: true)
          createdAt
          user {
            id
            name
            avatar {
              large
            }
          }
          replies {
            user {
              name
            }
            text
          }
        }
      }
    }
  }
  `
).then(data => {
  console.log(data.data)
})

function queryFetch(query) {
  return fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query
    })
  }).then(res => res.json())
}

/* function handleData(data) {
    console.log(data.data.Page.activities);
    data.data.Page.activities.forEach(activities => {
        const activityPost = document.createElement('div');
        activityPost.innerText = activities.text;
        console.log(activityPost);
        aniListQuery.append(activityPost);
      });
}; */ 
