# Tastybites (Angular Recipes application)

# HOW TO RUN APP
1. Make database yumify in your local
2. Start MySQL service
3. Run this command in terminal of project: composer install
4. Delete public/storage folder and than run this command: php artisan storage:link
5. Run migration for creating and populating tables in database with this command: php artisan migrate:fresh --seed
6. Run project in your local with command: php artisan serve

# APP DESCRIPTION

- This Laravel-based web application is designed to streamline the food ordering process, offering a seamless experience for users from browsing restaurants to placing orders.

# Key Features:
- Database Management with Eloquent (ORM): This application efficiently manages data storage and retrieval, ensuring seamless interaction with the underlying database.
  
- MVC Architecture Implementation: Utilizing Models, Views (Blades), and Controllers, the application follows the MVC pattern, enhancing code organization and maintainability.
  
- Advanced Data Handling: Incorporates filtering, sorting, and pagination functionalities across various sections of the application.
  
- User Authentication and Persistence: Users can register and log in securely, allowing for personalized experiences where their activities and preferences are saved within the database.
  
- Restaurant and Meal Management: Enables users to search, filter, and sort restaurants and meals and find their wants.
  
- Order Processing and History: Users can add selected meals to their cart and place orders. Order history is maintained, offering users a convenient reference for past transactions.
  
# Technologies Used:
- Laravel, PHP, MySQL, HTML, CSS(SASS), BOOTSTRAP, JavaScript, jQuery.

# Tastybites

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
