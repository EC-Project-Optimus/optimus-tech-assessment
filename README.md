# optimus-tech-assessment

Given you are a senior developer, one of your colleagues requests your review of this PR.
Please ask questions and provide feedback in this PR.
What would you suggest in long term to maintain a flexible and scalable system?

## PR description
### Summary
We need to build a poll system for a one-time marketing campaign for English and French users.
User can input their email and select their favourite colours.
And then the result of everyone's poll will be presented.

### AC1
Given a user open the link in the marketing campaign email, a page of campaign is shown.
Including:
 - a banner
 - a form
 - text input of user email
 - multi-select input of colours 

### AC2
Given a user submitted the poll, the form is replaced by the poll result.
Each email can only submit poll once.
The result should show the number of total votes for each colour
