import { Children, FunctionComponent } from "react"
import styled from "styled-components";

const SlidesContCont = styled.div`
  overflow: hidden;
  width: 100%;
`

const SlidesCont = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  transform: 'translateZ(0)';
`

const Step: FunctionComponent<{
  numberOfSteps: number,
  index: number
}> = ({
  children,
  numberOfSteps,
  index
}) => {
  const transition = (duration = '1', items = 'all') => `${items} ${duration}s cubic-bezier(0.23, 1, 0.32, 1)`;

  return (
    <div className="Step" style={{
      width: `${100 / numberOfSteps}%`,
      transition: transition()
    }}>
      {children}
    </div>
  )
}

type CarouselProps = {
  currentIndex: number
}

const Carousel: FunctionComponent<CarouselProps> = ({children, currentIndex}) => {
  if (children == null) throw new Error("Carousel must have children")
  if (currentIndex < 0) throw new Error("Carousel index must be greater than or equal to 0")
  if (currentIndex >= Children.count(children)) throw new Error("Carousel index must be smaller than the number of children")

  // const transition = (duration = '1', items = 'all') => `${items} ${duration}s cubic-bezier(0.23, 1, 0.32, 1)`;

  return (<SlidesContCont>
    <SlidesCont style={{
      width: `${Children.count(children) * 100}%`,
      marginLeft: `-${currentIndex * 100}%`
    }}>
      {Children.map(children, (child, index) => (
        <Step key={index} index={index} numberOfSteps={Children.count(children)}>
          {child}
        </Step>
      ))}
    </SlidesCont>
  </SlidesContCont>)
}

export default Carousel
