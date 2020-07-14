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
- Random zen quote of the day
- Timed reminders to take breaks and breathe

## TECHNOLOGY USED
### Client Side
- React Client (maybe Redux)
- React Beautiful DND (https://github.com/atlassian/react-beautiful-dnd)
- Google Authorization
- 
### Server Side
- Flask / Python Server
- Postgress Database
- SQLAlchemy / Alembec
- 

## DATABASE TABLES
### USERS
- id (integer, primary key)
- name (string, not null)
- email (string, not null, unique)
### TEAM
- id (integer, primary key)
- 
### BOARDS
- id (integer, primary key)
- board_name (string, not null)
- board_image (string, not null)
- public (boolean, not null)

### LISTS
- id (integer, primary key)
- list_name (string, not null)
- boardId (integer, foreign key)
- duedate (datetime)
- created (datetime, not null)

### CARDS
- id (integer, primary key)
- title (string, not null)
- listId (integer, foreign key)
- description (string, not null)
- color (string)
- completed (boolean, default=false)
- duedate (datetime)
- created (datetime, not null)

### COMMENTS
- id (integer, primary key)
- userId (int, foreign key)
- cardId (int, foreign key)
- text (string, not null)
- created (datetime, not null)
### CHECKLIST
- id (integer, primary key)
- cardId (int, foreign key)
- text (string, not null)
- completed (boolean, not null)

