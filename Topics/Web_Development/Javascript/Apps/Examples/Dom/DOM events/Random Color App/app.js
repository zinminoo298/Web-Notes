// Variables for changing Body background color
const b1 = document.querySelector('#b1');
const bgRgb = document.querySelector('#rgbBg');

// Variables for changing Text color
const b2 = document.querySelector('#b2');
const txt = document.querySelector('#txt');
const txtRgb = document.querySelector("#rgbTxt");

// Color radomizing function
const randomColor = ()=>{
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Change background color
b1.addEventListener('click', ()=>{
    const newColor = randomColor();
     document.body.style.backgroundColor = newColor;
     bgRgb.innerText = newColor;
 });

// Change text color
b2.addEventListener('click', ()=>{
    const newColor = randomColor();
     txt.style.color = newColor;
     txtRgb.innerText = newColor;
 });
 