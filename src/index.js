import './style.pcss';
import DB from './data';
import Tournament from './classes/Tournament';
import Matches from './classes/Matches';

const TournamentListElements = document.querySelector('#app');
const favoritesCountElement = document.querySelector('.checkBlock__btn.favorites span');
const allCountElement = document.querySelector('.checkBlock__btn.today span');
const TodayBtn = document.querySelector('.checkBlock__btn.today');
const FavoritesBtn = document.querySelector('.checkBlock__btn.favorites');

let allCount = 0;
let favoritesMatches = new Map();

TodayBtn.addEventListener('click', function() {
  TodayBtn.classList.add('active');
  FavoritesBtn.classList.remove('active');
  TournamentListElements.innerHTML = ''
  renderTournament(DB)
});

FavoritesBtn.addEventListener('click', function() {
  FavoritesBtn.classList.add('active');
  TodayBtn.classList.remove('active');

  rerenderFavoritesList()
});
function rerenderFavoritesList() {
  TournamentListElements.innerHTML = ''
  let temp = [];
  for(let item of DB){
    if(item.matches){
      for(let match of item.matches){
        if(favoritesMatches.has(match.id)){
          temp.push(match)

        }
      }
    }
  }
  renderMatch(temp)
}


function rerenderavoritesMatchesElement() {
  favoritesCountElement.innerHTML = favoritesMatches.size;
}

function hasClass( target, className ) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}

function renderMatch(matches) {
  for (let match of matches) {
    let favorite = favoritesMatches.has(match.id);
    console.log(match.id);
    console.log(favoritesMatches.has(match.id));
    console.log(favorite);
    let matchesBlock = new Matches(
      { ...match, favorite: favorite });
    TournamentListElements.appendChild(matchesBlock.render());
    matchesBlock.onChange = () => {
      if (matchesBlock.favorite) {
        favoritesMatches.set(matchesBlock.id, matchesBlock.id);
      } else {
        favoritesMatches.delete(matchesBlock.id);
      }
      rerenderavoritesMatchesElement();
      localStorage.setItem('favorites', JSON.stringify(Array.from(favoritesMatches.entries())));
      if(hasClass(FavoritesBtn,'active')){
        rerenderFavoritesList()
      }
    };
  }
  allCountElement.innerHTML = allCount;
}

function renderTournament(tournaments) {
  allCount = 0;
  if (tournaments.length) {
    TournamentListElements.innerHTML = '';
    for (let tournament of tournaments) {
      let tournamentBlock = new Tournament(tournament);
      TournamentListElements.appendChild(tournamentBlock.render());
      let matches = tournament.matches;
      if (matches) {
        allCount+=matches.length;
        renderMatch(matches)
      }
    }
  }
}


window.onload = function() {
  if (localStorage.getItem('favorites')) {
    favoritesMatches = new Map((JSON.parse(localStorage.getItem('favorites'))));
    rerenderavoritesMatchesElement();
  }

  renderTournament(DB);

};
