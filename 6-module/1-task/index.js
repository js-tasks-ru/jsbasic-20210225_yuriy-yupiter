/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(users) {
    this.elem = document.createElement('table');
    this.users = users;
    this.render();
    this.addEventListener();
  }

  userTableTemplate = (arrayOfUsers) => {
    return `
            <table>
              ${this.headerTableTemplate()}
              <tbody>
                  ${this.bodyTableTemplate(arrayOfUsers)}
              </tbody>
            </table>
          `;
  }

  headerTableTemplate() {
    return `
            <thead>
                <tr>
                  <th>Имя</th>
                  <th>Возраст</th>
                  <th>Зарплата</th>
                  <th>Город</th>
                  <th></th>
                </tr>
            </thead>
          `;
  }

  bodyTableTemplate(arrayOfUsers) {
    let tableInner = arrayOfUsers.map(user => {
      let cellsWithData = Object.values(user)
        .map(value => `<td>${value}</td>`)
        .join('');
      return `
          <tr>
            ${cellsWithData}
            <td><button data-action="remove">X</button></td>
          </tr>
        `;
    }).join('');
    return `${tableInner}`;
  }

  render() {
    const template = this.userTableTemplate(this.users);
    this.elem.innerHTML = template;
  }

  addEventListener() {
    this.elem.addEventListener('click', (event) => this.onClick(event));
  }

  onClick({target}) {
    if (target.dataset.action !== 'remove') {
      return;
    }
    let tr = target.closest('tr');
    tr.remove();
  }
}
