# A Kata/Exercise about Pivoting Tables

In an imaginary application we've developed to auto-generate reports and data tables, we've found that there's a fair number of tables with a structure similar to the following:

| Manager | Product Line | Month    | Value |
|---------|:------------:|----------|------:|
| Sam     | Second Hand  | January  | 20    |
| Sam     | Second Hand  | February | 22    |
| Sam     | Second Hand  | March    | 25    |
| Max     | Second Hand  | January  | 15    |
| Max     | Second Hand  | March    | 19    |

And, after using the application for a while, we start getting requests to be able to see the data in this other format:

| Manager | Product Line | January | February | March |
|---------|:------------:|--------:|---------:|------:|
| Sam     | Second Hand  | 20      | 22       | 25    |
| Max     | Second Hand  | 15      |          | 19    |

That is, it's more practical for users to be able to _pivot_ the table, grouping certain rows and showing the content of the vairous columns as cells in the same row. In the example, we've chosen two columns from the original table:

 - "Month" is the column that will be transformed into a header.
 - "Value" is the column that will be transformed into rows of data.

So we group by the rest of the columns and pivot on the chosen ones.


> The goal of this exercise is to implement the function `pivot` (and any other auxiliary entities you may need, of course) that applies such a transformation on a table.


## Starting code

For the exercise I've implemented a basic application in JavaScript.

The application initially comprises a _domain_ (`src/domain`) that contains 3 entities: `Table`,
`Row`, and `Cell`. Those allow us to create _immutable_ objects of the corresponding type.

Below there's a breif description of the domain's API. We consider this domain to be _in use_, so it is established that a valid solution should **not** mean modifying any of these files. Yoiu can, if it helps you, inspect the domain code itself, but it should be enough to just know its public interface.

Besides this, our mentor has written a few things more that we can use:

 - Our main work area will be the module at `src/processing/pivot.js`. It should export an object with only one `pivot` function that performs the pivoting task. Initially there's a dummy implementation that just returns the same table it is given _as is_.
 - There's a `src/index.js` (runnable through `npm run main`) that we can use as a simple example to understand our problem.
 - In the `src/view/` folder, we've left a couple of utilities that can be useful to dump a `Table` object onto the console.

Finally there's `test/spec.js` with a simple basic test battery on the domain that can help understand how it works, and a couple of tests more for the most basic use case of pivoting. These tests should be our starting point for the task.

## How to start

Requirements: NodeJS + npm.

The ideal way to start is to just clone the repository, create a new branch and start working on the new branch. This will leave `master` fresh and clean. The original repository contains a branch with a possible solution, but you're dearly encouraged to ignore it and try building your own solution.

You can always download the project without cloning and just work on it directly without version management. But it is better with it.

Once you have the project, execute the following command in the root folder...

```bash
> npm install
```

...to install the project's dependencies.

With this done, you can:

 - Watch the project run with `npm run main`. You will get two tables otuput on the console. Initially they'll be exactly the same.
 - Run the tests executing `npm test` to get an indication on where to start working.

You can use any editor or IDe of your choice. The whole project runs on the console with NodeJS, so you shouldn't _need_ anything else.

If you want, you can also run...

```bash
> npm run watch
```

...which will leave an open process on the console running the tests once initially and again each time a file is modified.

From there on, you should work by editing `src/processing/pivot.js` to make the failing tests pass.

## Domain's API

According to the rules of the exercise, it is established that you should **not** modify any of the domain entities, because they are already in use in other parts of our imaginary application.

The API is relatively simple:

### Cell

```javascript
var cell = new Cell("Month", "January");

console.log(cell.name, cell.value); // "Month" "January" - read only ;)
```

### Row

```javascript
var row = new Row([new Cell("Month", "January"), new Cell("Visits", 4)]);

console.log(row.cells); // [new Cell("Month", "January"), new Cell("Visits", 4)] - read only
console.log(row.size()); // 2
console.log(row.nameAt(1)); // "Visits"
console.log(row.valueAt(1)); // 4
console.log(row.valueAtName("Visits")); // 4
console.log(row.cellNamed("Visits")); // new Cell("Visits", 4)
console.log(row.values()); // ["January", 4]
console.log(row.valuesMap()); // { "Month": "January", "Visits": 4 }
console.log(row.contains("Visits")); // true
```

### Table

```javascript
var row = new Row([new Cell("Month", "January"), new Cell("Visits", 4)]);

var table = new Table(["Month", "Visits"], [row, row, row]);

console.log(table.header); // ["Month", "Visits"] - read only
console.log(table.rows); // [row, row, row] - read only
console.log(table.numRows()); // 3
console.log(table.numCols())); // 2
console.log(table.row(1)); // row
console.log(table.hasContent()); // true
```
