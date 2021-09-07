import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    InputAdornment,
    IconButton
} from '@material-ui/core/';
import {
    Visibility,
    VisibilityOff
} from '@material-ui/icons';
import { useState } from 'react';

function TextFieldPassword(props) {
    const [show, setShow] = useState(false);
    const {label, error, helperText} = props;
    const inputProps = {...props};
    delete inputProps.helperText;

    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Input
                type={show ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShow(!show)}
                        >
                            {show ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                {...inputProps}
            />
            <FormHelperText error={error} >{helperText}</FormHelperText>
        </FormControl>
    );
}

export default TextFieldPassword;