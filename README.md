# MELLO - The Zen Trello Clone
Why does going through your to do lists have to be so painful?  With Mello it isn't!
A Zen inspired Kanban board allows you to relax and mindfully evalute your progress, and thoughtfully plan your future!  

## MVP
- Boards (Complete)
- Lists & Cards (Complete)
- Drag and Drop Functionality (COMPLETED!)
- Board Settings (Background Colors/Images) (ALMOST)
- Cards & Lists tilt when moved (COMPLETED!)

## BONUS STRETCH GOALS
- Random zen quote of the day (COMPLETED!)
- Timed reminders to take breaks and breathe (COMPLETED)
- Zen music played in background while logged in (COMPLETED!) 
- Sharing Boards (Teams)
- Checklists and Due Dates
- Hotkeys (Think this is part of React Beautiful DND)


## TECHNOLOGY USED
### Client Side
- React Client 
- React Beautiful DND (https://github.com/atlassian/react-beautiful-dnd)
- React Natural Drag Animation for RBDND (https://github.com/rokborf/natural-drag-animation-rbdnd)
- Chakra Component Library (https://chakra-ui.com/)
- Google Authorization (eventually)

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
- notification (integer, default = 30000)
- theme (string)
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
- list_order ARRAY(string, not null)
- updated (datetime, not null)
- created (datetime, not null)

### LISTS
- id (integer, primary key)
- list_name (string, not null)
- boardId (integer, foreign key)
- card_order ARRAY(string, not null)
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

