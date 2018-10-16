const reactSudokuBox = document.getElementById('sudokuBox');
var alteredSudokuGame = [[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],
                         [,,,,,,,,],[,,,,,,,,],[,,,,,,,,],
                         [,,,,,,,,],[,,,,,,,,],[,,,,,,,,]];
var sudokuGame = [[1,2,3,4,5,6,7,8,9],
                  [4,5,6,7,8,9,1,2,3],
                  [7,8,9,1,2,3,4,5,6],
                  [2,1,4,3,6,5,8,9,7],
                  [3,6,5,8,9,7,2,1,4],
                  [8,9,7,2,1,4,3,6,5],
                  [5,3,1,6,4,2,9,7,8],
                  [6,4,2,9,7,8,5,3,1],
                  [9,7,8,5,3,1,6,4,2]];

function autoListener() {
  if (this.status == 200) {
      var obj = this.responseText;
      obj = JSON.parse(obj).solved;

      sudokuGame = obj;

      reactApp.setState({sudokuGame:sudokuGame});
  }
  else {
      alert("There are no tags that start with these 2 letters");
  }
}

class SudokuElement extends React.Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
    }

    change() {
        var row = this.props.rowNum;
        var column = this.props.colNum;

        var value = document.getElementById('sud_'+row+column).value;
        alteredSudokuGame[row-1][column-1] = value;

        //make new sudoku query
        var string = '';
        for (let rowNum = 0; rowNum < alteredSudokuGame.length; rowNum++) {
            if (rowNum) {
                string += "&";
            }
            var row = alteredSudokuGame[rowNum];
            for (let colNum = 0; colNum < 9; colNum++) {
                if (colNum) {
                    string += ",";
                }
                if (row[colNum]) {
                    string += row[colNum];
                }
                else {
                    string += "";
                }
            }
        }

        var oReq = new XMLHttpRequest();
        var url = "query?sudoku="+string;
        oReq.open("GET",url);
        oReq.addEventListener("load", autoListener);
        oReq.send();
    }

    render() {
        var idText = "sud_" + this.props.rowNum + this.props.colNum;
        return React.createElement('input', {
                                                type:"text",
                                                placeholder:this.props.value,
                                                className:"sudokuElement",
                                                id:idText,
                                                onChange:this.change
                                            });
    }
}

class SudokuRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // elements is an array
        var row = this.props.row;

        var args = [];
        args.push('div');
        args.push({ className:'sudokuRow'});

        for (let i = 0; i < row.length; i++) {
            var j = i+1;
            args.push(React.createElement(SudokuElement, {
                                                          value: row[i],
                                                          readOnly:'false',
                                                          rowNum:this.props.rowNum,
                                                          colNum:j
                                                         }));
        }

        return (React.createElement.apply(null, args));
    }
}

class SudokuBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sudokuGame:sudokuGame};
    }

    render() {
        //array of rows
        var rows = sudokuGame;
        var args = [];
        args.push('div');
        args.push({ className:'sudokuBox'});

        for (let i = 0; i < rows.length; i++) {
            var j = i+1;
            args.push(React.createElement(SudokuRow, {row:rows[i],
                                                      rowNum:j
                                                     }));
        }

        return (React.createElement.apply(null, args));
    }
}

var reactApp = ReactDOM.render(React.createElement(SudokuBox,{sudokuGame:sudokuGame}),reactSudokuBox);

/*
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { photos: photos , columns: 2};
    this.selectTile = this.selectTile.bind(this);
  }

  selectTile(event, obj) {
    let photos = this.state.photos;
    if (!photos[obj.index].selected) {
        photos[obj.index].selected = !photos[obj.index].selected;
        console.log("on");
    }
    this.setState({ photos: photos });
  }

  render() {
    return (
       React.createElement( Gallery, {photos: this.state.photos, columns: this.state.columns,
		   onClick: this.selectTile,
		   ImageComponent: ImageTile}
            )
	    );
  }

}

*/
