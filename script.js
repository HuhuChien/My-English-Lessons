const myForm = document.querySelector('.myForm');
const fruit = 'apple'
const myDate = document.querySelector('.myDate');
const renderLi = document.querySelector('.dateForLessons > article > ul');
const resultContainer = document.querySelector('.result-container');
const showContainer = document.querySelector('.show-container');
var liCollection = document.getElementsByTagName("li")
const ordering = document.querySelector('.ordering');
const latest = document.querySelector('.latest');
const oldest = document.querySelector('.oldest');
const numberForALesson = document.querySelector('.numberForALesson');
const myDays = document.getElementsByClassName("myDay");
const myNumbers = document.getElementsByClassName('myNumber');

let collectionDateDes;
let collectionDateAes;
let originalDate;
let firstObj;
let listContentFromLS = JSON.parse(localStorage.getItem('listContent')) || [];

initToUI()
myForm.addEventListener('submit', addDate);

function addDate(e){
    e.preventDefault();
   console.log(myDate.value)
    if(listContentFromLS.some(item => item.theDate === myDate.value)){
        repeatDateAlert();
        } else if(myDate.value && numberForALesson.value) {
            console.log(myDate);
            const li = document.createElement('li');
            li.innerHTML = `<div class="myDay">${myDate.value}</div>
            <div class="myNumber">${numberForALesson.value} Lesson(s)</div>
            <button class="delete btn" id="delete"><i class="fas fa-trash-alt fa-lg"></i></button>`;
            renderLi.appendChild(li);
            listContentFromLS.push({theDate:li.firstElementChild.innerText, theNumber: li.firstElementChild.nextElementSibling.innerText})
            localStorage.setItem('listContent', JSON.stringify(listContentFromLS));
            myDate.value = '';
            numberForALesson.value = '';
            sortDate();
            deleteItem();
            resultInformation();
            
        }

}


function repeatDateAlert(){
    const alert = document.querySelector('.alert');
    alert.innerHTML = `${myDate.value} is already on the list `;
    alert.style.color = '#f44336';
    setTimeout(() => {
        alert.innerHTML = ``;
    },3000)
}

function sortDate(){
    collectionDateDes = [];
    collectionDateAes = [];
    originalDate = [];
    firstObj = {};
    console.log(myNumbers);
    console.log(myDays);
    for(let i = 0; i< myDays.length; i++){
       
        collectionDateDes.push({"theDate":myDays[i].innerText, "theNumber":myNumbers[i].innerText});
        console.log(collectionDateDes);
        collectionDateDes.sort((a,b) => new Date(b.theDate) - new Date(a.theDate));
       
        
}
    
    
    
    for(let i = 0; i< myDays.length; i++){
        collectionDateAes.push({"theDate":myDays[i].innerText, "theNumber":myNumbers[i].innerText});
        console.log(collectionDateAes);
        collectionDateAes.sort((a,b) => new Date(a.theDate) - new Date(b.theDate));
    
}


    for(let i = 0; i< myDays.length; i++){
        originalDate.push({"theDate":myDays[i].innerText, "theNumber":myNumbers[i].innerText});
        console.log(originalDate);


}

    console.log(collectionDateDes);
    console.log(collectionDateAes);
    console.log(originalDate);




    ordering .addEventListener('click', (e) => {
    if(e.target.value === "latest"){
        let a = 0
        renderLi.innerHTML = '';
        while(a <collectionDateDes.length){
                    
            const li = document.createElement('li');
            li.innerHTML = `<div class="myDay">${collectionDateDes[a].theDate}</div><div class="myNumber">${collectionDateDes[a].theNumber}</div><button class="delete btn" id="delete"><i class="fas fa-trash-alt fa-lg"></i></button>`;
            renderLi.appendChild(li);
            a++;
            console.log(collectionDateDes);
            
        }


        deleteItem(); 
    } 


    if(e.target.value === "oldest"){
        let a = 0
        renderLi.innerHTML = '';
        while(a < collectionDateAes.length){
                    
            const li = document.createElement('li');
            li.innerHTML = `<div class="myDay">${collectionDateAes[a].theDate}</div><div class="myNumber">${collectionDateAes[a].theNumber}</div><button class="delete btn" id="delete"><i class="fas fa-trash-alt fa-lg"></i></button>`;
            renderLi.appendChild(li);
            a++;
            console.log(collectionDateAes);
        
        }

        deleteItem(); 
    } 
     


    if(e.target.value === "default"){
        let a = 0
        renderLi.innerHTML = '';
        while(a < originalDate.length){       
            const li = document.createElement('li');
            li.innerHTML = `<div class="myDay">${originalDate[a].theDate}</div><div class="myNumber">${originalDate[a].theNumber}</div><button class="delete btn" id="delete"><i class="fas fa-trash-alt fa-lg"></i></button>`;
           
            renderLi.appendChild(li);
            a++;
            console.log(originalDate);
        
        }
      
        deleteItem(); 
    } 

});

}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}




