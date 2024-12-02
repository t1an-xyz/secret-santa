let choices = [];
let choicesCopy = [];
let form = document.getElementById('form');
let currIdx = 0;

let drawerName = document.getElementById('drawer-name');
let drawBtn = document.getElementById('draw-btn');
let nextBtn = document.getElementById('next-btn');
let result = document.getElementById('result');

function createInput(s) {
    let input = document.createElement('input');
    input.type = 'text';
    input.name = s;

    input.addEventListener('focusin', () => {
        if (input.nextElementSibling === null) {
            let newInput = createInput('');
            input.insertAdjacentElement('afterend', newInput);
        }
    });

    input.addEventListener('focusout', () => {
        let nodes = Array.from(form.children);
        let idx = nodes.indexOf(input);
        if (input.value === '') {
            input.remove();
            choices.splice(idx, 1);
        }
        else {
            if (choices[idx] === undefined) {
                choices.push(input.value);
            }
            else {
                choices[idx] = input.value;
            }
        }
    });
    return input;
}

form.appendChild(createInput(''));

let shuffleBtn = document.getElementById('submit');
shuffleBtn.addEventListener('click', () => {
    if (choices.length < 2) {
        alert('Please enter at least two choices');
        return;
    }
    document.getElementById('start').style.display = 'none';
    document.getElementById('draw').style.display = 'flex';
    choicesCopy = choices.slice();
    drawerName.innerText = choices[currIdx] + "'s turn to draw";
});

drawBtn.addEventListener('click', () => {
    let randIdx;
    do {
        randIdx = Math.floor(Math.random() * choicesCopy.length);
    } while (choicesCopy[randIdx] === choices[currIdx]);
    if (choicesCopy.length === 2) {
        if (choicesCopy[1 - randIdx] === choices[currIdx + 1]) {
            randIdx = 1 - randIdx;
        }
    }
    result.innerText = 'Your secret buddy is... ' + choicesCopy[randIdx] + '!';
    choicesCopy.splice(randIdx, 1);
    drawBtn.style.display = 'none';
    nextBtn.style.display = 'block';
});

nextBtn.addEventListener('click', () => {
    currIdx++;
    if (currIdx === choices.length) {
        document.getElementById('draw').style.display = 'none';
        document.getElementById('finish').style.display = 'flex';
    }
    drawerName.innerText = choices[currIdx] + "'s turn to draw";
    result.innerText = '';
    drawBtn.style.display = 'block';
    nextBtn.style.display = 'none';
});