window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
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
        sessionStorage.setItem('openpage', elem.id)   //saves the opened page id 
    })
})
// let fullelempagebackbtn = document.querySelectorAll('.fullelem .back')
fullelempagebackbtn.forEach(function (back) {
    back.addEventListener('click', function () {
        //    fullelempage[back.id].style.display = 'none';
        fullelempage[back.id].style.transform = 'scale(0)';
        // fullelempage[back.id].style.display = 'none';
        sessionStorage.removeItem('openpage')       //  removes the openpage entirly

    })
})
//On reload — check if a page was open and reopen it
let openpage = sessionStorage.getItem('openpage')
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


let calendarEl = document.querySelector('.calendar')
let modal = document.getElementById('calendarModal')
let modalInput = document.getElementById('modalInput')
let modalConfirm = document.getElementById('modalConfirm')
let modalCancel = document.getElementById('modalCancel')
let pendingInfo = null
let deleteModal = document.getElementById('deleteModal')
let deleteCancel = document.getElementById('deleteCancel')
let deleteConfirm = document.getElementById('deleteConfirm')
let deleteTaskName = document.getElementById('deleteTaskName')
let pendingDelete = null

let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: window.innerWidth < 768 ? 'timeGridDay' : 'timeGridDay',
    allDaySlot: false,
    slotMinTime: '06:00:00',
    slotMaxTime: '23:00:00',
    slotDuration: '00:30:00',
    selectable: true,
    editable: true,
    //for  phone touch
    longPressDelay: 150,          
    selectLongPressDelay: 150,    
    eventLongPressDelay: 150, 
    // task over lap issue 
    slotEventOverlap: false,
    eventMaxStack: 2,
    expandRows: true,



    select: function (info) {
        pendingInfo = info
        modal.style.display = 'flex'
        modalInput.focus()
    },

    events: JSON.parse(localStorage.getItem('calendarEvents') || '[]'),

    eventAdd: function (info) {
        let events = JSON.parse(localStorage.getItem('calendarEvents') || '[]')
        events.push(info.event.toPlainObject())
        localStorage.setItem('calendarEvents', JSON.stringify(events))
    },

    eventClick: function (info) {
        pendingDelete = info.event
        deleteTaskName.textContent = `"${info.event.title}"`
        deleteModal.style.display = 'flex'
    },
})

calendar.render()


modalConfirm.addEventListener('click', function () {
    if (modalInput.value.trim() !== '' && pendingInfo) {
        calendar.addEvent({
            title: modalInput.value,
            start: pendingInfo.start,
            end: pendingInfo.end,
            color: '#00ADB5'
        })
    }
    modalInput.value = ''
    modal.style.display = 'none'
    pendingInfo = null
})

modalCancel.addEventListener('click', function () {
    modalInput.value = ''
    modal.style.display = 'none'
    pendingInfo = null
})

modalInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') modalConfirm.click()
})

deleteConfirm.addEventListener('click', function () {
    if (pendingDelete) {
        pendingDelete.remove()
        let events = JSON.parse(localStorage.getItem('calendarEvents') || '[]')
        events = events.filter(e => e.title !== pendingDelete.title)
        localStorage.setItem('calendarEvents', JSON.stringify(events))
        pendingDelete = null
    }
    deleteModal.style.display = 'none'
})

deleteCancel.addEventListener('click', function () {
    pendingDelete = null
    deleteModal.style.display = 'none'
})

