

const playSound = (e) => {
     const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)  // capturamos la etiqueta audio con los data-key
     const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
     
     if(!audio) return   // evita que toda la función se ejecute 
     audio.currentTime = 0    //  repite hasta el principio y muy rápido
     audio.play()   
     key.classList.add('playing')
}

function removeTransition(e) {
     if(e.propertyName !== 'transform') return    // omitirlo si no es una transformación
     this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key')

keys.forEach(key => key.addEventListener('transitionend', removeTransition))

window.addEventListener('keydown', playSound)