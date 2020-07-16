# MELLO - The Zen Trello Clone
Why does going through your to do lists have to be so painful?  With Mello it isn't!
A Zen inspired progress tracker allows you to relax and mindfully evalute your progress, and thoughtfully plan your future!  

## MVP
- Boards
- Lists & Cards
- Sharing Boards (Teams)
- Comments and Due Dates

## BONUS STRETCH GOALS
- Board Settings (Background Colors/Images)
- Hotkeys (Think this is part of React Beautiful DND)
- Checklists
- Zen music played in background while logged in
- Random zen quote of the day (COMPLETED!)
- Timed reminders to take breaks and breathe

## TECHNOLOGY USED
### Client Side
- React Client (maybe Redux)
- React Beautiful DND (https://github.com/atlassian/react-beautiful-dnd)
- Chakra Component Library (https://chakra-ui.com/)
- Google Authorization (maybe)
- 

### Server Side
- Flask / Python Server
- Postgress Database
- SQLAlchemy / Alembec
- ZenQuotes API (https://zenquotes.io/)

## DATABASE TABLES
### USERS
- id (integer, primary key)
- username (string, not null)
- email (string, not null, unique)
- hashed_password (string, not null)
- last_login (datetime, not null)
- created (datetime, not null)

### TEAMS
- id (integer, primary key)
- team_name (string, not null)
- userId (int foreign key)

### BOARDS
- id (integer, primary key)
- userId (integer, foreign key)
- board_name (string, not null)
- board_image (string, not null)
- public (boolean, default=false)
- team (boolean, default=false)
- teamId (integer, foreign key)
- list_order (string, not null)
- updated (datetime, not null)
- created (datetime, not null)

### LISTS
- id (integer, primary key)
- list_name (string, not null)
- boardId (integer, foreign key)
- card_order (string, not null)
- duedate (datetime)
- updated (datetime, not null)
- created (datetime, not null)

### CARDS
- id (integer, primary key)
- title (string, not null)
- listId (integer, foreign key)
- description (string, not null)
- color (string)
- completed (boolean, default=false)
- duedate (datetime)
- updated (datetime, not null)
- created (datetime, not null)

### COMMENTS
- id (integer, primary key)
- userId (int, foreign key)
- cardId (int, foreign key)
- text (string, not null)
- updated (datetime, not null)
- created (datetime, not null)

### CHECKLIST
- id (integer, primary key)
- cardId (int, foreign key)
- text (string, not null)
- completed (boolean, default=false)
- updated (datetime, not null)
- completed (boolean, not null)

