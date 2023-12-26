class TreeNode {
  constructor(name, parent = null) {
    this.name = name;
    this.children = [];
    this.parent = parent;
  }

  addChild(childNode) {
    childNode.parent = this; // Set the parent of the child
    this.children.push(childNode);
  }
}

function pathToRoot(node) {
  let path = [];
  let currentNode = node;

  while (currentNode !== null) {
    path.push(currentNode.name);
    currentNode = currentNode.parent;
  }

  return path.reverse(); // Reverse to get the path from root to the node
}

let body = new TreeNode("body");
let dominant = new TreeNode("dominant");
let evt = new TreeNode("event");
let header = new TreeNode("header");
let subHeader = new TreeNode("subHeader");
let tab = new TreeNode("tab");
let tabActive = new TreeNode("tabActive");
let buttonSecondary = new TreeNode("buttonSecondary");
let odd = new TreeNode("odd");
let menu_1 = new TreeNode("menu_1");
let menu_2 = new TreeNode("menu_2");
let menu_3 = new TreeNode("menu_3");
let accent = new TreeNode("accent");
let oddActive = new TreeNode("oddActive");
let brand = new TreeNode("brand");
let button = new TreeNode("button");

body.addChild(dominant); /* body */
body.addChild(evt); /* body */
dominant.addChild(menu_1);
evt.addChild(buttonSecondary);
header.addChild(subHeader);
menu_1.addChild(menu_2);
menu_2.addChild(menu_3); /* 4 */
accent.addChild(oddActive); /* brand */
brand.addChild(button); /* accent */

class Skinner2 {
  constructor(CFG, TC, CB, RN) {
    this.CFG = CFG;
    this.TC = TC;
    this.CB = CB || (() => console.log("cfg not provided"));
    this.rootNodes = RN;
    this.skin = {};
    this.isUIVisible = true;
    this.version = "2.0.0";
    this.defaults = {
      dark: {
        bg2: 8,
        bg3: 8,
        bgHov: 3,
      },
      light: {
        bg2: 8,
        bg3: 8,
        bgHov: 3,
      },
      alpha: {
        bg: 0.6,
        bg2: 0.4,
        bg3: 0.2,
      },
      txt: {
        txt: 0.9,
        txt2: 0.6,
        txt3: 0.4,
      },
    };
    this.getConfigBlueprint = this.getConfigBlueprint.bind(this);
    this.mergeConfig = this.mergeConfig.bind(this);
  }

  getConfigBlueprint() {
    return {
      Background: {
        isActive: false,
        color: "#19C950",
      },
      Gradient: {
        angle: 0,
        isActive: false,
        color: "#1703A2",
      },
      Text: {
        isActive: false,
        color: "#611BCD",
      },
      Accent: {
        isActive: false,
        color: "#F022FE",
      },
      Border: {
        isActive: false,
        color: "#AC23F7",
      },
      borderRadius: 6,
    };
  }

  generateConfigFromInput(inp) {
    /* Background.color: */
    let incoming = inp.name;
    let incomingConfig = this.CFG[incoming] || {};
    let confPeace = {
      Background: {
        isActive: false,
        color: "#212121",
      },
      Gradient: {
        angle: 0,
        isActive: false,
        color: null,
      },
      Text: {
        isActive: false,
        color: null,
      },
      Accent: {
        isActive: false,
        color: null,
      },
      Border: {
        isActive: false,
        color: null,
      },
      borderRadius: 4,
    };

    // let mergedConfPeace = mergeConfigurations(confPeace, incomingConfig);

    let mergedConfPeace = { ...confPeace, ...incomingConfig };

    console.log(mergedConfPeace, incomingConfig, inp.name);
  }

