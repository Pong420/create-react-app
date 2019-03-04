'use strict';

const fs = require('fs');
const paths = require('../config/paths');
const appPackage = require(paths.appPackageJson);
const useTypeScript = appPackage.dependencies['typescript'] != null;

const componentName = process.argv[2].replace(/^\w/, function(chr) {
  return chr.toUpperCase();
});
const dir = `${paths.appSrc}/components/${componentName}`;

const write = (path, content) => {
  fs.writeFileSync(path, content.trim().replace(/^ {2}/gm, ''), 'utf-8');
};

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const index = `
  import './${componentName}.scss';
  
  export * from './${componentName}';
  export { ${componentName} as default } from './${componentName}';
  `;

const reactComponent = `
  import React from 'react';
  
  export function ${componentName}() {
    return (
      <div className="${componentName
        .split(/(?=[A-Z])/)
        .map(str => str.toLocaleLowerCase())
        .join('-')}"></div>
    );
  }
  `;

const scss = '';

write(`${dir}/index.js`, index);
write(
  `${dir}/${componentName}.${useTypeScript ? 'tsx' : 'jsx'}`,
  reactComponent
);
write(`${dir}/${componentName}.scss`, scss);
