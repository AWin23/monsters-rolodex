import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

//  functional components, anytime it renders or RErenders...runs the code inside this function top to bottom each and erry time
const App = () => {
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);
  //const [stringField, setStringField] = useState('');

    useEffect(() => { 
      fetch('https://jsonplaceholder.typicode.com/users')  // Fetch whatever data it can from here
        .then((response) => response.json())
        .then((users) => setMonsters(users)
        );
    }, []);

    useEffect(() => {
      const newFilteredMonsters = monsters.filter((monster) => {
        return monster.name.toLocaleLowerCase().includes(searchField);
      });

      setFilterMonsters(newFilteredMonsters); 

      console.log('effect is firing');
    }, [monsters, searchField]);

  const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        setSearchField(searchFieldString);
      };

  return (
    <div className='App'>
      <h1 className="app-title">Monsters Rolodex</h1>
      <h2 className="app-subtitle">A React Demo Project</h2>

      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />
      <CardList monsters={filteredMonsters}  />
    </div>
  )
}


// Function returns specific HTML that represents "app"
// Components are pieces of code that contain UI elements for the website
// They are self-contained representations of JS and HTML
// Basically, all that React is
// class App extends Component {

//   // Local state is something that THIS component can read and modify from
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//   }

//   // Mounting is when the first component gets placed on the dock
  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')  // Fetch whatever data it can from here
  //     .then((response) => response.json())
  //     .then((users) => 
  //       this.setState(() => {
  //         return { monsters: users }
  //       })
  //     );
  // }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     // [{ name: 'Leanne' }, {name: 'Yihua'} ]

//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = this.state.monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className='App'>
//         <h1 className="app-title">Monsters Rolodex</h1>

//         <SearchBox
//           className='monsters-search-box'
//           onChangeHandler={onSearchChange}
//           placeholder='search monsters'
//         />
//         <CardList monsters={filteredMonsters}  />
//       </div>
//     );
//   }
// }

export default App;
