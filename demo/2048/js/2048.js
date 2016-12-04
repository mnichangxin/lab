/* 
 * 2048.js
 */

;var Game = (function() {
    var Grids,
        deBug = false,
        roundFlag = false,
        score = 0,
        needScale = false,

    qs = function(selector) {
        return document.querySelector(selector);
    },
    qsAll = function(selector) {
        return document.querySelectorAll(selector);
    },

    initGrids = function() {
        Grids = [
            [[0, true], [0, true], [0, true], [0, true]],
            [[0, true], [0, true], [0, true], [0, true]],
            [[0, true], [0, true], [0, true], [0, true]],
            [[0, true], [0, true], [0, true], [0, true]]
        ];
    },
    Map = function(Func) {
        Grids.map(function(row, y) {
            row.map(function(grid, x) {
                Func(grid, x, y);
            });
        });
    },
    F5 = function() {
        Map(function(grid, x, y) {
            grid[1] = true;

            var mapID = y.toString() + x.toString();

            if(grid[0] !== 0) {
                // document.getElementById(mapID).className = 'v' + grid[0];
                qs('#' + mapID).className = 'v' + grid[0];
            } else {
                // document.getElementById(mapID).className = '';
                qs('#' + mapID).className = '';
            }
        });

        scoreBorad.innerHTML = score;
        roundFlag = false;
    },
    randomNewNum = function() {
        var emptyGrids = [];

        Map(function(grid, x, y) {
            if(grid[0] === 0) {
                emptyGrids.push([x, y]);
            }
        });

        if(emptyGrids.length !== 0) {
            var randomNum = parseInt(Math.random() * emptyGrids.length);

            var x = emptyGrids[randomNum][0], y = emptyGrids[randomNum][1];

            Grids[y][x][0] = Math.random() > 0.05 ? 2 : 4;
        }
    },
    loadAction = function () {
        document.body.addEventListener('keyup', function(e) {
            var eve = e || window.event;

            switch(eve.keyCode){
                case 37:
                    Move.left();
                    break;
                case 38:
                    Move.up();
                    break;
                case 39:
                    Move.right();
                    break;
                case 40:
                    Move.down();
            }

            if(deBug) ; else { if(roundFlag) randomNewNum() };

            F5();
        });
    },
    Move = {
        left: function() {
            for(var y = 0; y < 4; y++) {
                for(var x = 0; x < 4; x++) {
                    move_this('left', x, y);
                }
            }
        },
        right: function() {
            for(var y = 0; y < 4; y++) {
                for(var x = 3; x >= 0; x--) {
                    move_this('right', x, y);
                }
            }
        },
        up: function() {
            for(var x = 0; x < 4; x++) {
                for(var y = 0; y < 4; y++) {
                    move_this('up', x, y);
                }
            }
        },
        down: function() {
            for(var x = 0; x < 4; x++) {
                for(var y = 3; y >= 0; y--) {
                    move_this('down', x, y);
                }
            }
        }
    },
    move_this = function() {
        var grid = {
            x : x,
            y : y,
            v : Grids[y][x][0]
        };

        if (grid.v !== 0) {
            while(can_go(direction, grid)) {
                lets_go(direction, grid);
            }

            if(can_add(direction, grid)) {
                lets_add(direction, grid);
            }
        }
    },
    can_go = function(direction, grid) {
        var x = grid.x, 
            y = grid.y;

        var flag = false;

        switch(direction) {
            case 'left':
                if(Grids[y][x - 1]) if(Grids[y][x - 1][0] === 0) flag = true;
                break;
            case 'up':
                if(Grids[y - 1]) if(Grids[y - 1][x][0] === 0) flag = true;
                break;
            case 'right':
                if(Grids[y][x + 1]) if(Grids[y][x + 1][0] === 0) flag = true;
                break;
            case 'down':
                if(Grids[y + 1]) if(Grids[y + 1][x][0] === 0) flag = true;
        }

        return flag;
    },
    lets_go = function(direction, grid) {
        var x = grid.x, 
            y = grid.y;

        switch(direction) {
            case 'left':
                Grids[y][x - 1][0] = grid.v;
                grid.x--;
                break;
            case 'up':
                Grids[y - 1][x][0] = grid.v;
                grid.y--;
                break;
            case 'right':
                Grids[y][x + 1][0] = grid.v;
                grid.x++;
                break;
            case 'down':
                Grids[y + 1][x][0] = grid.v;
                grid.y++;
        }

        Grids[y][x][0] = 0;
        roundFlag = true;
    },
    can_add = function(direction, grid) {
        var x = grid.x, 
            y = grid.y;

        var flag = false;

        switch(direction) {
            case 'left':
                if(Grids[y][x - 1]) if(Grids[y][x - 1][0] === grid.v && Grids[y][x - 1][1]) flag = true;
                break;
            case 'up':
                if(Grids[y - 1]) if(Grids[y - 1][x][0] === grid.v && Grids[y - 1][x][1]) flag = true;
                break;
            case 'right':
                if(Grids[y][x + 1]) if(Grids[y][x + 1][0] === grid.v && Grids[y][x + 1][1]) flag = true;
                break;
            case 'down':
                if(Grids[y + 1]) if(Grids[y + 1][x][0] === grid.v && Grids[y + 1][x][1]) flag = true;
        }

        return flag;
    },
    lets_add = function(direction, grid) {
        var x = grid.x, y = grid.y;

        switch(direction) {
            case 'left':
                Grids[y][x - 1][0] = grid.v * 2;
                Grids[y][x - 1][1] = false;
                break;
            case 'up':
                Grids[y - 1][x][0] = grid.v * 2;
                Grids[y - 1][x][1] = false;
                break;
            case 'right':
                Grids[y][x + 1][0] = grid.v * 2;
                Grids[y][x + 1][1] = false;
                break;
            case 'down':
                Grids[y + 1][x][0] = grid.v * 2;
                Grids[y + 1][x][1] = false;
        }

        score += grid.v * 2;
        Grids[y][x][0] = 0;
        roundFlag = true;
    },

    init = function() {
        // scoreBorad = document.getElementById('score-borad').getElementsByTagName('span')[0];

        var scoreBorad = qsAll('#score-borad span')[0];

        if (needScale) {
            scoreBorad.className = 'scale';
            // document.getElementById('gameView').className = 'scale';
            qs('#'gameView).className = 'scale';
        }

        initGrids();

        if(deBug) ; else { randomNewNum(); randomNewNum(); randomNewNum(); }

        loadAction();

        F5();
    };

    return {
        init: init
    } 
})();

