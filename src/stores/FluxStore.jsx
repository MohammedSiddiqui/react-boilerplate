import Marty from 'marty/dist/node/marty';
import Immutable from 'immutable';
import FluxConstants from '../constants/FluxConstants';

// A Flux store that represents an immutable, ordered list of Flux library
// information.
export default class FluxStore extends Marty.Store {
  constructor(options) {
    this.handlers = {
      moveUp: FluxConstants.MOVE_UP,
      moveDown: FluxConstants.MOVE_DOWN
    };

    super(options);
  }

  getInitialState() {
    return {
      // We create our immutable data list of Flux libraries.
      fluxLibraries: Immutable.List([
        {
          name: 'Marty',
          url: 'https://github.com/jhollingworth/marty'
        },
        {
          name: 'minimal-flux',
          url: 'https://github.com/malte-wessel/minimal-flux'
        },
        {
          name: 'Flummox',
          url: 'https://github.com/acdlite/flummox'
        },
        {
          name: 'Fluxxor',
          url: 'https://github.com/BinaryMuse/fluxxor'
        },
        {
          name: 'Reflux',
          url: 'https://github.com/spoike/refluxjs'
        }
      ])
    };
  }

  // Moves a Flux library up the list within `this.state.fluxLibraries`.
  // @param {object} fluxLibrary - The flux library object to move up the list.
  moveUp(fluxLibrary) {
    const index = this.state.fluxLibraries.indexOf(fluxLibrary);

    if (index <= 0) {
      return;
    }

    const newIndex = index - 1;

    this.swapIndexes(newIndex, index);
  }

  // Moves a Flux library down the list within `this.state.fluxLibraries`.
  // @param {object} fluxLibrary - The flux library object to move down the
  //                               list.
  moveDown(fluxLibrary) {
    const index = this.state.fluxLibraries.indexOf(fluxLibrary);

    if (index >= this.state.fluxLibraries.size - 1) {
      return;
    }

    const newIndex = index + 1;

    this.swapIndexes(index, newIndex);
  }

  // Swaps two adjacent items within `this.state.fluxLibraries`.
  // @param {number} a - The index closest to the beginning of the array
  //                     representing the first item to be swapped.
  // @param {number} b - The index futhest from the beginning of the array
  //                     representing the second item to be swapped.
  swapIndexes(a, b) {
    const newOrder = this.state.fluxLibraries.slice(a, b + 1).reverse().toArray();
    const newState = this.state.fluxLibraries.splice(a, 2, ...newOrder);

    this.state.fluxLibraries = newState;
    this.hasChanged();
  }
}