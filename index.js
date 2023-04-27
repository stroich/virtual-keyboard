//the generation of DOM elements is implemented - start
let keyboard = [
    [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace']
    ],
    [
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\','Delete'],
        ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash','Delete']
    ],
    [
        ['CapsLock','a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
        ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter']
    ],
    [
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
        ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight']
        ],
    [
        ['Ctrl','Win','Alt',' ','Alt','◄','▼','►','Ctrl'],
        ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']
    ]
];

function generatingElements(){
    let container = `
    <div class="container">
      <h1 class="title">Виртуальная клавиатура</h1>
      <textarea class="textarea"></textarea>
      <div class="virtual-keyboard">
        <div class="virtual-keyboard-row"></div>
        <div class="virtual-keyboard-row"></div>
        <div class="virtual-keyboard-row"></div>
        <div class="virtual-keyboard-row"></div>
        <div class="virtual-keyboard-row"></div>
      </div>
    </div>`;
    let body = document.querySelector('.body');
    body.insertAdjacentHTML('afterbegin', container);
    let containerKeyboard = document.querySelectorAll('.virtual-keyboard-row');
    for (let i=0; i<5; i++){
        keyboard[i][0].forEach((el,ind)=>{
            let elementKeyboard = document.createElement('div');
            elementKeyboard.classList.add('virtual-keyboard-element');
            elementKeyboard.dataset.code = keyboard[i][1][ind];
            elementKeyboard.innerHTML = el;
            containerKeyboard[i].append(elementKeyboard);
        })
    }
    let  elementKeyboard = document.querySelectorAll('.virtual-keyboard-element');
    elementKeyboard.forEach((el,ind)=>{
        let numberWideElement =[14,29,41,42,54]
        if (numberWideElement.includes(ind) ){
            el.classList.add('element-wide');
        }
        if(ind===58){
            el.classList.add('space');
        }
        if (ind===13){
            el.classList.add('backspace');
        }
        if (ind===28){
            el.classList.add('delete');
        }
    })

}
generatingElements();
//the generation of DOM elements is implemented - end
// pressing a key on a physical keyboard highlights the key on the virtual keyboard -start

document.addEventListener('keydown',(event)=>{
    let elementKeyboard = document.querySelectorAll('.virtual-keyboard-element');
    elementKeyboard.forEach(el=>{
        if (event.code===el.dataset.code){
            el.classList.add('active');
        }
    })
})
document.addEventListener('keyup',(event)=>{
    let elementKeyboard = document.querySelectorAll('.virtual-keyboard-element');
    elementKeyboard.forEach(el=>{
        if (event.code===el.dataset.code){
            el.classList.remove('active');
        }
    })
})
// pressing a key on a physical keyboard highlights the key on the virtual keyboard -start