Game.init();

// var Grids;
// var deBug = false;
// var roundFlag = false;
// var score = 0;
// var scoreBorad;
// var needScale = false;

// window.onload = function() {
//     scoreBorad = document.getElementById('score-borad').getElementsByTagName('span')[0];
//     if(needScale) {
//         scoreBorad.className = 'scale';
//         document.getElementById('gameView').className = 'scale';
//     }
//     initGrids();
//     if(deBug) ; else { randomNewNum(); randomNewNum(); randomNewNum();}
//     loadAction();
//     F5();
// }

// function initGrids() {
//     Grids = [
//         [[0, true], [0, true], [0, true], [0, true]],
//         [[0, true], [0, true], [0, true], [0, true]],
//         [[0, true], [0, true], [0, true], [0, true]],
//         [[0, true], [0, true], [0, true], [0, true]]
//     ];
// }

// function Map(Func) {
//     Grids.map(function(row, y) {
//         row.map(function(grid, x) {
//             Func(grid, x, y);
//         });
//     });
// }

// function F5() {
//     Map(function(grid, x, y) {
//         grid[1] = true;
//         var mapID = y.toString() + x.toString();
//         if(grid[0] !== 0) {
//             document.getElementById(mapID).className = 'v' + grid[0];
//         } else {
//             document.getElementById(mapID).className = '';
//         }
//     });
//     scoreBorad.innerHTML = score;
//     roundFlag = false;
// }

// function randomNewNum() {
//     var emptyGrids = [];
//     Map(function(grid, x, y) {
//         if(grid[0] === 0) {
//             emptyGrids.push([x, y]);
//         }
//     });
//     if(emptyGrids.length !== 0) {
//         var randomNum = parseInt(Math.random() * emptyGrids.length);

//         var x = emptyGrids[randomNum][0], y = emptyGrids[randomNum][1];

//         Grids[y][x][0] = Math.random() > 0.05 ? 2 : 4;
//     }
// }

