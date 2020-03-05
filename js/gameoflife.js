function seed() {
  return Array.from(arguments);
}

function same([x, y], [j, k]) {
  return (x===j && y===k);
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  return this.some ( X => same(X,cell));
}

const printCell = (cell, state) => {
  return contains.call(state, cell)? "\u25A3" : "\u25A2";
};

const corners = (state = []) => {
  if (state.length===0){
    return {
      topRight : [0,0],
      bottomLeft:[0,0]
    };
  }

  const xCoords = state.map( ([x,_]) => x);
  const yCoords = state.map( ([_,y]) => y);
  return {
    topRight: [Math.max(...xCoords), Math.max(...yCoords)],
    bottomLeft:[
      Math.min(...xCoords),
      Math.min(...yCoords)
    ]
  }
  

};

const printCells = (state) => {
  let result="";
  const K =corners(state);
  for (let c=K.topRight[1]; c>=K.bottomLeft[1];c--){
      for (let r= K.bottomLeft[0];r <= K.topRight[0];r++ ){
          result += printCell([r,c],state ) +" "
      }
      result = result.replace(/.$/g,'\n')
  }


  return result;
};

const getNeighborsOf = ([x, y]) => {
  let result = [];
  for (let c=y-1;c<=y+1;c++){
    for (let r=x-1;r<=x+1;r++){
        if (r!=x || c!=y) result.push([r,c])
    }
  }
return result;
}

const getLivingNeighbors = (cell, state) => getNeighborsOf(cell).filter( X => contains.bind(state)(X)) ;

const willBeAlive = (cell, state) => {
  const livingNbors = getLivingNeighbors(cell,state).length;

  return (livingNbors===3 || (contains.call(state, cell) && livingNbors===2));
}

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;