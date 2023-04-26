//the generation of DOM elements is implemented - start
let keyboard = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\','Delete'],
    ['CapsLock','a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
    ['Ctrl','Win','Alt',' ','Alt','◄','▼','►','Ctrl']
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
        keyboard[i].forEach(el=>{
            let elementKeyboard = document.createElement('div');
            elementKeyboard.classList.add('virtual-keyboard-element');
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
