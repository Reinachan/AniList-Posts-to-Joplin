# AniList-Posts-to-Joplin

Uses the AniList API to fetch posts and comments and then makes those into notes in Joplin with proper markdown formating and stylisation.

https://github.com/Reinachan/AniList-Posts-to-Joplin

<br>

## Release
The [initial pre-release](https://github.com/Reinachan/AniList-Posts-to-Joplin/releases) should work well so long as you follow the instructions in `index.html`. It is a pre-release, so do make sure to keep a backup of your Joplin notes in case anything breaks. Make sure to [report bugs](https://github.com/Reinachan/AniList-Posts-to-Joplin/issues) if you spot any.

<br>

## Dependency
You need to install [Joplin](https://joplinapp.org/) to use this tool. Joplin is an open-source program for writing notes using markdown.

<br>

## Features

- A simple interface with instructions for non-coders to be able to use
- Fetches posts and comments from AniList
- Respects the ratelimit
- Combines the comments under the posts in a combined markdown-formated document
- Nice styling applied to the content so that it look orderly in Joplin.
- Tracks likes
- Converts AniList flavoured markdown to CommonMark or HTML. Currently supports 
  - Image (also supports with width in pixels)
    - converts to `<img src"link" width="####"/>`
  - Spoilers
    - converts to `<details><summary>Spoiler, click to view</summary> content </details>`

<br>

## Planned

In order of priority

- Improve the UI styling
- Kitsu support
- Conversion of `webm(link)` to the video/audio HTML blocks
- A separate button to only update likes
- Backup forum threads (if I can figure out how)

<br>

## Afterwords

Shoutout to @triggersegfault for being an immense help while I was struggling to re-learn JavaScript! He also wrote some parts of the code behind the scenes and helped me understand what it was doing.

<br>

- - -

<br>

# Release Notes

**v.0.1-alpha**
To use this tool, follow the instructions in index.html.

This initial release is functionally mostly complete but has some bugs here and there and a very rudimentary interface.

Current functionality:

- Simple-to-use UI to make the process easy for anyone
- Fetch all activities on your profile along with their replies and back them up to Joplin
- Tracking of likes on activities and replies
- Conversion of some AniList-flavoured markdown to CommonMark spec or HTML
