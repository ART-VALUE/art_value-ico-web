import React, { Children, FunctionComponent, ReactChild, ReactElement, useState } from "react"
import "./PurchaseDialog.scss"
import "../../style/form.scss"
import WalletSlide from "./WalletSlide"
import Step from "./Step"
import VerifyTxSlide from "./VerifyTxSlide"

type CarouselProps = {
    currentIndex: number
}

const Carousel: FunctionComponent<CarouselProps> = ({children, currentIndex}) => {
    if (children == null) throw new Error("Carousel must have children")

    const transition = (duration = '1', items = 'all') => `${items} ${duration}s cubic-bezier(0.23, 1, 0.32, 1)`;

    return (
        <div className="carousel" style={{
            margin: 0,
            padding: 0,
            transition: transition("0.5"),
            transform: 'translateZ(0)',
            overflow: 'hidden',
            width: `${Children.count(children) * 100}%`,
            marginLeft: `-${(currentIndex - 1) * 100}%`,
            display: "flex"
        }}>
            {Children.map(children, (child, index) => (
                <Step key={index} index={index} numberOfSteps={Children.count(children)}>
                    {child}
                </Step>
            ))}
        </div>
    )
}

export default Carousel
