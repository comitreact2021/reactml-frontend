import './App.css';
import NavigationBar from './components/NavigationBar';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return <NavigationBar user={{ name: 'Elon', email: 'pepe@gmail.com' }} />;
}
