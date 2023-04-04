const collegeJson = ['Engineering3.json']

const getTodos = async (resource) => {

    const response = await fetch(resource)
    
    if(response.status !== 200){
        throw new Error('cannot fetch data')    
    }

    const data = response.json()
    
    return data
}

const cardGrid = document.querySelector('.card-grid')
const filterOverlay = document.querySelector('.overlay')
const hideOverlay = document.querySelector('.hide-overlay')
const overlayButton = document.querySelector('.overlay-button')
const filterBtnContainer = document.querySelector('.filter-btn-container')

window.addEventListener("DOMContentLoaded", function() { 
    getTodos(collegeJson)
    .then(data => displayCollegeName(data))
    .then(data => displayFilterOverlay())
    .catch(err => console.log('rejected:', err.message))
    console.log('outside',data);
})


// function display college name and logo
function displayCollegeName(college) { 

    // removing duplicates by converting to set then to array by converting json to string
    // const result = [...new Set (college.map(a => JSON.stringify(a.Uiversity)))]
    // console.log(typeof(result))

    // to remove duplicates college names using reduce
    const collegeArray = college.reduce(
        (value, item) => {
            if (!value.includes(item.Uiversity)){
                value.push(item.Uiversity)
            }
            return value
        },[]
    )

    // displaying college cards
    let displayCollege = collegeArray.map(data => {

        return `<div class="card card-shadow">
                    <div class="card-header">IMG</div>
                    <div class="card-body">${data}</div>
                </div>`
    }) 

    displayCollege = displayCollege.join('')

    cardGrid.innerHTML = displayCollege
}

// overlay on and off 
function displayFilterOverlay() {
    overlayButton.addEventListener('click', () => {
        filterOverlay.classList.toggle('hide-overlay')
        console.log('button pressed: ', filterOverlay.classList)
    })
    
}

// if u click anywhere on the overlay it removes the overlay
if (filterOverlay.classList.contains('hide-overlay')){
    filterOverlay.addEventListener('click', () => {
        filterOverlay.classList.add('hide-overlay')
        console.log('hello:', filterOverlay.classList)

    })
}