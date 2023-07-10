# Paginatorapp


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.
This app implements two variations of table components. 
1. Custom table with pagination support. The page items can be selected by the user.
2. Infinite scrolling table.
The following requirements are implemented in the above two tables.
	The component displays Sample Data in a table
	User is able to select the rows that are displayed in the table
	Table is paginated if not all rows are displayed on the screen based on the user’s selection
	Pagination options are displayed in the table footer
	Column names are displayed in the table header. The header columns are displayed based on the sample data.
	Entire table, table header and table footer is always be displayed on the screen while scrolling
	If number of rows exceeds the size of the table body, a vertical scrollbar is displayed within the table body – only table body is scrollable vertically, table header and footer remains as is.
	If number of columns exceed the size of the table body, a horizontal scrollbar is displayed within the table body – only table body and table header shall scroll to reveal the additional columns, table footer shall remain as is
	Each row contains a button which submits the row ID and row status to /api/submit as a POST request.

The custom table component is shared component used by both the pagination table and infinite scrolling table. The custom table
can be further customized based on the table options and features like sorting can be added in to the table. Row data can also be customized.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
