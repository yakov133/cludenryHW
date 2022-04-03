import React, { useState } from "react";
import style from "./tagslist.module.css";

function TagsList({ Tags, setTags, data,setdata }) {
  const [flage, setflage] = useState(false);
  const [newName, setnewName] = useState("");
  const [clickedName, setclickedName] = useState("")
  

  const handeleDelete = (name) => {
    let temp = [...Tags];
    let tempArrOfPicturs;
    let tempData;
    if (window.confirm("do you sure you want to delete?")) {
      for (let index = 0; index < temp.length; index++) {
        if (temp[index].name === name) {
          tempArrOfPicturs = temp[index].arr
          temp.splice(index, 1);
          break;
        }
      }
      tempData = [...data,...tempArrOfPicturs]
      localStorage.setItem("Tags", JSON.stringify(temp));
      localStorage.setItem("data",JSON.stringify(tempData))
      setTags(temp);
      setdata(tempData)
    }
  };

  const handleUpdate = () => {
    console.log(newName, clickedName);
    let tagNameNotExist = true;
    let i;
    for (let index = 0; index < Tags.length; index++) {
      if(Tags[index].name === newName){
        tagNameNotExist = false
      }
      if(Tags[index].name === clickedName){
        i=index;
      }
    }
    if(tagNameNotExist){
      let tempTags = [...Tags];
      tempTags[i].name=newName;
      localStorage.setItem("Tags",JSON.stringify(tempTags));
      setTags(tempTags);
      setflage(!flage);
      alert(`Change from ${clickedName} To ${newName}`)
    }
    else{
      alert("name alrady exist")
    }
  };

  return (
    <div className={style.border}>
      {flage && (
        <div className={style.changeName}>
          <section onClick={() => setflage(!flage)}>X</section>

          <label htmlFor="tagName">Change Tag Name:</label>
          <input
            type="text"
            onChange={(e) => setnewName(e.target.value)}
            id="tagName"
          />
          <br />
          <input onClick={handleUpdate} type="button" value={"Update"} />
        </div>
      )}
      {Tags.map((tag, i) => (
        <div
          className={style.main}
          key={i}
          style={{
            backgroundColor: tag.color,
            border: `2px solid ${tag.color}`,
            borderRadius: "0.5rem",
          }}
        >
          <p className={style.pra}> {tag.name} </p>

          <img
            className={style.edit}
            onClick={() => {setclickedName(tag.name);setflage(!flage)}}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png"
            alt="edite"
          />
          <img
            className={style.tarshcan}
            onClick={() => handeleDelete(tag.name)}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Trash_font_awesome.svg/1200px-Trash_font_awesome.svg.png"
            alt="delete"
          />
        </div>
      ))}
    </div>
  );
}

export default TagsList;
