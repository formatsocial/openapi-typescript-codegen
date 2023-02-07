export const generateCoreLocationSameLevelFromOutput = (coreLocation: string, output: string): string => {
    return coreLocationCalc(coreLocation, output, "")

};

export const generateCoreLocationUpLevelFromOutput = (coreLocation: string, output: string): string => {
    return coreLocationCalc(coreLocation, output, "../")
};

const coreLocationCalc = (coreLocation: string, output: string, startingLoc:string): string => {
    if (output.startsWith('./')) {
        output = output.slice(2);
    }
    if (output.endsWith('/')) {
        output = output.slice(0, output.length - 1);
    }

    if (coreLocation.startsWith('./')) {
        coreLocation = coreLocation.slice(2);
    }
    if (coreLocation.endsWith('/')) {
        coreLocation = coreLocation.slice(0, coreLocation.length - 1);
    }

    let outputSplit = output.split("/")
    let coreLocationSplit = coreLocation.split("/")

    let sameCount = 0
    for (const index in outputSplit) {
        if ((outputSplit[index]) == coreLocationSplit[index]) {
            sameCount++
        }
    }
    let location = startingLoc;
    for (let i = 0+sameCount; i < outputSplit.length; ++i) {
        location += '../';
    }

    for (let i = 0+sameCount; i < coreLocationSplit.length; ++i) {
        if (!location.endsWith('/')) {
            location += '/';
        }
        location += coreLocationSplit[i];
    }
    return location;
}