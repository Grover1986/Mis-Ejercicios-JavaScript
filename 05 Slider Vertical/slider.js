/* slide vartical */
var slides = document.querySelectorAll('#slider div');
var titles = document.querySelectorAll('.slide-title');
var sections = document.querySelectorAll('.slide-section');
var slideSayisi = slides.length;
var sliderHeight = slides[0].clientHeight;
var upBtn = document.querySelector('.up');
var downBtn = document.querySelector('.down');
var index = 1;
var transfer = 0 + 1000*slideSayisi;

console.log(transfer)

function sliderApertura(){
    setTimeout(function(){
        titles[transfer%slideSayisi].style.opacity = '1';
    }, 1000);
    setTimeout(function(){
        sections[transfer%slideSayisi].style.opacity = '1';
    }, 2000);
}

function sliderReinicio(){
    for(let index = 0; index < slideSayisi; index++) {
        titles[index].style.opacity = 0;
        sections[index].style.opacity = 0;
    }
}

sliderApertura();

upBtn.addEventListener('click', function(){
    transfer++;
    for(let index = 0; index < slideSayisi; index++) {
        slides[index].style.transform = 'translateY(-'+((transfer%slideSayisi*sliderHeight))+'px)';
    }
    sliderApertura();
    if(transfer%slideSayisi!==index){ sliderReinicio(); }
});

downBtn.addEventListener('click', function(){
    transfer--;
    for(let index = 0; index < slideSayisi; index++) {
        slides[index].style.transform = 'translateY(-'+((transfer%slideSayisi*sliderHeight))+'px)';
    }
    sliderApertura();
    if(transfer%slideSayisi!==index){ sliderReinicio(); }
});