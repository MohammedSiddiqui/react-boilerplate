import { Store } from 'flummox';
import Immutable from 'immutable';

// A Flux store that represents an immutable, ordered list of Flux library
// information.
export default class FluxLibraryStore extends Store {
  constructor(flux) {
    super(flux);

    const messageActionIds = flux.getActionIds('FluxLibrary');
    this.register(messageActionIds.moveUp, this.moveUp);
    this.register(messageActionIds.moveDown, this.moveDown);
    this.registerAsync(messageActionIds.getListItems, this.getListItemsLoadBegin, this.getListItemsLoadSuccess, this.getListItemsLoadFailure);

    this.state = {
      loading: false,
      error: null,
      // We are using an immutable list to ensure the data is not updated
      // outside of the store
      fluxLibraries: Immutable.List()
    };
  }

  // The handler used for the start of an asynchronous network call to load in
  // the flux data.
  getListItemsLoadBegin() {
    this.setState({
      loading: true
    });
  }

  // The handler used when an asynchronous network call to load in the flux
  // data succeeds.
  // @param {array} items - The flux library items
  getListItemsLoadSuccess(items) {
    this.setState({
      loading: false,
      error: null,
      fluxLibraries: Immutable.List(items)
    });
  }

  // The handler used when an asynchronous network call to load in the flux
  // data fails.
  // @param {object} err - The error object returned from the network call
  getListItemsLoadFailure(err) {
    this.setState({
      loading: false,
      error: err
    });
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

    this.setState({
      fluxLibraries: newState
    });
  }
}