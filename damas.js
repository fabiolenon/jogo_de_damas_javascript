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

function lxcParaIndex(lxc) {
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
        return moverComum(tabuleiro, indexOrigem, indexDestino, peca, diferenca);
    }
    else {
        return moverDama(tabuleiro, indexOrigem, indexDestino, peca, diferenca);
    }
}

function moverComum(tabuleiro, indexOrigem, indexDestino, peca, diferenca) {
    let direcao = diferenca % 7 === 0 ? 7 : 9;
    let numCasas = diferenca / direcao;

    if (numCasas < 0) {
        numCasas = -numCasas;
        direcao = -direcao;
    }

    if (numCasas === 1) {
        if (peca === 'p' && indexDestino > indexOrigem
            || peca === 'b' && indexDestino < indexOrigem)
        {
            tabuleiro[indexOrigem] = ' ';
            tabuleiro[indexDestino] = peca;
            return {ok: true, capturas: 0}
        }
        else {
            return {ok: false, msg: "Movimento para trás inválido"};
        }
    }
    else if (numCasas === 2) {
        let indexCaptura = indexOrigem + direcao;
        let pecaCapturada = tabuleiro[indexCaptura].toLowerCase();

        if (peca === 'b' && pecaCapturada === 'p' ||
            peca === 'p' && pecaCapturada === 'b')
        {
            tabuleiro[indexOrigem] = ' ';
            tabuleiro[indexCaptura] = ' ';
            tabuleiro[indexDestino] = peca;
            return {ok: true, capturas: 1};
        }
        else {
            return {ok: false, msg: "Nenhuma peça para capturar"};
        }
    }
    else {
        return {ok: false, msg: "Movimento longo inválido"};
    }
}

function moverDama(tabuleiro, indexOrigem, indexDestino, peca, diferenca) {
    let direcao = diferenca % 7 === 0 ? 7 : 9;
    let numCasas = diferenca / direcao;

    if (numCasas < 0) {
        numCasas = -numCasas;
        direcao = -direcao;
    }

    let adversario = peca === 'B' ? 'P' : 'B';

    let seguidas = 0;
    let capturas = [];

    for (let i = indexOrigem + direcao; i !== indexDestino; i += direcao) {
        if (tabuleiro[i].toUpperCase() === peca) {
            return{ok: false, msg: "Peças da mesma cor no caminho"};
        }
        else if (tabuleiro[i].toUpperCase() === adversario) {
            capturas.push(i);
            seguidas += 1;
        }
        else {
            seguidas = 0;
        }

        if (seguidas > 1) {
            return {ok: false, msg: "Duas ou mais peças seguidas no caminho"};
        }
    }

    for (let i of capturas) {
        tabuleiro[i] = ' ';
    }
    tabuleiro[indexOrigem] = ' ';
    tabuleiro[indexDestino] = peca;

    return {ok: true, capturas: capturas.length};
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

function jogar() {
    let tabuleiro = criarTabuleiro();
    let turno = ['branca', 'preta'];
    let pecas = {brancas: 4 * 3, pretas: 4 * 3}

    while (pecas.brancas > 0 && pecas.pretas > 0) {
        imprimirTabuleiro(tabuleiro);

        let indexOrigem = escolherPeca(tabuleiro, turno[0]);
        let indexDestino = escolherLxCDestino(tabuleiro);

        let r = mover(tabuleiro, indexOrigem, indexDestino);
        if(r.ok) {
            pecas[turno[1] + 's'] -= r.capturas;
            turno.push(turno.shift());
            promoverPecas(tabuleiro);
        }
        else {
            alert(r.msg)
        }
    }

    imprimirTabuleiro(tabuleiro);
    console.table(pecas);
}