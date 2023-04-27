//the generation of DOM elements is implemented - start
let language = 'en';
let keyboard = [
    [
        {
            'en':['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
            'ru':['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace']
        },
        ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace']
    ],
    [
        {
            'en':['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\','Delete'],
            'ru':['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete']
        },
        ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash','Delete']
    ],
    [
        {
            'en':['CapsLock','a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
            'ru':['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter']
        },
        ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter']
    ],
    [
        {
            'en':['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
            'ru':['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift']
        },
        ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight']
        ],
    [
        {
            'en':['Ctrl','Win','Alt',' ','Alt','◄','▼','►','Ctrl'],
            'ru':['Ctrl','Win','Alt',' ','Alt','◄','▼','►','Ctrl']
        },
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
      <div class="text">
        <p class="text-element">Клавиатура создана в операционной системе Windows</p>
        <p class="text-element">Для переключения языка комбинация: левыe shift + alt</p>
       </div>
    </div>`;
    let body = document.querySelector('.body');
    body.insertAdjacentHTML('afterbegin', container);
    let containerKeyboard = document.querySelectorAll('.virtual-keyboard-row');
    for (let i=0; i<5; i++){
        keyboard[i][0][language].forEach((el,ind)=>{
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
//language start
function changeLanguage(){
    let rowsKeyboard = document.querySelectorAll('.virtual-keyboard-row');
    rowsKeyboard.forEach((el,ind)=>{
        let elementKeyboard = el.querySelectorAll('.virtual-keyboard-element');
        elementKeyboard.forEach((element,index)=>{
            element.innerHTML = keyboard[ind][0][language][index]
        })
    })

}
function setLocalStorage() {
    localStorage.setItem('language', language);
}
window.addEventListener('beforeunload', setLocalStorage);
function getLocalStorage() {
    if(localStorage.getItem('language')) {
        language = localStorage.getItem('language');
        changeLanguage();
    }
}
window.addEventListener('load', getLocalStorage)
//language end
// pressing a key on a physical keyboard highlights the key on the virtual keyboard -start

document.addEventListener('keydown',(event)=>{
    let elementKeyboard = document.querySelectorAll('.virtual-keyboard-element');
    elementKeyboard.forEach(el=>{
        if (event.code===el.dataset.code){
            el.classList.add('active');
        }
    })
    if (event.code==='ShiftLeft' && event.altKey || event.code==='AltLeft' && event.shiftKey){
        if(language==='en'){
            language ='ru';
            changeLanguage();
        }else{
            language='en';
            changeLanguage();
        }
    }
})
document.addEventListener('keyup',(event)=>{
    let elementKeyboard = document.querySelectorAll('.virtual-keyboard-element');
    elementKeyboard.forEach(el=>{
        if (event.code===el.dataset.code){
            el.classList.remove('active');
        }
    })
})
// pressing a key on a physical keyboard highlights the key on the virtual keyboard -end

