import { generateCoreLocationUpLevelFromOutput,generateCoreLocationSameLevelFromOutput } from './generateCoreLocation';

describe('generateCoreLocation', () => {
    it('Happy path', () => {
        const loc = generateCoreLocationUpLevelFromOutput('coreDir1/coreDir2/core', 'output/dir1/dir2');

        expect(loc).toEqual('../../../../coreDir1/coreDir2/core');
    });

    it('output starts with ./', () => {
        const loc = generateCoreLocationUpLevelFromOutput('coreDir1/coreDir2/core', './output/dir1/dir2');

        expect(loc).toEqual('../../../../coreDir1/coreDir2/core');
    });

    it('output ends with /', () => {
        const loc = generateCoreLocationUpLevelFromOutput('coreDir1/coreDir2/core', './output/dir1/dir2/');

        expect(loc).toEqual('../../../../coreDir1/coreDir2/core');
    });

    it('coreLoc starts with ./', () => {
        const loc = generateCoreLocationUpLevelFromOutput('./coreDir1/coreDir2/core', './output/dir1/dir2/');

        expect(loc).toEqual('../../../../coreDir1/coreDir2/core');
    });

    it('coreLoc ends with /', () => {
        const loc = generateCoreLocationUpLevelFromOutput('./coreDir1/coreDir2/core/', './output/dir1/dir2/');

        expect(loc).toEqual('../../../../coreDir1/coreDir2/core');
    });


    it('Happy path input and output share a location', () => {
        const loc = generateCoreLocationUpLevelFromOutput('./output/dir1/core', './output/dir1/dir2');

        expect(loc).toEqual('../../core');
    });

    it('Happy path input and output share a location different lengths', () => {
        const loc = generateCoreLocationUpLevelFromOutput('./output/dir1/core', './output/dir1/dir2/dir3');

        expect(loc).toEqual('../../../core');
    });
});


describe('generateCoreLocation', () => {
    it('Happy path', () => {
        const loc = generateCoreLocationSameLevelFromOutput('coreDir1/coreDir2/core', 'output/dir1/dir2');

        expect(loc).toEqual('../../../coreDir1/coreDir2/core');
    });

    it('output starts with ./', () => {
        const loc = generateCoreLocationSameLevelFromOutput('coreDir1/coreDir2/core', './output/dir1/dir2');

        expect(loc).toEqual('../../../coreDir1/coreDir2/core');
    });

    it('output ends with /', () => {
        const loc = generateCoreLocationSameLevelFromOutput('coreDir1/coreDir2/core', './output/dir1/dir2/');

        expect(loc).toEqual('../../../coreDir1/coreDir2/core');
    });

    it('coreLoc starts with ./', () => {
        const loc = generateCoreLocationSameLevelFromOutput('./coreDir1/coreDir2/core', './output/dir1/dir2/');

        expect(loc).toEqual('../../../coreDir1/coreDir2/core');
    });

    it('coreLoc ends with /', () => {
        const loc = generateCoreLocationSameLevelFromOutput('./coreDir1/coreDir2/core/', './output/dir1/dir2/');

        expect(loc).toEqual('../../../coreDir1/coreDir2/core');
    });


    it('Happy path input and output share a location', () => {
        const loc = generateCoreLocationSameLevelFromOutput('./output/dir1/core', './output/dir1/dir2');

        expect(loc).toEqual('../core');
    });

    it('Happy path input and output share a location different lengths', () => {
        const loc = generateCoreLocationSameLevelFromOutput('./output/dir1/core', './output/dir1/dir2/dir3');

        expect(loc).toEqual('../../core');
    });

    it('Happy path input and output share a location different lengths', () => {
        const loc = generateCoreLocationSameLevelFromOutput('./output/dir1/core/', 'output/dir1/dir2/dir3');

        expect(loc).toEqual('../../core');
    });
});