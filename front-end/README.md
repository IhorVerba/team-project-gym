## Frontend for Hard and Smart App

**Description:**

This responsive web application serves as the user interface for the Hard and Smart training management system. It provides trainers and administrators with a user-friendly experience for managing training processes, users, and reports.

**Running the Frontend:**

1. Ensure you have Node.js and npm (or yarn) installed on your machine.
2. Clone the project repository from your version control system (e.g., Git).
3. Navigate to the project directory in your terminal using `cd /front-end`.
4. Run `npm install` (or `yarn install`) to install all dependencies.
5. Run `npm start` (or `yarn start`) to start the development server.
6. Access the application in your web browser at `http://localhost:3000` (default port). If this port is locked, React will automatically use another free port and ask you for that.

**Running the Frontend:**

1. For deployment, the production build process can be initiated using `npm run build`. This creates an optimized build for hosting.
2. Add variables to the deployment service and type build command.
   Select the build folder so that the service can see the build you built.

**Structure:**
The front end utilizes a component-based architecture, with reusable components for various functionalities. Common folders include:

- `src`: Contains the application source code.
  - `assets`: Some images etc. that are used in the project but must be hidden from the public
  - `components`: Reusable UI components.
  - `config`: Here can be placed different configuration files
  - `context`: Context files for Auth or Filters etc.
  - `hooks`: Here are custom hooks that are used in different places of the project.
  - `i18n`: Here locate translation files for the project
  - `pages`: Top-level application pages (e.g., Login, Dashboard).
  - `service`: All services that are used to send requests to the backend server
  - `styles`: Global and component-specific stylesheets.
  - `types`: Types for specific tasks
  - `utils`: Helper functions and utilities.
    also in the root `src` folder are some root files such as App.tsx, package.json, prettier, eslint and other config files.
- `public`: Stores static assets like images and fonts.

**Technologies:**

- **React:** JavaScript library for building user interfaces.
- **Mantine UI:** React component library for building UI elements.
- **Tremor Charts + TailwindCSS:** Styling libraries for customizing the look and feel.
- **SCSS:** Preprocessor for writing maintainable CSS styles.

**Additional Notes:**

- Frontend development utilizes tools like linters (ESLint) and formatters (Prettier) to maintain code quality.