  mergeConfig() {
    let mergedConfig = {};
    let blueprint = this.getConfigBlueprint();

    /* body: {
      Background: {
        color: "#e5e5e5",
        fromLight: !tinycolor("#e5e5e5").isDark(),
        isDark: !tinycolor("#e5e5e5").isDark(),
      },
      Text: {
        color: "#000",
      },
    },
    dominant: {
      Background: {
        isActive: true,
        color: "#999999",
        isDark: !tinycolor("#999999").isDark(),
      },
      Text: {
        color: "#000",
      },
    },
    accent: {
      Background: {
        color: "#bd5726",
        isDark: !tinycolor("#bd5726").isDark(),
      },
      Text: {
        color: "#ffffff",
      },
    },
    brand: {
      Background: {
        color: "#5ea2c9",
        isDark: !tinycolor("#5ea2c9").isDark(),
      },
      Text: {
        color: "#ffffff",
      },
    },
  }, */

    // const traverseAndMerge = (node) => {
    //   let nodeConfig = this.CFG[node.name] || {};

    //   mergedConfig[node.name] = { ...blueprint };
    //   for (let key in blueprint) {
    //     if (nodeConfig[key]) {
    //       mergedConfig[node.name][key] = {
    //         ...blueprint[key],
    //         ...nodeConfig[key],
    //       };
    //     }
    //   }
    //   if (["body", "accent", "brand"].includes(node.name)) {
    //     mergedConfig[node.name].Background.isActive = true;
    //   }
    //   node.children.forEach((childNode) => traverseAndMerge(childNode));
    // };
    // this.rootNodes.forEach((rootNode) => traverseAndMerge(rootNode));
    // return mergedConfig;
    this.rootNodes.forEach((rootNode) => {
      rootNode.children.forEach((node) => {
        if (!node) {
          return;
        }

        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            this.generateConfigFromInput(child);
          });
        }
      });
      this.generateConfigFromInput(rootNode);
    });
  }

  verbalData(name) {
    let data = {};
    data.name = name;
    data.nameBg = data.name + "Bg";
    data.nameBg_g = data.nameBg + "_g";
    data.nameG = data.name + "G";
    data.nameRGBATransparent = data.name + "RGBATransparent";
    data.nameRGBA = data.name + "RGBA";
    data.nameRGBA2 = data.name + "RGBA2";
    data.nameRGBA3 = data.name + "RGBA3";
    data.nameG2 = data.nameG + "2";
    data.nameBgHov = data.nameBg + "Hover";
    data.nameBg2 = data.nameBg + "2";
    data.nameBg2Hov = data.nameBg2 + "Hover";
    data.nameBg3 = data.nameBg + "3";
    data.nameBg3Hov = data.nameBg3 + "Hover";
    data.upperCaseName = data.name[0].toUpperCase() + data.name.substring(1);
    data.isName = "is" + data.upperCaseName + "Bg";
    data.isGradient = "is" + data.upperCaseName + "Gradient";
    data.isGradientReversed = data.isGradient + "Reversed";
    data.gradientAngle = data.upperCaseName + "GradientAngle";

    data.isDark = "is" + data.upperCaseName + "BgDark";

    data.nameTxt = data.name + "Txt";
    data.nameTxt2 = data.nameTxt + "2";
    data.nameTxt3 = data.nameTxt + "3";
    data.nameTxtInverse = data.nameTxt + "Inverse";

    data.isCustomTxt = "isCustom" + data.upperCaseName + "Txt";

    data.nameBorder = data.name + "Border";
    data.isCustomBorder = "isCustom" + data.upperCaseName + "Border";

    data.nameAccent = data.name + "Accent";
    data.isCustomAccent = "isCustom" + data.upperCaseName + "Accent";
    data.nameAccentTxt = data.name + "AccentTxt";

    data.nameRadius = data.name + "Radius";

    return data;
  }

  traverse(root, action) {
    if (!node) {
      return;
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        this.makeColorPalette(child);
      });
    }
  }

  makeColorPalette(node) {
    if (!node) {
      return;
    }

    this.makeBackgrounds(node);

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        this.makeColorPalette(child);
      });
    }
  }

  makeBackgrounds(node) {
    let vd = this.verbalData(node.name);
    let en = vd.name;
    let mc = this.getConfig();
    let isActive = mc[en].Background.isActive;
    let Bgc = mc[en].Background.color;

    console.log(Bgc, node.name);
  }

  setConfig(config) {
    this.МCFG = config;
    return this.МCFG;
  }

  getConfig() {
    return this.МCFG;
  }

  init() {
    document.body.style.background = "#212121";
    document.body.style.color = "#999999";

    let mergedConfigurations = this.mergeConfig(); // Assuming CFG is your incoming configuration
    // this.setConfig(mergedConfigurations);
    // let body = this.rootNodes[0];
    // this.rootNodes.forEach((node) => {
    //   this.makeColorPalette(node);
    // });

    // return mergedConfigurations;
  }
}
