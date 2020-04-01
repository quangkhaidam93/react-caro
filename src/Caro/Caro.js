export function isConsecutiveLine(board, isVertical, rows, cols) {
    for(let i = 0; i < (isVertical ? cols : rows); i++) {
        let pX = 0;
        let pO = 0;
        let lineX = Array(5).fill(null);
        let lineO = Array(5).fill(null);
        for (let j = 0; j < (isVertical ? rows : cols); j++) {
            switch(board[(isVertical ? j : i)][(isVertical ? i : j)]) {
                case 'X':
                    pO = 0;
                    lineO.fill(null);
                    lineX[pX] = {i: isVertical ? j : i, j: isVertical ? i : j};
                    if (++pX === 5) return {winner: 'X', highlight: lineX.slice()}
                    break;
                case 'O':
                    pX = 0;
                    lineX.fill(null);
                    lineO[pO] = {i: isVertical ? j : i ,j: isVertical ? i : j};
                    if (++pO === 5) return {winner: 'O', highlight: lineO.slice()}
                    break;
                default:
                    pX = 0;
                    pO = 0;
                    lineX.fill(null);
                    lineO.fill(null);
                    break;
            }
        }
    }
    return null;
}

export function isConsecutiveDiagonalLeft2Right(board, isCols, rows, cols) {
    for (let j = (isCols ? cols : rows) - 5; j >= 0; j--) {
        let tmp = j;
        let pX = 0;
        let pO = 0;
        let diagonalX = Array(5).fill(null);
        let diagonalO = Array(5).fill(null);
        for(let i = 0; i < (isCols ? cols : rows) - j; i++, tmp++) {
            switch (board[(isCols ? tmp : i)][(isCols ? i : tmp)]) {
                case 'X':
                    pO = 0;
                    diagonalO.fill(null);
                    diagonalX[pX] = {i: isCols ? tmp : i, j: isCols ? i : tmp};
                    if (++pX === 5) return {winner: 'X', highlight: diagonalX.slice()}
                    break;
                case 'O':
                    pX = 0;
                    diagonalX.fill(null);
                    diagonalO[pO] = {i: isCols ? tmp : i, j: isCols ? i : tmp};
                    if (++pO === 5) return {winner: 'O', highlight: diagonalO.slice()}
                    break;
                default:
                    pX = 0;
                    pO = 0;
                    diagonalX.fill(null);
                    diagonalO.fill(null);
                    break;
            }
        }
    }
    return null;
}

export function isConsecutiveDiagonalRight2Left(board, isCols, rows, cols) {
    for (let j = (isCols ? (cols - 1) : (rows - 5)) ; j >= (isCols ? 5 : 1); j--) {
        let tmp = j;
        let pX = 0;
        let pO = 0;
        let diagonalX = Array(5).fill(null);
        let diagonalO = Array(5).fill(null);
        for(let i = (isCols ? 0 : (cols - 1)); (isCols ? (i <= j) : (i >= j)); (isCols ? (i++, tmp--) : (i--, tmp++))) {
            switch (board[(isCols ? i : tmp)][(isCols ? tmp : i)]) {
                case 'X':
                    pO = 0;
                    diagonalO.fill(null);
                    diagonalX[pX] = {i: isCols ? i : tmp, j: isCols ? tmp : i};
                    if (++pX === 5) return {winner: 'X', highlight: diagonalX.slice()}
                    break;
                case 'O':
                    pX = 0;
                    diagonalX.fill(null);
                    diagonalO[pO] = {i: isCols ? i : tmp, j: isCols ? tmp : i};
                    if (++pO === 5) return {winner: 'O', highlight: diagonalO.slice()}
                    break;
                default:
                    pX = 0;
                    pO = 0;
                    diagonalX.fill(null);
                    diagonalO.fill(null);
                    break;
            }
        }
    }
    return null;
}