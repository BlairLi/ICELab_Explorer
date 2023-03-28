import React from "react"
import { useEffect, useState } from "react";

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}


// const nameToInt = {
//   "White Glacier": 000000
// }

export default function DashBoardCharts({openChart, onCancel, children}) {

  // useEffect = () => {
  //   fetchLinechart(children.di)
  // }

  // const fromValue = parseInt(children.fromTime.replace("T", "").replace(/[-:]/g, "") + "00");
  // const toValue = parseInt(children.fromTime.replace("T", "").replace(/[-:]/g, "") + "00");

  if (!openChart) return null
    return (
        <>
            <div style={OVERLAY_STYLES} onClick={onCancel}/>
            <div style={MODAL_STYLES}>
                {children}
                <button onClick={onCancel} className="BackButton">Back</button>
            </div>
        </>
  )
}
