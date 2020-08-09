import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { TransitionGroup, CSSTransition } from "react-transition-group"; // https://blog.bitsrc.io/animating-reactjs-with-react-transition-group-2af6c87cab0c
import { CART_ITEMS_QUERY } from "../utils/serverOperations";

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 1.4s;
    backface-visibility: hidden;
  }
  /* Initial State of the entered Dot */
  .count-enter {
    transform: /*scale(4)*/ rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: /*scale(4)*/ rotateX(0.5turn);
  }
`;

const Counter = styled.div`
  background: ${(props) => props.theme.purple};
  color: white;
  /* display: inline-block; */
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 3rem;
  min-width: 3rem;
  margin-left: 0;
  font-weight: 400;
  text-align: center;
  /* https://courses.wesbos.com/account/access/5de58bb4c940036476995e89/view/289595588 min 1-30 */
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`;

const CartCount = () => {
  // console.log(data)
  return (
    <Query query={CART_ITEMS_QUERY}>
      {({ data, error, loading }) => {
        const count = data.myCurrentOrder.items.reduce(
          (count, item) => count + item.count,
          0
        );
        return (
          <AnimationStyles>
            <TransitionGroup>
              <CSSTransition
                unMountOnExit
                className="count"
                classNames="count"
                key={count}
                timeout={{ enter: 4000, exit: 4000 }}
              >
                <Counter>{data && count}</Counter>
              </CSSTransition>
            </TransitionGroup>
          </AnimationStyles>
        );
      }}
    </Query>
  );
};

export default CartCount;
