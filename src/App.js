import './App.css';
import NavigationBar from './components/NavigationBar';
import PubsList from './components/PubsList';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <>
      <NavigationBar user={null} />
      <PubsList />
    </>
  );
}
