import MyAutocomplete from './MyAutocomplete';
import { useState } from 'react';
import registerService from '../services/registerService';

let getSuggestedRegistersTimeout;
export default function RegisterAutoComplete(props) {
    const [suggestedRegisters, setSuggestedRegisters] = useState([]);
    return (
        <MyAutocomplete
            options={suggestedRegisters}
            getOptionLabel={(option) => { return `${option.code} ${option.name}`}}
            getOptionSelected={(option, value) => {
                return option.code === value.code;
            }}
            onOpen={() => {
                if(suggestedRegisters.length === 0){
                    registerService
                        .getRegisters()
                        .then(res => setSuggestedRegisters(res.data.data));
                }
            }}
            onInputChange={(_, value) => {
                clearTimeout(getSuggestedRegistersTimeout);
                getSuggestedRegistersTimeout = setTimeout(
                    () => {
                        registerService
                            .getRegisters({q: value})
                            .then(res => setSuggestedRegisters(res.data.data));
                    }, 
                    700
                );
            }}
            {...props}
        />
    );
}