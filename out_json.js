YAML = require('yamljs');
const {resolve} = require('path')
const absolute_path = url => resolve(process.cwd(), url);

(async () => {
    let path = '';
    path = absolute_path('./obj.yaml');
    let result = await YAML.load(path);
    result = JSON.stringify(result);
    console.log(result)
})()