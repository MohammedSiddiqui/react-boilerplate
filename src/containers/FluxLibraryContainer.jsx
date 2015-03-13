import React from 'react';
import FluxLibraryList from '../components/FluxLibraryList';

// A container that translates Flux state into component properties.
class FluxLibraryContainer extends React.Component {
  // Requests a Flux library to be moved down within the list
  // @param {object} fluxLibrary - The flux library object to move down the
  //                               list.
  moveLibraryDown(fluxLibrary) {
    this.props.actions.moveDown(fluxLibrary);
  }

  // Requests a Flux library to be moved up within the list
  // @param {object} fluxLibrary - The flux library object to move up the list.
  moveLibraryUp(fluxLibrary) {
    this.props.actions.moveUp(fluxLibrary);
  }

  render() {
    if (this.props.store && this.props.actions) {
      const fluxState = this.props.store.getState();

      return (<FluxLibraryList fluxLibraries={fluxState.fluxLibraries}
                               onMoveLibraryUp={this.moveLibraryUp.bind(this)}
                               onMoveLibraryDown={this.moveLibraryDown.bind(this)} />);
    } else {
      return (<div></div>);
    }
  }
}

FluxLibraryContainer.propTypes = {
  store: React.PropTypes.object,
  actions: React.PropTypes.object
};

export default FluxLibraryContainer;