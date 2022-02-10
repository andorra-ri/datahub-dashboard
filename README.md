# InnoHub dashboard

## Deploy

Deployment is done automatically to AWS by a Github Action after accepting a pull request to `master`.

## Contribute

Clone the repo, create a new branch from `dev` to commit your changes.

```bash
git clone https://github.com/andorra-ri/datahub-dashboard/
cd datahub-dashboard
npm run install
npm run dev
```

Remember to create a `.env` file in the root directory and set the following environment variables.

```env
VITE_DATAHUB_API_URL=
```

When all changes are finished create a pull request to `dev` to start a code review process.
