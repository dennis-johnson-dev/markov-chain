// // @flow

import React from 'react';
import ReactDOM from 'react-dom';

import Markov from './lib/markov';

import './styles/styles.scss';

// type Props = {
//
// };
//
// type State = {
//   value: string
// };

export default class App extends React.Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      markov: new Markov(''),
      results: [],
      value: ''
    };
  }

  render() {
    return (
      <div>
        <textarea
          className="source-text"
          onChange={this.handleChange}
          value={this.state.value}
        />
        <button onClick={this.generate}>Generate</button>
        <button onClick={this.clearResults}>Clear Results</button>
        <ul className="results">
            {
              this.state.results.map((result, i) => {
                return <li className="results-item" key={i}>{result}</li>;
              })
            }
        </ul>
      </div>
    );
  }

  clearResults = () => {
    this.setState({
      results: []
    });
  }

  generate = () => {
    const newChain = this.state.markov.generate();
    const results = this.state.results;
    results.push(newChain);

    this.setState({
      results
    });
  }

  handleChange = (event) => {
    const markov = new Markov(event.target.value);

    this.setState({
      markov,
      value: event.target.value
    });
  }
};
