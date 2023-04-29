//the generation of DOM elements is implemented - start
let language = 'en';
let capsLock =false;
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
      <textarea class="textarea" tabindex="0"></textarea>
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

function changeLanguage(){
    let rowsKeyboard = document.querySelectorAll('.virtual-keyboard-row');
    rowsKeyboard.forEach((el,ind)=>{
        let elementKeyboard = el.querySelectorAll('.virtual-keyboard-element');
        elementKeyboard.forEach((element,index)=>{
            element.innerHTML = keyboard[ind][0][language][index];
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
window.addEventListener('load', getLocalStorage);

let textarea =document.querySelector('textarea');
let caretPos = 0;
let rowPos = 0;
let cursorPos =0;
textarea.focus();
textarea.addEventListener('blur',()=>textarea.focus());

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
            if(capsLock){
                capsLock = false;
                enableCapslock();
                capsLock = true;
            }
        }else{
            language='en';
            changeLanguage();
            if(capsLock){
                capsLock = false;
                enableCapslock();
                capsLock = true;
            }
        }
    }
    if(event.code==='CapsLock'){
        if (capsLock){
            enableCapslock();
            capsLock = false;
        }else{
            enableCapslock();
            capsLock = true;
        }
    }
    if(event.code==='ArrowLeft'){
        if (caretPos!==textarea.value.length){
            cursorPos+=1;
            caretPos+=1;
        }
    }
    if (event.code==='ArrowRight' || event.code==='Delete'){
        if (caretPos!==0){
            cursorPos-=1;
            caretPos-=1;
        }
    }
    if (event.code==='Backspace'){
        if (caretPos>textarea.value.length){
            cursorPos-=1;
            caretPos-=1;
        }
    }
    if (event.code==='Enter'){
        rowPos++;
    }
    if (event.code==='ArrowUp'){
        recalculatePositionUp();
        rowPos--;
    }
    if (event.code==='ArrowDown'){
        recalculatePositionDown();
        rowPos++;
    }
    if (event.code==='Tab'){
        event.preventDefault();
        let newValue= textarea.value.split('');
        newValue.splice(textarea.value.length-cursorPos,0,' ',' ',' ',' ');
        textarea.value = newValue.join('');
        textarea.setSelectionRange(textarea.value.length-cursorPos,textarea.value.length-cursorPos);
    }
})
document.addEventListener('keyup',(event)=>{
    let elementKeyboard = document.querySelectorAll('.virtual-keyboard-element');
    elementKeyboard.forEach(el=>{
        if (event.code===el.dataset.code){
            el.classList.remove('active');
        }
    })
    if(event.code==='CapsLock'&& capsLock){
        let capsLockElement =document.querySelector(`.virtual-keyboard-element[data-code='CapsLock']`);
        capsLockElement.classList.add('active');

    }
})

let elementKeyboard = document.querySelectorAll('.virtual-keyboard-element');

function enableCapslock (){
    elementKeyboard = document.querySelectorAll('.virtual-keyboard-element');
    elementKeyboard.forEach(el=>{
        let ruLetter = ['Comma', 'Period','Semicolon', 'Quote','BracketLeft', 'BracketRight'];
        if(el.dataset.code.includes('Key') || ruLetter.includes(el.dataset.code)){
            if (capsLock){
                el.textContent = el.textContent.toLowerCase();
            }else{
                el.textContent = el.textContent.toUpperCase();
            }
        }
    })
}
function recalculatePositionUp (){
    let valueArrUp=textarea.value.split('\n');
    let numberPosValue =valueArrUp[rowPos].length-caretPos;
    if (numberPosValue>valueArrUp[rowPos-1].length){
        numberPosValue =valueArrUp[rowPos-1].length;
        caretPos = 0;
    }else{
        caretPos=valueArrUp[rowPos-1].length-numberPosValue;
    }
    for (let i = 0; i < rowPos-1 ; i++){
        numberPosValue+=valueArrUp[i].length+1;
    }
    cursorPos = textarea.value.length-numberPosValue;
    return numberPosValue;
}
function recalculatePositionDown (){
    let valueArrDown=textarea.value.split('\n');
    let numberPos = valueArrDown[rowPos].length-caretPos;
    if (numberPos > valueArrDown[rowPos+1].length){
        numberPos = valueArrDown[rowPos+1].length;
        caretPos = 0;
    }else{
        caretPos = valueArrDown[rowPos+1].length-numberPos;
    }
    for (let i = 0; i < rowPos+1 ; i++){
        numberPos+=valueArrDown[i].length+1;
    }
    cursorPos = textarea.value.length-numberPos;
    return numberPos;
}
function clickElement(event){
    let newValue;
    let symbol =['Backquote','Minus', 'Equal','BracketLeft', 'BracketRight', 'Backslash','Semicolon', 'Quote','Slash','Comma', 'Period'];
    if (symbol.includes(event.currentTarget.dataset.code)){
        textarea.value = textarea.value +event.currentTarget.outerText;
    }
    if(event.currentTarget.dataset.code.includes('Digit') || event.currentTarget.dataset.code.includes('Key')){
        textarea.value = textarea.value +event.currentTarget.outerText;
    }
    switch (event.currentTarget.dataset.code){
        case 'Backspace':
            newValue= textarea.value.split('');
            newValue.splice(textarea.value.length-cursorPos-1,1);
            if (cursorPos>textarea.value.length){
                cursorPos-=1;
                caretPos-=1;
            }
            textarea.value = newValue.join('');
            textarea.setSelectionRange(textarea.value.length-cursorPos,textarea.value.length-cursorPos);
            break;
        case 'Delete':
            newValue= textarea.value.split('');
            newValue.splice(textarea.value.length-cursorPos,1);
            if (cursorPos!==0){
                cursorPos-=1;
                caretPos-=1;
            }
            textarea.value = newValue.join('');
            textarea.setSelectionRange(textarea.value.length-cursorPos,textarea.value.length-cursorPos);
            break;
        case 'Space':
            newValue= textarea.value.split('');
            newValue.splice(textarea.value.length-cursorPos,0,' ');
            textarea.value = newValue.join('');
            textarea.setSelectionRange(textarea.value.length-cursorPos,textarea.value.length-cursorPos);
            break;
        case 'Tab':
            newValue= textarea.value.split('');
            newValue.splice(textarea.value.length-cursorPos,0,' ',' ',' ',' ');
            textarea.value = newValue.join('');
            textarea.setSelectionRange(textarea.value.length-cursorPos,textarea.value.length-cursorPos);
            break;
        case 'CapsLock':
            if (capsLock){
                event.currentTarget.classList.remove('active');
                enableCapslock();
                capsLock = false;
            }else{
                event.currentTarget.classList.add('active');
                enableCapslock();
                capsLock = true;
            }
            break;
        case 'ArrowLeft':
            if (caretPos!==textarea.value.length){
                cursorPos+=1;
                caretPos+=1;
            }
            textarea.setSelectionRange(textarea.value.length-cursorPos,textarea.value.length-cursorPos);
            break;
        case 'ArrowRight':
            if (caretPos!==0){
                cursorPos-=1;
                caretPos-=1;
            }
            textarea.setSelectionRange(textarea.value.length-cursorPos,textarea.value.length-cursorPos);
            break;
        case 'Enter':
            newValue= textarea.value.split('');
            newValue.splice(textarea.value.length-cursorPos,0,'\n');
            textarea.value = newValue.join('');
            textarea.setSelectionRange(textarea.value.length-cursorPos,textarea.value.length-cursorPos);
            rowPos++;
            break;
        case 'ArrowUp':
            if (rowPos!==0){
                let positionUp =recalculatePositionUp();
                textarea.setSelectionRange(positionUp,positionUp);
                rowPos--;
            }
            break;
        case 'ArrowDown':
            let valueArrDown=textarea.value.split('\n');
            if (rowPos!==valueArrDown.length-1){
                let positionDown = recalculatePositionDown();
                textarea.setSelectionRange(positionDown,positionDown);
                rowPos++;
            }
            break;

    }
}

elementKeyboard.forEach(el=>{
    el.addEventListener('click', clickElement);
    el.addEventListener('mousedown',(event)=>{
        event.currentTarget.classList.add('active');
    });
    el.addEventListener('mouseup',(event)=>{
        event.currentTarget.classList.remove('active');
    });
    el.addEventListener('mouseover',(event)=>{
        event.currentTarget.classList.add('hover');
    });
    el.addEventListener('mouseout',(event)=>{
        event.currentTarget.classList.remove('hover');
    });
})

