GitHub Search App

Overview
This application uses the GitHub API to provide a user-friendly interface for searching and viewing GitHub user profiles. Built with Angular 19 using standalone components architecture, it offers a responsive and intuitive user experience.
Features

User Search: Search for GitHub users by username
User Profiles: View detailed user information including:

Profile details (name, bio, location, etc.)
Repositories count, followers, and following statistics
Latest repositories with descriptions and stats


Search History:

Automatic tracking of search queries
History management (view, delete individual entries, clear all)
Timestamps with "time ago" format


Responsive Design: Fully responsive interface that works on mobile and desktop

Technologies

Angular 19: Utilizing standalone components and the latest Angular features
GitHub API: Integration with GitHub's REST API
RxJS: Reactive programming for handling asynchronous operations
Local Storage: Persistent search history between sessions

Project Structure
github-search-app/
├── src/
│   ├── core/
│   │   ├── services/
│   │   │   ├── github.service.ts               # GitHub API integration
│   │   │   └── search-history.service.ts       # Search history management
│   │   └── models/
│   │       ├── user.model.ts                   # GitHub user data model
│   │       └── search-record.model.ts          # Search history data model
│   ├── app/
│   │   ├── features/
│   │   │   ├── history/                        # History management
│   │   │   ├── search/                         # Search functionality
│   │   │   └── user-profile/                   # User profile details
│   │   ├── shared/
│   │   │   ├── components/                     # Reusable components
│   │   │   └── pipes/                          # Custom pipes
│   │   ├── app.component.ts                    # Root component
│   │   ├── app.config.ts                       # App configuration
│   │   └── app.routes.ts                       # Routing configuration
│   ├── main.ts                                 # App entry point
│   └── styles.css                              # Global styles
└── package.json                                # Dependencies


Getting Started
Prerequisites

Node.js (v16 or higher)
npm (v8 or higher)

Installation

# GithubTracker
Clone the repository:
```bash
git clone https://github.com/manveerkumar/Github-Search.git

cd Github-Search
```

Install dependencies:

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
