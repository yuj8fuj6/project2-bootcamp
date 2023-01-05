import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import Button from "./Button";

const PlacesAutocomplete = ( props ) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    // setSelected seems oddly vague. Selected what? setSelectedLocation ?
    props.setSelected({ lat, lng });
  };
  
  return (
    <Combobox
      onSelect={handleSelect}
      className="flex items-center justify-center"
    >
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input mx-4 h-7 my-10"
        placeholder="Search an address"
      />
      <Button onClick={props.reCenter}>
        <img
          id="marker"
          src={process.env.PUBLIC_URL + "/misc/orangeMarker.png"}
          alt="test"
        />
      </Button>
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete
