import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
import styled from "styled-components";
import Button from "./styled/Button";
const Expandable = styled.span`
  color: ${(props) => props.theme.purple};
  font-size: 1.2rem;
  font-style: italic;
  cursor: pointer;
`;

const renderStars = (n, iconName) =>
  [...Array(n)].map((icon, i) => <i key={i} className={iconName}></i>);

class SingleReview extends Component {
  state = {
    expanded: false,
  };
  render() {
    const { allCookies } = this.props;
    console.log(this.props);
    const { expanded } = this.state;
    const { id, rating, text, product, user } = this.props.review;
    const emptyIcon = 5 - rating;
    return (
      <div key={id}>
        <p>
          {renderStars(rating, "fa fa-star")}
          {renderStars(emptyIcon, "fa fa-star-o")}
          <span> {rating}</span>
        </p>
        <p className="text">
          {expanded ? text : text.substring(0, 5)}
          <Expandable
            onClick={() =>
              this.setState((prevState) => ({ expanded: !prevState.expanded }))
            }
          >
            {expanded ? "show less" : "show more"}
          </Expandable>
        </p>
        {product && allCookies.id === user.id && (
          <Link
            to={{
              pathname: `/item/${product.id}/${product.name}/review/${true}`,
              search: `?reviewId=${id}`, // how to get review ID
            }}
          >
            <Button>Update review</Button>
          </Link>
        )}
      </div>
    );
  }
}
export default withCookies(SingleReview);
