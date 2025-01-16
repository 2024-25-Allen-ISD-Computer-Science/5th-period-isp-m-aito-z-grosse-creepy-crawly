// set up

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// dynamic json pull
async function pullStuff(){
    try {
        const response = await fetch('data.json');
        if(!response.ok) throw new Error(`${response.status}`);
        const data = await response.json();
        return data
    } catch (err) {
        console.error("Ah! Error.", err.message);
        throw err;
    }
}


async function processStuff(json) {
    try {
        for (const value of json) { // over each object
            distance(value);
        }
    } catch (err) {
        ctx.fillText (err, 30, 40);
    }
}


function distance(fufilled) {
    // ctx.beginPath();
    // ctx.moveTo(fufilled['x-axis'], fufilled['y-axis']);
    // ctx.lineTo(fufilled['x-axis'] + (fufilled['length'] * Math.cos(DegToRad(fufilled['angle']))),
    //  fufilled['y-axis'] + (fufilled['length'] * Math.sin(DegToRad(fufilled['angle']))));
    // ctx.stroke();
    ctx.fillStyle = "#ed0722";
    ctx.fillRect(fufilled['x-axis'], fufilled['y-axis'], 5, 5); // beginning point of distance
    ctx.fillStyle = "#000000";
    ctx.fillRect(fufilled['x-axis'] + (fufilled['length'] * Math.cos(fufilled['angle'])), // end point
     fufilled['y-axis'] + (fufilled['length'] * Math.sin(fufilled['angle'])),5, 5);
}




async function action() {
    try {
        const data = await pullStuff();
        await processStuff(data);
    } catch (err) {
        console.error("Error:", err.message);
    }
}

action();
