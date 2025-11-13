import React from "react";
import { useSearchParams } from "react-router-dom";

function AllReviews() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return <div>All Reviews for {id}</div>;
}

export default AllReviews;
