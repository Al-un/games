# alun-games

> Game to learn, Game for fun

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Tools

Tools configuration uses _JSON_ format to leverage VS Code documentation / auto completion:

- [Prettier](https://prettier.io/) configured with `.prettierrc`
  - Add semi-colons ([Prettier doc](https://prettier.io/docs/en/options.html#semicolons)) because
    I [like it better](https://medium.com/@marudhupandiyang/javascript-all-about-semicolons-bc7b43780f95)
- [Eslint](https://eslint.org/) configured with `.eslintrc` (renamed from `.eslintrc.js`). Alterations:
  - Removing console.log error ([ESlint doc](https://eslint.org/docs/rules/no-console#disallow-the-use-of-console-no-console))
  - Adding prettier semicolons with `"prettier/prettier": ["error", { "semi": true }]` rule ([Nuxt doc](https://nuxtjs.org/guide/development-tools/))
  - Removing linebreak after opening tag (from [this tuto](https://www.yasminzy.com/tutorial/prettier.html#nuxt))
