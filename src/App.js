import axios from "axios";
import { useEffect, useState } from "react";
import style from "./App.module.css";
import TagsList from "./components/TagsList";
import TagsTable from "./components/TagsTable";
import Unassigned from "./components/Unassigned";
import randomcolor from "randomcolor";


function App() {
  const [data, setdata] = useState([]);
  const [Tags, setTags] = useState([]);
  const [newTag, setnewTag] = useState("");

  useEffect(() => { 
    if(localStorage.getItem("data") ){
            // setTags(JSON.parse(localStorage.getItem("Tags")));
            setdata(JSON.parse(localStorage.getItem("data")));
    }
    else{
      const URL = "https://picsum.photos/v2/list?page=2&limit=10";
      axios
        .get(URL)
        .then(({ data=[] }) => {
          let newData = data.map((pic, i) => {
            return { src: pic.download_url, name: `picture ${i}` };
          })
            setdata(newData);
            localStorage.setItem("data",JSON.stringify(newData))
        })
        .catch((err) => console.error(err));
    }
    if(localStorage.getItem("Tags")){
      setTags(JSON.parse(localStorage.getItem("Tags")));
    }
  }, []);
// localStorage.clear()
  const AddNewTag = (e) => {
    e.preventDefault();

    if (newTag) {
      let color = randomcolor();
      if (checkExisting()) {
        localStorage.setItem(
          "Tags",
          JSON.stringify([...Tags, { name: newTag, arr: [], color }])
        );
        setTags([...Tags, { name: newTag, arr: [], color }]);
      } else {
        alert("Already have this tag");
      }
      setnewTag("");
    }
  };
  const checkExisting = () => {
    for (const tag of Tags) {
      if (tag.name === newTag) {
        return false;
      }
    }
    return true;
  };

  return (
   <div>
      <div className={style.main}>
      <div className={style.Tags_addTags}>
        <form className={style.TagsList}>
          <label htmlFor="newTag">New Tag:</label>
          <input
          id="newTag"
            onChange={(e) => setnewTag(e.target.value)}
            value={newTag}
            placeholder="Write here new tag..."
          />
          <input
            className={style.SaveBtn}
            onClick={AddNewTag}
            type="submit"
            value="Save"
          />
        </form>

        <TagsList Tags={Tags} setTags={setTags} data={data} setdata={setdata} />
      </div>

      <div>
        <Unassigned data={data} setdata={setdata} Tags={Tags} setTags={setTags}/>
      </div>
    </div>
    <TagsTable Tags={Tags} setTags={setTags} data={data} setdata={setdata}/>
   </div>
  );
}

export default App;
