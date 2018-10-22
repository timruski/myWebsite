const reactSudokuBox = document.getElementById('sudokuBox');
var alteredSudokuGame = [[0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0]];

var sudokuGame = [[1,2,3,4,5,6,7,8,9],
                  [4,5,6,7,8,9,1,2,3],
                  [7,8,9,1,2,3,4,5,6],
                  [2,1,4,3,6,5,8,9,7],
                  [3,6,5,8,9,7,2,1,4],
                  [8,9,7,2,1,4,3,6,5],
                  [5,3,1,6,4,2,9,7,8],
                  [6,4,2,9,7,8,5,3,1],
                  [9,7,8,5,3,1,6,4,2]];

var lastPos = [0,0];
var lastPosNum = 0;

function strcmp(str1,str2) {
    return str1 < str2 ? -1 : +(str1 > str2)
}

function autoListener() {
    if (this.status == 200) {
        var obj = this.responseText;
        obj = JSON.parse(obj).solved;

        sudokuGame = obj;

        reactApp.setState({sudokuGame:sudokuGame});
    }
    else if (this.responseText.indexOf('badRow') == 0){
      console.log("bad row");
      //get the position of the last element that caused the problem
      var element = document.getElementById('sud_'+lastPos[0]+lastPos[1]);

      //save the value of the conflicting number
      var oldValue = element.value;

      // if it was an actual number
      if (lastPosNum) {
          element.value = lastPosNum;
      }
      //if it was already a 0 before
      else {
          element.value = '';
      }

      // change the value of the conflicting element
      alteredSudokuGame[lastPos[0]-1][lastPos[1]-1] = lastPosNum;

      //store the i value from the loop
      var bigI=0;
      for (let i = 0; i < 9; i++) {
          //find the other element it conflicts with and make it red
          if (alteredSudokuGame[lastPos[0]-1][i] == oldValue) {
              document.getElementById('sud_'+lastPos[0]+(i+1)).style.backgroundColor = "red";
              bigI = i;
              break;
          }
      }
      // after 800 ms change the color back to white
      setTimeout(function(){
          document.getElementById('sud_'+lastPos[0]+(bigI+1)).style.backgroundColor = "white";
      }, 500);
    }
    else if (this.responseText.indexOf('badColumn') == 0){
        //get the position of the last element that caused the problem
        var element = document.getElementById('sud_'+lastPos[0]+lastPos[1]);

        //save the value of the conflicting number
        var oldValue = element.value;

        // if it was an actual number
        if (lastPosNum) {
            element.value = lastPosNum;
        }
        //if it was already a 0 before
        else {
            element.value = '';
        }

        // change the value of the conflicting element
        alteredSudokuGame[lastPos[0]-1][lastPos[1]-1] = lastPosNum;

        //store the i value from the loop
        var bigI=0;

        //find the element that conflicts with our input and make it red
        for (let i = 0; i < 9; i++) {
            if (alteredSudokuGame[i][lastPos[1]-1] == oldValue) {
                document.getElementById('sud_'+(i+1)+(lastPos[1])).style.backgroundColor = "red";
                bigI = i;
                break;
            }
        }

        setTimeout(function(){
            document.getElementById('sud_'+(bigI+1)+(lastPos[1])).style.backgroundColor = "white";
        }, 500);

    }
    else if (this.responseText.indexOf('badSquare') == 0){
      console.log("bad square");
      var element = document.getElementById('sud_'+lastPos[0]+lastPos[1]);
      if (lastPosNum) {
          element.value = lastPosNum;
      }
      else {
          element.value = '';
      }
    }
    else {

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
        var element = document.getElementById('sud_'+row+column);

        var value = element.value;

        lastPos = [row,column];
        lastPosNum = alteredSudokuGame[row-1][column-1];

        if (value <= 0 || value >= 10) {
            //this only changes inside the input field
            element.value = "";
        }
        else {
            // if everything is good then do this
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
        var num;

        var args = [];
        args.push('div');
        args.push({ className:'sudokuRow'});

        for (let i = 0; i < row.length; i++) {
            var j = i+1;
            if (row[i]==0){
                num = "";
            }
            else {
                num = row[i];
            }
            args.push(React.createElement(SudokuElement, {
                                                          value: num,
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
