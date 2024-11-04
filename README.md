# TypeScript Refactor of the Codebase from the Book: Ultimate Full-Stack Web Development with MERN

by Nabendu Biswas (Author)

Intended be used for reference and boilerplate for future projects (as I opt for TypeScript in everything where I have a choice in the matter), but diligence was maintained for purposes of the result to be usable in a future version of the publication. I welcome input on possible improvements with this in mind.

In my strong opinion, anything that *can* serve as boilerplate deserves to be treated as such. Therefore, features like SASS should be incorporated by default, since every developer should be using SASS.

This is still in progress, but nearly to substanial completion.

# Major Changes:

- Root-relative (to `src` directory) imports everywhere via baseUrl to simplify imports

- React 18.2.0 > 18.3.1

- React Router 6.14.1 > 6.27.0
  
- ES6/Babel > TypeScript 4.9.5 (Frontend) 5.6.3 (Backend)
  
- React-Redux 8.1.0 > 9.1.2
  
- Create React App > Vite 5.4.9 + SWC [Create React App is deprecated]

- Express 4.18.2 > 4.21.1

- CSS > SASS 1.80.4 [SASS should be default for every project, IMO]

- Included SuperTest 7.0.0 for mocks typings [Necessitated by TypeScript]

- Extensive code comments

- Formatting with Prettier [An experienced developer sees formatting with version control helps in problem-solving]

- Realigned some stucture for adherance to TypeScript project conventions

- user.name > user.firstName and user.lastName (since 99.99% of real-world projects require that)

# TODO:

- Considering: Add proxy middleware to use .env variable in favor of the package.json proxy field.
