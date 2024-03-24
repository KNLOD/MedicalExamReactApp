import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store"
import { Provider } from "react-redux"
import Patients from './сomponents/Patients';
import Examinations from './сomponents/Examinations';
import { Container } from '@mui/material'

function App() {
  return (
  <Provider store={store}>
    <Patients>

    </Patients>
    <Container  maxWidth="lg">
      <Examinations />
    

    </Container>

  </Provider>
  );
}

export default App;
