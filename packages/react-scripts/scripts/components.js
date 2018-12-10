'use strict';

const fs = require('fs');
const paths = require('../config/paths');

const name = process.argv[2];
const dir = `${paths.appSrc}/components/${name}`;

const trim = str => str.trim().replace(/^ {2}/gm, '');

const write = (path, content) => {
  fs.writeFileSync(path, trim(content), 'utf-8');
};

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const index = `
  import ${name} from './${name}';
  import './${name}.scss';
  
  export default ${name};
  `;

const jsx = `
  import React from 'react';
  
  export default function ${name}() {
    return (
      <div className="${name
        .split(/(?=[A-Z])/)
        .map(str => str.toLocaleLowerCase())
        .join('-')}"></div>
    );
  }
  `;

const scss = '';

write(`${dir}/index.js`, index);
write(`${dir}/${name}.jsx`, jsx);
write(`${dir}/${name}.scss`, scss);
