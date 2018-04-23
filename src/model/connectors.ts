import RegisterConnectors from '../graphql-gen/data/registerConnectors';

import User from '../graphql-gen/data/User/adapter/connector';
import ToDoItem from '../graphql-gen/data/ToDoItem/adapter/connector';
import { UserConnector } from '../graphql-gen/data/User/adapter/interface';
import { ToDoItemConnector } from '../graphql-gen/data/ToDoItem/adapter/interface';

export default class DataConnectors extends RegisterConnectors {
  public get Viewer(): UserConnector {
    if (!this._Viewer) {
      this._Viewer = new User({ mongoose: this.mongoose, connectors: this, securityContext: this.securityContext });
    }
    return this._Viewer;
  }
  protected _Viewer: User;
}
