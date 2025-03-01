import View from './view'

export default class ToDoToday extends View {
  constructor(container) {
    super(container)
    this.btnToday = document.getElementById('today')

    this.btnToday.addEventListener('click', this.show.bind(this))
  }

  show() {
    this.render(`To do task today`)
  }
}
