import MyAutocomplete from './MyAutocomplete';
import { useState } from 'react';
import CashFlowService from '../services/cashFlowService';

let getSuggestedDescriptionsTimeout;
export default function DescriptionAutoComplete(props) {
    const [suggestedDescriptions, setSuggestedDescriptions] = useState([]);
    
    return (
        <MyAutocomplete
            freeSolo
            options={suggestedDescriptions.map((option) => option.description)}
            onOpen={() => {
                if(suggestedDescriptions.length === 0)
                    CashFlowService
                        .getSuggestedDescriptions()
                        .then(res => setSuggestedDescriptions(res.data));
                
            }}
            onInputChange={(event, value) => {
                props.onChange && props.onChange(event, value);
                clearTimeout(getSuggestedDescriptionsTimeout);
                getSuggestedDescriptionsTimeout = setTimeout(
                    () => {
                        CashFlowService
                            .getSuggestedDescriptions(value)
                            .then(res => setSuggestedDescriptions(res.data));
                    }, 
                    700
                );
                
            }}
            {...props}
        />
    );
}