const BLOCK_SIZE = 30;
const COLS = 10;
const ROWS = 20;
const BLOCK_GAP = 1;
const nameOfTypes = ['I','J','L','O','S','T','V']
const beginX = 4

// prettier-ignore
const types = {
  I: {
    type: 'I',
    color:"cyan",
    size: 4,
    pivotPoint: [BLOCK_SIZE * 2 + BLOCK_GAP * 1.5, BLOCK_SIZE + BLOCK_GAP * 0.5],
    spawnVector: [3, 1],
    states: [
      // [
      //   [0, 0, 0, 0],
      //   [1, 1, 1, 1],
      //   [0, 0, 0, 0],
      //   [0, 0, 0, 0]
      // ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ]
    ]
  },
  J: {
    type: 'J',
    color:"blue",
    size: 3,
    pivotPoint: [BLOCK_SIZE * 1.5 + BLOCK_GAP, BLOCK_SIZE * 1.5 + BLOCK_GAP],
    spawnVector: [3, 0],
    states: [
      [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
      ],
      [
        [0, 2, 2],
        [0, 2, 0],
        [0, 2, 0]
      ],
      [
        [0, 0, 0],
        [2, 2, 2],
        [0, 0, 2]
      ],
      [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0]
      ]
    ]
  },
  L: {
    type: 'L',
    size: 3,
    color:"orange",
    pivotPoint: [BLOCK_SIZE * 1.5 + BLOCK_GAP, BLOCK_SIZE * 1.5 + BLOCK_GAP],
    spawnVector: [3, 0],
    states: [
      [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
      ],
      [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3]
      ],
      [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0]
      ],
      [
        [3, 3, 0],
        [0, 3, 0],
        [0, 3, 0]
      ]
    ]
  },
  O: {
    type: 'O',
    size: 2,
    color:"yellow",
    pivotPoint: [BLOCK_SIZE + BLOCK_GAP * 0.5, BLOCK_SIZE + BLOCK_GAP * 0.5],
    spawnVector: [4, 0],
    states: [
      [
        [4, 4],
        [4, 4]
      ]
    ]
  },
  S: {
    type: 'S',
    size: 3,
    color:"green",
    pivotPoint: [BLOCK_SIZE * 1.5 + BLOCK_GAP, BLOCK_SIZE * 1.5 + BLOCK_GAP],
    spawnVector: [3, 0],
    states: [
      [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
      ],
      [
        [0, 5, 0],
        [0, 5, 5],
        [0, 0, 5]
      ],
      [
        [0, 0, 0],
        [0, 5, 5],
        [5, 5, 0]
      ],
      [
        [5, 0, 0],
        [5, 5, 0],
        [0, 5, 0]
      ]
    ]
  },
  T: {
    type: 'T',
    size: 3,
    color:"purple",
    pivotPoint: [BLOCK_SIZE * 1.5 + BLOCK_GAP, BLOCK_SIZE * 1.5 + BLOCK_GAP],
    spawnVector: [3, 0],
    states: [
      [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]
      ],
      [
        [0, 6, 0],
        [0, 6, 6],
        [0, 6, 0]
      ],
      [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0]
      ],
      [
        [0, 6, 0],
        [6, 6, 0],
        [0, 6, 0]
      ]
    ]
  },
  Z: {
    type: 'Z',
    size: 3,
    color:"reds",
    pivotPoint: [BLOCK_SIZE * 1.5 + BLOCK_GAP, BLOCK_SIZE * 1.5 + BLOCK_GAP],
    spawnVector: [3, 0],
    states: [
      [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
      ],
      [
        [0, 0, 7],
        [0, 7, 7],
        [0, 7, 0]
      ],
      [
        [0, 0, 0],
        [7, 7, 0],
        [0, 7, 7]
      ],
      [
        [0, 7, 0],
        [7, 7, 0],
        [7, 0, 0]
      ]
    ]
  }
};

/*
  translations to test when rotating
  usage: wallKicks[tetromino.size][tetromino.state][newState]
  returns array of translations to test
  based on http://tetris.wikia.com/wiki/SRS
  O does not kick :(
*/
const wallKicks = {
  // J, L, S, T, Z
  3: {
    0: {
      1: [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
      3: [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
    },
    1: {
      0: [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
      2: [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]]
    },
    2: {
      1: [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
      3: [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
    },
    3: {
      0: [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
      2: [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]]
    }
  },
  // I
  4: {
    0: {
      1: [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
      3: [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]]
    },
    1: {
      0: [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
      2: [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]]
    },
    2: {
      1: [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
      3: [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]]
    },
    3: {
      0: [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
      2: [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]]
    }
  }
};