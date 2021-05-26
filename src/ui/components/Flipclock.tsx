import './Flipclock.scss'
import { FunctionComponent, useEffect, useState } from "react"

type FlipClockProps = {
    date: number
}

const tMinusFromNow = (date: number) => Date.now() - date

type FlipAnimation = 'fold' | 'unfold'
type CardPosition = 'upper' | 'lower'
type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds'

type AnimateCardProps = {
    animation: FlipAnimation,
    digit: string
}

const AnimatedCard: FunctionComponent<AnimateCardProps> = ({ animation, digit }) => {
    return (
        <div className={`flipCard ${animation}`}>
            <span>{digit}</span>
        </div>
    )
}

type StaticCardProps = {
    position: CardPosition,
    digit: string
}
  
const StaticCard: FunctionComponent<StaticCardProps> = ({ position, digit }) => {
    return (
        <div className={position === 'upper' ? 'upperCard' : 'lowerCard'}>
            <span>{digit}</span>
        </div>
    )
}

type FlipUnitContainerProps = {
    digit: number,
    shuffle: boolean,
    unit: TimeUnit
}

const FlipUnitContainer: FunctionComponent<FlipUnitContainerProps> = ({ digit, shuffle, unit }) => {	
    let currentDigit = digit
    let previousDigit = digit - 1
  
    // to prevent a negative value
    if ( unit !== 'hours') {
      previousDigit = previousDigit === -1 
        ? 59 
        : previousDigit
    } else {
      previousDigit = previousDigit === -1 
        ? 23 
        : previousDigit
    }
  
    const currentDigitString = currentDigit < 10 ? `0${currentDigit}` : currentDigit.toString()
    const previousDigitString = previousDigit < 10 ? `0${previousDigit}` : previousDigit.toString()
  
    // shuffle digits
    const digit1 = shuffle 
      ? previousDigitString 
      : currentDigitString
    const digit2 = !shuffle 
      ? previousDigitString 
      : currentDigitString
  
    // shuffle animations
    const animation1 = shuffle 
      ? 'fold' 
      : 'unfold'
    const animation2 = !shuffle 
      ? 'fold' 
      : 'unfold'
  
    return(
        <div className={'flipUnitContainer'}>
            <StaticCard 
            position={'upper'} 
            digit={currentDigitString} 
            />
            <StaticCard 
            position={'lower'} 
            digit={previousDigitString} 
            />
            <AnimatedCard 
            digit={digit1}
            animation={animation1}
            />
            <AnimatedCard 
            digit={digit2}
            animation={animation2}
            />
        </div>
    )
}

const deltaToSeconds = (t: number) => t / 1000
const deltaToMinutes = (t: number) => deltaToSeconds(t) / 60
const deltaToHours = (t: number) => deltaToMinutes(t) / 60

// const 
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

const FlipClock: FunctionComponent<FlipClockProps> = ({date}) => {
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
            <FlipUnitContainer 
                unit={'days'}
                digit={tMinusParts.new.days}
                shuffle={tMinusParts.new.days !== tMinusParts.old.days}
                />
            <FlipUnitContainer
                unit={'hours'}
                digit={tMinusParts.new.hoursOfDay}
                shuffle={tMinusParts.new.hoursOfDay !== tMinusParts.old.hoursOfDay}
                />
            <FlipUnitContainer 
                unit={'minutes'}
                digit={tMinusParts.new.minutesOfHour}
                shuffle={tMinusParts.new.minutesOfHour !== tMinusParts.old.minutesOfHour}
                />
            <FlipUnitContainer 
                unit={'seconds'}
                digit={tMinusParts.new.secondsOfMinute}
                shuffle={tMinusParts.new.secondsOfMinute !== tMinusParts.old.secondsOfMinute}
                />
        </div>
    )
}

export default FlipClock
