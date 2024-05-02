import React from "react"
import style from "./StoryForm.module.css"
export default function Selector({ name, options, value, label, onChange }) {
  return (
    <select
      className={style.cat}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">{label}</option>
      {options.map(({ title, value }) => {
        return (
          <option key={title} value={value}>
            {title}
          </option>
        )
      })}
    </select>
  )
}
