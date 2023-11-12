# Parkour: Social Media Site
_Omi Johnson_

Parkour is a social media site for hikers to post about their adventures and connect with parks and hikers they care about! This piece was originally a final project for CS5610: Web Development and was created in a 4-person team. I have since taken the project and added additional fixes and improvments. 

[parkour-social-media-site.netlify.app](https://parkour-social-media-site.netlify.app/)

## Concept

The social media site is designed to give hikers a space to post about the parks they love! National parks each have an account hosting a "board." Hiker accounts can post to boards, like other posts, and follow users. There are also "Rangers", which are official moderators for their National Park and have special authorities for making and deleting posts. By using the "Search" feature, hikers can explore other parks and find additional information about the places they love. 

* Users can register, log in, and log out
* Create, read, like, and delete posts
* Navigate to other user profiles
* Highlight content from followed users and latest park news
* Search parks to find additional information about contact info and open hours

## Implementation

This project is a React.js app coded with HTML, CSS, Bootstrap, and Javascript. The frontend is implemented as a Single-Page-Application using Routes for each relevant page of the application. User authentication is managed using Redux.js. The application makes calls to [parkour-backend](https://github.com/oj713/parkour-backend), a Node.js API, to retrieve user and post information. The application also calls to the [National Park Service API](https://www.nps.gov/subjects/developer/api-documentation.htm) for news and search result information. The application utilizes responsive design and functions on a laptop, tablet, and phone. This site is hosted using [Netlify](https://www.netlify.com/). 

## To-do

This application is a work in progress. The initial time for execution was short and there are many features I would like to improve or add!

* Security: Authentication encryption, password verification, Ranger verification by Parks. 
* UI Redesign to add additional complexity, better navigation, etc.
* Additional permissions for Ranger and Park profiles, such as blocked terms for posts to their board, blocked users, and statistics. 
* Improve search logic (currently non-scalable, faulty)
* Improve performance and scalability (batch loading, size enforcement)
* Support additional post types such as polls and ratings 
