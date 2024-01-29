class Skinner {
  constructor(cssCb) {
    this.configOrder = [
      {
        name: 'body',
        inherits: null,
      },
      {
        name: 'accent',
        inherits: null,
      },
      {
        name: 'brand',
        inherits: null,
      },
      {
        name: 'dominant',
        inherits: ['body'],
      },
      {
        name: 'button',
        inherits: ['accent'],
      },
      {
        name: 'buttonSecondary',
        inherits: ['body'],
        variation: 5,
      },
      {
        name: 'navbar',
        inherits: ['dominant', 'body'],
      },
      {
        name: 'slider',
        inherits: ['body'],
      },
      {
        name: 'header',
        inherits: ['dominant', 'body'],
      },
      {
        name: 'subHeader',
        inherits: ['header', 'dominant', 'body'],
      },
      {
        name: 'event',
        inherits: ['dominant', 'body'],
      },
      {
        name: 'eventLive',
        inherits: ['event', 'body'],
        variation: 5,
      },
      {
        name: 'odd',
        inherits: ['brand'],
      },
      {
        name: 'oddActive',
        inherits: ['accent'],
      },
      {
        name: 'showMore',
        inherits: ['body'],
      },
      {
        name: 'marketHeader',
        inherits: ['header', 'body'],
      },
      {
        name: 'collapse',
        inherits: ['header', 'dominant', 'body'],
      },
      {
        name: 'tab',
        inherits: ['dominant', 'body'],
      },
      {
        name: 'tabActive',
        inherits: ['tab', 'dominant', 'body'],
      },
      {
        name: 'tabSecondaryActive',
        inherits: ['tab', 'dominant', 'body'],
      },
      {
        name: 'menu_1',
        inherits: ['dominant', 'body'],
      },
      {
        name: 'menu_2',
        inherits: ['menu_1', 'dominant', 'body'],
      },
      {
        name: 'menu_3',
        inherits: ['menu_2', 'menu_1', 'dominant', 'body'],
      },
      {
        name: 'input',
        inherits: ['dominant', 'body'],
      },
      {
        name: 'inputSecondary',
        inherits: ['input', 'dominant', 'body'],
      },
      {
        name: 'filter',
        inherits: ['input', 'dominant', 'body'],
      },
      {
        name: 'tooltip',
        inherits: ['dominant', 'body'],
      },
      {
        name: 'modal',
        inherits: ['dominant', 'body'],
      },
      {
        name: 'betSlip',
        inherits: ['dominant', 'body'],
      },
      {
        name: 'betSlipStake',
        inherits: ['betSlip', 'dominant', 'body'],
      },
      {
        name: 'betSlipInput',
        inherits: ['betSlip', 'dominant', 'body'],
      },
      {
        name: 'betSlipButton',
        inherits: ['betSlip', 'dominant', 'body'],
      },
      {
        name: 'betSlipHeader',
        inherits: ['betSlip', 'dominant', 'body'],
      },
      {
        name: 'betSlipTab',
        inherits: ['betSlip', 'dominant', 'body'],
      },
      {
        name: 'betSlipTabActive',
        inherits: ['betSlip', 'dominant', 'body'],
      },
      {
        name: 'tmLogo',
        inherits: ['dominant', 'body'],
      },
    ];

    this.cssCb = cssCb;
    this.skin = {};

    this.defaults = {
      dark: {
        bg2: 4,
        bg3: 4,
        bgHov: 2,
        step: 2,
      },
      light: {
        bg2: 4,
        bg3: 4,
        bgHov: 2,
        step: 2,
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

    this.mergeConfig = this.mergeConfig.bind(this);
    this.getFallbackLvl = this.getFallbackLvl.bind(this);

    this.generateBackgrounds = this.generateBackgrounds.bind(this);
    this.generateGradientss = this.generateGradientss.bind(this);
    this.generateTextss = this.generateTextss.bind(this);
    this.generateAccentss = this.generateAccentss.bind(this);
    this.generateBorderss = this.generateBorderss.bind(this);
    this.initialized = false;
  }

  getConfigOrder() {
    return this.configOrder;
  }

  getVerbalDataGenerator() {
    return this.verbalData;
  }

  mergeConfig(config) {
    let _config = config;
    let _mergedConfig = {};
    let _missingConfig = {};
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;
      let _configBlueprint = {
        Background: {
          isActive: false,
          color: '#19C950',
        },
        Gradient: {
          angle: 0,
          isActive: false,
          color: '#1703A2',
        },
        Text: {
          isActive: false,
          color: '#611BCD',
        },
        Accent: {
          isActive: false,
          color: '#F022FE',
        },
        Border: {
          isActive: false,
          color: '#AC23F7',
        },
        borderRadius: 6,
      };
      _mergedConfig[_essence] = {};
      _mergedConfig[_essence].editable = Boolean(this.activeEssences.find((f) => f.name === _essence));

      if (!_config[_essence]) {
        _missingConfig[_essence] = {};
      }

      for (const key in _configBlueprint) {
        if (key === 'borderRadius' && _config[_essence]) {
          _mergedConfig[_essence][key] = _config[_essence][key] ? _config[_essence][key] : _configBlueprint[key];
        } else {
          _mergedConfig[_essence][key] = Object.assign(
            _configBlueprint[key],
            _config[_essence] ? _config[_essence][key] : {}
          );
        }
      }

      if (_essence === 'body' || _essence === 'accent' || _essence === 'brand') {
        _mergedConfig[_essence].Background.isActive = true;
      }

      _mergedConfig[_essence].fallback = this.configOrder[i].inherits;

      if (_config[_essence] && _config[_essence].variation) {
        _mergedConfig[_essence].variation = _config[_essence].variation;
      } else {
        _mergedConfig[_essence].variation = this.configOrder[i].variation;
      }
    }

    return _mergedConfig;
  }

  generateBackgrounds(essence, fbEssence) {
    const _config = this.mergedConfig;

    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let theme = { scheme: 'lighten', step: this.defaults.light.step };

    if (fbEssence) {
      let _vbf = this.verbalData(fbEssence);
      let fbLength = _config[_essence].fallback.length;
      let variation = _config[_essence].variation;

      this.skin[_vb.nameBg] = this.getFallbackLvl(fbEssence, variation, fbLength);
      this.skin[_vb.isDark] = this.skin[_vbf.isDark];
    } else {
      this.skin[_vb.nameBg] = this.mergedConfig[_essence].Background.color;
      this.skin[_vb.isDark] = this.mergedConfig[_essence].Background.isDark;
    }

    const mainBg = tinycolor(this.skin[_vb.nameBg]);

    if (this.skin[_vb.isDark]) {
      theme.scheme = 'darken';
      theme.step = this.defaults.dark.step;
    }

    this.skin[_vb.nameBgHov] = mainBg[theme.scheme](theme.step).toString();
    this.skin[_vb.nameBg2] = mainBg[theme.scheme](theme.step * 2).toString();
    this.skin[_vb.nameBg2Hov] = mainBg[theme.scheme](theme.step * 3).toString();
    this.skin[_vb.nameBg3] = mainBg[theme.scheme](theme.step * 4).toString();
    this.skin[_vb.nameBg3Hov] = mainBg[theme.scheme](theme.step * 5).toString();
    this.skin[_vb.nameRGBATransparent] = mainBg.setAlpha(0).toRgbString();
    this.skin[_vb.nameRGBA] = mainBg.setAlpha(this.defaults.alpha.bg).toRgbString();
    this.skin[_vb.nameRGBA2] = mainBg.setAlpha(this.defaults.alpha.bg2).toRgbString();
    this.skin[_vb.nameRGBA3] = mainBg.setAlpha(this.defaults.alpha.bg3).toRgbString();
  }

  generateGradientss(essence, fbEssence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _isGradient = this.mergedConfig[_essence].Gradient.isActive;

    if (fbEssence) {
      let _vdf = this.verbalData(fbEssence);
      this.skin[_vb.nameG] = this.skin[_vdf.nameG];
    } else {
      if (_isGradient) {
        this.skin[_vb.nameG] = this.mergedConfig[_essence].Gradient.color;
      } else {
        this.skin[_vb.nameG] = this.skin[_vb.nameBg];
      }
    }
  }

  generateTextss(essence, fbEssence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let textColor = this.mergedConfig[_essence].Text.color;

    if (fbEssence) {
      let _vdf = this.verbalData(fbEssence);
      textColor = this.skin[_vdf.nameTxt];
    } else {
      let _isCustomTextActive = this.skin[_vb.isCustomTxt];

      if (_isCustomTextActive) {
        textColor = this.skin[_vb.nameTxt];
      }
    }

    this.skin[_vb.nameTxt] = tinycolor(textColor).toHexString();
    this.skin[_vb.nameTxt2] = tinycolor.mix(this.skin[_vb.nameTxt], this.skin[_vb.nameBg], 20).toHexString();
    this.skin[_vb.nameTxt3] = tinycolor.mix(this.skin[_vb.nameTxt], this.skin[_vb.nameBg], 30).toHexString();
  }

  generateAccentss(essence, fbEssence) {
    let _vb = this.verbalData(essence);

    if (fbEssence) {
      let _vdf = this.verbalData(fbEssence);
      this.skin[_vb.nameAccent] = this.skin[_vdf.nameAccent];
    } else {
      let _isCustomAccentActive = this.skin[_vb.isCustomAccent];

      if (!_isCustomAccentActive) {
        this.skin[_vb.nameAccent] = this.mergedConfig.accent.Background.color;
      }
    }

    this.skin[_vb.nameAccentTxt] = tinycolor.mostReadable(this.skin[_vb.nameAccent], ['#fff', '#000']).toHexString();
  }

  generateBorderss(essence, fbEssence) {
    let _vb = this.verbalData(essence);
    let _vbf;

    if (fbEssence) {
      _vbf = this.verbalData(fbEssence);
      this.skin[_vb.nameBorder] = this.skin[_vbf.nameBg];
    } else {
      this.skin[_vb.nameBorder] = this.skin[_vb.nameBg];
    }
  }

  getFallbackLvl(essence, variation, lvl) {
    let _essence = essence;

    let _variation = variation;
    let _lvl = lvl;
    let _vb = this.verbalData(_essence);

    let _variationsArr = ['Bg', 'BgHover', 'Bg2', 'Bg2Hover', 'Bg3', 'Bg3Hover'];

    return _variation ? this.skin[_vb.name + _variationsArr[_variation]] : this.skin[_vb.name + _variationsArr[_lvl]];
  }

  init(colors = {}) {
    debugger
    const {
      'background-color-1': bodyBackground,
      'text-color-1': bodyText,
      'background-color-3': dominantBackground,
      'brand-color-1': accentBackground,
      'brand-color-2': brandBackground,
      'brand-gradient-1': brandGradient1,
      'background-gradient-2': backgroundGradient2,
    } = colors;

    if (!bodyBackground || !bodyText || !dominantBackground || !accentBackground || !brandBackground) {
      return;
    }

    const builderColorsMapping = {
      body: {
        Background: {
          color: bodyBackground,
          isDark: !tinycolor(bodyBackground).isDark(),
        },
        Text: {
          color: bodyText,
        },
      },
      dominant: {
        Background: {
          isActive: true,
          color: dominantBackground,
          isDark: !tinycolor(dominantBackground).isDark(),
        },
        Gradient: {
          isActive: backgroundGradient2 !== 'none',
          color: backgroundGradient2,
        },
        Text: {
          color: tinycolor.mostReadable(dominantBackground, ['#fff', '#000']),
        },
      },
      accent: {
        Background: {
          color: accentBackground,
          isDark: !tinycolor(accentBackground).isDark(),
        },
        Gradient: {
          isActive: brandGradient1 !== 'none',
          color: brandGradient1,
        },
        Text: {
          color: tinycolor.mostReadable(accentBackground, ['#fff', '#000']),
        },
      },
      brand: {
        Background: {
          color: brandBackground,
          isDark: !tinycolor(brandBackground).isDark(),
        },
        Text: {
          color: tinycolor.mostReadable(brandBackground, ['#fff', '#000']),
        },
      },
    };

    this._config = builderColorsMapping || {};

    this.activeEssences = this.configOrder.filter((c) => {
      return this._config[c.name];
    });

    this.mergedConfig = this.mergeConfig(this._config);
    this.generateTheme();

    this.initialized = true;
  }

  injectHtmlVars(container) {
    if (!container || !this.initialized) {
      return;
    }

    let _skin = this.skin;
    let co = this.getConfigOrder();
    let vd = this.getVerbalDataGenerator();
    let styles = `:root, :root[data-theme=dark], :root [data-theme=dark] {\n`;

    // Generate CSS custom properties
    for (let i = 0; i < co.length; i++) {
      let vdd = vd(co[i].name);
      styles += `--${vdd['nameG']}: ${_skin[vdd['nameG']]};\n`;
      styles += `--${vdd['nameBg']}: ${_skin[vdd['nameBg']]};\n`;
      styles += `--${vdd['nameBgHov']}: ${_skin[vdd['nameBgHov']]};\n`;
      styles += `--${vdd['nameBg2']}: ${_skin[vdd['nameBg2']]};\n`;
      styles += `--${vdd['nameBg2Hov']}: ${_skin[vdd['nameBg2Hov']]};\n`;
      styles += `--${vdd['nameBg3']}: ${_skin[vdd['nameBg3']]};\n`;
      styles += `--${vdd['nameBg3Hov']}: ${_skin[vdd['nameBg3Hov']]};\n`;
      styles += `--${vdd['nameRGBATransparent']}: ${_skin[vdd['nameRGBATransparent']]};\n`;
      styles += `--${vdd['nameRGBA']}: ${_skin[vdd['nameRGBA']]};\n`;
      styles += `--${vdd['nameRGBA2']}: ${_skin[vdd['nameRGBA2']]};\n`;
      styles += `--${vdd['nameRGBA3']}: ${_skin[vdd['nameRGBA3']]};\n`;
      styles += `--${vdd['nameAccent']}: ${_skin[vdd['nameAccent']]};\n`;
      styles += `--${vdd['nameAccentTxt']}: ${_skin[vdd['nameAccentTxt']]};\n`;
      styles += `--${vdd['nameTxt']}: ${_skin[vdd['nameTxt']]};\n`;
      styles += `--${vdd['nameTxt2']}: ${_skin[vdd['nameTxt2']]};\n`;
      styles += `--${vdd['nameTxt3']}: ${_skin[vdd['nameTxt3']]};\n`;
      styles += `--${vdd['nameBorder']}: ${_skin[vdd['nameBorder']]};\n`;
      styles += `--${vdd['nameRadius']}: ${_skin[vdd['nameRadius']]}px;\n`;
    }

    styles += `}\n`;

    container.textContent = styles;
  }

  verbalData(name) {
    let data = {};
    data.name = name;
    data.nameBg = data.name + 'Bg';
    data.nameBg_g = data.nameBg + '_g';
    data.nameG = data.name + 'G';
    data.nameRGBATransparent = data.name + 'RGBATransparent';
    data.nameRGBA = data.name + 'RGBA';
    data.nameRGBA2 = data.name + 'RGBA2';
    data.nameRGBA3 = data.name + 'RGBA3';
    data.nameG2 = data.nameG + '2';
    data.nameBgHov = data.nameBg + 'Hover';
    data.nameBg2 = data.nameBg + '2';
    data.nameBg2Hov = data.nameBg2 + 'Hover';
    data.nameBg3 = data.nameBg + '3';
    data.nameBg3Hov = data.nameBg3 + 'Hover';
    data.upperCaseName = data.name[0].toUpperCase() + data.name.substring(1);
    data.isName = 'is' + data.upperCaseName + 'Bg';
    data.isGradient = 'is' + data.upperCaseName + 'Gradient';
    data.isGradientReversed = data.isGradient + 'Reversed';
    data.gradientAngle = data.upperCaseName + 'GradientAngle';

    data.isDark = 'is' + data.upperCaseName + 'BgDark';

    data.nameTxt = data.name + 'Txt';
    data.nameTxt2 = data.nameTxt + '2';
    data.nameTxt3 = data.nameTxt + '3';
    data.nameTxtInverse = data.nameTxt + 'Inverse';

    data.isCustomTxt = 'isCustom' + data.upperCaseName + 'Txt';

    data.nameBorder = data.name + 'Border';
    data.isCustomBorder = 'isCustom' + data.upperCaseName + 'Border';

    data.nameAccent = data.name + 'Accent';
    data.isCustomAccent = 'isCustom' + data.upperCaseName + 'Accent';
    data.nameAccentTxt = data.name + 'AccentTxt';

    data.nameRadius = data.name + 'Radius';

    return data;
  }

  generateTheme() {
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;
      this.generateColorLogick(_essence);
    }
  }

  generateColorLogick(essence) {
    let _config = this.mergedConfig;
    let _essence = essence;
    let _vd = this.verbalData(_essence);

    if (_essence === 'body' || _essence === 'accent' || _essence === 'brand') {
      this.skin[_vd.isName] = true;
    }

    this.skin[_vd.isName] = _config[_essence].Background.isActive;
    let isActive = this.skin[_vd.isName];
    let _fbEssence;

    if (!isActive) {
      _fbEssence = _config[_essence].fallback.find((f) => {
        let vd = this.verbalData(f);
        return _config[f].editable && this.skin[vd.isName];
      });
    }

    this.generateBackgrounds(_essence, _fbEssence);
    this.generateGradientss(_essence, _fbEssence);
    this.generateTextss(_essence, _fbEssence);
    this.generateAccentss(_essence, _fbEssence);
    this.generateBorderss(_essence, _fbEssence);
  }
}