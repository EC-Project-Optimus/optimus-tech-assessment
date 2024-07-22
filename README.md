# optimus-tech-assessment

This repo represents a very simple solution for collecting poll submissions and displaying the
current results.

The issue is that the solution is too simple, and it has some limitations.

Please take some time to review the code before your interview. There isn't much, and you likely
won't need more than 15 minutes to review what's here and to understand it.

In your interview you will meet a few members of the development team and will be asked to talk
through what you would do to improve this solution.

# Summary
We need to build a form that will ask users to select their favourite colors from a list. Upon submitting
the form, the UI will change to display the current totals for each possible color.

## Detailed Requirements
1. Display an input form that collects: email address, and multi-select input of colors
1. Upon submitting the form, the UI changes to diplay the list of colors and the current counts
1. The form can only be submitted once per user  
1. The UI should support both English and French languages


# Instructions for Running the Code

## Backend:

1. Open a new terminal and run the following commands from the root directory:
    ```bash
    yarn install
    yarn run start:api
    ```

## Frontend:

1. Open a new terminal and run the following commands in root directory:
    ```bash
    cd frontend
    yarn install
    yarn proxy
    ```

2. Open another terminal and run following commands in root directory:
    ```bash
    cd frontend
    yarn start
    ```