// function loadAction() {
//     document.body.onkeyup = function(e) {
//         var eve = e || window.event;
//         switch(eve.keyCode){
//             case 37:
//                 Move.left();
//                 break;
//             case 38:
//                 Move.up();
//                 break;
//             case 39:
//                 Move.right();
//                 break;
//             case 40:
//                 Move.down();
//         }
//         if(deBug) ; else {if(roundFlag) randomNewNum()};
//         F5();
//     }
// }

// var Move = {
//     left : function() {
//         for(var y = 0; y < 4; y++) {
//             for(var x = 0; x < 4; x++) {
//                 move_this('left', x, y);
//             }
//         }
//     },
//     right : function() {
//         for(var y = 0; y < 4; y++) {
//             for(var x = 3; x >= 0; x--) {
//                 move_this('right', x, y);
//             }
//         }
//     },
//     up : function() {
//         for(var x = 0; x < 4; x++) {
//             for(var y = 0; y < 4; y++) {
//                 move_this('up', x, y);
//             }
//         }
//     },
//     down : function() {
//         for(var x = 0; x < 4; x++) {
//             for(var y = 3; y >= 0; y--) {
//                 move_this('down', x, y);
//             }
//         }
//     }
// }

// function can_go(direction, grid) {
//     var x = grid.x, y = grid.y;
//     var flag = false;

//     switch(direction) {
//         case 'left':
//             if(Grids[y][x - 1]) if(Grids[y][x - 1][0] === 0) flag = true;
//             break;
//         case 'up':
//             if(Grids[y - 1]) if(Grids[y - 1][x][0] === 0) flag = true;
//             break;
//         case 'right':
//             if(Grids[y][x + 1]) if(Grids[y][x + 1][0] === 0) flag = true;
//             break;
//         case 'down':
//             if(Grids[y + 1]) if(Grids[y + 1][x][0] === 0) flag = true;
//     }

//     return flag;
// }

// function lets_go(direction, grid) {
//     var x = grid.x, y = grid.y;

//     switch(direction) {
//         case 'left':
//             Grids[y][x - 1][0] = grid.v;
//             grid.x--;
//             break;
//         case 'up':
//             Grids[y - 1][x][0] = grid.v;
//             grid.y--;
//             break;
//         case 'right':
//             Grids[y][x + 1][0] = grid.v;
//             grid.x++;
//             break;
//         case 'down':
//             Grids[y + 1][x][0] = grid.v;
//             grid.y++;
//     }

//     Grids[y][x][0] = 0;
//     roundFlag = true;
// }

// function can_add(direction, grid) {
//     var x = grid.x, y = grid.y;
//     var flag = false;

//     switch(direction) {
//         case 'left':
//             if(Grids[y][x - 1]) if(Grids[y][x - 1][0] === grid.v && Grids[y][x - 1][1]) flag = true;
//             break;
//         case 'up':
//             if(Grids[y - 1]) if(Grids[y - 1][x][0] === grid.v && Grids[y - 1][x][1]) flag = true;
//             break;
//         case 'right':
//             if(Grids[y][x + 1]) if(Grids[y][x + 1][0] === grid.v && Grids[y][x + 1][1]) flag = true;
//             break;
//         case 'down':
//             if(Grids[y + 1]) if(Grids[y + 1][x][0] === grid.v && Grids[y + 1][x][1]) flag = true;
//     }

//     return flag;
// }

// function lets_add(direction, grid) {
//     var x = grid.x, y = grid.y;

//     switch(direction) {
//         case 'left':
//             Grids[y][x - 1][0] = grid.v * 2;
//             Grids[y][x - 1][1] = false;
//             break;
//         case 'up':
//             Grids[y - 1][x][0] = grid.v * 2;
//             Grids[y - 1][x][1] = false;
//             break;
//         case 'right':
//             Grids[y][x + 1][0] = grid.v * 2;
//             Grids[y][x + 1][1] = false;
//             break;
//         case 'down':
//             Grids[y + 1][x][0] = grid.v * 2;
//             Grids[y + 1][x][1] = false;
//     }

//     score += grid.v * 2;
//     Grids[y][x][0] = 0;
//     roundFlag = true;
// }

// function move_this(direction, x, y) {
//     var grid = {
//         x : x,
//         y : y,
//         v : Grids[y][x][0]
//     }
//     if(grid.v !== 0){
//         while(can_go(direction, grid)) {
//             lets_go(direction, grid);
//         }

//         if(can_add(direction, grid)) {
//             lets_add(direction, grid);
//         }
//     }
// }