# CabinQuest - Noroff Final Exam 2
[![Netlify Status](https://api.netlify.com/api/v1/badges/4256ebe3-cb39-4462-a3b0-579ebc062da6/deploy-status)](https://app.netlify.com/sites/exquisite-rugelach-c27793/deploys)

Home             |  Profile
:-------------------------:|:-------------------------:
![bilde](https://github.com/DrRuski/CabinQuest/assets/96174153/04931e12-f77c-427d-9f35-834bb70e8fb2)  |  ![bilde](https://github.com/DrRuski/CabinQuest/assets/96174153/7efa3f33-656e-4e41-8541-3141bd698fc2)
VM Dashboard             |  Individual Venue
![bilde](https://github.com/DrRuski/CabinQuest/assets/96174153/92f7b9d1-2cb9-462d-bc8e-45fe69403f7e)  |  ![bilde](https://github.com/DrRuski/CabinQuest/assets/96174153/ae0d815d-2d53-49c8-88c7-bb1c72238e76)



#### Table of Contents

1. [Brief](#brief)
2. [Project Dev Stack](#project-development-stack)
3. [Live Website Demo](#live-website-demo)
4. [External Development](#external-development)


## Brief
A newly launched accommodation booking site called CabinQuest has approached you to develop a brand new front end for their application.
While they have a list of requirements, the design and UX has not been specified.

### Overarching Objectives:
Work with the official [Noroff API Documentation](https://docs.noroff.dev/), plan, design and build a modern front end accommodation booking application.
There is two aspects to this brief:
 - The customer-facing side of the website where users can book holidays at a venue.
 - The admin-facing side of the website where users can register and manage venues and bookings at those venues.

### Client requested User Stories:
1. A user may view a list of `Venues`.
2. A user may search for a specific `Venue`.
3. A user may view a specific venue page by `id`.
4. A user may view a calendar with available dates for a `Venue`.
5. A user with a `stud.noroff.no` email may register as a customer. 
 - *Editor's Note:* While the email HAS to end with `stud.noroff.no` to work, it does NOT actually have to be a real email address. (You could in essence register `gibberish@stud.noroff.no` and it will work.)
6. A registered customer may create a booking at a `Venue`.
7. A registered customer may view their upcomming bokings.
8. A user with a `stud.noroff.no` email may register as a `Venue manager`.
9. A registered `Venue manager` may create a `Venue`.
10. A registered `Venue manager` may update a `Venue` they manage.
11. A registered `Venue manager` may dekete a `Venue` they manage.
12. A registered `Venue manager` may view bookings for a `Venue` they manage.
13. A Registered user may login.
14. A registered user may update their avatar.
15. A registered user may logout.

## Project Development Stack

The development stack used for this project:
- [Javascript](https://www.javascript.com/) as the programming language.
- [Tailwind](https://tailwindcss.com/) as the styling CSS framework.
- [Vite](https://vitejs.dev/) as the build tool.
- [React](https://react.dev/) as the UI library.
- [React Router DOM](https://reactrouter.com/en/main) for routing.
- [React Hook Form](https://react-hook-form.com/) as the default submission, validation, state and handling toolkit.
- [Demark-Pro React Booking Calendar](https://www.npmjs.com/package/@demark-pro/react-booking-calendar) for displaying customer bookings and dates.

## Live Website Demo

Website Link:
```
https://cabinquest.no/
```
Dummy Email:
```
TestingAccountTwo@stud.noroff.no
```
Dummy Password:
```
TestingAccountTwo123
```
- *Editor's Note:* The API is prone to hard resets so this email/password might not be available in the future, if so and the API docs has not been changed then it is possible to make your own dummy account as long as you end the email with `stud.noroff.no`.


## External Development

1. Clone the repo through github app/website or use the CLI command:
```
git clone https://github.com/DrRuski/CabinQuest.git
```
2. Install dependencies:
```
npm i
```
3. Start development server:
```
npm run dev
```
