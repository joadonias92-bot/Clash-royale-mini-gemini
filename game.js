const cardsData = [
    { name: "Guerreiro", cost: 3, hp: 100, color: 'blue' },
    { name: "Arqueiro", cost: 2, hp: 50, color: 'cyan' },
    { name: "Gigante", cost: 5, hp: 300, color: 'darkblue' }
];

let elixir = 5;
let deck = [...cardsData];

function iniciarJogo() {
    document.getElementById('lobby').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    renderizarMao();
    setInterval(gerarElixir, 2000);
}

function gerarElixir() {
    if (elixir < 10) {
        elixir++;
        document.getElementById('elixir-val').innerText = elixir;
    }
}

function renderizarMao() {
    const handDiv = document.getElementById('hand');
    handDiv.innerHTML = '';
    deck.forEach(card => {
        const btn = document.createElement('div');
        btn.className = 'card';
        btn.innerHTML = `<b>${card.name}</b><br>💧${card.cost}`;
        btn.onclick = () => invocarTropa(card);
        handDiv.appendChild(btn);
    });
}

function invocarTropa(card) {
    if (elixir >= card.cost) {
        elixir -= card.cost;
        document.getElementById('elixir-val').innerText = elixir;
        
        const unit = document.createElement('div');
        unit.className = 'unit';
        unit.style.backgroundColor = card.color;
        unit.style.left = '140px';
        unit.style.bottom = '80px';
        
        document.getElementById('battlefield').appendChild(unit);
        moverTropa(unit);
    } else {
        alert("Sem elixir!");
    }
}

function moverTropa(unit) {
    let pos = 80;
    const loop = setInterval(() => {
        pos += 2;
        unit.style.bottom = pos + 'px';
        if (pos > 400) { // Chegou na base inimiga
            clearInterval(loop);
            unit.remove();
            alert("Dano na torre inimiga!");
        }
    }, 50);
}
