import { useEffect, useState } from 'react';
import './app.scss'

function App() {
  const [data, setData] = useState({
    // results: []
  });

  const [users, setUsers] = useState([]);

  const [searchData, setSearchData] = useState('');
  
  const {results} = data;

  useEffect(() => {
    // console.log('Fetching data')
    // fetch("https://randomuser.me/api/?inc=name,picture&results=100")
    // .then((data) => {return data.json()})
    // .then((data) => {setData(data)})
    // .catch((err) => {console.log(err.message)})

    (async() => {
      console.log('hello')
      const rawData = await fetch("https://randomuser.me/api/?inc=name,picture&results=100");
      const data = await rawData.json();
      setData(data);
      setUsers(data.results || [])
    })();
  }, []);

  useEffect(() => {
    const newUsers = results?.filter((user) => {

      const fullName = `${user.name.title}${user.name.first}${user.name.last}`
      if (
        fullName.toLowerCase().replaceAll(' ','').includes(searchData)
      ){
        return true;
      }
      return false;
    });
    setUsers(newUsers || []);

  }, [searchData]);

  return (
    <div id="app">
      <h1>List of users</h1>
      <div className="container">
      <input 
          id="filter" 
          className="form-control mb-3 form-control-lg" 
          placeholder="Type to filer..."
          onChange={(event) => {
            setSearchData(event.target.value.toLowerCase().replaceAll(' ',''))
          }}
        />
        <div className="users row">

          {
            users.map((item, index) => {

              const finalName = `${item.name.title} ${item.name.first} ${item.name.last}`;
              return <div className="col-2 user" key={`item-${index}`}>
              <img src={item.picture.thumbnail} alt={finalName}/>
              <h3>{finalName}</h3>
              <button
                onClick = {(console.log('hello'))}
              >
                Show me
              </button>
            </div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
