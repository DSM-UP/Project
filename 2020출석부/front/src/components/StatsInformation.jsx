import React, { memo } from 'react'

const StatsInformation = memo(({ atts, mode }) => {
  return (
    <div id={`${mode}-informations`}>
      <p className="informations-text" id="field-trip-text">현체</p>
      <p className="informations-value" id="field-trip">{atts.filter(v => v.status === 1).length}</p>
      <p className="informations-side-text">|</p>
      <p className="informations-text" id="going-out-text">외출</p>
      <p className="informations-value" id="going-out">{atts.filter(v => v.status === 2).length}</p>
      <p className="informations-side-text">|</p>
      <p className="informations-text" id="being-late-text">지각</p>
      <p className="informations-value" id="being-late">{atts.filter(v => v.status === 5).length}</p>
      <p className="informations-side-text">|</p>
      <p className="informations-text" id="admission-absent-text">공결</p>
      <p className="informations-value" id="admission-absent">{atts.filter(v => v.status === 3).length}</p>
      <p className="informations-side-text">|</p>
      <p className="informations-text" id="awol-text">무단</p>
      <p className="informations-value" id="awol">{atts.filter(v => v.status === 4).length}</p>
      <p className="informations-side-text">|</p>
      <p className="informations-text" id="total-text">총합</p>
      <p className="informations-value" id="total">{atts.length}</p>
    </div>
  )
})

export default StatsInformation