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

let form = document.querySelector('.addtask form')
let input = document.querySelector('.addtask form #task')
let detail = document.querySelector('.addtask form #details')
let check = document.querySelector('.addtask form .imp #check ')
let alltask = document.querySelector('.todo-container .alltask')

let currenttask = [
    {
        task : 'Mandir jao ',
        details: 'hanuman ji wale ',
        imp : true
    },
    {
        task : 'Ghar jao  ',
        details: 'abhi ke abhi niklo ',
        imp : true
    }
]


function rendertask(){
    let sum = ''
    currenttask.forEach(function(elem){
    sum = sum + `<div class="task">
                        <h5>${elem.task}  <span class="${elem.imp}"><i class="ri-sparkling-fill"></i> imp</span></h5>
                        <button>Mark as Completed</button>
                    </div>`
})
alltask.innerHTML = sum;
};
rendertask();

form.addEventListener('submit',function(e){
    e.preventDefault()
     if(input.value.trim() === '') {
        input.style.border = '2px solid red'
        input.placeholder = 'Please enter a task!'
        return  // stops the function here, won't submit
    }
    // This removes the red border as soon as the user starts typing
    input.addEventListener('input', function() {
    if(input.value.trim() !== '') {
        input.style.border = '2px solid white'
        input.placeholder = 'Enter Task'
    }
})
    // console.log(input.value)
    // console.log(details.value);
    // console.log(check.checked);
    currenttask.push({task:input.value,details:detail.value,imp:check.checked })
    input.value = ''
    detail.value = ''
    check.checked = false
    rendertask();

})