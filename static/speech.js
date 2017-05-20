var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent

class WormsSpeachRecognizer {
  constructor(commands) {
    this.commands = commands
    var grammar =
      '#JSGF V1.0; grammar commands; public <command> = ' +
      commands.join(' | ') +
      ' ;'
    this.recognition = new SpeechRecognition()
    // this.recognition.continuous = true
    var speechRecognitionList = new SpeechGrammarList()
    speechRecognitionList.addFromString(grammar, 1)
    this.recognition.grammars = speechRecognitionList

    this.recognition.lang = 'ru-RU'
    this.recognition.interimResults = false
    this.recognition.maxAlternatives = 1

    this.recognition.onspeechend = () => {
      this._started = false
      this.recognition.stop()
    }
    this.recognition.onend = () => {
      this.start()
    }
  }

  start() {
    if (this._started) {
      return
    }
    this.recognition.start()
    this._started = true
  }

  onResult(handler) {
    this.recognition.onresult = function(event) {
      var last = event.results.length - 1
      var command = event.results[last][0].transcript
      console.log(command)
      // speechSynthesis.speak(new SpeechSynthesisUtterance(command))
      window.navigator.vibrate(300)
      handler(command)
    }
  }
}
