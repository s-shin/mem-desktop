module.exports = {
  "externals": [
    // NOTE: Why this setting is required for codemirror?
    // Because:
    // * The codemirror package is appended to [externals](https://webpack.js.org/configuration/externals/)
    //   by electron-webpack (see [the document](https://webpack.electron.build/configuration#white-listing-externals)).
    //     * The codemirror instance got by `import * as codemirror from "codemirror";`
    //       is the external (dynamically required by commonjs) thing.
    // * Without this configuration, the plugin modules for example got by `import "codemirror/mode/javascript/javascript"`
    //   is bundled to the entry script.
    //     * In each plugin module, codemirror's main module is imported by relative path
    //       (e.g. [codemirror/mode/javascript/javascript](https://github.com/codemirror/CodeMirror/blob/5.33.0/mode/javascript/javascript.js#L6)),
    //       so the main module is also bundled.
    //     * **The bundled main module is different from the external main module.**
    //       This breaks the plugin system of codemirror.
    /^codemirror\/(mode|keymap)\/.+$/,
  ]
};
