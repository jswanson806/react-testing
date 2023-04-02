import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it('renders without crashing', () => {
  render(<Carousel />);
});

it('matches the snapshot', () => {
  const {asFragment} = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second or third
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
});

it('removes the left arrow when on first image', () => {
  const { queryByTestId } = render(<Carousel />);
  expect(queryByTestId("left-arrow")).toBeNull();
})

it('shows the left arrow when not on first image', () => {
  const { queryByTestId } = render(<Carousel />);
  expect(queryByTestId("left-arrow")).toBeNull();

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  expect(queryByTestId("left-arrow")).toBeInTheDocument();
})

it('shows the right arrow when not on last image', () => {
  const { queryByTestId } = render(<Carousel />);
  expect(queryByTestId("right-arrow")).toBeInTheDocument();
})

it('removes the right arrow when on last image', () => {
  const { queryByTestId } = render(<Carousel />);
  expect(queryByTestId("right-arrow")).toBeInTheDocument();

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(queryByTestId("right-arrow")).toBeNull();
})