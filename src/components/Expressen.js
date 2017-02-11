import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import markjs from 'mark.js/dist/mark.js';
import series from 'async-series';
import ExpressenLogo from '-!babel!svg-react!../../build/images/logo-e.svg';

class Expressen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
    this.getArticles = this.getArticles.bind(this);
  }
  componentDidMount() {
    this.getArticles();
  }
  getArticles() {
    const url = '../../data/ex.json';
    axios.get(url)
      .then(res => {
        this.setState({
          articles: res.data
        });
      })
      .then(() => {
        document.querySelector('.articles--expressen').classList.remove('loading');
        this.markWords();
      })
  }
  markWords(title) {
    axios.get('../../data/words.json')
      .then(function(res) {
        const words = res.data;
        const elements = document.querySelectorAll('li a');
        Array.prototype.forEach.call(elements, function(el, i) {
          for (let i = 0; i < words.length; i++) {
            if (el.innerHTML.indexOf(words[i])) {
              const instance = new Mark(document.querySelector(".articles--expressen"));
              instance.mark(words[i], {
                "accuracy": "complementary"
              });
            }
          }
        });
      });

  }
  renderArticle() {
    return this.state.articles.map((article, index) => {
      return (<li key={index}>
                <a href={article.url.includes('expressen') ? article.url : `http://expressen.se${article.url}`}>
                  {article.title}
                </a>
              </li>);
    });
  }
  render() {
    return (
      <section className='col col__expressen'>
        <div className='logo'>
          <ExpressenLogo className='normal' />
          <span className='count'>{this.state.articles.length}</span>
        </div>
        <ul className='articles articles--expressen loading'>
          {this.renderArticle()}
          {this.props.children}
        </ul>
      </section>
      );
  }
}
export default Expressen;