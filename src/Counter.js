import React, { Component } from 'react';
// 6         15 -> import increment and decrement
import store, { INCREMENT, DECREMENT, REDO, UNDO } from './store';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 7
      store: store.getState()
      // ^ store.getState is possible from the import
    };
  }

  // 19
  componentDidMount() {
    store.subscribe( () => {
      this.setState({ store: store.getState() })
    })
  }
// 16 Make methods
  increment = (amount) => {
    store.dispatch({ type: INCREMENT, amount })
  }

  decrement = (amount) => {
    store.dispatch({ type: DECREMENT, amount })
  }
// 34
  undo = () => {
    store.dispatch({ type: UNDO })
  }
// 35
  redo = () => {
    store.dispatch({ type: REDO })
  }



  render() {
    console.log('state in reducer', this.state);
    // 8
    let { currentValue, futureValues, previousValues } = this.state.store
    // -----8

    return (
      <div className="app">
        <section className="counter">
                                                   {/* 9 change this from 0 to currentValue */}
          <h1 className="counter__current-value">{currentValue}</h1>
          <div className="counter__button-wrapper">
            <button
              className="counter__button increment-one"
              // 17 change null to this.increment(1)
              onClick={() => this.increment(1)}
              // onClick={() => null}  <---it was like this
            >
              +1
            </button>
            <button
              className="counter__button increment-five"
              onClick={() => this.increment(5)}
            >
              +5
            </button>
            <button
              className="counter__button decrement-one"
              onClick={() => this.decrement(1)}
            >
              -1
            </button>
            <button
              className="counter__button decrement-five"
              onClick={() => this.decrement(5)}
            >
              -5
            </button>
            <br />
            <button
              className="counter__button undo"
              disabled={previousValues.length === 0}
              onClick={() => this.undo()}
            >
              Undo
            </button>
            <button
              className="counter__button redo"
              disabled={futureValues.length === 0}
                              // 36
              onClick={() => this.redo()}
            >
              Redo
            </button>
          </div>
        </section>
        <section className="state">
          <pre>{JSON.stringify(this.state.store, null, 2)}</pre>
        </section>
      </div>
    );
  }
}

export default Counter;
