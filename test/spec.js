var chai = require('chai'),
    expect = chai.expect;
    
var Table = require('../src/domain/table.js');
var Row = require('../src/domain/row.js');
var Cell = require('../src/domain/cell.js');

var pivot = require('../src/processing/pivot.js').pivot;

    
var originalTable, expectedTable, emptyTable;
var originalHeader, pivotedHeader;
var originalRows, pivotedRows;
var testRow;


describe('A Table...', function () {
    beforeEach(function() {
        createTestTables();
    });
    it('has a .header property which returns a copy of its header', function () {
        expect(originalTable.header).to.not.equal(originalHeader);
        expect(originalTable.header).to.deep.equal(originalHeader);
    });
    it('may have some content', function () {
        expect(originalTable.hasContent()).to.be.true;
        expect(emptyTable.hasContent()).to.be.false;
    });
    it('has a number of Rows', function () {
        expect(originalTable.numRows()).to.equal(8);
    });
    it('has a number of Columns', function () {
        expect(originalTable.numCols()).to.equal(4);
    });
    it('allows reading its content', function () {
        expect(originalTable.row(1)).to.equal(originalRows[1]);
    });
});

describe('A Row...', function () {
    beforeEach(function() {
        createTestRow();
    });
    it('has a size which is the number of cells', function () {
        expect(testRow.size()).to.equal(4);
        expect(testRow.size()).to.equal(testRow.cells.length);
    });
    it('knows about the cells it contains', function () {
        expect(testRow.contains("PRODUCT LINE")).to.be.true;
        expect(testRow.contains("BINGO")).to.be.false;
    });
    it('allows searching its cells', function() {
        expect(testRow.nameAt(1)).to.equal("PRODUCT LINE");
        expect(testRow.valueAt(1)).to.equal("Second Hand");
        expect(testRow.valueAtName("PRODUCT LINE")).to.equal("Second Hand");
    });
});
describe('A Cell...', function () {
    var testCell;
    beforeEach(function() {
        testCell = new Cell("NAME", "VALUE");
    });
    it('has a name', function () {
        expect(testCell.name).to.equal("NAME");
    });
    it('has a value', function () {
        expect(testCell.value).to.equal("VALUE");
    });
    it('is inmutable', function () {
        testCell.name = "NONE";
        testCell.value = "NADA";
        expect(testCell.name).to.equal("NAME");
        expect(testCell.value).to.equal("VALUE");
    });
});

describe('When pivoting a Table...', function() {
    beforeEach(function() {
        createTestTables();
    });
    it('The pivoted table should have the expected number of rows', function () {
        var pivotedTable = pivot(originalTable, "MONTH", "VALUE");
        expect(pivotedTable.numRows()).to.equal(expectedTable.numRows());
    });
    it('The pivoted table should have the expected number of columns', function () {
        var pivotedTable = pivot(originalTable, "MONTH", "VALUE");
        expect(pivotedTable.numCols()).to.equal(expectedTable.numCols());
    });
    it('The pivoted table should have the expected header', function () {
        var pivotedTable = pivot(originalTable, "MONTH", "VALUE");
        expect(pivotedTable.header).to.deep.equal(expectedTable.header);
    });
    it('The pivoted table should have the expected content', function() {
        var pivotedTable = pivot(originalTable, "MONTH", "VALUE");
        var pivotedCellNameAt14 = pivotedTable.row(1).nameAt(3);
        var pivotedCellValueAt14 = pivotedTable.row(1).valueAt(3);
        expect(pivotedCellNameAt14).to.equal("FEBRUARY");
        expect(pivotedCellValueAt14).to.equal(31);
    });

});

/* -- -- Building Test Fixtures -- -- */

var CellBuilder = function(name) { return function(value) { return new Cell(name, value); }; };
var January = CellBuilder("JANUARY"); var February = CellBuilder("FEBRUARY"); var March = CellBuilder("MARCH"); var April = CellBuilder("APRIL");
var Month = CellBuilder("MONTH"); var Value = CellBuilder("VALUE"); var Manager = CellBuilder("MANAGER"); var ProductLine = CellBuilder("PRODUCT LINE");

function createTestTables() {
        originalHeader = ["MANAGER", "PRODUCT LINE", "MONTH", "VALUE"];
        pivotedHeader = ["MANAGER", "PRODUCT LINE", "JANUARY", "FEBRUARY", "MARCH", "APRIL"];

        originalRows = [
            new Row([Manager("Sam"), ProductLine("Second Hand"), Month("JANUARY"),  Value(20)]),
            new Row([Manager("Sam"), ProductLine("Second Hand"), Month("FEBRUARY"), Value(21)]),
            new Row([Manager("Sam"), ProductLine("Second Hand"), Month("MARCH"),    Value(22)]),
            new Row([Manager("Sam"), ProductLine("Second Hand"), Month("APRIL"),    Value(25)]),
            new Row([Manager("Max"), ProductLine("Second Hand"), Month("JANUARY"),  Value(30)]),
            new Row([Manager("Max"), ProductLine("Second Hand"), Month("FEBRUARY"), Value(31)]),
            new Row([Manager("Max"), ProductLine("Second Hand"), Month("MARCH"),    Value(32)]),
            new Row([Manager("Max"), ProductLine("Second Hand"), Month("APRIL"),    Value(35)])
        ];
        pivotedRows = [
            new Row([Manager("Sam"), ProductLine("Second Hand"), January(20), February(21), March(22), April(25)]),
            new Row([Manager("Max"), ProductLine("Second Hand"), January(30), February(31), March(32), April(35)])
        ];

        originalTable = new Table(originalHeader, originalRows);
        expectedTable = new Table(pivotedHeader, pivotedRows);
        emptyTable = new Table(originalHeader, []);
}

function createTestRow() {
    testRow =  new Row([Manager("Max"), ProductLine("Second Hand"), Month("APRIL"), Value(35)])
}
