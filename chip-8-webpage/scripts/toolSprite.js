
function clickableGrid( rows, cols, callback ){

    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';

    for (var r = 0; r < rows; r++){

        // add rows
        var tr = grid.appendChild(document.createElement('tr'));

        for (var c = 0; c < cols; c++){

            // add cells 
            var cell = tr.appendChild(document.createElement('td'));

            // add event listener to each cell 
            cell.addEventListener('click', (function(el, r, c, i){

                return function(){

                    callback(el, r, c, i);

                }

            })(cell, r, c, i),false);
        
        }

    }

    return grid;
}

// create grid element 
var grid = clickableGrid(30, 16, function(el){
    el.className='clicked';
});

// add grid inside the div with id sprite-draw-area
var container = document.getElementById("sprite-draw-area");
container.appendChild(grid);