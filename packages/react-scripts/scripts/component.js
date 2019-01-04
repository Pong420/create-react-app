'use strict';

const fs = require('fs');
const paths = require('../config/paths');
const appPackage = require(paths.appPackageJson);
const useTypeScript = appPackage.dependencies['typescript'] != null;

const name = process.argv[2].replace(/^\w/, function(chr) {
  return chr.toUpperCase();
});
const dir = `${paths.appSrc}/components/${name}`;

const write = (path, content) => {
  fs.writeFileSync(path, content.trim().replace(/^ {2}/gm, ''), 'utf-8');
};

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const index = `
  import './${name}.scss';
  
  export * from './${name}';
  `;

const reactComponent = `
  import React from 'react';
  
  export function ${name}() {
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
write(`${dir}/${name}.${useTypeScript ? 'tsx' : 'jsx'}`, reactComponent);
write(`${dir}/${name}.scss`, scss);
