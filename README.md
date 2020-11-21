# AniList-Posts-to-Joplin

Uses the AniList API to fetch posts and comments and then makes a notes in Joplin with proper markdown formating.

<br>

## Release
The first release should work well so long as you follow the instructions in `index.html`. It is, however, a pre-release, so do make sure to keep a backup of your Joplin notes in case anything breaks. Make sure to [report bugs](https://github.com/Reinachan/AniList-Posts-to-Joplin/issues) if you spot any.

https://github.com/Reinachan/AniList-Posts-to-Joplin/releases

<br>

## Dependency
You need to install [Joplin](https://joplinapp.org/) to use this tool. Unless you want to tweak it yourself to your own needs.

<br>

## Features

- A simple interface with instructions for non-coders to be able to use
- Fetches posts and comments from AniList
- Combines the comments under the posts in a combined markdown-formated document
- Nice styling to make it look neat in Joplin.
- Tracks likes, however, only when fetching all the posts (for now)
- Converts AniList flavoured markdown to CommonMark or HTML. Currently supports 
  - Image with width in pixels
    - `img####(link)` to `<img src"link" width="####"/>`
  - Spoilers
    - `~! content !~` to `<details><summary>Spoiler, click to view</summary> content </details>`

<br>

## Planned

In order of priority

- Improve the UI styling
- Kitsu support
- Conversion of `webm(link)` to the video/audio HTML blocks

<br>

## Afterwords

Shoutout to @trigger-segfault for being an immense help while I was struggling to re-learn JavaScript! He also wrote some parts of the code behind the scenes and helped me understand what it was doing!
