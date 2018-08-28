const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        remindLabel: {
            default: null,
            type: cc.Label
        },
        inputUrlBox: {
            default: null,
            type: cc.EditBox
        },
        picNode: {
            default: null,
            type: cc.Sprite
        },
        _picUrl: 'http://www.cocos.com/wp-content/themes/cocos/img/download1.png',
    },

    onLoad () {
        this.remindLabel.textKey = '';
    },

    startLoad () {
        // set url
        if (this.inputUrlBox && this.inputUrlBox.string) {
            this._picUrl = this.inputUrlBox.string;
        }
        // download pic
        if (this._picUrl) {
            cc.loader.load({url: this._picUrl, type: 'png'}, this.onProgress.bind(this), this.picLoadComplete.bind(this));
            this.remindLabel.textKey = i18n.t('cases/05_scripting/11_network/download-web.fire.2');
        }
    },

    picLoadComplete (err, res) {
        if (err) {
            console.log(err);
            this.remindLabel.textKey =  i18n.t('cases/05_scripting/11_network/download-web.fire.5.2');
            return;
        }
        this.remindLabel.textKey = i18n.t('cases/05_scripting/11_network/download-web.fire.4.2');

        let spriteFrame = new cc.SpriteFrame(res);
        this.picNode.spriteFrame = spriteFrame;
        this.picNode.node.active = true;
    },

    onProgress (completedCount, totalCount) {
        this.remindLabel.textKey = `${i18n.t('cases/05_scripting/11_network/download-web.fire.3')} ${(completedCount/totalCount) * 100}`;
    },

});
