class Skinner {
  constructor(cssCb, tinycolor) {
    this.tinycolor = tinycolor;

    this.configOrder = [
      {
        name: "body",
        inherits: null,
      },
      {
        name: "accent",
        inherits: null,
      },
      {
        name: "brand",
        inherits: null,
      },
      {
        name: "dominant",
        inherits: ["body"],
      },
      {
        name: "button",
        inherits: ["accent"],
      },
      {
        name: "buttonSecondary",
        inherits: ["body"],
        variation: 5,
      },
      {
        name: "navbar",
        inherits: ["dominant", "body"],
      },
      {
        name: "slider",
        inherits: ["body"],
      },
      {
        name: "header",
        inherits: ["dominant", "body"],
      },
      {
        name: "subHeader",
        inherits: ["header", "dominant", "body"],
      },
      {
        name: "event",
        inherits: ["dominant", "body"],
      },
      {
        name: "eventLive",
        inherits: ["event", "body"],
        variation: 5,
      },
      {
        name: "odd",
        inherits: ["brand"],
      },
      {
        name: "oddActive",
        inherits: ["accent"],
      },
      {
        name: "showMore",
        inherits: ["body"],
      },
      {
        name: "marketHeader",
        inherits: ["header", "body"],
      },
      {
        name: "collapse",
        inherits: ["header", "dominant", "body"],
      },
      {
        name: "tab",
        inherits: ["dominant", "body"],
      },
      {
        name: "tabActive",
        inherits: ["tab", "dominant", "body"],
      },
      {
        name: "tabSecondaryActive",
        inherits: ["tab", "dominant", "body"],
      },
      {
        name: "menu_1",
        inherits: ["dominant", "body"],
      },
      {
        name: "menu_2",
        inherits: ["menu_1", "dominant", "body"],
      },
      {
        name: "menu_3",
        inherits: ["menu_2", "menu_1", "dominant", "body"],
      },
      {
        name: "input",
        inherits: ["dominant", "body"],
      },
      {
        name: "inputSecondary",
        inherits: ["input", "dominant", "body"],
      },
      {
        name: "filter",
        inherits: ["input", "dominant", "body"],
      },
      {
        name: "tooltip",
        inherits: ["dominant", "body"],
      },
      {
        name: "modal",
        inherits: ["dominant", "body"],
      },
      {
        name: "betSlip",
        inherits: ["dominant", "body"],
      },
      {
        name: "betSlipStake",
        inherits: ["betSlip", "dominant", "body"],
      },
      {
        name: "betSlipInput",
        inherits: ["betSlip", "dominant", "body"],
      },
      {
        name: "betSlipButton",
        inherits: ["betSlip", "dominant", "body"],
      },
      {
        name: "betSlipHeader",
        inherits: ["betSlip", "dominant", "body"],
      },
      {
        name: "betSlipTab",
        inherits: ["betSlip", "dominant", "body"],
      },
      {
        name: "betSlipTabActive",
        inherits: ["betSlip", "dominant", "body"],
      },
      {
        name: "tmLogo",
        inherits: ["dominant", "body"],
      },
    ];

    this.cssCb = cssCb;
    this.skin = {};
    this.isUIVisible = true;
    this.version = "1.0.0";

    this.defaults = {
      dark: {
        bg2: 8,
        bg3: 8,
        bgHov: 3,
        step: 6,
      },
      light: {
        bg2: 8,
        bg3: 8,
        bgHov: 3,
        step: 6,
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
      _mergedConfig[_essence] = {};
      _mergedConfig[_essence].editable = Boolean(
        this.activeEssences.find((f) => f.name === _essence)
      );
      if (!_config[_essence]) {
        _missingConfig[_essence] = {};
      }
      for (const key in _configBlueprint) {
        if (key === "borderRadius" && _config[_essence]) {
          _mergedConfig[_essence][key] = _config[_essence][key]
            ? _config[_essence][key]
            : _configBlueprint[key];
        } else {
          _mergedConfig[_essence][key] = Object.assign(
            _configBlueprint[key],
            _config[_essence] ? _config[_essence][key] : {}
          );
        }
      }
      if (
        _essence === "body" ||
        _essence === "accent" ||
        _essence === "brand"
      ) {
        _mergedConfig[_essence].Background.isActive = true;
      }
      _mergedConfig[_essence].fallback = this.configOrder[i].inherits;
      _mergedConfig[_essence].variation =
        _config[_essence] && _config[_essence].variation
          ? _config[_essence].variation
          : this.configOrder[i].variation;
    }

    return _mergedConfig;
  }

  generateBackgrounds(essence, fbEssence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _vbf, _isDark;

    if (fbEssence) {
      _vbf = this.verbalData(fbEssence);
      _isDark = _vbf.isDark;
      this.skin[_vb.isDark] = _isDark;
    }

    this.skin[_vb.nameBgHov] = this.skin[_vb.isDark]
      ? this.tinycolor(this.skin[_vb.nameBg])
          .darken(this.defaults.dark.step)
          .toString()
      : this.tinycolor(this.skin[_vb.nameBg])
          .lighten(this.defaults.light.step)
          .toString();

    this.skin[_vb.nameBg2] = this.skin[_vb.isDark]
      ? this.tinycolor(this.skin[_vb.nameBg])
          .darken(this.defaults.dark.step * 2)
          .toString()
      : this.tinycolor(this.skin[_vb.nameBg])
          .lighten(this.defaults.dark.step * 2)
          .toString();

    this.skin[_vb.nameBg2Hov] = this.skin[_vb.isDark]
      ? this.tinycolor(this.skin[_vb.nameBg])
          .darken(this.defaults.dark.step * 3)
          .toString()
      : this.tinycolor(this.skin[_vb.nameBg])
          .lighten(this.defaults.light.step * 3)
          .toString();

    this.skin[_vb.nameBg3] = this.skin[_vb.isDark]
      ? this.tinycolor(this.skin[_vb.nameBg])
          .darken(this.defaults.dark.step * 4)
          .toString()
      : this.tinycolor(this.skin[_vb.nameBg])
          .lighten(this.defaults.light.step * 4)
          .toString();

    this.skin[_vb.nameBg3Hov] = this.skin[_vb.isDark]
      ? this.tinycolor(this.skin[_vb.nameBg])
          .darken(this.defaults.dark.step * 5)
          .toString()
      : this.tinycolor(this.skin[_vb.nameBg])
          .lighten(this.defaults.light.step * 5)
          .toString();

    this.skin[_vb.nameRGBATransparent] = this.tinycolor(this.skin[_vb.nameBg])
      .setAlpha(0)
      .toRgbString();
    this.skin[_vb.nameRGBA] = this.tinycolor(this.skin[_vb.nameBg])
      .setAlpha(this.defaults.alpha.bg)
      .toRgbString();
    this.skin[_vb.nameRGBA2] = this.tinycolor(this.skin[_vb.nameBg])
      .setAlpha(this.defaults.alpha.bg2)
      .toRgbString();
    this.skin[_vb.nameRGBA3] = this.tinycolor(this.skin[_vb.nameBg])
      .setAlpha(this.defaults.alpha.bg3)
      .toRgbString();
  }

  generateGradientss(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _isGradient = this.skin[_vb.isGradient];

    if (_isGradient) {
      this.skin[_vb.nameG] = `linear-gradient(${
        this.skin[_vb.gradientAngle]
      }deg, ${this.skin[_vb.nameBg_g]} 0%, ${this.skin[_vb.nameBg]} 100%)`;
    } else {
      this.skin[_vb.nameBg_g] = this.skin[_vb.nameBg2];
      this.skin[_vb.nameG] = this.skin[_vb.nameBg];
    }
  }

  generateTextss(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _isCustomTextActive = this.skin[_vb.isCustomTxt];
    let customTextColor = this.skin[_vb.nameTxt];

    if (_isCustomTextActive) {
      this.skin[_vb.nameTxt] = this.tinycolor(customTextColor)
        .setAlpha(this.defaults.txt.txt)
        .toRgbString();
    } else {
      this.skin[_vb.nameTxt] = this.tinycolor(
        this.mergedConfig[_essence].Text.color
      )
        .setAlpha(this.defaults.txt.txt)
        .toRgbString();
    }

    this.skin[_vb.nameTxt2] = this.tinycolor(this.skin[_vb.nameTxt])
      .setAlpha(this.defaults.txt.txt2)
      .toRgbString();
    this.skin[_vb.nameTxt3] = this.tinycolor(this.skin[_vb.nameTxt])
      .setAlpha(this.defaults.txt.txt3)
      .toRgbString();
  }

  generateAccentss(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _isCustomAccentActive = this.skin[_vb.isCustomAccent];
    let _customAccentColor = this.skin[_vb.nameAccent];
    if (_isCustomAccentActive) {
      this.skin[_vb.nameAccent] = _customAccentColor;
    } else {
      this.skin[_vb.nameAccent] = this.mergedConfig.accent.Background.color;
    }
    console.log(this.mergedConfig.accent.Background.color);
    this.skin[_vb.nameAccentTxt] = this.tinycolor(
      this.mergedConfig.accent.Text.color
    )
      .setAlpha(this.defaults.txt.txt)
      .toRgbString();
  }

  generateBorderss(essence, fbEssence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _vbf;
    if (fbEssence) {
      _vbf = this.verbalData(fbEssence);
      this.skin[_vb.nameBorder] = this.skin[_vbf.nameBorder];
    } else {
      this.skin[_vb.nameBorder] = this.skin[_vb.nameBgHov];
    }
  }

  getFallbackLvl(essence, variation, lvl) {
    let _essence = essence;

    let _variation = variation;
    let _lvl = lvl;
    let _vb = this.verbalData(_essence);

    let _variationsArr = [
      "Bg",
      "BgHover",
      "Bg2",
      "Bg2Hover",
      "Bg3",
      "Bg3Hover",
    ];
    let _bg = _variation
      ? this.skin[_vb.name + _variationsArr[_variation]]
      : this.skin[_vb.name + _variationsArr[_lvl]];

    return _bg;
  }

  init(cfg) {
    this._config = cfg || {};
    this.activeEssences = this.configOrder.filter((c) => {
      return this._config[c.name];
    });
    this.mergedConfig = this.mergeConfig(this._config);
    console.log(this.mergedConfig.accent);
    this.generateTheme();
    return this.skin;
  }

  prerogative(name) {
    return name === "body" || name === "accent" || name === "brand"
      ? true
      : false;
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

  generateOppositeTint(bg) {
    let bg2 = tinycolor(bg2).isDark() ? "#ffffff" : "#000000";
    tinycolor.mix(bg, clr2, 80);
  }

  getReadableText(bg) {
    tinycolor.mostReadable(bg, ["#ffffff", "#000000"]).toHexString();
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

    if (_essence === "body" || _essence === "accent" || _essence === "brand") {
      this.skin[_vd.isName] = true;
    }

    this.skin[_vd.isName] = _config[_essence].Background.isActive;
    let isActive = this.skin[_vd.isName];

    if (isActive) {
      this.skin[_vd.nameBg] = _config[_essence].Background.color;
      this.skin[_vd.isDark] = _config[_essence].Background.isDark;

      this.skin[_vd.isGradient] = _config[_essence].Gradient.isActive;
      this.skin[_vd.nameBg_g] = _config[_essence].Gradient.color;

      this.skin[_vd.nameTxt] = _config[_essence].Text.color;

      this.skin[_vd.nameRadius] = _config[_essence].borderRadius;

      this.generateBackgrounds(_essence);
      this.generateGradientss(_essence);
      this.generateTextss(_essence);
      this.generateAccentss(_essence);
      this.generateBorderss(_essence);

      this.skin[_vd.nameTxtInverse] = this.tinycolor(
        this.skin[_vd.nameTxt]
      ).isLight()
        ? "#262626"
        : "#fff";
    } else {
      let _fbEssence = _config[_essence].fallback.find((f) => {
        let vd = this.verbalData(f);
        return _config[f].editable && this.skin[vd.isName];
      });

      let fbLength = _config[_essence].fallback.length;
      let _vdf = this.verbalData(_fbEssence);

      let variation = _config[_essence].variation;
      this.skin[_vd.nameBg] = this.getFallbackLvl(
        _fbEssence,
        variation,
        fbLength
      );

      this.skin[_vd.isGradient] = this.skin[_vdf.isGradient];
      this.skin[_vd.nameBg_g] = this.skin[_vdf.nameBg_g];
      this.skin[_vd.gradientAngle] = this.skin[_vdf.gradientAngle];
      this.skin[_vd.isCustomTxt] = this.skin[_vdf.isCustomTxt];
      this.skin[_vd.nameTxt] = this.skin[_vdf.nameTxt];
      this.skin[_vd.nameTxt2] = this.tinycolor(this.skin[_vd.nameTxt])
        .setAlpha(this.defaults.txt.txt2)
        .toRgbString();
      this.skin[_vd.nameTxt3] = this.tinycolor(this.skin[_vd.nameTxt])
        .setAlpha(this.defaults.txt.txt3)
        .toRgbString();
      this.skin[_vd.isCustomAccent] = this.skin[_vdf.isCustomAccent];
      this.skin[_vd.nameAccent] = this.skin[_vdf.nameAccent];
      this.skin[_vd.isCustomBorder] = this.skin[_vdf.isCustomBorder];
      this.skin[_vd.nameBorder] = this.skin[_vdf.nameBorder];
      this.skin[_vd.nameRadius] = this.skin[_vdf.nameRadius];
      this.skin[_vd.nameTxtInverse] = this.tinycolor(
        this.skin[_vd.nameTxt]
      ).isLight()
        ? "#262626"
        : "#fff";
      this.generateBackgrounds(_essence, _fbEssence);
      this.generateGradientss(_essence);
      this.generateAccentss(_essence);
      this.generateBorderss(_essence);
    }
  }

  createFallbackArray(essence) {
    let _essence = essence;
    let fbArr = [];
    let fb = _essence.fallback;

    while (fb) {
      fbArr.push(fb);
      fb = this.mergedConfig[fb].fallback;
    }

    return fbArr;
  }
}
