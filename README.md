# Striver SDE Intern Assignment
![image](https://github.com/thrishank/striver_assignment/assets/86158204/a5058dcd-1afc-4cbc-b6b4-775b4178a645)
![image](https://github.com/thrishank/striver_assignment/assets/86158204/3a796c7b-41fc-4262-8cd6-01a67f9acad6)

## Tech Stack

- Backend - Express, MySQL, Prisma ORM, Redis
- Frontend - ReactJS, TailwindCSS
- Libraries - zod (input validation), ioredis, axios

## Deployment

1. Frontend

- vercel
  - url = https://striver-assignment-green.vercel.app/
  - home page contains the form to gather the data
  - url/entries page contains all the submitted entries in a tabular format

2. Backend

- The backend may be down sometimes since it is a free version
- render
  - url = https://striver-assignment-xnzp.onrender.com/api/v1
  - A post route to save the date in MySQL database = url/submit-form
  - A get route to get all the submissions form the DB = url/entries;

3. MySQL database - avien
4. Redis - upstash
![image](https://github.com/thrishank/striver_assignment/assets/86158204/65df74f4-cd00-439d-8793-55cd9addf9d1)

## Features & Improvments

1. The UI is pretty junky need to update it.
2. Create a page to sort the data
   - url/{user} to list all the submissions a user has made
   - url/{language} to list all the submissions made in a given language
