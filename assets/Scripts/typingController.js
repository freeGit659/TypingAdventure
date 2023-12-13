const Emitter = require('mEmitter');
const randomWords = require("random-words");

cc.Class({
    extends: cc.Component,
    properties: {  
        indexTyping: 0,
        numSpace: 0,
        numberOfCorrect : 0,

        _textTemp:'',

        words: [cc.Label],
        row1: cc.Node,
        row2: cc.Node,
        wordsLayout: [cc.Label],
        wordsLayout2: [cc.Label],

        scoreLabel: cc.Label,

        wordsArray: [String],

        typingInput: cc.EditBox,
        clock: cc.Node,
    },

    onLoad(){
        Emitter.instance.registerOnce('GameOver', this.onGameOver.bind(this));
    },

    start () {
        this._wordsArray = randomWords(1000);
        this.wordsArray = this._wordsArray.filter(function(element){
            return element.length <= 8;
        });
        this.setWords();
        this.focus();
    },

    update (dt) {
        if(this.indexTyping >=5){
            this.wordsArray.splice(0, this.wordsLayout.length);
            this.indexTyping = 0;
            this.setWords();
            this.numSpace += 5;
        }
    },

    setWords(){
        this.wordsLayout = [];
        this.wordsLayout2 = [];
        for(let i = 0; i < this.row1.childrenCount; i++){
            this.wordsLayout.push(this.row1.getChildByName(`Word `+i).getComponent(cc.Label));
            this.wordsLayout[i].string = this.wordsArray[i];
            this.wordsLayout[i].node.color = new cc.Color(255,255,255);
        }
        for(let j = 0; j < this.row2.childrenCount; j++){
            this.wordsLayout2.push(this.row2.getChildByName(`Word `+j).getComponent(cc.Label));
            this.wordsLayout2[j].string = this.wordsArray[j+this.row1.childrenCount];
            this.wordsLayout[j].node.color = new cc.Color(255,255,255);
        }
        this.wordsLayout[this.indexTyping].node.color = new cc.Color(241,214,106);
    },

    onTextChanged(){
        this.clock.getComponent('clock').isTyping = true;
        if(this.typingInput.string.includes(' ')) {
            this.checkMatch(this.typingInput.string.trimEnd());
        }
    },

    checkMatch(input){
        if(this.wordsLayout[this.indexTyping].string === input) {
            this.numberOfCorrect++;
            Emitter.instance.emit('CORRECT');
            this.wordsLayout[this.indexTyping].node.color = new cc.Color(0,255,0);
        }
        else {
            Emitter.instance.emit('INCORRECT');
            this.wordsLayout[this.indexTyping].node.color = new cc.Color(255,0,0);
        }
        this.indexTyping++;
        if(this.indexTyping < 5) {
            this.wordsLayout[this.indexTyping].node.color = new cc.Color(241,214,106);
        }
        this.clearEditBox();
    },

    onEnter(){
        this.checkMatch(this.typingInput.string);
    },

    clearEditBox(){
        this.typingInput.string = '';
        this.typingInput.node.getChildByName('TEXT_LABEL').string = '';
        this.focus();
    },

    focus(){
        this.typingInput.focus();
    },

    onGameOver(){
        this.typingInput.blur();
    }

    // restartGame(){
    //     this.textLabel.string = '';
    //     this.typingInput.string= '';
    //     this.wpm = 0;
    //     this.indexTyping = 0;
    //     this.numSpace = 0;
    //     this._textTemp = '';
    //     this.caseTest = randomParagraph();
    //     this.wordsArray = this.caseTest.split(' ');
    //     this.setWords();
    //     this.clock.getComponent('clock').restartGame();
    // },
});
