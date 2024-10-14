import { throws } from 'node:assert';
import { readdir } from 'node:fs/promises'

export const getDir = async (pathDir) => new Promise(async (res, rej) => {
    try {
        const fList = { directory: [], file: [] };
        const resTable = [];
        const files = await readdir(pathDir, { withFileTypes: true });

        files.forEach(e => {
            let newName = e.name;

            if (e.name.length > 30)
                newName = `${e.name.substring(0, 30)}...${e.name.substring(e.name.length - 10, e.name.length)}}`;
            fList[e.isFile() ? 'file' : 'directory'].push(newName);
        });


        for (let item of Object.entries(fList)) {
            item[1]
                .sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1)
                .forEach(val => resTable.push({ name: val, type: item[0] }))
        }

        console.table(resTable);
        res({ err: null });
    } catch (error) {
        res({ err: `Operation failed. \nPublic${error.message}` })
    }
});


