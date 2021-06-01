import { FunctionComponent, useEffect, useState } from "react"
import styled, { css } from "styled-components"


type FlipClockProps = {
  date: number
}

const toDeltaFromNow = (date: number) => Date.now() - date

const deltaToSeconds = (t: number) => t / 1000
const deltaToMinutes = (t: number) => deltaToSeconds(t) / 60
const deltaToHours = (t: number) => deltaToMinutes(t) / 60

const deltaToDays = (t: number) => Math.floor(deltaToHours(t) / 24)
const deltaToHoursOfDay = (t: number) => Math.floor(deltaToHours(t) % 24)
const deltaToMinutesOfHour = (t: number) => Math.floor(deltaToMinutes(t) % 60)
const deltaToSecondsOfMinute = (t: number) => Math.floor(deltaToSeconds(t) % 60)

interface DeltaParts {
  isNegative: boolean,
  days: number,
  hoursOfDay: number,
  minutesOfHour: number,
  secondsOfMinute: number
}

const deltaToParts = (t: number): DeltaParts => {
  const tAbs = Math.abs(t);
  return {
    isNegative: t < 0,
    days: deltaToDays(tAbs),
    hoursOfDay: deltaToHoursOfDay(tAbs),
    minutesOfHour: deltaToMinutesOfHour(tAbs),
    secondsOfMinute: deltaToSecondsOfMinute(tAbs)
  }
}

const deltaPartsWithChange = (deltaPartsOld: DeltaParts, deltaPartsNew: DeltaParts) => ({
  old: deltaPartsOld,
  new: deltaPartsNew
})

const BigNumber = styled.div`
  font-family: "Avenir95Black";
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const NumberPartContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`

const NumberPartLabel = styled.span`
  display: inline-block;
  text-align: left;
`

const NumberPartSeparator = styled.span`
  font-size: 80pt;
`

const NumberPart = styled.span`
  font-size: 80pt;
  display: inline-block;
  margin-bottom: -0.2em;
`

export const TextClock: FunctionComponent<FlipClockProps> = ({date}) => {
  const [tMinusParts, setTMinusParts] = useState(deltaPartsWithChange(
    deltaToParts(Infinity),
    deltaToParts(-toDeltaFromNow(date))
  ))

  useEffect(() => {
    const interval = window.setInterval(() => {
      const newState = deltaPartsWithChange(
        tMinusParts.new,
        deltaToParts(-toDeltaFromNow(date))
      )
      setTMinusParts(newState)
    }, 70)

    return () => {
      window.clearInterval(interval)
    }
  })

  return <BigNumber>
    <NumberPartContainer>
      <NumberPart>
        {tMinusParts.new.isNegative ? '-' : ''}
        {tMinusParts.new.days.toString().padStart(3, '0')}
      </NumberPart>
      <NumberPartLabel>days</NumberPartLabel>
    </NumberPartContainer>
    <NumberPartSeparator>:</NumberPartSeparator>
    <NumberPartContainer>
      <NumberPart>
        {tMinusParts.new.hoursOfDay.toString().padStart(2, '0')}
      </NumberPart>
      <NumberPartLabel>hours</NumberPartLabel>
    </NumberPartContainer>
    <NumberPartSeparator>:</NumberPartSeparator>
    <NumberPartContainer>
      <NumberPart>
        {tMinusParts.new.minutesOfHour.toString().padStart(2, '0')}
      </NumberPart>
      <NumberPartLabel>minutes</NumberPartLabel>
    </NumberPartContainer>
    <NumberPartSeparator>:</NumberPartSeparator>
    <NumberPartContainer>
      <NumberPart>
        {tMinusParts.new.secondsOfMinute.toString().padStart(2, '0')}
      </NumberPart>
      <NumberPartLabel>seconds</NumberPartLabel>
    </NumberPartContainer>
  </BigNumber>
}
