import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";


import { Provider } from "react-redux"
import Layout  from "./components/Layout";
import Patients from './components/Patients';
import PatientForm from './components/PatientForm';
import Examinations from './components/Examinations';

function App() {
  return (
  <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Patients />} />
            <Route path="examinations" element={<Examinations />} />
            <Route path="patients" element={<Patients />} />
            <Route path="add_patient" element={<PatientForm />} />
          </Route>
        </Routes>
      </Router>


  </Provider>
  );
}

export default App;
