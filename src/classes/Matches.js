import Component from './Component';

export default class Matches extends Component {
  constructor({ id, pub_date, raw_status, result, status, teams,time, favorite = false }) {
    super();
    this.id = id;
    this.pub_date = pub_date;
    this.raw_status = raw_status;
    this.result = result;
    this.status = status;
    this.teams = teams;
    this.time = time;
    this.favorite = Boolean(favorite);
    this._onChange = null;
  }

  bind() {
    this._element.querySelector('.matches__check')
      .addEventListener('change', this._handlerFavorite.bind(this));
  }
  unbind(){
    this._element.querySelector('.matches__check')
      .removeEventListener('change', this._handlerFavorite.bind(this));
  }

  _handlerFavorite(evt) {
    evt.preventDefault();
    this.favorite = !this.favorite;
    if(typeof this._onChange === 'function'){
      this._onChange()
    }
    this._reRender();
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  _reRender() {
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }


  get template() {
    return (`<div><div class="matches matches--${this.id}">
          <span class="matches__time">${this.time}</span>
          <span class=" matches__teams">${this.teams}</span>
          <span class="matches__result">${this.result}</span>
          <span class="matches__status ${this.raw_status}">${this.status}</span>
          <label for="favorites-${this.id}" class="matches__label">
          <input type="checkbox" 
                  id="favorites-${this.id}" 
                  name="favorites" 
                  class="${this.raw_status !== 'dns' ? 'hidden' : 'show'} matches__check"
                  ${this.favorite && "checked"}>
          </label>
        </div></div>`);
  }
}
