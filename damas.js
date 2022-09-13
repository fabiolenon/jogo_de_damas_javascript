function criarTabuleiro() {
    return ('#,p,#,p,#,p,#,p,'
           +'p,#,p,#,p,#,p,#,'
           +'#,p,#,p,#,p,#,p,'
           +' ,#, ,#, ,#, ,#,'
           +'#, ,#, ,#, ,#, ,'
           +'b,#,b,#,b,#,b,#,'
           +'#,b,#,b,#,b,#,b,'
           +'b,#,b,#,b,#,b,#,').split(',');
}

function imprimirTabuleiro(tabuleiro) {
    let tabela = [];

    for(let i = 0; i < 64; i += 8) {
        tabela.push(tabuleiro.slice(i, i+8));
    }

    console.table(tabela);
}

lxcParaIndex(lxc) {
    if (lxc !== null) {
        let lc = lxc.split('x').map(Number);
        let l = lc[o];
            c = lc[1];

        if (0 <= l && l < 8 && 0 <= c && c < 8) {
            return l * 8 + c;
        }
    }

    return null;
}

function indexParaLxC(index) {
    if (index < 0 || index >= 64) {
        return null;
    }

    let l = Math.floor(index / 8);
        c = index % 8;

        return l + 'x' + c;
}

function escolherPeca(tabuleiro, cor) {
    let index;
    do {
        let lxc = prompt("Escolha a posição LxC de uma peça " + cor);
        index = lxcParaIndex(lxc);
    } while (index === null || tabuleiro[index].toLowerCase() !== cor[0])

    return index;
}

function escolherLxCDestino(tabuleiro) {
    let index;

    do {
        let lxc = prompt("Escolha uma casa vazia");
        index = lxcParaIndex(lxc);
    } while (index === null || tabuleiro[index] !== ' ')

    return index;
}

function mover(tabuleiro, indexOrigem, indexDestino) {
    let peca = tabuleiro[indexOrigem];
    let diferenca = indexDestino - indexOrigem;

    if (diferenca % 7 !== 0 && diferenca % 9 !== 0) {
        return {ok: false, msg: "Movimento não-diagonal inválido"};
    }

    if (['p', 'b'].includes(peca)) {

    }
    else {

    }
}

function promoverPecas(tabuleiro) {
    let linhaInicio, linhaFim;

    linhaInicio = 1;
    linhaFim = 7;
    for (let i = linhaInicio; i <= linhaFim; i += 2) {
        if (tabuleiro[i] === 'b') {
            tabuleiro[i] = 'B';
        }
    }

    linhaInicio = 7*8;
    linhaFim = linhaInicio + 7;
    for (let i = linhaInicio; i <= linhaFim; i += 2) {
        if (tabuleiro[i] === 'p') {
            tabuleiro[i] = 'P';
        }
    }
}

// PAREI NO TEMPO 46 MINUTOS DO VIDEO