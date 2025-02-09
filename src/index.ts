const getBCV = async () => {
    const response = await fetch("https://pydolarve.org/api/v1/dollar?monitor=bcv")
    const data = await response.json()
    return data.price
}

const getParalelo = async () => {
    const response = await fetch("https://pydolarve.org/api/v1/dollar?monitor=enparalelovzla")
    const data = await response.json()
    return data.price
}

const currencyDiv : HTMLElement | null = document.getElementById('currencyDiv');
const loading : HTMLElement | null = document.querySelector('#loading')
const form : HTMLElement | null = document.querySelector('form')
const resultDiv : HTMLElement | null = document.querySelector('#resultDiv')

let bcv:number, paralelo:number, promedio:number
let currencies : number[]

window.addEventListener("load", async () => {
    if(!currencyDiv) return
    bcv = await getBCV()
    paralelo = await getParalelo()
    promedio = (bcv + paralelo) / 2
    currencies = [bcv, paralelo, promedio]

    for (let i = 0; i < currencyDiv?.children.length ; i++) {
        const element = currencyDiv?.children[i];
        if(element)
        {

            element.children[1].textContent = String(currencies[i])
        }
    }

    currencyDiv.classList.toggle('hidden')

    loading?.classList.toggle('hidden')
    form?.classList.toggle('hidden')
})

form?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const amount = (document.querySelector('#amount') as HTMLInputElement).value
    const currency = (document.querySelector('#currency') as HTMLSelectElement).value

    if(amount === '' || currency === '' || Number(amount)<=0) return

    if(!resultDiv) return

    for (let i = 0; i < resultDiv?.children.length ; i++) {
        const element = resultDiv?.children[i];
        if(element)
        {
            if(currency=='1'){

                element.children[1].textContent = String((Number(amount) * currencies[i]).toFixed(2))+ ' Bs'
            }
            else{

                element.children[1].textContent = String((Number(amount) / currencies[i]).toFixed(2))+ ' $'
            }
        }
    }

    resultDiv.classList.remove('hidden')
})


