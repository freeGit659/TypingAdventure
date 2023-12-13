const Emitter = require('mEmitter');
const randomWords = require("random-words");

cc.Class({
    extends: cc.Component,
    properties: {  
        indexTyping: 0,
        numSpace: 0,
        numberOfCorrect : 0,

        _textTemp:'',

        word: cc.Label,

        scoreLabel: cc.Label,

        wordsArray: [String],

        typingInput: cc.EditBox,
    },

    onLoad(){
        // Emitter.instance.registerOnce('GameOver', this.onGameOver.bind(this));
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
        // if(this.indexTyping >=5){
        //     this.wordsArray.splice(0, this.wordsLayout.length);
        //     this.indexTyping = 0;
        //     this.setWords();
        //     this.numSpace += 5;
        // }
    },

    setWords(){
        this.word.string = this.wordsArray[0];
        this.word.node.color = new cc.Color(241,214,106);
    },

    onTextChanged(){
        cc.log(this.typingInput.string);
        if(this.typingInput.string.includes(' ')) {
            this.checkMatch(this.typingInput.string.trimEnd());
        }
    },

    checkMatch(input){
        if(this.word.string === input) {
            Emitter.instance.emit('CORRECT');
            this.word.node.color = new cc.Color(0,255,0);
        }
        else {
            Emitter.instance.emit('INCORRECT');
            this.word.node.color = new cc.Color(255,0,0);
        }
        this.wordsArray.shift();
        this.setWords();
        this.clearEditBox();
        this.focus();
    },

    onEnter(){
        this.checkMatch(this.typingInput.string);
        this.clearEditBox();
        this.focus();
    },

    clearEditBox(){
        this.typingInput.string = '';
        this.typingInput.node.getChildByName('TEXT_LABEL').string = '';
        this.typingInput.blur();
    },

    focus(){
        this.typingInput.focus();
    },

    // onGameOver(){
    //     this.typingInput.blur();
    // }

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
