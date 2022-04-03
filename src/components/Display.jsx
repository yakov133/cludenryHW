import React, { useState } from 'react'
import style from "./unassigned.module.css"

function Display({pic,Tags,handelssigned}) {
    const [flag, setflag] = useState(false)
    const [tag, setTag] = useState(false)
  return (
    <div >
        <img className={style.pictur} src={pic.src}/>
        <div className={style.tags_name}>
          <div className={style.name_order}>
            <p>{pic.name} </p>
            <p onClick={()=>setflag(!flag)}>+</p>
          </div>
          {flag&&
            <div className={style.hoverS}>
                    {Tags.map((tag,i)=><li key={i} onClick={()=>setTag(tag.name)}>{tag.name}</li>)}
                    {tag&&<div className={style.show}>
                        <section>{tag}</section>
                        <input type="button" value={"add"} onClick={()=>{handelssigned(pic.name,tag);setflag(false)} } />
                    </div>}
            </div>}
        </div>
      </div>
  )

}

export default Display