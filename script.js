currentSvg = "";

title = "";
xAxisLabelString = "";
yAxisLabelString = "";
let ticks = 0;

bars = [
    {
        label: "bar 1",
        height: 0
    },
    {
        label: "bar 2",
        height: 0
    },
]

titleSvg = `<text x="400" y="50" fill="black" id="title ${title}"><a>${title}</a></text>`;

xAxisLabel = `<text x="250" y="800" fill="black" id="xAxis Label ${xAxisLabelString}"><a>${xAxisLabelString}</a></text>`;
xAxisLine = `<line x1="100" y1="700" x2="600" y2="700" style="stroke-width: 2; stroke:black" title="x-axis, label is ${xAxisLabelString}"/>`;
xAxisTicks = function () {
    let i = 0;
    let interval = 500 / bars.length;
    let svg = "";
    for (i = 0; i < bars.length; i++) {
        svg += `<text x="${100 + (interval * (i + 1)) - 20}" y="750" fill="black"><a>${bars[i].label}</a></text>`;
    }
    return svg;
}

yAxisLabel = `<text x="25" y="75" fill="black" id="yAxis Label ${yAxisLabelString}"><a>${yAxisLabelString}</a></text>`;
yAxisLine = `<line x1="100" y1="100" x2="100" y2="700" style="stroke-width: 2; stroke:black" title="y-axis, label is ${yAxisLabelString}"/>`;
yAxisTicks = function () {
    let i = 1;
    let interval = 600 / ticks; //600 == length in pixles of y axis
    let svg = "";
    for (i = 1; i <= ticks; i++) {
        svg += `<line y1="${700 - (interval * i)}" x1="98" y2="${700 - (interval * i)}" x2="102" style="stroke-width: 1; stroke:black" title="y-axis tick, label is ${i}"/>`;
        svg += `<text y="${700 - (interval * i) + 4}" x="80" fill="black"><a>${i}</a></text>`;
    }
    return svg;
}

barsSvg = function () {
    let i = 0;
    let interval = 500 / bars.length;
    let svg = "";
    for (i = 0; i < bars.length; i++) {
        console.log(typeof (bars[i].height));
        let height = (600 / ticks) * bars[i].height;
        console.log(height);
        let y = 700 - height;
        svg += `<rect x="${100 + (interval * (i + 1)) - (interval * 2 / 3)}" y="${y}" height="${height}" width="${interval * 2 / 3}" fill="black" id="bar ${i} height ${bars[i].height}"/>`;
    }
    console.log(svg);
    return svg;
}


function generateSvg() {
    getData();
    updateTemplates();
    svgString = addSvg();
    //title = getTitle();
    document.getElementById("svgPanel").innerHTML = svgString;
    document.getElementById("downloadSvg").style.display = "inline";
}

function updateTemplates() {
    titleSvg = `<text x="400" y="50" fill="black" id="title ${title}"><a>${title}</a></text>`;

    xAxisLabel = `<text x="250" y="800" fill="black" id="xAxis Label ${xAxisLabelString}"><a>${xAxisLabelString}</a></text>`;
    xAxisLine = `<line x1="100" y1="700" x2="600" y2="700" style="stroke-width: 2; stroke:black" title="x-axis, label is ${xAxisLabelString}"/>`;

    yAxisLabel = `<text x="25" y="75" fill="black" id="yAxis Label ${yAxisLabelString}"><a>${yAxisLabelString}</a></text>`;
    yAxisLine = `<line x1="100" y1="100" x2="100" y2="700" style="stroke-width: 2; stroke:black" title="y-axis, label is ${yAxisLabelString}"/>`;
}

function getData() {
    ticks = 10;
    bars = [];
    let i = 1;
    for (i = 1; i <= 5; i++) {
        bars.push({
            label: document.getElementById("bar" + i + "Label").value,
            height: parseInt(document.getElementById("bar" + i + "Height").value)
        })
    }

    title = document.getElementById("title").value;
    yAxisLabelString = document.getElementById("yAxisLabel").value;
    xAxisLabelString = document.getElementById("xAxisLabel").value;
}

function addSvg() {
    currentSvg = "";
    xAxisTicksString = xAxisTicks();
    yAxisTicksString = yAxisTicks();
    barsSvgString = barsSvg();
    currentSvg = titleSvg + xAxisLabel + xAxisLine + xAxisTicksString + yAxisLabel + yAxisLine + yAxisTicksString + barsSvgString;
    return currentSvg;
}

function getTitle() {
    tempTitle = [];
    if (class1.included) {
        tempTitle.push(class1.name);
    }
    if (class2.included) {
        tempTitle.push(class2.name);
    }
    if (class3.included) {
        tempTitle.push(class3.name);
    }
    if (class4.included) {
        tempTitle.push(class4.name);
    }
    return tempTitle.join(', ');
}

function downloadSvg() {

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + '<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg" title="barGraph">' + currentSvg + '</svg>');
    element.setAttribute('download', 'uml.svg');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

async function getSvgData() {
    console.log("test");
    let file = document.getElementById("file").files[0];
    let text = await (new Response(file.slice(0, file.size))).text();
    console.log(text);
}