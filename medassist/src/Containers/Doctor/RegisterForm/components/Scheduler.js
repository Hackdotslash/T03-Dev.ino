import React from "react";
import SlotPicker from "./SlotPicker";

export default function Scheduler(props) {
  return (
    <div>
      <SlotPicker
        day={"Monday"}
        array={props.array}
        disable={props.disable}
        setDisable={props.setDisable}
      />
      <SlotPicker
        day={"Tuesday"}
        array={props.array}
        disable={props.disable}
        setDisable={props.setDisable}
      />
      <SlotPicker
        day={"Wednesday"}
        array={props.array}
        disable={props.disable}
        setDisable={props.setDisable}
      />
      <SlotPicker
        day={"Thursday"}
        array={props.array}
        disable={props.disable}
        setDisable={props.setDisable}
      />
      <SlotPicker
        day={"Friday"}
        array={props.array}
        disable={props.disable}
        setDisable={props.setDisable}
      />
      <SlotPicker
        day={"Saturday"}
        array={props.array}
        disable={props.disable}
        setDisable={props.setDisable}
      />
      <SlotPicker
        day={"Sunday"}
        array={props.array}
        disable={props.disable}
        setDisable={props.setDisable}
      />
    </div>
  );
}
