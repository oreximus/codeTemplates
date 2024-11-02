import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/Counter";

const Landing = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Landing Page!</h1>
      <div>Testing redux values</div>
      <div>This is Count: {count}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </>
  );
};

export default Landing;
