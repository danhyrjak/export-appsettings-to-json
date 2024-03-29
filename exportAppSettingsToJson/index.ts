import tl = require('azure-pipelines-task-lib/task');
import fs = require('fs');

const writeFilePromise = (file: string, data: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, error => {
            if (error) reject(error);
            resolve(`file created successfully at: ${file}`);
        });
    });
};

async function run() {
    try {
        const jsonFilePath: string = tl.getInput('jsonfilepath', true);
        const vars = tl.getVariables();
        if (!vars || vars.length === 0) {
            console.warn("WARN: jsonfilepath variable undefined!");
            return;
        }

        const appSettingPrefix = "appsetting.";
        const appSettingOffset = appSettingPrefix.length;
        const x: any = {};
        vars.forEach(v => {
            const lcase_name = v.name.toLowerCase();
            if (lcase_name.startsWith(appSettingPrefix)) {
                var propVal: any;
                var propName: string;
                if (lcase_name.startsWith(appSettingPrefix + "number.")) {
                    propName = v.name.substring(appSettingOffset + 7);
                    propVal = Number(v.value);
                }
                else if (lcase_name.startsWith(appSettingPrefix + "string.")) {
                    propName = v.name.substring(appSettingOffset + 7);
                    propVal = v.value;
                }
                else if (lcase_name.startsWith(appSettingPrefix + "bool.")) {
                    propName = v.name.substring(appSettingOffset + 5);
                    propVal = (v.value || '').trim().toLowerCase() === "true";
                }
                else {
                    //treat as string (untyped)
                    propName = v.name.substring(appSettingOffset);
                    propVal = v.value;
                }

                x[propName] = propVal;
            }
        });
        const j: string = JSON.stringify(x, undefined, 4);
        console.info(await writeFilePromise(jsonFilePath, j));
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();