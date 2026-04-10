window.addEventListener('pageshow', function(e) {
    if(e.persisted) {
        window.location.reload()
    }
})
let allElems = document.querySelectorAll('.elem')
let fullelempage = document.querySelectorAll('.fullelem')
let fullelempagebackbtn = document.querySelectorAll('.fullelem .back')

allElems.forEach(function (elem) {
    elem.addEventListener('click', function () {
        // console.log(elem.id) 
        let fullelem = (document.querySelectorAll('.fullelem')[elem.id])
        fullelem.style.display = 'block';
        fullelem.style.transform = 'scale(1)';
        localStorage.setItem('openpage', elem.id)   //saves the opened page id 
    })
})
// let fullelempagebackbtn = document.querySelectorAll('.fullelem .back')
fullelempagebackbtn.forEach(function (back) {
    back.addEventListener('click', function () {
        //    fullelempage[back.id].style.display = 'none';
        fullelempage[back.id].style.transform = 'scale(0)';
        // fullelempage[back.id].style.display = 'none';
        localStorage.removeItem('openpage')      //  removes the openpage entirly

    })
})
//On reload — check if a page was open and reopen it
let openpage = localStorage.getItem('openpage')
if (openpage !== null) {
    let fullelem = document.querySelectorAll('.fullelem')[openpage]
    fullelem.style.display = 'block';
    fullelem.style.transform = 'scale(1)';
}

let form = document.querySelector('.addtask form')
let input = document.querySelector('.addtask form #task')
let detail = document.querySelector('.addtask form #details')
let check = document.querySelector('.addtask form .imp #check ')
let alltask = document.querySelector('.todo-container .alltask')

function todolist() {
    let currenttask = [
        // {
        //     task : 'lec bunk ',
        //     details: 'specifically coa ',
        //     imp : true
        // },

    ]
    if (localStorage.getItem('currenttask')) {
        currenttask = JSON.parse(localStorage.getItem('currenttask'))
    } else {
        console.log('task list is empty')
    }


    // rendering function for new tasks 
    function rendertask() {
        let sum = ''
        currenttask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
                        <h5>${elem.task}  <span class="${elem.imp}"><i class="ri-sparkling-fill"></i> imp</span></h5>
                        <button id =${idx}>Mark as Completed</button>
                    </div>`
        })
        alltask.innerHTML = sum;

        localStorage.setItem('currenttask', JSON.stringify(currenttask));

        markcompleted = document.querySelectorAll('.task button');
        markcompleted.forEach(function (btn) {
            btn.addEventListener('click', function () {
                //  console.log(currenttask[btn.id])
                currenttask.splice(btn.id, 1);
                rendertask();
            })
        })

    };
    rendertask();

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        // detects if the input is empty and throws error 
        if (input.value.trim() === '') {
            input.style.border = '2px solid red'
            input.placeholder = 'Please enter a task!'
            return  // stops the function here, won't submit
        }
        // This removes the red border as soon as the user starts typing
        input.addEventListener('input', function () {
            if (input.value.trim() !== '') {
                input.style.border = '2px solid white'
                input.placeholder = 'Enter Task'
            }
        })
        // console.log(input.value)
        // console.log(details.value);
        // console.log(check.checked);

        currenttask.push({ task: input.value, details: detail.value, imp: check.checked })    //pushing the inputs in currenttask 
        // localStorage.setItem('currenttask', JSON.stringify(currenttask))
        input.value = ''
        detail.value = ''
        check.checked = false
        rendertask();

    })


};


// openfeture()

todolist(); 