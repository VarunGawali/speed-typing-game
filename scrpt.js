const random_quote_api = 'https://api.quotable.io/random'
const quotedisplay = document.getElementById('quote')
const quoteinputele = document.getElementById('quoteinput')
const timer = document.getElementById('timer')

quoteinputele.addEventListener('input',()=>{
    const arrayquote = quotedisplay.querySelectorAll('span')
    const arrayvalue = quoteinputele.value.split('')
    let correct = true
    arrayquote.forEach((characterspan, index)=>{
        const character = arrayvalue[index]
        if(character == null){
            characterspan.classList.remove('incorrect')
            characterspan.classList.remove('correct')
            correct=false
        } else if(character === characterspan.innerText){
            characterspan.classList.add('correct')
            characterspan.classList.remove('incorrect')
        } else{
            characterspan.classList.remove('correct')
            characterspan.classList.add('incorrect')
            correct=false
        }
    })
    if(correct) render_new_quote()
})

function get_quote(){
    return fetch(random_quote_api)
        .then(response => response.json())
        .then(data => data.content)
}

async function render_new_quote(){
    const quote = await get_quote()
    quotedisplay.innerHTML = ''
    quote.split('').forEach(character => {
        const characterspan = document.createElement('span')
        characterspan.innerText=character
        quotedisplay.appendChild(characterspan)
    });
    quoteinputele.value = null
    starttimer()
}

let starttime 
function starttimer(){
    timer.innerText=0
    starttime = new Date()
    setInterval(()=>{
        timer.innerText=gettimertime()
    },1000)
}

function gettimertime(){
    return Math.floor((new Date() - starttime)/1000)
}

render_new_quote()