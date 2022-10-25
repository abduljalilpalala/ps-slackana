![image](https://user-images.githubusercontent.com/104751512/194766756-69dcab05-cd18-40cd-a2b0-ad4c44bdfee7.png)

# Description

We want slack and asana in one. For us it is kinda a hassle to switch between asana and slack at the same time. It would also be best that Developer Leads/Team leads can create a team with their members and members can also make their task list/todo list so that their team leads can view what his/her members are doing.

## 🔗 Links

- Client :: https://slackana-client.vercel.app/sign-in
- Server :: https://slackana-api.herokuapp.com/

## Developers

- [@AJ](https://github.com/abduljalilpalala)
- [@RJ](https://github.com/rogeliojohnoliverio)
- [@John](https://github.com/johnpaul-sun)
- [@Joshua](https://github.com/jsvelte)
- [@Jermaine](https://github.com/marcjermainepontiveros-sun)

## Quality Assurance

- [@Neilmar](https://github.com/NielmarLaurente)
- [@Kent](https://github.com/ipilikent)

# Installation

Clone my-project with github

```bash
  $ git clone https://github.com/abduljalilpalala/ps-slackana.git

  or

  $ git clone git@github.com:abduljalilpalala/ps-slackana.git
```

# Environment Variables

To run this project locally, you will need to add the following environment variables to .env file in the back-end folder.
If .env file does not exist just create a new one and add this ff:

```javascript
APP_NAME=Laravel
APP_ENV=local
APP_KEY= // Generate a new key
APP_DEBUG=true
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=slackana
DB_USERNAME=root
DB_PASSWORD=
```

Make sure to create a Database based on the DB_DATABASE value.

# Run Locally

After cloning the project

Go to the project directory

```bash
  $ cd ps-slackana
```

# Commands for running the Front End

From the Root folder install dependencies for the Front End

```bash
  $ cd client
  $ npm install

  or

  $ cd client
  $ yarn
```

Start the Front End Server

```bash
  $ npm run start

  or

  $ yarn dev
```

# Commands for running the Back End

From the Root folder install dependencies for the Back End

```bash
  $ cd api
  $ composer install
  $ php artisan migrate:fresh --seed
```

Optimize the back end (optional if you encounter a route error)

```bash
  $ php artisan config:clear
  $ php artisan cache:clear
  $ php artisan route:clear
  $ php artisan optimize
  $ composer dump-autoload
```

Start the Back End Server

```bash
  $ php artisan serve

  or

  $ php artisan serve --host=localhost
```

## License

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

## Tech Stack

**Client:** Next.js, Redux Toolkit, Redux Thunk, TailwindCSS

**Server:** Laravel, MySQL

## Feedback

If you have any feedback, please reach out to us, link provided above.

For support, email support@slackana.com or join our Slack channel.

## Appendix

Any additional information goes here
