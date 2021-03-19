function toggleText() {
  let toggleButton = document.querySelector('.toggle-text-button');
  let hiddenElement = document.getElementById('text');

  toggleButton.addEventListener('click', () => {

    hiddenElement.hidden = !hiddenElement.hidden;
  });
}
