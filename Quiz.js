console.log("Hello Quiz")
let quizarea=document.querySelector(".quiz-area")
let answerarea=document.querySelector(".answer-area")
let countSpan=document.querySelector(".quiz-info .count span")
let results=document.querySelector(".results span")
let submitClk=document.querySelector(".submit-button")
let seconds=document.getElementById("seconds")
let countQUE=0
let countQues=2
let Rightanswer=0
let countdown;
// let questionsObject; // Declare questionsObject variable
// let questionsCount; // Declare questionsCount variable
function getquestion(){
    let myQuizrequest=new XMLHttpRequest()
    myQuizrequest.open("GET","questions.json")
    myQuizrequest.send()
    myQuizrequest.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            console.log(this.responseText)
            questionsObject=JSON.parse(this.responseText)
            questionsCount=questionsObject.length
            //  createbullets()
  
            // Call addQuestdata after questionsObject is fetched and parsed
            addQuestdata()
            // submit click
            countDown(10,questionsCount)
           
            createbullets()
            submitClk.onclick=function(){
                
                countOFquestions()
                clearInterval(countdown)
                countDown(10,questionsCount)
             let   Rightanswer=questionsObject[countQUE].right_answer
             console.log(Rightanswer)
             
              countQUE++
            checke(Rightanswer)
             quizarea.innerHTML = '';
              answerarea.innerHTML = '';
                createbullets()
             addQuestdata();
             //count down
            
             removeALL()
             console.log(` ${countQUE} of ${questionsCount}`)
            }
           
            
        }
        
        
    }
}
getquestion()
// create bullets functions
function countOFquestions(){
    if(countQUE<questionsCount-1){
        countSpan.innerHTML=countQues++

    }
  
}
function createbullets(){
     if(countQUE<questionsCount-1){
 let spans=document.getElementById("spans")
 let span=document.createElement("span") 
    for(i=0;i<questionsCount;i++){ 
     if(i===0){
        span.className="on"
     }else{
        span.className="on"
     }
    }
    spans.appendChild(span)
     }
}
function addQuestdata(){
      if(countQUE<questionsCount){
        let createQues=document.createElement("h2")
        createQues.textContent=questionsObject[countQUE].title
        quizarea.appendChild(createQues)
    for(i=1;i<=4;i++){
        let answer=document.createElement("div")
        answer.classList.add("answer")
        let inpRadio=document.createElement("input")
        inpRadio.setAttribute("type","radio")
        inpRadio.setAttribute("name","Questions")
        inpRadio.dataset.answer=questionsObject[countQUE][`answer_${i}`]
        let label=document.createElement("label")
        inpRadio.id=(`answer_${i}`)
        label.textContent = questionsObject[countQUE][`answer_${i}`]
        label.setAttribute("for",`answer_${i}`)
        answer.appendChild(inpRadio)
        answer.appendChild(label)
        answerarea.appendChild(answer)
    }
}
}

// let thechoosenAnswer;
  function checke(Ranswer){
    let answers=document.getElementsByName("Questions")
    let thechoosenAnswer;
for(q=0;q<answers.length;q++){
   if(answers[q].checked){
       thechoosenAnswer=answers[q].dataset.answer
   }
}
console.log(thechoosenAnswer)
// console.log(Ranswer)
if(thechoosenAnswer===Ranswer){
    Rightanswer++
    console.log(Rightanswer)
}
}

function removeALL(){
    if(questionsCount===countQUE){
        quizarea.remove()
        answerarea.remove()
        submitClk.remove()
        spans.remove()
        // countdown.remove()
        seconds.remove()
        
        console.log(Rightanswer.length)
        if(Rightanswer>=8){
            results.innerHTML=`Your are perfect,Your right answers is: ${Rightanswer} from ${questionsCount} `
            results.classList.add("perfect")
        }
         if(Rightanswer<=4){
            results.innerHTML=`Your are bad,Your right answers is: ${Rightanswer}  from ${questionsCount} `
            results.classList.add("bad")
        }
        else if(Rightanswer>=5 && Rightanswer<=7){
            results.innerHTML=`Your are good,Your right answers is: ${Rightanswer} from ${questionsCount}  `
            results.classList.add("good")
        }
       
    }
    
}
///// create count down
function countDown(durarion,qCount){
    if(countQUE<questionsCount){
         
        // console.log(munits)
        // console.log(restofScnd)
        countdown=setInterval(function(){
            let munits=parseInt(durarion /60)
        let restofScnd=parseInt(durarion %60)
         durarion--
         if(munits==0 && restofScnd===0){
            clearInterval(countdown)
            submitClk.click()

         }
         if(munits<10){
            munits='0'+munits
         }
         if(restofScnd<10){
            restofScnd='0'+restofScnd
         }
            seconds.innerHTML=`${munits}:${restofScnd}`
        },1000)
        if(countQUE+2===questionsCount){
            console.log(`${countQUE},form ${questionsCount}`)
            clearInterval(countdown)
        }
       
    }
}

