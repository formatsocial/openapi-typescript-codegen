import { Model } from '../../../client/interfaces/Model';
import { Service } from '../../../client/interfaces/Service';

export const pruneModels = (models: Model[], services: Service[]) => {
    let removedModels = 1;
    while (removedModels > 0) {
        removedModels = 0;
        const removeModNames: string[] = [];
        for (const mod of models) {
            let useful = false;
            for (const serv of services) {
                if (serv.imports.includes(mod.name)) {
                    useful = true;
                    break;
                }
            }
            for (const mod2 of models) {
                if (mod2.name === mod.name) {
                    continue;
                }
                if (mod2.imports.includes(mod.name)) {
                    useful = true;
                    break;
                }
            }
            if (!useful) {
                removeModNames.push(mod.name);
            }
        }

        models = models.filter(mod => {
            if (removeModNames.includes(mod.name)) {
                removedModels += 1;
                return false;
            }
            return true;
        });
    }
    return models;
};
