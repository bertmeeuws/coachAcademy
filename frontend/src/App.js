import './App.css';
import {
  BrowserRouter,
  Route,
} from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";
import Login from "./content/authentication/Login"
import RegisterClient from "./content/authentication/RegisterClient"
import RegisterCoach from "./content/authentication/RegisterCoach"
import Header from './components/Header/'
import Sidebar from './components/Sidebar/'
import Dashboard from './content/coach/Dashboard'
import Clients from './content/coach/Clients'
import Todos from './content/coach/Todos'
import Calendar from './content/Calendar'
import Inbox from './content/Inbox'
import Chat from './content/Chat'
import Documents from './content/Documents'
import Client from './content/coach/Client'
import ClientDashboard from './content/client/dashboard'

const GRAPHQL_ENDPOINT = "localhost:8085/v1/graphql";

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});


function App() {
  return (
    <BrowserRouter>
    <ApolloProvider client={client}>
    <Route exact path="/login">
    <Login/>
    </Route>
    <Route exact path="/registerclient">
    <RegisterClient/>
    </Route>
    <Route exact path="/registercoach">
    <RegisterCoach/>
    </Route>
    <Route exact path="/dashboard">
      <div className="content-grid">
          <Sidebar/>
          <div className="container-grid">
          <Header title="Client"/>
          <Dashboard/>
          </div>
        </div>
    </Route>
    <Route exact path="/clients">
      <div className="content-grid">
          <Sidebar/>
          <div className="container-grid">
          <Header title="Clients"/>
          <Clients/>
          </div>
        </div>
    </Route>

    <Route exact path="/calendar">
      <div className="content-grid">
          <Sidebar/>
          <div className="container-grid">
          <Header title="Calendar"/>
          <Calendar/>
          </div>
        </div>
    </Route>
    <Route exact path="/inbox">
      <div className="content-grid">
          <Sidebar/>
          <div className="container-grid">
          <Header title="Inbox"/>
          <Inbox/>
          </div>
        </div>
    </Route>
    <Route exact path="/chat">
      <div className="content-grid">
          <Sidebar/>
          <div className="container-grid">
          <Header title="Chat"/>
          <Chat/>
          </div>
        </div>
    </Route>
    <Route exact path="/documents">
      <div className="content-grid">
          <Sidebar/>
          <div className="container-grid">
          <Header title="Documents"/>
          <Documents/>
          </div>
        </div>
    </Route>
    <Route exact path="/client">
      <div className="content-grid">
          <Sidebar/>
          <div className="container-grid">
          <Header title="Client overview"/>
          <Client/>
          </div>
        </div>
    </Route>
    <Route exact path="/clientdashboard">                       
          <ClientDashboard/>
    </Route>
    <Route exact path="/todos">
      <div className="content-grid">
          <Sidebar/>
          <div className="container-grid">
          <Header title="Todos"/>
          <Todos/>
          </div>
        </div>
    </Route>
    </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
