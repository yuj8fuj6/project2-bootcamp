import React, { createContext, useState, useEffect } from "react";
import {
  ref as databaseRef,
  getDatabase,
  query,
  orderByChild,
  onChildAdded,
} from "firebase/database";

const ReviewContext = () => {
  return <div>ReviewContext</div>;
};

export default ReviewContext;
