require('dotenv').config()

const apikey=process.env.API_OPENAI

const chatgptGet = async (req, res) => {
    const {dest}=req.query
    prompt=getPrompt(dest)
    try {
        const response= await callToOpenAI(prompt,apikey)
        res.json(response)
    } catch (error) {
        console.log('error en la conexion a OpenAI',error)
        res.status(500).json({
            error:'error en la conexion a OpenAI'
        })
    }
    
}

async function callToOpenAI(mensaje,apikey) {
    const bodyRequest = {
        model: 'gpt-3.5-turbo',
        max_tokens: 500,
        messages: [{
            role: 'user', content: mensaje
        }]
    }

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apikey}`
        },
        body: JSON.stringify(bodyRequest)

    }

    const resultFininsh = await fetch('https://api.openai.com/v1/chat/completions', config)
    const json = await resultFininsh.json()
    //return resultFininsh
    return json
    //return json.choices[0].message.content
}

function getPrompt(destino) {
    return mensaje = `Eres un guia turístico, necesito que me armes un itinerario para un viaje de 5 días a ${destino},
     por cada dia dame 4 actividades que podría hacer y de paso solo dame el itinerario sin el saludo formal, de tal forma que el resultado que me des este así: 
    dia 1: 
    actividades
    día 2: 
    actividades..... y así sucesivamente`
}

module.exports={chatgptGet}