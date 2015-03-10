import * as less from './init.less';
import React from 'react';
import Router from 'react-router';
import routes from './routes';

const { HashLocation, HistoryLocation } = Router;

Router.run(routes, function(Handler) {
  return React.render(<Handler />, document.body);
});