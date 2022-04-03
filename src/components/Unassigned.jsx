import React, { useEffect, useState } from 'react'
import Display from './Display'
import style from "./unassigned.module.css"


function Unassigned({data,setdata,Tags,setTags}) {
  // useEffect(()=>{},[data])
  const handelssigned = (name,tag)=>{
    let obj,i;
    for (const iterator of data) {
      if(iterator.name === name){
        let picIndex = data.indexOf(iterator);
        let temperryData = [...data];
        temperryData.splice(picIndex,1)
        setdata(temperryData);
        localStorage.setItem(
          "data",
          JSON.stringify(temperryData)
        );
        obj = iterator;
      }
    }

    for (let index = 0; index < Tags.length; index++) {
      if(Tags[index].name === tag){
        i = index;
      }
    }
    let tempTags =[...Tags];
    tempTags[i].arr.push(obj)
    localStorage.setItem(
      "Tags",
      JSON.stringify(tempTags)
    );
    setTags(tempTags);
    
  }

  return(
    <div className={style.order}>
      {data.map((pic,i)=>
        <Display pic={pic} Tags={Tags} handelssigned={handelssigned} key={i}/>
      )}
    </div>
  )
}

export default Unassigned