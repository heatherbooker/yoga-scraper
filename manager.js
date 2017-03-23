'use strict';
const fs = require('fs');

function getClassesByTime() {

    const data = fs.readFileSync('yoga_classes.txt', 'utf8');

    const classes = createClassObjects(data);
     
    const morns = [];
    const afternoons = [];
    const eves = [];
    classes.forEach(aClass => {
        const classInfo = `{ ${aClass.start}-${aClass.end} ${aClass.type} ${aClass.instructor} }  `;
        if (aClass.time === 'morn') {
            morns.push(classInfo);
        } else if (aClass.time === 'afternoon') {
            afternoons.push(classInfo);
        } else {
            eves.push(classInfo);
        }
    }); 

    return {
        Morning: morns.join(' '),
        Afternoon: afternoons.join(' '),
        Evening: eves.join(' ')
    };
}

function createClassObjects(data) {
    
    const separator = '---new_row---';
    let classes = data.split(separator);
    classes.shift();
    classes.pop();

    return classes
        .map(aClass => parseClass(aClass))
        .filter(aClass => helpMeSleepIn(aClass));

}

function parseClass(aClass) {
    const info = aClass.split('\n');
    info.shift();
    const times = info[0].split(' - ');
    const instructor = info[3].split('(')[0];

    const classObj = {
        start: times[0],
        end: times[1],
        time: getTime(times[0]),
        type: info[2],
        instructor
    };

    return classObj;
}

function helpMeSleepIn(aClass) {
    if (aClass.time === 'morn' && aClass.end[0] === '9') {
        return false;
    } else {
        return aClass;
    }
}

function getTime(startTime) {
    const isAM = startTime.substr(-2, 1) === 'a';
    if (isAM || startTime.substr(0, 2) === '12') {
        return 'morn';
    } else if (Number(startTime[0]) <= 4) {
        return 'afternoon';
    } else {
        return 'eve';
    }
}

module.exports = {
    getClassesByTime: getClassesByTime
};
