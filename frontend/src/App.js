import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';


function App() {



  function handleClick(){
    fetch('diningtable', {
      method: 'GET',
    })
    .then((data) => data.json())
    .then((json) => {console.log(json);})
    }
  return (
    <div className="App">
            <div>
        <Button onClick={handleClick} className="btn btn-primary">
Button
        </Button>
      </div>
    </div>
  );
}

export default App;
