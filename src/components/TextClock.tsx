import { FunctionComponent, useEffect, useState } from "react"


type FlipClockProps = {
    date: number
}

const tMinusFromNow = (date: number) => Date.now() - date

const deltaToSeconds = (t: number) => t / 1000
const deltaToMinutes = (t: number) => deltaToSeconds(t) / 60
const deltaToHours = (t: number) => deltaToMinutes(t) / 60

const deltaToDays = (t: number) => Math.floor(deltaToHours(t) / 24)
const deltaToHoursOfDay = (t: number) => Math.floor(deltaToHours(t) % 24)
const deltaToMinutesOfHour = (t: number) => Math.floor(deltaToMinutes(t) % 60)
const deltaToSecondsOfMinute = (t: number) => Math.floor(deltaToSeconds(t) % 60)

interface DeltaParts {
    days: number,
    hoursOfDay: number,
    minutesOfHour: number,
    secondsOfMinute: number
}

const deltaToParts = (t: number): DeltaParts => ({
    days: deltaToDays(t),
    hoursOfDay: deltaToHoursOfDay(t),
    minutesOfHour: deltaToMinutesOfHour(t),
    secondsOfMinute: deltaToSecondsOfMinute(t)
})

const deltaPartsWithChange = (deltaPartsOld: DeltaParts, deltaPartsNew: DeltaParts) => ({
    old: deltaPartsOld,
    new: deltaPartsNew
})

export const TextClock: FunctionComponent<FlipClockProps> = ({date}) => {
    const [tMinusParts, setTMinusParts] = useState(deltaPartsWithChange(
        deltaToParts(Infinity),
        deltaToParts(tMinusFromNow(date))
    ))

    useEffect(() => {
        const interval = window.setInterval(() => {
            const newState = deltaPartsWithChange(
                tMinusParts.new,
                deltaToParts(tMinusFromNow(date))
            )
            setTMinusParts(newState)
        }, 70)

        return () => {
            window.clearInterval(interval)
        }
    })

    return (
        <div className={'flipClock'}>

        </div>
    )
}
