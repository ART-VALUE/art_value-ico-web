import { FunctionComponent, useState } from "react"
import "./PurchaseDialog.scss"
import "../../style/form.scss"

type StepProps = {
    numberOfSteps: number,
    index: number
}

const Step: FunctionComponent<StepProps> = ({
    children,
    numberOfSteps,
    index
}) => {
    const transition = (duration = '1', items = 'all') => `${items} ${duration}s cubic-bezier(0.23, 1, 0.32, 1)`;

    return (
        <div className="Step" style={{
            width: `${100 / numberOfSteps}%`
        }}>
            {children}
        </div>
    )
}

export default Step
