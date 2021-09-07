import {
    Container
} from '@material-ui/core';

export default function CentralizedContainer(props) {
    const style = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
    return (
        <Container style={style} {...props} />
    );
} 