function deleteItem(){
    console.log(collectionDateDes);
    console.log(collectionDateAes);
    console.log(originalDate);
    const deleteBtn = document.querySelectorAll('.fas');
    
    for(i = 0; i < deleteBtn.length; i++){
        
       
        deleteBtn[i].addEventListener('click', function(e){
            const grandMa = this.parentNode.parentNode;
            console.log(grandMa);
            const date = e.target.parentElement.parentElement.outerText.slice(0,10);
            console.log(date);
            const index = findWithAttr(collectionDateDes,'theDate',date);
            console.log(index);
            if(index > -1){
            collectionDateDes.splice(index, 1);
       
           
            }


            const index2 = findWithAttr(collectionDateAes,'theDate',date);
            console.log(index2);
            if(index2 > -1){
                collectionDateAes.splice(index2, 1);
      
      
            }

            const index3 = findWithAttr(originalDate,'theDate',date);
            console.log(index3);
            if(index3 > -1){
                originalDate.splice(index3, 1);
            }

            console.log(grandMa);
            const theDate = grandMa.firstElementChild.innerText;
            console.log(theDate)

            listContentFromLS = listContentFromLS.filter((item) => {
                return item.theDate !== theDate
            });
            localStorage.setItem('listContent', JSON.stringify(listContentFromLS));
         
        

            grandMa.remove();
            sortDate();
            resultInformation()
            console.log(collectionDateDes);
            console.log(collectionDateAes);
            console.log(originalDate);
            
           
        })
        
    }

  
}

function resultInformation(){
    resultContainer.classList.add('show');
    let sum = originalDate.map(item => item.theNumber)
                           .reduce(function(a,b){
                           return parseInt(a) + parseInt(b);
    },0);
    console.log(sum);
    let number = document.querySelector('.number');
    number.innerText = sum;
    const peso = document.querySelector('.peso');
    peso.innerHTML = `${number.innerText}`* 80;
    calculate(peso)
}



function calculate(peso){
    const NT = document.querySelector('.nt');
    fetch(`https://api.exchangerate-api.com/v4/latest/PHP`)
    .then( res => res.json())
    .then(data => {
        //console.log(data);
        const rate = data.rates["TWD"];
        //console.log(rate);
    NT.innerHTML = (peso.innerHTML * rate).toFixed(2);
});
    console.log(peso.innerHTML);
    if(peso.innerHTML === '0'){
        resultContainer.classList.remove('show');
    }


}



function initToUI(){
    console.log('new page')
    console.log(listContentFromLS);
    
    for(let index in listContentFromLS){
        console.log(index);
        let li = document.createElement('li');
         li.innerHTML = `<div class="myDay">${listContentFromLS[index].theDate}</div><div class="myNumber">${listContentFromLS[index].theNumber}</div><button class="delete btn" id="delete"><i class="fas fa-trash-alt fa-lg"></i></button>`;
         renderLi.appendChild(li);
    }
    sortDate();
    deleteItem();
    resultInformation();
}





/*
function resultInformation(){
    resultContainer.classList.add('show');
    const theLiNumber = document.getElementsByTagName("li").length;
    let number = document.querySelector('.number');
  
   number.innerText = theLiNumber;
   const peso = document.querySelector('.peso');
 
   //peso.innerHTML = parseInt(`${number.innerText}`) * 80;
   peso.innerHTML = `${number.innerText}`* 80;
   calculate(peso)

}



function calculate(peso){
    const NT = document.querySelector('.nt');
    fetch(`https://api.exchangerate-api.com/v4/latest/PHP`)
    .then( res => res.json())
    .then(data => {
        //console.log(data);
        const rate = data.rates["TWD"];
        //console.log(rate);
    NT.innerHTML = (peso.innerHTML * rate).toFixed(2);
});
    console.log(peso.innerHTML);
    if(peso.innerHTML === '0'){
        resultContainer.classList.remove('show');
    }


}
*/