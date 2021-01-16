import * as React from "react";
import { StyleSheet } from "react-native";

import PickerSelect from "react-native-picker-select";

import theme from "../../theme";

import { OrderByType, OrderDirectionType } from "../../utils/orderTypes";

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.normal,
    flexDirection: "row",
    justifyContent: "center",
  }
});

const options = [
  {
    label: "Latest repositories",
    value: {
      orderBy: OrderByType.DATE,
      orderDirection: OrderDirectionType.DESCENDING
    }
  },
  {
    label: "Highest rated repositories",
    value: {
      orderBy: OrderByType.RATING,
      orderDirection: OrderDirectionType.DESCENDING
    }
  },
  {
    label: "Lowest rated repositories",
    value: {
      orderBy: OrderByType.RATING,
      orderDirection: OrderDirectionType.ASCENDING
    }
  }
];

const OrderPicker = ({ setOrder }) => {
  const [visible, setVisible] = React.useState(false);
  const [select, setSelect] = React.useState(options[0]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onChange = (value) => {
    console.log(value);
    setOrder(value);
    setSelect(value);
  };

  const containerStyle = [styles.container];

  return (
    <PickerSelect
      onValueChange={(value) => console.log(value)}
      items={[
        { label: "Football", value: "football" },
        { label: "Baseball", value: "baseball" },
        { label: "Hockey", value: "hockey" },
      ]}
    />
  );
};

export default OrderPicker;