'use strict';
const fs = require('fs')

fs.readFile('yoga_classes.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
        return;
    }
    
    const separator = '---new_row---';
    let classes = data.split(separator);
    classes.shift();
    classes.pop();
    classes = classes.map(aClass => {
        return parseClass(aClass);
    });
    console.log(classes);
});

function parseClass(aClass) {
    const info = aClass.split('\n');
    info.shift();
    const time = info[0].split(' - ');
    
    const classObj = {
        start: time[0],
        end: time[1],
        type: info[2],
        instructor: info[3]
    };

    return classObj;
}

function sortByTime(aClass) {
}

