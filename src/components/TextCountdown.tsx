import { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"


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

const BigNumber = styled.span`
    font-family: "Avenir95Black";
    color: white;
    font-size: 80pt;
`

export const TextClock: FunctionComponent<FlipClockProps> = ({date}) => {
    const [tMinusParts, setTMinusParts] = useState(deltaPartsWithChange(
        deltaToParts(Infinity),
        deltaToParts(toDeltaFromNow(date))
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

    return (
        <div className={'flipClock'}>
            <BigNumber>
                {tMinusParts.new.isNegative ? '-' : ''}
                {tMinusParts.new.days.toString().padStart(3, '0')}
                :
                {tMinusParts.new.hoursOfDay.toString().padStart(2, '0')}
                :
                {tMinusParts.new.minutesOfHour.toString().padStart(2, '0')}
                :
                {tMinusParts.new.secondsOfMinute.toString().padStart(2, '0')}
            </BigNumber>
        </div>
    )
}
