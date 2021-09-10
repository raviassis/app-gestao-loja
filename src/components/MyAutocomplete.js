import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    TextField
} from '@material-ui/core/';

export default function MyAutocomplete(props) {
    return (
        <Autocomplete
            autoComplete
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    label={props.label}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            )}
            {...props}
        />
    );
}