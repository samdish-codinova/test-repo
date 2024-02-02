# Holibob's Coding Test

## Prerequisites
* Have github account and SSH keys for it set up

## Project information

The repository is a simple monorepo with 2 projects.

Before starting make sure your system matches criteria defined in the project like:
* node version 18
* npm at least 9

Once all criteria are met just install project dependencies by running following command from the root directory
```shell
npm install
```
## Important note
Below we're listing all tools that are used in the monorepo but you are **not** forced to use all of them if you don't feel familiar with them. 
For example you can use native `fetch` api if you don't feel familiar with `apollo-client`. 

There is **no penalty** in evaluation for not using all tools.

**Frontend**
Is a React based app with following configuration:
* `apollo-client` - https://www.apollographql.com/docs/
* `mui` components library - https://mui.com/core/
* `vite` bundling

Run following command from `frontend` directory to start the app 
```shell
npm run dev
```

**Backend**
An `apollo-server` based app with following configuration:
* `graphql-compose` for schema creation - https://graphql-compose.github.io/
* `zod` for validation and type safety

Run following command from `server` directory to start the app
```shell
npm run dev
```

## Task

### Part 1: Introduce pagination

In `App.tsx` we're currently querying for 20 articles but there are more available in the system.

We would like to add pagination to list of articles by displaying pagination component on the bottom of the list.
Information about current `offset` could be stored in state - there is no need to update URL.

### Part 2: Add information about author

Articles list with just a title and content is not enough. We would like to add information about author name and its avatar to each article card.
 
Currently there is no information about authors in GraphQL therefore A field `author` has to be added to `Article` type. 
It should contain information about author of the article.

`Author` graphql type has to be created and properly attached to graphql schema.
 You can use `graphql-compose` for that or regular `graphql` package to define the schema.

In order to load author you can use `AuthorService` that already contains method to fetch all authors or author by id.
You might notice usage of `setTimeout`. It was added on purpose to simulate network latency whenever authors data are requested.
The latency cannot be removed and we are aware that requesting for author data will make `articleList` endpoint delayed by around a second. 


### Part 3: Optional

Displaying a loading indicator whenever data are being loaded is not enough nowadays. We would to display a skeleton of the article card while data are being loaded.
 

