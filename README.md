# Striver SDE Intern Assignment

## Tech Stack

- Backend - Express, MySQL, Prisma ORM, Redis
- Frontend - ReactJS, TailwindCSS
- Librarys - zod (input validation), ioredis, axios

## Deployment

1. Frontend

- vercel
  - url = https://striver-assignment-green.vercel.app/
  - home page contains the form to gather the data
  - url/entries page contains all the submitted entries in a tabular format

2. Backend

- The backend may be down some times since it is a free version
- render
  - url = https://striver-assignment-xnzp.onrender.com/api/v1
  - A post route to save the date in MySQL database = url/submit-form
  - A get route to get all the submission form the DB = url/entries;

3. MySQL database - avien
4. Redis - upstash

## Features & Improvments

1. The UI is pretty junky need to update it.
2. Create a page to sort the data
   - url/{user} to list all the submissions a user has made
   - url/{language} to list all the submissions made in a given language
