var http  = require('http');
var static = require('node-static');
var fs = require('fs');  // file access module
var sqlite3 = require("sqlite3").verbose();
var fileServer = new static.Server('./public');
var dbFileName = "my.db";

const swipl = require('swipl');

swipl.call('consult(depend/sudoku)');
decodeSudokuRow.ROW = [];
decodeSudoku.ROWS = [];




function decodeSudokuRow(row) {
    var doneRow = [];
    if (row == '[]') {
        var finalRow = decodeSudokuRow.ROW;
        decodeSudokuRow.ROW = [];
        //console.log(doneRow);
        return finalRow;
    }
    //console.log(row);
    decodeSudokuRow.ROW.push(row.head);

    doneRow = decodeSudokuRow(row.tail);
    return doneRow;
}

function decodeSudoku(obj) {
    var doneSudoku;
    if (obj == '[]') {
        var finalSudoku = decodeSudoku.ROWS;
        decodeSudoku.ROWS = [];

        return finalSudoku;
    }

    // do the top row
    var doneRow = decodeSudokuRow(obj.head);
    decodeSudoku.ROWS.push(doneRow);

    // do the rest of the tail in the same FUNCTION
    doneSudoku = decodeSudoku(obj.tail);

    return doneSudoku;
}




function badQuery(response, message) {
    response.writeHead(400, {"Content-Type": "text/plain"});
    response.write(message);
    response.end();
}




function sudoku (response, line) {
    //final product that we will append to the string
    var product = [];
    // a row that will be in the product
    var productRow = [];

    // , split the elements and & split the ROWS
    var rows = line.split("&");
    var queryStr = '';
    var json = {};

    for (row of rows) {
        elements = row.split(',');
        for (item of elements) {
            // its an wildcard
            if (item == '') {
                productRow.push('_');
            }
            // its a number
            else if (!isNaN(item)){

                productRow.push(item);
            }
            // someone wants to break something
            else {
                badQuery(response, "illegal character in query");
                return;
            }
        }

        // check if there are 9 elements in each row or else fail
        if (productRow.length != 9) {
            badQuery(response, "fail, every row doesnt have 9 elements");

            return;
        }

        product.push(productRow);

        // reset productRow to be an empty array
        productRow = [];
    }

    //check that the final product has 9 ROWS
    if (product.length != 9) {
        badQuery(response, "fail, wrong row length");

        return;
    }

    // validate before doing the query, just in case someone wants to sabotage
    //
    // do the rows first

    for (i = 0; i < 9; i++) {
        var row = product[i];
        // slice is to make a copy or else it modifies the original array
        let sortedArr = row.slice(0).sort();
        for (let j = 1; j < 9; j++) {
            if (sortedArr[j] == sortedArr[j-1] && sortedArr[j] != '_') {
                badQuery(response, 'fail, duplicate number in a row, row: ' + (i+1));

                return;
            }
        }
    }

    // columns next
    // go through each column of the puzzle

    for (let i = 0; i < 9; i++) {
        let column = [];
        for (let k = 0; k < 9; k++) {
            column.push(product[k][i]);
        }
        // slice is to make a copy
        let sortedArr = column.slice(0).sort();
        for (let j = 1; j < 9; j++) {
            if (sortedArr[j] == sortedArr[j-1] && sortedArr[j] != '_') {
                badQuery(response, 'fail, duplicate number in a column, column: ' + (i+1));

                return;
            }
        }
    }

    // now to check the squares

    for (let i = 0; i < 9; i+=3) {

        // take out next 3 rows
        let rows = product.slice(i, i+3);

        // take out the next 3 elements
        for (let k = 0; k<9;k+=3) {
            let square = [];
            square.push(rows[0].slice(k,k+3));
            square.push(rows[1].slice(k,k+3));
            square.push(rows[2].slice(k,k+3));

            // this is to convert array of arrays to an array
            square = square.toString().split(',');
            let sortedArr = square.slice(0).sort();
            for (let j = 1; j < 9; j++) {
                if (sortedArr[j] == sortedArr[j-1] && sortedArr[j] != '_') {
                    badQuery(response, 'fail, duplicate number in a square');

                    return;
                }
            }

        }
    }

    //construct the query for the prolog interpreter
    queryStr = 'L = [';
    for (item of product) {
        queryStr += '[' + item + '],'
    }
    // delte the last comma
    queryStr = queryStr.substring(0, queryStr.length - 1);

    queryStr += '], sudoku(L).';




    var answer = swipl.call(queryStr);



    var solution = decodeSudoku(answer.L);

    json = {solved:solution};


    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write(JSON.stringify(json));
    response.end();
}

function dynamicQuery (request, response) {
    var fail = 0;

    queryText = request.url.replace("/query","");
    // check if the query is valid
    console.log(queryText);
    if (queryText.indexOf("?sudoku=") == 0) {
        queryText = queryText.replace('?sudoku=', '');
        sudoku(response, queryText);
    }
    // the query is invalid and write a message with it
    else {
        badQuery(response, "bad query");
    }
}

// like a callback
function handler (request, response) {
	var url = request.url;
	url = url.replace("/","");

	var query = "query";
	var queryText = "";
    var fail = 0;
	if(url.substring(0,5) == query.substring(0,5)) {
        // replace request response
        dynamicQuery(request, response);
	}

  else if (url == ''){
        fileServer.serveFile('/index.html',200,{},request,response);
  }
	else {
		request.addListener('end', function () {
			fileServer.serve(request, response, function (err, result) {
				if(err && (err.status === 404)) {
					fileServer.serveFile('/not-found.html',404,{},request,response);
				}
		    });
		}).resume();
	}
}


var server = http.createServer(handler);

// fill in YOUR port number!
server.listen("8080");


















function addTag (response, rawText) {
    db = new sqlite3.Database(dbFileName);
    var text = decodeURIComponent(rawText);
    text = text.replace('?add=', '');
    var args = text.split('+');

    var cmdStr = "SELECT tags from photoTags WHERE idNum=" + args[0]+";";

    db.get(cmdStr, function (err, data) {
        // data is an object that has an string under tags
        var string = data.tags;

        string = string.split(',');

        string.push(args[1]);

        string = string.join(',');

        cmdStr = "UPDATE photoTags SET tags=\"" + string + "\" WHERE idNum=" + args[0] + ";";

        db.run(cmdStr, function (err) {
            if(!err) {
                console.log("added \'" + args[1] + "\' from idNum: " + args[0]);
            }
            else {
                console.log("couldn't add \'" + args[1] + "\' from idNum: " + args[0] +" because of database error");
            }

            db.close;

            response.writeHead(200, {"Content-Type":"text/plain"});
            response.write("success");
            response.end();

            auto.makeTagTable(tagTableCallback);
            function tagTableCallback(data) {
               tagTable = data;

            }
        });

    });
    // send back a success response object

}
