"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minimist = require("minimist");
const fs_1 = require("fs");
const ngast_1 = require("ngast");
const resource_1 = require("./utils/resource");
const module_tree_1 = require("./utils/module-tree");
function ngparser() {
    const error = message => {
        console.error(message);
    };
    const info = (message, count1, count2) => {
        console.log((message)
            + ` ${count1 ? count1 : ''}`
            + ` ${count2 ? '/ ' + count2 : ''}`);
    };
    let projectPath = minimist(process.argv.slice(2)).p;
    if (!projectPath) {
        projectPath = './tsconfig.json';
    }
    if (!fs_1.existsSync(projectPath)) {
        error('Cannot find tsconfig at "' + projectPath + '".');
        process.exit(1);
    }
    console.log('Parsing...');
    let parseError = null;
    const projectSymbols = new ngast_1.ProjectSymbols(projectPath, resource_1.resourceResolver, e => (parseError = e));
    const allModules = projectSymbols.getModules();
    //const allPipes = projectSymbols.getPipes();
    //const allProviders = projectSymbols.getProviders();
    //const allDirectives = projectSymbols.getDirectives();
    const treeMod = new module_tree_1.ModuleTree();
    if (!parseError) {
        console.log("Processing ...");
        // Count modules
        let ng_nodeModules = allModules.filter(el => el.symbol.filePath.indexOf('node_modules') !== -1);
        let moduleCount = allModules.length - ng_nodeModules.length;
        console.log("Modules:" + moduleCount);
        /*
        // Count lazy modules
        if (allModules && allModules[0]) {
            info(`Lazy Modules: `, treeMod.getLazyModules(allModules[0]).length);
        }
       
        // Count pipes
        let pipes_nodeModules = allPipes.filter(el => el.symbol.filePath.indexOf('node_modules') !== -1);
        info(`Pipes: `, allPipes.length - pipes_nodeModules.length);
      
    
        let componentCounts = 0;
        let node_modules_componentCounts = 0;
        let node_modules_DirectivesCounts = 0;
        
        
        allDirectives.forEach(el => {
          try {
            if (el.isComponent()) {
              // Component
              componentCounts += 1;
              if (el.symbol.filePath.indexOf('node_modules') !== -1) {
                node_modules_componentCounts += 1;
              }
            } else {
              // Directive
              if (el.symbol.filePath.indexOf('node_modules') !== -1) {
                node_modules_DirectivesCounts += 1;
              }
            }
          } catch (e) {
            // Component
            // exception only component
            componentCounts += 1;
            if (el.symbol.filePath.indexOf('node_modules') !== -1) {
              node_modules_componentCounts += 1;
            }
          }
        });
        
        info(`Directives: `, allDirectives.length - componentCounts - node_modules_DirectivesCounts);
        info(`Components: `, componentCounts - node_modules_componentCounts);
        
        // Count providers
        info(`Providers: ${allProviders.length}`);
    
        */
    }
    else {
        error(parseError);
    }
}
exports.ngparser = ngparser;
//# sourceMappingURL=parser.js.map