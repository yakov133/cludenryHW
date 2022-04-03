import { useEffect, useState } from "react";
import style from "./tagstable.module.css";

function TagsTable({ Tags, setTags, data, setdata }) {
  const [show, setshow] = useState(Tags);

  useEffect(getTags, []);
  useEffect(getTags,[Tags])

  const handelsearch = (e) => {
    if (e.target.value) {
      let tempTags = [];
      for (let i = 0; i < show.length; i++) {
        if (show[i].name.includes(e.target.value)) {
          tempTags.push(show[i]);
        }
      }
      setshow(tempTags);
    } else {
      getTags();
    }
  };
  
  function getTags(){
    if (localStorage.getItem("Tags")) {
      setshow(JSON.parse(localStorage.getItem("Tags")));
    }
  };
  
  const deletePic = (name,index,tag ,indexTag)=>{
    if(window.confirm(`remove ${name} from ${tag} tag? ${index} ${indexTag} `)){
      let tempTags = [...show];
      let pic = tempTags[indexTag].arr[index];
      let tempData = [...data,pic];
      tempTags[indexTag].arr.splice(index,1)
      localStorage.setItem("Tags",JSON.stringify(tempTags))
      localStorage.setItem("data",JSON.stringify(tempData))

      setdata(tempData)
      setTags(tempTags)
    }
  }
  return (
    <div>
      <h1>Tags Table Information</h1>

      <div className={style.search}>
        <label htmlFor="search">Search Tags:</label>
        <br />
        <br />
        <input
          type="text"
          onChange={handelsearch}
          id="search"
          placeholder="serach by tag..."
        />
      </div>
      <div className={style.tagsTable}>
        {show &&
          show.map((tag, i) => (
            <table key={i}>
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: `${tag.color}`,
                      borderRadius: "0.5rem",
                    }}
                  >
                    {tag.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tag.arr.map((elm, picI) => (
                  <tr key={picI}>
                    <td>
                      <img src={elm.src} alt={elm.name} />
                      <div>
                      <p>{elm.name} </p>
                      <section className={style.delete} onClick={()=>deletePic(elm.name,picI,tag.name,i)}> X</section>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
      </div>
    </div>
  );
}

export default TagsTable;
