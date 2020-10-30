import './assets/styles/core.scss';
import { useSelector } from 'react-redux';
import CustomerQuerySummary from './components/CustomerQuerySummary';
import CustomerQueryForm from './components/CustomerQueryForm';
import logo from './assets/images/logo.png';

function App() {
  const queryData = useSelector((state) => state.customerQuery.data);

  return (
    <div className="App">
      <header className="header">
        <div className="content">
          <h2>
            <img
              src={logo}
              className="logo"
              alt="Medefer - Reframing Healthcare"
            />
            Customer Query
          </h2>
        </div>
      </header>
      <div className="main-content">
        {queryData.firstName ? <CustomerQuerySummary /> : <CustomerQueryForm />}
      </div>
    </div>
  );
}

export default App;
