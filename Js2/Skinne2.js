class TreeNode {
  constructor(name, parent = null) {
    this.name = name;
    this.children = [];
    this.parent = parent;
    this.skin = {};
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
    this.tintsCount = 8;

    this.skinnerControls = {};

    this.UIColors = {
      sk_bodyBg: "#dedede",
      sk_bodyBg2: "#d5d5d5",
      sk_bodyBg3: "#e5e5e5",
      sk_bodyTxt: "#222",
      sk_bodyTxt2: "#333",
    };

    this.defaults = {
      dark: {
        step: 1,
        bgHov: 3,
      },
      light: {
        step: 1,
        bg3: 8,
        bgHov: 3,
      },
      alpha: {
        bg: 0.6,
        bg2: 0.4,
        bg3: 0.2,
      },
      txt: {
        step: 22,
        txt: 10,
        txt2: 20,
        txt3: 40,
      },
    };

    this.getConfigBlueprint = this.getConfigBlueprint.bind(this);
    this.generateConfigFromInput = this.generateConfigFromInput.bind(this);
    this.mergeConfig = this.mergeConfig.bind(this);

    this.essenceSelector = {};
  }

  applyColorByNesting(essence) {
    const elements = document.querySelectorAll("[data-nest]");

    const rootToStartColor = [];

    elements.forEach((el) => {
      // Check if the 'data-nest' attribute value is 'ads'
      if (el.getAttribute("data-nest") === essence) {
        // Add the element to the adsElements array
        rootToStartColor.push(el);
      }
    });

    let self = this;
    let vd = this.verbalData(essence);
    const colors = [
      `var(--${vd["nameBg"]})`,
      `var(--${vd["nameBg2"]})`,
      `var(--${vd["nameBg3"]})`,
    ];

    rootToStartColor.forEach((s) => colorize(s, 0));

    function colorize(element, level) {
      let lvl = level % colors.length;
      let lvlShift = (level - 1) % colors.length;

      // Check if the element has padding, gap, or grid-gap
      const hasPaddingOrGap =
        getComputedStyle(element).padding !== "0px" ||
        getComputedStyle(element).gap !== "0px" ||
        getComputedStyle(element).gridGap !== "0px";

      if (hasPaddingOrGap) {
        element.style.backgroundColor = colors[lvl];
        element.style.color = self.skin[vd.nameTxt];
        element.style.borderColor = colors[lvlShift];
      }

      // Recursively call this function for each child element
      Array.from(element.children).forEach((child) =>
        colorize(child, level + 1)
      );
    }

    function colorize(element, level) {
      // const pureSel = sel.slice(1, -1);
      if (element.classList.contains("skinner_HTML_container")) {
        return;
      }
      const hasPaddingOrGap =
        getComputedStyle(element).padding !== "0px" ||
        getComputedStyle(element).gap !== "0px" ||
        getComputedStyle(element).gridGap !== "0px";


      let lvl = level % colors.length;
      let lvlShift = (level - 1) % colors.length;
      if (hasPaddingOrGap) {
        element.style.backgroundColor = colors[lvl];
        element.classList.add(`colored___${essence.toUpperCase()}___`);
        element.style.color = self.skin[vd.nameTxt];
        element.style.borderColor = colors[lvlShift];
      }

      Array.from(element.children).forEach((child) =>
        colorize(child, level + 1)
      );
      // Recursively call this function for each child element
    }

    // Start with the initial element(s)
    // if (element.getAttribute("data-nest") !== essence) {
    //   const elements = document.querySelectorAll("[data-nest]");
    //   elements.forEach((el) => colorize(el));
    // }
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
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      grid-gap: 8px;
      padding: 8px;
      font-family: 'Nunito Sans', sans-serif;
      background: var(--bodyBg);
      
    }
    .skinner_HTML_box_heading{
      font-size: 1.8em;
      text-transform: capitalize;
      font-weight: 700;
      text-align: left;
      padding: 0 16px;
    }
    .skinner_HTML_box_container{
      padding: 16px;
      border-radius: 12px;
    }
    .skinner_HTML_box {
      padding: 8px 12px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 4px;
      // grid-template-rows: repeat(3, 1fr);
      font-weight: 500;
      font-size: 14px;
    }
    .skinner_HTML_box > div:nth-child(2){
      font-size: 0.9em;
      font-weight: 400;

    }
    .skinner_HTML_box > div:nth-child(3){
      font-size: 0.8em;
      font-weight: 400;

    }
    .skinner_HTML_box:first-child{
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .skinner_HTML_box:last-child{
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    .pickr .pcr-button{
      height: 42px;
      width: 42px;
      padding: 8px 12px;
    }
    `;

    // Create a style element
    let container = document.createElement("div");
    container.className = "skinner_HTML_container";
    document.body.appendChild(container);

    function createEssenceHTML(bg, txt, txt2, txt3) {
      let essenceBg = document.createElement("div");
      essenceBg.className = `skinner_HTML_box`;
      essenceBg.style.backgroundColor = bg;
      let essenceTxt = document.createElement("div");
      essenceTxt.innerText = "Txt";
      essenceTxt.style.color = txt;
      let essenceTxt2 = document.createElement("div");
      essenceTxt2.style.color = txt2;
      essenceTxt2.innerText = `Txt2`;
      let essenceTxt3 = document.createElement("div");
      essenceTxt3.style.color = txt3;
      essenceTxt3.innerText = "Txt3";
      essenceBg.appendChild(essenceTxt);
      essenceBg.appendChild(essenceTxt2);
      essenceBg.appendChild(essenceTxt3);
      return essenceBg;
    }

    function addHTMLGroup(node) {
      let vd = self.verbalData(node.name);

      let essenceContainer = document.createElement("div");
      essenceContainer.className = "skinner_HTML_box_container";
      essenceContainer.style.background = `var(--${vd["nameBg"]})`;
      essenceContainer.style.border = `2px solid var(--${vd["nameBg3"]})`;
      container.appendChild(essenceContainer);

      let essenceHeading = document.createElement("div");
      essenceHeading.className = "skinner_HTML_box_heading";
      essenceHeading.style.color = `var(--${vd["nameTxt"]})`;
      essenceHeading.innerText = `${vd["name"]}`;
      essenceContainer.appendChild(essenceHeading);

      let bg = createEssenceHTML(
        `var(--${vd["nameBg"]})`,
        `var(--${vd["nameTxt"]})`,
        `var(--${vd["nameTxt2"]})`,
        `var(--${vd["nameTxt3"]})`
      );

      let bg1 = bg;
      essenceContainer.appendChild(bg);
      essenceContainer.appendChild(bg1);

      const tintsCount = self.tintsCount;

      styles += `--${vd["nameBg"]}: ${self.skin[vd["nameBg"]]};\n`;
      styles += `--${vd["nameBg1"]}: ${self.skin[vd["nameBg1"]]};\n`;

      for (let t = 2; t < tintsCount; t++) {
        let bg = createEssenceHTML(
          `var(--${vd[`nameBg${t}`]})`,
          `var(--${vd["nameTxt"]})`,
          `var(--${vd["nameTxt2"]})`,
          `var(--${vd["nameTxt3"]})`
        );

        essenceContainer.appendChild(bg);
      }

      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          addHTMLGroup(child); // Recursive call
        });
      }
    }

    this.rootNodes.forEach((node) => {
      addHTMLGroup(node);
    });

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
      const tintsCount = self.tintsCount;

      styles += `--${vd["nameBg"]}: ${self.skin[vd["nameBg"]]};\n`;
      styles += `--${vd["nameBg1"]}: ${self.skin[vd["nameBg1"]]};\n`;
      for (let t = 2; t < tintsCount; t++) {
        styles += `--${vd[`nameBg${t}`]}: ${self.skin[vd[`nameBg${t}`]]};\n`;
      }

      styles += `--${vd["nameTxt"]}: ${self.skin[vd["nameTxt"]]};\n`;
      styles += `--${vd["nameTxt2"]}: ${self.skin[vd["nameTxt2"]]};\n`;
      styles += `--${vd["nameTxt3"]}: ${self.skin[vd["nameTxt3"]]};\n`;

      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          addVariableGroup(child); // Recursive call
        });
      }
    }

    this.rootNodes.forEach((node) => {
      addVariableGroup(node);
    });
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
      const n = node.name;
      self.essenceSelector[n] = node;
      if (!node.cfg.Background.isActive) {
        let parentValue = node.parent.cfg.Background.color;
        let parentIsDark = self.TC(parentValue).isDark();
        node.cfg.Background.isDark = parentIsDark;
        node.cfg.Background.color = parentIsDark
          ? self.TC(parentValue).lighten(5).toHexString()
          : self.TC(parentValue).darken(5).toHexString();
      }

      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          configFromParent(child); // Recursive call
        });
      }
    }

    this.rootNodes.forEach((node) => {
      configFromParent(node);
    });
  }

  mergeConfig() {
    let self = this;
    let mergedConfig = {};
    function processNode(node) {
      // Process the current node
      self.generateConfigFromInput(node);
      // If the node has children, process each child
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
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
    const tintsCount = this.tintsCount;

    data.name = name;
    data.nameBg = data.name + "Bg";
    data.nameBg_g = data.nameBg + "_g";
    data.nameG = data.name + "G";
    data.nameRGBATransparent = data.name + "RGBATransparent";
    data.nameRGBA = data.name + "RGBA";
    data.nameRGBA2 = data.name + "RGBA2";
    data.nameRGBA3 = data.name + "RGBA3";
    data.nameG2 = data.nameG + "2";
    data.nameBg1 = data.nameBg + "1";

    for (let i = 2; i < tintsCount; i++) {
      data[`nameBg${i}`] = data.nameBg + i;
    }
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
      self.updateControl(node)
      self.makeBackgrounds(node);
      self.makeText(node);
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          processNode(child);
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
    let isDark;
    let vd = this.verbalData(node.name);

    const tintsCount = this.tintsCount;
    if (node.cfg.Background.isActive) {
      isDark = node.cfg.Background.isDark;
      let bg = node.cfg.Background.color;
      this.skin[vd.nameBg] = tc(bg).toHexString();
      this.skin[vd.nameBg1] = tc(bg).toHexString();
    } else {
      const vdf = this.verbalData(node.parent.name);
      let bgParent = this.skin[vdf['nameBg2']];
      isDark = node.parent.cfg.Background.isDark;
      this.skin[vd.nameBg] = tc(bgParent).toHexString();
      this.skin[vd.nameBg1] = tc(bgParent).toHexString();
    }
    for (let i = 2; i < tintsCount; i++) {
      this.skin[vd[`nameBg${i}`]] = isDark
        ? tc(this.skin[vd[`nameBg${i - 1}`]])
          .darken(this.defaults.dark.step)
          .toHexString()
        : tc(this.skin[vd[`nameBg${i - 1}`]])
          .lighten(this.defaults.light.step)
          .toHexString();
    }
  }

  makeText(node) {
    let tc = this.TC;
    let cfg = node.cfg;
    let vd = this.verbalData(node.name);
    let textColor = tc
      .mostReadable(this.skin[vd.nameBg], ["#ffffff", "#000000"])
      .toHexString();

    this.skin[vd.nameTxt] = tc
      .mix(textColor, this.skin[vd.nameBg], this.defaults.txt.step)
      .toHexString();
    this.skin[vd.nameTxt2] = tc
      .mix(textColor, this.skin[vd.nameBg], this.defaults.txt.step * 2)
      .toHexString();
    this.skin[vd.nameTxt3] = tc
      .mix(textColor, this.skin[vd.nameBg], this.defaults.txt.step * 3)
      .toHexString();
  }

  setConfig(config) {
    this.МCFG = config;
    return this.МCFG;
  }

  getConfig() {
    return this.МCFG;
  }

  /**Useful REG                  (background-color|color|border(?:-[^:]*color)?|outline(?:-color)?|fill|stroke):\s*[^;]+;                 */
  /**Useful REG                  <([a-z]+)([^>]*?class=["'][^"']*?l_od[^"']*?["'])([^>]*?)>   replace     <$1$2$3 data-nested="odd">
   */

  init() {
    // document.body.style.background = "#212121";
    // document.body.style.color = "#999999";
    this.mergeConfig();
    this.generateConfigMissingValues();
    this.createSkinnerUI();
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

  createSkinnerControls(parent) {
    let self = this;

    function processNode(node) {
      // Process the current node
      const n = node.name;
      const row = document.createElement("div");
      row.className = 'sk_ui_essence_row'
      const nameEl = document.createElement("span");
   
      const chb = self.createCheckbox(node, "Background", "isActive");
      const pickerInstance = self.createPicker(node, "Background", "color");
      const chb2 = self.createCheckbox(node, "Background", "isDark");

      const group = document.createElement("div");
      group.className = 'sk_ui_essence_row_group'

      parent.appendChild(row);
      row.appendChild(group);
      row.appendChild(nameEl);
      group.appendChild(chb);
      group.appendChild(pickerInstance.wrapper);
      group.appendChild(chb2);
      node.controls = {};
      node.controls.isActive = chb;
      node.controls.bg = pickerInstance.imitator;
      node.controls.isDark = chb2;

      // If the node has children, process each child
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          processNode(child); // Recursive call
        });
      }
      return true;
    }

    this.rootNodes.forEach((node) => {
      processNode(node);
    });

    return true;
  }

  updateControl(node){
    const vd = this.verbalData(node.name);
    node.controls.bg.style.background = node.cfg.Background.color;
    node.controls.bg.style.color = this.skin[vd.nameTxt];
    node.controls.bg.style.pointerEvents = node.cfg.Background.isActive ?  '' : 'none';
    node.controls.bg.style.opacity = node.cfg.Background.isActive ?  '1' : '0.4';
    // node.controls.isDark;
  }

  // updateControls(){
  //   let self = this;
  //   function processNode(node) {
  //     node.cfg

  //     // If the node has children, process each child
  //     if (node.children && node.children.length > 0) {

  //       node.children.forEach((child) => {
  //         processNode(child); // Recursive call
  //       });
  //     }
  //     return true;
  //   }

  //   this.rootNodes.forEach((node) => {
  //     processNode(node);
  //   });
  // }

  updateEssence(node, grp, key, val) {
    let self = this;
    
    node.cfg[grp][key] = val;
    function processNode(node) {
      self.makeBackgrounds(node);
      self.makeText(node);
      self.updateControl(node);
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          processNode(child);
        });
      }
    }

    processNode(node);

    this.addHTMLVars();
  }

  createCheckbox(node, grp, key) {
    const self = this;
    const chbWrapper = document.createElement("label");
    const chb = document.createElement("input");
    chb.className = 'sk_ui_chb_hide'
    const n = node.name;
    chb.type = "checkbox";
    chb.id = `${n}${key}Checkbox`;
    chbWrapper.htmlFor = `${n}${key}Checkbox`;
    chb.checked = node.cfg[grp][key];
    const chbMock = document.createElement("div");
    chbMock.className = 'sk_ui_action_mock'
    chbWrapper.className = 'sk_ui_action';
    chbWrapper.appendChild(chb)
    chbWrapper.appendChild(chbMock)

    

    if(this.rootNodes.some(re => re.name === node.name) && key === 'isActive'){
      chbWrapper.style.pointerEvents = 'none';
      chbWrapper.style.opacity = '0.2';
    }
    else{
      chb.addEventListener("change", (e) => {
        self.updateEssence(node, grp, key, e.currentTarget.checked);
      });
    }
    

    return chbWrapper;
  }

  createPicker(node, grp, key) {
    let self = this;
    let bg = this.TC(node.cfg.Background.color).toHexString();
    let txt = node.cfg.Text.color ? this.TC(node.cfg.Text.color).toHexString() :  this.TC.mostReadable(bg, ["#ffffff", "#000000"]).toHexString();
   
    const n = node.name;
    let pickerImitator = document.createElement("div");
    pickerImitator.className='sk_ui_picker_action'
    pickerImitator.style.background = bg;
    pickerImitator.style.color = txt;
    pickerImitator.innerText = node.name
    let pickerWrapper = document.createElement("div");
    // self.createPickerControl(picker, c, (e) => {
    //   self.updateEssence(node, grp, key, e.toHEXA().toString());
    // });
    let pickerEl = document.createElement("div");
    pickerEl.className = 'sk_ui_picker_hidden'
    pickerImitator.addEventListener("click", (e) => {
      e.target.parentElement.appendChild(pickerEl)
      let _picker = Pickr.create({
        el: pickerEl,
        theme: "classic",
        comparison: false,
        default: bg,
        components: {
          preview: false,
          hue: true,
          interaction: {
            //hex: false,
            input: true,
            save: false,
          },
        },
      });

      _picker.show();
      _picker.on('change', (color, source, instance) => {
        self.updateEssence(node, grp, key, color.toHEXA().toString());
      })
      _picker.on('hide', instance => {
        instance.destroyAndRemove()
      })

    });

    pickerWrapper.appendChild(pickerImitator);
    pickerWrapper.className='sk_ui_picker_wrapper'
    pickerWrapper.appendChild(pickerEl);

    return {
      wrapper: pickerWrapper,
      imitator: pickerImitator,
    };
  }

  createSkinnerUI() {
    const UIroot = document.createElement("div");
    UIroot.className = 'sk_ui_root'

    const UIHeader = document.createElement("div");
    UIHeader.className = 'sk_ui_header'

    const UIwrapper = document.createElement("div");
    UIwrapper.className = 'sk_ui_wrapper'

    this.createSkinnerControls(UIwrapper);

    UIroot.appendChild(UIHeader);
    UIroot.appendChild(UIwrapper);
    document.body.appendChild(UIroot);

    return UIroot;
  }
}
