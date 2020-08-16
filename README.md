# COVID-Connect

COVID-Connect is a web app that primarily helps a user book appointments to test for COVID-19 at an Ontario assessment centre. Supplementary services include:

- canceling booked appointments
- learning about COVID-19
- frequently asked questions
- a testing survey that can be conducted at home

URL: https://whispering-refuge-65732.herokuapp.com/

## New features

- See a map of assessment centres
- Admin can modify any assessment centre
- Admin can change the status of any appointment

## Instructions:

Non-users have much the same functionality as regular users except that they cannot book appointments. So first proceed to
the **login view** by clicking on the profile icon in the far right of the navigation bar. Sigin by entering `user` for both
username and password. Alternatively, you can signup for your own account. Proceed to the `**profile** view by clicking on that same profile icon. Here you can change your profile information as desired and check your appointments. The user you logged in as has already booked a few appointments, one of which has a status of _negative_, which means he tested negative for COVID-19. Feel free to cancel any
appointments, as we are going to book a new appointment. Head over to **Booking Centre** and choose your preferred date and city. Use the map to assist you with your choice. After clicking on **FIND ASSESSMENT CENTRES**, you are taken to another view which lists all available assessment centres for the selected date in the form of expansion panels. Clicking on any reveals further info, like timeslots. Choose an assessment centre and timeslot and click **confirm** to confirm your booking. It can now be viewed in the profile page.

If you are unsure whether or not you need to test for COVID-19, go to **Screening Tool** and do the little survey. If you have uncertanties regarding appointments, go to **FAQs** before calling an assessment centre directly.

Suppose you want to modify assessment centre info, or heck even
change the status of a user's appointment. No worries. Go to the **login** view and enter `admin` for both username and password. As admin, you can still change your profile info but you can't book appointments. If you go to **Booking Centre**, instead of seeing a beautiful map you will be presented with some options, such as adding an
assessment centre, deleting, modifying, etc. Scroll down some to see
every scheduled appointment in the website. Here you can change the status of any appointment as pleased. One small caveat is that you can't add/delete news articles. But you can check recent news in the **Home** page.

## Overview of the routes

The routes are divided into four files: `appointments.js`, `centres.js`, `newsarticles.js`, and `users.js`.

`appointments.js`:

- /user
  - GET current user's appointments. Returns a list of appointments.
  - POST (book) an appointment for the current user. Example of data
    `{ "date" : "August 17, 2020", "time" : "9:00 - 10:00 AM", "address": "2111 Finch Avenue West, Toronto, ON M3N 1N1", "tid": "5f376fef8f08e41e8c1bf1e5", "cid": "5f376fef8f08e41e8c1bf1e4", "day": "monday" }`
- /:id
  - GET an appointment by id
  - DELETE an appointment by id
  - PATCH an appointment by id. Example of request body: `{"status": "Positive"}`.
- /
  - GET a list of every appointment in the database
- /:id/:day/:tid
  - PATCH a timeslot. Toggles timeslot's `isTaken` property. No data required. Used concurrently whenever an appointment is booked/canceled.

`users.js`:

- /login
  - POST (logins) user. Expect `username` and `password`.
- /logout
  - GET (logouts) the user
- /
  - POST creates a new user. Example of data: `{ "username": "user", "password": "user", "name": "Jimmy", "gender": "male", "phoneNumber" : "932-134-4850", "email": "jimmy@gmail.com", "age": 25, "address": "1 Coin St" }`
  - GET return a list of every user
- /user
  - GET returns the current user
  - PATCH updates user's profile info
- /:id
  - GET a user by id
  - PATCH (change) a user's profile by id

`centres.js`

- /
  - POST create a new centre. Example: `{ "name": "Primacy Medical Centre", "location": { "city": "Sudbury", "address": "1485 Lasalle Boulevard", "postalCode": "P3A 1Z8", "latitude": 46.521729, "longitude": -80.939584 }, "phoneNumber": "705-671-7373", "url": "https://www.hsnsudbury.ca/portalen/Patients-and-Visitors/COVID-19/COVID-19-Assessment-Centre", "hours": { "monday": [ { "time": "6:00 - 7:00 AM", "isTaken": false }, { "time": "7:00 - 8:00 AM", "isTaken": false }, { "time": "1:00 - 2:00 PM", "isTaken": false }, { "time": "4:00 - 5:00 PM", "isTaken": false } ], "tuesday": [ { "time": "6:00 - 7:00 AM", "isTaken": false }, { "time": "7:00 - 8:00 AM", "isTaken": false }, { "time": "1:00 - 2:00 PM", "isTaken": false }, { "time": "4:00 - 5:00 PM", "isTaken": false } ], "wednesday": [ { "time": "6:00 - 7:00 AM", "isTaken": false }, { "time": "7:00 - 8:00 AM", "isTaken": false }, { "time": "1:00 - 2:00 PM", "isTaken": false }, { "time": "4:00 - 5:00 PM", "isTaken": false } ], "thursday": [ { "time": "6:00 - 7:00 AM", "isTaken": false }, { "time": "7:00 - 8:00 AM", "isTaken": false }, { "time": "1:00 - 2:00 PM", "isTaken": false }, { "time": "4:00 - 5:00 PM", "isTaken": false } ], "friday": [ { "time": "6:00 - 7:00 AM", "isTaken": false }, { "time": "7:00 - 8:00 AM", "isTaken": false }, { "time": "1:00 - 2:00 PM", "isTaken": false }, { "time": "4:00 - 5:00 PM", "isTaken": false } ], "saturday": [], "sunday": [] }, "info": "Located in the parking lot of the Superstore." }`
- GET returns a list of every centre
- /city-names
  - Returns a list of distinct city names considering every centre
- /:id
  - GET a centre by id
  - DELETE a centre by id. Returns the deleted centre.
  - PATCH (change) a centre by id.
- /city/:city
  - GET a list of every centre in the given city
- /insert
  - Batch insert a list of assessment centres. Must be logged in as `admin`.

Note that some routes required being logged in as `admin` while others require being logged in as a user. Some require no authentication at all.
