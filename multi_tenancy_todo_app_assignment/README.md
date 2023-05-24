# Todo App
This repository contains the code for Todo App which is a Next.js project. It is built on top of the React framework and provides a powerful environment for creating server-side rendered (SSR) and statically generated (SSG) applications.

## Getting Started
To get started with the project, follow these steps:

### Clone the repository to your local machine using the command:
git clone https://github.com/himanshu9999git/todo_app.git

### Navigate to the project directory:
`cd next-js-project`


### Install the project dependencies:
`npm install`

### Start the development server:
`npm run dev`
This command will launch the development server and you can access your application at http://localhost:3000.

## Folder Structure
The project's folder structure is organized as follows:

* **/pages**: This directory contains the pages of the todo app. These files represent different views or routes of the application. The list of pages is as follows: 

    * _app.js: This file is used to customize the default Next.js app component. You can use it to wrap your app with additional providers or global styles.
    * _document.js: This file is used to customize the HTML document that is rendered by Next.js. You can add custom tags or modify the document structure.
    * index.js: This file represents the main entry point of the todo app. It can contain the layout and routing logic, as well as the initial data fetching. It is protected from access by unauthorized users

    

* **/components**: This directory contains reusable React components that can be used across different pages. The list of the components is as follows:

    * AddUserForm.jsx: A component that represents a form for adding new users to the todo app.
    * AssignTodoModal.jsx: A modal component that allows assigning a todo to a specific user.
    * EditModal.jsx: A modal component for editing a todo item.
    * EditUserForm.jsx: A form component for editing user details.
    * Flexbetween.jsx: A reusable component that creates a flexbox container with space between items.
    * Navbar.jsx: A navigation bar component for navigating through the app.
    * PieChart.jsx: A component for displaying a pie chart visualization of todo statistics.
    * PrivateRoute.jsx: A higher-order component (HOC) that protects routes and ensures they can only be accessed by authenticated users.
    * Protected.jsx: A component that displays a message or redirects unauthenticated users.
    * Sidebar.jsx: A sidebar component for navigating to different sections of the app.
    * TaskModal.jsx: A modal component for displaying detailed information about a task.
    * UserDataTable.jsx: A component that renders a table displaying user data.
    * UserEmailModal.jsx: A modal component for sending emails to users.

* /routes: This directory contains additional routes or views specific to the todo app. The list of routes is as follows

    * dashboard.jsx: This page allows only a certain set of users(clients) to access the data of all the users registered by them, create/read/update/delete the data and assign the users new tasks.
    * login.jsx: This page allows users to login. All users trying unauthorized access shall be redirected to this page.
    * register.jsx.: This page allows new users(clients) to register. 

## API Endpoints
This application integrates the following backend API endpoints with the frontend:

* ### GET /: Homepage

    * Description: Retrieves the homepage of the application.
    * Request Method: GET

* ### POST /user/addUser:

    * Description: Adds a new user to the particular tenant database.
    * Request Method: POST
    * Data Params:
        * firstname (string): First name of the user.
        * lastname (string): Last name of the user.
        * email (string): Email of the user.
        * password (string): Password of the user.

* ### POST /user/login:

    * Description: Logs in to the particular tenant database user and provides a token and email ID.
    * Request Method: POST
    * Data Params:
        * email (string): Email of the user.
        * password (string): Password of the user.

* ### POST /todo/addTodo:

    * Description: Adds a new todo.
    * Request Method: POST
    * Data Params:
        * description (string): Description of the todo.
        * title (string): Title of the todo.
        
* ### DELETE /todo/delete/:id:

    * Description: Deletes a specific todo.
    * Request Method: DELETE
    * URL Params:
        * id (string): ID of the todo to be deleted.

* ### GET /todo/singleTodo/:id:

    * Description: Retrieves a specific todo.
    * Request Method: GET
    * URL Params:
        * id (string): ID of the todo to be retrieved.

* ### GET /todo/getAllTodo:

    * Description: Retrieves all todos of a particular user.
    * Request Method: GET

* ### PATCH /todo/update/:id:

    * Description: Updates a specific todo.
    * Request Method: PATCH
    * URL Params:
        * id (string): ID of the todo to be updated.
    * Data Params:
        * description (string): Updated description of the todo.
        * title (string): Updated title of the todo.

* ### POST /client/register:

    * Description: Adds a new user to the particular tenant database.
    * Request Method: POST
    * Data Params:
        * firstname (string): First name of the user.
        * lastname (string): Last name of the user.
        * email (string): Email of the user.
        * password (string): Password of the user.

* ### POST /client/login:

    * Description: Logs in to the particular tenant database and provides a token.
    * Request Method: POST
    * Data Params:
        * email (string): Email of the user.
        * password (string): Password of the user.

* ### GET /todo/allTodo:

    * Description: Retrieves all todos of a particular tenant database (only accessible by admin).
    * Request Method: GET
    * Headers:
        * Authorization (string): Email ID of the particular tenant database.

* ### GET /user/allUser:

    * Description: Retrieves all users of a particular tenant database (only accessible by admin).
    * Request Method: GET
    * Headers:
        * Authorization (string): Email ID of the particular tenant database.

* ### POST /client/assigntodo: 

    * Description: Assigning task to user by admin only.
    * Request Method: POST 
    * Header: 
        * specific_user_email (string): Email ID of the particular user to which todo is assigned.

* ### PATCH /user/assign:/id 

    * Description: Assigning task to another user by a  user.
    * Request Method: PATCH
    * URL Params:
        * id (string): ID of the todo to be updated.
    * Data Params:
        * description (string): Updated description of the todo.
        * title (string): Updated title of the todo.


These API endpoints enable communication between the frontend and backend, facilitating various operations such as user management, todo creation, retrieval, and deletion, as well as administrative tasks for privileged users.
