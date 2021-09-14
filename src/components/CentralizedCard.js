import CentralizedContainer from "./CentralizedContainer";
import {
    Card,
    CardContent,
    CardHeader
} from '@material-ui/core';

export default function CentralizedCard(props) {
    const { containerProps, cardHeaderProps, children } = props;
    return (
        <CentralizedContainer {...containerProps}>
            <Card>
                <CardHeader {...cardHeaderProps} />
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </CentralizedContainer>
    );
}