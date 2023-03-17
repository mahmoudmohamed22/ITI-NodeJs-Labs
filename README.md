# ITI-NodeJs-Labs
ITI-NodeJs-Labs





## Lab Day 3
Start new express app
Use morgan to log the requests
serve the following apis
A todo has id, title, status
- api to create new todo inside todos.json
- api to get all todos with filter for status
- api to get a single todo based on id
- api to edit a single todo based on id
- api to delete a single todo based on id
In get todos api provide a filter for status

### bonus
In create and update apis validate user’s data for title and status, the title
should be a string with minimum 3 and maximum 20 length, the status should be
one of these values(todo, in-progress, done)


## Day 4 Lab
- Implement Authentication and authorization functionality in our todo app
(singup and signin).
- Use bcrypt and jsonwebtoken packages when needed.
- Use Joi Package to validate the incoming body request https://joi.dev
- Protect creating,updating and deleting todo apis so that only authorized
user can perform these actions


## Lab 5
Create relationship between user and todo models so that one user can have more than one
todo.
Implement the following guidelines while building your todo apis.
- When creating todo it must belong to certain user
- When getting todos only the logged in user todos are returned
Notes to consider:
- Use environment variables to protect sensitive data (dotenv)
- Use cors policy to allow requests from clients (cors)
- Upload the final project to github.
- Protect sensitive information like password form returning in response

### Bonus:
Deploy the app to service provider such as render https://render.com/
