const slider=document.getElementById("slider")
const graph=document.getElementById("graph-area")
const value=document.getElementById("value")
const sortbutton=document.getElementById("sort")

value.innerText=slider.value
slider.oninput = ()=>{
    value.innerText=slider.value
    graph.innerHTML=""
    for(let i=0;i<slider.value;i++)
    {
        const box=document.createElement("span")
        box.setAttribute("class","block")
        box.style.paddingTop=`${Math.floor(100*Math.random()+1)}px`
        box.style.paddingLeft="0.1px"
        box.style.background = `rgb(0,${255 - (parseInt(box.style.paddingTop))*2},0)`
        graph.append(box)
    }
}

sortbutton.addEventListener("click",()=>{
    let blocks = document.querySelectorAll(".block")
    let heights = []
    for(let i=0;i<blocks.length;i++)
    {
       heights.push(blocks[i].style.paddingTop)
    }
    for(let i=0;i<heights.length;i++)
    {
        heights[i] = parseInt(heights[i].slice(0,-2))
    }
    
    bubbleSort(heights,blocks)
})

function applyheights(heights,blocks)
{
    for(let i=0;i<blocks.length;i++)
    {
        blocks[i].style.paddingTop=`${heights[i]}px`
    }
}

async function bubbleSort(heights,blocks)
{
    for(let i=0;i<blocks.length;i++)
    {
        for(let j=0;j<blocks.length-i-1;j++)
        {
            let color1 = blocks[j].style.background
            let color2 = blocks[j+1].style.background
            if(heights[j]>heights[j+1])
            { 
                blocks[j].style.background = "red"
                blocks[j+1].style.background = "red"

                let temp = heights[j]
                heights[j] = heights[j+1]
                heights[j+1] = temp

                let color = color1
                color1 = color2
                color2 = color
            }
            await sleep(1000*0.01)
            blocks[j].style.background = color1
            blocks[j+1].style.background = color2
            applyheights(heights,blocks)       
        }
    }
    console.log("sorting complete")
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
