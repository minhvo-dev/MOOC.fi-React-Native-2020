// As suggested in the course, an alternative way is to use 
// "use-debounce" package but the babel loader need to be modified.
// I have no experience with babel configuration so I use an
// old-fashion way with useEffect and setTimeout

import React, { useEffect } from "react";
import { Searchbar as RNPSearchbar } from "react-native-paper";

import { DEBOUNCE_DELAY_TIME } from "../../constants";

const Searchbar = ({ searchKeyword, setSearchKeyword }) => {
  const [searchQuery, setSearchQuery] = React.useState(searchKeyword);

  useEffect(() => {
    // debouncing
    const handler = setTimeout(() => {
      setSearchKeyword(searchQuery);
    }, DEBOUNCE_DELAY_TIME);
    // setSearchkeyword is not invoked
    // unless user stops typing after the time period
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <RNPSearchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );

};

export default Searchbar;