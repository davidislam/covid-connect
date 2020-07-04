# COVID-Connect

COVID-Connect is an online application that primarily helps a user book appointments to test for COVID-19 at one of the applicable Assessment Centres. Supplementary services include checking appointments, learning about COVID-19, frequently asked questions, and a testing survey that can be conducted at home.

## Features

1.  Booking system.
2.  Screening System.
3.  FAQs.
4.  New user registration and profiling.
5.  Recent news on COVID.
6.  Admin modification on assessment centre.

## Instruction:

User:

1. User can use the Screening System to see if they need any tests.
2. User whether logged in or not can check the available centre on any given date.
3. User can view the recent hightlighted news on home page, and could click the link to obtain more information.
4. User can also check the FAQs provided on the website.
5. User MUST sign in in order to book a assessment.
6. User can register a new account, and reviewing their profile once logged in.
7. User can modify their profile information via Profile page.
8. User can cancel their booking through profile page.

Admin:

1. There exists one admin account. When logged in, they can add/remove the assessment centres.
2. Like the user, admin can modify their profile info.

## account

Default Admin Account:

```javascript
<adminAccount="admin" adminPassword="admin">
```

Default User Account:

```javascript
<userAccount="user" userPassword="user">
```

New User accounts can be created through Sign up page, but no admin account can be made.

## Libraries

The App is built mainly on [Material-UI](https://material-ui.com/) and [React](https://reactjs.org/)
