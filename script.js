let allElems = document.querySelectorAll('.elem')
let fullelempage = document.querySelectorAll('.fullelem')
let fullelempagebackbtn = document.querySelectorAll('.fullelem .back')

allElems.forEach(function(elem){
    elem.addEventListener('click',function(){
        // console.log(elem.id) 
        let fullelem = (document.querySelectorAll('.fullelem')[elem.id])
            fullelem.style.display = 'block';
            fullelem.style.transform = 'scale(1)';
        
    })
})
// let fullelempagebackbtn = document.querySelectorAll('.fullelem .back')
fullelempagebackbtn.forEach(function(back){
   back.addEventListener('click',function(){
//    fullelempage[back.id].style.display = 'none';
   fullelempage[back.id].style.transform = 'scale(0)';

   })
})