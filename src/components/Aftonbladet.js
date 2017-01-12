import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import markjs from 'mark.js/dist/mark.js';
import AftonbladetLogo from '-!babel!svg-react!../../build/images/logo-a.svg';

class Aftonbladet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
    this.getArticles = this.getArticles.bind(this);
  }
  componentDidMount() {
    this.getArticles();
    this.markWords();
  }
  getArticles() {
    const url = '../../data/af.json';
    axios.get(url)
      .then(res => {
        this.setState({
          articles: res.data
        });
      })
      .then(() => {
        document.querySelector('.articles--aftonbladet').classList.remove('loading');
      })
  }
  markWords(title) {
    axios.get('../../data/words.json')
      .then(function(res) {
        const words = res.data;
        var elements = document.querySelectorAll('li a');
        Array.prototype.forEach.call(elements, function(el, i) {
          for (var i = 0; i < words.length; i++) {
            if (el.innerHTML.indexOf(words[i].replace(/[0-9]/g, ''))) {
              var instance = new Mark(document.querySelector('.articles--aftonbladet'));
              instance.mark(words[i].replace(/[0-9]/g, ''), {
                "accuracy": "complementary"
              });
            }
          }
        });
      });

  }
  renderArticle() {
    return this.state.articles.map((article, index) => {
      return (<li key={ index }>
                <a href={ article.url }>
                  { article.title }
                </a>
              </li>);
    });
  }
  render() {
    return (
      <section className="col col__aftonbladet">
        <div className="logo">
          <AftonbladetLogo className='normal' />
          <ul className="articles articles--aftonbladet loading">
            { this.renderArticle() }
            { this.props.children }
          </ul>
        </div>
      </section>
      );
  }
}
export default Aftonbladet;