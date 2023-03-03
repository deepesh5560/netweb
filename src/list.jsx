import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function List() {
  const params = new URLSearchParams(window.location.search);
  const pq = params.get("q");
  const [list, setList] = useState([]);
  const [srch, setsrch] = useState();

  useEffect(() => {
    if (!list.length) {
      if (pq) {
        axios
          .get(`https://dummyjson.com/products/search?q=${pq}`)
          .then((res) => {
            setList(res.data?.products);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .get("https://dummyjson.com/products?limit=100")
          .then((res) => {
            setList(res.data.products);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [list, pq]);

  const search = () => {
    axios
      .get(`https://dummyjson.com/products/search?q=${srch}`)
      .then((res) => {
        setList(res.data?.products);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <input type="text" onChange={(e) => setsrch(e.target.value)} />
        <button onClick={() => search()}>search</button>
      </div>
      <div className="list">
        {list.map((data, i) => {
          return (
            <div className="list-card" key={i}>
              <div>{data.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
