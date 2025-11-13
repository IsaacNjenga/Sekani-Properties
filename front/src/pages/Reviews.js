import React from "react";
import { useSearchParams } from "react-router-dom";

function Reviews() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return <div>Reviews for {id}</div>;
}

export default Reviews;
