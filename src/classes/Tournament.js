import Component from './Component';

export default class Tournament extends Component {
  constructor(data) {
    super();
   // console.log(data);
    this.title = data.name;
    this.matches = data.matches;
    this.id = data.id;
  }


  get template() {
    return(
      `<div class="tournament tournament--${this.id}">
        <div class="tournamentHeader">
          <p class="tournamentHeader__title">${this.title}</p>
          <div class="tournamentHeader__favoritBtn"><img src="./src/img/star.png" alt=""></div>
        </div>
       </div>`
    )
  }

}
