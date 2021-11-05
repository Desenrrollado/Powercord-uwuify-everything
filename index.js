const { Plugin } = require('powercord/entities')

module.exports = class UwuifyEverything extends Plugin {
  startPlugin() {
    this.uwuObserver.observe(document.body, {
      childList: true,
      attributes: true,
      subtree: true
    })
  }

  uwuObserver = new MutationObserver(() => this.walkText(document.body))

  faces = ['(*^ω^)', '(◕‿◕✿)', '(◕ᴥ◕)', 'ʕ•ᴥ•ʔ', 'ʕ￫ᴥ￩ʔ', '(*^.^*)', 'owo', '(｡♥‿♥｡)', 'uwu', '(*￣з￣)', '>w<', '^w^', '(つ✧ω✧)つ', '(/ =ω=)/']

  walkText(node) {
    if (node.nodeType == 3) node.data = node.data
      .replace('th','d')
      .replace('Th','D')
      .replace(/(?:l|r)/g, 'w')
      .replace(/(?:L|R)/g, 'W')
      .replace(/n([aeiou])/g, 'ny$1')
      .replace(/N([aeiou])/g, 'Ny$1')
      .replace(/N([AEIOU])/g, 'Ny$1')
      .replace(/ove/g, 'uv')
      .replace(/th/g, 'ff')
      .replace(/\!+/g, ' ' + this.faces[Math.floor(Math.random() * this.faces.length)] + ' ')
      .replace(/\./g, ' ' + this.faces[Math.floor(Math.random() * this.faces.length)] + ' ')
      .replace(/\,/g, ' ' + this.faces[Math.floor(Math.random() * this.faces.length)] + ' ')

    if (node.nodeType == 1 && node.nodeName != 'SCRIPT' && node.getAttribute('contenteditable') !== "true") {
      for (var i = 0; i < node.childNodes.length; i++) {
        this.walkText(node.childNodes[i]);
      }
    }
  }

  pluginWillUnload() {
    this.uwuObserver.disconnect()
  }
};
