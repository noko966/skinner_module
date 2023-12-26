
class TreeNode {
  constructor(name, parent = null) {
    this.name = name;
    this.children = [];
    this.parent = parent;

    this.skin = {

    }

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
dominant.addChild(evt); /* body */
dominant.addChild(menu_1);
evt.addChild(header);
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
        step: 4,
      },
      light: {
        bg2: 8,
        bg3: 8,
        bgHov: 3,
        step: 4,
      },
      alpha: {
        bg: 0.6,
        bg2: 0.4,
        bg3: 0.2,
      },
      txt: {
        txt: 10,
        txt2: 20,
        txt3: 40,
      },
    };

    this.getConfigBlueprint = this.getConfigBlueprint.bind(this);
    this.generateConfigFromInput = this.generateConfigFromInput.bind(this);
    this.mergeConfig = this.mergeConfig.bind(this);

  }

  addHTMLDoomy() {
    let self = this;

    let style = document.getElementById("skinnerHTMLStyle");
    if (!style) {
      style = document.createElement("style");
      style.id = "skinnerHTMLStyle";
      document.head.appendChild(style);
    }

    let styles = "";
    styles += `
    body{
      margin: 0;
    }
    * {
      box-sizing: border-box;
    }
    .skinner_HTML_container {
      font-family: arial;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 32px;
      padding: 32px;
    }
    .skinner_HTML_box_heading{
      font-size: 20px;
      text-transform: capitalize;
      font-weight: 700;
      text-align: left;
      padding: 0 16px;
    }
    .skinner_HTML_box_container{
      padding: 8px;
      border-radius: 8px;
    }
    .skinner_HTML_box {
      padding: 8px 16px;
      display: grid;
      grid-gap: 6px;
      grid-template-rows: repeat(3, 1fr);
      font-weight: 700;
      font-size: 14px;
    }
    .skinner_HTML_box:first-child{
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .skinner_HTML_box:last-child{
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    `;

    // Create a style element
    let container = document.createElement("div");
    container.className = 'skinner_HTML_container';
    document.body.appendChild(container);

    function createEssenceHTML(bg, txt, txt2, txt3) {
      let essenceBg = document.createElement("div");
      essenceBg.className = `skinner_HTML_box`;
      essenceBg.style.backgroundColor = bg;
      let essenceTxt = document.createElement("div");
      essenceTxt.innerText = 'important text content';
      essenceTxt.style.color = txt;
      let essenceTxt2 = document.createElement("div");
      essenceTxt2.style.color = txt2;
      essenceTxt2.innerText = 'text content';
      let essenceTxt3 = document.createElement("div");
      essenceTxt3.style.color = txt3;
      essenceTxt3.innerText = 'minor text content';
      essenceBg.appendChild(essenceTxt);
      essenceBg.appendChild(essenceTxt2);
      essenceBg.appendChild(essenceTxt3);
      return essenceBg;
    }

    function addHTMLGroup(node) {
      let vd = self.verbalData(node.name);

      // Create a style element

      let essenceContainer = document.createElement("div");
      essenceContainer.className = 'skinner_HTML_box_container';
      essenceContainer.style.background = `var(--${vd["nameBg"]})`;
      container.appendChild(essenceContainer);


      let essenceHeading = document.createElement("div");
      essenceHeading.className = 'skinner_HTML_box_heading';
      essenceHeading.style.color = `var(--${vd["nameTxt"]})`;
      essenceHeading.innerText = `${vd["name"]}`;
      essenceContainer.appendChild(essenceHeading);

      let bg = createEssenceHTML(`var(--${vd["nameBg"]})`, `var(--${vd["nameTxt"]})`, `var(--${vd["nameTxt2"]})`, `var(--${vd["nameTxt3"]})`);
      let bg1 = createEssenceHTML(`var(--${vd["nameBg2"]})`, `var(--${vd["nameTxt"]})`, `var(--${vd["nameTxt2"]})`, `var(--${vd["nameTxt3"]})`);
      let bg2 = createEssenceHTML(`var(--${vd["nameBg3"]})`, `var(--${vd["nameTxt"]})`, `var(--${vd["nameTxt2"]})`, `var(--${vd["nameTxt3"]})`);


      essenceContainer.appendChild(bg);
      essenceContainer.appendChild(bg1);
      essenceContainer.appendChild(bg2);

      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          addHTMLGroup(child); // Recursive call
        });
      }
    }

    this.rootNodes.forEach(node => {
      addHTMLGroup(node);
    })

    style.textContent = styles;
  }

  addHTMLVars() {
    let self = this;
    // Create a style element
    let style = document.getElementById("skinnerVars");
    if (!style) {
      style = document.createElement("style");
      style.id = "skinnerVars";
      document.head.appendChild(style);
    }

    let styles = "";
    styles += `:root{\n`;
    // Generate CSS custom properties


    function addVariableGroup(node) {
      let vd = self.verbalData(node.name);

      styles += `--${vd["nameBg"]}: ${self.skin[vd["nameBg"]]};\n`;
      styles += `--${vd["nameBg2"]}: ${self.skin[vd["nameBg2"]]};\n`;
      styles += `--${vd["nameBg3"]}: ${self.skin[vd["nameBg3"]]};\n`;

      styles += `--${vd["nameTxt"]}: ${self.skin[vd["nameTxt"]]};\n`;
      styles += `--${vd["nameTxt2"]}: ${self.skin[vd["nameTxt2"]]};\n`;
      styles += `--${vd["nameTxt3"]}: ${self.skin[vd["nameTxt3"]]};\n`;

      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          addVariableGroup(child); // Recursive call
        });
      }
    }

    this.rootNodes.forEach(node => {
      addVariableGroup(node);
    })
    styles += `}\n`;
    style.textContent = styles;

    // Append the style element to the head of the document
    document.head.appendChild(style);
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



  generateConfigFromInput(node) {
    /* Background.color: */
    let incoming = node.name;
    let incomingConfig = this.CFG[incoming] || {};
    let confPeace = {
      Background: {
        isActive: false,
        isDark: false,
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


    let mergedConfPeace = { ...confPeace, ...incomingConfig };

    node.cfg = mergedConfPeace;
  }



  generateConfigMissingValues() {
    let self = this;
    function configFromParent(node) {
      if (!node.cfg.Background.isActive) {
        let parentValue = node.parent.cfg.Background.color;
        let parentIsDark = self.TC(parentValue).isDark();
        node.cfg.Background.isDark = parentIsDark;
        node.cfg.Background.color = parentIsDark ? self.TC(parentValue).lighten(10).toHexString() : self.TC(parentValue).darken(10).toHexString();
      }

      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          configFromParent(child); // Recursive call
        });
      }
    }

    this.rootNodes.forEach(node => {
      configFromParent(node);
    })
  }



  mergeConfig() {
    let self = this;
    let mergedConfig = {};
    function processNode(node) {
      // Process the current node
      self.generateConfigFromInput(node);
      // If the node has children, process each child
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          processNode(child); // Recursive call
        });
      }
    }

    this.rootNodes.forEach((node) => {
      processNode(node);
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


  makeColorPalette() {
    let self = this;
    function processNode(node) {
      // Process the current node
      self.makeBackgrounds(node);
      self.makeText(node);
      // If the node has children, process each child
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          processNode(child); // Recursive call
        });
      }
    }

    this.rootNodes.forEach((node) => {
      processNode(node);
    });

  }

  makeBackgrounds(node) {
    let tc = this.TC;
    let cfg = node.cfg;
    let startColor = cfg.Background.color;
    let isDark = cfg.Background.color.isDark;
    let vd = this.verbalData(node.name);

    this.skin[vd.nameBg] = tc(startColor).toHexString();
    this.skin[vd.nameBg2] = isDark ? tc(this.skin[vd.nameBg]).lighten(this.defaults.light.bg2).toHexString() : tc(this.skin[vd.nameBg]).darken(this.defaults.light.bg2).toHexString();
    this.skin[vd.nameBg3] = isDark ? tc(this.skin[vd.nameBg2]).lighten(this.defaults.light.bg2).toHexString() : tc(this.skin[vd.nameBg2]).darken(this.defaults.light.bg2).toHexString();
  }


  makeText(node) {
    let tc = this.TC;
    let cfg = node.cfg;
    let vd = this.verbalData(node.name);
    let textColor = tc.mostReadable(this.skin[vd.nameBg], ["#ffffff", "#000000"]).toHexString();

    this.skin[vd.nameTxt] = tc.mix(textColor, this.skin[vd.nameBg], this.defaults.txt.txt).toHexString();
    this.skin[vd.nameTxt2] = tc.mix(textColor, this.skin[vd.nameBg], this.defaults.txt.txt2).toHexString();
    this.skin[vd.nameTxt3] = tc.mix(textColor, this.skin[vd.nameBg], this.defaults.txt.txt3).toHexString();

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
    this.mergeConfig();
    this.generateConfigMissingValues();
    this.makeColorPalette();

    this.addHTMLVars();
    this.addHTMLDoomy();
    // this.setConfig(mergedConfigurations);
    // let body = this.rootNodes[0];
    // this.rootNodes.forEach((node) => {
    //   this.makeColorPalette(node);
    // });

    // return mergedConfigurations;
  }
}
