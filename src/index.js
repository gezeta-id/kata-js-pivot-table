var Table = require('./domain/table.js');
var Row = require('./domain/row.js');
var Cell = require('./domain/cell.js');

var pivot = require('./processing/pivot.js').pivot;

var render = require('./view/renderer.js').render;
//var inspect = require('./view/renderer.js').inspect;

var CellBuilder = function(name) { return function(value) { return new Cell(name, value); }; };
var January = CellBuilder("JANUARY"); var February = CellBuilder("FEBRUARY"); var March = CellBuilder("MARCH"); var April = CellBuilder("APRIL");
var Month = CellBuilder("MONTH"); var Value = CellBuilder("VALUE"); var Manager = CellBuilder("MANAGER"); var ProductLine = CellBuilder("PRODUCT LINE");


var header = ["MANAGER", "PRODUCT LINE", "MONTH", "VALUE"];

var rows = [
    new Row([Manager("Sam"), ProductLine("Second Hand"), Month("JANUARY"), Value(20)]),
    new Row([Manager("Sam"), ProductLine("Second Hand"), Month("FEBRUARY"), Value(21)]),
    new Row([Manager("Sam"), ProductLine("Second Hand"), Month("MARCH"), Value(22)]),
    new Row([Manager("Sam"), ProductLine("Second Hand"), Month("APRIL"), Value(25)]),
    new Row([Manager("Max"), ProductLine("Second Hand"), Month("JANUARY"), Value(30)]),
    new Row([Manager("Max"), ProductLine("Second Hand"), Month("MARCH"), Value(32)]),
    new Row([Manager("Max"), ProductLine("Second Hand"), Month("APRIL"), Value(35)])
];

var table = new Table(header, rows);

//inspect(table);
render(table);

console.log("After pivoting...\n");

var pivotedTable = pivot(table, "MONTH", "VALUE");

render(pivotedTable);
