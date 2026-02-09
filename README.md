# TypeScript Refactor of the Codebase from the Book: Ultimate Full-Stack Web Development with MERN

by Nabendu Biswas (Author)

Intended be used for reference or boilerplate for future projects (as I opt for TypeScript in everything where I have a choice in the matter).

In my [BBaysinger] strong opinion, anything distributed that *can* serve as boilerplate deserves to be treated as such. Therefore, features like SASS should be incorporated by default, since every F/E developer should be using it. And repos and publications benefit from being developed in TypeScript (even if that's not the scope of the publication.)

I'll be updating dependency versions over time.

# Major Changes:

- Create React App > Vite 5.4.9 + SWC [Because Create React App is deprecated]

- ES6/Babel > TypeScript 4.9.5 (Frontend) 5.6.3 (Backend)

- Root-relative imports (to `src` directory) via `baseUrl` to help simplify [I wish this was out of the box]

- React 18.2.0 > 18.3.1

- React Router 6.14.1 > 6.27.0

- React-Redux 8.1.0 > 9.1.2
  
- Express 4.18.2 > 4.21.1

- CSS > SASS 1.80.4 [SASS should be default for every project, IMO]

- Included SuperTest 7.0.0 for Express API/request testing (+ TypeScript typings)

- Extensive code comments [Should be stripped out for screenshots, but retained in the official repo]

- Formatting with Prettier [An experienced developer sees formatting with version control helps in problem-solving]

- Realigned some structure for adherence to TypeScript project conventions

# TODO:

- Considering: Add proxy middleware to use .env variable in favor of the package.json proxy field.

# Testing

Backend (Jest + ts-jest):

- `cd backend && npm test`

Frontend (Vitest + jsdom):

- `cd frontend && npm test`
- Watch mode: `cd frontend && npm run test:watch`
