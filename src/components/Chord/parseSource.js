const fs = require('fs');

// Define regular expressions
const regex = /{define: ([^\ ]*) frets ([\dx]) ([\dx]) ([\dx]) ([\dx]) ([\dx]) ([\dx]) fingers ([\dx]) ([\dx]) ([\dx]) ([\dx]) ([\dx]) ([\dx])}/g

let chords = [];

let i = 0;
// Read xml file
let data = fs.readFileSync('source.xml').toString();

// Get <svg/> tag
data.replace(regex, (match, name, frets1, frets2, frets3, frets4, frets5, frets6, finger1, finger2, finger3, finger4, finger5, finger6) => {
    let frets = [frets1, frets2, frets3, frets4, frets5, frets6],
        fingers = [finger1, finger2, finger3, finger4, finger5, finger6],
        i = 0;

    // Find croesses
    let crosses = frets.filter((fret) => {
        return fret === 'x';
    }).map((fret, index) => {
        return {
            x: index,
            y: 0
        }
    });

    // Find points
    let points = [];

    for (i = 0; i < 6; i++) {
        // Skip this
        if (frets[i] === 'x' || frets[i] === '0') continue;

        points.push({
            x: i,
            y: parseInt(frets[i]) - 0.5,
            text: fingers[i]
        });
    }

    // Find lines
    let lines = [],
        pointsLen = points.length,
        counts = [{
            text: '0',
            num: 0,
            start: -1,
            end: -1
        }, {
            text: '1',
            num: 0,
            start: -1,
            end: -1
        }, {
            text: '2',
            num: 0,
            start: -1,
            end: -1
        }, {
            text: '3',
            num: 0,
            start: -1,
            end: -1
        }, {
            text: '4',
            num: 0,
            start: -1,
            end: -1
        }, {
            text: '5',
            num: 0,
            start: -1,
            end: -1
        }, ];

    // Count fingers number
    for (i = 0; i < 6; i++) {
        counts[parseInt(fingers[i])].num++;
        if (counts[parseInt(fingers[i])].start < 0) {
            counts[parseInt(fingers[i])].start = i;
        } else {
            counts[parseInt(fingers[i])].end = i;
        }
    }

    // Generate lines
    for (i = 1; i < 6; i++) {
        if (counts[i].num !== 0 && counts[i].start >= 0 && counts[i].end >= 0) {
            lines.push({
                text: i,
                start: {
                    x: counts[i].start,
                    y: parseInt(frets[counts[i].start]) - 0.5
                },
                end: {
                    x: counts[i].end,
                    y: parseInt(frets[counts[i].end]) - 0.5
                },
            });

            // Remove repeat points
            points = points.filter((point) => {
                return parseInt(point.text) !== i;
            });
        }
    }

    // Find the max and min of frets
    let max = 0,
        min = 999;

    for (i = 0; i < 6; i++) {
        if (!isNaN(frets[i]) && parseInt(frets[i]) > max) {
            max = parseInt(frets[i]);
        }
        if (!isNaN(frets[i]) && parseInt(frets[i]) !== 0 && parseInt(frets[i]) < min) {
            min = parseInt(frets[i]);
        }
    }

    // Recalculate the y position
    let minPos = {
            text: '',
            x: -1,
            y: -1
        },
        maxPos = {
            text: '',
            x: -1,
            y: -1
        };

    if (max > 4) {
        points = points.map((point) => {
            point.y = point.y - (max - 4);
            return point;
        });

        lines = lines.map((line) => {
            line.start.y = line.start.y - (max - 4);
            line.end.y = line.end.y - (max - 4);
            return line;
        })

        minPos.text = min;
        minPos.x = -0.5;
        minPos.y = min - (max - 4) - 0.5;

        maxPos.text = max;
        maxPos.x = -0.5;
        maxPos.y = max - (max - 4) - 0.5;
    }

    chords.push({
        "name": name,
        "crosses": crosses,
        "points": points,
        "lines": lines,
        "min": minPos,
        "max": maxPos,
    })
})

fs.writeFile('result.txt', JSON.stringify(chords), function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
    console.log("--------我是分割线-------------")
    console.log("读取写入的数据！");
});