class View {
  constructor(container) {
    this.viewContainer = document.querySelector(container)
  }
  append(element) {
    this.viewContainer.append(element)
  }

  render(template) {
    this.viewContainer.innerHTML = template
  }
}

export default View
