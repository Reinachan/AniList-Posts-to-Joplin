# AniList-Posts-to-Joplin

Uses the AniList API to fetch posts and comments and then makes a notes in Joplin with proper markdown formating.

<br>

## Currently Working

I've outlined what it currently does in the features section, however, before you download this and run it, let me outline what you have to do.

First of all, open the HTML in a text editor (**Do not run it in a browser!**). There you'll see the general stuff you'll need to edit to make it work for yourself. After that, edit the javascript. My code starts at line 5068. I just didn't want to deal with some issues I had with CORS when referencing code in another file, so I put the ratelimiter in the main javascript file.

<br>

## Features

- Fetches posts and comments from AniList
- Combines the comments under the posts in a combined markdown-formated document
- Nice styling to make it all look neat.
- Tracks likes, however, only when fetching all the posts (for now)
- Converts AniList flavoured markdown to CommonMark or HTML. Currently supports 
  - Image with width in pixels
    - `img####(link)` to `<img src"link" width="####"/>`
  - Spoilers
    - `~! content !~` to `<details><summary>Spoiler, click to view</summary> content </details>`

## Planned

In order of priority:

- A simple interface with instructions for non-coders to be able to use
  - I've sketched this out already
  - A button to trigger it instead of running it on launch
- Kitsu support
- Conversion of `webm(link)` to the video/audio HTML blocks

Shoutout to @trigger-segfault for being an immense help while I was struggling to re-learn JavaScript! He also wrote some parts of the code behind the scenes and helped me understand what they were doing!
