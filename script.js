console.log("Skripts strādā!");

const klase_X = 'x'
const klase_O = 'circle'

/*
        0 1 2
        3 4 5
        6 7 8
*/

const uzvaras_nosacijumi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]






]

const visi_laucini = document.querySelectorAll('.cell')
const rezultatu_logs = document.querySelector('#resultBox')
const rezultatu_teksts = document.querySelector('#resultInfo')
const rezultatu_teksts1 = document.querySelector('#resultInfo1')
const atjaunot = document.querySelector('#restartButton')
const restart = document.querySelector('#restartGame')
const dzest = document.querySelector('#dzestrezultatu')
const attelot_speletaju = document.querySelector('#display')
const taimeris_teksts = document.querySelector("#timer")

let speletajs_O = false
let laiks = 5
let taimerisID = null

let o_rezultats = JSON.parse(localStorage.getItem("o_score") )|| 0
let x_rezultats = JSON.parse(localStorage.getItem("x_score")) || 0


visi_laucini.forEach(laucins =>{
    laucins.addEventListener('click', (kliskis) => {
        veikt_gajienu(kliskis)
        startTimer() 
    }, {once: true})
})


function saglabat_rezulatu(){
    localStorage.setItem("x_score", JSON.stringify(x_rezultats))
    localStorage.setItem("o_score", JSON.stringify(o_rezultats))
}


function veikt_gajienu(kliskis){
    const laucins = kliskis.target
    const aktivais_speletajs = speletajs_O ? klase_O : klase_X 


    const bg_page = document.querySelector("body")
    if(!speletajs_O){
        bg_page.classList.add("o-player")
        bg_page.classList.remove("x-player")
    }else{
        bg_page.classList.add("x-player")
        bg_page.classList.remove("o-player")
    }

    laucins.classList.add(aktivais_speletajs)


    if(parbaudit_uzvaru(aktivais_speletajs)){
        if(speletajs_O){
            o_rezultats++
        }else{
            x_rezultats++
        }   
        saglabat_rezulatu()
        setTimeout(() => {
            rezultatu_teksts.textContent = `Spēlētājs ${speletajs_O ? "O" : "X"} uzvarēja!`;
            rezultatu_teksts1.textContent = `X: ${x_rezultats} | O: ${o_rezultats}`
            rezultatu_logs.classList.add('show');
        }, 1000)
        clearInterval(taimerisID) 
    } else if(vai_ir_neizskirts()){
        rezultatu_teksts.textContent = "Neizšķirts!"
        rezultatu_teksts1.textContent = `X: ${x_rezultats} | O: ${o_rezultats}`
        rezultatu_logs.classList.add('show');
        clearInterval(taimerisID)
    } else {
      
        speletajs_O = !speletajs_O
        attelot_speletaju.textContent = speletajs_O ? "O" : "X"
        startTimer()
    }
}


function parbaudit_uzvaru(aktivais){
    for(let i = 0; i < uzvaras_nosacijumi.length; i++){
        const [a, b, c] = uzvaras_nosacijumi[i]
        if(visi_laucini[a].classList.contains(aktivais) && 
           visi_laucini[b].classList.contains(aktivais) &&
           visi_laucini[c].classList.contains(aktivais)) {

            visi_laucini[a].style.backgroundColor = "green"
            visi_laucini[b].style.backgroundColor = "green"
            visi_laucini[c].style.backgroundColor = "green"
            return true
        }
    }
    return false
}


function vai_ir_neizskirts(){
    return [...visi_laucini].every(laucins => 
        laucins.classList.contains(klase_X) || laucins.classList.contains(klase_O)
    )
}


atjaunot.addEventListener('click', () =>{
    location.reload()
})
restart.addEventListener('click', () =>{
    location.reload()
})


dzest.addEventListener('click', () =>{
    x_rezultats=0
    o_rezultats = 0
    saglabat_rezulatu()
    location.reload()
})


function startTimer() {
    laiks = 5
    clearInterval(taimerisID)
    taimeris_teksts.textContent = "Atlikušais laiks: " + laiks

    taimerisID = setInterval(() => {
        taimeris_teksts.textContent = "Atlikušais laiks: " + laiks
        laiks--

        if (laiks < 0) {
            clearInterval(taimerisID)
            taimeris_teksts.textContent = "Laiks beidzies!"

            
            speletajs_O = !speletajs_O
            attelot_speletaju.textContent = speletajs_O ? "O" : "X" 

           
if(speletajs_O){
            o_rezultats++
        }else{
            x_rezultats++
        }   
        saglabat_rezulatu()


             rezultatu_teksts.textContent = `Spēlētājs ${speletajs_O ? "O" : "X"} uzvarēja!`;
              rezultatu_teksts1.textContent = `X: ${x_rezultats} | O: ${o_rezultats}`
              rezultatu_logs.classList.add('show');
           
            startTimer() 
        }
    }, 1000)
}


startTimer()